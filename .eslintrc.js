module.exports = {
  root: true,
  extends: 'standard',
  plugins: [
    'html',
    'import'
  ],
  // 定义运行环境
  env: {
    browser: true,
    node:true,
    es6: true,
  },
  globals: {
    $: true, // 表示$是一个全局的变量 允许不定义直接使用
  },
  // 覆盖上面的规则
  rules: {
    "comma-dangle": ["error", "always"], //对象字面量项尾必须有逗号
    "array-bracket-spacing": ["error", "always"],
    
  }
}