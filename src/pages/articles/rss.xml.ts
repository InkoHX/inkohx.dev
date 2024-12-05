import type { APIRoute } from 'astro'
import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import constants from '../../constants'

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('articles')

  return rss({
    title: constants.website.title,
    description: constants.website.description,
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      categories: post.data.categories,
      link: `/articles/${post.slug}/`,
    })),
  })
}
