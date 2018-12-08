const {defaults} = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions,'js', 'jsx'],
  moduleDirectories: ['node_modules'],
  automock: false,
  "setupTestFrameworkScriptFile": "<rootDir>/config/setupTests.js",
  transform: {
    '^.+\\.js?$': "<rootDir>/config/jest/transformer.js",
    "\\.(gql|graphql|graphqls)$": "jest-transform-graphql",
    '\\.(css|less)$': '<rootDir>/node_modules/jest-css-modules',
    "^.+\\.svg$": "<rootDir>/config/jest/inlineSvg"
  },
  moduleNameMapper: {
    "/\.(css|less)$/": "identity-obj-proxy"
  },
  "globals": {
    "ENDPOINT_CLIENT": 'http://localhost:5001',
    "ENDPOINT_SERVER": 'http://localhost:5001',
    "isBrowser": true,
  }
};
