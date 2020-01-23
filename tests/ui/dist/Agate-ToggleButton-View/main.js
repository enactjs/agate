/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	__webpack_require__.ilib_cache_id = "1579754606589";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../enact-ui-tests/index.js":
/*!**********************************!*\
  !*** ../enact-ui-tests/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.symbol.description */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.description.js");
/* harmony import */ var core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_description__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.symbol.async-iterator */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.async-iterator.js");
/* harmony import */ var core_js_modules_es_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_async_iterator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_symbol_match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.symbol.match */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.match.js");
/* harmony import */ var core_js_modules_es_symbol_match__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_match__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_symbol_replace__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/es.symbol.replace */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.replace.js");
/* harmony import */ var core_js_modules_es_symbol_replace__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_replace__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_symbol_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! core-js/modules/es.symbol.search */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.search.js");
/* harmony import */ var core_js_modules_es_symbol_search__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_search__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_symbol_split__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! core-js/modules/es.symbol.split */ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.split.js");
/* harmony import */ var core_js_modules_es_symbol_split__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_symbol_split__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_flat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! core-js/modules/es.array.flat */ "../enact-ui-tests/node_modules/core-js/modules/es.array.flat.js");
/* harmony import */ var core_js_modules_es_array_flat__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_array_flat_map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! core-js/modules/es.array.flat-map */ "../enact-ui-tests/node_modules/core-js/modules/es.array.flat-map.js");
/* harmony import */ var core_js_modules_es_array_flat_map__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_flat_map__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_array_unscopables_flat__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! core-js/modules/es.array.unscopables.flat */ "../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat.js");
/* harmony import */ var core_js_modules_es_array_unscopables_flat__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_unscopables_flat__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! core-js/modules/es.array.unscopables.flat-map */ "../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat-map.js");
/* harmony import */ var core_js_modules_es_array_unscopables_flat_map__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_unscopables_flat_map__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! core-js/modules/es.math.hypot */ "../enact-ui-tests/node_modules/core-js/modules/es.math.hypot.js");
/* harmony import */ var core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_math_hypot__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! core-js/modules/es.number.to-fixed */ "../enact-ui-tests/node_modules/core-js/modules/es.number.to-fixed.js");
/* harmony import */ var core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_to_fixed__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! core-js/modules/es.object.assign */ "../enact-ui-tests/node_modules/core-js/modules/es.object.assign.js");
/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! core-js/modules/es.object.from-entries */ "../enact-ui-tests/node_modules/core-js/modules/es.object.from-entries.js");
/* harmony import */ var core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_from_entries__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! core-js/modules/es.promise */ "../enact-ui-tests/node_modules/core-js/modules/es.promise.js");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! core-js/modules/es.promise.finally */ "../enact-ui-tests/node_modules/core-js/modules/es.promise.finally.js");
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var core_js_modules_es_reflect_set__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! core-js/modules/es.reflect.set */ "../enact-ui-tests/node_modules/core-js/modules/es.reflect.set.js");
/* harmony import */ var core_js_modules_es_reflect_set__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_reflect_set__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! core-js/modules/es.regexp.constructor */ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.constructor.js");
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! core-js/modules/es.regexp.flags */ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_flags__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! core-js/modules/es.regexp.to-string */ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.to-string.js");
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! core-js/modules/es.string.ends-with */ "../enact-ui-tests/node_modules/core-js/modules/es.string.ends-with.js");
/* harmony import */ var core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_ends_with__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! core-js/modules/es.string.includes */ "../enact-ui-tests/node_modules/core-js/modules/es.string.includes.js");
/* harmony import */ var core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! core-js/modules/es.string.match */ "../enact-ui-tests/node_modules/core-js/modules/es.string.match.js");
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "../enact-ui-tests/node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! core-js/modules/es.string.search */ "../enact-ui-tests/node_modules/core-js/modules/es.string.search.js");
/* harmony import */ var core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! core-js/modules/es.string.split */ "../enact-ui-tests/node_modules/core-js/modules/es.string.split.js");
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! core-js/modules/es.string.starts-with */ "../enact-ui-tests/node_modules/core-js/modules/es.string.starts-with.js");
/* harmony import */ var core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_starts_with__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! core-js/modules/es.string.trim-end */ "../enact-ui-tests/node_modules/core-js/modules/es.string.trim-end.js");
/* harmony import */ var core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_end__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! core-js/modules/es.string.trim-start */ "../enact-ui-tests/node_modules/core-js/modules/es.string.trim-start.js");
/* harmony import */ var core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim_start__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var core_js_modules_es_typed_array_float32_array__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! core-js/modules/es.typed-array.float32-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float32-array.js");
/* harmony import */ var core_js_modules_es_typed_array_float32_array__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_float32_array__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var core_js_modules_es_typed_array_float64_array__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! core-js/modules/es.typed-array.float64-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float64-array.js");
/* harmony import */ var core_js_modules_es_typed_array_float64_array__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_float64_array__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var core_js_modules_es_typed_array_int8_array__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! core-js/modules/es.typed-array.int8-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int8-array.js");
/* harmony import */ var core_js_modules_es_typed_array_int8_array__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_int8_array__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var core_js_modules_es_typed_array_int16_array__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! core-js/modules/es.typed-array.int16-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int16-array.js");
/* harmony import */ var core_js_modules_es_typed_array_int16_array__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_int16_array__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var core_js_modules_es_typed_array_int32_array__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! core-js/modules/es.typed-array.int32-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int32-array.js");
/* harmony import */ var core_js_modules_es_typed_array_int32_array__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_int32_array__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! core-js/modules/es.typed-array.uint8-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-array.js");
/* harmony import */ var core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_array__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var core_js_modules_es_typed_array_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! core-js/modules/es.typed-array.uint8-clamped-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js");
/* harmony import */ var core_js_modules_es_typed_array_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint8_clamped_array__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var core_js_modules_es_typed_array_uint16_array__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! core-js/modules/es.typed-array.uint16-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint16-array.js");
/* harmony import */ var core_js_modules_es_typed_array_uint16_array__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint16_array__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! core-js/modules/es.typed-array.uint32-array */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint32-array.js");
/* harmony import */ var core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_uint32_array__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var core_js_modules_es_typed_array_from__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! core-js/modules/es.typed-array.from */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.from.js");
/* harmony import */ var core_js_modules_es_typed_array_from__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_from__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var core_js_modules_es_typed_array_of__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! core-js/modules/es.typed-array.of */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.of.js");
/* harmony import */ var core_js_modules_es_typed_array_of__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_of__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! core-js/modules/es.typed-array.to-locale-string */ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.to-locale-string.js");
/* harmony import */ var core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_typed_array_to_locale_string__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var UI_TEST_APP_ENTRY__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! UI_TEST_APP_ENTRY */ "./tests/ui/apps/ToggleButton/Agate-ToggleButton-View.js");









































var _jsxFileName = "/Users/RyanDuffy/dev/enact-ui-tests/index.js";



const url = new URL(window.location.href);
const locale = url.searchParams.get('locale');
const appElement = react__WEBPACK_IMPORTED_MODULE_41___default.a.createElement(UI_TEST_APP_ENTRY__WEBPACK_IMPORTED_MODULE_43__["default"], {
  locale: locale,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 9
  },
  __self: undefined
});

if (typeof window !== 'undefined') {
  Object(react_dom__WEBPACK_IMPORTED_MODULE_42__["render"])(appElement, document.getElementById('root'));
}

/* harmony default export */ __webpack_exports__["default"] = (appElement);

/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/a-function.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/a-function.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/add-to-unscopables.js":
/*!******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/add-to-unscopables.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var UNSCOPABLES = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('unscopables');
var create = __webpack_require__(/*! ../internals/object-create */ "../enact-ui-tests/node_modules/core-js/internals/object-create.js");
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/advance-string-index.js":
/*!********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/advance-string-index.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var codePointAt = __webpack_require__(/*! ../internals/string-at */ "../enact-ui-tests/node_modules/core-js/internals/string-at.js");

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? codePointAt(S, index, true).length : 1);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/an-instance.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/an-instance.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/an-object.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/an-object.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js":
/*!**********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var classof = __webpack_require__(/*! ../internals/classof */ "../enact-ui-tests/node_modules/core-js/internals/classof.js");
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../enact-ui-tests/node_modules/core-js/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../enact-ui-tests/node_modules/core-js/internals/object-set-prototype-of.js");
var TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('toStringTag');
var TYPED_ARRAY_TAG = __webpack_require__(/*! ../internals/uid */ "../enact-ui-tests/node_modules/core-js/internals/uid.js")('TYPED_ARRAY_TAG');

var DataView = global.DataView;
var DataViewPrototype = DataView && DataView.prototype;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var isPrototypeOf = ObjectPrototype.isPrototypeOf;

var NATIVE_ARRAY_BUFFER = !!(global.ArrayBuffer && global.DataView);
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf;
var TYPED_ARRAY_TAG_REQIRED = false;
var NAME;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var isView = function isView(it) {
  var klass = classof(it);
  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
};

var isTypedArray = function (it) {
  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (setPrototypeOf) {
    if (isPrototypeOf.call(TypedArray, C)) return C;
  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
      return C;
    }
  } throw TypeError('Target is not a typed array constructor');
};

var exportProto = function (KEY, property, forced) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
      delete TypedArrayConstructor.prototype[KEY];
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    redefine(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
  }
};

var exportStatic = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
        delete TypedArrayConstructor[KEY];
      }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      redefine(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  if (!global[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !has(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    hide(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

// WebKit bug - the same parent prototype for typed arrays and data view
if (NATIVE_ARRAY_BUFFER && setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
  setPrototypeOf(DataViewPrototype, ObjectPrototype);
}

module.exports = {
  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportProto: exportProto,
  exportStatic: exportStatic,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-buffer.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-buffer.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var NATIVE_ARRAY_BUFFER = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER;
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "../enact-ui-tests/node_modules/core-js/internals/redefine-all.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../enact-ui-tests/node_modules/core-js/internals/an-instance.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var toIndex = __webpack_require__(/*! ../internals/to-index */ "../enact-ui-tests/node_modules/core-js/internals/to-index.js");
var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js").f;
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;
var arrayFill = __webpack_require__(/*! ../internals/array-fill */ "../enact-ui-tests/node_modules/core-js/internals/array-fill.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "../enact-ui-tests/node_modules/core-js/internals/set-to-string-tag.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../enact-ui-tests/node_modules/core-js/internals/internal-state.js");
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length';
var WRONG_INDEX = 'Wrong index';
var NativeArrayBuffer = global[ARRAY_BUFFER];
var $ArrayBuffer = NativeArrayBuffer;
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = 1 / 0;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function (number, mantissaLength, bytes) {
  var buffer = new Array(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs(number);
  // eslint-disable-next-line no-self-compare
  if (number != number || number === Infinity) {
    // eslint-disable-next-line no-self-compare
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor(log(number) / LN2);
    if (number * (c = pow(2, -exponent)) < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
      exponent = 0;
    }
  }
  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
  buffer[--index] |= sign * 128;
  return buffer;
};

var unpackIEEE754 = function (buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign = buffer[index--];
  var exponent = sign & 127;
  var mantissa;
  sign >>= 7;
  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow(2, mantissaLength);
    exponent = exponent - eBias;
  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
};

var unpackInt32 = function (buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};

var packInt8 = function (number) {
  return [number & 0xFF];
};

var packInt16 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF];
};

var packInt32 = function (number) {
  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
};

var packFloat32 = function (number) {
  return packIEEE754(number, 23, 4);
};

var packFloat64 = function (number) {
  return packIEEE754(number, 52, 8);
};

var addGetter = function (Constructor, key) {
  defineProperty(Constructor[PROTOTYPE], key, { get: function () { return getInternalState(this)[key]; } });
};

var get = function (view, count, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = bytes.slice(start, start + count);
  return isLittleEndian ? pack : pack.reverse();
};

var set = function (view, count, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  var store = getInternalState(view);
  if (intIndex + count > store.byteLength) throw RangeError(WRONG_INDEX);
  var bytes = getInternalState(store.buffer).bytes;
  var start = intIndex + store.byteOffset;
  var pack = conversion(+value);
  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
};

if (!NATIVE_ARRAY_BUFFER) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    setInternalState(this, {
      bytes: arrayFill.call(new Array(byteLength), 0),
      byteLength: byteLength
    });
    if (!DESCRIPTORS) this.byteLength = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = getInternalState(buffer).byteLength;
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    setInternalState(this, {
      buffer: buffer,
      byteLength: byteLength,
      byteOffset: offset
    });
    if (!DESCRIPTORS) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, 'byteLength');
    addGetter($DataView, 'buffer');
    addGetter($DataView, 'byteLength');
    addGetter($DataView, 'byteOffset');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackInt32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packInt16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packInt32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packFloat32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packFloat64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    NativeArrayBuffer(1);
  }) || !fails(function () {
    new NativeArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new NativeArrayBuffer(); // eslint-disable-line no-new
    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
    return NativeArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new NativeArrayBuffer(toIndex(length));
    };
    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE] = NativeArrayBuffer[PROTOTYPE];
    for (var keys = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, NativeArrayBuffer[key]);
    }
    ArrayBufferPrototype.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var testView = new $DataView(new $ArrayBuffer(2));
  var nativeSetInt8 = $DataView[PROTOTYPE].setInt8;
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, { unsafe: true });
}

setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-fill.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-fill.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../enact-ui-tests/node_modules/core-js/internals/to-absolute-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");

