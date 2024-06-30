import GitHubSlugger from 'github-slugger'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostBody } from '@/components/PostBody/PostBody'
import { isSystemError } from '@/utils/system-error'

import * as Post from '../posts'
import { extractHeadings, markdownToHtml } from './markdown-parser'

interface StaticParams {
  articleId: string
}

/**
 * `Post.read`のラッパー関数
 *
 * NOTE: 記事が存在しないと`notFound`関数を実行します。
 */
const readPost = async (id: string) => {
  try {
    return await Post.read(id)
  } catch (error: unknown) {
    if (isSystemError(error)) {
      if (error.code === 'ENOENT') return notFound()
    }

    throw error
  }
}

export async function generateStaticParams(): Promise<StaticParams[]> {
  const posts = await Post.findAll()

  return posts.map((id): StaticParams => ({ articleId: id }))
}

export async function generateMetadata({
  params,
}: {
  params: StaticParams
}): Promise<Metadata> {
  const post = await readPost(params.articleId)

  return {
    title: post.metadata.title,
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

export default async function PostPage({ params }: { params: StaticParams }) {
  const post = await readPost(params.articleId)
  const html = await markdownToHtml(post.content)
  const isUpdated = post.metadata.publishedAt !== post.metadata.modifiedAt
  const headings = extractHeadings(post.content).filter(
    ({ depth }) => depth === 2
  )
  const slugger = new GitHubSlugger()

  return (
    <article className="py-8">
      <header className="mx-auto max-w-7xl px-4 py-24">
        <h1 className="text-6xl font-bold">{post.metadata.title}</h1>
        <p className="mt-2 text-lg text-slate-600">
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
        </p>
      </header>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 px-4 sm:grid-cols-3 sm:gap-x-8">
        <div>
          <nav className="top-8 order-last rounded bg-slate-200 p-4 sm:sticky sm:order-last">
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
        <div className="order-last col-span-2 sm:order-first">
          <PostBody content={html.toString()} />
        </div>
      </div>
    </article>
  )
}
