module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^next'],
          ['^@?\\w'],
          ['^@/'],
          ['^\\.'],
          ['\\.css$', '\\.scss$']
        ]
      }
    ],
    'simple-import-sort/exports': 'error'
  }
};