// `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-includes.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-includes.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "../enact-ui-tests/node_modules/core-js/internals/to-absolute-index.js");

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-methods.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-methods.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/bind-context */ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/indexed-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../enact-ui-tests/node_modules/core-js/internals/array-species-create.js");

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
module.exports = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/array-species-create.js":
/*!********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/array-species-create.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var isArray = __webpack_require__(/*! ../internals/is-array */ "../enact-ui-tests/node_modules/core-js/internals/is-array.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/bind-context.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "../enact-ui-tests/node_modules/core-js/internals/a-function.js");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!******************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/classof-raw.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/classof.js":
/*!*******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/classof.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/copy-constructor-properties.js":
/*!***************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "../enact-ui-tests/node_modules/core-js/internals/own-keys.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/correct-is-regexp-logic.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/correct-is-regexp-logic.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/correct-prototype-getter.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/correct-prototype-getter.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js":
/*!**************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/create-property.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/create-property.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../enact-ui-tests/node_modules/core-js/internals/to-primitive.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "../enact-ui-tests/node_modules/core-js/internals/path.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var wrappedWellKnownSymbolModule = __webpack_require__(/*! ../internals/wrapped-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/wrapped-well-known-symbol.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/descriptors.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/document-create-element.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/document-create-element.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var document = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/enum-bug-keys.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/enum-bug-keys.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/export.js":
/*!******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/export.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../enact-ui-tests/node_modules/core-js/internals/set-global.js");
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../enact-ui-tests/node_modules/core-js/internals/copy-constructor-properties.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../enact-ui-tests/node_modules/core-js/internals/is-forced.js");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/fails.js":
/*!*****************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/fails.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js":
/*!**********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec.js");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/flatten-into-array.js":
/*!******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/flatten-into-array.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray = __webpack_require__(/*! ../internals/is-array */ "../enact-ui-tests/node_modules/core-js/internals/is-array.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js");

// `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};

module.exports = flattenIntoArray;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/forced-string-trim-method.js":
/*!*************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/forced-string-trim-method.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var whitespaces = __webpack_require__(/*! ../internals/whitespaces */ "../enact-ui-tests/node_modules/core-js/internals/whitespaces.js");
var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/function-to-string.js":
/*!******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/function-to-string.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/shared */ "../enact-ui-tests/node_modules/core-js/internals/shared.js")('native-function-to-string', Function.toString);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/get-built-in.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/get-built-in.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "../enact-ui-tests/node_modules/core-js/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/get-iterator-method.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/get-iterator-method.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "../enact-ui-tests/node_modules/core-js/internals/classof.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('iterator');
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../enact-ui-tests/node_modules/core-js/internals/iterators.js");

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/global.js":
/*!******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/global.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window == 'object' && window && window.Math == Math ? window
  : typeof self == 'object' && self && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/has.js":
/*!***************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/has.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/hidden-keys.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/hidden-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/hide.js":
/*!****************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/hide.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js");

module.exports = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js") ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/host-report-errors.js":
/*!******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/host-report-errors.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/html.js":
/*!****************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/html.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").document;

module.exports = document && document.documentElement;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/ie8-dom-define.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/ie8-dom-define.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js") && !__webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ../internals/document-create-element */ "../enact-ui-tests/node_modules/core-js/internals/document-create-element.js")('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/indexed-object.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/indexed-object.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var split = ''.split;

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/inherit-if-required.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/inherit-if-required.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../enact-ui-tests/node_modules/core-js/internals/object-set-prototype-of.js");

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/internal-state.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/internal-state.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "../enact-ui-tests/node_modules/core-js/internals/native-weak-map.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "../enact-ui-tests/node_modules/core-js/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../enact-ui-tests/node_modules/core-js/internals/hidden-keys.js");
var WeakMap = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-array-iterator-method.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-array-iterator-method.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ../internals/iterators */ "../enact-ui-tests/node_modules/core-js/internals/iterators.js");
var ITERATOR = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-array.js":
/*!********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-array.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-forced.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-forced.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-object.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-object.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-pure.js":
/*!*******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-pure.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/is-regexp.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/is-regexp.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var MATCH = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/iterate.js":
/*!*******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/iterate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../enact-ui-tests/node_modules/core-js/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../enact-ui-tests/node_modules/core-js/internals/get-iterator-method.js");
var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "../enact-ui-tests/node_modules/core-js/internals/call-with-safe-iteration-closing.js");
var BREAK = {};

var exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {
  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result === BREAK) return BREAK;
      } return;
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;
  }
};

exports.BREAK = BREAK;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/iterators.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/iterators.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/microtask.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/microtask.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js").f;
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var macrotask = __webpack_require__(/*! ../internals/task */ "../enact-ui-tests/node_modules/core-js/internals/task.js").set;
var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../enact-ui-tests/node_modules/core-js/internals/user-agent.js");
var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !/(iPhone|iPod|iPad).*AppleWebKit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/native-symbol.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/native-symbol.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Chrome 38 Symbol has incorrect toString conversion
module.exports = !__webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/native-weak-map.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/native-weak-map.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "../enact-ui-tests/node_modules/core-js/internals/function-to-string.js");
var WeakMap = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/new-promise-capability.js":
/*!**********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/new-promise-capability.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../enact-ui-tests/node_modules/core-js/internals/a-function.js");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-assign.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-assign.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../enact-ui-tests/node_modules/core-js/internals/object-keys.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-symbols.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../enact-ui-tests/node_modules/core-js/internals/object-property-is-enumerable.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/indexed-object.js");
var nativeAssign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !nativeAssign || __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (propertyIsEnumerable.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : nativeAssign;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-create.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-create.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "../enact-ui-tests/node_modules/core-js/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../enact-ui-tests/node_modules/core-js/internals/enum-bug-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "../enact-ui-tests/node_modules/core-js/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "../enact-ui-tests/node_modules/core-js/internals/document-create-element.js");
var IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ "../enact-ui-tests/node_modules/core-js/internals/shared-key.js")('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

__webpack_require__(/*! ../internals/hidden-keys */ "../enact-ui-tests/node_modules/core-js/internals/hidden-keys.js")[IE_PROTO] = true;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-define-properties.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-define-properties.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "../enact-ui-tests/node_modules/core-js/internals/object-keys.js");

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js":
/*!**********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-define-property.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../enact-ui-tests/node_modules/core-js/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../enact-ui-tests/node_modules/core-js/internals/to-primitive.js");
var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!**********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "../enact-ui-tests/node_modules/core-js/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../enact-ui-tests/node_modules/core-js/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "../enact-ui-tests/node_modules/core-js/internals/ie8-dom-define.js");
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js":
/*!*****************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../enact-ui-tests/node_modules/core-js/internals/object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../enact-ui-tests/node_modules/core-js/internals/enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!*******************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-get-prototype-of.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-get-prototype-of.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var IE_PROTO = __webpack_require__(/*! ../internals/shared-key */ "../enact-ui-tests/node_modules/core-js/internals/shared-key.js")('IE_PROTO');
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "../enact-ui-tests/node_modules/core-js/internals/correct-prototype-getter.js");
var ObjectPrototype = Object.prototype;

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-keys-internal.js":
/*!********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-keys-internal.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/to-indexed-object.js");
var arrayIndexOf = __webpack_require__(/*! ../internals/array-includes */ "../enact-ui-tests/node_modules/core-js/internals/array-includes.js")(false);
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "../enact-ui-tests/node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-keys.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-keys.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "../enact-ui-tests/node_modules/core-js/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "../enact-ui-tests/node_modules/core-js/internals/enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*****************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/object-set-prototype-of.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/object-set-prototype-of.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var validateSetPrototypeOfArguments = __webpack_require__(/*! ../internals/validate-set-prototype-of-arguments */ "../enact-ui-tests/node_modules/core-js/internals/validate-set-prototype-of-arguments.js");

module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/own-keys.js":
/*!********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/own-keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js");
var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-symbols.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var Reflect = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").Reflect;

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/path.js":
/*!****************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/path.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/perform.js":
/*!*******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/perform.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/promise-resolve.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/promise-resolve.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "../enact-ui-tests/node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/redefine-all.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/redefine-all.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/redefine.js":
/*!********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/redefine.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../enact-ui-tests/node_modules/core-js/internals/set-global.js");
var nativeFunctionToString = __webpack_require__(/*! ../internals/function-to-string */ "../enact-ui-tests/node_modules/core-js/internals/function-to-string.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../enact-ui-tests/node_modules/core-js/internals/internal-state.js");
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

__webpack_require__(/*! ../internals/shared */ "../enact-ui-tests/node_modules/core-js/internals/shared.js")('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js":
/*!********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var regexpExec = __webpack_require__(/*! ./regexp-exec */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec.js");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/regexp-exec.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(/*! ./regexp-flags */ "../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/same-value.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/same-value.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/set-global.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/set-global.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/set-species.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/set-species.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../enact-ui-tests/node_modules/core-js/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var C = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;
  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/set-to-string-tag.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/set-to-string-tag.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var TO_STRING_TAG = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/shared-key.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/shared-key.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "../enact-ui-tests/node_modules/core-js/internals/shared.js")('keys');
var uid = __webpack_require__(/*! ../internals/uid */ "../enact-ui-tests/node_modules/core-js/internals/uid.js");

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/shared.js":
/*!******************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/shared.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "../enact-ui-tests/node_modules/core-js/internals/set-global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.1',
  mode: __webpack_require__(/*! ../internals/is-pure */ "../enact-ui-tests/node_modules/core-js/internals/is-pure.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/species-constructor.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/species-constructor.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../enact-ui-tests/node_modules/core-js/internals/a-function.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/string-at.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/string-at.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
