module.exports = {
  transform: {
    '^.+\\.[jt]sx?$': `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@templates/(.*)': '<rootDir>/src/templates/$1',
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/src/utils/testing/**/*.{ts,tsx,js,jsx}',
    '!<rootDir>/src/utils/typography.ts',
  ],
  globals: {
    __PATH_PREFIX__: ``,
    __BASE_PATH__: ``,
  },
  testURL: 'http://localhost',
  moduleDirectories: ['node_modules', '__dirname', 'src'],
  setupFiles: [`<rootDir>/loadershim.js`],
};
