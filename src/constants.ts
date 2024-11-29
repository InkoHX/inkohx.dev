import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faBluesky, faGithub, faKeybase, faSteam, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default {
  website: {
    title: '鳥頭',
    description: '鳥頭エンジニアの自己紹介と、気まぐれでブログ書いたりしてるサイトです。',
  },
  navItems: [
    { href: '/', text: 'プロフィール' },
    { href: '/articles/', text: '投稿記事' },
  ] satisfies Array<{ href: string, text: string }>,
  socialLinks: [
    { name: 'Bluesky', href: 'https://bsky.app/profile/inkohx.dev', icon: faBluesky },
    { name: 'X (Twitter)', href: 'https://x.com/InkoHX', icon: faXTwitter },
    { name: 'GitHub', href: 'https://github.com/InkoHX', icon: faGithub },
    { name: 'Steam', href: 'https://steamcommunity.com/id/InkoHX', icon: faSteam },
    { name: 'Keybase', href: 'https://keybase.io/inkohx', icon: faKeybase },
  ] satisfies Array<{ name: string, href: string, icon: IconDefinition }>,
  adSense: {
    clientId: 'ca-pub-8934795537091878',
    slotIds: {
      display: '8549599354',
      multiplex: '3138705827',
    },
  },
  analytics: {
    token: '11fa421043ab4d86a84ae3ef8864df59',
  },
} as const