// CONVERT_TO_STRING: true  -> String#at
// CONVERT_TO_STRING: false -> String#codePointAt
module.exports = function (that, pos, CONVERT_TO_STRING) {
  var S = String(requireObjectCoercible(that));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size
    || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
      ? CONVERT_TO_STRING ? S.charAt(position) : first
      : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/string-repeat.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/string-repeat.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");

// `String.prototype.repeat` method implementation
// https://tc39.github.io/ecma262/#sec-string.prototype.repeat
module.exports = ''.repeat || function repeat(count) {
  var str = String(requireObjectCoercible(this));
  var result = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError('Wrong number of repetitions');
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  return result;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/string-trim.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/string-trim.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
var whitespace = '[' + __webpack_require__(/*! ../internals/whitespaces */ "../enact-ui-tests/node_modules/core-js/internals/whitespaces.js") + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// 1 -> String#trimStart
// 2 -> String#trimEnd
// 3 -> String#trim
module.exports = function (string, TYPE) {
  string = String(requireObjectCoercible(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/task.js":
/*!****************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/task.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "../enact-ui-tests/node_modules/core-js/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "../enact-ui-tests/node_modules/core-js/internals/document-create-element.js");
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var listener = function (event) {
  run.call(event.data);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(bind(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(bind(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(bind(run, id, 1), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/this-number-value.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/this-number-value.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");

// `thisNumberValue` abstract operation
// https://tc39.github.io/ecma262/#sec-thisnumbervalue
module.exports = function (value) {
  if (typeof value != 'number' && classof(value) != 'Number') {
    throw TypeError('Incorrect invocation');
  }
  return +value;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-absolute-index.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-absolute-index.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-index.js":
/*!********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");

// `ToIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-toindex
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length or index');
  return length;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-indexed-object.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-indexed-object.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "../enact-ui-tests/node_modules/core-js/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-integer.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-length.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-length.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-object.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-object.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-offset.js":
/*!*********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-offset.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");

module.exports = function (it, BYTES) {
  var offset = toInteger(it);
  if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/to-primitive.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/to-primitive.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js")) {
  var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
  var $export = __webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js");
  var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../enact-ui-tests/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");
  var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js");
  var ArrayBufferModule = __webpack_require__(/*! ../internals/array-buffer */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer.js");
  var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../enact-ui-tests/node_modules/core-js/internals/an-instance.js");
  var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js");
  var hide = __webpack_require__(/*! ../internals/hide */ "../enact-ui-tests/node_modules/core-js/internals/hide.js");
  var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
  var toIndex = __webpack_require__(/*! ../internals/to-index */ "../enact-ui-tests/node_modules/core-js/internals/to-index.js");
  var toOffset = __webpack_require__(/*! ../internals/to-offset */ "../enact-ui-tests/node_modules/core-js/internals/to-offset.js");
  var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "../enact-ui-tests/node_modules/core-js/internals/to-primitive.js");
  var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
  var classof = __webpack_require__(/*! ../internals/classof */ "../enact-ui-tests/node_modules/core-js/internals/classof.js");
  var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
  var create = __webpack_require__(/*! ../internals/object-create */ "../enact-ui-tests/node_modules/core-js/internals/object-create.js");
  var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "../enact-ui-tests/node_modules/core-js/internals/object-set-prototype-of.js");
  var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js").f;
  var typedArrayFrom = __webpack_require__(/*! ../internals/typed-array-from */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-from.js");
  var arrayForEach = __webpack_require__(/*! ../internals/array-methods */ "../enact-ui-tests/node_modules/core-js/internals/array-methods.js")(0);
  var setSpecies = __webpack_require__(/*! ../internals/set-species */ "../enact-ui-tests/node_modules/core-js/internals/set-species.js");
  var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
  var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js");
  var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../enact-ui-tests/node_modules/core-js/internals/internal-state.js");
  var getInternalState = InternalStateModule.get;
  var setInternalState = InternalStateModule.set;
  var nativeDefineProperty = definePropertyModule.f;
  var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  var RangeError = global.RangeError;
  var ArrayBuffer = ArrayBufferModule.ArrayBuffer;
  var DataView = ArrayBufferModule.DataView;
  var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
  var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG;
  var TypedArray = ArrayBufferViewCore.TypedArray;
  var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype;
  var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;
  var isTypedArray = ArrayBufferViewCore.isTypedArray;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var WRONG_LENGTH = 'Wrong length';

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = new (aTypedArrayConstructor(C))(length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key) {
    nativeDefineProperty(it, key, { get: function () {
      return getInternalState(this)[key];
    } });
  };

  var isArrayBuffer = function (it) {
    var klass;
    return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
  };

  var isTypedArrayIndex = function (target, key) {
    return isTypedArray(target)
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };

  var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
    return isTypedArrayIndex(target, key = toPrimitive(key, true))
      ? createPropertyDescriptor(2, target[key])
      : nativeGetOwnPropertyDescriptor(target, key);
  };

  var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
    if (isTypedArrayIndex(target, key = toPrimitive(key, true))
      && isObject(descriptor)
      && has(descriptor, 'value')
      && !has(descriptor, 'get')
      && !has(descriptor, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !descriptor.configurable
      && (!has(descriptor, 'writable') || descriptor.writable)
      && (!has(descriptor, 'enumerable') || descriptor.enumerable)
    ) {
      target[key] = descriptor.value;
      return target;
    } return nativeDefineProperty(target, key, descriptor);
  };

  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype, 'buffer');
    addGetter(TypedArrayPrototype, 'byteOffset');
    addGetter(TypedArrayPrototype, 'byteLength');
    addGetter(TypedArrayPrototype, 'length');
  }

  $export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });

  // eslint-disable-next-line max-statements
  module.exports = function (TYPE, BYTES, wrapper, CLAMPED) {
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + TYPE;
    var SETTER = 'set' + TYPE;
    var NativeTypedArrayConstructor = global[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};

    var getter = function (that, index) {
      var data = getInternalState(that);
      return data.view[GETTER](index * BYTES + data.byteOffset, true);
    };

    var setter = function (that, index, value) {
      var data = getInternalState(that);
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
    };

    var addElement = function (that, index) {
      nativeDefineProperty(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };

    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer(byteLength);
        } else if (isArrayBuffer(data)) {
          buffer = data;
          byteOffset = toOffset(offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data)) {
          return fromList(TypedArrayConstructor, data);
        } else {
          return typedArrayFrom.call(TypedArrayConstructor, data);
        }
        setInternalState(that, {
          buffer: buffer,
          byteOffset: byteOffset,
          byteLength: byteLength,
          length: length,
          view: new DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
      TypedArrayConstructor = wrapper(function (that, data, typedArrayOffset, $length) {
        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
        if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
        if (isArrayBuffer(data)) return $length !== undefined
          ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
          : typedArrayOffset !== undefined
            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
            : new NativeTypedArrayConstructor(data);
        if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
        return typedArrayFrom.call(TypedArrayConstructor, data);
      });

      if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray);
      arrayForEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
        if (!(key in TypedArrayConstructor)) hide(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }

    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      hide(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
    }

    if (TYPED_ARRAY_TAG) hide(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);

    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

    $export({
      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
    }, exported);

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      hide(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }

    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      hide(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }

    setSpecies(CONSTRUCTOR_NAME);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/typed-array-from.js":
/*!****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/typed-array-from.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "../enact-ui-tests/node_modules/core-js/internals/get-iterator-method.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "../enact-ui-tests/node_modules/core-js/internals/is-array-iterator-method.js");
var bind = __webpack_require__(/*! ../internals/bind-context */ "../enact-ui-tests/node_modules/core-js/internals/bind-context.js");
var aTypedArrayConstructor = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js").aTypedArrayConstructor;

module.exports = function from(source /* , mapfn, thisArg */) {
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var i, length, result, step, iterator;
  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = iteratorMethod.call(O);
    O = [];
    while (!(step = iterator.next()).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind(mapfn, arguments[2], 2);
  }
  length = toLength(O.length);
  result = new (aTypedArrayConstructor(this))(length);
  for (i = 0; length > i; i++) {
    result[i] = mapping ? mapfn(O[i], i) : O[i];
  }
  return result;
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js":
/*!*******************************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-new */
var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../enact-ui-tests/node_modules/core-js/internals/check-correctness-of-iteration.js");
var NATIVE_ARRAY_BUFFER_VIEWS = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js").NATIVE_ARRAY_BUFFER_VIEWS;
var ArrayBuffer = global.ArrayBuffer;
var Int8Array = global.Int8Array;

module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
  Int8Array(1);
}) || !fails(function () {
  new Int8Array(-1);
}) || !checkCorrectnessOfIteration(function (iterable) {
  new Int8Array();
  new Int8Array(null);
  new Int8Array(1.5);
  new Int8Array(iterable);
}, true) || fails(function () {
  // Safari 11 bug
  return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1;
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/uid.js":
/*!***************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/uid.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/user-agent.js":
/*!**********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/user-agent.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/validate-set-prototype-of-arguments.js":
/*!***********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/validate-set-prototype-of-arguments.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");

module.exports = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/validate-string-method-arguments.js":
/*!********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/validate-string-method-arguments.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../enact-ui-tests/node_modules/core-js/internals/is-regexp.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) {
    throw TypeError('String.prototype.' + NAME + " doesn't accept regex");
  } return String(requireObjectCoercible(that));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared */ "../enact-ui-tests/node_modules/core-js/internals/shared.js")('wks');
var uid = __webpack_require__(/*! ../internals/uid */ "../enact-ui-tests/node_modules/core-js/internals/uid.js");
var Symbol = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").Symbol;
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "../enact-ui-tests/node_modules/core-js/internals/native-symbol.js");

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/whitespaces.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/whitespaces.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/internals/wrapped-well-known-symbol.js":
/*!*************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/internals/wrapped-well-known-symbol.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js");


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.array.flat-map.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.array.flat-map.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "../enact-ui-tests/node_modules/core-js/internals/flatten-into-array.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../enact-ui-tests/node_modules/core-js/internals/a-function.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../enact-ui-tests/node_modules/core-js/internals/array-species-create.js");

// `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Array', proto: true }, {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.array.flat.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.array.flat.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "../enact-ui-tests/node_modules/core-js/internals/flatten-into-array.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "../enact-ui-tests/node_modules/core-js/internals/array-species-create.js");

// `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Array', proto: true }, {
  flat: function flat(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat-map.js":
/*!***************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat-map.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
__webpack_require__(/*! ../internals/add-to-unscopables */ "../enact-ui-tests/node_modules/core-js/internals/add-to-unscopables.js")('flatMap');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.array.unscopables.flat.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
__webpack_require__(/*! ../internals/add-to-unscopables */ "../enact-ui-tests/node_modules/core-js/internals/add-to-unscopables.js")('flat');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.math.hypot.js":
/*!***********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.math.hypot.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var abs = Math.abs;
var sqrt = Math.sqrt;

// `Math.hypot` method
// https://tc39.github.io/ecma262/#sec-math.hypot
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Math', stat: true }, {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.number.to-fixed.js":
/*!****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.number.to-fixed.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var thisNumberValue = __webpack_require__(/*! ../internals/this-number-value */ "../enact-ui-tests/node_modules/core-js/internals/this-number-value.js");
var repeat = __webpack_require__(/*! ../internals/string-repeat */ "../enact-ui-tests/node_modules/core-js/internals/string-repeat.js");
var nativeToFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};

var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};

var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call('0', 7 - t.length) + t;
    }
  } return s;
};

var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};

var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

// `Number.prototype.toFixed` method
// https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Number', proto: true, forced: nativeToFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js")(function () {
  // V8 ~ Android 4.3-
  nativeToFixed.call({});
}) }, {
  toFixed: function toFixed(fractionDigits) {
    var x = thisNumberValue(this);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = '0';
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError('Incorrect fraction digits');
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call('0', f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call('0', f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.object.assign.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.object.assign.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var assign = __webpack_require__(/*! ../internals/object-assign */ "../enact-ui-tests/node_modules/core-js/internals/object-assign.js");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Object', stat: true, forced: Object.assign !== assign }, { assign: assign });


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.object.from-entries.js":
/*!********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.object.from-entries.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var iterate = __webpack_require__(/*! ../internals/iterate */ "../enact-ui-tests/node_modules/core-js/internals/iterate.js");
var createProperty = __webpack_require__(/*! ../internals/create-property */ "../enact-ui-tests/node_modules/core-js/internals/create-property.js");

// `Object.fromEntries` method
// https://github.com/tc39/proposal-object-from-entries
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Object', stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function (k, v) {
      createProperty(obj, k, v);
    }, undefined, true);
    return obj;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.promise.finally.js":
/*!****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.promise.finally.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "../enact-ui-tests/node_modules/core-js/internals/get-built-in.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../enact-ui-tests/node_modules/core-js/internals/species-constructor.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../enact-ui-tests/node_modules/core-js/internals/promise-resolve.js");

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Promise', proto: true, real: true }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.promise.js":
/*!********************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.promise.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var PROMISE = 'Promise';
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "../enact-ui-tests/node_modules/core-js/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var $export = __webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "../enact-ui-tests/node_modules/core-js/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "../enact-ui-tests/node_modules/core-js/internals/an-instance.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "../enact-ui-tests/node_modules/core-js/internals/classof-raw.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "../enact-ui-tests/node_modules/core-js/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "../enact-ui-tests/node_modules/core-js/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../enact-ui-tests/node_modules/core-js/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "../enact-ui-tests/node_modules/core-js/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "../enact-ui-tests/node_modules/core-js/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "../enact-ui-tests/node_modules/core-js/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "../enact-ui-tests/node_modules/core-js/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "../enact-ui-tests/node_modules/core-js/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "../enact-ui-tests/node_modules/core-js/internals/perform.js");
var userAgent = __webpack_require__(/*! ../internals/user-agent */ "../enact-ui-tests/node_modules/core-js/internals/user-agent.js");
var SPECIES = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('species');
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "../enact-ui-tests/node_modules/core-js/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../enact-ui-tests/node_modules/core-js/internals/is-forced.js");
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = global[PROMISE];
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = global.fetch;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED = isForced(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var empty = function () { /* empty */ };
  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {
    exec(empty, empty);
  };
  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')
    && (!IS_PURE || promise['finally'])
    && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0
    && userAgent.indexOf('Chrome/66') === -1);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, promise, wrapper, state),
            bind(internalReject, promise, wrapper, state)
          );
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, { done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = __webpack_require__(/*! ../internals/redefine-all */ "../enact-ui-tests/node_modules/core-js/internals/redefine-all.js")(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  // wrap fetch result
  if (!IS_PURE && typeof $fetch == 'function') $export({ global: true, enumerable: true, forced: true }, {
    // eslint-disable-next-line no-unused-vars
    fetch: function fetch(input) {
      return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
    }
  });
}

$export({ global: true, wrap: true, forced: FORCED }, { Promise: PromiseConstructor });

__webpack_require__(/*! ../internals/set-to-string-tag */ "../enact-ui-tests/node_modules/core-js/internals/set-to-string-tag.js")(PromiseConstructor, PROMISE, false, true);
__webpack_require__(/*! ../internals/set-species */ "../enact-ui-tests/node_modules/core-js/internals/set-species.js")(PROMISE);

PromiseWrapper = __webpack_require__(/*! ../internals/path */ "../enact-ui-tests/node_modules/core-js/internals/path.js")[PROMISE];

// statics
$export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$export({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      iterate(iterable, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.reflect.set.js":
/*!************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.reflect.set.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js");
var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-descriptor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "../enact-ui-tests/node_modules/core-js/internals/object-get-prototype-of.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "../enact-ui-tests/node_modules/core-js/internals/create-property-descriptor.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");

// `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'Reflect', stat: true }, { set: set });


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.constructor.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.regexp.constructor.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var MATCH = __webpack_require__(/*! ../internals/well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/well-known-symbol.js")('match');
var global = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "../enact-ui-tests/node_modules/core-js/internals/is-forced.js");
var inheritIfRequired = __webpack_require__(/*! ../internals/inherit-if-required */ "../enact-ui-tests/node_modules/core-js/internals/inherit-if-required.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;
var getOwnPropertyNames = __webpack_require__(/*! ../internals/object-get-own-property-names */ "../enact-ui-tests/node_modules/core-js/internals/object-get-own-property-names.js").f;
var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../enact-ui-tests/node_modules/core-js/internals/is-regexp.js");
var getFlags = __webpack_require__(/*! ../internals/regexp-flags */ "../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED = isForced('RegExp', DESCRIPTORS && (!CORRECT_NEW || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var i = 0;
  while (i < keys.length) proxy(keys[i++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
__webpack_require__(/*! ../internals/set-species */ "../enact-ui-tests/node_modules/core-js/internals/set-species.js")('RegExp');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.flags.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.regexp.flags.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `RegExp.prototype.flags` getter
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
if (__webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js") && /./g.flags != 'g') {
  __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f(RegExp.prototype, 'flags', {
    configurable: true,
    get: __webpack_require__(/*! ../internals/regexp-flags */ "../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js")
  });
}


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.regexp.to-string.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.regexp.to-string.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var flags = __webpack_require__(/*! ../internals/regexp-flags */ "../enact-ui-tests/node_modules/core-js/internals/regexp-flags.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var TO_STRING = 'toString';
var nativeToString = /./[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  __webpack_require__(/*! ../internals/redefine */ "../enact-ui-tests/node_modules/core-js/internals/redefine.js")(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? flags.call(R) : undefined);
  }, { unsafe: true });
}


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.ends-with.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.ends-with.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var validateArguments = __webpack_require__(/*! ../internals/validate-string-method-arguments */ "../enact-ui-tests/node_modules/core-js/internals/validate-string-method-arguments.js");
var ENDS_WITH = 'endsWith';
var nativeEndsWith = ''[ENDS_WITH];
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../enact-ui-tests/node_modules/core-js/internals/correct-is-regexp-logic.js")(ENDS_WITH);

// `String.prototype.endsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.endswith
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = validateArguments(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : min(toLength(endPosition), len);
    var search = String(searchString);
    return nativeEndsWith
      ? nativeEndsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.includes.js":
/*!****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.includes.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var validateArguments = __webpack_require__(/*! ../internals/validate-string-method-arguments */ "../enact-ui-tests/node_modules/core-js/internals/validate-string-method-arguments.js");
var INCLUDES = 'includes';

var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../enact-ui-tests/node_modules/core-js/internals/correct-is-regexp-logic.js")(INCLUDES);

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~validateArguments(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.match.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.match.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../enact-ui-tests/node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js");

// @@match logic
__webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js")(
  'match',
  1,
  function (MATCH, nativeMatch, maybeCallNative) {
    return [
      // `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = requireObjectCoercible(this);
        var matcher = regexp == undefined ? undefined : regexp[MATCH];
        return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      },
      // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative(nativeMatch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        if (!rx.global) return regExpExec(rx, S);

        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  }
);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.replace.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.replace.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "../enact-ui-tests/node_modules/core-js/internals/to-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var toInteger = __webpack_require__(/*! ../internals/to-integer */ "../enact-ui-tests/node_modules/core-js/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../enact-ui-tests/node_modules/core-js/internals/advance-string-index.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js")(
  'replace',
  2,
  function (REPLACE, nativeReplace, maybeCallNative) {
    return [
      // `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
        return replacer !== undefined
          ? replacer.call(searchValue, O, replaceValue)
          : nativeReplace.call(String(O), searchValue, replaceValue);
      },
      // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);

        var global = rx.global;
        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }
        var results = [];
        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;

          results.push(result);
          if (!global) break;

          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;
        for (var i = 0; i < results.length; i++) {
          result = results[i];

          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = [];
          // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
          var namedCaptures = result.groups;
          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }
          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }
        return accumulatedResult + S.slice(nextSourcePosition);
      }
    ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
    function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length;
      var m = captures.length;
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures);
        symbols = SUBSTITUTION_SYMBOLS;
      }
      return nativeReplace.call(replacement, symbols, function (match, ch) {
        var capture;
        switch (ch.charAt(0)) {
          case '$': return '$';
          case '&': return matched;
          case '`': return str.slice(0, position);
          case "'": return str.slice(tailPos);
          case '<':
            capture = namedCaptures[ch.slice(1, -1)];
            break;
          default: // \d\d?
            var n = +ch;
            if (n === 0) return match;
            if (n > m) {
              var f = floor(n / 10);
              if (f === 0) return match;
              if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
              return match;
            }
            capture = captures[n - 1];
        }
        return capture === undefined ? '' : capture;
      });
    }
  }
);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.search.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.search.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
var sameValue = __webpack_require__(/*! ../internals/same-value */ "../enact-ui-tests/node_modules/core-js/internals/same-value.js");
var regExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js");

