import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
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
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="py-24">
        <h1 className="text-7xl font-bold">プライバシーポリシー</h1>
        <p className="mt-8 max-w-prose text-2xl text-slate-700">
          アクセス解析やパフォーマンス測定の為のデータ収集について
        </p>
      </div>
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
        <table className="mt-4 w-full max-w-prose border-collapse border-2 border-slate-600">
          <caption className="mb-2 font-bold">
            収集するデータ（
            <a
              className="text-primary-600 hover:underline"
              href="https://vercel.com/docs/analytics/privacy-policy#data-point-information"
            >
              公式から引用
            </a>
            ）
          </caption>
          <thead>
            <tr>
              <th className="border-2 border-slate-300 px-4 py-2">項目</th>
              <th className="border-2 border-slate-300 px-4 py-2">値の例</th>
            </tr>
          </thead>
          <tbody>
            {vercelWebAnalyticsCollectedData.map(
              ([collectedValue, exampleValue]) => (
                <tr key={collectedValue}>
                  <td className="border-2 border-slate-300 px-4 py-2">
                    {collectedValue}
                  </td>
                  <td className="border-2 border-slate-300 px-4 py-2">
                    <code>{exampleValue}</code>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
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
        <table className="mt-4 w-full max-w-prose border-collapse border-2 border-slate-300">
          <caption className="mb-2 font-bold">
            収集するデータ（
            <a
              className="text-primary-600 hover:underline"
              href="https://vercel.com/docs/speed-insights/privacy-policy#vercel-speed-insights-privacy-&-compliance"
            >
              公式から引用
            </a>
            ）
          </caption>
          <thead>
            <tr>
              <th className="border-2 border-slate-300 px-4 py-2">項目</th>
              <th className="border-2 border-slate-300 px-4 py-2">値の例</th>
            </tr>
          </thead>
          <tbody>
            {vercelSpeedInsightsCollectedData.map(
              ([collectedValue, exampleValue]) => (
                <tr key={collectedValue}>
                  <td className="border-2 border-slate-300 px-4 py-2">
                    {collectedValue}
                  </td>
                  <td className="border-2 border-slate-300 px-4 py-2">
                    <code>{exampleValue}</code>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </main>
  )
}
