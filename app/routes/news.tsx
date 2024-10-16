import { json, LoaderFunctionArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'

import { getNewsList } from '~/newt.server'

// loaderでNewt APIからデータを取得
export const loader = async ({ context }: LoaderFunctionArgs) => {
	const spaceUid = context.cloudflare.env.NEWT_SPACE_UID
	const appUid = context.cloudflare.env.NEWT_APP_UID
	const token = context.cloudflare.env.NEWT_CDN_API_TOKEN

	const newsList = await getNewsList(spaceUid, appUid, token)

	return json({ newsList })
}

export default function NewsPage() {
	const { newsList } = useLoaderData<typeof loader>()

	return (
		<section>
			<h1>News</h1>
			<ul>
				{newsList.map((news) => (
					<li key={news._id}>
						<Link to={`/post/${news.slug}`}>{news.title}</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
