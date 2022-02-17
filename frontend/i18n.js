module.exports = {
  defaultLocale: 'en',
  locales: ['en', 'ua', 'ru'],
  pages: {
    '/': ['home', 'common'],
    'rgx:^/settings/': ['settings'],
    '/sign-in': ['sign-in', 'common'],
    '/register': ['register', 'common'],
    'rgx:^/': ['profile'],
  },
}