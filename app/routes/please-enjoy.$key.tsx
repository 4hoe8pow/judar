import { Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { json, LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

type ModelPresenterProps = {
	asset: string
}

export const meta: MetaFunction = ({ params }) => [
	{ title: `${params.key}` },
	{
		name: 'description',
		content: `Experience the ${params.key} 3D model, rendered with Three.js.`,
	},
]

export const loader: LoaderFunction = async ({ params, context }) => {
	const { R2 } = context.cloudflare.env
	const { key } = params

	if (!key) {
		throw new Response("The 'key' parameter is required.", { status: 500 })
	}

	// .gltfを.txtに変更
	const gltfKey = key.replace(/_/g, '/')
	const txtKey = gltfKey.replace(/\.gltf$/, '.txt')

	const object = await R2.get(gltfKey)
	const descriptionObject = await R2.get(txtKey)

	if (!object) {
		throw new Response(
			`The requested model with key '${gltfKey}' could not be found.`,
			{ status: 404 }
		)
	}

	if (!descriptionObject) {
		throw new Response(
			`The requested description file with key '${txtKey}' could not be found.`,
			{ status: 404 }
		)
	}

	const assetUrl = `https://judar-bucket.grill-ware.com/${gltfKey}`
	const description = await descriptionObject.text()

	return json({ assetUrl, description })
}

const ModelPresenter = ({ asset }: ModelPresenterProps) => {
	const styles = {
		pictureFrame: css({
			bg: 'white',
			rounded: '2xl',
		}),
	}
	return (
		<Canvas className={styles.pictureFrame}>
			<ambientLight />
			<Gltf src={asset} />
			<OrbitControls />
		</Canvas>
	)
}

export default function EnjoyModel() {
	const { assetUrl, description } = useLoaderData<typeof loader>()
	const styles = {
		container: flex({
			direction: 'column',
			align: 'center',
			justify: 'center',
			p: '12',
			mb: '8',
		}),
		canvas: css({
			w: '61.8vw',
			px: 4,
			bg: 'white',
			rounded: '2xl',
			boxShadow: '18px 18px 36px #7a7a7a, -18px -18px 36px #ffffff',
			aspectRatio: 'golden',
		}),
		description: css({
			textAlign: 'center',
			whiteSpace: 'nowrap',
			py: 12,
		}),
	}

	return (
		<div className={styles.container}>
			<div className={styles.canvas}>
				<ModelPresenter asset={assetUrl} />
			</div>
			<p className={styles.description}>{description}</p>
		</div>
	)
}