// @@search logic
__webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js")(
  'search',
  1,
  function (SEARCH, nativeSearch, maybeCallNative) {
    return [
      // `String.prototype.search` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.search
      function search(regexp) {
        var O = requireObjectCoercible(this);
        var searcher = regexp == undefined ? undefined : regexp[SEARCH];
        return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
      },
      // `RegExp.prototype[@@search]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
      function (regexp) {
        var res = maybeCallNative(nativeSearch, regexp, this);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);

        var previousLastIndex = rx.lastIndex;
        if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
        var result = regExpExec(rx, S);
        if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
        return result === null ? -1 : result.index;
      }
    ];
  }
);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.split.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.split.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(/*! ../internals/is-regexp */ "../enact-ui-tests/node_modules/core-js/internals/is-regexp.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "../enact-ui-tests/node_modules/core-js/internals/an-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "../enact-ui-tests/node_modules/core-js/internals/require-object-coercible.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "../enact-ui-tests/node_modules/core-js/internals/species-constructor.js");
var advanceStringIndex = __webpack_require__(/*! ../internals/advance-string-index */ "../enact-ui-tests/node_modules/core-js/internals/advance-string-index.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var callRegExpExec = __webpack_require__(/*! ../internals/regexp-exec-abstract */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec-abstract.js");
var regexpExec = __webpack_require__(/*! ../internals/regexp-exec */ "../enact-ui-tests/node_modules/core-js/internals/regexp-exec.js");
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
__webpack_require__(/*! ../internals/fix-regexp-well-known-symbol-logic */ "../enact-ui-tests/node_modules/core-js/internals/fix-regexp-well-known-symbol-logic.js")(
  'split',
  2,
  function (SPLIT, nativeSplit, maybeCallNative) {
    var internalSplit;
    if (
      'abbc'.split(/(b)*/)[1] == 'c' ||
      'test'.split(/(?:)/, -1).length != 4 ||
      'ab'.split(/(?:ab)*/).length != 2 ||
      '.'.split(/(.?)(.?)/).length != 4 ||
      '.'.split(/()()/).length > 1 ||
      ''.split(/.?/).length
    ) {
      // based on es5-shim implementation, need to rework it
      internalSplit = function (separator, limit) {
        var string = String(requireObjectCoercible(this));
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (separator === undefined) return [string];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) {
          return nativeSplit.call(string, separator, lim);
        }
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
                    (separator.multiline ? 'm' : '') +
                    (separator.unicode ? 'u' : '') +
                    (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var match, lastIndex, lastLength;
        while (match = regexpExec.call(separatorCopy, string)) {
          lastIndex = separatorCopy.lastIndex;
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
            lastLength = match[0].length;
            lastLastIndex = lastIndex;
            if (output.length >= lim) break;
          }
          if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
        }
        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output.length > lim ? output.slice(0, lim) : output;
      };
    // Chakra, V8
    } else if ('0'.split(undefined, 0).length) {
      internalSplit = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
      };
    } else internalSplit = nativeSplit;

    return [
      // `String.prototype.split` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.split
      function split(separator, limit) {
        var O = requireObjectCoercible(this);
        var splitter = separator == undefined ? undefined : separator[SPLIT];
        return splitter !== undefined
          ? splitter.call(separator, O, limit)
          : internalSplit.call(String(O), separator, limit);
      },
      // `RegExp.prototype[@@split]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
      //
      // NOTE: This cannot be properly polyfilled in engines that don't support
      // the 'y' flag.
      function (regexp, limit) {
        var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
        if (res.done) return res.value;

        var rx = anObject(regexp);
        var S = String(this);
        var C = speciesConstructor(rx, RegExp);

        var unicodeMatching = rx.unicode;
        var flags = (rx.ignoreCase ? 'i' : '') +
                    (rx.multiline ? 'm' : '') +
                    (rx.unicode ? 'u' : '') +
                    (SUPPORTS_Y ? 'y' : 'g');

        // ^(? + rx + ) is needed, in combination with some S slicing, to
        // simulate the 'y' flag.
        var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
        var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
        if (lim === 0) return [];
        if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
        var p = 0;
        var q = 0;
        var A = [];
        while (q < S.length) {
          splitter.lastIndex = SUPPORTS_Y ? q : 0;
          var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
          var e;
          if (
            z === null ||
            (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
          ) {
            q = advanceStringIndex(S, q, unicodeMatching);
          } else {
            A.push(S.slice(p, q));
            if (A.length === lim) return A;
            for (var i = 1; i <= z.length - 1; i++) {
              A.push(z[i]);
              if (A.length === lim) return A;
            }
            q = p = e;
          }
        }
        A.push(S.slice(p));
        return A;
      }
    ];
  },
  !SUPPORTS_Y
);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.starts-with.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.starts-with.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toLength = __webpack_require__(/*! ../internals/to-length */ "../enact-ui-tests/node_modules/core-js/internals/to-length.js");
var validateArguments = __webpack_require__(/*! ../internals/validate-string-method-arguments */ "../enact-ui-tests/node_modules/core-js/internals/validate-string-method-arguments.js");
var STARTS_WITH = 'startsWith';
var CORRECT_IS_REGEXP_LOGIC = __webpack_require__(/*! ../internals/correct-is-regexp-logic */ "../enact-ui-tests/node_modules/core-js/internals/correct-is-regexp-logic.js")(STARTS_WITH);
var nativeStartsWith = ''[STARTS_WITH];

// `String.prototype.startsWith` method
// https://tc39.github.io/ecma262/#sec-string.prototype.startswith
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = validateArguments(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return nativeStartsWith
      ? nativeStartsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.trim-end.js":
/*!****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.trim-end.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalStringTrim = __webpack_require__(/*! ../internals/string-trim */ "../enact-ui-tests/node_modules/core-js/internals/string-trim.js");
var FORCED = __webpack_require__(/*! ../internals/forced-string-trim-method */ "../enact-ui-tests/node_modules/core-js/internals/forced-string-trim-method.js")('trimEnd');

var trimEnd = FORCED ? function trimEnd() {
  return internalStringTrim(this, 2);
} : ''.trimEnd;

// `String.prototype.{ trimEnd, trimRight }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'String', proto: true, forced: FORCED }, {
  trimEnd: trimEnd,
  trimRight: trimEnd
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.string.trim-start.js":
/*!******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.string.trim-start.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var internalStringTrim = __webpack_require__(/*! ../internals/string-trim */ "../enact-ui-tests/node_modules/core-js/internals/string-trim.js");
var FORCED = __webpack_require__(/*! ../internals/forced-string-trim-method */ "../enact-ui-tests/node_modules/core-js/internals/forced-string-trim-method.js")('trimStart');

var trimStart = FORCED ? function trimStart() {
  return internalStringTrim(this, 1);
} : ''.trimStart;

// `String.prototype.{ trimStart, trimLeft }` methods
// https://github.com/tc39/ecmascript-string-left-right-trim
__webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ target: 'String', proto: true, forced: FORCED }, {
  trimStart: trimStart,
  trimLeft: trimStart
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.async-iterator.js":
/*!**********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.async-iterator.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Symbol.asyncIterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
__webpack_require__(/*! ../internals/define-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js")('asyncIterator');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.description.js":
/*!*******************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.description.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "../enact-ui-tests/node_modules/core-js/internals/descriptors.js");
var has = __webpack_require__(/*! ../internals/has */ "../enact-ui-tests/node_modules/core-js/internals/has.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "../enact-ui-tests/node_modules/core-js/internals/is-object.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "../enact-ui-tests/node_modules/core-js/internals/object-define-property.js").f;
var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "../enact-ui-tests/node_modules/core-js/internals/copy-constructor-properties.js");
var NativeSymbol = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  __webpack_require__(/*! ../internals/export */ "../enact-ui-tests/node_modules/core-js/internals/export.js")({ global: true, forced: true }, { Symbol: SymbolWrapper });
}


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.match.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.match.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Symbol.match` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.match
__webpack_require__(/*! ../internals/define-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js")('match');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.replace.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.replace.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Symbol.replace` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.replace
__webpack_require__(/*! ../internals/define-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js")('replace');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.search.js":
/*!**************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.search.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Symbol.search` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.search
__webpack_require__(/*! ../internals/define-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js")('search');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.symbol.split.js":
/*!*************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.symbol.split.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Symbol.split` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.split
__webpack_require__(/*! ../internals/define-well-known-symbol */ "../enact-ui-tests/node_modules/core-js/internals/define-well-known-symbol.js")('split');


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float32-array.js":
/*!**************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float32-array.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Float32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float64-array.js":
/*!**************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.float64-array.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Float64Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.from.js":
/*!*****************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.from.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../enact-ui-tests/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js");
var typedArrayFrom = __webpack_require__(/*! ../internals/typed-array-from */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-from.js");

// `%TypedArray%.from` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.from
ArrayBufferViewCore.exportStatic('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int16-array.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int16-array.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Int16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int32-array.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int32-array.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Int32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int8-array.js":
/*!***********************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.int8-array.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Int8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.of.js":
/*!***************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.of.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = __webpack_require__(/*! ../internals/typed-arrays-constructors-requires-wrappers */ "../enact-ui-tests/node_modules/core-js/internals/typed-arrays-constructors-requires-wrappers.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js");
var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor;

// `%TypedArray%.of` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.of
ArrayBufferViewCore.exportStatic('of', function of(/* ...items */) {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index) result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.to-locale-string.js":
/*!*****************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.to-locale-string.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Int8Array = __webpack_require__(/*! ../internals/global */ "../enact-ui-tests/node_modules/core-js/internals/global.js").Int8Array;
var fails = __webpack_require__(/*! ../internals/fails */ "../enact-ui-tests/node_modules/core-js/internals/fails.js");
var ArrayBufferViewCore = __webpack_require__(/*! ../internals/array-buffer-view-core */ "../enact-ui-tests/node_modules/core-js/internals/array-buffer-view-core.js");
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var arrayToLocaleString = [].toLocaleString;
var arraySlice = [].slice;

// iOS Safari 6.x fails here
var TO_LOCALE_BUG = !!Int8Array && fails(function () {
  arrayToLocaleString.call(new Int8Array(1));
});
var FORCED = fails(function () {
  return [1, 2].toLocaleString() != new Int8Array([1, 2]).toLocaleString();
}) || !fails(function () {
  Int8Array.prototype.toLocaleString.call([1, 2]);
});

// `%TypedArray%.prototype.toLocaleString` method
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
ArrayBufferViewCore.exportProto('toLocaleString', function toLocaleString() {
  return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(aTypedArray(this)) : aTypedArray(this), arguments);
}, FORCED);


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint16-array.js":
/*!*************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint16-array.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Uint16Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint32-array.js":
/*!*************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint32-array.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Uint32Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-array.js":
/*!************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-array.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Uint8Array` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js":
/*!********************************************************************************************!*\
  !*** ../enact-ui-tests/node_modules/core-js/modules/es.typed-array.uint8-clamped-array.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// `Uint8ClampedArray` constructor
// https://tc39.github.io/ecma262/#sec-typedarray-objects
__webpack_require__(/*! ../internals/typed-array-constructor */ "../enact-ui-tests/node_modules/core-js/internals/typed-array-constructor.js")('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),

/***/ "./AgateDecorator/AgateDecorator.js":
/*!******************************************!*\
  !*** ./AgateDecorator/AgateDecorator.js ***!
  \******************************************/
/*! exports provided: default, AgateDecorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgateDecorator", function() { return AgateDecorator; });
/* harmony import */ var _enact_core_keymap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @enact/core/keymap */ "@enact/core/keymap");
/* harmony import */ var _enact_core_keymap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enact_core_keymap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @enact/core/kind */ "@enact/core/kind");
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_enact_core_kind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _enact_core_hoc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @enact/core/hoc */ "@enact/core/hoc");
/* harmony import */ var _enact_core_hoc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_enact_core_hoc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _enact_i18n_I18nDecorator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @enact/i18n/I18nDecorator */ "@enact/i18n/I18nDecorator");
/* harmony import */ var _enact_i18n_I18nDecorator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_enact_i18n_I18nDecorator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _enact_ui_resolution__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @enact/ui/resolution */ "@enact/ui/resolution");
/* harmony import */ var _enact_ui_resolution__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_resolution__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _enact_ui_FloatingLayer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @enact/ui/FloatingLayer */ "@enact/ui/FloatingLayer");
/* harmony import */ var _enact_ui_FloatingLayer__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_FloatingLayer__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _enact_spotlight_SpotlightRootDecorator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @enact/spotlight/SpotlightRootDecorator */ "@enact/spotlight/SpotlightRootDecorator");
/* harmony import */ var _enact_spotlight_SpotlightRootDecorator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_enact_spotlight_SpotlightRootDecorator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var color_convert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! color-convert */ "./node_modules/color-convert/index.js");
/* harmony import */ var color_convert__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(color_convert__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Skinnable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Skinnable */ "./Skinnable/Skinnable.js");
/* harmony import */ var _screenTypes_json__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./screenTypes.json */ "./AgateDecorator/screenTypes.json");
var _screenTypes_json__WEBPACK_IMPORTED_MODULE_12___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./screenTypes.json */ "./AgateDecorator/screenTypes.json", 1);
/* harmony import */ var _AgateDecorator_module_less__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./AgateDecorator.module.less */ "./AgateDecorator/AgateDecorator.module.less");
/* harmony import */ var _AgateDecorator_module_less__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_AgateDecorator_module_less__WEBPACK_IMPORTED_MODULE_13__);
var _jsxFileName = "/Users/RyanDuffy/dev/agate/AgateDecorator/AgateDecorator.js";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Applies Agate specific styling and behaviors.
 *
 * @module agate/AgateDecorator
 * @exports AgateDecorator
 */














