##   背景
1. webpack如何诞生?
    - github: @sokra Tobias  Java开发 GWT(Google Web Toolkit) 作者很喜欢这个功能
    - 提供pull request, 将自己的修改提供到别人的修改中, 别人并没有接受
    - Instagram 包容了weboack  由Instagram维护

2. 为什么需要构建
    - 开发分工变化
        - 以往
            - 前端页面html, 动画效果
            - 后台服务端脚本语言, 根据前端页面自己渲染数据, 以及交互逻辑
        - 现在
            - 前端路由, 单页面应用
            - 通过浏览器history/hash实现
            - 关注页面逻辑, 数据请求以及逻辑
            - 前端自己渲染
            - 在业务代码中文件越来越多 (数据层, 视图层, 控制层)
            - 复杂度的增加就导致我们需要打包构建
    - 框架的变化
        - JS库(不同浏览器的兼容问题, 原生方法补全)  前端库时代: dojo yui jquery prototype kissy Mootools
            - dom操作 ajax请求, 工具方法补充
        - 关注度的转换 -> MVC
            - backbone.js 前端路由
            - undescorejs require.js 模块化的思想开始出现,开始分层
        - -> Mv*  关注上层业务开发
            - angular
            - react
            - vue
        - 导致构建的出现
            - 早期是直接在html页面中使用
            - 单页面/服务端喧嚷 推崇模块化, 
            - 自定义标签, es6新语法,typescript 都需要在构建的过程中进行编译
    - 语言的变化
        - HTML的发展史
        - css的发展史 -> css3到现在还在更新 -> sass2007 less2009 postcss stylus2010 (css预处理工具)
        - 前端脚本语言
            - JsScript VBScript ActionScript
            - CofffeScript ruby
            - ES2017 TS 需要使用编译工具, 才能在浏览器上运行
    - 环境的变化
        - 在浏览器上运行, 本地创建html文件, 创建一个js, 嵌入在html中
        - 前端js代码可以跑在服务端 node
        - 移动端: RN PhoneGap  H5+CSS3+JS 
        - 一份代码跑在三端, 服务+浏览器+移动
        - 运行环境的变化造成应用复杂度的加大
    - 社区的变化
        - github
        - npm
        - 对库的管理更加方便, 开发方式的变化
    - 工具的变化
        - apache ant java
        - 随着nodejs的发展 社区的发展
        - grunt fis gulp 
        - webpack rollup
    - 需要构建的原因
        - 开发复杂化
        - 框架去中心化
            - 所有用到的代码中的模块或者功能, 都能使用npm安装
            - 库只关注与一个功能解决一个问题, 只安装这一个代码包, 而不是大而全面的解决所有问题的
            - 这就意味着包越来越零散, 零散的时候就需要打包
        - 语言编译化
        - 开发模块化
    - 为什么webpack
        - vue-cli create-react-app angular-cli 三者都是用webpack作为构建工具
        - 支持代码分割
        - 天生支持模块化, 将任何文件当做模块

## 基于webpack3.10
1. 基础知识
    - 前端发展历史
    - 模块化开发

2. 开发环境
    - 配置sourceMap调试
    - 配置远程接口代理
    - 配置动态entry更新
    - 配置模块热更新
    - 配置eslint检查代码格式

3. 文件处理
    - 编译es6/7
    - 编译typescript
    - 编译less/sass
    - postcss处理浏览器前缀
    - 自动生成html模板文件
    - 图片压缩和Base64编码
    - 自动生成雪碧图

4. 打包优化
    - 代码分割和懒加载
    - 提取公用代码
    - Tree-Shaking
    - 长缓存配置

5. 框架配合
    - vue-cli
    - angular-cli
    - create-react-app

6. 收获
    - 了解现代前端工程搭建和配置
    - 了解现代前端优化手段
    - 熟悉通过工具提高开发效率
    - 掌握常见的webpack基本配置

# 第一节
## 模块化开发
> 所有的代码, 在主流的开发模式中, 都是由一个个的模块构成的. 所有的模块都是可以通过包管理器去拉取我们需要的包; 如同工厂组装手机, 由一个个组件组装成为一个完整的手机
1. js模块化
    - 早起使用命名空间
        - 库名.类别名.方法名
            ```js
            var NameSpace ={}
            NameSpace.type = NameSpace.type || {}
            NameSpace.type.method = function () {}
            ```
        - 避免重复覆盖的问题
            - 命名空间被覆盖
            - 使用的时候必须记住完整的路径变量名
            - yui2 中大量使用
            - 必须团队约定使用命名空间, 公共命名空间
        - YUI3沙箱机制 (定义模块 -> 使用模块 -> 指定模块路径)
    - COMMONJS (node社区) 只能应用在服务端
        - 一个文件为一个模块
        - 通过module.exports(export)暴露模块接口
        - 通过require引入模块 (在服务端 是同步执行的)
            ```js
            const webpack = require('webpack')
            const mixin = require('./request')
            const router = require('./router')
            const router = require('./response')

            exports = modules.exports = createApplication
            ```
    - AMD/CMD(国内)/UMD 帮助我们规范模块化开发的
        - AMD (Async Module Definition)
            - 使用define定义模块
            - 使用require来加载模块
            - requirejs  依赖前置, 提前执行
                ```js
                define(
                  // 模块名
                  "module-name",
                  // 依赖
                  ['require', 'exports', 'beta']
                  // 模块输出
                  function(require, exports, beta) {
                    // 参数表示依赖模块输出属性
                    exports.verb = function() {
                      return verb;
                      // Or:
                      return require('beta').verb;
                    }
                  }
                )

                // 支持模块名省略
                define(
                  ['a','b','c','d','e'],
                  // 在前面申明并且初始化了所有要用到的模块
                  function(a,b,c,d,e) {
                    if (false) {
                      // 即便从来没有用到模块b 但是b还是提前执行了
                      b.foo()
                    }
                  }
                )
                ```
        - CMD (Common Module Definition) 通用模块定义
            - 一个文件作为一个模块
            - 使用define来定义一个模块
            - 使用require来加载一个模块
            - SeaJs (尽可能的懒执行) 即便require了, 但是并不会被执行, 直到代码逻辑执行到了才去执行
                ```js
                // 所有的模块定义都通过define来 定义
                define(function(require, exports,module) {
                  // 通过require来引入
                  var $ =require('jquery')
                  var Spinning = require('./spining')

                  // 通过exports提供对外接口
                  exports.doSomething = function() {}

                  // 或者通过 module.exports提供整个接口
                  module.exports = {
                    doSomething:function() {}
                  }
                })
                ```

        - UMD打包规范(Universal Module Definition) 通用模块定义
            - 通用解决方案
            - 三个步骤
                - 判断是否支持AMD
                - 判断是否支持CommonJS
                - 如果都没有, 使用全局变量
                ```js
                (function(root, factory) {
                  if (typeof define==='function' && define.amd) {
                    // AMD支持环境
                    define([], factory)
                  } else if (typeof exports === 'object') {
                    // CommonJS规范
                    module.exports = factory();
                  } else {
                    // 浏览器全局环境 root = window
                    root.returnExports = facotry;
                  }
                })(this, 
                function(){
                  return {}
                })
                ```
    - ES6 module es的规范普及, 越来越多的使用es6的模块化规范, 但是和common规范有些冲突, 产出通用的规范讨论还在继续
        - Ecmascript Module 一个文件一个模块
        - import/export (default)

            ```
            import theDefault, {named1, named2 } from 'src/lib'
            import {named1 as myname1, named2 } from 'src/lib'
            import * as mylib from 'src/lib'

            export default 123
            export default function() {}
            export const a = 1; //ovcf

            const myConst = ''
            export {myConst as theConst}
            export { foo, bar} from './src/otherModule'
            ```

    - 上面就是前段模块的一个进步的过程, webpack支持
        - AMD (requireJS)
        - ES module(推荐使用)
        - CommonJS (node)

2. css模块化
    - css设计模式
        - OOCSS 面向对象的css (获得在不同地方使用的css类)
            - 结构和设计的分离
            - 容器和内容的分离
        - SMACSS
            - 可扩展和模块化结构
            - 目标: 减少代码量, 降低代码的维护难度
                - Base 基础样式
                - Layout 布局规则 全局
                - Module 模块内部
                - State 状态
                - Theme 主题
        - AtomicCSS
            - 每一个class都代表自己的独特的意义
            - div.mt-10.w-100.h-15
        - MCSS (multilayer) 多层级css
            - foundation
            - base
            - project
            - cosmetic 装束
        - AMCSS 针对属性进行编码设计
            - div[amz-size=large am-disabled]
        - BEM (Block Element Modifier)
            - Block (header, container, menu, checkbox, input)
            - Element (menu-item, list-item, checkbox, caption, head-title)
            - Modifier: (disabled, highligted, checked, actived, size-big, color-yellow)
            - 使用: button.button.button-state-success.big.yellow
    - CSS modules

3. 环境准备
    - 命令行工具
    - Node+npm
    - webpack

4. webpack 简介
    - webpack概述
        - 将浏览器能够识别的资源文件打包成为static assets
        - 官网 webpack.js.org  doc.webpack-china.org
    	- webpack版本迭代
        - webpack v1.0.0 -> 2014.02.20
        - webpack v2.2.0 -> 2017.1.18
        - webpack v3.0.0 -> 2017.06.19
        - webpack v4.0.0 beta -> 2018.02
    - webpack功能进化
        - v1
            - 编译, 打包
            - HMR 模块热更新
            - 代码分割
            - 文件处理(loader, plugin)
        - v2
            - tree shaking 打包以后的代码体积更小, 没有将我们没有用到的代码全部都给打包进来
            - ES module v1不支持es6语法, 需要babel支持; v2不需要依赖任何第三方模块   
            - 动态import  import函数
            - 新的文档
        - v3
            - Score Hosting 作用域提升 
                - 打包以后代码性能的提升, 不是打包性能的提升
                - 老版本将每一个模块包裹在一个单独的函数闭包中实现模块系统, 封装的函数系统使得浏览器运行javascript性能有所下降, 闭包越多对浏览器性能损失越大, 学习rollup -> 将所有模块的代码作用域, 提到单一的一个闭包中, 这样保证浏览器运行代码的单一速度, 性能提升体现在打包后代码的运行速度上
            - Magic Comments (配合动态import使用)
                - 指定webpack懒加载, 指定打包以后的chunk名称
        - 版本迁移  
            - v1->v2
            - v2->v3 向前兼容
            - v3->v4
        - 参与社区投票 -> 下一个版本功能 todo list core team

