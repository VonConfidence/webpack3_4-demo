
// import _ from 'lodash'
import { subPageA, } from './subPageA'
import { subPageB, } from './subPageB'

console.log(subPageA)
console.log(subPageB)

// const page = 'subPageB';

// if (page) {
//   import(
//     /* webpackChunkName: "subPageA" */
//     /* webpackMode: "lazy" */
//     './subPageA'
//   ).then(subPageA => {
//     console.log(subPageA)
//   })
// } else {
//   import(
//     /* webpackChunkName: 'subPageB' */
//     /* webpackMode: "lazy" */
//     './subPageB'
//   )
// }

export default 'pageA'
