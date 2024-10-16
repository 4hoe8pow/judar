import { MetaFunction } from '@remix-run/cloudflare'

import { grid, gridItem } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware' },
	{
		name: 'description',
		content: 'Here is grillware home.',
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
		<div className={styles.container}>
			<div className={styles.message}>
				On October 20th, 2024, I commenced a long-term project to
				release assets created with Houdini on a daily basis over a span
				of 10,000 days. This initiative aims to enhance my understanding
				of Houdini as a novice in 3DCG and to serve as a self-challenge,
				given my tendency to lose interest in pursuits.
			</div>
			<div className={styles.message}>
				I plan to create one model each day for publication on this
				website. The site has been built using Remix v2, Three.js, and
				Cloudflare R2; however, due to rapid technological advancements,
				updates are anticipated throughout the 10,000-day
				period—approximately 28 years—to align with future web trends. I
				consider myself fortunate to possess a background as a web
				engineer, enabling me to address these challenges independently.
			</div>
		</div>
	)
}
