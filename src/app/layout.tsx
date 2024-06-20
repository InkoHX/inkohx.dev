import './globals.css'
import type { Metadata } from 'next'

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
    <html lang="ja">
      <body className="min-h-screen bg-slate-100 antialiased">{children}</body>
    </html>
  )
}
