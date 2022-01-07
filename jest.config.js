module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/tests'],
  bail: 1,
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!**/test/**',
    '!**/config/**'
  ],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
