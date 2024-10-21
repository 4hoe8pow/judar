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
				pos: 'fixed',
				inset: 0,
				align: 'center',
				zIndex: 1000,
			})}
		>
			<div
				className={css({
					pos: 'absolute',
					inset: 0,
					bg: 'white',
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
					pos: 'relative',
					zIndex: 50,
					maxW: 'md',
					w: 'full',
				})}
			>
				{children}
			</div>
		</div>
	)
}
