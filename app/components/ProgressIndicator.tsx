import { cva } from 'styled-system/css'
import { center } from 'styled-system/patterns'

const circle = cva({
	base: {
		width: '10%',
		height: '10%',
		rounded: '50%',
		border: '8px solid transparent',
		position: 'absolute',
		animation: 'spin 1s linear infinite',
		borderTopColor: 'red.500',
		borderRightColor: 'green.500',
		borderBottomColor: 'blue.500',
	},
})

const ProgressIndicator = () => {
	return (
		<div className={center()}>
			<div className={circle()} />
		</div>
	)
}

export default ProgressIndicator
