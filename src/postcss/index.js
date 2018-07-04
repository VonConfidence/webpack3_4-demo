
/** 不开启css-module的时候 样式会直接使用 */
// import './css/base.css'
// import './css/common.css'

/** 开启css-module的时候 */
import base from './css/base.less'
import common from './css/common.less'


const app = document.getElementById('app');
console.log('hello', app)
app.innerHTML = '<div class="' + base.box + '"></div>'

// 异步加载a.js
import(
  /* webpackChunkName:'moduleA' */
  './components/a.js'
).then(a => {
  console.log('async moduleA', a);
})