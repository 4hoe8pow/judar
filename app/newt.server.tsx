import { createClient } from 'newt-client-js'

export type News = {
	_id: string
	title: string
	slug: string
	body: string
}

const generateClient = (spaceUid: string, token: string) => {
	return createClient({
		spaceUid,
		token,
		apiType: 'cdn',
	})
}

export const getNewsList = async (
	spaceUid: string,
	appUid: string,
	token: string
) => {
	const client = generateClient(spaceUid, token)
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			select: ['_id', 'title', 'slug'],
		},
	})
	return items
}

export const getNewsBySlug = async (
	spaceUid: string,
	appUid: string,
	token: string,
	slug: string
) => {
	const client = generateClient(spaceUid, token)
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			slug,
		},
	})

	// items配列から1件を取得（slugはユニークなので1件のみのはず）
	return items.length > 0 ? items[0] : null
}
