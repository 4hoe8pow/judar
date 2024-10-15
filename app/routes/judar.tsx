import { useState, useEffect } from 'react'

import { json, LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'

import { css } from 'styled-system/css'
import { flex, hstack, vstack } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Judar' },
	{
		name: 'description',
		content:
			'Every day, I endeavor to explore the expression of experience through Houdini. I extend my deepest respect, gratitude, and love to Houdini and its developers.',
	},
]

const checkImageExists = async (url: string) => {
	try {
		const response = await fetch(url, { method: 'HEAD' })
		return response.ok
	} catch {
		return false
	}
}

export const loader: LoaderFunction = async ({ context }) => {
	const { R2 } = context.cloudflare.env
	const objects = (await R2.list()).objects

	const modelData = await Promise.all(
		objects
			.filter(({ key }) => key.endsWith('.gltf'))
			.map(async ({ key, uploaded }) => {
				const title = key.replace('.gltf', '')
				const thumbnailUrl = `https://judar-bucket.grill-ware.com/${key.replace('.gltf', '.png')}`
				const exists = await checkImageExists(thumbnailUrl)
				return {
					key,
					title,
					uploaded,
					thumbnailUrl: exists
						? thumbnailUrl
						: 'https://judar-bucket.grill-ware.com/alt-model-thumbnail.png',
				}
			})
	)

	return json(modelData)
}

export default function Index() {
	const modelData = useLoaderData<
		{
			key: string
			title: string
			uploaded: string
			thumbnailUrl: string
		}[]
	>()

	const [displayedModels, setDisplayedModels] = useState(
		modelData.slice(0, 6)
	)
	const [currentPage, setCurrentPage] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight
			)
				return

			if (currentPage < Math.ceil(modelData.length / 6) - 1) {
				setCurrentPage((prev) => prev + 1)
				setDisplayedModels((prev) => [
					...prev,
					...modelData.slice(
						(currentPage + 1) * 6,
						(currentPage + 2) * 6
					),
				])
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [currentPage, modelData])

	const styles = {
		section: flex({
			flexWrap: 'wrap',
			align: 'center',
			justify: 'center',
			px: 8,
			gap: 4,
		}),
		card: vstack({
			borderBottom: '1px solid #ddd',
			pb: '1rem',
			transition: 'transform 0.3s ease',
			_hover: { transform: 'scale(1.01)' },
		}),
		thumbnail: css({
			w: '300px',
			h: 'auto',
			objectFit: 'cover',
		}),
		info: hstack({}),
		title: css({
			fontWeight: 'bold',
			fontSize: '1.2rem',
		}),
		date: css({
			color: 'slate.500',
		}),
	}

	return (
		<section className={styles.section}>
			{displayedModels.length > 0 ? (
				displayedModels.map(
					({ key, title, uploaded, thumbnailUrl }) => {
						const trimmedTitle = title.split('/')[0]
						return (
							<Link
								key={key}
								to={`/please-enjoy/${key.replace(/\//g, '_')}`}
								className={styles.card}
							>
								<img
									src={thumbnailUrl}
									alt={`Thumbnail for ${trimmedTitle}`}
									className={styles.thumbnail}
								/>
								<div className={styles.info}>
									<div className={styles.title}>
										{trimmedTitle}
									</div>
									<div className={styles.date}>
										{formatDate(uploaded)}
									</div>
								</div>
							</Link>
						)
					}
				)
			) : (
				<div>No models available at the moment.</div>
			)}
		</section>
	)
}
