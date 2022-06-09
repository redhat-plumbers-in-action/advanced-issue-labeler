module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '(/test/.*|\\.(test|spec))\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
  testEnvironment: 'node',
  verbose: true,
};
