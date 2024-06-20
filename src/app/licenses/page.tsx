import Link from 'next/link'

import licenses from '@/generated/license.json' with { type: 'json' }

export default function Licenses() {
  return (
    <article className="py-8">
      <main className="mx-auto max-w-7xl px-4">
        <section className="py-24">
          <h1 className="text-7xl font-bold">ライセンス表記</h1>
          <p className="mt-8 max-w-prose text-2xl text-slate-700">
            このWebサイトで使用されているOSSのライセンス表記と、使われてるブランドアイコンの著作権を表記しているページです。
          </p>
        </section>
        <section>
          <h2 className="text-4xl font-semibold">オープンソースソフトウェア</h2>
          <ul className="mt-4 list-inside list-disc">
            {Object.keys(licenses).map(packageName => (
              <li key={packageName}>
                <Link
                  className="text-primary-600 hover:underline"
                  href={`/licenses/${packageName}`}
                >
                  {packageName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-8 space-y-4">
          <div>
            <h2 className="text-4xl font-semibold">アイコンについて</h2>
            <p className="mt-4">
              このWebサイトで使われているアイコンの帰属先を記載しています。
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">JetBrains logo</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-200 p-4">
              Copyright © 2000-{new Date().getUTCFullYear()}{' '}
              <a
                className="underline hover:text-primary-600"
                href="https://www.jetbrains.com/"
              >
                JetBrains s.r.o
              </a>
              . JetBrains and the JetBrains logo are registered trademarks of
              JetBrains s.r.o.
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">PHP logo</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-200 p-4">
              PHP logo by{' '}
              <a
                className="underline hover:text-primary-600"
                href="https://viebrock.ca/"
              >
                Colin Viebrock
              </a>{' '}
              is licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                className="underline hover:text-primary-600"
              >
                CC BY 4.0
              </a>
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Rust logo</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-200 p-4">
              Rust logo by{' '}
              <a
                className="underline hover:text-primary-600"
                href="https://foundation.rust-lang.org/"
              >
                Rust Foundation
              </a>{' '}
              is licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                className="underline hover:text-primary-600"
              >
                CC BY 4.0
              </a>
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Git logo</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-200 p-4">
              Git logo by{' '}
              <a
                className="underline hover:text-primary-600"
                href="https://jasonlong.me/"
              >
                Jason Long
              </a>{' '}
              is licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by/3.0/"
                className="underline hover:text-primary-600"
              >
                CC BY 3.0
              </a>
            </pre>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Vue.js logo</h3>
            <pre className="mt-2 overflow-x-auto rounded bg-slate-200 p-4">
              Vue.js logo by{' '}
              <a
                href="http://evanyou.me/"
                className="underline hover:text-primary-600"
              >
                Evan You
              </a>{' '}
              is licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                className="underline hover:text-primary-600"
              >
                CC BY 4.0
              </a>
            </pre>
          </div>
        </section>
      </main>
    </article>
  )
}
