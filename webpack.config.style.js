const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/style/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/style'),
    filename: '[name].bundle.js',
    publicPath: './../../dist/style/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: '/node-modules/'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertInto: '#app', // 将style标签插入到 #app dom下
              singleton: true, // 将引用的css放在一个style标签下
              transform: './src/style/css.transform.js' // css变形的函数
            }
            // loader: 'style-loader/url' // 生成的css放在link标签
          },
          {
            loader: 'css-loader',
            // loader: 'file-loader'
            options: {
              // minimize: true,
              modules: true,
              localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
            }
          }
        ]
      }
    ]
  }
}

/*
  使用webpack配置文件打包
    webpack --config webpack.config.js 或者直接使用webpack
*/