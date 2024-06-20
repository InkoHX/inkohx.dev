'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

const navLinks = [
  { text: 'ホーム', href: '/' },
  { text: '自己紹介', href: '/about' },
  {
    href: '/skills',
    text: 'スキル',
  },
  {
    href: '/projects',
    text: 'プロジェクト',
  },
  {
    text: '記事',
    href: '/articles',
  },
] satisfies {
  text: string
  href: string
}[]

const MobileNavbar: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <>
      <button
        className="sm:hidden"
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        onClick={() => setOpen(it => !it)}
      >
        {isOpen ? (
          <XMarkIcon className="size-10" />
        ) : (
          <Bars3Icon className="size-10" />
        )}
      </button>
      <nav
        className="data-mobile-nav-open:translate-x-0 container fixed right-0 top-[var(--header-height)] z-50 mx-auto h-[calc(100vh-var(--header-height))] w-full translate-x-full space-y-2 overflow-x-hidden bg-slate-100 p-4 transition-transform ease-in-out sm:hidden"
        data-mobile-nav-open={isOpen}
      >
        {navLinks.map(({ text, href }) => (
          <Link
            key={text}
            href={href}
            onClick={() => setOpen(false)}
            className="block rounded-lg p-4 text-center font-semibold transition-colors hover:bg-primary-100 data-[status=active]:bg-primary-200"
          >
            {text}
          </Link>
        ))}
      </nav>
    </>
  )
}

export const AppHeader: React.FC = () => {
  return (
    <header className="h-[var(--header-height)]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-2xl font-semibold transition-opacity hover:opacity-70"
        >
          InkoHX
        </Link>
        <nav className="hidden gap-x-4 sm:flex">
          {navLinks.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              className="text-slate-700 transition-opacity hover:opacity-80 data-[status=active]:font-semibold data-[status=active]:text-primary-600"
            >
              {text}
            </Link>
          ))}
        </nav>
        <MobileNavbar />
      </div>
    </header>
  )
}