5. webpack 核心概念
    - Entry 打包的入口, 代码的入口
        - 告诉webpack, 这里面所有的依赖import, require了哪些包, 找到依赖的模块(直接|间接(循环))
        - 单个或者多个entry
            - 多个入口: 
                1. 多页面应用程序 
                2. 单页面
                    - 业务代码放到一个entry中
                    - 框架代码放到另外一个entry中

            ```js
            module.exports = {
              entry: 'index.js', 
              //entry: ['index.js', 'vendor.js']
              // entry: {index: 'index.js', vendor: 'vendor.js'}
              // entry: {index: ['index.js', 'app.js'], vendor: 'vendor.js'}
              /*
                index表示一个key 独特的chunk 代码块
                对象的时候好处:
                    1. 知道每一个entry的chunk是什么
                    2. 如果想要继续添加入口, 再指定一个key, 清楚知道每一个文件对应的key是什么 
              */
            }
            ```

    - Output 表示输出
        - 打包生成的文件的一个描述bundle
        - 一个或者多个
        - 自定义规则

        ```js
        output: {
          filename: '[name].bundle.[hash:5].js'
        }
        
        /**
          name: 表示entry的key值
          hash: 表示md5码 表示文件的内容的hash
        */
        ```

    - Loaders 可以处理其他类型的文件, 靠的就是loaders
        - 处理文件的
        - 将文件转化为模块 (即转化成为js可以处理的)

        ```js
        rules: [{
          test: /\.css$/,
          use: 'css-loader'
        }]
        ```

        - 编译相关loader: babel-loader, ts-loader
        - 样式相关: style-loader,   css-loader, scss-loader, less-loader, postcss-loader
        - 文件相关: file-loader, url-loader

    - Plugins 压缩代码, 混淆代码, 代码分割, TreeShaking, 通过自身强大的插件系统实现的
        - 参与到打包的过程
        - 打包优化和压缩
        - 配置编译时的变量
        - 极为灵活

          ```js
          module.exports = function() {
            plugins: [
              // 打包过程使用插件 压缩代码
              new webpack.optimize.UglifyJsPlugin()
            ]
          }
          ```

        - 常用的插件
            - 优化相关: 
                - CommonsChunksPlugin 提取不同的chunk之间但是相同的代码, 提取单独的一个chunk出来
                - UglifyJsWebpackPlugin 混淆压缩代码, 生成js的sourceMap
            - 功能相关
                - ExtractTextWevbpackPlugin 将css样式提取出来作为一个单独的文件, js引用将css放入到了style标签上
                - HtmlWebpackPlugin 帮助生成html文件
                - HotModuleReplacePlugin 模块热更新
                - CopyWebpackPlugin 帮助我们拷贝文件(打包的时候引用第三方的资源, 不用打包第三方的库,因为引用的第三方资源可能是已经打包好的, 将项目中已经打包好的第三方资源直接移动到我们的输出目录下)

    - Chunk 代码块
        - 默认将代码分成一个个的代码块, 动态懒加载的被分为一个代码块, 甚至使用提取公共代码的, 相同的引用代码就会被独立抽离成为代码块

    - Bundle 打包后的块

    - Module 模块
        - loaders将一个个的文件转化为我们的模块, 图片处理完成之后就是一个模块, css文件处理完成之后就是一个模块

    - 打包疑问解析

        ```js
        // app.js
        import sum from './sum'
        sum(1,2)
        
        // app1.js
        import sum from './sum'
        sum(2,3)
        
        // webpack.config.js
        entry: {
            app: './app.js',
            app1: './app1.js'
        }
        
        
        output: {
            filename: '[name].js'
        }
        // 1. 结果: 最后打包出来的app1.js 和 app2.js中都会将sum包含其中, 造成重复
        
        
        output: {
            filename: 'bundle.js'
        }
        // 2. 结果: 最后打包出来的bundle.js 中只会包含一遍sum在其中, 没有重复, 同时控制台给出警告 Conflict: Multiple assets emit to the same filename bundle.js
        
        // 3. 在app1.js中 使用amd的方式引入amd定义模块multi 
        require(['./multi'], multi => {
          const sum = require('./sum')
          console.log('multi(2,3)', multi(2, 3))
        })
        // webpack app1.js --output-path=dist
        // 结果: 会形成一个0.js的打包文件, 因为是异步打包, 单独的chunk加载进来
        // 如果在multi.js 中 在define回调中使用require('./sum')的话, sum.js 不会被打包进入0.js中
        // 对于AMD的规范, 这类不细讨论
        ```

        

## 由浅入深 webpack
1. 使用webpack
    - webpack命令使用
        - webpack --help (webpack -h) 查看所有的命令
        - webpack-v
        - 打包命令 webpack \<entry\> [\<entry\>] \<output\>  不适用webpack配置文件的时候
        - 使用webpack配置文件, 直接webpack 
            - --config 指定配置文件 (默认配置文件名称 webpack.config.js或者 webpackfile.js)
        - Basic Options
            - --entry 指定入口文件
            - --watch -w 检测文件系统的变化
            - --debug -d 打开调试状态
            - --devtool  生成sourceMap
            - --progress 进度条显示
            - -d 简写 --mode development
        - Module Options
        - Output Options
        - Advanced Options 高级选项
        - Resolved Options 解析选项
        - Optimization Options 优化选项
        - Stats Option 状态选项 (打包出来样式的选项)

    - 使用webpack配置(配合node npm使用)
        - 不同的配置文件, 开发环境, 生产环境, 测试环境, 打包给第三方使用的

    - 第三方的脚手架vue-cli

        + 交互式的初始化一个项目

        + 项目迁移v1->v2

          ```shell
          # wepbpack-cli的使用
          webpack-cli init webpack-addons-demo
          # 项目迁移
          webpack-cli migrate <config> ## 只会升级配置文件, package.json里面的文件 需要手机升级
          ```

2. 直接使用webpack命名, 使用默认文件或者默认配置

    ```javascript
    // app.js
    import sum from './sum'
    conosle.log(sum(1,2))
    
    // sum.js
    export default function sum(a, b) {
        return a + b;
    }
    
    //  打包命令: webpack app.js --output-path=dist --output-filename=bundle.js --mode development
    
    // 指定配置文件 webpack --config webpack.config.dev.js
    ```

3. 编译ES6/7

    - babel-loader

      ```shell
      ## 安装最新版本loader
      npm install babel-loader@8.0.0-beta @babel/core --save-dev
      ## 安装最新preset
      npm install @babel/preset-env --save-dev
      ```

      

    - npm install babel-loader babel-core --save-dev

    - npm install babel-preset-env --save-dev 指定规范的版本, 只是针对语法

      - es2015
      - es2016
      - es2017
      - env 包括2015~2017, 以及latest 用的比较多
      - 业内自定义的babel-preset-react
      - babel-preset-stage 0 ~3 表示规范组还没有正式发布阶段的

    - babel-presets - options - target 当需要编译的时候, 会根据指定的target来选择那些语法进行编译, 那些语法不进行编译 

      - target.browsers 指定浏览器环境

        - target.browsers: 'last 2 versions' 主流浏览器的最后两个版本

        - target.browsers: '> 1%' 大于全球浏览器占有率1%的浏览器

        - 数据来源是 browserlist中, can i use中

          ```js
          {
                  test: /\.js$/,
                  use: { // use: 'babel-loader'  //可以直接是一个字符串
                    loader: 'babel-loader',
                    options: {
                      // 指定preset
                      presets: [['env', {
                        // 告诉babel, 当需要编译的时候, 会根据指定的target来选择那些语法进行编译, 那些语法不进行编译
                        targets: {
                          browsers: ['> 1%', 'last 2 versions'],
                          // chrome: '52' // 一些新语法浏览器直接支持 不会被转换
                        }
                      }]]
                    }
                  },
                  exclude: '/node-modules/'
           }
           
           // 当同时指定'> 1%', 'last 2 versions'的时候, 箭头函数会被转化, const, let等被转化, set不会被转化, num**2 转成了Math.pow
           // 将targets换成  chrome: '52', 转化后代码基本和原生代码一样
          ```

          

      - target.node 指定node环境

      

    - babel-polyfill插件和babel-runtime-transform插件

      - 针对一些方法比如数组的map, includes, Set并没有被babel处理, 但是在一些低版本的浏览器中这些方法并没有被实现, 所以需要借助这两个插件
      - babel-preset 只是针对语法, 而这两个插件针对函数和方法
        - generator
        - Set
        - Map
        - Array.from
        - Array.prototype.includes
      - 上述方法都没有被babel处理, 所以就需要借助babel的插件进行处理

    - babel-polyfill 垫片, 浏览器之间标准实现的方式不一样,保持浏览器之间同样的API

      - 全局垫片 (只要引入, 在全局范围内整个浏览器范围内, 可以对实现的API进行调用)
      - 相当于对全局变量的一个污染, 为开发应用而准备的 (在业务中使用, 而不是框架比如vue)
      - 使用: npm install babel-polyfill --save 真实项目中的依赖 所以是--save
      - 在项目中使用  import 'babel-polyfill'

    - babel-runtime-transform

      - 局部垫片
      - 为开发框架而准备的, 不会污染全局变量, 会在局部的方法里面新增加变量和方法
      - 优势: 当在代码中使用它的时候, 项目中的其他函数,如果使用es6/7方法, 会将每一个引用到的方法打包到单独的文件中去的;  如果使用了runtime-transform, 将其作为一个独立的整体单独打包进去, 相当于文件之间多余的代码就不会再有了
      - npm install babel-plugin-transform-runtime --save-dev
      - npm install babel-runtime --save

    - .babelrc 在里面配置和babel插件相关的内容

      ```js
      // app.js
      import sum from './sum'
      
      const func = () => {
        console.log('hello babel')
      }
      
      func()
      
      const arr = [1, 2, 3, 4, 5, 4, 3, 2, 1]
      const arrb = arr.map(item => item * 2)
      
      // 下面的语句 不会经过runtime编译
      arr.includes(5);
      
      // 会经过runtime编译  但是没有exports 使用的时候报错
      console.log('SetB', new Set(arrb))
      
      /*
      function* gen() {
        yield 1
      }
      */
      sum(1, 2)
      
      // .babelrc
      {
        "presets": [["env", {
          "targets": {
            "browsers": ["> 1%", "last 2 versions"]
          }
        }]],
        "plugins": [
          "transform-runtime"
        ]
      }
      
      // 1. 当plugins为空的时候, 上面的代码会完整运行, 都不会被转义
      // 2. 添加generator函数的时候, 会报错找不到 regenerator
      // 3. 添插件的时候 includes不会编译, Set, generator会编译, 但是报错$export is not a function
      // 4. 屏蔽插件plugins, 使用polyfill, 完美运行所有新属性, 但是打包文件很大, 达到了471Kb
      ```

      

    - 实际开发中如何选择

      - 如果是应用开发, 只需要配置preset, 如果要使用es6/7新语法, 使用polyfill
      - 如果是开发UI库, 框架, 使用runtime

