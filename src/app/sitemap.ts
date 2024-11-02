import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: new URL('/', BASE_URL).toString(),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: new URL('/licenses', BASE_URL).toString(),
      changeFrequency: 'weekly',
      lastModified: now,
      priority: 0.8,
    },
    {
      url: new URL('/projects', BASE_URL).toString(),
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: now,
    },
    {
      url: new URL('/skills', BASE_URL).toString(),
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: now,
    },
    /* {
      url: new URL('/privacy-policy', BASE_URL).toString(),
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: now,
    }, */
    {
      url: new URL('/articles', BASE_URL).toString(),
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: now,
    },
  ]
}
