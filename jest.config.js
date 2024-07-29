export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)', '!**/node_modules/**'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
};
