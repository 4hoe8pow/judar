import type { MetaFunction } from '@remix-run/cloudflare'
import { container } from 'styled-system/patterns'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Judar' },
		{ name: 'description', content: 'Welcome to Remix!' },
	]
}

const styles = {
	container: container(),
}

export default function Index() {
	return <div className={styles.container}>Hello</div>
}
