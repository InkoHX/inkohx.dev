import './globals.css'

import type { Metadata } from 'next'

import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'

export const metadata: Metadata = {
  title: "InkoHX's portfolio",
  description: 'InkoHXのポートフォリオ的なやつ',
  twitter: {
    card: 'summary_large_image',
    creator: 'InkoHX',
  },
  openGraph: {
    type: 'website',
    siteName: "InkoHX' portfolio",
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
      className="has-[nav[data-mobile-nav-open=true]]:overflow-hidden"
    >
      <body className="min-h-screen bg-slate-100 antialiased">
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  )
}
