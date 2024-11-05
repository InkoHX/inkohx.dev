import { MetadataRoute } from 'next'

import { BASE_URL } from '@/constants'
import licenses from '@/generated/license.json' with { type: 'json' }

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(licenses).map(packageName => ({
    url: new URL(`/licenses/${packageName}`, BASE_URL).toString(),
  }))
}
