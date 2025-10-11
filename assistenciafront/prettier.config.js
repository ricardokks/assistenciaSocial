// prettier.config.js
export default {
  plugins: ['prettier-plugin-tailwindcss', '@trivago/prettier-plugin-sort-imports'],
  importOrder: ['react', 'next', '^@?\\w', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  tailwindAttributes: ['myClassList'],
  tailwindPreserveWhitespace: true,
  tailwindPreserveDuplicates: true,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'es5',
}
