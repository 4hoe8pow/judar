import { defineConfig, defineGlobalStyles } from '@pandacss/dev'

const globalCss = defineGlobalStyles({
	'html, body': {
		fontFamily: 'eb',
		fontSize: 26,
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
		},
	},

	// The output directory for your css system
	outdir: 'styled-system',
	globalCss,
})
