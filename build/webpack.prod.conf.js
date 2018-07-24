const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new InlineManifestWebpackPlugin('runtime'),

    // 每次打包都需要清除的目录
    new CleanWebpackPlugin([ 'dist/devProdMode', ]),
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    minimize: true, // [new UglifyJsPlugin({...})]
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
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css|less)$/,
          chunks: 'all', // merge all css file into one
          // minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  }, // end optimization
}
