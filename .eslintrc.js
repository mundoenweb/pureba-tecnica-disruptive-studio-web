module.exports = {
  // parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  plugins: ['prettier'],
  extends: [
    './node_modules/ts-standard/eslintrc.json',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['next-env.d.ts'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
        endOfLine: 'auto',
        printWidth: 80,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
}
