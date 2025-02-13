/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: ({ theme }) => ({
        primary: {
          css: {
            '--tw-prose-links': theme('colors.primary[600]'),
            '--tw-prose-invert-links': theme('colors.primary[600]'),
          },
        },
      }),
    },
  },
}
