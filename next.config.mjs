const developmentOnly = value =>
  process.env.NODE_ENV === 'development' ? value : ''
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${developmentOnly("'unsafe-eval'")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://res.cloudinary.com/zenn/image/upload/",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
]
  .map(it => it.trim())
  .join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@icons-pack/react-simple-icons'],
    outputFileTracingIncludes: {
      // OGP画像生成時、`posts`フォルダのMarkdownファイルを読み込もうとすると失敗する問題を修正するために設定
      '/articles/[articleId]/opengraph-image': ['./posts/*'],
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/articles/cached-images-do-not-trigger-load-event',
        destination: '/articles/htmlimageelement-load-event-not-catchable',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
