const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/filedeal/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/filedeal'),
    filename: '[name].bundle.js',
    publicPath: './../../dist/filedeal/',
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
              localIdentName: '[local]'
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
              // minimize: true,
              modules: true,
              // localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
              localIdentName: '[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // require进来的插件给postcss使用的
              ident: 'postcss', // 表明接下来的插件是给postcss使用的
              plugins: [
                // require('autoprefixer')(),
                require('postcss-sprites')({
                  spritePath: 'dist/filedeal/assets/imgs/sprites/'
                }), // 合成精灵图
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }, // end less
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     // 配置路径  webpack3 还需要配置 outputPath: 'dist', publicPath: '',目录下, 不然放在了根路径下assets目录
          //     useRelativePath: true // 放到了dist/assets/ 目录下面
          //     // outputPath: '' // 定义文件存放的位置, 默认是在dist/路径下
          //   }
          // }
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 小于10k的话, 打包成为base64
              useRelativePath: true,
              name: '[name].[hash:5].min.[ext]' // 打包后文件的名称控制
            }
          },
          {
            loader: 'img-loader', // 帮助压缩图片
            options: {
              pngquant: {
                quality: 80
              }
            }

          }
        ]
      }
    ]
  }
  /*
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
          test: /\.(scss|css|less)$/,
          chunks: 'all', // merge all css file into one
          // minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  } // end optimization
  */
}