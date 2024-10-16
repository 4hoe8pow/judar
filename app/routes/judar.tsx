import { useState, useEffect } from 'react'

import { json, LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { Modal } from '~/components/Modal'
import ModelPresenter from '~/components/ModelPresenter'
import ProgressIndicator from '~/components/ProgressIndicator'

import { css } from 'styled-system/css'
import { grid } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Judar' },
	{
		name: 'description',
		content:
			'Every day, I endeavor to explore the expression of experience through Houdini. I extend my deepest respect, gratitude, and love to Houdini and its developers.',
	},
]

// Loader function to fetch GLTF URLs from R2
export const loader: LoaderFunction = async ({ context }) => {
	const { R2 } = context.cloudflare.env
	const gltfUrls = (await R2.list()).objects
		.filter(({ key }) => key.endsWith('.gltf'))
		.map(({ key }) => `https://judar-bucket.grill-ware.com/${key}`)

	return json(gltfUrls)
}

export default function Index() {
	const gltfUrls = useLoaderData<string[]>()
	const [visibleModels, setVisibleModels] = useState<string[]>([])
	const [loading, setLoading] = useState(true)
	const [modalOpen, setModalOpen] = useState(false)
	const [selectedModel, setSelectedModel] = useState<string | null>(null)
	const [isLoadingMore, setIsLoadingMore] = useState(false)

	// Initialize visible models on load
	useEffect(() => {
		if (gltfUrls.length) {
			const initialModels = gltfUrls.slice(0, 12)
			setVisibleModels(initialModels)
		}
		setLoading(false)
	}, [gltfUrls])

	// Load more models when reaching the bottom of the page
	const loadMoreModels = () => {
		if (isLoadingMore) return

		setIsLoadingMore(true)
		const nextModels = gltfUrls.slice(
			visibleModels.length,
			visibleModels.length + 12
		)
		if (nextModels.length) {
			setVisibleModels((prev) => [...prev, ...nextModels])
		}
		setIsLoadingMore(false)
	}

	// Handle scroll event
	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			loadMoreModels()
		}
	}

	// Attach scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Open modal with the selected model
	const openModal = (modelUrl: string) => {
		setSelectedModel(modelUrl)
		setModalOpen(true)
	}

	// Close modal
	const closeModal = () => {
		setModalOpen(false)
		setSelectedModel(null)
	}

	const styles = {
		container: grid({ columns: { base: 1, sm: 4 }, gap: 4 }),
		showcase: css({
			bg: 'none',
			border: 'none',
			p: 1,
			cursor: 'pointer',
		}),
	}

	return (
		<section>
			<div className={styles.container}>
				{loading ? (
					<ProgressIndicator />
				) : visibleModels.length > 0 ? (
					visibleModels.map((url) => (
						<button
							key={url}
							onClick={() => openModal(url)}
							className={styles.showcase}
							aria-label={`View model ${url}`}
						>
							<ModelPresenter asset={url} isThumbnail />
						</button>
					))
				) : (
					<div>Oops! No 3D models available at the moment.</div>
				)}
			</div>

			<Modal isOpen={modalOpen} onClose={closeModal}>
				{selectedModel && <ModelPresenter asset={selectedModel} />}
			</Modal>
		</section>
	)
}
