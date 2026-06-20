module.exports = {
  'ui-tests/**/*.ts': [
    'eslint --fix',
    'prettier --write',
  ],
  'api-tests/**/*.ts': [
    'prettier --write',
  ],
}
