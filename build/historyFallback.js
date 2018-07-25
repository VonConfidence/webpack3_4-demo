module.exports = {
  // 告诉historyAPIFallback, 当时html的的时候, 才需要是rewrite规则,当时静态资源的时候 不需要rewrite规则
  htmlAcceptHeaders: [ 'text/html', 'application/xhtml+xml', ],
  // 引用了第三放依赖的包: connect-histroy-callback
  rewrites: [
    {
      from: '/pagesA',
      to: '/src/devserver/pageA.html',
    }, {
      // 正则匹配, /a/b 则访问/a/b.html, 对本地请求rewrite
      from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
      to (context) {
        return '/' + context.match[1] + context.match[2] + '.html'
      },
    },
  ],
}

// 自动指向我们的html原因是因为: 使用了html-webpack-plugin 自动寻找
