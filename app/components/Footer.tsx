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
		justifyContent: 'center',
		gap: '1.5rem',
		mt: '1rem',
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
					to="https://x.com/4hoe8pow"
					aria-label="X"
					className={styles.socialIcon}
				>
					<img src="/logo-x.svg" width={24} alt="Logo X"></img>
				</Link>
				<Link
					to="https://instagram.com/4b.grilled"
					aria-label="Instagram"
					className={styles.socialIcon}
				>
					<img src="/logo-ig.svg" width={24} alt="Logo IG"></img>
				</Link>
			</nav>
		</footer>
	)
}
