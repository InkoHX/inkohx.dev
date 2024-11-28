import { getCollection } from 'astro:content'

export function findArticles() {
  return getCollection('articles', ({ data }) => !data.draft || import.meta.env.DEV)
}
