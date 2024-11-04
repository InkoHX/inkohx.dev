import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Pagination } from '@/components/Pagination'
import { chunk } from '@/utils/chunk'

import { Article } from './Article'
import { fetchFeeds } from './feed'

export const revalidate = 3_600 // every hour

export const metadata: Metadata = {
  title: '記事一覧',
  description: 'Zennに投稿した記事と、このサイトに投稿されたメモ的なやつの一覧',
  alternates: { canonical: '/articles' },
}

export default async function Articles(props: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const searchParams = await props.searchParams
  const chunkedItems = chunk(await fetchFeeds(), 9)
  const totalPages = chunkedItems.length
  const page = Array.isArray(searchParams.page)
    ? 1
    : Number.parseInt(searchParams.page, 10) || 1
  const items = chunkedItems[page - 1]

  if (!Array.isArray(items)) redirect(`/articles?page=1`)

  return (
    <Container
      className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] py-8"
      as="main"
    >
      <Hero
        title="記事一覧"
        subtitle="Zennに投稿した記事と、このサイトに投稿されたメモ的なやつの一覧"
        imageUrl="/img/undraw/blog-post.svg"
      />
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
    </Container>
  )
}
