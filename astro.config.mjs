// @ts-check
import process from 'node:process'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
    },
  },
  env: {
    validateSecrets: true,
    schema: {
      OG_IMAGE_SIGNATURE_KEY: envField.string({
        access: 'secret',
        context: 'server',
      }),
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
