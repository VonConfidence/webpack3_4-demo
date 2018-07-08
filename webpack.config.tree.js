const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/treeshaking/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/treeshaking'),
    filename: '[name].bundle.js',
    publicPath: './../../dist/treeshaking/',
    chunkFilename: '[name].chunk.js'
  },
  optimization: {
    // production mode下面自动为true
    // minimize: true // [new UglifyJsPlugin({...})] // 当然如果想使用第三方的压缩插件也可以在optimization.minimizer的数组列表中进行配置
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: { // use: 'babel-loader'  //可以直接是一个字符串
      //     loader: 'babel-loader'
      //   },
      //   exclude: '/node-modules/'
      // },
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
      },
      {
        test: /\.less$/,
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
              // localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
              localIdentName: '[path]_[name]_[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // require进来的插件给postcss使用的
              ident: 'postcss', // 表明接下来的插件是给postcss使用的
              plugins: [
                // require('autoprefixer')(),
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
}