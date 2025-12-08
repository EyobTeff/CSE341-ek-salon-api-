module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'routes/**/*.js',
    'middleware/**/*.js',
    '!node_modules/**'
  ],
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true
};
