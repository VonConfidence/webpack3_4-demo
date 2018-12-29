// import './subPageA'
// import './subPageB'

// 1. 将moduleA 提前打包, 不会将moduleA打包进subPageA和subPageB
require.include('./moduleA')
// 2. 不写上面include的话,  subPageA和subPageB中会同时包含 moduleA, 并没有将公共模块提取出来
//   ----?-- 可能会想到使用上面提到的commonChunkPlugin 但是不是为什么?
//    ** 因为上面说到了commonChunkPlugin是使用多入口文件的时候, 但是这里使用的是单文件

const page = 'subPageA'
if (page === 'subPageA') {
  // require([]) 参数是空数组的话, 里面的require的包还是会被异步打包
  require.ensure(
    ['./subPageA'],
    require => {
      const subPageA = require('./subPageA')
      console.log(subPageA)
    },
    'subPageA',
  )
} else if (page === 'subPageB') {
  require.ensure(
    ['./subPageB'],
    require => {
      const subPageB = require('./subPageB')
      console.log(subPageB)
    },
    'subPageB',
  )
}

// 3. 动态代码是会执行的, 并不是将代码引入到我们的页面中不执行, 在import的时候 代码实际上已经执行了
//      会将subPageC打包进入subPageA中
if (page) {
  import(/* webpackChunkName: "subPageA" */
  /* webpackMode: "lazy" */
  './subPageC').then(subPageC => {
    console.log(subPageC)
  })
} else {
  import(/* webpackChunkName: 'subPageD' */
  /* webpackMode: "lazy" */
  './subPageD')
}

/**
 * 1. 这里需要在回调函数里面在require一次, 是因为如果不require
 * 那么只是将代码引入了进来, 但是没有执行
 * 2. require的参数可以不传, 里面require的包任然会被异步打包
 *
 * 结果: 将lodash单独打包进一个文件vendor~vendor.chunk.js
 */
require.ensure(
  'lodash',
  require => {
    const _ = require('lodash')
    _.join([1, 2, 3], 4)
  },
  'vendor',
)

// import * as _ from 'lodash'

export default 'pageA'
