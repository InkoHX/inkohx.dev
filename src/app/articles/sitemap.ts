import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'

import { findAllPost } from './post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await findAllPost()

  return articles.map(articleId => ({
    url: new URL(`/articles/${articleId}`, BASE_URL).toString(),
    changeFrequency: 'daily',
    priority: 1,
    lastModified: new Date(),
  }))
}
