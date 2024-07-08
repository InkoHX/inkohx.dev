import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: [
        'Yahoo Pipes 1.0',
        'Bytespider',
        'Livelapbot',
        'Megalodon',
        'ia_archiver',
      ],
      disallow: '/',
    },
    sitemap: [
      new URL('/sitemap.xml', BASE_URL),
      new URL('/articles/sitemap.xml', BASE_URL),
      new URL('/licenses/sitemap.xml', BASE_URL),
    ].map(url => url.toString()),
  }
}
