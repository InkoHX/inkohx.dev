import { cache } from 'react'
import Parser from 'rss-parser'
import RSSParser from 'rss-parser'

import { findAllPost, PostMetadata, readPost } from './post'

export const fetchFromRSS = cache((feedUrl: string) => {
  const parser = new RSSParser()

  return parser.parseURL(feedUrl)
})

export type Feed =
  | {
      type: 'rss'
      value: {
        [key: string]: any
      } & Parser.Item
    }
  | {
      type: 'local'
      value: PostMetadata & { id: string }
    }

export const fetchFeeds = async () => {
  const feeds = await Promise.all([
    fetchFromRSS('https://zenn.dev/inkohx/feed'),
    //fetchFeed('https://qiita.com/inkohx/feed'),
  ])
  const localPostIds = await findAllPost()
  const localPosts = await Promise.all(
    localPostIds.map(async id => ({
      ...(await readPost(id)).metadata,
      id: id,
    }))
  )

  return (
    [
      ...localPosts.map((data): Feed => ({ type: 'local', value: data })),
      ...feeds
        .flatMap(feed => feed.items)
        .map((item): Feed => ({ type: 'rss', value: item })),
    ] satisfies Feed[]
  ).sort((a, b) => {
    const aDate = a.type === 'rss' ? a.value.isoDate : a.value.publishedAt
    const bDate = b.type === 'rss' ? b.value.isoDate : b.value.publishedAt

    if (!aDate || !bDate) return 0

    return Date.parse(bDate) - Date.parse(aDate)
  })
}
