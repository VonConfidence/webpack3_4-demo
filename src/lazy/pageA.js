// import './subPageA'
// import './subPageB'

require.include('./moduleA')

const page = 'subPageA'
if (page === 'subPageA') {
  require.ensure(['./subPageA'], require => {
    const subPageA = require('./subPageA')
    console.log(subPageA)
  }, 'subPageA')
} else if (page === 'subPageB') {
  require.ensure(['./subPageB'], require => {
    const subPageB = require('./subPageB')
    console.log(subPageB)
  }, 'subPageB')
}

/**
 * 这里需要在回调函数里面在require一次, 是因为如果不require
 * 那么只是将代码引入了进来, 但是没有执行
 */
require.ensure('lodash', require => {
  const _ = require('lodash')
  _.join([1, 2, 3], 4)
  console.log(_)
}, 'vendor')

// import * as _ from 'lodash'
// import(
//   /* webpackChunkName: vendor*/
//   /* webpackMode: lazy*/
//   'lodash'
// )

export default 'pageA'