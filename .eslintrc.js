/* eslint-disable no-process-env */
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    // https://github.com/edvardchen/eslint-plugin-i18next/blob/next/docs/rules/no-literal-string.md
    'plugin:i18next/recommended',
  ],
  globals: {
    after: true,
    before: true,
    cy: true,
    Cypress: true,
  },
  ignorePatterns: ['src/generated/**', 'src/graphql/codegen_plugins/dist/*.js', 'src/serviceWorker.js'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      globals: {
        JSX: true,
      },
      parser: '@typescript-eslint/parser',
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
        '@typescript-eslint/explicit-function-return-type': 'off',

        // https://eslint.org/docs/latest/rules/no-unused-vars
        '@typescript-eslint/no-unused-vars': 'error',
        'no-unused-vars': 'off',
      },
    },
  ],
  parser: '@babel/eslint-parser',
  parserOptions: { requireConfigFile: false },
  plugins: ['i18next', 'import', 'react', 'react-hooks', 'sort-destructure-keys', '@typescript-eslint'],
  rules: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': 'off',

    // https://typescript-eslint.io/rules/member-ordering/
    '@typescript-eslint/member-ordering': [
      process.env.DISABLE_ABC_LINT ? 'off' : 'error',
      {
        default: {
          memberTypes: ['signature', 'method', 'constructor', 'field'],
          order: 'alphabetically-case-insensitive',
        },
      },
    ],

    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/first.md
    'import/first': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
    'import/namespace': 'warn',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
    'import/no-duplicates': 'warn',

    // https://eslint.org/docs/rules/linebreak-style
    'linebreak-style': ['error', 'unix'],

    // https://eslint.org/docs/rules/no-case-declarations
    'no-case-declarations': 'warn',

    // https://eslint.org/docs/rules/no-console
    'no-console': 'error',

    // https://eslint.org/docs/rules/no-empty
    'no-empty': 'warn',

    // https://eslint.org/docs/rules/no-empty-pattern
    'no-empty-pattern': 'warn',

    // https://eslint.org/docs/rules/no-extra-boolean-cast
    'no-extra-boolean-cast': 'warn',

    // https://eslint.org/docs/rules/no-inner-declarations
    'no-inner-declarations': 'warn',

    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],

    // https://eslint.org/docs/latest/rules/no-process-env
    'no-process-env': 'error',

    // https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'warn',

    // https://eslint.org/docs/rules/no-restricted-globals
    'no-restricted-globals': [
      'error',
      {
        message: 'Use local parameter instead',
        name: 'event',
      },
      {
        message: 'Use hook useLocation instead of global location object',
        name: 'location',
      },
    ],

    // https://eslint.org/docs/rules/no-self-assign
    'no-self-assign': 'warn',

    // https://eslint.org/docs/rules/no-undef
    'no-undef': 'error',

    // https://eslint.org/docs/latest/rules/no-unused-expressions
    'no-unused-expressions': 'error',

    // https://eslint.org/docs/rules/no-unused-vars
    'no-unused-vars': 'error',

    // https://eslint.org/docs/rules/no-useless-escape
    'no-useless-escape': 'warn',

    // https://eslint.org/docs/rules/quotes
    quotes: ['warn', 'single'],

    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    'react/jsx-sort-props': [
      process.env.DISABLE_ABC_LINT ? 'off' : 'error',
      {
        callbacksLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: false,
        shorthandFirst: false,
        shorthandLast: false,
      },
    ],

    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    'react/prop-types': 'off',

    // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/README.md#advanced-configuration
    'react-hooks/exhaustive-deps': 'off',

    // https://reactjs.org/docs/hooks-rules.html
    'react-hooks/rules-of-hooks': 'error',

    // https://github.com/mthadley/eslint-plugin-sort-destructure-keys
    'sort-destructure-keys/sort-destructure-keys': [
      process.env.DISABLE_ABC_LINT ? 'off' : 'error',
      { caseSensitive: false },
    ],

    // https://eslint.org/docs/latest/rules/sort-keys
    'sort-keys': [
      process.env.DISABLE_ABC_LINT ? 'off' : 'error',
      'asc',
      {
        caseSensitive: false,
        minKeys: 2,
        natural: true,
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
