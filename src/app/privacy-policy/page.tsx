import { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'データの取り扱いなどについて',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicy() {
  return (
    <Container className="py-8" as="main">
      <Hero
        title="プライバシーポリシー"
        subtitle="データの取り扱いなどについて"
      />
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">広告について</h2>
        <p className="mt-4">
          当サイトでは、一部のページで第三者配信事業者であるGoogleが提供する広告を表示しています。
          GoogleはCookieを使用して、あなたが当サイトや他のウェブサイトに過去にアクセスした情報に基づいて広告を配信します。
        </p>
        <h3 className="mt-4 text-2xl font-semibold">広告のCookieについて</h3>
        <p className="mt-2">
          GoogleはCookieを利用して、あなたが当サイトや他のサイトにアクセスした際の情報に基づき、Googleやそのパートナーがユーザーに最適なパーソナライズされた広告を表示できるようにしています。
          <br />
          これを無効化したい場合、
          <a
            href="https://adssettings.google.com/authenticated"
            className="text-primary-600 hover:underline"
          >
            Googleの広告設定
          </a>
          からパーソナライズ広告を無効にすることができます。
          <br />
          また、
          <a
            href="https://www.aboutads.info/choices"
            className="text-primary-600 hover:underline"
          >
            www.aboutads.info
          </a>
          にアクセスすることで、パーソナライズ広告に利用される第三者配信事業者のCookieを無効にすることもできます。
        </p>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">免責事項</h2>
        <ul className="mt-4 list-inside list-disc">
          <li>掲載内容によって生じた損害に対する一切の責任は負えません</li>
          <li>
            投稿している記事については、できる限り正確な情報提供を心がけていますが、保証はできません
          </li>
          <li>
            外部リンク先で提供される情報・サービスに関して責任は負いかねます
          </li>
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">当サイトが収集する情報</h2>
        <p className="mt-4">現時点では特に収集を行っていません。</p>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">FAQ</h2>
        <dl className="mt-4">
          <dt className="text-2xl font-semibold">広告を見たくない</dt>
          <dd className="mt-2">
            広告を非表示にする機能は実装しません。よって、
            <strong>無効化することはできません。</strong>
            <br />
            どうしても無理という場合は、このサイトから立ち去るか
            <b>コンテンツブロッカー</b>を使うことを推奨します。
          </dd>
          <dt className="mt-4 text-2xl font-semibold">
            具体的に広告が表示されるページとは
          </dt>
          <dd className="mt-2">
            <Link className="text-blue-600 hover:underline" href="/articles">
              記事一覧
            </Link>
            から、当サイト内で閲覧できる記事のページのみ広告が表示されます。
          </dd>
        </dl>
      </section>
    </Container>
  )
}
