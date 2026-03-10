/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  printWidth: 80,
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  tabWidth: 2,

  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],

  importOrder: [
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],

  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  tailwindConfig: './tooling/tailwind-config',
}

module.exports = config
