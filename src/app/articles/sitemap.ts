import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'

import { findAllPost, readPost } from './post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await findAllPost()

  return Promise.all(
    articles.map(async articleId => ({
      url: new URL(`/articles/${articleId}`, BASE_URL).toString(),
      lastModified: (await readPost(articleId)).metadata.modifiedAt,
    }))
  )
}
