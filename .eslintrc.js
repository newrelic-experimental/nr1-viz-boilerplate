module.exports = {
    env: {
      browser: true,
      es6: true
    },
    extends: [
      'plugin:@newrelic/eslint-plugin-newrelic/react',
      'plugin:@newrelic/eslint-plugin-newrelic/jest',
      'plugin:@newrelic/eslint-plugin-newrelic/prettier'
    ],
  
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: 'module'
    },
    plugins: ['react', 'prettier'],
    rules: {
      'prettier/prettier': 'error',
      'react/prop-types': 0,
      'no-new': 0,
      'no-case-declarations': 0,
      'eslint-comments/no-unlimited-disable': 0,
      'no-template-curly-in-string': 0
    },
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly'
    }
  };