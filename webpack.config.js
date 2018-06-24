// 使用commonjs规范
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, 'app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: '[name].[hash:5].js'
    filename: '[name].js'
    // filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { // use: 'babel-loader'  //可以直接是一个字符串
          loader: 'babel-loader'
          // options: { // 也可以在.babelrc 文件中指定
          //   // 指定preset
          //   presets: [['env', {
          //     // 告诉babel, 当需要编译的时候, 会根据指定的target来选择那些语法进行编译, 那些语法不进行编译
          //     targets: {
          //       browsers: ['> 1%', 'last 2 versions']
          //       // chrome: '52'
          //     }
          //   }]]
          // }
        },
        exclude: '/node-modules/'
      }
    ]
  }
}

/*
  使用webpack配置文件打包
    webpack --config webpack.config.js 或者直接使用webpack
*/