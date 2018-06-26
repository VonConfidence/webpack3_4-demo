(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pageB"],{

/***/ "./src/lazy/moduleA.js":
/*!*****************************!*\
  !*** ./src/lazy/moduleA.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nconsole.log('this is in moduleA');\nexports.default = 'moduleA';\n\n//# sourceURL=webpack:///./src/lazy/moduleA.js?");

/***/ }),

/***/ "./src/lazy/pageB.js":
/*!***************************!*\
  !*** ./src/lazy/pageB.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__webpack_require__(/*! ./subPageA */ \"./src/lazy/subPageA.js\");\n\n__webpack_require__(/*! ./subPageB */ \"./src/lazy/subPageB.js\");\n\nvar _lodash = __webpack_require__(/*! lodash */ \"./node_modules/lodash/lodash.js\");\n\nvar _ = _interopRequireWildcard(_lodash);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nexports.default = 'pageA';\n\n//# sourceURL=webpack:///./src/lazy/pageB.js?");

/***/ }),

/***/ "./src/lazy/subPageA.js":
/*!******************************!*\
  !*** ./src/lazy/subPageA.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__webpack_require__(/*! ./moduleA */ \"./src/lazy/moduleA.js\");\n\nconsole.log('this is in subPageA');\n\nexports.default = 'subPageA';\n\n//# sourceURL=webpack:///./src/lazy/subPageA.js?");

/***/ }),

/***/ "./src/lazy/subPageB.js":
/*!******************************!*\
  !*** ./src/lazy/subPageB.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\n__webpack_require__(/*! ./moduleA */ \"./src/lazy/moduleA.js\");\n\nconsole.log('this is in subPageA');\n\nexports.default = 'subPageB';\n\n//# sourceURL=webpack:///./src/lazy/subPageB.js?");

/***/ })

},[["./src/lazy/pageB.js","manifest","vendor"]]]);