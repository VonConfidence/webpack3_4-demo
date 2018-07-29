(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["subPageB"],{

/***/ "./src/result-analysis/moduleA.js":
/*!****************************************!*\
  !*** ./src/result-analysis/moduleA.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconsole.log('this is in moduleA');\nexports.default = 'moduleA';\n\n//# sourceURL=webpack:///./src/result-analysis/moduleA.js?");

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

}]);