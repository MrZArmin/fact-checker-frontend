module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:promise/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    parser: '@babel/eslint-parser',
  },
  plugins: [
    'vue',
    'import',
    'complexity',
    'promise',
    'filenames',
  ],
  rules: {
    'arrow-parens': [ 'error', 'as-needed' ],

    // Filenames plugin rules
    'filenames/match-regex': [ 'error', '^[A-Z][a-zA-Z0-9]+$' ], // PascalCase for component files
    'filenames/match-exported': 'error', // File name must match exported value

    // Keep existing Vue rules
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': [ 'warn', {
      'singleline': 3,
      'multiline': 1,
    } ],
    'vue/first-attribute-linebreak': [ 'error', {
      'singleline': 'ignore',
      'multiline': 'below',
    } ],

    // 1.0 Naming Conventions
    camelcase: [ 'error', {
      properties: 'never',
      ignoreDestructuring: false,
    } ],
    'new-cap': [ 'error', {
      newIsCap: false,
      capIsNew: true,
      properties: true,
    } ],
    'vue/component-name-in-template-casing': [ 'error', 'kebab-case' ],

    // 1.1 File Format
    'indent': [ 'error', 2, { 'SwitchCase': 1 } ],
    'semi': [ 'error', 'always' ],
    'quotes': [ 'error', 'single' ],
    'no-trailing-spaces': 'error',
    'eol-last': [ 'error', 'always' ],
    'unicode-bom': [ 'error', 'never' ],

    // 1.3 Import/Export
    'import/order': [ 'error', {
      'groups': [
        'builtin',
        'external',
        'internal',
      ],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
      },
    } ],
    'import/no-duplicates': 'error',
    'sort-imports': [ 'error', {
      'ignoreDeclarationSort': true,
    } ],

    // 2.1 Class Structure
    'no-empty-function': [ 'error', {
      'allow': [ 'constructors' ],
    } ],
    'lines-between-class-members': [ 'error', 'always', {
      'exceptAfterSingleLine': true,
    } ],

    // 2.2 Properties and Variables
    'prefer-const': 'error',
    'no-var': 'error',
    'no-unused-vars': [ 'error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
    } ],
    'no-undef': 'error',

    // 3.1 Method Declaration
    'space-before-function-paren': [ 'error', {
      'anonymous': 'never',
      'named': 'never',
      'asyncArrow': 'always',
    } ],
    'padded-blocks': [ 'error', 'never' ],
    'arrow-body-style': [ 'error', 'as-needed' ],

    // 3.2 Method Parameters
    'function-paren-newline': [ 'error', 'multiline' ],
    'comma-dangle': [ 'error', 'always-multiline' ],

    // 3.3 Return Types
    'consistent-return': 'error',
    'no-return-await': 'error',

    // 4.1-4.3 Control Structures
    'curly': [ 'error', 'all' ],
    'brace-style': [ 'error', 'stroustrup' ],
    'no-else-return': 'error',
    'default-case': 'off',
    'default-case-last': 'error',
    'no-fallthrough': 'error',
    'no-multiple-empty-lines': [ 'error', {
      'max': 1,
      'maxEOF': 1,
      'maxBOF': 0,
    } ],

    // 5. Arrays and Objects
    'array-bracket-spacing': [ 'error', 'always', {
      'singleValue': true,
      'objectsInArrays': true,
      'arraysInArrays': true,
    } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'object-shorthand': 'error',
    'no-array-constructor': 'error',

    // 6. Prohibited Practices
    'no-console': 'off',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-with': 'error',
    'no-prototype-builtins': 'error',
    'no-extend-native': 'error',

    // Try-catch Handling
    'no-empty': [ 'error', {
      'allowEmptyCatch': false,
    } ],
    'prefer-promise-reject-errors': 'error',

    // Complexity Rules
    // 'complexity': [ 'error', 20 ],
    'max-depth': [ 'error', 4 ],
    'max-nested-callbacks': [ 'error', 3 ],
    // 'max-params': [ 'error', 4 ],

    // Promise Handling
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': [ 'error', {
      'allowFinally': true,
    } ],
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'error',

    // Vue.js Specific Rules
    'vue/order-in-components': 'error',
    'vue/attributes-order': 'error',
    'vue/require-default-prop': 'error',
    'vue/require-prop-types': 'error',
    'vue/this-in-template': [ 'error', 'never' ],
    'vue/html-closing-bracket-newline': [ 'error', {
      'singleline': 'never',
      'multiline': 'always',
    } ],
    'vue/html-closing-bracket-spacing': 'error',
    'vue/prop-name-casing': [ 'error', 'camelCase' ],
    'vue/v-bind-style': [ 'error', 'shorthand' ],
    'vue/v-on-style': [ 'error', 'shorthand' ],
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/html-indent': [ 'error', 2, {
      'alignAttributesVertically': true,
      'ignores': [],
    } ],
    'vue/multiline-html-element-content-newline': [ 'error', {
      'allowEmptyLines': false,
      'ignoreWhenEmpty': true,
      'ignores': [ 'pre', 'textarea' ],
    } ],
    'vue/no-mutating-props': [ 'error', {
      'shallowOnly': true,
    } ],
    'vue/padding-line-between-blocks': [ 'error', 'always' ],
  },
  overrides: [
    // Utility files
    {
      files: [
        'src/utils/**',
        'src/main.js',
        'src/consts.js',
        '**/index.js',
      ],
      rules: {
        'filenames/match-regex': [ 'error', '^[a-z][a-zA-Z0-9]+$' ],
      },
    },
    {
      files: [
        '.eslintrc.js',
        '.eslintrc.*.js',
        '.stylelintrc.js',
        'babel.config.js',
        'vue.config.js',
        'vite.config.js',
        'jest.config.js',
        'webpack.config.js',
      ],
      rules: {
        'filenames/match-regex': 'off',
      },
    },
  ],
};
