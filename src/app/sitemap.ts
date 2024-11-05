import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/licenses',
    '/projects',
    '/skills',
    '/privacy-policy',
    '/articles',
  ]

  return paths.map(path => ({
    url: new URL(path, BASE_URL).toString(),
  }))
}
