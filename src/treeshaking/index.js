import base from './css/base.less'
import { a } from './common/utils'

const app = document.getElementById('app');
console.log('hello', app)
app.innerHTML = '<div class="' + base.box + '"></div>'

a();