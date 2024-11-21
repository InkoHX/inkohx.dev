import { createHmac } from 'node:crypto'
import process from 'node:process'

export function createOpenGraphImagePath(title: string, categories: string[]) {
  const searchParams = new URLSearchParams()

  searchParams.append('title', title)
  categories.forEach(category => searchParams.append('category', category))

  const signature = createHmac('sha-256', process.env.OG_IMAGE_SIGNATURE_KEY!)
    .update(title + categories.join(''))
    .digest('base64url')

  searchParams.append('signature', signature)

  return `/api/opengraph-images/article?${searchParams.toString()}`
}
