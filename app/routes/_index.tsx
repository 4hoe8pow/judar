import { MetaFunction } from '@remix-run/cloudflare'

import { css } from 'styled-system/css'
import { grid, gridItem } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware' },
	{
		name: 'description',
		content: 'Welcome to Grillware',
	},
]

const projects = [
	{
		name: 'Ancient',
		description:
			'A 3D CG short film inspired by the sport of Kabaddi, created using Houdini 20.5 and Unreal Engine 5. This project aims to explore the intersection of technology and the cultural heritage of Kabaddi.',
	},
	{
		name: 'Judar',
		description:
			'On October 20, 2024, I began a 10,000-day journey to release daily assets made with Houdini. This initiative focuses on building expertise in 3D CGI over an extended period.',
	},
	{
		name: 'Game Development',
		description:
			'A series of free mini-games developed in Unity, available on the App Store, covering a variety of genres.',
	},
	{
		name: 'Asset Sales',
		description:
			"Offering various 3D models and VFX assets for sale on the 'FAB' marketplace.",
	},
]

export default function Index() {
	const styles = {
		container: grid({
			columns: 12,
			gap: 4,
			mb: 8,
			justifyItems: 'center',
		}),
		message: gridItem({
			colSpan: 12,
			color: 'slate.200',
			textAlign: 'center',
			bg: 'slate.900',
			w: '100%',
		}),
		heading: css({
			fontSize: { base: '3xl', sm: '5xl' },
			fontWeight: 'bold',
			py: 8,
		}),
		paragraph: css({
			fontSize: { base: 'lg', sm: 'xl' },
			lineHeight: 'tall',
			paddingBottom: 4,
		}),
		projectItem: gridItem({
			colSpan: { base: 12, sm: 6 },
			w: '92%',
			p: 4,
			rounded: 'lg',
			boxShadow:
				'-12px 12px 18px rgba(0, 0, 0, 0.3), inset 6px -6px 9px rgba(0, 0, 0, 0.3), inset -6px 6px 9px rgba(255, 255, 255, 0.6)',
			transition: 'transform 0.3s ease',
			_hover: {
				transform: 'scale(1.05)',
			},
		}),
		projectHeading: css({
			fontSize: 'xl',
			fontWeight: 'bold',
			mb: 2,
		}),
		projectDescription: css({
			fontSize: 'md',
		}),
	}

	return (
		<section className={styles.container}>
			<div className={styles.message}>
				<h1 className={styles.heading}>GRILLWARE PRESENTS</h1>
				<p className={styles.paragraph}>
					Enabling the gateway to transformative journeys.
				</p>
			</div>
			{projects.map((project, index) => (
				<div key={index} className={styles.projectItem}>
					<h2 className={styles.projectHeading}>{project.name}</h2>
					<p className={styles.projectDescription}>
						{project.description}
					</p>
				</div>
			))}
		</section>
	)
}
