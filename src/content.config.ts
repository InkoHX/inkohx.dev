import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
    categories: z.array(z.string()).min(1),
  }),
})

export const collections = { articles }
