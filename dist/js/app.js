/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (() => {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        sliderWrapper: 'data-slider-wrapper',
        slider: 'data-slider',
        slides: 'data-slider-reference',
        indicators: 'data-slider-input'
      };
      this.sliderWrapper = document.querySelector("[".concat(this.selectors.sliderWrapper, "]"));
      this.slider = document.querySelector("[".concat(this.selectors.slider, "]"));
      this.slides = document.querySelectorAll("[".concat(this.selectors.slides, "]"));
      this.indicators = document.querySelectorAll("[".concat(this.selectors.indicators, "]"));
      if (!this.sliderWrapper || !this.slider || !this.slides) return;
      this.slidesNumber = this.slides.length;
      this.slideWidth = this.slides[0].clientWidth;
      this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
      this.lastClonedSlideIndex = this.slidesNumber + 2;
      this.activeSlideIndex = 3;
      this.index = 1;
      this.previousIndex = 0;
      this.firstIndicatorIndex = 0;
      this.lastIndicatorIndex = this.indicators.length - 1;
      this.isTransitionEnd = true;
      this.isInitialized = false;
      this.isMobile = true;
      this.transitionDuration = 500;
      this.dragTriggerPoint = 25;
      this.breakToDesktop = 768;
      return true;
    }
  }, {
    key: "setupEvents",
    value: function setupEvents() {
      var _this = this;

      this.isMobile = this.sliderWrapperWidth >= this.breakToDesktop ? false : true;
      this.moveToActiveSlide();
      this.cloneSlides(2);
      this.setCheckedAttribute(this.activeSlideIndex - 2);
      this.isInitialized = true;
      window.addEventListener('resize', function () {
        _this.updateWidthValues();

        _this.isMobile = _this.sliderWrapperWidth >= _this.breakToDesktop ? false : true;
      });
      this.indicators.forEach(function (input, index) {
        input.addEventListener('click', function () {
          if (!_this.isTransitionEnd) return;
          _this.index = index;

          _this.setActiveSlideIndex(_this.index);

          _this.moveToActiveSlide();

          _this.setCheckedAttribute(_this.index);

          _this.previousIndex = _this.index;
        });
      });
      this.sliderWrapper.addEventListener('touchstart', function (event) {
        _this.touchStartX = Math.floor(event.touches[0].clientX);
        _this.touchEndX = 0;
        _this.touchShiftValue = 0;
      });
      this.sliderWrapper.addEventListener('touchmove', function (event) {
        _this.touchEndX = Math.floor(event.touches[0].clientX);
        _this.touchShiftValue = _this.touchStartX - _this.touchEndX;
      });
      this.sliderWrapper.addEventListener('touchend', function () {
        if (!_this.isTransitionEnd) return;

        if (_this.touchShiftValue > _this.dragTriggerPoint) {
          _this.index++;

          _this.changeSlide();
        } else if (_this.touchShiftValue < -_this.dragTriggerPoint) {
          _this.index--;

          _this.changeSlide();
        } else {
          return;
        }
      });
    }
  }, {
    key: "removeTransition",
    value: function removeTransition(direction) {
      var _this2 = this;

      var nextSlideIndex = direction === 'next' ? 2 : this.slidesNumber + 1;
      var mobileSlideValue = -(nextSlideIndex * this.slideWidth);
      var desktopSlideValue = this.sliderWrapperWidth / 2 - this.slideWidth / 2 - nextSlideIndex * (this.slideWidth + 30);
      var slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
      window.setTimeout(function () {
        _this2.slider.style.transform = "translateX(".concat(slideValue, "px)");
        _this2.slider.style.transition = "none";
        _this2.isTransitionEnd = true;
      }, this.transitionDuration);
    }
  }, {
    key: "updateWidthValues",
    value: function updateWidthValues() {
      this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
      this.slideWidth = this.slides[0].clientWidth;
      this.moveToActiveSlide();
    }
  }, {
    key: "moveToActiveSlide",
    value: function moveToActiveSlide() {
      var mobileSlideValue = -(this.activeSlideIndex * this.slideWidth);
      var desktopSlideValue = this.sliderWrapperWidth / 2 - this.slideWidth / 2 - this.activeSlideIndex * (this.slideWidth + 30);
      var slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
      this.slider.style.transform = "translateX(".concat(slideValue, "px)");
      if (!this.isInitialized) return;
      this.slider.style.transition = "transform ".concat(this.transitionDuration, "ms ease-in-out");
    }
  }, {
    key: "cloneSlides",
    value: function cloneSlides(amount) {
      var _this3 = this;

      var slidesArray = _toConsumableArray(this.slides).slice();

      this.cloneBeginning = slidesArray.slice(0, amount);
      this.cloneEnd = slidesArray.reverse().slice(0, amount);
      this.cloneBeginning.forEach(function (clone) {
        _this3.slider.append(clone.cloneNode(true));
      });
      this.cloneEnd.forEach(function (clone) {
        _this3.slider.prepend(clone.cloneNode(true));
      });
    }
  }, {
    key: "setActiveSlideIndex",
    value: function setActiveSlideIndex(index) {
      if (index === this.firstIndicatorIndex && this.previousIndex === this.lastIndicatorIndex) {
        this.activeSlideIndex = this.lastClonedSlideIndex;
        this.isTransitionEnd = false;
        this.removeTransition('next');
      } else if (index === this.lastIndicatorIndex && this.previousIndex === this.firstIndicatorIndex) {
        this.activeSlideIndex = 1;
        this.isTransitionEnd = false;
        this.removeTransition('prev');
      } else {
        this.activeSlideIndex = index + 2;
      }
    }
  }, {
    key: "setCheckedAttribute",
    value: function setCheckedAttribute(index) {
      this.indicators[index].checked = true;
    }
  }, {
    key: "changeSlide",
    value: function changeSlide() {
      var _this4 = this;

      this.isTransitionEnd = false;

      if (this.index > this.lastIndicatorIndex) {
        this.index = this.firstIndicatorIndex;
      } else if (this.index < this.firstIndicatorIndex) {
        this.index = this.lastIndicatorIndex;
      }

      this.setActiveSlideIndex(this.index);
      this.moveToActiveSlide();
      this.setCheckedAttribute(this.index);
      this.previousIndex = this.index;
      window.setTimeout(function () {
        _this4.isTransitionEnd = true;
      }, this.transitionDuration);
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