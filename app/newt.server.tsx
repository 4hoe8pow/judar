import { createClient } from 'newt-client-js'

type NewtMeta = {
	createdAt: Date
}
export type Tag = {
	_id: string
	slug: string
	name: string
}
export type News = {
	_id: string
	_sys: NewtMeta
	title: string
	slug: string
	body: string
	tag: Tag
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
	const { items: tag } = await client.getContents<Tag>({
		appUid: appUid,
		modelUid: 'tag',
		query: {
			slug: 'devlog',
		},
	})
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			tag: { ne: tag[0]._id },
			select: ['_id', '_sys', 'title', 'slug', 'tag'],
		},
	})
	return items
}

export const getArticleList = async (
	spaceUid: string,
	appUid: string,
	token: string
) => {
	const client = generateClient(spaceUid, token)
	const { items: tag } = await client.getContents<Tag>({
		appUid: appUid,
		modelUid: 'tag',
		query: {
			slug: 'devlog',
		},
	})
	const { items } = await client.getContents<News>({
		appUid: appUid,
		modelUid: 'article',
		query: {
			tag: tag[0]._id,
			select: ['_id', '_sys', 'title', 'slug'],
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

	// items配列から1件を取得（slugはユニークなので1件のみ）
	return items.length > 0 ? items[0] : null
}
