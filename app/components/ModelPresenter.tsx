import { Gltf, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { css } from 'styled-system/css'

type ModelPresenterProps = {
	asset: string
	isThumbnail?: boolean
}

const ModelPresenter = ({ asset, isThumbnail }: ModelPresenterProps) => {
	const styles = {
		pictureFrame: css({
			w: isThumbnail ? '150px' : '100%',
			h: isThumbnail ? '25vh' : '100%',
			border: isThumbnail ? 'none' : '12px solid #d4af37',
			borderImage: isThumbnail
				? 'none'
				: 'linear-gradient(45deg, #d4af37, #f0e68c, #b8860b) 1',
			boxShadow: isThumbnail
				? 'none'
				: '0 0 20px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.5)',
			rounded: isThumbnail ? 'none' : '15px', // 少し角を丸める
		}),
	}
	return (
		<Canvas className={styles.pictureFrame}>
			<ambientLight />
			<Gltf src={asset} />
			{!isThumbnail && <OrbitControls />}
		</Canvas>
	)
}

export default ModelPresenter