4. 编译TypeScript

    - JS的超集 tslang.cn 来自于微软

    - 官方推荐: npm install typescript ts-loader --save-dev

    - 第三方loader: npm install typescript awesome-typescript-loader --save-dev

    - 配置: tsconfig.json

      ```
      ## 常用配置选项
      compilerOptions:告诉编译器常用的配置选项, 比如 允许js 模块化方式指定:commonjs 指定输出路径等
      compilerOptions.module: 模块化方式指定
      compilerOptions.target: 编译之后的文件在什么环境下运行的 (类似将语言编译到什么程度)
      compilerOptions.typeRoots: [
        "./node_modules/@type", // 默认安装npm install @types/lodash时路径
        "./typings/modules",    // 使用typings安装的声明文件路径
      ] 指定types声明文件所在的地址
      include: 给出一系列的文件路径, 表示需要编译的文件
      exclude: 忽略的文件
      allowJs: 是否允许js的语法
      ```

    - 安装声明文件.这样在编译的时候就会给出警告错误, 告诉我们传递的参数类型有错误

      - npm install @types/lodash
      - npm install @types/vue
      - 或者使用typings安装types声明文件, 使用compilerOptions.typeRoots

5. 提取公用代码
    - 减少冗余代码(每一个页面都会存在公共代码, 造成带宽浪费)
    - 提高用户的加载速度(只加载页面所需要的依赖, 其他页面在加载的时候, 公共代码已经加载好了)
    - CommonChunkPlugin (webpack.optimize.CommonChunkPlugin)

    ```js
    // 针对webpack3
    {
      plugins: [
        new webpack.optimize.CommonChunkPlugin({
          name: String | Array, // 表示chunk的名称 ?
          filename: String, // 公用代码打包的文件名称
          minChunks: Number|function|Infinity // 数字表示为需要提取的公用代码出现的次数(最小是多少, 比如出现两次以上就提取到公用代码), Infinity 表示不讲任何的模块打包进去, 函数的话表示自定义逻辑
          chunks: 表示指定提取代码的范围, 需要在哪几个代码快中提取公用代码
          children: 是不是在entry的子模块中 还是在所有模块中查找依赖
          deepChildren
          async: 创建一个异步的公共代码流
        })
      ]
    }
    
    // webpack4
    optimization: {
        splitChunks: {
            chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者),
            minSize: 0, // 30000, // 大于30K会被抽离到公共模块
            minChunks: 2, //  模块出现一次就会被抽离到公共模块中, 如果是1的话, 表示将所有的模块都提走, 针对pageA中, 如果只有自己引用jQuery, 那么会生成jQuery-vendor.js 的打包文件
            maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个,
            maxInitialRequests: 3, // 入口模块最多只能加载3个
            name: true
        }
    }
    ```

    - 场景
        - 单页应用
        - 单页应用 + 第三方依赖
        - 多页应用 + 第三方依赖 + webpack生成代码 (webpack内置函数)
    - 针对单入口的commonChunksPlugin = 并没有将公共部分打包, 只有针对多入口才会

    - 多入口文件的时候
        ```js
        entry: {
          pageA: path.resolve(__dirname, 'src/cmp', 'pageA'),
          pageB: path.resolve(__dirname, 'src/cmp', 'pageB')
          // vendor: ['lodash']
        },
        
        // webpack3
        plugins: [
            new webpack.optimize.CommonPluginsChun({
                name: 'vendor',
                minChunks: Infinity
            })
            // 公共模块打包的名字为vendor, entry中也有vendor, 所以会将webpack生成代码以及lodash打包进vendor中
        ]
        
        // webpack4
        splitChunks: {
              chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者),
              minSize: 30000, // 大于30K会被抽离到公共模块
              // minChunks: 2, //  模块出现两次次就会被抽离到公共模块中
              minChunks: Infinity, // 不需要在任何的地方重复
              maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个,
              maxInitialRequests: 3, // 入口模块最多只能加载3个
              // name: 'common' // 打包出来公共模块的名称
              name: 'vendor' // 打包出来公共模块的名称
        }
        
        // 1. 会将pageA, pageB中 公共使用的模块打包成进common.chunk.js (name:'common'的时候), 公共模块中包括webpack生成的代码 
        
        // 2. lodash只在pageA中使用, 次数为1, 但是minChunks: 2, 所以lodash只会被打包进pageA中
        
        // 3. 在entry中添加 vendor: ['lodash'] 将公共库lodash单独打包, 在webpack4中将其打包进了公共common.chunk中, vendor中只有对lodash的引用
        
        // 4. 如果想将lodash和webpack运行生成时代码以及公共代码打包到一起, minChunks改成Infinity, name:vendor,  将所有生成的文件引用都放到vendor中了
        
        // 5. 保持第三方代码的纯净, 即将第三方代码和webpack分离开, webapck3添加plugins, webpack4添加runtimeChunk配置
            // webpack3
            new webpack.optimize.CommonPluginsChun({
                name: 'manifest',
                minChunks: Infinity
            })
            // 发现vendor和manifest处大部分代码是一样的可以, 可以改成
            new webpack.optimize.CommonPluginsChun({
                names: ['vendor','manifest'],
                minChunks: Infinity
            })

            // webpack4
            runtimeChunk: {
              name: 'manifest'
            },

            // 结果是: 将webpack生成的代码打包到manifest中, 将lodash打包进vendor中, 将引用次数超过两次的打包进vendor中
        ```

6. 代码分割和懒加载
    - 通过代码分割和懒加载, 让用户在尽可能的下载时间内加载想要的页面, 只看一个页面的时候, 下载所有的代码, 带宽浪费;
    - 在webpack中, 代码分割和懒加载是一个概念, webpack会自动分割代码, 然后再把需要的代码加载进来, 不是通过配置来实现的, 通过改变写代码的方式来实现的, 当依赖一个模块的时候, 告诉webpack我们是需要懒加载或者代码切分, 通过两种方式来实现
        - webpack.methods
            - require.ensure() 接收四个参数 
            - 第一个参数dependencies, 加载进来的代码并不会执行, 在callback中引入, 这个时候才会去执行, 第三个参数errorBack,  第四个参数chunkName
            - 如果浏览器不支持promise, 需要添加垫片
            - require.include 只有一个参数, 只引入进来, 但不执行
                - 当两个子模块都引入了第三个模块, 可以将第三个模块放入父模块中, 这样动态加载子模块的时候, 父模块已经有了第三方模块, 不会在多余加载; 比如subPageA, subPageB都引入了moduleA, 但是moduleA不会被打包进父依赖, 所以可以使用include
        - ES2015 loader spec (动态import) stage-3
            - 早起system.import
            - 后来import方式 返回一个Promise
                - import().then
        - webpack import function 通过注释的方式来解决动态的chunkName以及加载模式
            ```js
            import(
                /*webpackChunkName: async-chunk-name*/
                /*webpackMode: lazy*/
                moduleName
            )
            ```
    - 代码分割的场景
        - 分离业务代码和第三方依赖 (提取公共代码中有涉及)
        - 分离业务代码 和 业务公共代码 和 第三方依赖; 相比于上一个,将业务代码拆成两部分
        - 分离首次加载 和 访问后加载的代码 (访问速度优化相关的) - LazyLoad - 提高首屏加载速度

    ```js
    // 0. 单入口pageA, 不做任何的优化 直接引入 subPageA, subPageB, lodash 会发现pageA非常大
    
    // 1. 异步引入, 将lodash打包到vendor中
    require.ensure('lodash', require => {
      const _ = require('lodash')
      _.join([1, 2, 3], 4)
      console.log(_)
    }, 'vendor')
    
    // 2. pageA.js中修改
    if (page === 'subPageA') {
      // require([]) 参数是空数组的话, 里面的require的包还是会被异步打包
      require.ensure(['./subPageA'], require => {
        // 如果不require的话, 那么就不会执行subPageA中的代码块
        const subPageA = require('./subPageA')
        console.log(subPageA)
      }, 'subPageA')
    } else if (page === 'subPageB') {
      require.ensure(['./subPageB'], require => {
        const subPageB = require('./subPageB')
        console.log(subPageB)
      }, 'subPageB')
    }
    // 结果: moduleA分别在打包好的文件 subPageA.chunk.js 和 subPageB.chunk.js中, 公共部分moduleA没有被提取出来
    
    // 3. 单entry有上述公共代码的情况的话, 使用inlcude的情况处理, 将module在父模块pageA.js提前引入, 但是并不运行
    require.include('./moduleA')
    // 结果: moduleA被打包进入了pageA.bundle.js中, 这样就完成了代码分割
    
    
    // --- import 方案 ------------- 
    /*   坑: import 只有在stage-0 或者 syntax-dynamic-import
    	yarn add babel-preset-stage-0 babel-plugin-syntax-dynamic-import --dev
    	.babelrc   { "presets": ["stage-0"], "plugins": ["syntax-dynamic-import"] }
    	上述两种情况只使用一种即可
    */
    // 在import的时候 代码实际上已经执行了
    if (page) {
      import(
        /* webpackChunkName: "subPageA" */
        /* webpackMode: "lazy" */
        './subPageC'
      ).then(subPageC => {
        console.log(subPageC)
      })
    } else {
      import(
        /* webpackChunkName: 'subPageD' */
        /* webpackMode: "lazy" */
        './subPageD'
      )
    }
    ```
    - async 在代码分割中如何使用, 即结合commonChunkPlugin

      ```js
      // webpack.plugin.lazy.cmp.js
      entry: {
          pageA: path.resolve(__dirname, 'src/lazy_cmp', 'pageA'),
          pageB: path.resolve(__dirname, 'src/lazy', 'pageB'),
          vendor: ['lodash']
      }
      
      // webpack3
      plugins: [
      	new wepback.optimize.CommonsChunkPlugin({
         		// async 指定为true表示异步模块, 或者指定为 异步模块提取后的名称
              async: 'async-common',
              children: true, // 表示不仅仅是两个入口页面之间, 而且还是两个页面之间的子依赖中去寻找
              minChunks: 2
          }),
          new wepback.optimize.CommonsChunkPlugin({
          	// lodash打包进入vendor中, manifest是webpack运行时代码
              names: ['vendor', 'manifest'],
              minChunks: Infinity
          })
      ]
      
      // webpack4
      optimization: {
          // webpack runtime 代码
          runtimeChunk: {
            name: 'manifest'
          },
          // 公共模块提取
          splitChunks: {
            chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者),
            minSize: 30000, // 大于30K会被抽离到公共模块
            // minChunks: 2, //  模块出现两次次就会被抽离到公共模块中
            minChunks: Infinity, // 不需要在任何的地方重复
            maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个,
            maxInitialRequests: 3, // 入口模块最多只能加载3个
            name: 'vendor' // 打包出来公共模块的名称
          }
      }
      
      
      // pageA.js
      import _ from 'lodash'
      
      / 1. 这里不再使用include, 因为会和pageA打包到一起, 这里的目的是 将其异步单独提取出来
      // require.include('./moduleA')
      
      const page = 'subPageA' // 在pageB中, 这里page='subPageB', 其余一样
      if (page) {
        import(
          /* webpackChunkName: "subPageA" */
          /* webpackMode: "lazy" */
          './subPageA'
        ).then(subPageA => {
          console.log(subPageA)
        })
      } else {
        import(
          /* webpackChunkName: 'subPageB' */
          /* webpackMode: "lazy" */
          './subPageB'
        )
      }
      
      // 2.  webpack3 结果:  将异步打包结果中subPageA和subPageB中的公共模块moduleA, 单独的提取到了async-common-pageA.chunk.js中
      	这里比较坑的困惑: commonsChunkPlugin参数说的不是很明确, 比如async, children, deepChildren, minChunk, 他们之间是有依赖忽视关系的
      	
      // 3. webpack4 结果: chunks:all, 结果是将多次引用的公共模块moduleA, lodash提取到了vendor.chunk中, 其余的和webpack3一样, 生成打包文件pageA.chunk, pageB.chunk(入口文件), subPageA.chunk, subPageB.chunk(异步单独提取), manifest.chunk(webpack-runtime单独提取)
      ```




