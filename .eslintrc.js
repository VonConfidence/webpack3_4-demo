module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['html', 'import', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 定义运行环境
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    $: true, // 表示$是一个全局的变量 允许不定义直接使用
  },
  // 覆盖上面的规则
  rules: {
    // @fixable 对象的最后一个属性末尾必须有逗号
    // @off 没必要限制
    'comma-dangle': 'off',
    // @fixable 逗号前禁止有空格，逗号后必须要有空格
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    // @fixable 禁止在行首写逗号
    'comma-style': ['error', 'last'],
    'array-bracket-spacing': ['error', 'always'],
  },
}
