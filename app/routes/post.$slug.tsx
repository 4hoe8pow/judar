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
	const styles = {
		articleBody: css.raw({
			'& h2': {
				fontSize: '1.75rem',
				fontWeight: 'bold',
				borderBottom: '1px solid #666',
				paddingBottom: '0.5rem',
				marginBottom: '1rem',
			},
			'& p': {
				fontSize: '1rem',
				lineHeight: '1.6',
				marginBottom: '1.5rem',
				textAlign: 'justify',
			},
			'& ol': {
				paddingLeft: '1.5rem',
				marginBottom: '1.5rem',
			},
			'& ol > li': {
				fontSize: '1rem',
				lineHeight: '1.6',
				marginBottom: '0.75rem',
				'&::marker': {
					fontWeight: 'bold',
				},
			},
		}),
	}

	return (
		<article
			className={css(styles.articleBody)}
			dangerouslySetInnerHTML={{
				__html: `${news.body}`,
			}}
		/>
	)
}
