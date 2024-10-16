import { css } from 'styled-system/css'

type TextFieldProps = {
	id: string
	label: string
	name: string
	type?: string
	value: string
	onChange: (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void
	error?: string
	required?: boolean
	isTextArea?: boolean
}

export const TextField = ({
	id,
	label,
	name,
	type = 'text',
	value,
	onChange,
	error,
	required = false,
	isTextArea = false,
}: TextFieldProps) => {
	const styles = {
		input: css({
			p: '0.5rem',
			border: '1px solid #ccc',
			rounded: '4px',
			w: '100%',
		}),
		textArea: css({
			h: '6rem',
			resize: 'none',
			overflowY: 'scroll',
		}),
		errorMessage: css({ color: 'red', fontSize: '0.875rem' }),
	}

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			{isTextArea ? (
				<textarea
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					className={`${styles.input} ${styles.textArea}`}
					aria-invalid={!!error}
					required={required}
				/>
			) : (
				<input
					id={id}
					type={type}
					name={name}
					value={value}
					onChange={onChange}
					className={styles.input}
					aria-invalid={!!error}
					required={required}
				/>
			)}
			{error && <p className={styles.errorMessage}>{error}</p>}
		</div>
	)
}
