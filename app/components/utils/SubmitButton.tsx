import { css } from 'styled-system/css'

type ButtonProps = {
	onClick?: () => void
	disabled?: boolean
	isSubmitting?: boolean
	children: React.ReactNode
}

export const SubmitButton = ({
	onClick,
	disabled = false,
	isSubmitting = false,
	children,
}: ButtonProps) => {
	const styles = {
		button: css({
			p: '0.75rem 1.5rem',
			bg: {
				base: 'blue.600',
				_disabled: 'blue.200',
				_hover: 'blue.400',
			},
			color: '#fff',
			border: 'none',
			rounded: '4px',
			cursor: { base: 'pointer', _disabled: 'not-allowed' },
			fontSize: '1rem',
			transition: 'background-color 0.3s',
		}),
	}

	return (
		<button
			type="submit"
			onClick={onClick}
			disabled={disabled}
			className={styles.button}
		>
			{isSubmitting ? 'Submitting...' : children}
		</button>
	)
}
