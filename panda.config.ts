import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
	'html, body': {
		fontFamily: 'eb',
		fontSize: '[16px]',
		color: 'slate.800',
	},
})

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./app/**/*.{js,jsx,ts,tsx}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				fonts: {
					eb: { value: 'var(--font-eb), monospace' },
				},
			},
			keyframes: {
				fadein: {
					from: { opacity: 0, transform: 'translateY(-10px)' },
					to: { opacity: 1, transform: 'translateY(0)' },
				},
			},
		},
	},

	// The output directory for your css system
	outdir: 'styled-system',
	globalCss,
})
