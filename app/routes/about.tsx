import { MetaFunction } from '@remix-run/cloudflare'

import { grid, gridItem } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware - About' },
	{
		name: 'description',
		content:
			'Welcome to Grillware, where innovative solutions meet technology. Explore our offerings and discover how we can help your business grow.',
	},
]

export default function Index() {
	const styles = {
		container: grid({ columns: 12, gap: 4 }),
		message: gridItem({
			colStart: { base: 2, sm: 4 },
			colEnd: { base: 12, sm: 10 },
		}),
	}

	return (
		<section className={styles.container}>
			<div className={styles.message}>
				Welcome to Grillware, where we combine innovation with
				cutting-edge technology to provide the best solutions for your
				needs.
			</div>
			<div className={styles.message}>
				Explore our products and services to learn how we can help you
				drive success and achieve your business goals.
			</div>
		</section>
	)
}