/**
 * Default config for {@link agate/AgateDecorator.AgateDecorator}.
 *
 * @memberof agate/AgateDecorator.AgateDecorator
 * @hocconfig
 */

const defaultConfig =
/** @lends agate/AgateDecorator.AgateDecorator.defaultConfig */
{
  /**
   * Enables customization of a skin's highlight and accent color.
   *
   * @type {Boolean}
   * @default true
   * @public
   */
  customSkin: true,

  /**
   * Enables a floating layer for popup components.
   *
   * If `false`, app will be responsible for applying the decorator.
   *
   * @type {Boolean}
   * @default true
   * @see {@link ui/FloatingLayer.FloatingLayerDecorator}
   * @public
   */
  float: true,

  /**
   * Applies I18nDecorator.
   *
   * If `false`, app will be responsible for applying the decorator.
   *
   * @type {Boolean}
   * @default true
   * @see {@link i18n/I18nDecorator}
   * @public
   */
  i18n: true,

  /**
   * Disables setting spotlight focus on first render.
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  noAutoFocus: false,

  /**
   * Enables overlay mode (no background color will be applied).
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  overlay: false,

  /**
   * Override the resolution independence settings.
   *
   * @type {Object}
   * @see {@link ui/resolution}
   * @public
   */
  ri: {
    screenTypes: _screenTypes_json__WEBPACK_IMPORTED_MODULE_12__
  },

  /**
   * Applies skinning support.
   *
   * @type {Boolean}
   * @default true
   * @see {@link agate/Skinnable}
   * @public
   */
  skin: true,

  /**
   * Applies spotlight decorator.
   *
   * If `false`, app will be responsible for applying the decorator.
   *
   * @type {Boolean}
   * @default true
   * @see {@link spotlight/SpotlightRootDecorator}
   * @public
   */
  spotlight: true
}; // TODO: If this will be public it should be documented or perhaps the props
// added to `AgateDecorator`

const CustomizableSkinStyle = _enact_core_kind__WEBPACK_IMPORTED_MODULE_2___default()({
  name: 'CustomizableSkinStyle',
  propTypes: {
    className: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string.isRequired,

    /**
     * A custom accent color, as a hex string.
     *
     * @memberof agate/AgateDecorator.AgateDecorator.prototype
     * @type {String}
     * @default '#8b7efe'
     * @public
     */
    accent: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,

    /**
     * A custom highlight color, as a hex string.
     *
     * @memberof agate/AgateDecorator.AgateDecorator.prototype
     * @type {String}
     * @default '#c6c0fe'
     * @public
     */
    highlight: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
  },
  // TODO: Consider allowing `null` and dropping this override completely
  defaultProps: {
    accent: '#8b7efe',
    highlight: '#c6c0fe'
  },
  computed: {
    cssRules: (_ref) => {
      let {
        className,
        accent,
        highlight
      } = _ref;
      const accentObj = color_convert__WEBPACK_IMPORTED_MODULE_10___default.a.hex.hsl(accent);
      const highlightObj = color_convert__WEBPACK_IMPORTED_MODULE_10___default.a.hex.hsl(highlight);
      const style = {
        '--agate-accent-color': accent,
        '--agate-accent-h': accentObj[0],
        '--agate-accent-s': accentObj[1] + '%',
        '--agate-accent-l': accentObj[2] + '%',
        '--agate-highlight-color': highlight,
        '--agate-highlight-h': highlightObj[0],
        '--agate-highlight-s': highlightObj[1] + '%',
        '--agate-highlight-l': highlightObj[2] + '%'
      };
      let styleRules = '';

      for (const rule in style) {
        styleRules += "\t".concat(rule, ": ").concat(style[rule], ";\n");
      }

      return ".".concat(className, " {\n").concat(styleRules, "}\n");
    }
  },
  render: (_ref2) => {
    let {
      cssRules
    } = _ref2,
        rest = _objectWithoutProperties(_ref2, ["cssRules"]);

    delete rest.className;
    return cssRules ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("style", Object.assign({
      type: "text/css"
    }, rest, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 178
      },
      __self: undefined
    }), cssRules) : null;
  }
});
/**
 * {@link agate/AgateDecorator.AgateDecorator} is a Higher-order Component that applies
 * Agate theming to an application. It also applies
 * [floating layer]{@link ui/FloatingLayer.FloatingLayerDecorator},
 * [resolution independence]{@link ui/resolution.ResolutionDecorator},
 * [skin support]{@link ui/Skinnable}, [spotlight]{@link spotlight.SpotlightRootDecorator}, and
 * [internationalization support]{@link i18n/I18nDecorator.I18nDecorator}. It is meant to be applied to
 * the root element of an app.
 *
 * [Skins]{@link ui/Skinnable} provide a way to change the coloration of your app. The currently
 * supported skins for Agate are "agate" (the default, dark skin) and "agate-light".
 * Use the `skin` property to assign a skin. Ex: `<DecoratedApp skin="light" />`
 *
 * @class AgateDecorator
 * @memberof agate/AgateDecorator
 * @mixes ui/FloatingLayer.FloatingLayerDecorator
 * @mixes ui/resolution.ResolutionDecorator
 * @mixes spotlight/SpotlightRootDecorator.SpotlightRootDecorator
 * @mixes agate/Skinnable.Skinnable
 * @hoc
 * @public
 */

const AgateDecorator = _enact_core_hoc__WEBPACK_IMPORTED_MODULE_3___default()(defaultConfig, (config, Wrapped) => {
  var _class, _temp;

  // TODO: Document props passable to hoc ()
  const {
    customSkin,
    float,
    i18n,
    noAutoFocus,
    overlay,
    ri,
    skin,
    spotlight
  } = config;
  const bgClassName = classnames__WEBPACK_IMPORTED_MODULE_1___default()('enact-fit', {
    [_AgateDecorator_module_less__WEBPACK_IMPORTED_MODULE_13___default.a.bg]: !overlay
  });
  let App = Wrapped;
  if (float) App = Object(_enact_ui_FloatingLayer__WEBPACK_IMPORTED_MODULE_8__["FloatingLayerDecorator"])({
    wrappedClassName: bgClassName
  }, App);
  if (ri) App = Object(_enact_ui_resolution__WEBPACK_IMPORTED_MODULE_7__["ResolutionDecorator"])(ri, App);
  if (i18n) App = _enact_i18n_I18nDecorator__WEBPACK_IMPORTED_MODULE_4___default()(App);
  if (spotlight) App = _enact_spotlight_SpotlightRootDecorator__WEBPACK_IMPORTED_MODULE_9___default()({
    noAutoFocus
  }, App);
  if (skin) App = Object(_Skinnable__WEBPACK_IMPORTED_MODULE_11__["default"])({
    defaultSkin: 'gallium'
  }, App); // add webOS-specific key maps

  Object(_enact_core_keymap__WEBPACK_IMPORTED_MODULE_0__["addAll"])({
    cancel: 461,
    pointerHide: 1537,
    pointerShow: 1536
  });
  const Decorator = (_temp = _class = class Decorator extends react__WEBPACK_IMPORTED_MODULE_5___default.a.Component {
    render() {
      const _this$props = this.props,
            {
        accent,
        className,
        highlight
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, ["accent", "className", "highlight"]);

      const customizableSkinClassName = 'agate-customized-skin';
      const allClassNames = classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, 'enact-unselectable', bgClassName, _AgateDecorator_module_less__WEBPACK_IMPORTED_MODULE_13___default.a.root, {
        [customizableSkinClassName]: customSkin
      });
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 250
        },
        __self: this
      }, customSkin ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(CustomizableSkinStyle, {
        className: customizableSkinClassName,
        accent: accent,
        highlight: highlight,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 251
        },
        __self: this
      }) : null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(App, Object.assign({}, rest, {
        className: allClassNames,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 252
        },
        __self: this
      })));
    }

  }, _class.displayName = 'AgateDecorator', _class.propTypes = {
    accent: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
    highlight: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string
  }, _temp);
  return Decorator;
});
/* harmony default export */ __webpack_exports__["default"] = (AgateDecorator);


/***/ }),

/***/ "./AgateDecorator/AgateDecorator.module.less":
/*!***************************************************!*\
  !*** ./AgateDecorator/AgateDecorator.module.less ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"root":"AgateDecorator_AgateDecorator_root","bg":"AgateDecorator_AgateDecorator_bg"};

/***/ }),

/***/ "./AgateDecorator/screenTypes.json":
/*!*****************************************!*\
  !*** ./AgateDecorator/screenTypes.json ***!
  \*****************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, default */
/***/ (function(module) {

module.exports = [{"name":"iphone","pxPerRem":8,"width":812,"height":375,"aspectRatioName":"iphone"},{"name":"qtrfhd","pxPerRem":12,"width":960,"height":540,"aspectRatioName":"hdtv"},{"name":"hd","pxPerRem":16,"width":1280,"height":720,"aspectRatioName":"hdtv"},{"name":"fhd","pxPerRem":24,"width":1920,"height":1080,"aspectRatioName":"hdtv","base":true},{"name":"uhd","pxPerRem":48,"width":3840,"height":2160,"aspectRatioName":"hdtv"},{"name":"uhd2","pxPerRem":96,"width":7680,"height":4320,"aspectRatioName":"hdtv"}];

/***/ }),

/***/ "./Button/Button.js":
/*!**************************!*\
  !*** ./Button/Button.js ***!
  \**************************/
/*! exports provided: default, Button, ButtonBase, ButtonDecorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonBase", function() { return ButtonBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonDecorator", function() { return ButtonDecorator; });
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @enact/core/kind */ "@enact/core/kind");
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enact_core_kind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enact_core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @enact/core/util */ "@enact/core/util");
/* harmony import */ var _enact_core_util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_enact_core_util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enact_spotlight_Spottable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @enact/spotlight/Spottable */ "@enact/spotlight/Spottable");
/* harmony import */ var _enact_spotlight_Spottable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_enact_spotlight_Spottable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _enact_ui_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @enact/ui/Button */ "@enact/ui/Button");
/* harmony import */ var _enact_ui_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @enact/ui/internal/Pure */ "@enact/ui/internal/Pure");
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ramda_src_compose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ramda/src/compose */ "./node_modules/ramda/src/compose.js");
/* harmony import */ var ramda_src_compose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ramda_src_compose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Icon */ "./Icon/Icon.js");
/* harmony import */ var _Skinnable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Skinnable */ "./Skinnable/Skinnable.js");
/* harmony import */ var _Button_module_less__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Button.module.less */ "./Button/Button.module.less");
/* harmony import */ var _Button_module_less__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_Button_module_less__WEBPACK_IMPORTED_MODULE_10__);
var _jsxFileName = "/Users/RyanDuffy/dev/agate/Button/Button.js";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Agate styled button components and behaviors.
 *
 * @example
 * <Button>Hello Enact!</Button>
 *
 * @module agate/Button
 * @exports Button
 * @exports ButtonBase
 * @exports ButtonDecorator
 */








 // import {MarqueeDecorator} from '../Marquee';


 // Make a basic Icon in case we need it later. This cuts `Pure` out of icon for a small gain.

const Icon = Object(_Skinnable__WEBPACK_IMPORTED_MODULE_9__["default"])(_Icon__WEBPACK_IMPORTED_MODULE_8__["IconBase"]);
/**
 * A button component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Button]{@link agate/Button.Button}.
 *
 * @class ButtonBase
 * @memberof agate/Button
 * @extends ui/Button.ButtonBase
 * @omit minWidth
 * @ui
 * @public
 */

