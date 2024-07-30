export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: false,
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)', '!**/node_modules/**'],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  // TechDebt: Figure out why jest does not load CSS modules properly and remove the "ignoreCodes"
  // and globals below when configure jest properly.
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [2307],
      },
    },
  },
};
