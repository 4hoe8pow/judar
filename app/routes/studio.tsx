import { useState } from 'react'

import { MetaFunction, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware - Studio' },
	{
		name: 'description',
		content: 'Here is Grillware Studio.',
	},
]

// Loader function to fetch data
export const loader = async () => {
	const data = {
		films: [
			{
				name: 'ANCIENTS',
				description: 'A 3DCG animation based on the sport of Kabaddi.',
				url: 'https://www.youtube.com/channel/UCbHgL6VQB5vmFkExQkTJ4Bw',
			},
		],
		games: [
			{
				name: 'Surguess',
				description:
					'A mini-game where players guess which object has the largest surface area.',
				url: 'https://apps.apple.com/jp/app/surguess/id6736586676',
			},
			{
				name: 'Bakery Text',
				description: 'A text-based defense game.',
				url: 'https://apps.apple.com/jp/app/bakery-text/id6535655350',
			},
		],
		assets: [
			{
				name: '(WIP)FAB',
				description: 'For users of Unreal Engine.',
				url: 'https://fab.com',
			},
		],
	}

	return json(data)
}

export default function Index() {
	const { games, films, assets } = useLoaderData<typeof loader>()
	const [isFilmsOpen, setIsFilmsOpen] = useState(true)
	const [isGamesOpen, setIsGamesOpen] = useState(false)
	const [isAssetsOpen, setIsAssetsOpen] = useState(false)

	const toggleSection = (section: string) => {
		if (section === 'games') {
			setIsGamesOpen(!isGamesOpen)
		} else if (section === 'films') {
			setIsFilmsOpen(!isFilmsOpen)
		} else if (section === 'assets') {
			setIsAssetsOpen(!isAssetsOpen)
		}
	}

	const styles = {
		container: container({
			maxW: '4xl',
			mx: 'auto',
			px: '1.5rem',
			py: '3rem',
		}),
		title: css({
			fontSize: '2rem',
			fontWeight: 'bold',
			mb: '2rem',
			textAlign: 'center',
		}),
		sectionTitle: css({
			display: 'flex',
			alignItems: 'center',
			cursor: 'pointer',
			fontSize: '1.5rem',
			fontWeight: 'medium',
			mt: '1.5rem',
			mb: '1rem',
		}),
		list: css({
			listStyleType: 'none',
			p: 0,
			fontSize: '1.125rem',
			ml: 8,
			animation: 'fadein 0.3s ease',
		}),
		listItem: css({
			mb: '0.5rem',
		}),
		link: css({
			color: 'slate.500',
			textDecoration: 'none',
			_hover: { textDecoration: 'underline', color: 'slate.300' },
		}),
		icon: css({
			marginRight: '0.5rem',
			fontSize: '0.8rem',
			transform: 'rotate(0deg)',
			transition: 'transform 0.3s ease',
		}),
		iconOpen: css({
			transform: 'rotate(90deg)',
		}),
	}

	const renderSection = (
		title: string,
		items: { name: string; description: string; url: string }[],
		isOpen: boolean,
		toggle: () => void
	) => (
		<>
			<button
				className={styles.sectionTitle}
				onClick={toggle}
				aria-expanded={isOpen}
			>
				<span
					className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}
				>
					▶
				</span>
				{title}
			</button>
			{isOpen && (
				<ul className={styles.list}>
					{items.map((item) => (
						<li key={item.url} className={styles.listItem}>
							<a href={item.url} className={styles.link}>
								{item.name} - {item.description}
							</a>
						</li>
					))}
				</ul>
			)}
		</>
	)

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Latest from Grillware Studio</h1>
			{/* Films Section */}
			{renderSection('Films', films, isFilmsOpen, () =>
				toggleSection('films')
			)}
			{/* Games Section */}
			{renderSection('Games', games, isGamesOpen, () =>
				toggleSection('games')
			)}
			{/* Assets Section */}
			{renderSection('Assets', assets, isAssetsOpen, () =>
				toggleSection('assets')
			)}
		</section>
	)
}