const ButtonBase = _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default()({
  name: 'Button',
  propTypes:
  /** @lends agate/Button.ButtonBase.prototype */
  {
    /**
     * Animate when this component renders.
     *
     * @type {Boolean}
     * @public
     */
    animateOnRender: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

    /**
     * The delay before the button is animated, in milliseconds.
     *
     * @type {Number}
     * @public
     */
    animationDelay: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number,

    /**
     * The background opacity of this button.
     *
     * Valid values are:
     * * `'opaque'`,
     * * `'lightOpaque'`, and
     * * `'transparent'`.
     *
     * @type {('opaque'|'lightOpaque'|'transparent')}
     * @public
     */
    backgroundOpacity: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['opaque', 'lightOpaque', 'transparent']),

    /**
     * A small message overlaid onto the button.
     *
     * @type {Number|String}
     * @public
     */
    badge: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string]),

    /**
     * A custom color for the badge element.
     *
     * This prop is only visible if the `badge` prop is also set.
     *
     * @type {String}
     * @public
     */
    badgeColor: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,

    /**
     * Customizes the component by mapping the supplied collection of CSS class names to the
     * corresponding internal elements and states of this component.
     *
     * The following classes are supported:
     *
     * * `button` - The root class name
     * * `bg` - The background node of the button
     * * `selected` - Applied to a `selected` button
     * * `small` - Applied to a button specifying a `size` of `'small'`
     *
     * @type {Object}
     * @public
     */
    css: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object,

    /**
     * Additional DOM nodes which may be necessary for decorating the Button.
     *
     * @type {Node}
     * @private
     */
    decoration: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.node,

    /**
     * Provides a way to call special interface attention to this button. It will be "featured"
     * in some way by the theme's visual rules.
     *
     * @type {Boolean}
     * @public
     */
    highlighted: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

    /**
     * The position of this button in relation to other buttons.
     *
     * To create a collection of buttons that appear as one entity: buttons that butt up against
     * each other. Specify where the button is in the arrangement: 'left', 'center', or 'right'.
     * This prop is not recommended for use on a lonely button with no other buttons nearby.
     * Not specifying this optional prop leaves the button behaving normally.
     *
     * @type {('left'|'center'|'right')}
     * @public
     */
    joinedPosition: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['left', 'center', 'right']),

    /**
     * Provides a way to call special interface attention to this button. It will be "featured"
     * in some way by the theme's visual rules.
     *
     * @type {Boolean}
     * @public
     */
    selected: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool,

    /**
     * The size of the button.
     *
     * @type {('smallest'|'small'|'large'|'huge')}
     * @default 'large'
     * @public
     */
    size: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['smallest', 'small', 'large', 'huge']),

    /**
     * The button type.
     *
     * Grid buttons are intended to be grouped with other related buttons.
     *
     * @type {('grid'|'standard')}
     * @default 'standard'
     * @public
     */
    type: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['grid', 'standard'])
  },
  defaultProps: {
    backgroundOpacity: 'opaque',
    iconComponent: Icon,
    size: 'large',
    type: 'standard'
  },
  styles: {
    css: _Button_module_less__WEBPACK_IMPORTED_MODULE_10___default.a,
    publicClassNames: true
  },
  computed: {
    className: (_ref) => {
      let {
        animateOnRender,
        backgroundOpacity,
        highlighted,
        joinedPosition,
        selected,
        type,
        size,
        styler
      } = _ref;
      return styler.append(backgroundOpacity, size, type, joinedPosition && 'joined' + Object(_enact_core_util__WEBPACK_IMPORTED_MODULE_1__["cap"])(joinedPosition), // If `joinedPosition` is present, prepend the word "joined" to the variable, so the classes are clearer.
      {
        animateOnRender,
        highlighted,
        selected
      });
    },
    decoration: (_ref2) => {
      let {
        badge,
        css,
        decoration: _decoration
      } = _ref2;
      if (!badge) return _decoration;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_6___default.a.Fragment, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 198
        },
        __self: undefined
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: css.badge,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 199
        },
        __self: undefined
      }, badge), _decoration);
    },
    style: (_ref3) => {
      let {
        animationDelay,
        badgeColor,
        style: _style
      } = _ref3;
      return _objectSpread({}, _style, {
        '--agate-button-animation-delay': animationDelay,
        '--agate-button-badge-bg-color': badgeColor
      });
    },
    minWidth: (_ref4) => {
      let {
        children
      } = _ref4;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.Children.count(children) === 0 || children === '';
    }
  },
  render: (_ref5) => {
    let {
      css
    } = _ref5,
        rest = _objectWithoutProperties(_ref5, ["css"]);

    delete rest.animateOnRender;
    delete rest.animationDelay;
    delete rest.backgroundOpacity;
    delete rest.badge;
    delete rest.highlighted;
    delete rest.joinedPosition;
    delete rest.selected;
    delete rest.type;
    return _enact_ui_Button__WEBPACK_IMPORTED_MODULE_3__["ButtonBase"].inline(_objectSpread({
      'data-webos-voice-intent': 'Select'
    }, rest, {
      css
    }));
  }
});
/**
 * Applies Agate specific behaviors to [Button]{@link agate/Button.ButtonBase} components.
 *
 * @hoc
 * @memberof agate/Button
 * @mixes ui/Button.ButtonDecorator
 * @mixes spotlight/Spottable.Spottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const ButtonDecorator = ramda_src_compose__WEBPACK_IMPORTED_MODULE_7___default()(_enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_4___default.a, // MarqueeDecorator({className: componentCss.marquee}),
_enact_ui_Button__WEBPACK_IMPORTED_MODULE_3__["ButtonDecorator"], _enact_spotlight_Spottable__WEBPACK_IMPORTED_MODULE_2___default.a, _Skinnable__WEBPACK_IMPORTED_MODULE_9__["default"]);
/**
 * A button component, ready to use in Agate applications.
 *
 * Usage:
 * ```
 * <Button
 * 	backgroundOpacity="translucent"
 * 	color="blue"
 * >
 * 	Press me!
 * </Button>
 * ```
 *
 * @class Button
 * @memberof agate/Button
 * @extends agate/Button.ButtonBase
 * @mixes agate/Button.ButtonDecorator
 * @ui
 * @public
 */

const Button = ButtonDecorator(ButtonBase);
/* harmony default export */ __webpack_exports__["default"] = (Button);


/***/ }),

/***/ "./Button/Button.module.less":
/*!***********************************!*\
  !*** ./Button/Button.module.less ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"button":"Button_Button_button","bg":"Button_Button_bg","client":"Button_Button_client","icon":"Button_Button_icon","badge":"Button_Button_badge","grid":"Button_Button_grid","opaque":"Button_Button_opaque","lightOpaque":"Button_Button_lightOpaque","transparent":"Button_Button_transparent","minWidth":"Button_Button_minWidth","huge":"Button_Button_huge","small":"Button_Button_small","smallest":"Button_Button_smallest","hasIcon":"Button_Button_hasIcon","animateOnRender":"Button_Button_animateOnRender","scale-bounce":"Button_Button_scale-bounce","joinedLeft":"Button_Button_joinedLeft","joinedCenter":"Button_Button_joinedCenter","joinedRight":"Button_Button_joinedRight","highlighted":"Button_Button_highlighted","selected":"Button_Button_selected"};

/***/ }),

/***/ "./Icon/Icon.js":
/*!**********************!*\
  !*** ./Icon/Icon.js ***!
  \**********************/
/*! exports provided: default, Icon, IconBase, IconDecorator, icons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconBase", function() { return IconBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconDecorator", function() { return IconDecorator; });
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @enact/core/kind */ "@enact/core/kind");
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enact_core_kind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enact_ui_Icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @enact/ui/Icon */ "@enact/ui/Icon");
/* harmony import */ var _enact_ui_Icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_Icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @enact/ui/internal/Pure */ "@enact/ui/internal/Pure");
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ramda_src_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ramda/src/compose */ "./node_modules/ramda/src/compose.js");
/* harmony import */ var ramda_src_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ramda_src_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Skinnable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Skinnable */ "./Skinnable/Skinnable.js");
/* harmony import */ var _IconList_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./IconList.js */ "./Icon/IconList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "icons", function() { return _IconList_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Icon_module_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Icon.module.less */ "./Icon/Icon.module.less");
/* harmony import */ var _Icon_module_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_Icon_module_less__WEBPACK_IMPORTED_MODULE_7__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provides Agate styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module agate/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */








/**
 * Renders an Agate-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof agate/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */

const IconBase = _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default()({
  name: 'Icon',
  propTypes:
  /** @lends agate/Icon.Icon.prototype */
  {
    /**
     * The icon content.
     *
     * May be specified as either:
     *
     * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
     * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
     * * A URL specifying path to an icon image, or
     * * An object representing a resolution independent resource (See {@link ui/resolution}).
     *
     * @type {String|Object}
     * @public
     */
    children: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object]),

    /**
     * Customizes the component by mapping the supplied collection of CSS class names to the
     * corresponding internal elements and states of this component.
     *
     * The following classes are supported:
     *
     * * `icon` - The root class name
     * * `dingbat` - Applied to dingbat icon
     * * `focus` - Applied when icon is focused
     * * `huge` - Applied to a `size='huge'` icon
     * * `small` - Applied to a `size='small'` icon
     * * `smallest` - Applied to a `size='smallest'` icon
     *
     * @type {Object}
     * @public
     */
    css: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.object,

    /**
     * The size of the icon.
     *
     * @type {('smallest'|'small'|'large'|'huge')}
     * @default 'large'
     * @public
     */
    size: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.oneOf(['smallest', 'small', 'large', 'huge']),

    /**
     * The amount of sprite "cells" in the src image.
     *
     * This property only affects image-based icons, not icon glyphs.
     *
     * @type {Number}
     * @default 1
     * @public
     */
    spriteCount: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.number
  },
  defaultProps: {
    size: 'large',
    spriteCount: 1
  },
  styles: {
    css: _Icon_module_less__WEBPACK_IMPORTED_MODULE_7___default.a
  },
  computed: {
    className: (_ref) => {
      let {
        size,
        styler
      } = _ref;
      return styler.append(size);
    },
    style: (_ref2) => {
      let {
        spriteCount,
        style: _style
      } = _ref2;
      return _objectSpread({}, _style, {
        '--agate-icon-sprite-count': spriteCount
      });
    }
  },
  render: props => {
    delete props.spriteCount;
    return _enact_ui_Icon__WEBPACK_IMPORTED_MODULE_1___default.a.inline(_objectSpread({}, props, {
      css: props.css,
      iconList: _IconList_js__WEBPACK_IMPORTED_MODULE_6__["default"]
    }));
  }
}); // Let's find a way to import this list directly, and bonus feature, render our icons in the docs
// next to their names.

/**
 * An object whose keys can be used as the child of an [Icon]{@link agate/Icon.Icon} component.
 *
 * List of Icons:
 * ```
 * circlelarge
 * squarelarge
 * triangleup
 * plus
 * minus
 * arrowup
 * arrowdown
 * arrowleftturn
 * arrowrightturn
 * arrowharpoonright
 * ellipsis
 * check
 * arrowstraightup
 * arrowuturn
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * closex
 * search
 * bluetooth2
 * bluetoothoff
 * bright1
 * bright2
 * bluetooth
 * usb
 * volume0
 * volume1
 * volume2
 * wifi
 * happyface
 * notification
 * pairing
 * user
 * calendar
 * edit
 * gallery
 * internet
 * map
 * music
 * video
 * circle
 * previous
 * pairingdisplay
 * box
 * play
 * previoustrack
 * pause
 * nexttrack
 * repeat
 * shuffle
 * error
 * setting
 * popupstop
 * accept
 * decline
 * stop
 * cancel
 * carspeaker
 * speaker
 * earphone
 * detail
 * install
 * send
 * netbook
 * pad
 * mobile
 * update
 * backapp
 * uninstall
 * rain
 * raindrops
 * raincloud
 * snow
 * cloud
 * ice
 * fog
 * sun
 * profileA1
 * profileA2
 * profileA3
 * profileA4
 * profileB1
 * profileB2
 * profileB3
 * profileB4
 * profileC1
 * profileC2
 * profileC3
 * profileC4
 * ac
 * auto
 * airmode
 * airdown
 * airright
 * airup
 * heatseatleft
 * heatseatright
 * aircirculation
 * fan
 * defrosterfront
 * defrosterback
 * airflow
 * home
 * temperature
 * compass
 * phone
 * fanoff
 * datetime
 * display
 * seatbelt
 * apps
 * climate
 * dashboard
 * expand
 * radio
 * rearscreen
 * weather
 * ```
 *
 * @name iconList
 * @memberof agate/Icon
 * @constant
 * @type {Object}
 * @public
 */

/**
 * Agate-specific behaviors to apply to [IconBase]{@link agate/Icon.IconBase}.
 *
 * @hoc
 * @memberof agate/Icon
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const IconDecorator = ramda_src_compose__WEBPACK_IMPORTED_MODULE_3___default()(_enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_2___default.a, _Skinnable__WEBPACK_IMPORTED_MODULE_5__["default"]);
/**
 * An Agate-styled icon.
 *
 * @class Icon
 * @memberof agate/Icon
 * @extends agate/Icon.IconBase
 * @mixes agate/Icon.IconDecorator
 * @ui
 * @public
 */

const Icon = IconDecorator(IconBase);
/* harmony default export */ __webpack_exports__["default"] = (Icon);


/***/ }),

/***/ "./Icon/Icon.module.less":
/*!*******************************!*\
  !*** ./Icon/Icon.module.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"icon":"Icon_Icon_icon","huge":"Icon_Icon_huge","small":"Icon_Icon_small","smallest":"Icon_Icon_smallest","dingbat":"Icon_Icon_dingbat"};

/***/ }),

