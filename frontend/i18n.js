module.exports = {
  defaultLocale: "en",
  locales: ["en", "ua", "ru"],
  pages: {
    "*": ["common"],
    "/": ["home", "common"],
    "/*": ["home"],
    "/settings/": ['settings'],
    "/settings/*": ['settings'],
    'rgx:^/': ['profile'],
  },
}