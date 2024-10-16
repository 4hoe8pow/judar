import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import styles from './index.css?url'

import type { LinksFunction } from '@remix-run/cloudflare'

import { css } from 'styled-system/css'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{
		rel: 'preconnect',
		href: 'https://fonts.googleapis.com',
	},
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		href: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap',
		rel: 'stylesheet',
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<div
					className={css({
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh',
					})}
				>
					<Header />
					<main
						className={css({
							flex: 1,
						})}
					>
						{children}
					</main>
					<Footer />
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}