/***/ "./Icon/IconList.js":
/*!**************************!*\
  !*** ./Icon/IconList.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Full List (Hash) of Agate Supported Icons
//
/* harmony default export */ __webpack_exports__["default"] = ({
  circlelarge: 0x025EF,
  // shape: LARGE CIRCLE
  squarelarge: 0x02B1B,
  // shape: BLACK SQUARE LARGE
  triangleup: 0x025B2,
  // shape: BLACK UP-POINTING TRIANGLE
  plus: 0x0002B,
  // plus
  minus: 0x0002D,
  // hyphen
  arrowup: 0x02191,
  // arrowup
  arrowdown: 0x02193,
  // arrowdown
  arrowleftturn: 0x021B6,
  // arrowleftturn
  arrowrightturn: 0x021B7,
  // arrowrightturn
  arrowharpoonright: 0x021C0,
  // arrowharpoonright
  ellipsis: 0x022EF,
  // ellipsis
  check: 0x02713,
  // checkmark
  arrowstraightup: 0x0EFFEB,
  // arrowstraightup
  arrowuturn: 0x0EFFEC,
  // arrowuturn
  arrowlargedown: 0x0EFFED,
  // caret_down_large
  arrowlargeup: 0x0EFFEE,
  // caret_up_large
  arrowlargeleft: 0x0EFFEF,
  // caret_left_large
  arrowlargeright: 0x0EFFF0,
  // caret_right_large
  closex: 0x0EFFF5,
  // close
  search: 0x0EFFF6,
  // search
  bluetooth2: 0x0F000A,
  // bluetooth2
  bluetoothoff: 0x0F000B,
  // bluetoothoff
  bright1: 0x0F000C,
  // bright01
  bright2: 0x0F000D,
  // bright02
  bluetooth: 0x0F000E,
  // bluetooth
  usb: 0x0F000F,
  // usb
  volume0: 0x0F0010,
  // volume00
  volume1: 0x0F0011,
  // volume01
  volume2: 0x0F0012,
  // volume02
  wifi: 0x0F0013,
  // wifi
  happyface: 0x0F0014,
  // happyface
  notification: 0x0F0015,
  // notification
  pairing: 0x0F0016,
  // pairing
  user: 0x0F0017,
  // user
  calendar: 0x0F0018,
  // calendar
  edit: 0x0F0019,
  // edit
  gallery: 0x0F001A,
  // gallery
  internet: 0x0F001B,
  // internet
  map: 0x0F001C,
  // map
  music: 0x0F001D,
  // music
  video: 0x0F001E,
  // video
  circle: 0x0F001F,
  // circle
  previous: 0x0F0020,
  // previous
  pairingdisplay: 0x0F0021,
  // pairingdisplay
  box: 0x0F0022,
  // box
  play: 0x0F0023,
  // playicon
  previoustrack: 0x0F0024,
  // previoustrack
  pause: 0x0F0025,
  // pause
  nexttrack: 0x0F0026,
  // nexttrack
  repeat: 0x0F0027,
  // repeat
  shuffle: 0x0F0028,
  // shuffle
  error: 0x0F002A,
  // error
  setting: 0x0F002B,
  // setting
  popupstop: 0x0F0035,
  // popupstop
  accept: 0x0F0036,
  // accept
  decline: 0x0F0037,
  // decline
  stop: 0x0F0038,
  // stop
  cancel: 0x0F0039,
  // cancel
  carspeaker: 0x0F003A,
  // carspeaker
  speaker: 0x0F003B,
  // speaker
  earphone: 0x0F003C,
  // earphone
  detail: 0x0F003D,
  // detail
  install: 0x0F003E,
  // install
  send: 0x0F003F,
  // send
  netbook: 0x0F0040,
  // netbook
  pad: 0x0F0041,
  // pad
  mobile: 0x0F0042,
  // mobile
  update: 0x0F0043,
  // update
  backapp: 0x0F0044,
  // backapp
  uninstall: 0x0F0045,
  // uninstall
  rain: 0x0F0060,
  // rain
  raindrops: 0x0F0061,
  // raindrops
  raincloud: 0x0F0062,
  // raincloud
  snow: 0x0F0063,
  // snow
  cloud: 0x0F0064,
  // cloud
  ice: 0x0F0065,
  // ice
  fog: 0x0F0066,
  // fog
  sun: 0x0F0067,
  // sun
  profileA1: 0x0F008A,
  // profileA1
  profileA2: 0x0F008B,
  // profileA2
  profileA3: 0x0F008C,
  // profileA3
  profileA4: 0x0F008D,
  // profileA4
  profileB1: 0x0F008E,
  // profileB1
  profileB2: 0x0F008F,
  // profileB2
  profileB3: 0x0F0090,
  // profileB3
  profileB4: 0x0F0091,
  // profileB4
  profileC1: 0x0F0092,
  // profileC1
  profileC2: 0x0F0093,
  // profileC2
  profileC3: 0x0F0094,
  // profileC3
  profileC4: 0x0F0095,
  // profileC4
  ac: 0x0F00B2,
  // ac
  auto: 0x0F00B3,
  // auto
  airmode: 0x0F00B4,
  // air_mode
  airdown: 0x0F00B5,
  // air_down
  airright: 0x0F00B6,
  // air_right
  airup: 0x0F00B7,
  // air_up
  heatseatleft: 0x0F00B8,
  // seat_heat_left
  heatseatright: 0x0F00B9,
  // seat_heat_right
  aircirculation: 0x0F00BA,
  // air_circulation
  fan: 0x0F00BB,
  // fan
  defrosterfront: 0x0F00BC,
  // defroster_front
  defrosterback: 0x0F00BD,
  // defroster_back
  airflow: 0x0F00BE,
  // airflow
  home: 0x0F00BF,
  // home
  temperature: 0x0F00C0,
  // temperature_icon
  compass: 0x0F00C1,
  // compass
  phone: 0x0F00C2,
  // phone
  fanoff: 0x0F00C9,
  // fan_off
  datetime: 0x0F00CB,
  // date_time
  display: 0x0F00CC,
  // display
  seatbelt: 0x0F00CD,
  // seat_belt
  apps: 0x0F00CF,
  // apps
  climate: 0x0F00D0,
  // climate
  dashboard: 0x0F00D1,
  // dashboard
  expand: 0x0F00D3,
  // expand
  radio: 0x0F00D4,
  // radio
  rearscreen: 0x0F00D5,
  // rear_screen
  weather: 0x0F00D6 // weather

}); // Deprecated icon list from `Moonstone-Agate.ttf` for reference
// export default {
// 	plus              : 0x0002B,  // plus
// 	minus             : 0x0002D,  // hyphen
// 	arrowhookleft     : 0x021A9,  // LeftArrowHook
// 	arrowhookright    : 0x021AA,  // RightArrowHook
// 	ellipsis          : 0x022EF,  // ellipsis
// 	check             : 0x02713,  // checkmark
// 	circle            : 0x0EFFDB, // record
// 	stop              : 0x0EFFDC, // stop
// 	play              : 0x0EFFDD, // play
// 	pause             : 0x0EFFDE, // pause
// 	forward           : 0x0EFFDF, // forward
// 	backward          : 0x0EFFE0, // rewind
// 	skipforward       : 0x0EFFE1, // skip_forward
// 	skipbackward      : 0x0EFFE2, // skip_backwards
// 	pauseforward      : 0x0EFFE3, // indicator_forward
// 	pausebackward     : 0x0EFFE4, // indicator_backward
// 	pausejumpforward  : 0x0EFFE5, // indicator_skip_forward
// 	pausejumpbackward : 0x0EFFE6, // indicator_skip_backward
// 	jumpforward       : 0x0EFFE7, // indicator_end
// 	jumpbackward      : 0x0EFFE8, // indicator_begin
// 	denselist         : 0x0EFFE9, // list_big
// 	bulletlist        : 0x0EFFEA, // list_bullets
// 	list              : 0x0EFFEB, // list_simple
// 	drawer            : 0x0EFFEC, // list_actions
// 	arrowlargedown    : 0x0EFFED, // caret_down_large
// 	arrowlargeup      : 0x0EFFEE, // caret_up_large
// 	arrowlargeleft    : 0x0EFFEF, // caret_left_large
// 	arrowlargeright   : 0x0EFFF0, // caret_right_large
// 	arrowsmallup      : 0x0EFFF1, // caret_up_small
// 	arrowsmalldown    : 0x0EFFF2, // caret_down_small
// 	arrowsmallleft    : 0x0EFFF3, // caret_left_small
// 	arrowsmallright   : 0x0EFFF4, // caret_right_small
// 	closex            : 0x0EFFF5, // close_x
// 	search            : 0x0EFFF6, // magnify
// 	rollforward       : 0x0EFFF7, // redo
// 	rollbackward      : 0x0EFFF8, // undo
// 	exitfullscreen    : 0x0EFFF9, // minimize
// 	fullscreen        : 0x0EFFFA, // maximize
// 	arrowshrinkleft   : 0x0EFFFB, // shrink_panel_left
// 	arrowshrinkright  : 0x0EFFFC, // shrink_panel_right
// 	arrowextend       : 0x0F0021, // arrow_left
// 	arrowshrink       : 0x0F0022, // arrow_right
// 	flag              : 0x0F0023, // flag
// 	funnel            : 0x0F0024, // filter
// 	trash             : 0x0F0025, // trash
// 	star              : 0x0F0028, // star_full
// 	hollowstar        : 0x0F0029, // star_empty
// 	halfstar          : 0x0F002A, // star_half
// 	gear              : 0x0F002B, // gear
// 	plug              : 0x0F002C, // input
// 	lock              : 0x0F002D,  // lock
// 	forward15         : 0x0F0041,  // forward15
// 	back15            : 0x0F0042,  // back15
// 	continousplay     : 0x0F0043,  // continous_play
// 	playlist          : 0x0F0044,  // playlist
// 	resumeplay        : 0x0F0045,  // resume_play
// 	image             : 0x0F0046,  // image
// 	audio             : 0x0F0061,  // audio
// 	music             : 0x0F0062,  // music
// 	languages         : 0x0F0081,  // languages
// 	cc                : 0x0F0082,  // cc
// 	ccon              : 0x0F0083,  // cc_on
// 	ccoff             : 0x0F0084,  // cc_off
// 	sub               : 0x0F0085,  // sub
// 	recordings        : 0x0F00A1,  // recordings
// 	livezoom          : 0x0F00A2,  // live_zoom
// 	liveplayback      : 0x0F00A3,  // live_playback
// 	liveplaybackoff   : 0x0F00A4,  // live_playback_off
// 	repeat            : 0x0F00A5,  // repeat
// 	repeatoff         : 0x0F00A6,  // repeat_off
// 	series            : 0x0F00A7,  // series
// 	repeatdownload    : 0x0F00A8,  // repeat_download
// 	view360           : 0x0F00A9,  // view_360
// 	view360off        : 0x0F00AA,  // view_360_off
// 	info              : 0x0F00AB,  // info
// 	airdown           : 0x0F00B5,  // air_down
// 	airright          : 0x0F00B6,  // air_right
// 	airup             : 0x0F00B7,  // air_up
// 	heatseatleft      : 0x0F00B8,  // seat_heat_left
// 	heatseatright     : 0x0F00B9,  // seat_heat_right
// 	aircirculation    : 0x0F00BA,  // air_circulation
// 	fan               : 0x0F00BB,  // fan
// 	defrosterfront    : 0x0F00BC,  // defroster_front
// 	defrosterback     : 0x0F00BD,  // defroster_back
// 	user              : 0x0F00BE,  // users
// 	home              : 0x0F00BF,  // home
// 	temperature       : 0x0F00C0,  // temperature_icon
// 	compass           : 0x0F00C1,  // compass
// 	phone             : 0x0F00C2,  // phone
// 	fanoff            : 0x0F00C9,  // fan_off
// 	bluetooth         : 0x0F00CA,  // bluetooth
// 	datetime          : 0x0F00CB,  // date_time
// 	display           : 0x0F00CC,  // display
// 	seatbelt          : 0x0F00CD,  // seat_belt
// 	wifi              : 0x0F00CE,  // wifi
// 	apps              : 0x0F00CF,  // apps
// 	climate           : 0x0F00D0,  // climate
// 	dashboard         : 0x0F00D1,  // dashboard
// 	edit              : 0x0F00D2,  // edit
// 	expand            : 0x0F00D3,  // expand
// 	radio             : 0x0F00D4,  // radio
// 	rearscreen        : 0x0F00D5,  // rear_screen
// 	weather           : 0x0F00D6   // weather
// };

/***/ }),

/***/ "./Skinnable/Skinnable.js":
/*!********************************!*\
  !*** ./Skinnable/Skinnable.js ***!
  \********************************/
/*! exports provided: default, Skinnable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Skinnable", function() { return Skinnable; });
/* harmony import */ var _enact_core_hoc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @enact/core/hoc */ "@enact/core/hoc");
/* harmony import */ var _enact_core_hoc__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enact_core_hoc__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enact_ui_Skinnable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @enact/ui/Skinnable */ "@enact/ui/Skinnable");
/* harmony import */ var _enact_ui_Skinnable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_Skinnable__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Exports the {@link agate/Skinnable.Skinnable} Higher-order Component (HOC).
 *
 * @module agate/Skinnable
 * @exports Skinnable
 * @public
 */


const defaultConfig = {
  skins: {
    carbon: 'carbon',
    cobalt: 'cobalt',
    copper: 'copper',
    electro: 'electro',
    gallium: 'gallium',
    titanium: 'titanium'
  },
  allowedVariants: ['night', 'highContrast'],
  defaultVariants: null
};
/**
 * This Higher-order Component is based on [ui/Skinnable]{@link ui/Skinnable.Skinnable} and comes
 * pre-configured for Agate's supported skins: 'carbon', 'cobalt', 'cobalt-day', 'copper',
 * 'copper-day', 'electro', 'gallium-day', 'gallium-night', and 'titanium'. It is used to apply
 * the relevant skinning classes to each component and has been used to pre-select specific skins
 * for some components.
 *
 * @class Skinnable
 * @memberof agate/Skinnable
 * @hoc
 * @public
 */

const Skinnable = _enact_core_hoc__WEBPACK_IMPORTED_MODULE_0___default()(defaultConfig, _enact_ui_Skinnable__WEBPACK_IMPORTED_MODULE_1___default.a);
/**
 * Select a skin by name by specifying this property. This may be changed at runtime. All components
 * already use their defaults, but a skin may be changed via this prop or by using
 * {@link agate/Skinnable} directly and a config object.
 *
 * Example:
 * ```
 * <Button skin="gallium-day">
 * ```
 *
 * @name skin
 * @type {String}
 * @memberof agate/Skinnable.Skinnable
 * @instance
 * @public
 */

/* harmony default export */ __webpack_exports__["default"] = (Skinnable);


/***/ }),

/***/ "./ToggleButton/ToggleButton.js":
/*!**************************************!*\
  !*** ./ToggleButton/ToggleButton.js ***!
  \**************************************/
/*! exports provided: default, ToggleButton, ToggleButtonBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleButton", function() { return ToggleButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToggleButtonBase", function() { return ToggleButtonBase; });
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @enact/core/kind */ "@enact/core/kind");
/* harmony import */ var _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_enact_core_kind__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @enact/ui/internal/Pure */ "@enact/ui/internal/Pure");
/* harmony import */ var _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _enact_ui_Toggleable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @enact/ui/Toggleable */ "@enact/ui/Toggleable");
/* harmony import */ var _enact_ui_Toggleable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_enact_ui_Toggleable__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Button */ "./Button/Button.js");
/* harmony import */ var _Skinnable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Skinnable */ "./Skinnable/Skinnable.js");
/* harmony import */ var _ToggleButton_module_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ToggleButton.module.less */ "./ToggleButton/ToggleButton.module.less");
/* harmony import */ var _ToggleButton_module_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ToggleButton_module_less__WEBPACK_IMPORTED_MODULE_7__);
var _jsxFileName = "/Users/RyanDuffy/dev/agate/ToggleButton/ToggleButton.js";

/**
 * Agate styled ToggleButton components and behaviors.
 *
 * @example
 * <ToggleButton underline>Hello Enact!</ToggleButton>
 *
 * @module agate/ToggleButton
 * @exports ToggleButton
 * @exports ToggleButtonBase
 */








/**
 * A stateless [Button]{@link agate/Button.Button} that can be toggled by changing its
 * `selected` property.
 *
 * @class ToggleButtonBase
 * @memberof agate/ToggleButton
 * @extends agate/Button.Button
 * @ui
 * @public
 */

