/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'

import { NotoSansJP } from '@/utils/google-fonts'

import { read } from '../posts'
import { ArticleStaticParams } from './page'

export const runtime = 'nodejs'

export const revalidate = 0

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: ArticleStaticParams
}) {
  const post = await read(params.articleId)
  const [NotoSansJPRegular, NotoSansJPBold] = await Promise.all([
    NotoSansJP.Regular(post.metadata.categories.join('')),
    NotoSansJP.Bold(post.metadata.title),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: '#2152ef',
          padding: 64,
          fontFamily: "'Noto Sans JP'",
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
            {post.metadata.title}
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
              {post.metadata.categories.map(category => (
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
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          data: Buffer.from(NotoSansJPRegular),
          name: 'Noto Sans JP',
          weight: 400,
          style: 'normal',
        },
        {
          data: Buffer.from(NotoSansJPBold),
          name: 'Noto Sans JP',
          weight: 700,
          style: 'normal',
        },
      ],
    }
  )
}
