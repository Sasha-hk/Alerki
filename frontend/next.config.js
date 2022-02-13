const nextTranslate = require("next-translate")

module.exports = nextTranslate({
  // i18n: {
  //   defaultLocale: 'en',
  //   locales: ['en', 'ua', 'ru'],
  //   localeDetection: true,
  // },
  env: {
    API_URL: process.env.API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
  },
  reactStrictMode: true,
})
