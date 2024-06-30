import React from 'react'

import AvatarImage from '@/assets/img/InkoHX.jpeg'
import { SocialMediaLinkIcon } from '@/components/SocialMediaLinkIcon'
import { Timeline } from '@/components/Timeline'
import { TimelineItem } from '@/components/TimelineItem'

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col items-center justify-center pb-32 pt-24">
        <img
          src={AvatarImage.src}
          alt=""
          width={256}
          height={256}
          className="size-64 rounded-full"
        />
        <h1 className="mt-4 text-6xl font-bold">InkoHX</h1>
        <p className="text-center text-xl text-slate-600 sm:text-left">
          a.k.a HydraParrot
        </p>
        <ul className="mt-4 flex space-x-4">
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
      </div>
      <section>
        <h1 className="text-4xl font-semibold">私について</h1>
        <div className="mt-4 space-y-4">
          <p className="overflow-wrap-anywhere break-keep text-lg">
            こんにちは！
            <wbr />
            <b>InkoHX（インコ・エイチ・エックス）</b>
            <wbr />
            という名前で活動している
            <wbr />
            インコが大好きな
            <wbr />
            学生プログラマーです。
          </p>
          <p className="overflow-wrap-anywhere break-keep text-lg">
            誰かとお話する際は
            <wbr />
            <b>インコ</b>
            と呼ばれることが多く、
            <wbr />
            末尾の<b>HX</b>
            <wbr />
            を発音されることはほとんどないし、
            <wbr />
            そう呼んでもらって構いません。
          </p>
          <p className="overflow-wrap-anywhere break-keep text-lg">
            JavaScriptかTypeScriptを使って、プログラムを作ることが好きです。
          </p>
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-4xl font-bold">経歴（ざっくり）</h2>
        <div className="mt-4">
          <Timeline>
            <TimelineItem position="left">
              <div className="rounded bg-slate-200 p-4">
                <div className="font-semibold text-slate-600">2017年〜現在</div>
                <h3 className="text-2xl font-semibold">プログラミング</h3>
                <p className="overflow-wrap-anywhere mt-2 break-keep">
                  Minecraft Bedrock Edition
                  <wbr />
                  に熱中していた最中に、ModPEとPocketMine-MPに出会ったことがきっかけでプログラミングを始める。
                </p>
                <p className="overflow-wrap-anywhere mt-4 break-keep">
                  現在は、JavaScriptかTypeScriptを用いてなにかを作ることに専念しています。
                </p>
              </div>
            </TimelineItem>
            <TimelineItem position="right">
              <div className="rounded bg-slate-200 p-4">
                <div className="font-semibold text-slate-600">
                  2017年〜2019年
                </div>
                <h3 className="text-2xl font-semibold">Minecraft Server</h3>
                <p className="overflow-wrap-anywhere mt-2 break-keep">
                  PocketMine-MPを用いて
                  <wbr />
                  <span className="inline-block">
                    Minecraft Bedrock Edition
                  </span>
                  向けのマルチプレイサーバーを開発・運用する。
                </p>
                <p className="mt-4">PvPと経済を主体としたものを運営</p>
              </div>
            </TimelineItem>
            <TimelineItem position="left">
              <div className="rounded bg-slate-200 p-4">
                <div className="font-semibold text-slate-600">2017年〜現在</div>
                <h3 className="text-2xl font-semibold">
                  Discord.js Japan User Group
                </h3>
                <p className="overflow-wrap-anywhere mt-2 break-keep">
                  discord.jsを使ってDiscordボットを作ることにハマった勢いで、Discord.js
                  Japan User Groupを建てる。
                </p>
              </div>
            </TimelineItem>
            <TimelineItem position="right" ping>
              <div className="rounded bg-slate-200 p-4">
                <div className="font-semibold text-slate-600">2019年〜現在</div>
                <h3 className="text-2xl font-semibold">The NEXTERIAS</h3>
                <p className="overflow-wrap-anywhere mt-2 break-keep">
                  本格的に活動を始めたのは2022年あたりで、
                  <wbr />
                  actions-vercelやtwitter-api-fetchなどのプログラムを開発
                </p>
                <p className="overflow-wrap-anywhere mt-4 break-keep">
                  一番最初はライブラリやツールを作ることを目的としていなかったが、気が変わったので作っている。
                </p>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </section>
    </main>
  )
}
