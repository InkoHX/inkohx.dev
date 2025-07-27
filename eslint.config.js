import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  astro: true,
  react: true,
  ignores: ['src/styles/global.css'], // FIXME: prettierの不具合が直るまで無効化
}, {
  ignores: [
    'dist/**/*',
    '.netlify/**/*',
    // FIXME: バグるため以下の2ファイルはとりあえず無視
    '**/src/components/AdSense/AdSenseDisplayUnit.astro',
    '**/src/components/AdSense/AdSenseMultiplexUnit.astro',
  ],
}, {
  rules: {
    'antfu/top-level-function': 'off',
  },
})
