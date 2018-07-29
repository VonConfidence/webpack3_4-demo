(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageB"],{

/***/ "./src/result-analysis/moduleA.js":
/*!****************************************!*\
  !*** ./src/result-analysis/moduleA.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconsole.log('this is in moduleA');\nexports.default = 'moduleA';\n\n//# sourceURL=webpack:///./src/result-analysis/moduleA.js?");

/***/ }),

/***/ "./src/result-analysis/pageB.js":
/*!**************************************!*\
  !*** ./src/result-analysis/pageB.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _subPageA = __webpack_require__(/*! ./subPageA */ \"./src/result-analysis/subPageA.js\");\n\nvar _subPageB = __webpack_require__(/*! ./subPageB */ \"./src/result-analysis/subPageB.js\");\n\n// import _ from 'lodash'\nconsole.log(_subPageA.subPageA);\nconsole.log(_subPageB.subPageB);\n\n// const page = 'subPageB';\n\n// if (page) {\n//   import(\n//     /* webpackChunkName: \"subPageA\" */\n//     /* webpackMode: \"lazy\" */\n//     './subPageA'\n//   ).then(subPageA => {\n//     console.log(subPageA)\n//   })\n// } else {\n//   import(\n//     /* webpackChunkName: 'subPageB' */\n//     /* webpackMode: \"lazy\" */\n//     './subPageB'\n//   )\n// }\n\nexports.default = 'pageA';\n\n//# sourceURL=webpack:///./src/result-analysis/pageB.js?");

/***/ }),

/***/ "./src/result-analysis/subPageA.js":
/*!*****************************************!*\
  !*** ./src/result-analysis/subPageA.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__webpack_require__(/*! ./moduleA */ \"./src/result-analysis/moduleA.js\");\n\nconsole.log('this is in subPageA');\n\nexports.default = 'subPageA';\n\n//# sourceURL=webpack:///./src/result-analysis/subPageA.js?");

/***/ }),

/***/ "./src/result-analysis/subPageB.js":
/*!*****************************************!*\
  !*** ./src/result-analysis/subPageB.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__webpack_require__(/*! ./moduleA */ \"./src/result-analysis/moduleA.js\");\n\nconsole.log('this is in subPageB');\n\nexports.default = 'subPageB';\n\n//# sourceURL=webpack:///./src/result-analysis/subPageB.js?");

/***/ })

},[["./src/result-analysis/pageB.js","manifest"]]]);