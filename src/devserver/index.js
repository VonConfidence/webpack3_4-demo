import './css/base.less'
import './css/common.less'
import {renderA, } from './components/a'

const app = document.getElementById('app')

const div = document.createElement('div')
div.className = 'box'
app.appendChild(div)
div.innerHTML = 'Webpack4 Demo'
div.id = 'one'

renderA()

// const url = 'https://cnodejs.org/api/v1/topics/5433d5e4e737cbe96dcef312'
/*
$.get('https://cnodejs.org/api/v1/topics', {
  page: 1,
  tab: 'share',
  limit: 5
}).then(data => {
  console.log(data);
})
*/

$.get('/api/v1/topics', {
  page: 1,
  tab: 'share',
  limit: 5,
}).then(data => {
  console.log(data)
})

$.get('/topics', {
  page: 2,
  tab: 'share',
  limit: 5,
}).then(data => {
  console.log(data)
})

// 身份验证的时候
const fudaoUrl = '/cgi-bin/getLoginUserInfo'
$.get(fudaoUrl, {
  cid: 12748,
  bkn: 917661373,
  t: 0.9549346140322308,
}).then(data => {
  console.log(data)
})

renderA()
