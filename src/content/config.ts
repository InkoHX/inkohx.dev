import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().default(false),
    title: z.string(),
    publishedAt: z.coerce.date(),
    modifiedAt: z.coerce.date().optional(),
    categories: z.array(z.string()).min(1),
  }),
})

export const collections = { articles }
