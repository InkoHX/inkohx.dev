export const socialAccounts = {
  x: {
    name: 'X (formerly Twitter)',
    link: 'https://x.com/intent/user?screen_name=InkoHX',
  },
  bluesky: {
    name: 'Bluesky',
    link: 'https://bsky.app/profile/inkohx.dev',
  },
  steam: {
    name: 'Steam',
    link: 'https://steamcommunity.com/id/InkoHX',
  },
  github: {
    name: 'GitHub',
    link: 'https://github.com/InkoHX',
  },
  keybase: {
    name: 'Keybase',
    link: 'https://keybase.io/inkohx',
  },
  zenn: {
    name: 'Zenn',
    link: 'https://zenn.dev/inkohx',
  },
} as const satisfies Readonly<
  Record<string, Readonly<Record<'name' | 'link', string>>>
>

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || 'www.inkohx.dev'}`

export const adSenseSlots = {
  article: '8549599354',
}
