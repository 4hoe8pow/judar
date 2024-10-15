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
		games: [
			{
				name: 'Foo Game',
				description: 'A fantastic gaming experience',
				url: 'https://foo.com',
			},
			{
				name: 'Bar Game',
				description: 'An adventure awaits',
				url: 'https://bar.com',
			},
		],
		films: [
			{
				name: 'Foo Film',
				description: 'An exciting new release',
				url: 'https://foo-film.com',
			},
			{
				name: 'Bar Film',
				description: 'A cinematic masterpiece',
				url: 'https://bar-film.com',
			},
		],
		fab: [
			{
				name: 'Foo FAB',
				description: 'Innovative fabrication projects',
				url: 'https://foo-fab.com',
			},
			{
				name: 'Bar FAB',
				description: 'Cutting-edge designs',
				url: 'https://bar-fab.com',
			},
		],
	}
	return json(data)
}

export default function Index() {
	const { games, films, fab } = useLoaderData<typeof loader>()

	const [isGamesOpen, setIsGamesOpen] = useState(false)
	const [isFilmsOpen, setIsFilmsOpen] = useState(false)
	const [isFabOpen, setIsFabOpen] = useState(false)

	const toggleSection = (section: string) => {
		if (section === 'games') {
			setIsGamesOpen(!isGamesOpen)
		} else if (section === 'films') {
			setIsFilmsOpen(!isFilmsOpen)
		} else if (section === 'fab') {
			setIsFabOpen(!isFabOpen)
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
			color: 'sky.500',
			textDecoration: 'none',
			_hover: { textDecoration: 'underline' },
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

			{/* Games Section */}
			{renderSection('Games', games, isGamesOpen, () =>
				toggleSection('games')
			)}

			{/* Films Section */}
			{renderSection('Films', films, isFilmsOpen, () =>
				toggleSection('films')
			)}

			{/* FAB Section */}
			{renderSection('FAB', fab, isFabOpen, () => toggleSection('fab'))}
		</section>
	)
}
