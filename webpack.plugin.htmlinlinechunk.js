const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/watchmode/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/watchmode'),
    filename: '[name].bundle-[hash:5].js',
    // 脚本文件中引用文件导入资源的相对路径
    publicPath: './../../dist/watchmode/',
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].bundle-[hash:5].css',
      // 如果不指定异步加载的js文件中引入的css的chunkFileName的话, 那么会使用filename字段值
      chunkFilename: '[id].chunk.css',
      // allChunks 给插件指定一个范围, 指定提取css的范围
      // 1. 设置为true 表示所有的引用的css文件都提取
      // 2. 设置为false, 默认, 只会提取初始化的css(异步加载不认为是初始化)
      allChunks: false
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/watchmode/index.html',
      // inject: 'body', // 默认脚本插入在body尾部, 样式head尾部
      // chunks: ['index', 'runtime'], // 不指定chunks会将上面所有打包的chunk嵌入到html中 去掉这个, 避免和上面的HtmlInlineChunkPlugin冲突
      minify: {
        // 借助了html-minify 去压缩html
        collapseWhitespace: true // 压缩空格(换行符删除)
      }
    }),

    new InlineManifestWebpackPlugin('runtime')

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: '/node-modules/'
      }, // end js
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
      }, // end css
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
                  spritePath: 'dist/watchmode/assets/imgs/sprites/'
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
          {
            loader: 'url-loader',
            options: {
              limit: 50000, // 小于50k的话, 打包成为base64
              useRelativePath: true,
              publicPath: '',
              // outputPath: 'dist',
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
      }, // end jpg
      {
        test: /\.(eot|woff2?|woff|ttf|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5000, // 大于5k生成文件
              useRelativePath: true,
              name: '[name].[hash:5].min.[ext]' // 打包后文件的名称控制
            }
          }
        ]
      }, // end font
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            // 需要注意的是路径问题
            options: {
              attr: ['img:src', 'img:data-src']
            }
          }
        ]
      } // end html
    ]
  }, // end module
  optimization: {
    runtimeChunk: {
      name: 'runtime'
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
}