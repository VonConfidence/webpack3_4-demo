(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageA"],{

/***/ "./src/lazy/moduleA.js":
/*!*****************************!*\
  !*** ./src/lazy/moduleA.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconsole.log('this is in moduleA');\nexports.default = 'moduleA';\n\n//# sourceURL=webpack:///./src/lazy/moduleA.js?");

/***/ }),

/***/ "./src/lazy/pageA.js":
/*!***************************!*\
  !*** ./src/lazy/pageA.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n// import './subPageA'\n// import './subPageB'\n\n// 1. 将moduleA 提前打包, 不会将moduleA打包进subPageA和subPageB\nundefined/*! require.include ./moduleA */;\n// 2. 不写上面include的话,  subPageA和subPageB中会同时包含 moduleA, 并没有将公共模块提取出来\n//   ----?-- 可能会想到使用上面提到的commonChunkPlugin 但是不是为什么?\n//    ** 因为上面说到了commonChunkPlugin是使用多入口文件的时候, 但是这里使用的是单文件\n\nvar page = 'subPageA';\nif (page === 'subPageA') {\n  // require([]) 参数是空数组的话, 里面的require的包还是会被异步打包\n  __webpack_require__.e(/*! require.ensure | subPageA */ \"subPageA\").then((function (require) {\n    var subPageA = __webpack_require__(/*! ./subPageA */ \"./src/lazy/subPageA.js\");\n    console.log(subPageA);\n  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n} else if (page === 'subPageB') {\n  __webpack_require__.e(/*! require.ensure | subPageB */ \"subPageB\").then((function (require) {\n    var subPageB = __webpack_require__(/*! ./subPageB */ \"./src/lazy/subPageB.js\");\n    console.log(subPageB);\n  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n}\n\n// 3. 动态代码是会执行的, 并不是将代码引入到我们的页面中不执行, 在import的时候 代码实际上已经执行了\n//      会将subPageC打包进入subPageA中\nif (page) {\n  __webpack_require__.e(/*! import() | subPageA */ \"subPageA\").then(__webpack_require__.t.bind(null, /*! ./subPageC */ \"./src/lazy/subPageC.js\", 7)).then(function (subPageC) {\n    console.log(subPageC);\n  });\n} else {\n  __webpack_require__.e(/*! import() | subPageD */ \"subPageD\").then(__webpack_require__.t.bind(null, /*! ./subPageD */ \"./src/lazy/subPageD.js\", 7));\n}\n\n/**\n * 1. 这里需要在回调函数里面在require一次, 是因为如果不require\n * 那么只是将代码引入了进来, 但是没有执行\n * 2. require的参数可以不传, 里面require的包任然会被异步打包\n *\n * 结果: 将lodash单独打包进一个文件vendor~vendor.chunk.js\n */\n__webpack_require__.e(/*! require.ensure | vendor */ \"vendor\").then((function (require) {\n  var _ = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n  _.join([1, 2, 3], 4);\n}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);\n\n// import * as _ from 'lodash'\n\n\nexports.default = 'pageA';\n\n//# sourceURL=webpack:///./src/lazy/pageA.js?");

/***/ })

},[["./src/lazy/pageA.js","manifest"]]]);