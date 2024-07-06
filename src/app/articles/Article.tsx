'use client'

import React from 'react'

import { mergeClassName } from '@/utils/mergeClassName'

export interface ArticleProps {
  articleLink: string
  publishedAt?: string
  title: string
  imageUrl?: string
}

type ImageLoadingStatus = 'LOADING' | 'LOADED' | 'FAILED'

export const Article: React.FC<ArticleProps> = props => {
  const dateTimeFormatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    dateStyle: 'long',
  })
  const [imageStatus, setImageStatus] =
    React.useState<ImageLoadingStatus>('LOADING')
  const imgRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    // キャッシュされている画像は、`load`イベントを発火させない為、その対策
    if (imgRef.current?.complete) setImageStatus('LOADED')
  }, [])

  return (
    <article className="group relative overflow-hidden rounded bg-slate-200 shadow-lg transition-shadow hover:shadow-xl">
      {props.imageUrl &&
        (imageStatus === 'LOADING' || imageStatus === 'LOADED') && (
          <img
            src={props.imageUrl}
            alt=""
            loading="lazy"
            height="256"
            width="512"
            className={mergeClassName(
              'max-h-64 w-full',
              imageStatus === 'LOADING' && 'animate-pulse bg-slate-400'
            )}
            onLoad={() => setImageStatus('LOADED')}
            onError={() => setImageStatus('FAILED')}
            ref={imgRef}
          />
        )}
      {imageStatus === 'FAILED' && (
        <div className="flex h-64 w-full items-center justify-center bg-red-200">
          <div className="not-sr-only select-none text-xl font-semibold">
            画像の読み込みに失敗しました。
          </div>
        </div>
      )}
      {!props.imageUrl && (
        <div className="flex h-64 w-full items-center justify-center bg-slate-300">
          <div className="not-sr-only select-none text-4xl font-semibold">
            NO IMAGE
          </div>
        </div>
      )}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">
          <a
            href={props.articleLink}
            className="before:absolute before:inset-0 before:z-10 before:content-[''] group-hover:text-primary-600"
          >
            {props.title}
          </a>
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          <span className="sr-only">投稿日: </span>
          {props.publishedAt
            ? dateTimeFormatter.format(Date.parse(props.publishedAt))
            : '不明'}
        </p>
      </div>
    </article>
  )
}
