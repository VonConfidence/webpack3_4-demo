// 使用commonjs规范
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  mode: 'development',
  entry: {
    test: path.resolve(__dirname, 'src/myloader/test.js'),
    react: path.resolve(__dirname, 'src/myloader/test.react.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/myloader'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { // use: 'babel-loader'  //可以直接是一个字符串
          loader: 'my-loader',
        },
        exclude: '/node-modules/',
      },
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx', ],
  },
  resolveLoader: {
    alias: {
      'my-loader': resolve('./src/myloader/myloader.js'),
    },
  },
}

/*
  使用webpack配置文件打包
    npm run myloader
*/
