import { Metadata } from 'next'

import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'
import { Table } from '@/components/Table'
import { TableCell } from '@/components/TableCell'
import { TableHead } from '@/components/TableHead'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'アクセス解析やパフォーマンス測定の為のデータ収集について',
}

const vercelWebAnalyticsCollectedData = [
  ['Event Timestamp', '2020-10-29 09:06:30'],
  ['URL', '/blog/nextjs-10'],
  ['Dynamic Path', '/blog/[slug]'],
  ['Referrer', 'https://news.ycombinator.com/'],
  ['Query Params (Filtered)', '?ref=hackernews'],
  ['Geolocation', 'US, California, San Francisco'],
  ['Device OS & Version', 'Android 10'],
  ['Browser & Version', 'Chrome 86 (Blink)'],
  ['Device Type', 'Mobile (or Desktop/Tablet)'],
  ['Web Analytics Script Version', '1.0.0'],
] satisfies [string, string][]

const vercelSpeedInsightsCollectedData = [
  ['Route', '/blog/[slug]'],
  ['URL', '/blog/nextjs-10'],
  ['Network Speed', '4g (or slow-2g, 2g, 3g)'],
  ['Browser', 'Chrome 86 (Blink)'],
  ['Device Type', 'Mobile (or Desktop/Tablet)'],
  ['Device OS', 'Android 10'],
  ['Country (ISO 3166-1 alpha-2)', 'US'],
  ['Web Vital	FCP', '1.0s'],
  ['Web Vital Attribution', 'html>body img.header'],
  ['SDK Information', '@vercel/speed-insights 0.1.0'],
  ['Server-Received Event Time', '2023-10-29 09:06:30'],
] satisfies [string, string][]

export default function PrivacyPolicy() {
  return (
    <Container className="py-8" as="main">
      <Hero
        title="プライバシーポリシー"
        subtitle="アクセス解析やパフォーマンス測定の為のデータ収集について"
      />
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">アクセス解析について</h2>
        <p className="mt-4">
          サイトの改善に役立てる為に、
          <a
            className="text-primary-600 hover:underline"
            href="https://vercel.com/docs/analytics"
          >
            Vercel Web Analytics
          </a>
          を利用してアクセス解析を行っています。
          <br />
          プライバシーに関する詳しい情報は
          <a
            className="text-primary-600 hover:underline"
            href="https://vercel.com/docs/analytics/privacy-policy"
          >
            こちら
          </a>
          のページからご覧ください。
        </p>
        <div className="mt-4">
          <Table
            caption={
              <span>
                収集するデータ（
                <a
                  className="text-primary-600 hover:underline"
                  href="https://vercel.com/docs/analytics/privacy-policy#data-point-information"
                >
                  公式から引用
                </a>
                ）
              </span>
            }
          >
            <TableHead>
              <tr>
                <TableCell as="th">項目</TableCell>
                <TableCell as="th">値の例</TableCell>
              </tr>
            </TableHead>
            <tbody>
              {vercelWebAnalyticsCollectedData.map(
                ([collectedValue, exampleValue]) => (
                  <tr key={collectedValue}>
                    <TableCell>{collectedValue}</TableCell>
                    <TableCell>
                      <code>{exampleValue}</code>
                    </TableCell>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">パフォーマンス測定について</h2>
        <p className="mt-4">
          サイトの改善に役立てる為に、
          <a
            className="text-primary-600 hover:underline"
            href="https://vercel.com/docs/speed-insights"
          >
            Vercel Speed Insights
          </a>
          を利用してパフォーマンス測定を行っています。
          <br />
          プライバシーに関する詳しい情報は
          <a
            className="text-primary-600 hover:underline"
            href="https://vercel.com/docs/speed-insights/privacy-policy"
          >
            こちら
          </a>
          のページをご覧ください。
        </p>
        <div className="mt-4">
          <Table
            caption={
              <span>
                収集するデータ（
                <a
                  className="text-primary-600 hover:underline"
                  href="https://vercel.com/docs/speed-insights/privacy-policy#vercel-speed-insights-privacy-&-compliance"
                >
                  公式から引用
                </a>
                ）
              </span>
            }
          >
            <TableHead>
              <tr>
                <TableCell as="th">項目</TableCell>
                <TableCell as="th">値の例</TableCell>
              </tr>
            </TableHead>
            <tbody>
              {vercelSpeedInsightsCollectedData.map(
                ([collectedValue, exampleValue]) => (
                  <tr key={collectedValue}>
                    <TableCell>{collectedValue}</TableCell>
                    <TableCell>
                      <code>{exampleValue}</code>
                    </TableCell>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">FAQ</h2>
        <dl className="mt-4">
          <dt className="text-xl font-semibold">無効にできないんですか</dt>
          <dd className="mt-2">
            現時点で無効にする機能を実装する予定はないので、
            <strong>無効化することはできません。</strong>
            <br />
            どうしても無理という場合は、このサイトから立ち去るかコンテンツブロッカーを使うことを推奨します。
          </dd>
        </dl>
      </section>
    </Container>
  )
}
