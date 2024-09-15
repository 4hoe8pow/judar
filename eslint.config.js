import globals from 'globals'
import { FlatCompat } from '@eslint/eslintrc'
import { config, configs, plugin } from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import reactJSXRuntime from 'eslint-plugin-react/configs/jsx-runtime.js'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'

const compat = new FlatCompat()

const baseConfig = {
	ignores: [
		'node_modules',
		'.cache',
		'build',
		'public/build',
		'.env',
		'*.config.ts',
		'tailwind.config.ts',
		'styled-system',
		'worker-configuration.d.ts',
	],
}

const reactConfig = {
	...reactRecommended,
	...reactJSXRuntime,
	rules: {
		...reactRecommended.rules,
		...reactJSXRuntime.rules,
	},
	languageOptions: {
		...reactRecommended.languageOptions,
		...reactJSXRuntime.languageOptions,
	},
	plugins: {
		react: reactPlugin,
		'jsx-a11y': jsxA11yPlugin,
	},
	extends: [
		...compat.config(reactHooksPlugin.configs.recommended),
		...compat.config(jsxA11yPlugin.configs.recommended),
	],
	settings: {
		react: {
			version: 'detect',
		},
		formComponents: ['Form'],
		linkComponents: [
			{ name: 'Link', linkAttribute: 'to' },
			{ name: 'NavLink', linkAttribute: 'to' },
		],
		import: {
			resolver: {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
				typescript: {
					project: '.',
				},
				alias: {
					map: [['~', './app']],
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
	},
}

const typescriptConfig = {
	plugins: {
		'@typescript-eslint': plugin,
		import: importPlugin,
	},
	extends: [
		...configs.recommended,
		...compat.config(importPlugin.configs.recommended),
		...compat.config(importPlugin.configs.typescript),
	],
	settings: {
		'import/internal-regex': '^~/',
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			typescript: {
				project: '.',
			},
		},
		'import/parsers': {
			'@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
		},
	},
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
			},
		],
		'import/no-named-as-default': 'off',
		'import/no-named-as-default-member': 'off',
		'no-console': 'warn',
		'import/namespace': 'off',
		'import/order': [
			'error',
			{
				groups: [
					'builtin',
					'external',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
				],
				pathGroups: [
					{
						pattern: '{react,react-dom/**,react-router-dom}',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '~/**',
						group: 'parent',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				alphabetize: {
					order: 'asc',
				},
				'newlines-between': 'always',
			},
		],
	},
}

const nodeConfig = {
	languageOptions: {
		globals: {
			...globals.node,
		},
	},
}

export default config(
	baseConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		...reactConfig,
	},
	{
		files: ['**/*.{ts,tsx}'],
		...typescriptConfig,
	},
	{
		files: ['eslint.config.js'],
		...nodeConfig,
	}
)
