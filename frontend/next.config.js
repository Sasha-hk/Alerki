const nextTranslate = require("next-translate")
const i18n = require('./i18n')

module.exports = nextTranslate({
  i18n,
  env: {
    API_URL: process.env.API_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
  },
  reactStrictMode: true,
})
