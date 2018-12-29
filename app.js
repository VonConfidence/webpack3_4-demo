import 'babel-polyfill'
import sum from './sum'

const func = () => {
  console.log('hello babel')
}

func()

const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
const arrb = arr.map(item => item * 2)

// 下面的语句 不会经过runtime编译
arr.includes(5)

// 会经过runtime编译  但是没有exports 使用的时候报错
// console.log('SetB', new Set(arrb))

function* gen() {
  yield 1
}

sum(1, 2)
