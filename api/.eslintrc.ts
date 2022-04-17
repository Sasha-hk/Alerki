import path from 'path';

const __dirname = path.resolve();

export default {
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
