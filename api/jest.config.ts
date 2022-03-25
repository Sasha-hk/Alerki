export default {
  globalSetup: './src/__tests__/setup.ts',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  roots: ['./src/__tests__'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
