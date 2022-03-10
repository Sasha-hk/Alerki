module.exports = {
  'env': {
    'es2021': true,
  },
  'extends': [],
  'plugins': [],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],
    'for-direction': 'off',
  },
  ignorePatterns: [
    'node_modules',
    'docker',
    'documentation',
    'pgdata',
    'frontend',
  ],
}
