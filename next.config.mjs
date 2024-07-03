/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@icons-pack/react-simple-icons'],
    outputFileTracingIncludes: {
      // OGP画像生成時、`posts`フォルダのMarkdownファイルを読み込もうとすると失敗する問題を修正するために設定
      '/articles/[articleId]/opengraph-image': ['./posts/*'],
    },
  },
}

export default nextConfig
