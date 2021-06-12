/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (() => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider = /*#__PURE__*/function () {
  function Slider() {
    _classCallCheck(this, Slider);

    if (!this.vars()) return;
    this.setupEvents();
  }

  _createClass(Slider, [{
    key: "vars",
    value: function vars() {
      this.selectors = {
        container: 'data-slider-container',
        slides: 'data-slider-reference',
        inputs: 'data-slider-input'
      };
      this.container = document.querySelector("[".concat(this.selectors.container, "]"));
      this.slides = document.querySelectorAll("[".concat(this.selectors.slides, "]"));
      this.inputs = document.querySelectorAll("[".concat(this.selectors.inputs, "]"));
      if (!this.container || !this.slides) return;
      this.slidesNumber = this.slides.length;
      this.slideWidth = this.slides[0].clientWidth;
      this.pageWidth = window.innerWidth;
      this.lastClonedSlideIndex = this.slidesNumber + 1;
      this.activeSlideIndex = 2;
      this.index = 1;
      this.previousIndex = 0;
      this.firstInputIndex = 0;
      this.lastInputIndex = this.inputs.length - 1;
      this.isTransitionEnd = true;
      this.isInitialized = false;
      this.transitionDuration = 500;
      return true;
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;

      this.moveToActiveSlide();
      this.cloneFirstAndLastSlide();
      this.setCheckedAttribute(this.activeSlideIndex - 1);
      this.isInitialized = true;
      window.addEventListener('resize', function () {
        _this.updateWidthValues();
      });
      this.inputs.forEach(function (input, index) {
        input.addEventListener('click', function () {
          if (!_this.isTransitionEnd) return;
          _this.index = index;

          _this.setActiveSlideIndex(_this.index);

          _this.moveToActiveSlide();

          _this.setCheckedAttribute(_this.index);

          _this.previousIndex = _this.index;
        });
      });
      window.addEventListener('touchstart', function (event) {
        _this.startPosition = Math.floor(event.touches[0].clientX);
        _this.endPosition = 0;
      });
      window.addEventListener('touchmove', function (event) {
        _this.endPosition = Math.floor(event.touches[0].clientX);
      });
      window.addEventListener('touchend', function () {
        if (_this.startPosition > _this.endPosition && _this.endPosition != 0) {
          _this.index++;

          if (_this.index > _this.lastInputIndex) {
            _this.index = _this.firstInputIndex;
          }

          _this.setActiveSlideIndex(_this.index);

          _this.moveToActiveSlide();

          _this.setCheckedAttribute(_this.index);

          _this.previousIndex = _this.index;
        } else if (_this.startPosition < _this.endPosition && _this.endPosition != 0) {
          _this.index--;

          if (_this.index < _this.firstInputIndex) {
            _this.index = _this.lastInputIndex;
          }

          _this.setActiveSlideIndex(_this.index);

          _this.moveToActiveSlide();

          _this.setCheckedAttribute(_this.index);

          _this.previousIndex = _this.index;
        } else {
          console.log('lmaooo');
          return;
        }
      });
    }
  }, {
    key: "removeTransition",
    value: function removeTransition(direction) {
      var _this2 = this;

      var nextSlideIndex = direction === 'next' ? 1 : this.slidesNumber;
      window.setTimeout(function () {
        _this2.container.style.transform = "translateX(-".concat(_this2.slideWidth * nextSlideIndex, "px)");
        _this2.container.style.transition = "none";
        _this2.isTransitionEnd = true;
      }, this.transitionDuration);
    }
  }, {
    key: "updateWidthValues",
    value: function updateWidthValues() {
      this.pageWidth = window.innerWidth;
      this.slideWidth = this.slides[0].clientWidth;
      this.moveToActiveSlide();
    }
  }, {
    key: "moveToActiveSlide",
    value: function moveToActiveSlide() {
      this.slideValue = this.activeSlideIndex * this.slideWidth;
      this.container.style.transform = "translateX(-".concat(this.slideValue, "px)");
      if (!this.isInitialized) return;
      this.container.style.transition = "transform ".concat(this.transitionDuration, "ms ease-in-out");
    }
  }, {
    key: "cloneFirstAndLastSlide",
    value: function cloneFirstAndLastSlide() {
      this.firstSlideClone = this.slides[0].cloneNode(true);
      this.lastSlideClone = this.slides[this.slidesNumber - 1].cloneNode(true);
      this.container.append(this.firstSlideClone);
      this.container.prepend(this.lastSlideClone);
    }
  }, {
    key: "setActiveSlideIndex",
    value: function setActiveSlideIndex(index) {
      if (index === this.firstInputIndex && this.previousIndex === this.lastInputIndex) {
        this.activeSlideIndex = this.lastClonedSlideIndex;
        this.isTransitionEnd = false;
        this.removeTransition('next');
      } else if (index === this.lastInputIndex && this.previousIndex === this.firstInputIndex) {
        this.activeSlideIndex = 0;
        this.isTransitionEnd = false;
        this.removeTransition('prev');
      } else {
        this.activeSlideIndex = index + 1;
      }
    }
  }, {
    key: "setCheckedAttribute",
    value: function setCheckedAttribute(index) {
      this.inputs[index].checked = true;
    }
  }]);

  return Slider;
}();

var lol = new Slider();

/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					result = fn();
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/app": 0,
/******/ 			"css/main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			for(moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) var result = runtime(__webpack_require__);
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmanage_landing_page"] = self["webpackChunkmanage_landing_page"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./src/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/main"], () => (__webpack_require__("./src/sass/main.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;