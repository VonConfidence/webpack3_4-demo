/*
 * 测试不同模块的打包方式
 * webpack app1.js --mode=development --output-filename=bundle.js --output-path=./  (默认就是根路径下dist目录 main.js文件)
*/

// es6 module
import sum from './sum'

// commonjs module
const minus = require('./minus')

// amd module
require(['./multi'], multi => {
  console.log('multi(2,3)', multi(2, 3))
})

console.log('sum(1,2)', sum(1, 2))
console.log('minus(1,2)', minus(1, 2))

/**
 打包的时候出现0.bundle.js的原因是:
    因为amd是异步打包, 异步加载模块, multi 是一个单独的chunk加载进来 (就算没有用到mukti方法 还是会有打包文件存在)
 */