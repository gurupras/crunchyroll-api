var path = require('path')

module.exports = {
  rootDir: __dirname,
  moduleFileExtensions: [
    'js',
    'json'
  ],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/static/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**'
  ],
  coverageReporters: ['html', 'text-summary'],
  snapshotSerializers: [
  ],
  testEnvironment: 'node'
}
