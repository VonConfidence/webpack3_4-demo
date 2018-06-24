// 使用commonjs规范
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/ts/index.ts')
  },
  output: {
    path: path.resolve(__dirname, 'dist/ts/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      }
    ]
  }
}