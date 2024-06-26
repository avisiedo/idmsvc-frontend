module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js', '!src/**/stories/*'],
  coverageDirectory: './coverage/',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    uuid: require.resolve('uuid'), // https://stackoverflow.com/a/73203803
  },
  roots: ['<rootDir>/src/'],
  transformIgnorePatterns: ['/node_modules/(?!@redhat-cloud-services)', '/node_modules/(?!@patternfly)'],
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    './src', //the root directory
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setup.js'],
};
