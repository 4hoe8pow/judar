import { useState } from 'react'

import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getArticleList } from '~/newt.server'

import { css } from 'styled-system/css'
import { container } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware - Studio' },
	{ name: 'description', content: 'Here is Grillware Studio.' },
]

export const loader = async ({ context }: LoaderFunctionArgs) => {
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

	const {
		NEWT_SPACE_UID: spaceUid,
		NEWT_APP_UID: appUid,
		NEWT_CDN_API_TOKEN: token,
	} = context.cloudflare.env
	const articles = await getArticleList(spaceUid, appUid, token)
	const sortedArticles = articles.sort(
		(a, b) =>
			new Date(b._sys.createdAt).getTime() -
			new Date(a._sys.createdAt).getTime()
	)

	return json({ ...data, articles: sortedArticles })
}

export default function Index() {
	const { games, films, assets, articles } = useLoaderData<typeof loader>()
	const [openSections, setOpenSections] = useState({
		films: true,
		games: false,
		assets: false,
		articles: false,
	})

	const toggleSection = (section: keyof typeof openSections) =>
		setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

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
		listItem: css({ mb: '0.5rem' }),
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
		iconOpen: css({ transform: 'rotate(90deg)' }),
	}

	const renderSection = (
		title: string,
		items: { name: string; description?: string; url?: string }[],
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
					{items.map(({ name, description, url }) => (
						<li key={url || name} className={styles.listItem}>
							<a href={url} className={styles.link}>
								{name} {description ? ` - ${description}` : ''}
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
			{renderSection('Films', films, openSections.films, () =>
				toggleSection('films')
			)}
			{renderSection('Games', games, openSections.games, () =>
				toggleSection('games')
			)}
			{renderSection('Assets', assets, openSections.assets, () =>
				toggleSection('assets')
			)}
			{renderSection(
				'Articles',
				articles.map((article) => ({
					name: article.title,
					url: `/post/${article.slug}`,
				})),
				openSections.articles,
				() => toggleSection('articles')
			)}
		</section>
	)
}
