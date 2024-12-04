import type { Config, Context } from '@netlify/edge-functions'
import { decodeBase64Url } from 'https://deno.land/std@0.224.0/encoding/base64url.ts'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.6/mod.ts'
import React from 'https://esm.sh/react@18.2.0'

async function fetchGoogleFont(family: string, text: string) {
  let css: string

  {
    const response = await fetch(
      `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(text)}`,
      {
        headers: {
          // HACK: Satoriがwoff2に対応していないため、代わりにTrueTypeを取得する為のHACK
          'User-Agent': 'Mozilla/5.0',
        },
      },
    )

    if (!response.ok)
      throw new Error('Failed to fetch from Google Fonts API.')

    css = await response.text()
  }

  const fontUrl = /src:\surl\((?<fontUrl>.+)\)\sformat\('truetype'\);/.exec(css)
    ?.groups
    ?.fontUrl

  if (!fontUrl)
    throw new TypeError('"fontUrl" is undefined.')

  const response = await fetch(fontUrl)

  if (!response.ok)
    throw new Error('Failed to fetch font.')

  return response.arrayBuffer()
}

// eslint-disable-next-line react-refresh/only-export-components
const NotoSansJP = {
  Regular: (text: string) => fetchGoogleFont('Noto+Sans+JP', text),
  Bold: (text: string) => fetchGoogleFont('Noto+Sans+JP:wght@700', text),
} as const

async function verifySignature({ signature, title, categories }: { signature: string, title: string, categories: string[] }) {
  // HACK: 開発環境では環境変数が取得できないため、開発時はコードに直接埋め込んだ値を使用する
  const signatureKey = Netlify.env.get('OG_IMAGE_SIGNATURE_KEY') ?? (Netlify.env.get('NETLIFY_DEV') === 'true' ? 'this_is_a_secret_key' : undefined)

  if (!signatureKey)
    throw new Error('Environment variable "OG_IMAGE_SIGNATURE_KEY" is required.')

  const encoder = new TextEncoder()
  const data = encoder.encode(title + categories.sort((a, b) => a.localeCompare(b)).join(''))
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(signatureKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  )

  return crypto.subtle.verify({
    name: 'HMAC',
    hash: 'SHA-256',
  }, key, decodeBase64Url(signature), data)
}

export default async function handler(request: Request, _context: Context) {
  const requestURL = new URL(request.url)
  const title = requestURL.searchParams.get('title')
  const categories: string[] = requestURL.searchParams.getAll('category')
  const signature = requestURL.searchParams.get('signature')

  if (!title) {
    return new Response('"title" is required.', { status: 400 })
  }
  if (!signature) {
    return new Response('"signature" is required.', { status: 400 })
  }

  const isVerified = await verifySignature({ signature, title, categories })

  if (!isVerified) {
    return new Response('Invalid signature.', { status: 401 })
  }

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        background: '#2152ef',
        padding: 64,
        fontFamily: '\'Noto Sans JP\'',

      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f1f5f9',
          height: '100%',
          width: '100%',
          padding: 48,
          borderRadius: 16,
          boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 8,
              flexWrap: 'wrap',
              flex: 1,
            }}
          >
            {categories.map(category => (
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 400,
                  padding: '0.5rem',
                  backgroundColor: '#e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={category}
              >
                {category}
              </div>
            ))}
          </div>
          <img
            src="https://github.com/InkoHX.png"
            width={96}
            height={96}
            style={{ borderRadius: '100%' }}
          />
        </div>
      </div>
    </div>,
    {
      fonts: [
        {
          data: await NotoSansJP.Regular(categories.join('')),
          name: 'Noto Sans JP',
          weight: 400,
          style: 'normal',
        },
        {
          data: await NotoSansJP.Bold(title),
          name: 'Noto Sans JP',
          weight: 700,
          style: 'normal',
        },
      ],
      headers: {
        'cache-control': 'public, max-age=0, must-revalidate',
        'Netlify-CDN-Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
        'Netlify-Vary': 'query=title|category|signature',
      },
    },
  )
}

export const config = {
  path: '/api/opengraph-images/article',
  method: 'GET',
  cache: 'manual',
} satisfies Config
