(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageA"],{

/***/ "./src/lazy_cmp/pageA.js":
/*!*******************************!*\
  !*** ./src/lazy_cmp/pageA.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _lodash = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\nvar _lodash2 = _interopRequireDefault(_lodash);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nconsole.log('lodash: ', _lodash2.default);\n// 1. 这里不再使用include, 因为会和pageA打包到一起, 这里的目的是 将其异步单独提取出来\n// require.include('./moduleA')\n\nvar page = 'subPageA';\n\nif (page) {\n  Promise.all(/*! import() | subPageA */[__webpack_require__.e(\"vendor\"), __webpack_require__.e(\"subPageA\")]).then(__webpack_require__.t.bind(null, /*! ./subPageA */ \"./src/lazy_cmp/subPageA.js\", 7)).then(function (subPageA) {\n    console.log(subPageA);\n  });\n} else {\n  Promise.all(/*! import() | subPageB */[__webpack_require__.e(\"vendor\"), __webpack_require__.e(\"subPageB\")]).then(__webpack_require__.t.bind(null, /*! ./subPageB */ \"./src/lazy_cmp/subPageB.js\", 7));\n}\n\nexports.default = 'pageA';\n\n//# sourceURL=webpack:///./src/lazy_cmp/pageA.js?");

/***/ })

},[["./src/lazy_cmp/pageA.js","manifest","vendor"]]]);