import { Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { css } from 'styled-system/css'

type ModelPresenterProps = {
	asset: string
}

const ModelPresenter = ({ asset }: ModelPresenterProps) => {
	return (
		<Canvas className={css({ w: '100%' })}>
			<ambientLight intensity={10} />
			<Gltf src={asset} scale={0.6} />
			<OrbitControls />
		</Canvas>
	)
}

export default ModelPresenter
