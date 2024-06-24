import { cache } from 'react'
import RSSParser from 'rss-parser'

export const fetchFeed = cache((feedUrl: string) => {
  const parser = new RSSParser()

  return parser.parseURL(feedUrl)
})
