import { Link } from '@remix-run/react'

import { css } from 'styled-system/css'
import { flex, stack } from 'styled-system/patterns'

const styles = {
	footer: stack({
		p: '2rem',
		bg: 'slate.100',
		textAlign: 'center',
	}),
	copyRight: css({
		fontSize: '0.9rem',
		color: 'slate.600',
	}),
	socialNav: flex({
		justify: 'center',
		align: 'center',
		gap: '8',
		mt: '4',
	}),
	socialIcon: css({
		fontSize: '1.5rem',
		color: { base: 'slate.700', _hover: 'blue.600' },
		cursor: 'pointer',
	}),
}

export const Footer = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={styles.footer}>
			<p className={styles.copyRight}>
				© {currentYear} Grillware. All rights reserved.
			</p>
			<nav className={styles.socialNav}>
				<Link
					to="https://x.com/judar_grillware"
					aria-label="X"
					className={styles.socialIcon}
				>
					<img src="/logo-x.svg" width={16} alt="Logo X"></img>
				</Link>
				<Link
					to="https://www.youtube.com/channel/UCbHgL6VQB5vmFkExQkTJ4Bw"
					aria-label="Youtube"
					className={styles.socialIcon}
				>
					<img src="/logo-yt.png" width={16} alt="Logo Youtube"></img>
				</Link>
				<Link
					to="https://instagram.com/judar.grillware"
					aria-label="Instagram"
					className={styles.socialIcon}
				>
					<img src="/logo-ig.svg" width={16} alt="Logo IG"></img>
				</Link>
			</nav>
		</footer>
	)
}
