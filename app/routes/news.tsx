import { useMemo, useCallback } from 'react'

import { json, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'

import { formatDate } from '~/components/utils/formatDate'
import { getNewsList } from '~/newt.server'

import { css } from 'styled-system/css'
import { flex } from 'styled-system/patterns'

const ITEMS_PER_PAGE = 6

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const spaceUid = context.cloudflare.env.NEWT_SPACE_UID
	const appUid = context.cloudflare.env.NEWT_APP_UID
	const token = context.cloudflare.env.NEWT_CDN_API_TOKEN
	const newsList = await getNewsList(spaceUid, appUid, token)
	const sortedNewsList = newsList.sort((a, b) => {
		return (
			new Date(b._sys.createdAt).getTime() -
			new Date(a._sys.createdAt).getTime()
		)
	})
	return json({ news: sortedNewsList })
}

export default function NewsPage() {
	const { news } = useLoaderData<typeof loader>()
	const [searchParams, setSearchParams] = useSearchParams()
	const currentPage = useMemo(
		() => parseInt(searchParams.get('page') || '1', 10),
		[searchParams]
	)
	const paginatedNewsList = useMemo(
		() =>
			news.slice(
				(currentPage - 1) * ITEMS_PER_PAGE,
				currentPage * ITEMS_PER_PAGE
			),
		[news, currentPage]
	)
	const totalPages = useMemo(
		() => Math.ceil(news.length / ITEMS_PER_PAGE),
		[news]
	)

	const handlePageChange = useCallback(
		(page: number) => () => setSearchParams({ page: String(page) }),
		[setSearchParams]
	)

	const styles = {
		section: css({ m: '3rem auto', maxW: '4xl', px: '1.5rem' }),
		title: css({
			fontSize: '2.5rem',
			fontWeight: 'bold',
			mb: '2rem',
			hideBelow: 'sm',
		}),
		list: css({ listStyleType: 'none', padding: 0 }),
		listItem: css({
			borderBottom: '1px solid #ddd',
			p: '1rem 0',
			_hover: {
				transform: 'scale(1.01)',
			},
			transition: 'transform 0.3s ease',
		}),
		categoryDate: flex({
			align: 'center',
			justify: 'space-between',
			mb: '4',
		}),
		link: css({
			textDecoration: 'none',
			transition: 'color 0.3s ease',
			_hover: { color: 'violet.700' },
		}),
		tag: css({
			display: 'inline-block',
			bg: 'slate.800',
			color: 'slate.50',
			px: '0.75rem',
			py: '0.25rem',
			rounded: 'lg',
			fontSize: '0.875rem',
			fontWeight: 'medium',
		}),
		pagination: flex({
			justify: 'center',
			align: 'center',
			gap: '1rem',
			mt: '2rem',
		}),
		paginationButton: css({
			bg: 'slate.400',
			color: 'slate.50',
			px: '1rem',
			py: '0.5rem',
			cursor: 'pointer',
			rounded: '8',
			_hover: { bg: 'violet.700' },
			_disabled: { bg: 'violet.900', cursor: 'not-allowed' },
		}),
		noNewsMessage: css({
			textAlign: 'center',
			color: 'gray.500',
			fontSize: '1.25rem',
			mt: '2rem',
		}),
	}

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>News</h1>
			{news.length === 0 ? (
				<p className={styles.noNewsMessage}>
					There are currently no news articles available.
				</p>
			) : (
				<>
					<ul className={styles.list}>
						{paginatedNewsList.map((news) => (
							<Link
								key={news._id}
								to={`/post/${news.slug}`}
								className={styles.link}
							>
								<li className={styles.listItem}>
									<div className={styles.categoryDate}>
										<span className={styles.tag}>
											{news.tag.name}
										</span>
										{formatDate(news._sys.createdAt)}
									</div>
									{news.title}
								</li>
							</Link>
						))}
					</ul>

					{/* ページネーション */}
					<div className={styles.pagination}>
						{Array.from(
							{ length: totalPages },
							(_, i) => i + 1
						).map((page) => (
							<button
								key={page}
								className={styles.paginationButton}
								onClick={handlePageChange(page)}
								disabled={page === currentPage}
								aria-label={`Go to page ${page}`}
							>
								{page}
							</button>
						))}
					</div>
				</>
			)}
		</section>
	)
}
