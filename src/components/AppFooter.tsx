import Link from 'next/link'
import React from 'react'

import { socialAccounts } from '../constants'
import { SocialMediaLinkIcon } from './SocialMediaLinkIcon'

const navLinks = [
  { text: 'ホーム', href: '/' },
  { text: 'スキル', href: '/skills' },
  { text: 'プロジェクト', href: '/projects' },
  { text: '記事一覧', href: '/articles' },
  { text: 'ライセンス表記', href: '/licenses' },
  // { text: 'プライバシーポリシー', href: '/privacy-policy' },
] satisfies { text: string; href: string }[]

export const AppFooter: React.FC = () => {
  return (
    <footer className="min-h-[var(--footer-height)] bg-slate-200 py-4">
      <nav className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-4 gap-y-2 px-4">
        {navLinks.map(({ text, href }) => (
          <Link
            className="text-sm text-slate-600 transition-opacity hover:opacity-80"
            href={href}
            key={href}
          >
            {text}
          </Link>
        ))}
      </nav>
      <div className="mx-auto mt-4 flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
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
