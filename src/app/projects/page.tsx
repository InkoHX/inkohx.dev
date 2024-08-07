import { Metadata } from 'next'
import React from 'react'

import DJSJapanImage from '@/assets/img/websites/discordjs-japan-org.png'
import PortfolioImage from '@/assets/img/websites/inkohx-dev.png'
import NewsImage from '@/assets/img/websites/news-inkohx-dev.png'
import NEXTERIASImage from '@/assets/img/websites/nexterias-dev.png'
import { Container } from '@/components/Container'
import { Hero } from '@/components/Hero'

import { WebsiteCard } from './WebsiteCard'

type ProjectInfo = {
  name: string
  description: string
  repository: {
    owner: string
    name: string
  }
}

type Website = {
  name: string
  link: string
  imageUrl: string
}

const packages = [
  {
    name: 'twitter-api-fetch',
    description:
      'fetch-like implementation designed for X (formerly Twitter) API',
    repository: {
      owner: 'nexterias',
      name: 'twitter-api-fetch',
    },
  },
  {
    name: 'hono-cookie-signature',
    description:
      'A library for cookie signing and verification using HMAC-SHA256 for Hono.',
    repository: {
      owner: 'nexterias',
      name: 'hono-cookie-signature',
    },
  },
  {
    name: 'discord.js-reaction-controller',
    description:
      'discord.js製のボット用に、リアクションを使ったページネーションをサポートする為のライブラリ',
    repository: {
      owner: 'InkoHX',
      name: 'discord.js-reaction-controller',
    },
  },
] as const satisfies ReadonlyArray<ProjectInfo>

const tools = [
  {
    name: 'gh-archiver',
    description: 'A tool for archiving GitHub repositories.',
    repository: {
      owner: 'InkoHX',
      name: 'gh-archiver',
    },
  },
  {
    name: 'archiso',
    description: '自分用のArch Linux installer',
    repository: {
      owner: 'InkoHX',
      name: 'archiso',
    },
  },
  {
    name: 'actions-vercel',
    description: 'Deploy to Vercel with GitHub Actions',
    repository: {
      owner: 'nexterias',
      name: 'actions-vercel',
    },
  },
  {
    name: 'wakatime-tweet-activity',
    description: 'WakaTimeで収集した情報をツイートするプログラム',
    repository: {
      owner: 'InkoHX',
      name: 'wakatime-tweet-activity',
    },
  },
] satisfies ReadonlyArray<ProjectInfo>

const minecraftPlugins = [
  {
    name: 'player-tracker',
    description: 'Assist in player tracking.',
    repository: {
      owner: 'nexterias',
      name: 'player-tracker',
    },
  },
  {
    name: 'Chaining',
    description: '鉱石や原木を一括破壊するプラグイン',
    repository: {
      owner: 'InkoHX',
      name: 'Chaining',
    },
  },
] satisfies ReadonlyArray<ProjectInfo>

const bots = [
  {
    name: 'SpiderMonkey bot',
    description: 'SpiderMonkey shell via Discord',
    repository: {
      owner: 'InkoHX',
      name: 'sm-discord-bot',
    },
  },
  {
    name: 'HARZ',
    description: 'Discord.js Japan User Group向けに開発していたDiscordボット',
    repository: {
      owner: 'InkoHX',
      name: 'HARZ',
    },
  },
  {
    name: 'discord-link-viewer',
    description: 'Discordのメッセージリンクから内容を表示する',
    repository: {
      owner: 'InkoHX',
      name: 'discord-link-viewer',
    },
  },
  {
    name: 'nsfw-filter-bot',
    description:
      'NSFWチャンネル以外に投稿された性的な画像を削除するDiscordボット',
    repository: {
      owner: 'InkoHX',
      name: 'nsfw-filter-bot',
    },
  },
  {
    name: 'volume-upper',
    description:
      '音声ファイルを音量5000dbでボイスチャンネルに再生するDiscordボット',
    repository: {
      owner: 'InkoHX',
      name: 'volume-upper',
    },
  },
] satisfies ReadonlyArray<ProjectInfo>

const websites = [
  {
    name: 'Discord.js Japan User Group',
    link: 'https://discordjs-japan.org',
    imageUrl: DJSJapanImage.src,
  },
  {
    name: 'The NEXTERIAS',
    link: 'https://nexterias.dev',
    imageUrl: NEXTERIASImage.src,
  },
  {
    name: 'RSS Reader',
    link: 'https://news.inkohx.dev',
    imageUrl: NewsImage.src,
  },
  {
    link: 'https://inkohx.dev',
    name: 'Portfolio',
    imageUrl: PortfolioImage.src,
  },
] satisfies ReadonlyArray<Website>

const ProjectList: React.FC<{
  sectionName: string
  projects: ReadonlyArray<ProjectInfo>
}> = props => {
  return (
    <section className="mt-8">
      <h2 className="text-4xl font-semibold">{props.sectionName}</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {props.projects.map(project => (
          <article
            key={project.description}
            className="relative size-full rounded-md bg-slate-200 p-4 shadow-md transition-shadow hover:shadow-lg"
          >
            <h3 className="text-2xl font-semibold">
              <a
                href={`https://github.com/${project.repository.owner}/${project.repository.name}`}
                className="transition-colors before:absolute before:inset-0 before:z-10 before:content-[''] hover:text-primary-600"
              >
                {project.name}
              </a>
            </h3>
            <p className="mt-2">{project.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'プロジェクト',
  description:
    '現在活発に開発してるものから、そうでないものまで紹介しちゃうぞ！',
  alternates: { canonical: '/projects' },
}

export default function Projects() {
  return (
    <Container className="py-8" as="main">
      <Hero
        title="プロジェクト"
        subtitle="現在活発に開発してるものから、そうでないものまで紹介しちゃうぞ！"
        imageUrl="/img/undraw/projections.svg"
      />
      <ProjectList projects={packages} sectionName="パッケージ" />
      <ProjectList projects={tools} sectionName="ツール" />
      <ProjectList
        projects={minecraftPlugins}
        sectionName="Minecraftプラグイン"
      />
      <ProjectList projects={bots} sectionName="ボット" />
      <section className="mt-8">
        <h2 className="text-4xl font-semibold">ウェブサイト</h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {websites.map(({ imageUrl, link, name }) => (
            <li className="w-full shadow-lg hover:shadow-xl" key={link}>
              <WebsiteCard imageUrl={imageUrl} link={link} websiteName={name} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
