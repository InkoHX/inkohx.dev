import Link from 'next/link'
import React from 'react'

import { socialAccounts } from '../constants'
import { SocialMediaLinkIcon } from './SocialMediaLinkIcon'

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-slate-200 py-4">
      <nav className="container mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 px-4">
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/"
        >
          ホーム
        </Link>
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/about"
        >
          自己紹介
        </Link>
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/skills"
        >
          スキル
        </Link>
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/projects"
        >
          プロジェクト
        </Link>
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/articles"
        >
          記事
        </Link>
        <Link
          className="text-sm text-slate-600 transition-opacity hover:opacity-80"
          href="/licenses"
        >
          ライセンス表記
        </Link>
      </nav>
      <div className="container mx-auto mt-4 flex flex-col items-center justify-between gap-2 px-4 sm:flex-row">
        <small>Copyright &copy; {new Date().getUTCFullYear()} InkoHX</small>
        <ul className="flex gap-x-4">
          {(
            Object.keys(socialAccounts) as ReadonlyArray<
              keyof typeof socialAccounts
            >
          ).map(accountType => (
            <li key={accountType}>
              <SocialMediaLinkIcon
                key={accountType}
                name={accountType}
                iconProps={{
                  className:
                    'fill-slate-500 hover:fill-black transition-colors',
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
