import React from 'react'

import { css } from 'styled-system/css'
import { flex, container } from 'styled-system/patterns'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null

	return (
		<div
			className={flex({
				position: 'fixed',
				inset: 0,
				alignItems: 'center',
				zIndex: 1000,
			})}
		>
			{/* Overlay to darken background */}
			<div
				className={css({
					position: 'absolute',
					inset: 0,
					backgroundColor: 'white',
					opacity: 0.6,
					filter: 'auto',
					blur: 'lg',
				})}
				onClick={onClose}
				role="button"
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') onClose()
				}}
				aria-label="Close modal"
			/>
			{/* Modal Content */}
			<div
				className={container({
					position: 'relative',
					zIndex: 50,
					maxWidth: 'md',
					width: 'full',
				})}
			>
				{children}
			</div>
		</div>
	)
}
