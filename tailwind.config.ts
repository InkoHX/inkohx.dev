import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff5ff',
          100: '#dae7ff',
          200: '#bed6ff',
          300: '#83b4ff',
          400: '#5d99fd',
          500: '#3772fa',
          600: '#2152ef',
          700: '#193ddc',
          800: '#1b33b2',
          900: '#1c308c',
          950: '#161f55',
        },
        secondary: {
          50: '#fff9ed',
          100: '#fff1d4',
          200: '#ffdfa9',
          300: '#ffce83',
          400: '#fea439',
          500: '#fc8813',
          600: '#ed6c09',
          700: '#c55209',
          800: '#9c4010',
          900: '#7e3610',
          950: '#441a06',
        },
      },
    },
  },
  plugins: [],
}
export default config
