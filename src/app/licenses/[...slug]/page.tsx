import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Container } from '@/components/Container'
import licenses from '@/generated/license.json' with { type: 'json' }

type StaticParams = { slug: string[] }

const parseSlug = (slug: string[]) => decodeURIComponent(slug.join('/'))

export const generateStaticParams = (): StaticParams[] => {
  return Object.keys(licenses).map(packageName => ({
    slug: packageName.split('/'),
  }))
}

export const generateMetadata = ({
  params,
}: {
  params: StaticParams
}): Metadata => {
  const packageName = parseSlug(params.slug)

  return {
    title: `Thanks! ${packageName}`,
    description: `${packageName}はinkohx.devで使われています！感謝！`,
  }
}

export default function PackageLicense({ params }: { params: StaticParams }) {
  const packageName = parseSlug(params.slug)
  const data = licenses[packageName as keyof typeof licenses]

  if (!data) notFound()

  return (
    <article className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] py-8">
      <Container>
        <h1 className="py-12 text-4xl sm:text-6xl">
          Thanks! <span className="font-bold">{packageName}</span>
        </h1>
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div>
            <dt className="text-xl font-semibold">リポジトリ</dt>
            <dd>
              {data.repository ? (
                <a
                  className="text-primary-600 transition-opacity hover:underline hover:opacity-80"
                  href={data.repository}
                >
                  {data.repository}
                </a>
              ) : (
                '不明'
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xl font-semibold">ライセンスの種類</dt>
            <dd>
              {Array.isArray(data.licenses)
                ? data.licenses.join(', ')
                : data.licenses}
            </dd>
          </div>
          <div>
            <dt className="text-xl font-semibold">作者</dt>
            <dd>{data.publisher ?? '不明'}</dd>
          </div>
        </dl>
        <pre className="mt-4 overflow-x-auto rounded bg-slate-200 p-4">
          {data.licenseBody}
        </pre>
      </Container>
    </article>
  )
}
