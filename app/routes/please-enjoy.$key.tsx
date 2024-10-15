import { Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { json, LoaderFunction, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'

type LoaderData = {
	assetUrl: string
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
	let { key } = params

	if (!key) {
		throw new Response("The 'key' parameter is required.", { status: 500 })
	}

	key = key.replace(/_/g, '/')
	const object = await R2.get(key)

	if (!object) {
		throw new Response(
			`The requested model with key '${key}' could not be found.`,
			{ status: 404 }
		)
	}

	const assetUrl = `https://judar-bucket.grill-ware.com/${key}`

	return json({ assetUrl })
}

type ModelPresenterProps = {
	asset: string
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
	const { assetUrl } = useLoaderData<LoaderData>()
	const styles = {
		container: css({
			pos: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			w: '62%',
			h: '62%',
			maxW: '[432px]',
			maxH: '[432px]',
			boxShadow:
				'inset 30px 30px 59px #adadad, inset -30px -30px 59px #ffffff;',
			rounded: '2xl',
		}),
	}

	return (
		<div className={styles.container}>
			<ModelPresenter asset={assetUrl} />
		</div>
	)
}
