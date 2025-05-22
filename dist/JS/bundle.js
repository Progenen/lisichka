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

eval("document.addEventListener('DOMContentLoaded', () => {\r\n    const burger = document.querySelector('.header__burger');\r\n    const menu = document.querySelector('.header__drop');\r\n\r\n    burger.addEventListener(\"click\", () => {\r\n        console.log('click');\r\n        if (burger.classList.contains(\"is-active\")) {\r\n            burger.classList.remove(\"is-active\");\r\n            menu.classList.remove(\"is-active\");\r\n            document.body.style.overflow = \"hidden\";\r\n        } else {\r\n            burger.classList.add(\"is-active\");\r\n            menu.classList.add(\"is-active\");\r\n            document.body.style.overflow = \"auto\";\r\n        }\r\n    });\r\n\r\n    if (innerWidth <= 768) {\r\n        const headerUi = document.querySelector(\".header__ui-links\");\r\n        const headerDrop = document.querySelector(\".header__drop\");\r\n\r\n        headerDrop.prepend(headerUi);\r\n    }\r\n})\n\n//# sourceURL=webpack://project-name/./src/js/index.js?");

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