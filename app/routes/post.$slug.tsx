import { useEffect, useState } from 'react'

import { json, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getNewsBySlug } from '~/newt.server'

import { css } from 'styled-system/css'

// loaderでslugに基づくニュース記事のデータを取得
export const loader = async ({ params, context }: LoaderFunctionArgs) => {
	const { slug } = params
	const spaceUid = context.cloudflare.env.NEWT_SPACE_UID
	const appUid = context.cloudflare.env.NEWT_APP_UID
	const token = context.cloudflare.env.NEWT_CDN_API_TOKEN

	// ニュース記事を取得
	const news = await getNewsBySlug(spaceUid, appUid, token, slug as string)

	if (!news) {
		throw new Response('Not Found', { status: 404 })
	}

	return json({ news })
}

// ニュース記事詳細ページコンポーネント
export default function NewsDetailPage() {
	const { news } = useLoaderData<typeof loader>()
	const [isVisible, setIsVisible] = useState(false) // ステートを追加

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 0) // コンポーネントがマウントされたときにフェードインを開始
		return () => clearTimeout(timer) // クリーンアップ
	}, [])

	const styles = {
		articleBody: css.raw({
			m: '2rem auto',
			maxW: '6xl',
			px: 8,
			opacity: 0,
			transition: 'opacity 0.5s ease-in',

			'&.fadeIn': {
				opacity: 1,
			},
			// 段落のスタイル
			'& p': {
				fontSize: '1rem',
				lineHeight: '1.8',
				mb: '1.5rem',
				textAlign: 'justify',
			},

			// リスト（順序付き）のスタイル
			'& ol': {
				pl: '1.5rem',
				mb: '1.5rem',
			},
			// リストアイテムのスタイル
			'& ol > li': {
				fontSize: '1rem',
				lineHeight: '1.8',
				mb: '0.75rem',
				'&::marker': {
					fontWeight: 'bold',
				},
			},

			'& h2': {
				fontSize: '1.75rem',
				fontWeight: 'bold',
				borderBottom: '1px solid',
				borderColor: 'slate.800',
				pb: '0.5rem',
				m: '2rem 0 1rem',
			},
			'& pre': {
				bg: 'slate.800',
				p: '4',
				rounded: '8',
				overflowX: 'auto',
				fontFamily: 'Consolas, "Courier New", monospace',
				lineHeight: '1.6',
				mb: '1.5rem',
				fontSize: '0.8rem',
			},

			'& pre code': {
				color: 'teal.200',
			},
		}),
	}

	return (
		<article
			className={`${css(styles.articleBody)} ${isVisible ? 'fadeIn' : ''}`}
			dangerouslySetInnerHTML={{
				__html: `${news.body}`,
			}}
		/>
	)
}
