
import _ from 'lodash'

console.log('lodash: ', _);
// 1. 这里不再使用include, 因为会和pageA打包到一起, 这里的目的是 将其异步单独提取出来
// require.include('./moduleA')

const page = 'subPageA'

if (page) {
  import(
    /* webpackChunkName: "subPageA" */
    /* webpackMode: "lazy" */
    './subPageA'
  ).then(subPageA => {
    console.log(subPageA)
  })
} else {
  import(
    /* webpackChunkName: 'subPageB' */
    /* webpackMode: "lazy" */
    './subPageB'
  )
}


export default 'pageA'