import { json, LoaderFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import ModelPresenter from '~/components/ModelPresenter'

import type { MetaFunction } from '@remix-run/cloudflare'

import { grid } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Judar' },
	{
		name: 'description',
		content:
			'Every day, I endeavor to explore the expression of experience through Houdini. I extend my deepest respect, gratitude, and love to Houdini and its developers.',
	},
]

export const loader: LoaderFunction = async ({ context }) => {
	const { R2 } = context.cloudflare.env

	// Fetch and filter GLTF files from R2 bucket
	const gltfUrls = (await R2.list()).objects
		.filter(({ key }) => key.endsWith('.gltf'))
		.map(({ key }) => `https://judar-bucket.grill-ware.com/${key}`)

	return json(gltfUrls)
}

export default function Index() {
	const gltfUrls = useLoaderData<string[]>()
	const styles = {
		container: grid({ columns: 4, gap: '6' }),
	}

	return (
		<div className={styles.container}>
			{gltfUrls.length ? (
				gltfUrls.map((url) => <ModelPresenter key={url} asset={url} />)
			) : (
				<div>Oops! No 3D models available at the moment.</div>
			)}
		</div>
	)
}
