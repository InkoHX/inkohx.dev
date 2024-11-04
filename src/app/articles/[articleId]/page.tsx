import GitHubSlugger from 'github-slugger'
import { Metadata } from 'next'

import AdSenseDisplayUnit from '@/components/AdSense/AdSenseDisplayUnit'
import AdSenseScript from '@/components/AdSense/AdSenseScript'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { JSON_LD } from '@/components/JSON-LD'
import { PostBody } from '@/components/PostBody/PostBody'
import { adSenseSlots, BASE_URL } from '@/constants'

import { findAllPost, readPost } from '../post'
import { extractHeadings, markdownToHtml } from './markdown-parser'

export interface ArticleStaticParams {
  articleId: string
}

export const runtime = 'nodejs'
export const revalidate = false
export const dynamic = 'error'
export const dynamicParams = false

export async function generateStaticParams(): Promise<ArticleStaticParams[]> {
  const posts = await findAllPost()

  return posts.map((id): ArticleStaticParams => ({ articleId: id }))
}

export async function generateMetadata(props: {
  params: Promise<ArticleStaticParams>
}): Promise<Metadata> {
  const params = await props.params
  const post = await readPost(params.articleId)

  return {
    title: post.metadata.title,
    alternates: { canonical: `/articles/${params.articleId}` },
    openGraph: {
      type: 'article',
      publishedTime: new Date(post.metadata.publishedAt).toISOString(),
      modifiedTime: new Date(post.metadata.modifiedAt).toISOString(),
      expirationTime: new Date(
        Date.parse(post.metadata.modifiedAt) + 31_536_000_000
      ).toISOString(),
      tags: post.metadata.categories,
    },
  }
}

export default async function PostPage(props: {
  params: Promise<ArticleStaticParams>
}) {
  const params = await props.params
  const post = await readPost(params.articleId)
  const html = await markdownToHtml(post.content)
  const isUpdated = post.metadata.publishedAt !== post.metadata.modifiedAt
  const headings = extractHeadings(post.content).filter(
    ({ depth }) => depth === 2
  )
  const slugger = new GitHubSlugger()

  return (
    <>
      <AdSenseScript />
      <JSON_LD.Article
        structure={{
          '@type': 'BlogPosting',
          headline: post.metadata.title,
          datePublished: new Date(post.metadata.publishedAt).toISOString(),
          dateModified: new Date(post.metadata.modifiedAt).toISOString(),
          image: new URL(
            `/articles/${params.articleId}/opengraph-image`,
            BASE_URL
          ).toString(),
          author: {
            '@type': 'Person',
            name: 'InkoHX',
            url: 'https://inkohx.dev',
          },
        }}
      />
      <article className="py-8">
        <Container as="header">
          <Hero
            title={post.metadata.title}
            subtitle={
              <>
                <span className="inline-block">
                  公開日:{' '}
                  <time dateTime={post.metadata.publishedAt}>
                    {post.metadata.publishedAt}
                  </time>{' '}
                </span>
                {isUpdated && (
                  <span className="inline-block">
                    （更新日:{' '}
                    <time dateTime={post.metadata.modifiedAt}>
                      {post.metadata.modifiedAt}
                    </time>
                    ）
                  </span>
                )}
              </>
            }
          />
        </Container>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-4 sm:grid-cols-3 sm:gap-x-8">
          <div className="order-first col-span-1 sm:order-last">
            <div className="top-8 sm:sticky">
              <AdSenseDisplayUnit
                className="mb-4 block max-h-64 w-full"
                slot={adSenseSlots.article}
              />
              <nav className="block rounded bg-slate-200 p-4 shadow-lg">
                <div className="text-2xl font-semibold">目次</div>
                <ul className="mt-2 list-inside list-disc">
                  {headings.map(({ text }) => (
                    <li key={text}>
                      <a
                        href={`#${slugger.slug(text)}`}
                        className="font-semibold text-primary-600 hover:underline"
                      >
                        {text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-span-2">
            <PostBody content={html.toString()} />
          </div>
        </div>
      </article>
    </>
  )
}
