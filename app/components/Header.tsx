import { useState, useEffect, useCallback, useRef } from 'react'

import { Link } from '@remix-run/react'

import { center, grid, gridItem, stack } from 'styled-system/patterns'

const styles = {
	header: (isVisible: boolean) =>
		stack({
			pos: 'sticky',
			top: 0,
			p: '1rem 2rem',
			boxShadow: 'lg',
			backdropFilter: 'auto',
			backdropBlur: 'sm',
			zIndex: '999',
			bg: 'white',
			transition: 'transform 0.5s ease-in-out',
			transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
			maxW: '100%',
		}),
	menu: grid({
		columns: 12,
	}),
	title: gridItem({
		colSpan: { base: 12, sm: 5 },
		fontSize: '1.6rem',
		fontWeight: 'bold',
		cursor: 'pointer',
		whiteSpace: 'nowrap',
	}),
	nav: gridItem({
		fontSize: { base: 22, sm: 26 },
		colSpan: { base: 12, sm: 7 },
		display: 'flex',
		justifyContent: { base: 'center', sm: 'flex-end' },
		gap: 4,
	}),
	navItem: center({
		position: 'relative',
		cursor: 'pointer',
		minW: 0,
		transition: 'color 0.4s ease',
		px: { base: 1, sm: 4 },
		color: { base: 'slate.800', _hover: 'violet.500' },
		_after: {
			content: '""',
			pos: 'absolute',
			bottom: 0,
			left: 0,
			w: '90%',
			h: '1px',
			bg: 'slate.500',
			transform: 'translateX(-100%)',
			opacity: 0,
			transition: 'transform 0.3s ease, opacity 0.3s ease',
		},
		_hover: {
			_after: { transform: 'translateX(0)', opacity: 1 },
		},
	}),
}

export const Header = () => {
	const [isVisible, setIsVisible] = useState(true)
	const lastScrollY = useRef(0)

	const handleScroll = useCallback(() => {
		if (window.scrollY > window.innerHeight / 2) {
			setIsVisible(false)
		} else if (window.scrollY < lastScrollY.current) {
			setIsVisible(true)
		}
		lastScrollY.current = window.scrollY
	}, [])

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [handleScroll])

	return (
		<header className={styles.header(isVisible)}>
			<menu className={styles.menu}>
				<Link to={'/'} className={styles.title} aria-label="home">
					GRILLWARE
				</Link>
				<nav className={styles.nav}>
					<Link
						to={'/about'}
						className={styles.navItem}
						aria-label="about"
					>
						About
					</Link>
					<Link
						to={'/news'}
						className={styles.navItem}
						aria-label="news"
					>
						News
					</Link>
					<Link
						to={'/judar'}
						className={styles.navItem}
						aria-label="judar"
					>
						Judar
					</Link>
					<Link
						to={'/studio'}
						className={styles.navItem}
						aria-label="studio"
					>
						Studio
					</Link>
					<Link
						to={'/contact'}
						className={styles.navItem}
						aria-label="contact"
					>
						Contact
					</Link>
				</nav>
			</menu>
		</header>
	)
}
