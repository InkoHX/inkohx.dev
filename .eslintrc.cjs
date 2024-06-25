module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:tailwindcss/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'tailwindcss/classnames-order': 'off',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
}
