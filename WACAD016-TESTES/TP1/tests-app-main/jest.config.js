module.exports = {
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: false,
    collectCoverageFrom: ['src/**/*.{js,ts,tsx}', '!src/!**/*.spac.js', '!src/!**/*.test.js'],



}