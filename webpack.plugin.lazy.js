// 懒加载和代码分割: 不是通过配置来实现, 而是通过包的引入方式

// 使用commonjs规范
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    pageA: path.resolve(__dirname, 'src/lazy', 'pageA')
    // pageB: path.resolve(__dirname, 'src/lazy', 'pageB'),
    // vendor: ['lodash']
  },
  output: {
    path: path.resolve(__dirname, 'dist/lazy'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: './../../dist/lazy/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: '/node-modules/'
      }
    ]
  },
  plugins: [
  ],
  optimization: {
    // // webpack runtime 代码
    // runtimeChunk: {
    //   name: 'manifest'
    // },
    // // 公共模块提取
    // splitChunks: {
    //   chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者),
    //   minSize: 30000, // 大于30K会被抽离到公共模块
    //   // minChunks: 2, //  模块出现两次次就会被抽离到公共模块中
    //   minChunks: Infinity, // 不需要在任何的地方重复
    //   maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个,
    //   maxInitialRequests: 3, // 入口模块最多只能加载3个
    //   // name: 'common' // 打包出来公共模块的名称
    //   name: 'vendor' // 打包出来公共模块的名称
    // }
  }

}