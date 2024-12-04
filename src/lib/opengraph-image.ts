import { createHmac } from 'node:crypto'
import { OG_IMAGE_SIGNATURE_KEY } from 'astro:env/server'

export function createOpenGraphImagePath(title: string, categories: string[]) {
  const searchParams = new URLSearchParams()

  searchParams.append('title', title)
  categories.forEach(category => searchParams.append('category', category))

  const signature = createHmac('sha-256', OG_IMAGE_SIGNATURE_KEY)
    .update(title + categories.sort((a, b) => a.localeCompare(b)).join(''))
    .digest('base64url')

  searchParams.append('signature', signature)

  return `/api/opengraph-images/article?${searchParams.toString()}`
}
