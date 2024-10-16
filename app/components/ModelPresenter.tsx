import { Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { css } from 'styled-system/css'

type ModelPresenterProps = {
	asset: string
	isThumbnail?: boolean
}

const ModelPresenter = ({ asset, isThumbnail }: ModelPresenterProps) => {
	return (
		<Canvas
			className={css({
				w: isThumbnail ? '150px' : '100%',
				h: isThumbnail ? '150px' : '400px',
			})}
		>
			<ambientLight intensity={10} />
			<Gltf src={asset} scale={0.6} />
			{!isThumbnail && <OrbitControls />}
		</Canvas>
	)
}

export default ModelPresenter
