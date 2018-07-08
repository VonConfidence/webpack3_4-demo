// 该函数并不是在打包的时候执行的,在运行webpack的时候, 是不行执行的
// 在style-loader 将样式插入到DOM中的时候 执行的, 运行的环境是在浏览器环境下, 可以拿到浏览器参数, window,UA
// 可以根据当前浏览器来对当前的css进行形变
module.exports = function(css) {
  console.log(css)
  console.log(window.innerWidth)
  // 输出形变以后的css
  if (window.innerWidth >= 768) {
    css = css.replace('yellow', 'dodgerblue')
  } else {
    css = css.replace('yellow', 'orange')
  }
  return css;
}