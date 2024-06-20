import { notFound } from 'next/navigation'

import licenses from '@/generated/license.json' with { type: 'json' }

type StaticParams = { slug: string[] }

export const generateStaticParams = (): StaticParams[] => {
  return Object.keys(licenses).map(packageName => ({
    slug: packageName.split('/'),
  }))
}

export default function PackageLicense({ params }: { params: StaticParams }) {
  const packageName = decodeURIComponent(params.slug.join('/'))
  const data = licenses[packageName as keyof typeof licenses]

  if (!data) notFound()

  return (
    <article className="py-8">
      <main className="mx-auto max-w-7xl px-4">
        <h1 className="text-4xl">
          Thanks! <span className="font-bold">{packageName}</span>
        </h1>
        <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div>
            <dt className="text-lg font-semibold">リポジトリ</dt>
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
            <dt className="text-lg font-semibold">ライセンスの種類</dt>
            <dd>
              {Array.isArray(data.licenses)
                ? data.licenses.join(', ')
                : data.licenses}
            </dd>
          </div>
          <div>
            <dt className="text-lg font-semibold">作者</dt>
            <dd>{data.publisher ?? '不明'}</dd>
          </div>
        </dl>
        <pre className="mt-4 overflow-x-auto rounded bg-slate-200 p-4">
          {data.licenseBody}
        </pre>
      </main>
    </article>
  )
}
