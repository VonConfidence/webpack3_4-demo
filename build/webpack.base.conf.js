const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const merge = require('webpack-merge')

const generateConfig = (env) => {
  const scriptLoader = [
    {
      loader: 'babel-loader',
    },
  ]
  if (env === 'development') {
    scriptLoader.push({
      loader: 'eslint-loader',
      options: {
        formatter: require('eslint-friendly-formatter'),
      },
    })
  };

  const cssLoaders = [
    {
      loader: 'css-loader',
      // loader: 'file-loader'
      options: {
        // minimize: true,
        modules: true,
        // localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
        localIdentName: '[local]',
        sourceMap: env === 'development',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        // require进来的插件给postcss使用的
        ident: 'postcss', // 表明接下来的插件是给postcss使用的
        sourceMap: env === 'development',
        plugins: [
          // require('autoprefixer')(),
          // require('postcss-sprites')({
          //   // 打包文件路径
          //   spritePath: 'dist/devserver/assets/imgs/sprites/'
          // }), // 合成精灵图
          require('postcss-cssnext')(),
        ], // 可以使用plugins.concat来决定是否使用雪碧图 和上面使用的一样
      },
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: env === 'development',
      },
    },
  ]

  env === 'production'
    ? cssLoaders.unshift(MiniCssExtractPlugin.loader)
    : cssLoaders.unshift({
      loader: 'style-loader',
      options: {
        sourceMap: true,
        // insertInto: '#app', // 将style标签插入到 #app dom下
        singleton: true, // 将引用的css放在一个style标签下
        // transform: '../src/style/css.transform.js', // css变形的函数
      },
    // loader: 'style-loader/url' // 生成的css放在link标签
    })
  const styleLoader = cssLoaders
  /*
  const fileLoader = env === 'development' ? [
    {
      loader: 'file-loader',
      options: {
        name: '[name]-[hash:5].[ext]',
        outputPath: 'assets/imgs/',
      },
    },
  ] : [
    {
      loader: 'url-loader',
      options: {
        limit: 50000, // 小于50k的话, 打包成为base64
        useRelativePath: true,
        // outputPath: 'dist',
        name: '[name].[hash:5].min.[ext]', // 打包后文件的名称控制
      },
    },
    {
      loader: 'img-loader', // 帮助压缩图片
      options: {
        pngquant: {
          quality: 80,
        },
      },
    },
  ]
  */
  return {
    entry: {
      index: path.resolve(__dirname, '../src/devserver/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist/devProdMode'),
      filename: 'js/[name].bundle-[hash:5].js',
      // 脚本文件中图片路径的引用文件导入资源的相对路径
      // 这里路径问题 --- + spirits打包后的路径有问题 ** spirite和路径问题 **
      publicPath: '/',
      chunkFilename: 'js/[name].chunk.js',
    },

    resolve: {

    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].bundle-[hash:5].css',
        // 如果不指定异步加载的js文件中引入的css的chunkFileName的话, 那么会使用filename字段值
        chunkFilename: 'css/[id].chunk.css',
        // allChunks 给插件指定一个范围, 指定提取css的范围
        // 1. 设置为true 表示所有的引用的css文件都提取
        // 2. 设置为false, 默认, 只会提取初始化的css(异步加载不认为是初始化)
        allChunks: false,
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/devserver/index.html',
        // inject: 'body', // 默认脚本插入在body尾部, 样式head尾部
        // chunks: ['index', 'runtime'], // 不指定chunks会将上面所有打包的chunk嵌入到html中 去掉这个, 避免和上面的HtmlInlineChunkPlugin冲突
        minify: {
          // 借助了html-minify 去压缩html
          collapseWhitespace: true, // 压缩空格(换行符删除)
        },
      }),

    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: scriptLoader,
          exclude: '/node-modules/',
        }, // end js
        {
          test: /\.css$/,
          use: [ {
            loader: 'style-loader',
            options: {
              sourceMap: true,
              // insertInto: '#app', // 将style标签插入到 #app dom下
              singleton: true, // 将引用的css放在一个style标签下
              transform: '../src/style/css.transform.js', // css变形的函数
            },
            // loader: 'style-loader/url' // 生成的css放在link标签
          },
          {
            loader: 'css-loader',
            // loader: 'file-loader'
            options: {
              sourceMap: true,
              // publicPath: '../', // 无效
              // minimize: true,
              modules: true,
              // localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
              localIdentName: '[local]',
            },
          },
          ],
        }, // end css
        {
          test: /\.less$/,
          use: styleLoader,
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [ {
            loader: 'url-loader',
            options: {
              limit: 50000, // 小于50k的话, 打包成为base64
              useRelativePath: true,
              // outputPath: 'dist',
              name: '[name].[hash:5].min.[ext]', // 打包后文件的名称控制
            },
          },
          {
            loader: 'img-loader', // 帮助压缩图片
            options: {
              pngquant: {
                quality: 80,
              },
            },
          },
          ],
        }, // end jpg
        {
          test: /\.(eot|woff2?|woff|ttf|svg)/,
          use: [ {
            loader: 'url-loader',
            options: {
              limit: 5000, // 大于5k生成文件
              useRelativePath: true,
              name: '[name].[hash:5].min.[ext]', // 打包后文件的名称控制
            },
          }, ],
        }, // end font
        {
          test: /\.html$/,
          use: [ {
            loader: 'html-loader',
            // 需要注意的是路径问题
            options: {
              attr: [ 'img:src', 'img:data-src', ],
            },
          }, ],
        }, // end html
      ],
    }, // end module
  }
}

module.exports = function (env) {
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env), config)
}
