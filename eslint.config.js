import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  astro: true,
  react: true,
}, {
  ignores: [
    'dist/**/*',
    '.netlify/**/*',
    // FIXME: バグるため以下の2ファイルはとりあえず無視
    '**/src/components/AdSense/AdSenseDisplayUnit.astro',
    '**/src/components/AdSense/AdSenseMultiplexUnit.astro',
  ],
})
