/*
  使用express webpack-dev-middleware 搭建开发服务器
*/
const express = require('express')
const webpack = require('webpack')
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const proxyTable = require('./proxy')
const historyFallback = require('./historyFallback')

// 启动express
const app = express()
const port = 3000

// 获取开发环境下的配置文件
const config = require('../webpack.dev.devserver')

// webpack处理 执行配置
const complier = webpack(config) // 给express使用

for (let context in proxyTable) {
  // 让每一个代理都通过proxyMiddleware
  app.use(proxyMiddleware(context, proxyTable[context]))
}

app.use(historyApiFallback(historyFallback))

app.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(complier))

app.listen(port, () => {
  console.log('success listen to:', port)
  opn('http://localhost:' + port)
})
