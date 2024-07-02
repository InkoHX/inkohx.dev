/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@icons-pack/react-simple-icons'],
    outputFileTracingIncludes: {
      '/articles/[articleId]/opengraph-image': ['./posts/*'],
    },
  },
}

export default nextConfig
