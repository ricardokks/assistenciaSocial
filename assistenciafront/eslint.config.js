import react from 'eslint-plugin-react'

import js from '@eslint/js'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      parser: await import('@typescript-eslint/parser'),
    },
    plugins: {
      react,
      tailwindcss,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          ignoreCase: true,
          reservedFirst: true,
        },
      ],

      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
      'tailwindcss/enforces-negative-arbitrary-values': 'warn',
      'tailwindcss/enforces-shorthand': 'warn',
      'tailwindcss/migration-from-tailwind-2': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',

      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'max-len': 'off',
    },
  },
]
