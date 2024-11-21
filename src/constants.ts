import { icon, type Icon } from '@fortawesome/fontawesome-svg-core'
import { faBluesky, faGithub, faKeybase, faSteam, faXTwitter } from '@fortawesome/free-brands-svg-icons'

export default {
  website: {
    title: '鳥頭',
    description: '鳥頭エンジニアの自己紹介と、気まぐれでブログ書いたりしてるサイトです。',
  },
  navItems: [
    { href: '/', text: 'プロフィール' },
    { href: '/articles', text: '投稿記事' },
  ] satisfies Array<{ href: string, text: string }>,
  socialLinks: [
    { name: 'Bluesky', href: 'https://bsky.app/profile/inkohx.dev', icon: icon({ ...faBluesky }) },
    { name: 'X (Twitter)', href: 'https://x.com/InkoHX', icon: icon({ ...faXTwitter }) },
    { name: 'GitHub', href: 'https://github.com/InkoHX', icon: icon({ ...faGithub }) },
    { name: 'Steam', href: 'https://steamcommunity.com/id/InkoHX', icon: icon({ ...faSteam }) },
    { name: 'Keybase', href: 'https://keybase.io/inkohx', icon: icon({ ...faKeybase }) },
  ] satisfies Array<{ name: string, href: string, icon: Icon }>,
  adSense: {
    clientId: 'ca-pub-8934795537091878',
    slotIds: {
      display: '8549599354',
      multiplex: '3138705827',
    },
  },
  analytics: {
    id: 'G-X6SPC2Z76Q',
  },
} as const
