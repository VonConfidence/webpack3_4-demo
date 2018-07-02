const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/extract-css/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/extract-css'),
    filename: '[name].bundle.js',
    publicPath: './../../dist/extract-css/',
    // 指定异步打包模块的名称
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].min.css',
      // 如果不指定异步加载的js文件中引入的css的chunkFileName的话, 那么会使用filename字段值
      chunkFilename: '[id].chunk.css',
      // allChunks 给插件指定一个范围, 指定提取css的范围
      // 1. 设置为true 表示所有的引用的css文件都提取
      // 2. 设置为false, 默认, 只会提取初始化的css(异步加载不认为是初始化)
      allChunks: false
    })
  ],
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
          MiniCssExtractPlugin.loader, // replace ExtractTextPlugin.extract({..})
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // loader: 'file-loader'
            options: {
              // minimize: process.env.NODE_ENV === 'production',
              minimize: true,
              modules: true,
              localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }, // end modules
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    // minimize: true, // [new UglifyJsPlugin({...})]
    splitChunks: {
      chunks: 'async',
      // minSize: 30000,
      minSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all', // merge all css file into one
          // minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
}