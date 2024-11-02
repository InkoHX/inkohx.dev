/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@icons-pack/react-simple-icons'],
    outputFileTracingIncludes: {
      // OGP画像生成時、`posts`フォルダのMarkdownファイルを読み込もうとすると失敗する問題を修正するために設定
      '/articles/[articleId]/opengraph-image': ['./posts/*'],
    },
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