7. 处理CSS

   - 每一个模块都有自己的css文件, 在使用的时候将css样式引入

   - 如何在webpack中引入css

     - style-loader 在页面中创建style标签, 标签里面的内容就是css内容

       - style-loader/url
       - style-loader/useable

     - css-loader 如何让js可以import一个css文件, 包装一层, 让js可以引入css文件

       ```
       // index.js
       import './css/base.css'
       
       // webpack.config.style.js
       	{
               test: /\.css$/,
               use: [
                 {
                   loader: 'style-loader'
                 },
                 {
                   loader: 'css-loader'
                 }
               ]
            }
       
       // 将打包后的文件引入到index.html中
       // 1. 结果: 在html中生成了style标签, 将base.css标签中的样式放到了style标签中
       
       
       // 2. 生成link标签的形式 (不过用的比较少) 注意publicPath配置
       use: [
                 {
                   loader: 'style-loader/url'
                   // loader: 'style-loader/useable'
                 },
                 {
                   loader: 'file-loader'
                 }
            ]
       // 结果: style-loader/url 单独生成一份css文件 , 但是引入多个文件的时候, 会生成多个link标签, 会造成越多的网路请求
       
       //3. style-loader/useable
       import base from 'base.css'
       import common from 'common.css'
       var flag = false;
       setInterval(function() {
           if(flag) {
               base.use()
           } else {
               base.ununse()
           }
           flag = !flag;
       }, 2000)
       // base.use() 样式插入到style标签中
       // common.unuse() // 控制样式不被引用
       // 结果: 没过2000ms, 页面中样式循环引用和删除
       
       
       ```

     - StyleLoader 配置

       -  insertAt (插入位置)

       - insertInto(插入到DOM)

       - singleton (是否只使用一个style标签) 当css模块比较多的时候 会有很多css标签

       - transform (转化, 浏览器环境下, 插入页面之前)

         ```
         transform: './src/style/css.transform.js'
         
         // css.transform.js 文件内容
         
         // 该函数并不是在打包的时候执行的,在运行webpack的时候, 是不行执行的
         // 在style-loader 将样式插入到DOM中的时候 执行的, 运行的环境是在浏览器环境下, 可以拿到浏览器参数, window,UA
         
         // 可以根据当前浏览器来对当前的css进行形变
         module.exports = function(css) {
           console.log(css)
           console.log(window.innerWidth)
           // 输出形变以后的css
           if (window.innerWidth >= 768) {
             css = css.replace('yellow', 'dodgerblue')
           } else {
             css = css.replace('yellow', 'orange')
           }
           return css;
         }
         ```

         - 针对每一次在index.js中引入的css文件都会执行上面的代码

     - CssLoader 配置参数

       - alias 解析的别名 将引入css的路径映射到其他地方
       - importLoader 取决于css处理后面是不是还有其他的loader (sass会使用到 @import)
       - minimize 是否压缩
       - modules 是否启用css-modules
         - 打包出来的样式class 都变成一段随机字符串

   - CSS modules

     - :local  给定一个本地的样式 局部的样式

     - :global 给定一个全局样式

     - compose 继承一个样式

     - compose ... from path 引入一个样式 (尽量将composes放在前面, 这样可以控制引入顺序, 样式不会被覆盖)

       ```js
       // base.css
       .box {
         composes: big-box from './common.css';
         height: 200px;
         width: 100px;
         border-radius: 4px;
         background: #696969;
       }
       ```

       

     - localIdentName: '\[[path\]]\[name\]_\[local\]--\[hash:base64:5\]' 控制生成的class类名

       - path代表引用css路径 name表示文件名称 local本地样式名称 

   - 配置less/sass

     - npm install less-loader less --save-dev

     - npm install sass-loader node-sass --save-dev

       ```json
       .header {
         composes: font from './header.less'
       }
       ```

   - 提取css代码  - 提取公共代码 做缓存 (不提取的话, 将css代码打包到了js文件中)

     - extract-loader

     - ExtractTextWebpackPlugin
       - npm install extract-text-webpack-plugin --save-dev
       ```js
       // webpack3
       var ExtractTextWebpackPlugin = require('ExtractTextWebpackPlugin)
       
       module: {
           rules: [
       
               {
                   test: /\.less$/,
                   use: ExtractTextWebpackPlugin.extract({
                       fallback: {
                           // 告诉webpack, 当不提取的时候, 使用何种方式将其加载到页面中
                           loader: 'style-loader,
                           options: {
                               singleton: true,
                               // transform: ''
                           }
                       },
                       use: [
                           {loader: 'css-loader'}
                           {loader: 'less-loader'}
                       ], // 定义我们继续处理的loader
                   })
               }
           ]
       },
       plugins: [
           new ExtractTextWebpackPlugin({
               filename: '[name].min.css', // 提取出来的css的名称
               // 将css-loader的option中的minimize打开
               
               // allChunks 给插件指定一个范围, 指定提取css的范围
               // 1. 设置为true 表示所有的引用的css文件都提取
               // 2. 设置为false, 默认, 只会提取初始化的css(异步加载不认为是初始化)
               allChunks:false, 
           })
       ]
       // webpack3 结果: index.bundle.js app.min.css 但是打开index.html 并没有插入进去
       
       // webpack4 
       {
           test: /\.less$/,
           use: [
             MiniCssExtractPlugin.loader,
             {
               loader: 'css-loader',
               // loader: 'file-loader'
               options: {
                 minimize: process.env.NODE_ENV === 'production',
                 modules: true,
                 localIdentName: '[path]_[name]_[local]--[hash:base64:5]'
               }
             },
             {
               loader: 'less-loader'
             }
           ]
       }
       
        plugins: [
           new MiniCssExtractPlugin({
             // Options similar to the same options in webpackOptions.output
             // both options are optional
             filename: '[name].css',
             chunkFilename: '[id].css'
           })
       ]
       ```

     - 异步引入a.js文件, 在a.js文件中引入a.less

       1. 针对allChunks为false的情况

          - webpack3: 生成a.bundle.js文件, css文件被当成js的一个模块被打包处理, 将css放在js文件里面, 一起被提取; css代码切分的一种方式, 将初始化加载和动态加载区分开; 借助动态加载的代码区分, 也是css-in-js的一个概念
          - weboack4: 生成moduleA.chunk.js 和moduleA.chunk.css文件, 在index.bundle.js 包括了对于modulA.js和module.css文件的引用

       2. webpack4使用splitChunks配置

          ```js
          optimization: {
            splitChunks: {
              cacheGroups: {
                styles: {            
                  name: 'styles',
                  test: /\.scss|css$/,
                  chunks: 'all',    // merge all the css chunk to one file
                  enforce: true
                }
              }
            }
          }
          ```

          - 结果: 生成index.bundle.js style.chunk.js style.chunk.css 将所有的样式文件都打包进了style.chunk.css文件中, 但是需要手动添加到项目htm中
          - question: 为什么这里不会运行? npm run extract

   - PostCss (Autoprefixer CSS-nano CSS-next)

     > A tool for transforming Css With Javascript 用js去转化css的一个工具

     -  联系到上一节中的css.transform.js, 但是时机是不一样的, PostCss是打包的时期, css.transform是浏览器插入到style标签中的时候

     - postcss的强大, 理解成为一个处理css的工具

       - 安装 npm install postcss postcss-loader autoprefixer cssnano postcss-cssnext --save-dev

       - autoprefixer: 帮助加上浏览器前缀

       - css-nano 帮助我们优化压缩css, 在postcss可以当做插件使用, css-loader就是用的css-nano做的压缩

       - css-next 使用未来的css新语法

         - css variables
         - custom selectors 自定义选择器
         - calc() 动态计算 ...

         ```
         {
         	loader: 'postcss-loader',
             options: {
             	// require进来的插件给postcss使用的
             	ident: 'postcss', // 表明接下来的插件是给postcss使用的
             	plugins: [
             		// require('autoprefixer')(),
             		// 两个一起用cssnext 会给出警告, 提示已经包含autoprefixer
             		require('postcss-cssnext')()
             	]
             }
         },
         ```

         

     - 一旦涉及到浏览器兼容性问题的时候, 一定会有针对的浏览器兼容问题, 使用browserlist, 让所有的插件都公用一份browserlist

       - 可以放在package.json里面
       - .browserlistrc 存入对浏览器的要求 

     - postcss-import 插件 将@import的文件内容直接放入到当前的css文件中, 但是存过来之后要考虑相对文件路径的变化, 需要配合postcss-url来使用

     - postcss-assets 在后面资源处理讲解

       

   - **Tree Shaking** (摇动树?)

     - webpack2.0新引进,  **基本概念**:引申到项目, 在项目中如果有代码不再用到, 或者说是从来没有用到过, 那么项目如果在上线的时候, 如果代码中还存在, 势必造成资源的浪费; 

     - 使用场景

       - 常规优化(体积更小, 加载时间更快)
       - 引入第三方库的某一个功能(lodash) 只用其中的一两个功能, 但是打包整个包造成了浪费

     - TreeShaking 分为两种

       - 针对项目中的js文件, JS TreeShaking (将没有用到的方法给去掉)

         - 在webpack2之后 webpack会将没有用到的文件标识出来, 借助插件的帮助webpack.optimize.uglifyJs 将废弃的代码移除掉 [webpack4-demo](https://github.com/webpack/webpack/tree/master/examples/side-effects)

         ```
         // webpack 3
         plugins: [
         	// 将没有用到的文件删除
             new webpack.optimize.UglifyJsPlugin({})
         ]
         
         // webpack3 针对lodash
         /*
            import func from 'lodash/set'
            babel-plugin-lodash --save-dev
         */
         
         // webpack4
         optimization: {
         	minimize:true
         }
         
         // 同时需要修改babelrc中添加一层配置, 来开启无用的模块检测, 但是在webpack4中无效
         {
         	modules:false
         }
         // 主要通过在package.json文件中设置sideEffects: false来告诉编译器该项目或模块是pure的，可以进行无用模块删除。
         
         // 开发环境下, 试过很多次, 都无法进行treeShaking
         
         // 生产模式下, 自动识别为TreeShaking
         ```

         

       - 针对项目中的css文件 CSS TreeShaking (DOM节点有各种各样的id, class等属性), 有些样式没有被匹配不上, 就不会被打包到样式中去

   - TreeShaking 浅析

     - webpack 本身并不会删除任何多余的代码，删除无用代码的工作是 Uglify做的。webpack 做的事情是 unused harmony exports 的标记，也就是他会分析你的代码，把不用的 exports 删除，但是他不会删除全部的代码，只是把 exports 关键字删除了，变量的声明并没有删除。

     - 上面是一个模块，如果我们这样引用 `import { x } from './a.js'`，那么webpack会进行 `unused harmony exports` 分析，他会发现你的 `y` 函数根本没用到，于是把y的 `exports` 声明去掉了，留下了一个无用的 `y` 函数声明。于是输出这样的代码： 

     - 如果我们启用 `Uglify` 插件，由于y 函数没有被任何人使用，所以 Uglify 会把它直接删掉。 

     - 简单总结:   这就是webpack 在`tree-shaking` 中扮演的角色：他会进行无用导出的分析，并把对应的 export 删除，但变量本身的声明并不会被删除。删除代码的操作是交给 uglify来做的。 

     - **原理浅析**:

       - webpack 的这个特性仅限于 `ES6` 模块语法，如果你用了 nodejs 的模块，即 `module.exports`，那么webpack 将 不会做任何优化。所以如果你使用了 `babel`，请一定不要把 ES6 modules 编译掉，否则 tree-shaking 将没有效果。 

       - 为什么会这样呢，因为 `ES6 Modules` 是静态的，而 CMD 是动态的 

       - > 1. ES6 Modules 只能作为模块顶层的语句出现，不能出现在 function 里面或是 if 里面。
         > 2. import 的模块名只能是字符串常量。
         > 3. 不管 import 的语句出现的位置在哪里，在模块初始化的时候所有的 import 都必须已经导入完成。换句话说，ES6 imports are hoisted。
         > 4. import binding 是 immutable 的，类似 const。比如说你不能 import { a } from './a' 然后给 a 赋值个其他什么东西。

         正因为这些特性，使得静态分析依赖变得很靠谱。否则如果无法静态分析，自然无法在编译阶段进行tree shaking。

       - 运行代码:  webpack3-commonChunkPlugin 

         - npm run treeshaking
         - 添加uglifyJsPlugin插件, 查看压缩之后的代码

     - TreeShaking 处理 ts

       - 分析代码:**npm run tstreeshaking** sayWorld居然还是存在！！！怎么回事，为什么没有被触发tree-shaking优化？ 

       - 因为tsc编译后的代码为es5 ，而正因如此，tsc默认使用了commonJS的规范来加载模块，因此并没有触发tree-shaking 

     - TreeShaking 副作用

       - **TreeShaking注意点:**显而易见的是，webpack 通过静态语法分析，找出了不用的 export ，把他们改成 free variable，而 Uglify同样也通过静态语法分析，找出了不用的变量声明，直接把他们删了。并不是直接流氓式的删除, 这点可以放心
       - 但是函数副作用是非常复杂的，有没有可能被删除的 `y` 函数其实是有副作用的？肯定是存在的，比如我们在 `x` 中引用 一个对象的属性，然后设置 `getter` ，那么读取属性就会报错, 所以这里是我们需要注意的地方  (**webpack4-treeshaking代码分析**)

## webpack 打包原理解析

1. webpack只是一个打包模块的机制，只是把依赖的模块转化成可以代表这些包的静态文件。 

2. webpack把任何形式的资源都视作模块 - loader机制, 不同的资源采用不同的loader进行转换。

3. CMD、AMD 、import、css 、等都有相应的loader去进行转换。那为什么我们平时写的es6的模块机制，不用增加import的loader呢。因为我们使用了babel把import转换成了require。并且**Webpack 2 将增加对 ES6 模块的原生支持并且混用 ES6、AMD 和 CommonJS 模块**。这意味着 Webpack 现在可以识别 import 和 export 了，不需要先把它们转换成 CommonJS 模块的格式

4. #### loader原理

   在解析对于文件，会自动去调用响应的loader**loader 本质上是一个函数，输入参数是一个字符串，输出参数也是一个字符串。当然，输出的参数会被当成是 JS 代码，从而被 esprima 解析成 AST，触发进一步的依赖解析。**webpack会按照从右到左的顺序执行loader

5. ### shell 与 config 解析

   1. 每次在命令行输入 webpack 后，操作系统都会去调用 ./node_modules/.bin/webpack 这个 shell 脚本。

      这个脚本会去调用 ./node_modules/webpack/bin/webpack.js 并追加输入的参数，
      如 -p , -w 。(图中 webpack.js 是 webpack 的启动文件，而 $@ 是后缀参数)

   2. optimist 分析参数并以键值对的形式把参数对象保存在 optimist.argv 中

   3. config 合并与插件加载

      1. 在加载插件之前，webpack 将 webpack.config.js 中的各个配置项拷贝到 options 对象中，并加载用户配置在 webpack.config.js 的 plugins 。接着 optimist.argv 会被传入到 `./node_modules/webpack/bin/convert-argv.js` 中，通过判断 argv 中参数的值决定是否去加载对应插件。(至于 webpack 插件运行机制，在之后的运行机制篇会提到) 

6. ### 编译与构建流程

   1. 在加载配置文件和 shell 后缀参数申明的插件，并传入构建信息 options 对象后，开始整个 webpack 打包最漫长的一步。而这个时候，真正的 webpack 对象才刚被初始化，具体的初始化逻辑在 lib/webpack.js 中
   2. webpack 的实际入口是 Compiler 中的 run 方法，run 一旦执行后，就开始了编译和构建流程 ，其中有几个比较关键的 webpack 事件节点。((可以简单的看成是也该生命周期)

7. 核心对象Compilation

   1. compiler.run 后首先会触发 compile ，这一步会构建出 Compilation 对象 
   2. 这个对象有两个作用，一是负责组织整个打包过程，包含了每个构建环节及输出环节所对应的方法，可以从图中看到比较关键的步骤，如 addEntry() , _addModuleChain() , buildModule() , seal() , createChunkAssets() (在每一个节点都会触发 webpack 事件去调用各插件)。二是该对象内部存放着所有 module ，chunk，生成的 asset 以及用来生成最后打包文件的 template 的信息。

8. 编译与构建主流程

   1. 上一步主要是构建出Compilation 对象 , 得到所有的资源信息以及输出对应环节方法
   2.  在创建 module 之前，Compiler 会触发 make，并调用上一步创建的对象 `Compilation.addEntry` 方法，通过 options 对象(第一步中收集的option)的 entry 字段找到我们的入口js文件。之后，在 addEntry 中调用私有方法 `_addModuleChain` ，这个方法主要做了两件事情。一是根据模块的类型获取对应的模块工厂并创建模块，二是构建模块。 
   3.  而构建模块作为最耗时的一步，又可细化为三步： 
      - 调用各 loader 处理模块之间的依赖 
        - webpack 提供的一个很大的便利就是能将所有资源都整合成模块，不仅仅是 js 文件。所以需要一些 loader ，比如 `url-loader` ， `jsx-loader` ， `css-loader` 等等来让我们可以直接在源文件中引用各类资源。webpack 调用 `doBuild()` ，对每一个 require() 用对应的 loader 进行加工，最后生成一个 js module。 
        - 这里简单理解就是: 将各种类型的文件处理成为js module, 让webpack可以处理
      - 调用 [acorn](https://github.com/ternjs/acorn) 解析经 loader 处理后的源文件生成抽象语法树 AST 
        - A tiny, fast JavaScript parser, written completely in JavaScript. 
        - 语言解析器来获取整一个 AST（abstract syntax tree）。 
      - 遍历 AST，构建该模块所依赖的模块 
        - 对于当前模块，或许存在着多个依赖模块。当前模块会开辟一个依赖模块的数组，在遍历 AST 时，将 require() 中的模块通过 `addDependency()` 添加到数组中。当前模块构建完成后，webpack 调用 `processModuleDependencies` 开始递归处理依赖的 module，接着就会重复之前的构建步骤。 
        - 查找依赖项, 理解为: 从入口文件开始, 每一个module依赖了哪些模块, 把这些依赖放在addDependency数组中

9. 构建细节

   - module 是 webpack 构建的核心实体，也是所有 module 的 父类，它有几种不同子类：`NormalModule` , `MultiModule` , `ContextModule` , `DelegatedModule` 等。但这些核心实体都是在构建中都会去调用对应方法，也就是 `build()` 。 
   	 build方法:	1. 初始化module信息，如context,id,chunks,dependencies等    2. 构建计算时间等等
   - 对于每一个 module ，它都会有这样一个构建方法。它还包括了从构建到输出的一系列的有关 module 生命周期的函数，我们通过 module 父类类图其子类类图(这里以 NormalModule 为例)来观察其真实形态 
   - 可以看到无论是构建流程，处理依赖流程，包括后面的封装流程都是与 module 密切相关的。

10. ## 打包输出

        1. 在所有模块及其依赖模块 build 完成后，webpack 会监听 `seal` 事件调用各插件对构建后的结果进行封装，要逐次对每个 module 和 chunk 进行整理，生成编译后的源码，合并，拆分，生成 hash 。 同时这是我们在开发时进行代码优化和功能添加的关键环节。 
        2. 生成最终的assets
      - 在封装过程中，webpack 会调用 Compilation 中的 `createChunkAssets` 方法进行打包后代码的生成。 createChunkAssets 流程如下： 
      - **不同的template:** 从上图可以看出通过判断是入口 js 还是需要异步加载的 js 来选择不同的模板对象进行封装，入口 js 会采用 webpack 事件流的 render 事件来触发 `Template类` 中的 `renderChunkModules()` (异步加载的 js 会调用 chunkTemplate 中的 render 方法)。
      - 在 webpack 中有四个 Template 的子类，分别是 `MainTemplate.js` ， `ChunkTemplate.js`，`ModuleTemplate.js` ， `HotUpdateChunkTemplate.js` ，前两者先前已大致有介绍，而 ModuleTemplate 是对所有模块进行一个代码生成，HotUpdateChunkTemplate 是对热替换模块的一个处理。 
      - 模块封装:  模块在封装的时候和它在构建时一样，都是调用各模块类中的方法。封装通过调用 `module.source()` 来进行各操作，比如说 require() 的替换, moduleId的替换。 
      -  生成assets:  各模块进行 doBlock 后，把 module 的最终代码循环添加到 sourcemap 中。一个 sourcemap 对应着一个 asset 对象，该对象保存了单个文件的文件名( name )和最终代码( value )。 

11. **所有的模块都是js模块**

    1.  webpack 只支持JS模块，所有其他类型的模块，比如图片，css等，都需要通过对应的loader转成JS模块。所以在webpack中无论任何类型的资源，本质上都被当成JS模块处理。 

12. **所有的loader都是一个管道** 

    1. 在webpack中，可以把一个loader看做是一个数据管道，进口是 一个字符串，然后经过加工，输出另一个字符串，多个loader可以像水管一样串联起来，很像java中的stream流。 

    2. 很多人都说webpack复杂，难以理解，很大一部分原因是webpack是基于配置的，可配置项很多，并且每个参数传入的形式多种多样（可以是字符串、数组、对象、函数。。。），文档介绍也比较模糊，这么多的配置项各种排列组合，想想都复杂。而gulp基于流的方式来处理文件，无论从理解上，还是功能上都很容易上手。 

    3. 上面简单对比了webpack与gulp配置的区别，当然这样比较是有问题的，gulp并不能进行模块化的处理。这里主要是想告诉大家使用gulp的时候，我们能明确的知道js文件是先进行babel转译，然后进行压缩混淆，最后输出文件。而webpack对我们来说完全是个黑盒，完全不知道plugins的执行顺序。正是因为这些原因，我们常常在使用webpack时有一些不安，不知道这个配置到底有没有生效，我要按某种方式打包到底该如何配置？

       为了解决上面的问题，webpack4引入了`零配置`的概念, 能方便我们不少

    4. loader的优点 *2

13. 最简单的babel-loader如何指定使用自己的loader呢 

    1. 直接在 `webpack` config 文件里面加一个 `resolveLoader` 的配置即可，我们这里把 `bable-loader` 指定为自己写的。 
    2. 要实现一个babel-loader,  很显然我们需要使用babel-core来编译代码 (这里就是为什么我们在使用babel-loader的时候, 要安装babel-core  babel-loader  babel-presets) core的一个原因
    3. 查一下 [babel-core](https://babeljs.io/docs/core-packages/) 文档，可以调用 `babel.transform` API来编译代码。再加上一些 `presets` 的设置，我们可以把上面的代码做一下改造如下： 
    4. Babel-core 的API用法不在这里详细解释，有兴趣的可以直接去看官方的文档。我们这里做了一个很简单的转换，就是把 接收到的 `source` 源码，用 `babel` 编译一下，然后返回编译后的代码。 

14. 支持一下sourceMap

    1. 如果需要支持 sourcemap，显然需要把 `babel-core` 产生的 `sourcemap` 传给 `webpack`。之前因为只返回编译后的代码，所以我们直接返回了字符串，如果需要同时返回编译的代码和sourcemap，我们需要这个接口 [this.callback](https://webpack.js.org/api/loaders/#this-callback)，(不要问我怎么知道的) 因为官方文档上是这么说的 
    2. 官方babel-loader 显然他的代码比我这边的代码多很多，他写了那么多，其实主要是增加了 Cache，以及增加了对异常的处理, 优化, 环境适配等

15. 支持一下jsx

    1. 我们是使用React写的组件，那么同样可以通过 `babel-loader` 来编译。关于如何编译JSX，babel官网这里做了很详细的文档 [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/)
    2. 简单来说，就是 `babel-core` 本身虽然不支持 `jsx`，会报语法错误，但是我们可以通过加载一个插件就能支持 jsx
    3. react 因为用的JSX，而jsx 因为全部编译成了JS 所以它的loader很简单。但是 Vue 的组件并不是可以直接就全部编译成JS，而是包括了 html,JS,CSS三部分，所以 `vue-loader` 相对来说就复杂很多了。  这里不探讨有兴趣可以下去分析

16. Style-Loader 和 Css-Loader

    1. **Style-Loader和CSS-Loader的工作原理** CSS代码会先被 `css-loader` 处理一次，然后再交给 `style-loader` 进行处理。那么这两步分别是做什么呢？ 
       1. css-loader 的作用是处理css中的 `@import` 和 `url` 这样的外部资源
       2. style-loader 的作用是把样式插入到 DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的 innerHTML 里
    2. 通过图可以看到一个loader只做一件事。我们对图片等资源的处理和把样式插入到DOM分为两个任务，这样每个loader做的事情就比较简单，而且可以通过不同的组合实现更高级的功能。 

17. Style-LOader原理解析

    1. `style-loader` 的主要作用就是把 CSS 代码插入DOM中 
    2. pitch解释
       1. 正常情况下，我们会用 default 方法，那么这里我们为什么用一个 pitch 方法呢？简单的解释一下就是，默认的loader都是从右向左执行，用 pitching loader 是从左到右执行的。 
       2. 我们为什么用 pitching loader呢？因为我们要把CSS文件的内容插入DOM，所以我们要获取CSS文件的样式。**如果按照默认的从右往左的顺序，我们使用 css-loader, 它返回的结果是一段JS字符串，这样我们就取不到CSS样式了。**为了获取CSS样式，我们会在 `style-loader` 中直接通过require来获取，这样返回的JS就不是字符串而是一段代码了。**也就是我们是先执行`style-loader`，在它里面再执行 `css-loader`。** **同样的字符串，但是在默认模式下是当字符串传入的，在pitching模式下是当代码运行的，就是这个区别。**
       3. 也就是，我们处理CSS的时候，其实是 styled-loader先执行了，它里面会调用 css-loader 来拿到CSS的内容，拿到的内容当然是经过css-loader 编译过的。 style-loader此时从css-loader获取到的是JSObject, 可以执行的js对象, 从这个对象中获取到样式
       4. *需要提的一点是，其实 css-loader 返回的也不是css的内容，而是一个对象，不过他的 toString() 方法会直接返回css的样式内容，那么为什么是这样的呢，因为这个是 css-loader 返回的结果*
       5. **addStyle做了什么** 可以直接读 [style-loader](https://github.com/webpack-contrib/style-loader) 的源码，其实 addStyle 做的核心的事情就是在head中插入了一个 style标签，并把 CSS 内容写入这个标签中。 

18.  代码分割个懒加载



## 资源文件的处理

1. 文件的处理 - 图片处理
   - css中引入的图片 file-loader
   - 优化角度: 自动合成雪碧图 postcss-sprites
     - 针对retina屏幕的处理 给potcss-sprites 添加配置 retina:true 即可

     - 同时修改图片文件 img-name@2x.png 告诉loader是需要处理的

     - 同时需要就空间dom设置的宽高缩小一倍

       ```
       {
                   loader: 'postcss-loader',
                   options: {
                     // require进来的插件给postcss使用的
                     ident: 'postcss', // 表明接下来的插件是给postcss使用的
                     plugins: [
                       // require('autoprefixer')(),
                       require('postcss-sprites')({
                       // 合成图片的路径
                         spritePath: 'dist/filedeal/assets/imgs/sprites/',
                         // retina: true, 让postcss帮助我们处理@2x屏幕的大小
                         // 相应的位置元素大小必须是原始的一半
                       }), // 合成精灵图
                       require('postcss-cssnext')()
                     ]
                   }
       },
       ```

   - 压缩图片 img-loader
   - Base64编码 url-loader

2. 文件处理- 字体文件 

   ```js
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
   }
   ```

   ```less
   @font-face {
     font-family: "iconfont";
     src: url('../assets/fonts/iconfont.eot?t=1531054753224');
     /* IE9*/
     src: url('../assets/fonts/iconfont.eot?t=1531054753224#iefix') format('embedded-opentype'), /* IE6-IE8 */
     url('../assets/fonts/iconfont.svg?t=1531054753224#iconfont') format('svg');
     /* iOS 4.1- */
   }
   
   .iconfont {
     font-family: "iconfont" !important;
     font-size: 16px;
     font-style: normal;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
   }
   
   .icon-ke:before {
     content: "\e604";
   }
   
   .icon-fudao:before {
     content: "\e605";
   }
   ```

   

3. 处理第三方库

   1. 第三方的库在远程的cdn上

   2. 在自己的项目下管理(通用的模块, 但是不需要每次都去import)

   3. 上述可以通过插件的方式实现webpack.providePlugin, 在模块中注入我们需要的变量json, value就是模块的名称, 在使用的时候就是require

      ```js
      // 1. 针对使用线上cdn的情况
      
      // 在plugins数组中
      new webpack.ProvidePlugin({ // npm install jquery
            $: 'jquery' // key表示我们使用的时候的名称 $('div').addClass('new')
      })
      
      // 使用的时候, 不需要import 直接使用变量即可
      $('div').addClass('provide-class')
      
      // 2. 针对使用本地文件的形式
      new webpack.ProvidePlugin({ // npm install jquery
         // 这里的模块value必须和上面定义的alias中的key一致
         React: 'react',
         ReactDOM: 'react-dom'
      })
      
      resolve: {
          // 告诉webpack, 如果在node_modules中找不到的时候, 去哪里找模块
          alias: {
            // $表示只是将这一个ReactDOM关键字解析到某一个目录的文件下, 而不是解析到一个目录下
            react$: path.resolve(__dirname, 'src/filedeal/libs/react.development.js'),
            'react-dom$': path.resolve(__dirname, 'src/filedeal/libs/react.dom.development.js')
          }
       },
      ```

      

      4. imports-loader, 通过options传参, 通过test匹配到模块

            1. 下面代码的意思就是将 $:jquery 注入到app.js文件当中

         ```js
         {
             test: path.resolve(__dirname, 'src/app.js'),
             use: [
                    {
                       loader: 'imports-loader',
                       options: {
                           // value会被解析, 从node_modules或者是从alias
                           $: 'jquery'
                       }
                    }
             ]
         }
         ```

         

      5. window上挂载(比较野蛮, 调试的时候可以)

      6. 通过ProvidePlugin和 import直接引入区别

         1. import $ from 'jquery' 引入之后，无论你在代码中是否使用jquery, 打包后, 都会打进去, 这样其实产生大量的冗余js

         2. Provideplugin, 只有你在使用到此库, 才会打包 

         3. 提取第三方库(或者想单独提出来的)js库, 增加一个optimization配置

            ```js
            // 在webpack3.x版本之前：使用new webpack.optimize.CommonsChunkPlugin现在已经不支持
            new webpack.optimize.CommonsChunkPlugin({
                name:'jquery'
            })
            ```

4. 生成html

   1. 自动生成html(将配对的css, js引入) HtmlWebpackPlugin

      - template 模板名称
      - filename 指定文件名
      - minify 指定生成的html文件是否压缩
      - chunks 指定哪些chunk插入到html (多页面程序, a,b页面, b页面就不需要插入a页面的chunk代码 )
      - inject script标签插入的位置(body, head, false)

      ```js
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/html/index.html',
          // inject: 'body', // 默认脚本插入在body尾部, 样式head尾部
          // chunks: [] 不指定chunks会将上面所有打包的chunk嵌入到html中, 针对多页面可以配置该选项
      })
      ```

5. HTML中引入图片 - html-loader

   1. attrs: [img:src] 每一项表示一个规则, 左边标识标签, 右边是属性; 让webpack来打包

   ```
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
   }
   
   <img src="./assets/imgs/banner_2.png" data-src="./assets/imgs/banner_2.png" alt="html-loader 打包"> <!-- 打包后在html中查看是查看不到的-->
   
   <img src="${require('./assets/imgs/banner_1.png')}" alt="">
   ```

   

6. 配合优化

   1. 场景优化(项目模板中对于图片的引用)

   2. 提取公共代码(manifest运行时代码)

      - 提前载入webpack加载代码 inline-manifest-webpack-plugin 将webpack生成的代码插入到html中 ([ inline-chunk-manifest-html-webpack-plugin](https://github.com/jouni-kantola/inline-chunk-manifest-html-webpack-plugin))
      - html-webpack-inline-chunk-plugin 选择各种各样的chunk, 将其插入到html中(*)

      ```js
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/htmlplugin/index.html',
          // inject: 'body', // 默认脚本插入在body尾部, 样式head尾部
          // chunks: ['index', 'runtime'], // 不指定chunks会将上面所有打包的chunk嵌入到html中 去掉这个, 避免和上面的HtmlInlineChunkPlugin冲突
          minify: {
            // 借助了html-minify 去压缩html
            collapseWhitespace: true // 压缩空格(换行符删除)
          }
      }),
          
      // 注意最好放在HtmlWebpackPlugin后面, 同时去掉该插件的chunks选项
      new HtmlInlineChunkPlugin({
        //希望插入到html中的chunk名称 直接将其嵌入到html的标签script中, 不是在src中, 减少网络请求
        inlineChunks: ['manifest']
      })
      ```

      - webpack4中如何将chunk嵌入到script内联中

           ```js
           optimization: {
               runtimeChunk: {
                 name: 'runtime'
               },
           }

           plugins: [
               new InlineManifestWebpackPlugin('runtime')
           ]
           ```



# 第二节: 搭建开发环境

## Webpack Watch Mode

1.  不会产生一个web服务器, 只是监听文件的变化 webpack --watch (webpack -w)

2. CleanWebpackPlugin 打包之前清除之前打包的文件

   ````
   // 每次打包都需要清除的目录
   plugins: [
     	new CleanWebpackPlugin(['dist/watchmode'])   
   ]
   ````

   

3. webpack --watch --progress --color --display-reasons --config webpack.dev.watchmode.js 



##  WebPack DevServer

1. 文件变化的时候, 网页自动更新, 热加载机制; 或者启动服务的时候自动打开浏览器; 做一些远程接口的请求, 代理等

2. live-reloading 文件发生变化的时候, 自动刷新
   1. 不会出现打包的文件: 文件在dist是不存在的, 是在内存中 -- 只是帮助我们启动一个开发服务器, 做本地调试与开发

3. 路径重定向: 网站中链接的地址配置的是线上的, 但是本地是html的地址, 就需要路径的重定向了, 将本地的html路径切换成线上的同样的路径

4. 支持HTTPS

5. 浏览器中显示编译的错误

6. 接口代理(localhost请求远端接口, 存在跨域, 所以可以使用proxy)

7. 模块热更新(live-reloading不一样, 不刷新浏览器的情况下, 更新代码, 局部更新)

8. 如何配置devServer字段

   1. inline设定是否使用iframe或者指定inline的方式去执行devServer

   2. contentBase 提供内容路径 (内容是静态的就需要指定, 编译的内容在内存中, 直接就可以访问到), 不指定就是当前的publicPath

   3. port指定端口

      1. historyApiFallback html5 history指定fallback规则,. 访问路径不会导致404. 让页面很方便做服务端渲染

      ```
      const devServer = {
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
          }
        },
      }
      ```

      

   4. https 证书

   5. proxy指定远程接口代理 集成http-proxy-middleware

      - target: 指定代理的地址
      - changeOrigin: 改变源DOM的url (虚拟的主机上比较重要, 默认是false), 调试的时候搞成true
      - headers 增加http请求的头部 (比如携带自己的cookie, UA等)
      - logLevel 帮助调试 在terminal中显示代理的情况
      - pathRewrite 重定向一个接口的请求, 远程是一个很复杂的地址, 可以rewrite成为一个简单的地址

      ```
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
                cookie: '登录辅导的cookie, 在cookie没有过期的情况下'
              }
            },
            '/': {
              target: 'https://cnodejs.org', // https会表示证书无效
              changeOrigin: true, // 如果此项不设置, 那么请求就会报错
              pathRewrite: {
                '^/topics': '/api/v1/topics'
              }
            }
          }
      ```

      

   6. hot打开, 支持模块热更新(在某个事件内,  将所需要替换的代码替换掉, 提供一个钩子, 在钩子触发的时候, 进行一些代码替换的操作)

      1. 在浏览器不刷新的情况下更新前端的代码
      2. 优点: (官方总结)
         - 保持应用的数据状态(组件的状态, 请求数据)
         - 节省调试时间
         - 样式调试很快
      3. devServer已经集成该功能, 
         - hot:true
         - 同时webpack.HotModuleReplacementPlugin
         - 清晰查看模块的相对路径webpack.NamedModulesPlugin
         - 需要写一些代码, 通过module.hot, module.hot.accept(dep, depCallback)
           - 在更改样式的时候, style-loader会处理热更新所需要的操作, 在不写module也会自动更新
           - js - React, Vue都有一些相关的loader, 会帮助进行相关代码的插入, 很自然的处理热更新
           - 原生js: 需要写一些代码支持热更新
           - 还有一些其他的API, module.hot.decline([]) 等, 有兴趣可以去官网上看下
         - 需要注意的是: 如果使用MiniCssExtractPlugin, 在修改样式的时候, 不会自动刷新, 需要自己去主动刷新浏览器, 因为这里将css样式单独提取出来成为一个文件

   7. openpage 指定devServer最先打开的是哪一个页面

   8. lazy 让webpack在刚开始启动的时候打包任何东西, 当访问某些内容的时候才去打包编译该页面依赖, 在多页面应用中应该非常的有用, 当同时打开20多个页面的时候, webpack打包的时候非常的慢, 但是只访问一个的时候,   lazy打包就会快很多了

   9. overlay遮罩, 提供一个错误提示, 在打开的页面中打开一个遮罩, 在遮罩中给出编译错误的提示 (在页面中直接查看错误, 不用再命令行中查看)

9. 开启SourceMap调试

   1. 很多代码都是转化过的, 用typescipt, es6, 和浏览器中的代码不是一致的, 经过编译后的调试非常困难
   2. sourceMap 将生成的代码和原始代码做一个映射
   3. 开启devTool 值有七个, 每一种的使用场景和打包速度都是不一样的 
      1. 开发环境下有四个
         - eval
         - eval-source-map
         - cheap-eval-source-map
         - cheap-module-eval-source-map
      2. 开发环境下有三个- 用于开发调试, 线上bug
         - source-map
         - hidden-source-map
         - nosource-source-map
      3. css调试的时候 还需要开启css-loader.option.sourcemap, less-loader.option.sourcemap等
         - 如果看不到行号和详情的话, 去掉singleton:true 选项设置 (singleton:true将引用的css放在一个style标签下)
      4. 最重要的是开发的时候如何选择: 
         1. 讲究重新编译的速度
         2. 指向代码文件名称和行数 方便调试
         3.  开发的时候选择: cheap-module-source-map 一点损耗性能, 但是能有提示信息, 虽然刚开始的时候编译的时候可能会慢一些, 但是在此编译的时候会比较快
         4. 如果是比较清晰的数据的话, 可以采用source-map
   4. 插件的形式 webpack.SourceMapDevToolPlugin. webpack.EvalSourceMapDevToolPlugin 更加灵活

10. `ESLint检查代码格式` 在代码修改的时候, 检查我们的代码风格

    1.  使编译不通过, 必须修改为标准规范webpack才会编译成功
    2. 安装eslint eslint-loader eslint-plugin-html(在html script标签中使用js的时候检测) eslint-friendly-formatter 报错的时候输出的格式控制 (错误和警告的输出格式)
    3. 配置eslint
       1. Javascript Standard Style
       2. eslint-config-standard
       3. eslint-plugin-promise
       4. eslint-plugin-standard
       5. eslint-plugin-import
       6. eslint-plugin-node
       7. 当然我们的IMweb eslint-config-imweb
    4. eslint-loader
       1. options.failOnWarning:true 当代码和规则有警告的话, 就不会通过编译
       2. options.failOnError:true
       3. formmater 设置第三方友好提示的formmater
       4. options.outputReport 输出代码检查的报告
       5. 在浏览器上看到代码风格检查, 可以设置devServer.overlay:true

11. 开发环境和生产环境的区分

    1. 开发环境 (模块热更新, sourceMap, 接口代理, 代码规范检查)
    2. 生产环境(提取公共代码, 压缩混淆, 文件压缩或者Base64编码, TreeShaking去除无用代码)
    3. 共同点: 同样的入口文件, 同样的代码处理loader, 同样的解析配置(保持开发和生产的一致性)
    4. 区分开发环境和生产环境(流氓的写法: 两个配置文件赋值粘贴), 优雅的用法: webpack-merge 合并配置文件
       1. webpack.dev.conf.js
       2. webpack.prod.conf.js
       3. webpack.base.conf.js



## Express + webpack-dev-middleware

1. 让开发者更加灵活和自由定制所想要的服务 (自定义输出信息, 使用中间件帮助我们开发)

2. Express(koa) webpack-dev-middleware webpack-hot-middleware(模块热更新) http-proxy-middleware(代理) connect-history-api-fallback(地址write)  opn(在命令行中打开浏览器的一个页面)

   ```javascript
   // 启动express
   const app = express()
   const port = 3000
   
   // 获取开发环境下的配置文件
   const config = require('../webpack.dev.devserver')
   
   // webpack处理 执行配置
   const complier = webpack(config) // 给express使用
   
   for (let context in proxyTable) {
     // 让每一个代理都通过proxyMiddleware
     app.use(proxyMiddleware(context, proxyTable[context]))
   }
   
   app.use(historyApiFallback(historyFallback))
   
   app.use(webpackDevMiddleware(complier, {
     publicPath: config.output.publicPath,
   }))
   
   app.use(webpackHotMiddleware(complier))
   
   app.listen(port, () => {
     console.log('success listen to:', port)
     opn('http://localhost:' + port)
   })
   ```






# ps:第三节:  webpack打包分析

## 打包结果分析

1. 官方分析工具 (看到chunk信息, 给出优化建议)

   ```
   ## mac下
   webpack --profile --json > stats.json
   ## windows
   webpack --profile --json | Out-file 'stats.json' -Encoding OEM
   
   ## 文件上传到 http://webpack.github.io/analyse/
   ```

   - 官方优化方案: http://webpack.github.io/analyse/#hints 给出优化角度

   - Long module build chains 引用路径过长
   - Multiple references to the same module 多次引用一个模块, 修改代码

2. webpack-bundle-analyzer 可视化查看模块的打包机制, 分析打包和优化

   ```js
   // 插件的形式
   
   
   // 命令行的形式 (引用之前生成的json文件)
      webpack-bundle-analyzer stats.json
   
   // stat.json
   // 告诉我们有没有错误, 有没有警告, 以及版本, hash, 打包出来chunk的名称等
   // 上传到 http://webpack.github.io/analyse/
   ```

   1. 打包信息: hash, version, chunks(唯一id, 根据打包顺序分配的chunkid, 代码有可能根据顺序的不同而变化), chunkname(通过动态import, magic-commons动态指定)
   2. 黄色的标记: 表示文件过大
   3. 查看模块的信息: webpack --display-modules [0-n] 表示的是模块的id, 可以和chunk的id理解一样, webpack根据代码的顺序, 给每一个模块表上一个id, 当引用顺序发生变化的时候也会发生变化



##  打包速度优化

1.  影响打包速度因素
   1. 同时解析编译打包的文件比较多
   2. 依赖比较多
   3. 页面也比较多
   4. 其他: 使用loader的方式, 范围
2. 办法1:
   1. 分开vendor和app (分离第三方代码vnedor和业务代码app) 第三方代码修改的比较少 业务代码修改比较多
   2. 分开是不够的, 每次仍然还会去打包vendor, 使用插件Dllplugin和DllReferencePlugin插件
   3. 使用Dllplugin 会生成map, 即一一对应的映射关系, 会在打包业务代码的时候引用这个映射关系, 在引用这些库的时候, webpack告诉编译器说不用打包, 这些包已经打包好了, 直接使用即可, 提高打包的速度
3. 办法2:
   1. UglifyJsPlugin 上线之前压缩和混淆, 这是一个非常耗时的工作, 直接支持parallel, 平行处理; 
   2. 使用cache缓存
4. 办法3
   1. 使用HappyPack ,让文件在处理的时候, 把所有串行的工作变成并行
   2. 给loader使用的, 使loader并行的去处理文件
   3. 有一个线程池的概念 HappyPack.ThreadPool 共享文件之间的线程
5. 办法4
   1. babel-loader babel在编译的时候也是非常消耗时间的,
   2. 开启options.cacheDirectory 开启缓存
   3. 开启include exclude, 规定打包的范围
6. 其他因素
   1. 减少resolve (减少webpack模块的查找时间)
   2. devtool: 去除sourcemap, 生成sourcemap 也会消耗一定的时间, 在上线的时候考虑将其干掉
   3. cache-loader 将所有loader处理的结果缓存起来使用
   4. 最实用的方法: 升级node  升级webpack

## 针对Vue-Cli项目webpack3

1. 默认的打包速度的6000ms多

2. 引入element-ui后的打包速度12771ms

3. 使用dll打包方式 (webpack.conf.dl.js)

   ```js
   const path = require('path');
   const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
   const webpack = require('webpack');
   
   module.exports = {
     entry: {
       vue: ['vue', 'vue-router'],
       ui: ['element-ui'],
     },
     output: {
       path: path.resolve(__dirname, '../src/dll'),
       filename: '[name].dll.js',
       library: '[name]', // 告诉引用的包, 引用第三方包的形式, 如果不适用library就会产生一个全局变量
     },
     plugins: [
       // 告诉webpack 如何去打包dll
       new webpack.DllPlugin({
         // 不能放在dist目录下, 因为dist目录下面的是每一次build都会打包生成的, 而这里的不是每一次都需要打包生成的, 因为不会改变
         path: path.resolve(__dirname, '../src/dll', '[name]-manifest.json'), // 就是上面所讲的map映射
         name: '[name]',
       }),
       new UglifyJsPlugin({
         uglifyOptions: {
           compress: {
             warnings: false,
           },
         },
         // parallel: true,
       }),
     ],
   };
   
   // 首先对该配置进行一次打包 webpack --config build/webpack.conf.dll.js
   ```

   - 生成ui.manifset.json ui.dll.js 和 vue.manifset.json vue.dll.js 这两个json非常关键, 告诉业务代码如何引用第三方类库

     ```js
     // webpack.prod.conf.js
     // 使用dll形式引用 第三方已经打包好的类库
     new webpack.DllReferencePlugin({
     	manifest: require('../src/dll/ui-manifest.json'),
     }),
     new webpack.DllReferencePlugin({
     	manifest: require('../src/dll/vue-manifest.json'),
     }),
     ```

     - 最终打包的一个消耗时间是在5199ms, 节约了50%左右的时间

4. 在上述方式的基础上使用parallel, 同时去掉sourcemap (修改config productionSourceMap:false)

   ```js
   new UglifyJsPlugin({
         uglifyOptions: {
           compress: {
             warnings: false,
           },
         },
         // sourceMap: config.build.productionSourceMap,
         sourceMap: false,
         parallel: true,
         cache: true,
   }),
   // 最终的一个打包时间为3002ms
   ```

5. 减少babel-loader的范围

   ```js
   {
           test: /\.js$/,
           loader: 'babel-loader',
           // client是在开发环境中使用的, 减少include的范围
           include: [resolve('src')],
           // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
         },
   // 最终的一个打包速度 2781ms
   ```

6. happypack (npm install happy-pack --save-dev)

   1. happy是一个loader, 让我们的loader并行处理, 使我们的处理非常快, 当文件非常小的时候比明显, 未必如同想象中的一样
   2. (因为业务代码量比较少)未必会带来很好的效益 (4063ms)

   ```
   // webpack.prod.conf.js plugins中
   // 实例化HappyPack
       new HappyPackPlugin({
         // 此id供 base.conf中的happypack使用
         id: 'vue',
         // 进程实际处理的loader
         loaders: [{
           loader: 'vue-loader',
           option: vueLoaderConfig,
         }],
   
       }),
   
   // webpack.base.conf.js  module.rules中
   {
           test: /\.js$/,
           loader: 'babel-loader',
           // client是在开发环境中使用的, 减少include的范围
           include: [resolve('src')],
           // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
   },
   ```

   

7. 原则

   1. 让webpack并行处理可以并行处理的任务	 uglifyJsPlugin和 HappyPack
   2. 尽可能减少webpack的打包任务, 通过分离第三方和我们的业务, 使用babel限定打包范围, 同时尽可能的利用缓存



## 长缓存优化

1. 什么是长缓存优化
2. webpack-dev-server,  Express+WebpackMiddleWare使用Express搭建,  HMR(模块热加载热更新机制), plugins, 长缓存的用法和实现原理

 ## webpack4

1. 零配置
   1. 零配置就意味着webpack4具有默认配置，webpack运行时，会根据`mode`的值采取不同的默认配置。如果你没有给webpack传入mode，会抛出错误，并提示我们如果要使用webpack就需要设置一个mode。 
   2. mode development none production
   3. webpack4把很多插件相关的配置都迁移到了optimization中，但是我们看看官方文档对optimization的介绍简直寥寥无几，而在默认配置的代码中，webpack对optimization的配置有十几项，反正我是怕了
   4. 这里还有一些其他的配置没有贴出来, 可以去
2. loaders和plugins升级
   1. 先说说`extract-text-webpack-plugin`，这个插件主要用于将多个css合并成一个css，减少http请求，命名时支持contenthash(根据文本内容生成hash)。但是webpack4使用有些问题，所以官方推荐使用`mini-css-extract-plugin`。 

# 总结

1. webpack工程化总结
   1. 实时编译的服务
   2. 好的开发服务
   3. 自动优化
2. 思想
   1. 一切皆为模块
   2. 急速的调试响应速度(HMR)
   3. 优化应该自动完成(当我们设置一些配置后)
3. webpack4
   1. 零配置(主流配置)
   2. 更快更小