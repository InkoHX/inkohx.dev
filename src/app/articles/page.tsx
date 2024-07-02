import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Parser from 'rss-parser'

import { Pagination } from '@/components/Pagination'
import { chunk } from '@/utils/chunk'

import { Article } from './Article'
import { fetchFeeds, fetchFromRSS } from './feed'
import * as Post from './posts'

export const revalidate = 3_600 // every hour

export const metadata: Metadata = {
  title: '記事一覧',
}

export default async function Articles({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>
}) {
  const chunkedItems = chunk(await fetchFeeds(), 9)
  const totalPages = chunkedItems.length
  const page = Array.isArray(searchParams.page)
    ? 1
    : Number.parseInt(searchParams.page, 10) || 1
  const items = chunkedItems[page - 1]

  if (!Array.isArray(items)) redirect(`/articles?page=1`)

  return (
    <main className="mx-auto min-h-[calc(100vh-var(--header-height)-var(--footer-height))] max-w-7xl px-4 py-8">
      <div
        className="bg-slate-100/90 bg-contain bg-right-bottom bg-no-repeat py-48 bg-blend-lighten lg:bg-blend-normal"
        style={{ backgroundImage: "url('/img/undraw/blog-post.svg')" }}
      >
        <div className="max-w-prose">
          <h1 className="text-7xl font-bold">記事一覧</h1>
          <p className="mt-8 text-4xl text-slate-700">
            Zennに投稿した記事と、このサイトに投稿されたメモ的なやつの一覧
          </p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) =>
          item.type === 'rss' ? (
            <Article
              key={index}
              articleLink={item.value.link!}
              title={item.value.title!}
              imageUrl={item.value.enclosure?.url}
              publishedAt={item.value.isoDate}
            />
          ) : (
            <Article
              key={index}
              articleLink={`/articles/${item.value.id}`}
              title={item.value.title}
              imageUrl={`/articles/${item.value.id}/opengraph-image`}
              publishedAt={item.value.publishedAt}
            />
          )
        )}
      </div>
      <div
        className="mt-8 hidden justify-center data-[paginateable=true]:flex"
        data-paginateable={totalPages > 1}
      >
        <Pagination totalPages={totalPages} defaultPage={page} maxPages={3} />
      </div>
    </main>
  )
}
