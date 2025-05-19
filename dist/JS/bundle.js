/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', () => {\n    const burger = document.querySelector('.header__burger');\n    const menu = document.querySelector('.header__drop');\n\n    console.log(burger);\n\n    burger.addEventListener(\"click\", () => {\n        console.log('click');\n        if (burger.classList.contains(\"is-active\")) {\n            burger.classList.remove(\"is-active\");\n            menu.classList.remove(\"is-active\");\n            body.style.overflow = \"hidden\";\n        } else {\n            burger.classList.add(\"is-active\");\n            menu.classList.add(\"is-active\");\n            body.style.overflow = \"auto\";\n        }\n    })\n})\n\n//# sourceURL=webpack://project-name/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"]();
/******/ 	
/******/ })()
;