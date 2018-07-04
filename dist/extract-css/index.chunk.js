(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["index"],{

/***/ "./src/extract-css/index.js":
/*!**********************************!*\
  !*** ./src/extract-css/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _base = __webpack_require__(/*! ./css/base.less */ \"./src/extract-css/css/base.less\");\n\nvar _base2 = _interopRequireDefault(_base);\n\nvar _common = __webpack_require__(/*! ./css/common.less */ \"./src/extract-css/css/common.less\");\n\nvar _common2 = _interopRequireDefault(_common);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/** 不开启css-module的时候 样式会直接使用 */\n// import './css/base.css'\n// import './css/common.css'\n\n/** 开启css-module的时候 */\nvar app = document.getElementById('app');\nconsole.log('hello', app);\napp.innerHTML = '<div class=\"' + _base2.default.box + '\"></div>';\n\n// 异步加载a.js\nPromise.all(/*! import() | moduleA */[__webpack_require__.e(\"styles\"), __webpack_require__.e(\"moduleA\")]).then(__webpack_require__.t.bind(null, /*! ./components/a.js */ \"./src/extract-css/components/a.js\", 7)).then(function (a) {\n  console.log('async moduleA', a);\n});\n\n//# sourceURL=webpack:///./src/extract-css/index.js?");

/***/ })

},[["./src/extract-css/index.js","manifest","styles"]]]);