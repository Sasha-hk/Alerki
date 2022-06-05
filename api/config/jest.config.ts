export default {
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '^@Config/(.*)$': '<rootDir>/config/$1',
    '^@Shared/(.*)$': '<rootDir>/src/shared/$1',
  },
  roots: ['./src', './test'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
