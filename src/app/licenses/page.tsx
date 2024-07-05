import {
  SiGit,
  SiJetbrains,
  SiPhp,
  SiRust,
  SiSteam,
  SiVuedotjs,
} from '@icons-pack/react-simple-icons'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import licenses from '@/generated/license.json' with { type: 'json' }

const LogoCopyrightNotice: React.FC<
  React.PropsWithChildren<{
    icon: React.ReactElement
  }>
> = props => {
  return (
    <div>
      <h3 className="text-2xl font-semibold">{props.icon} logo</h3>
      <pre className="mt-2 text-wrap rounded bg-slate-200 p-4">
        {props.children}
      </pre>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'ライセンス表記',
  description:
    'このWebサイトで使用されているOSSのライセンス表記と、一部で使われてるブランドアイコンの著作権を表記しているページです。',
}

export default function Licenses() {
  return (
    <article className="py-8">
      <main className="mx-auto max-w-7xl px-4">
        <section className="py-24">
          <h1 className="text-7xl font-bold">ライセンス表記</h1>
          <p className="mt-8 max-w-prose text-2xl text-slate-700">
            このWebサイトで使用されているOSSのライセンス表記と、一部で使われてるブランドアイコンの著作権を表記しているページです。
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
          <LogoCopyrightNotice
            icon={<SiJetbrains className="inline size-8" color="default" />}
          >
            Copyright &copy; 2000-{new Date().getUTCFullYear()}{' '}
            <a
              className="underline hover:text-primary-600"
              href="https://www.jetbrains.com/"
            >
              JetBrains s.r.o
            </a>
            . JetBrains and the JetBrains logo are registered trademarks of
            JetBrains s.r.o.
          </LogoCopyrightNotice>
          <LogoCopyrightNotice
            icon={<SiPhp className="inline size-8" color="default" />}
          >
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
          </LogoCopyrightNotice>
          <LogoCopyrightNotice
            icon={<SiRust className="inline size-8" color="default" />}
          >
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
          </LogoCopyrightNotice>
          <LogoCopyrightNotice
            icon={<SiGit className="inline size-8" color="default" />}
          >
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
          </LogoCopyrightNotice>
          <LogoCopyrightNotice
            icon={<SiVuedotjs className="inline size-8" color="default" />}
          >
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
          </LogoCopyrightNotice>
          <LogoCopyrightNotice icon={<SiSteam className="inline size-8" />}>
            &copy; 2024{' '}
            <a
              href="https://www.valvesoftware.com"
              className="underline hover:text-primary-600"
            >
              Valve Corporation
            </a>
            . Steam and the Steam logo are trademarks and/or registered
            trademarks of Valve Corporation in the U.S. and/or other countries.
          </LogoCopyrightNotice>
        </section>
      </main>
    </article>
  )
}
