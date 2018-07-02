
/** 不开启css-module的时候 样式会直接使用 */
// import './css/base.css'
// import './css/common.css'

/** 开启css-module的时候 */
import base from './css/base.css'
import common from './css/common.css'
import header from './css/header.less'

const app = document.getElementById('app');

app.innerHTML = '<div class="' + base.box + '"></div>'

document.getElementById('header').className = base.header;