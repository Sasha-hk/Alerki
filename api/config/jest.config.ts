export default {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  roots: ['./src', './test'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
