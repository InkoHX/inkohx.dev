import './globals.css'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { BASE_URL } from '@/constants'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | InkoHX's portfolio",
    default: "InkoHX's portfolio",
  },
  description: 'InkoHXのポートフォリオみたいなやつです。',
  twitter: {
    card: 'summary_large_image',
    creator: 'InkoHX',
  },
  openGraph: {
    type: 'website',
    siteName: "InkoHX's portfolio",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className="scroll-smooth has-[nav[data-mobile-nav-open=true]]:overflow-hidden"
    >
      <body className="min-h-screen bg-slate-100 antialiased">
        <AppHeader />
        {children}
        <AppFooter />

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
