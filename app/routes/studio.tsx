import { MetaFunction } from '@remix-run/cloudflare'

import { container } from 'styled-system/patterns'

export const meta: MetaFunction = () => [
	{ title: 'Grillware - Studio' },
	{
		name: 'description',
		content: 'Here is grillware studio.',
	},
]

export default function Index() {
	const styles = {
		container: container({}),
	}

	return <section className={styles.container}>Blog</section>
}
