// @ts-check
import process from 'node:process'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), tailwind(), react()],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
    },
  },
  server: {
    port: 4321,
  },
  site: process.env.CONTEXT === 'production'
    ? process.env.URL
    : process.env.CONTEXT === 'deploy-preview'
      ? process.env.DEPLOY_URL
      : process.env.CONTEXT === 'branch-deploy'
        ? process.env.DEPLOY_PRIME_URL
        : 'http://localhost:8000',
})
