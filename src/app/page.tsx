import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { SocialMediaLinkIcon } from '@/components/SocialMediaLinkIcon'
import { mergeClassName } from '@/utils/mergeClassName'

const NavigationCard: React.FC<{
  href: string
  text: string
  imageSrc: string
  className?: string
}> = props => {
  return (
    <Link
      className={mergeClassName(
        props.className,
        'relative h-64 rounded-md bg-slate-200 bg-[length:50%_100%] bg-right-bottom bg-no-repeat bg-origin-content p-4 shadow-md transition-opacity hover:opacity-70 sm:bg-contain'
      )}
      href={props.href}
      style={{ backgroundImage: `url("${props.imageSrc}")` }}
    >
      <span className="rounded-xl bg-slate-200/70 p-2 text-3xl font-semibold">
        {props.text}
      </span>
    </Link>
  )
}

export const metadata: Metadata = {
  title: "InkoHX's portfolio",
}

export default function Home() {
  return (
    <article className="py-8">
      <main className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-center gap-8 pb-32 pt-24 sm:flex-row">
          <img
            src="/img/InkoHX.jpeg"
            alt=""
            width={256}
            height={256}
            className="size-64 rounded-full"
          />
          <section className="flex flex-col items-center space-y-4 sm:items-start">
            <h1 className="text-5xl font-bold">InkoHX</h1>
            <p className="text-center text-xl text-slate-600 sm:text-left">
              <span className="inline-block">
                Webが大好きな学生プログラマーです。
              </span>
              <span className="inline-block">
                よく<b>インコ</b>
                と呼ばれています！
              </span>
            </p>
            <ul className="flex space-x-4">
              <li>
                <SocialMediaLinkIcon
                  name="bluesky"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
              <li>
                <SocialMediaLinkIcon
                  name="github"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
              <li>
                <SocialMediaLinkIcon
                  name="keybase"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
              <li>
                <SocialMediaLinkIcon
                  name="steam"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
              <li>
                <SocialMediaLinkIcon
                  name="x"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
              <li>
                <SocialMediaLinkIcon
                  name="zenn"
                  iconProps={{
                    className: 'size-8 transition-opacity hover:opacity-70',
                  }}
                />
              </li>
            </ul>
          </section>
        </div>
        <nav className="grid grid-cols-2 gap-8">
          <NavigationCard
            className="col-span-2 sm:col-span-1"
            href="/about"
            imageSrc="/img/undraw/profile.svg"
            text="自己紹介"
          />
          <NavigationCard
            className="col-span-2 sm:col-span-1"
            href="/projects"
            imageSrc="/img/undraw/projections.svg"
            text="プロジェクト"
          />
          <NavigationCard
            className="col-span-2 sm:col-span-1"
            href="/skills"
            imageSrc="/img/undraw/certificate.svg"
            text="スキル"
          />
          <NavigationCard
            className="col-span-2 sm:col-span-1"
            href="/articles"
            imageSrc="/img/undraw/posts.svg"
            text="記事一覧"
          />
        </nav>
      </main>
    </article>
  )
}
