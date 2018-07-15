const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/devserver/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/devserver'),
    filename: 'js/[name].bundle-[hash:5].js',
    // 脚本文件中图片路径的引用文件导入资源的相对路径
    // 这里路径问题 --- + spirits打包后的路径有问题 ** spirite和路径问题 **
    publicPath: '/',
    chunkFilename: 'js/[name].chunk.js'
  },
  devServer: {
    port: 9001,
    inline: false, // 浏览器查看打包进度
    // historyApiFallback: true, // 单页面使用hash#, 可以改变历史的记录, 即时一个路径, 当本地的没有文件的时候, 会报404错误
    // 简单来说: http://localhost:9001/webpack-dev-server/tets1/2/3 不会报404
    historyApiFallback: {
      // 引用了第三放依赖的包: connect-histroy-callback
      rewrites: [
        {
          from: '/pagesA',
          to: '/src/devserver/pageA.html'
        }, {
          // 正则匹配, /a/b 则访问/a/b.html, 对本地请求rewrite
          from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
          to(context) {
            return '/' + context.match[1] + context.match[2] + '.html'
          }
        }
      ]
    },
    proxy: {
      '/api': {
        target: 'https://cnodejs.org', // https会表示证书无效
        changeOrigin: true, // 如果此项不设置, 那么请求就会报错
        logLevel: 'debug' // 设置查看详细的代理信息
      },
      '/cgi-bin': {
        target: 'https://fudao.qq.com/',
        changeOrigin: true,
        headers: {
          origin: 'https://fudao.qq.com/pc/course.html',
          referer: 'https://fudao.qq.com/pc/course.html?course_id=12748',
          dnt: 1,
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          cookie: 'pgv_pvi=272781312; RK=nPGeXiPvuq; tvfe_boss_uuid=ca7433346d4ec606; mobileUV=1_1600d2213c4_d7bee; pgv_pvid=8865894656; pgv_si=s9825168384; ptcz=04a36eb8612a430132d13b169c80f298d6f9b9ce3b6ad8a7f891aba1a5f90e1c; pgv_info=ssid=s9131647348&pgvReferrer=; eas_sid=61U541q5T962i0b1n6W9B4q3c3; pac_uid=1_1554799901; user_id=446256354; session_id=d5607c8ed33063d249dd8fdb; qqmusic_uin=1554799901; qqmusic_fromtag=6; qqmusic_guid=1554799901; rv2=804565F97DC9C95F5D553E19149FDFD6A4E500A3C43715988E; property20=25A2168B1E9FFBA0C354FB68394E1F573F254E9815ACB7825B00F038D6FDF586F94670BC3CD49CA6; qqmusic_key=@0nKQZn3hF; qqmusic_vkey=39E72D75EDE9EA38EFC421DA88CD74519A24405166C84882247072D12865DEFC12D4859DF43342208DA8F50DCE3DA6838169BB171FD54BF5; o_cookie=1070309568; ptui_loginuin=1554799901; ptisp=ctc; IED_LOG_INFO2=userUin%3D1554799901%26nickName%3DI%252BBELIEVE%26userLoginTime%3D1531055112; pt2gguin=o1070309568; luin=o1070309568; from_source=none; _qpsvr_localtk=0.16652252352429842; uin=o1070309568; skey=@8RzvboqIU; lskey=0001000021831966efed59b1d9ec7e723a55a243c626bfe3d929e51e1007fc01320e64cf69a999eefcbfe040; p_uin=o1070309568; pt4_token=HCQbhfPKQYyMWs-nXHjfK3TftODOzfFUc3aeUCqWjIY_; p_skey=WBqCdHx3Oo5W4DOM6N1TH9rE8jzlv53AMH0GPQqv1dw_; p_luin=o1070309568; p_lskey=000400005d3b5df53000e3791155494a33b83359fde9f4d0ae2eaad85669eaa663141ca2427045aa51cc032a; plCache=discover.hotcourse_0_0'
        }
      },
      '/': {
        target: 'https://cnodejs.org', // https会表示证书无效
        changeOrigin: true, // 如果此项不设置, 那么请求就会报错
        pathRewrite: {
          '^/topics': '/api/v1/topics'
        }
      }
    },
    hot: true
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
      allChunks: false
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/devserver/index.html',
      // inject: 'body', // 默认脚本插入在body尾部, 样式head尾部
      // chunks: ['index', 'runtime'], // 不指定chunks会将上面所有打包的chunk嵌入到html中 去掉这个, 避免和上面的HtmlInlineChunkPlugin冲突
      minify: {
        // 借助了html-minify 去压缩html
        collapseWhitespace: true // 压缩空格(换行符删除)
      }
    }),

    new InlineManifestWebpackPlugin('runtime'),

    // 每次打包都需要清除的目录
    new CleanWebpackPlugin(['dist/devserver']),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.NamedModulesPlugin()

  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: '/node-modules/'
    }, // end js
    {
      test: /\.css$/,
      use: [{
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
          // publicPath: '../', // 无效
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
              // require('postcss-sprites')({
              //   // 打包文件路径
              //   spritePath: 'dist/devserver/assets/imgs/sprites/'
              // }), // 合成精灵图
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
      use: [{
        loader: 'url-loader',
        options: {
          limit: 50000, // 小于50k的话, 打包成为base64
          useRelativePath: true,
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
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000, // 大于5k生成文件
          useRelativePath: true,
          name: '[name].[hash:5].min.[ext]' // 打包后文件的名称控制
        }
      }]
    }, // end font
    {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        // 需要注意的是路径问题
        options: {
          attr: ['img:src', 'img:data-src']
        }
      }]
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