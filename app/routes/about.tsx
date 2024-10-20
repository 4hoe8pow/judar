import { MetaFunction } from '@remix-run/cloudflare'
import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
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
		container: grid({ columns: 12, gap: 4, p: 12 }),
		heading: gridItem({
			colStart: { base: 2, sm: 4 },
			colEnd: { base: 12, sm: 10 },
			fontSize: '2xl',
			fontWeight: 'bold',
			mb: 8,
		}),
		paragraph: gridItem({
			colStart: { base: 2, sm: 4 },
			colEnd: { base: 12, sm: 10 },
			mb: 4,
		}),
		link: css({
			textDecoration: 'underline',
			px: 1,
			color: 'slate.600',
			_hover: {
				color: 'slate.400',
			},
		}),
	}

	return (
		<section className={styles.container}>
			<h1 className={styles.heading}>Greetings</h1>
			<div className={styles.paragraph}>
				As a personal hobby, I create 3D models, VFX, animated videos,
				and also develop web services. This website is built using
				<Link className={styles.link} to="https://remix.run/">
					Remix
				</Link>
				,
				<Link
					className={styles.link}
					to="https://www.cloudflare.com/ja-jp/developer-platform/pages/"
				>
					Cloudflare Pages
				</Link>
				, and
				<Link
					className={styles.link}
					to="https://www.cloudflare.com/ja-jp/developer-platform/r2/"
				>
					Cloudflare R2
				</Link>
				, with styling powered by
				<Link className={styles.link} to="https://panda-css.com/">
					Panda CSS
				</Link>
				. In today’s fast-paced digital landscape, web trends shift more
				rapidly than expected, and I intend to maintain this website’s
				tech stack in line with these evolving trends.
			</div>
			<div className={styles.paragraph}>
				The primary purpose of this website is to showcase assets
				created with Houdini. I hope something here catches your eye.
			</div>
		</section>
	)
}
