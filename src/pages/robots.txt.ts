import type { APIRoute } from 'astro'

function getRobotsTxt(sitemapURL: URL) {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${sitemapURL.href}`,
  ].join('\n')
}

export const GET: APIRoute = (context) => {
  const sitemapURL = new URL('sitemap-index.xml', context.site)

  return new Response(getRobotsTxt(sitemapURL), { status: 200 })
}
