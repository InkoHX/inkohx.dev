const fetchGoogleFont = async (family: string, text: string) => {
  let css: string

  {
    const response = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
      {
        cache: 'force-cache',
        headers: {
          'User-Agent':
            // HACK: Satoriがwoff2に対応していないため、代わりにTrueTypeを取得する為のHACK
            'Mozilla/5.0',
        },
      }
    )

    if (!response.ok) throw Error('Failed to fetch from Google Fonts API.')

    css = await response.text()
  }

  const fontUrl = /src:\surl\((?<fontUrl>.+)\)\sformat\('truetype'\);/.exec(css)
    ?.groups?.fontUrl

  if (!fontUrl) throw new TypeError('"fontUrl" is undefined.')

  const response = await fetch(fontUrl, { cache: 'force-cache' })

  if (!response.ok) throw new Error('Failed to fetch font.')

  return response.arrayBuffer()
}

export const NotoSansJP = {
  Regular: (text: string) => fetchGoogleFont('Noto+Sans+JP', text),
  Bold: (text: string) => fetchGoogleFont('Noto+Sans+JP:wght@700', text),
} as const