const ToggleButtonBase = _enact_core_kind__WEBPACK_IMPORTED_MODULE_0___default()({
  name: 'ToggleButton',
  propTypes:
  /** @lends agate/ToggleButton.ToggleButtonBase.prototype */
  {
    /**
     * The string to be displayed as the main content of the toggle button.
     *
     * If `toggleOffLabel` and/or `toggleOnLabel` are provided, they will be used for the
     * respective states.
     *
     * @type {Node}
     * @public
     */
    children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node,

    /**
     * Disables the button.
     *
     * @type {Boolean}
     * @default false
     * @public
     */
    disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

    /**
     * The icon to display before the text.
     *
     * @type {String}
     * @see {@link agate/Icon.Icon}
     */
    icon: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

    /**
     * Determines whether the button is currently in an "on" or "off" state.
     *
     * @type {Boolean}
     * @default false
     * @public
     */
    selected: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

    /**
     * The size of the button.
     *
     * @type {('smallest'|'small'|'large'|'huge')}
     * @default 'large'
     * @public
     */
    size: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['smallest', 'small', 'large', 'huge']),

    /**
     * Button text displayed in the 'off' state.
     *
     * If not specified, `children` will be used for 'off' button text.
     *
     * @type {String}
     * @default ''
     * @public
     */
    toggleOffLabel: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

    /**
     * Button text displayed in the 'on' state.
     *
     * If not specified, `children` will be used for 'on' button text.
     *
     * @type {String}
     * @default ''
     * @public
     */
    toggleOnLabel: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

    /**
     * The button type.
     *
     * Grid buttons are intended to be grouped with other related buttons.
     *
     * @type {('grid'|'standard')}
     * @public
     */
    type: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['grid', 'standard']),

    /**
     * Shows toggle indicator.
     *
     * @type {Boolean}
     * @default false
     * @public
     */
    underline: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
  },
  defaultProps: {
    disabled: false,
    selected: false,
    size: 'large',
    toggleOffLabel: '',
    toggleOnLabel: '',
    underline: false
  },
  styles: {
    css: (_ToggleButton_module_less__WEBPACK_IMPORTED_MODULE_7___default()),
    className: 'toggleButton',
    publicClassNames: true
  },
  computed: {
    className: (_ref) => {
      let {
        selected,
        styler,
        underline
      } = _ref;
      return styler.append({
        selected,
        underline
      });
    },
    children: (_ref2) => {
      let {
        children: _children,
        selected,
        toggleOnLabel,
        toggleOffLabel
      } = _ref2;
      let c = _children;

      if (selected && toggleOnLabel) {
        c = toggleOnLabel;
      } else if (!selected && toggleOffLabel) {
        c = toggleOffLabel;
      }

      return c;
    }
  },
  render: props => {
    delete props.underline;
    delete props.toggleOffLabel;
    delete props.toggleOnLabel;
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Button__WEBPACK_IMPORTED_MODULE_5__["default"], Object.assign({}, props, {
      "aria-pressed": props.selected,
      css: _ToggleButton_module_less__WEBPACK_IMPORTED_MODULE_7___default.a,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 159
      },
      __self: undefined
    }));
  }
});
/**
 * A toggleable button.
 *
 * By default, `ToggleButton` maintains the state of its `selected` property.
 * Supply the `defaultSelected` property to control its initial value. If you
 * wish to directly control updates to the component, supply a value to `selected` at creation time
 * and update it in response to `onToggle` events.
 *
 * @class ToggleButton
 * @memberof agate/ToggleButton
 * @extends agate/ToggleButton.ToggleButtonBase
 * @mixes ui/Toggleable.Toggleable
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */

const ToggleButton = _enact_ui_internal_Pure__WEBPACK_IMPORTED_MODULE_1___default()(_enact_ui_Toggleable__WEBPACK_IMPORTED_MODULE_2___default()({
  prop: 'selected',
  toggleProp: 'onTap'
}, Object(_Skinnable__WEBPACK_IMPORTED_MODULE_6__["default"])(ToggleButtonBase)));
/* harmony default export */ __webpack_exports__["default"] = (ToggleButton);


/***/ }),

/***/ "./ToggleButton/ToggleButton.module.less":
/*!***********************************************!*\
  !*** ./ToggleButton/ToggleButton.module.less ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"toggleButton":"ToggleButton_ToggleButton_toggleButton","underline":"ToggleButton_ToggleButton_underline","selected":"ToggleButton_ToggleButton_selected","button":"ToggleButton_ToggleButton_button","bg":"ToggleButton_ToggleButton_bg","client":"ToggleButton_ToggleButton_client"};

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/color-convert/conversions.js":
/*!***************************************************!*\
  !*** ./node_modules/color-convert/conversions.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(/*! color-name */ "./node_modules/color-name/index.js");

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),

/***/ "./node_modules/color-convert/index.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");
var route = __webpack_require__(/*! ./route */ "./node_modules/color-convert/route.js");

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),

/***/ "./node_modules/color-convert/route.js":
/*!*********************************************!*\
  !*** ./node_modules/color-convert/route.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(/*! ./conversions */ "./node_modules/color-convert/conversions.js");

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),

/***/ "./node_modules/color-name/index.js":
/*!******************************************!*\
  !*** ./node_modules/color-name/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/ramda/src/bind.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/bind.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


var bind = /*#__PURE__*/_curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});
module.exports = bind;

/***/ }),

/***/ "./node_modules/ramda/src/compose.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/compose.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pipe = /*#__PURE__*/__webpack_require__(/*! ./pipe */ "./node_modules/ramda/src/pipe.js");

var reverse = /*#__PURE__*/__webpack_require__(/*! ./reverse */ "./node_modules/ramda/src/reverse.js");

/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }
  return pipe.apply(this, reverse(arguments));
}
module.exports = compose;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_arity.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_arity.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };
    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };
    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };
    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };
    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };
    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };
    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };
    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };
    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };
    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };
    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };
    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}
module.exports = _arity;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_checkForMethod.js":
/*!************************************************************!*\
  !*** ./node_modules/ramda/src/internal/_checkForMethod.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;
    if (length === 0) {
      return fn();
    }
    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}
module.exports = _checkForMethod;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry1.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry1.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
module.exports = _curry1;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry2.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry2.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}
module.exports = _curry2;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_curry3.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_curry3.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _curry2 = /*#__PURE__*/__webpack_require__(/*! ./_curry2 */ "./node_modules/ramda/src/internal/_curry2.js");

var _isPlaceholder = /*#__PURE__*/__webpack_require__(/*! ./_isPlaceholder */ "./node_modules/ramda/src/internal/_isPlaceholder.js");

/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });
      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });
      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}
module.exports = _curry3;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArray.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArray.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isArrayLike.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isArrayLike.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isArray = /*#__PURE__*/__webpack_require__(/*! ./_isArray */ "./node_modules/ramda/src/internal/_isArray.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./_isString */ "./node_modules/ramda/src/internal/_isString.js");

/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


var _isArrayLike = /*#__PURE__*/_curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== 'object') {
    return false;
  }
  if (_isString(x)) {
    return false;
  }
  if (x.nodeType === 1) {
    return !!x.length;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
});
module.exports = _isArrayLike;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isPlaceholder.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isPlaceholder.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isPlaceholder(a) {
       return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}
module.exports = _isPlaceholder;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_isString.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/src/internal/_isString.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}
module.exports = _isString;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_pipe.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/src/internal/_pipe.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}
module.exports = _pipe;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_reduce.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/src/internal/_reduce.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _isArrayLike = /*#__PURE__*/__webpack_require__(/*! ./_isArrayLike */ "./node_modules/ramda/src/internal/_isArrayLike.js");

var _xwrap = /*#__PURE__*/__webpack_require__(/*! ./_xwrap */ "./node_modules/ramda/src/internal/_xwrap.js");

var bind = /*#__PURE__*/__webpack_require__(/*! ../bind */ "./node_modules/ramda/src/bind.js");

function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;
  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    idx += 1;
  }
  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();
  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);
    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }
    step = iter.next();
  }
  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';

function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = _xwrap(fn);
  }
  if (_isArrayLike(list)) {
    return _arrayReduce(fn, acc, list);
  }
  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }
  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }
  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }
  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}
module.exports = _reduce;

/***/ }),

/***/ "./node_modules/ramda/src/internal/_xwrap.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/src/internal/_xwrap.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var XWrap = /*#__PURE__*/function () {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };
  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}
module.exports = _xwrap;

/***/ }),

/***/ "./node_modules/ramda/src/pipe.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/pipe.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _arity = /*#__PURE__*/__webpack_require__(/*! ./internal/_arity */ "./node_modules/ramda/src/internal/_arity.js");

var _pipe = /*#__PURE__*/__webpack_require__(/*! ./internal/_pipe */ "./node_modules/ramda/src/internal/_pipe.js");

var reduce = /*#__PURE__*/__webpack_require__(/*! ./reduce */ "./node_modules/ramda/src/reduce.js");

var tail = /*#__PURE__*/__webpack_require__(/*! ./tail */ "./node_modules/ramda/src/tail.js");

/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }
  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
}
module.exports = pipe;

/***/ }),

/***/ "./node_modules/ramda/src/reduce.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/src/reduce.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

var _reduce = /*#__PURE__*/__webpack_require__(/*! ./internal/_reduce */ "./node_modules/ramda/src/internal/_reduce.js");

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


var reduce = /*#__PURE__*/_curry3(_reduce);
module.exports = reduce;

/***/ }),

/***/ "./node_modules/ramda/src/reverse.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/src/reverse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var _isString = /*#__PURE__*/__webpack_require__(/*! ./internal/_isString */ "./node_modules/ramda/src/internal/_isString.js");

/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


var reverse = /*#__PURE__*/_curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});
module.exports = reverse;

/***/ }),

/***/ "./node_modules/ramda/src/slice.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/src/slice.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry3 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry3 */ "./node_modules/ramda/src/internal/_curry3.js");

/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


var slice = /*#__PURE__*/_curry3( /*#__PURE__*/_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));
module.exports = slice;

/***/ }),

/***/ "./node_modules/ramda/src/tail.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/src/tail.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = /*#__PURE__*/__webpack_require__(/*! ./internal/_checkForMethod */ "./node_modules/ramda/src/internal/_checkForMethod.js");

var _curry1 = /*#__PURE__*/__webpack_require__(/*! ./internal/_curry1 */ "./node_modules/ramda/src/internal/_curry1.js");

var slice = /*#__PURE__*/__webpack_require__(/*! ./slice */ "./node_modules/ramda/src/slice.js");

/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


var tail = /*#__PURE__*/_curry1( /*#__PURE__*/_checkForMethod('tail', /*#__PURE__*/slice(1, Infinity)));
module.exports = tail;

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.12.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
var lowPriorityWarningWithoutStack = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.warn(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarningWithoutStack = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(void 0, [format].concat(args));
    }
  };
}

var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./tests/ui/apps/ToggleButton/Agate-ToggleButton-View.js":
/*!***************************************************************!*\
  !*** ./tests/ui/apps/ToggleButton/Agate-ToggleButton-View.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ToggleButton__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../ToggleButton */ "./ToggleButton/ToggleButton.js");
/* harmony import */ var _AgateDecorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../AgateDecorator */ "./AgateDecorator/AgateDecorator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/RyanDuffy/dev/agate/tests/ui/apps/ToggleButton/Agate-ToggleButton-View.js";




const app = props => react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", Object.assign({}, props, {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 5
  },
  __self: undefined
}), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 6
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 7
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ToggleButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
  id: "toggleButton1",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 8
  },
  __self: undefined
}, "Missing Toggle Label")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 14
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ToggleButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
  id: "toggleButton2",
  size: "small",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 15
  },
  __self: undefined
}, "Small Button")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
  __source: {
    fileName: _jsxFileName,
    lineNumber: 22
  },
  __self: undefined
}, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ToggleButton__WEBPACK_IMPORTED_MODULE_0__["default"], {
  id: "toggleButton3",
  toggleOnLabel: "On",
  toggleOffLabel: "Off",
  __source: {
    fileName: _jsxFileName,
    lineNumber: 23
  },
  __self: undefined
}))));

/* harmony default export */ __webpack_exports__["default"] = (Object(_AgateDecorator__WEBPACK_IMPORTED_MODULE_1__["default"])(app));

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ../enact-ui-tests/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/RyanDuffy/dev/enact-ui-tests/index.js */"../enact-ui-tests/index.js");


/***/ }),

/***/ "@enact/core/hoc":
/*!******************************************************!*\
  !*** delegated @enact/core/hoc from enact_framework ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/core/hoc");

/***/ }),

/***/ "@enact/core/keymap":
/*!*********************************************************!*\
  !*** delegated @enact/core/keymap from enact_framework ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/core/keymap");

/***/ }),

/***/ "@enact/core/kind":
/*!*******************************************************!*\
  !*** delegated @enact/core/kind from enact_framework ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/core/kind");

/***/ }),

/***/ "@enact/core/util":
/*!*******************************************************!*\
  !*** delegated @enact/core/util from enact_framework ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/core/util");

/***/ }),

/***/ "@enact/i18n/I18nDecorator":
/*!****************************************************************!*\
  !*** delegated @enact/i18n/I18nDecorator from enact_framework ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/i18n/I18nDecorator");

/***/ }),

/***/ "@enact/spotlight/SpotlightRootDecorator":
/*!******************************************************************************!*\
  !*** delegated @enact/spotlight/SpotlightRootDecorator from enact_framework ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/spotlight/SpotlightRootDecorator");

/***/ }),

/***/ "@enact/spotlight/Spottable":
/*!*****************************************************************!*\
  !*** delegated @enact/spotlight/Spottable from enact_framework ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/spotlight/Spottable");

/***/ }),

/***/ "@enact/ui/Button":
/*!*******************************************************!*\
  !*** delegated @enact/ui/Button from enact_framework ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/Button");

/***/ }),

/***/ "@enact/ui/FloatingLayer":
/*!**************************************************************!*\
  !*** delegated @enact/ui/FloatingLayer from enact_framework ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/FloatingLayer");

/***/ }),

/***/ "@enact/ui/Icon":
/*!*****************************************************!*\
  !*** delegated @enact/ui/Icon from enact_framework ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/Icon");

/***/ }),

/***/ "@enact/ui/Skinnable":
/*!**********************************************************!*\
  !*** delegated @enact/ui/Skinnable from enact_framework ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/Skinnable");

/***/ }),

/***/ "@enact/ui/Toggleable":
/*!***********************************************************!*\
  !*** delegated @enact/ui/Toggleable from enact_framework ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/Toggleable");

/***/ }),

/***/ "@enact/ui/internal/Pure":
/*!**************************************************************!*\
  !*** delegated @enact/ui/internal/Pure from enact_framework ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/internal/Pure");

/***/ }),

/***/ "@enact/ui/resolution":
/*!***********************************************************!*\
  !*** delegated @enact/ui/resolution from enact_framework ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("@enact/ui/resolution");

/***/ }),

/***/ "enact_framework":
/*!**********************************!*\
  !*** external "enact_framework" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = enact_framework;

/***/ }),

/***/ "react":
/*!********************************************!*\
  !*** delegated react from enact_framework ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("react");

/***/ }),

/***/ "react-dom":
/*!************************************************!*\
  !*** delegated react-dom from enact_framework ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! enact_framework */ "enact_framework"))("react-dom");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map