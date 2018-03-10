webpackJsonp([114276838955818,60335399758886],{

/***/ 313:
/***/ (function(module, exports) {

	module.exports = {"layoutContext":{}}

/***/ }),

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _index = __webpack_require__(460);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _layoutIndex = __webpack_require__(313);
	
	var _layoutIndex2 = _interopRequireDefault(_layoutIndex);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (props) {
	  return _react2.default.createElement(_index2.default, _extends({}, props, _layoutIndex2.default));
	};
	
	module.exports = exports["default"];

/***/ }),

/***/ 555:
/***/ (function(module, exports) {

	var requestFrame = (function () {
	  var window = this
	  var raf = window.requestAnimationFrame ||
	    window.mozRequestAnimationFrame ||
	    window.webkitRequestAnimationFrame ||
	    function fallbackRAF(func) {
	      return window.setTimeout(func, 20)
	    }
	  return function requestFrameFunction(func) {
	    return raf(func)
	  }
	})()
	
	var cancelFrame = (function () {
	  var window = this
	  var cancel = window.cancelAnimationFrame ||
	    window.mozCancelAnimationFrame ||
	    window.webkitCancelAnimationFrame ||
	    window.clearTimeout
	  return function cancelFrameFunction(id) {
	    return cancel(id)
	  }
	})()
	
	function resizeListener(e) {
	  var win = e.target || e.srcElement
	  if (win.__resizeRAF__) {
	    cancelFrame(win.__resizeRAF__)
	  }
	  win.__resizeRAF__ = requestFrame(function () {
	    var trigger = win.__resizeTrigger__
	    trigger.__resizeListeners__.forEach(function (fn) {
	      fn.call(trigger, e)
	    })
	  })
	}
	
	var exports = function exports(element, fn) {
	  var window = this
	  var document = window.document
	  var isIE
	
	  var attachEvent = document.attachEvent
	  if (typeof navigator !== 'undefined') {
	    isIE = navigator.userAgent.match(/Trident/) ||
	      navigator.userAgent.match(/Edge/)
	  }
	
	  function objectLoad() {
	    this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
	    this.contentDocument.defaultView.addEventListener('resize', resizeListener)
	  }
	
	  if (!element.__resizeListeners__) {
	    element.__resizeListeners__ = []
	    if (attachEvent) {
	      element.__resizeTrigger__ = element
	      element.attachEvent('onresize', resizeListener)
	    } else {
	      if (getComputedStyle(element).position === 'static') {
	        element.style.position = 'relative'
	      }
	      var obj = (element.__resizeTrigger__ = document.createElement('object'))
	      obj.setAttribute(
	        'style',
	        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1; opacity: 0;'
	      )
	      obj.setAttribute('class', 'resize-sensor')
	      obj.__resizeElement__ = element
	      obj.onload = objectLoad
	      obj.type = 'text/html'
	      if (isIE) {
	        element.appendChild(obj)
	      }
	      obj.data = 'about:blank'
	      if (!isIE) {
	        element.appendChild(obj)
	      }
	    }
	  }
	  element.__resizeListeners__.push(fn)
	}
	
	module.exports = typeof window === 'undefined' ? exports : exports.bind(window)
	
	module.exports.unbind = function (element, fn) {
	  var attachEvent = document.attachEvent
	  if (fn) {
	    element.__resizeListeners__.splice(
	      element.__resizeListeners__.indexOf(fn),
	      1
	    )
	  } else {
	    element.__resizeListeners__ = []
	  }
	  if (!element.__resizeListeners__.length) {
	    if (attachEvent) {
	      element.detachEvent('onresize', resizeListener)
	    } else {
	      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener(
	        'resize',
	        resizeListener
	      )
	      delete element.__resizeTrigger__.contentDocument.defaultView.__resizeTrigger__
	      element.__resizeTrigger__ = !element.removeChild(
	        element.__resizeTrigger__
	      )
	    }
	    delete element.__resizeListeners__
	  }
	}


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	//# sourceMappingURL=performance-now.js.map
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)))

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(332)
	  , root = typeof window === 'undefined' ? global : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root['request' + suffix]
	  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]
	
	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root[vendors[i] + 'Request' + suffix]
	  caf = root[vendors[i] + 'Cancel' + suffix]
	      || root[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(root, arguments)
	}
	module.exports.polyfill = function(object) {
	  if (!object) {
	    object = root;
	  }
	  object.requestAnimationFrame = raf
	  object.cancelAnimationFrame = caf
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

	var ReactDOM = __webpack_require__(179);
	var elementResizeEvent = __webpack_require__(555);
	
	module.exports = {
	  getInitialState: function() {
	    if (this.props.initialComponentWidth !== undefined && this.props.initialComponentWidth !== null) {
	      return {
	        componentWidth: this.props.initialComponentWidth
	      };
	    } else {
	      return {};
	    }
	  },
	  // Add our resize sensor.
	  componentDidMount: function() {
	    this.setState({
	      componentWidth: ReactDOM.findDOMNode(this).getBoundingClientRect().width
	    });
	    elementResizeEvent(ReactDOM.findDOMNode(this), this.onResize);
	  },
	  // When the DOM updates, check that our resize sensor is still there.
	  componentDidUpdate: function() {
	    if (0 === ReactDOM.findDOMNode(this).getElementsByClassName('resize-sensor').length) {
	      elementResizeEvent(ReactDOM.findDOMNode(this), this.onResize);
	    }
	  },
	  onResize: function() {
	    this.setState({
	      componentWidth: ReactDOM.findDOMNode(this).getBoundingClientRect().width
	    });
	  }
	};


/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.9.2
	var resizeListener;
	
	resizeListener = __webpack_require__(831);
	
	module.exports = {
	  getInitialState: function() {
	    if (this.props.initialPageWidth) {
	      return {
	        pageWidth: this.props.initialPageWidth
	      };
	    } else {
	      return {};
	    }
	  },
	  componentDidMount: function() {
	    return resizeListener.on(this.onResize);
	  },
	  componentWillUnmount: function() {
	    return resizeListener.off(this.onResize);
	  },
	  onResize: function(pageWidth) {
	    return this.setState({
	      pageWidth: pageWidth
	    });
	  }
	};


/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.9.2
	var currentWidth, onResize, raf, subscribers, ticking, update;
	
	raf = __webpack_require__(334);
	
	currentWidth = void 0;
	
	subscribers = [];
	
	ticking = false;
	
	if (typeof window !== "undefined" && window !== null) {
	  currentWidth = window.innerWidth;
	}
	
	onResize = function() {
	  if (!ticking) {
	    ticking = true;
	    return raf(update);
	  }
	};
	
	update = function() {
	  var i, len, subscriber;
	  currentWidth = window.innerWidth;
	  for (i = 0, len = subscribers.length; i < len; i++) {
	    subscriber = subscribers[i];
	    subscriber(currentWidth);
	  }
	  return ticking = false;
	};
	
	if (typeof window !== "undefined" && window !== null) {
	  window.addEventListener("resize", onResize);
	}
	
	module.exports = {
	  on: function(subscribeFn) {
	    subscribeFn(currentWidth);
	    return subscribers.push(subscribeFn);
	  },
	  off: function(subscribeFn) {
	    return subscribers.splice(subscribers.indexOf(subscribeFn), 1);
	  }
	};


/***/ }),

/***/ 832:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var ComponentWidthComponent, PageWidthComponent, PageWidthMixin, React, componentWidthMixin, objectAssign;
	
	React = __webpack_require__(3);
	
	componentWidthMixin = __webpack_require__(758);
	
	PageWidthMixin = __webpack_require__(830);
	
	objectAssign = __webpack_require__(8);
	
	ComponentWidthComponent = React.createClass({
	  displayName: "Breakpoint",
	  mixins: [componentWidthMixin],
	  propTypes: {
	    minWidth: React.PropTypes.number,
	    maxWidth: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      minWidth: 0,
	      maxWidth: 1000000000000000000000
	    };
	  },
	  renderChildren: function() {
	    return React.Children.map(this.props.children, (function(_this) {
	      return function(child) {
	        var ref;
	        if ((child != null ? (ref = child.type) != null ? ref.displayName : void 0 : void 0) === "Span") {
	          return React.cloneElement(child, {
	            context: _this.props.context
	          });
	        } else {
	          return child;
	        }
	      };
	    })(this));
	  },
	  render: function() {
	    var props, ref;
	    props = objectAssign({}, this.props);
	    delete props.maxWidth;
	    delete props.minWidth;
	    delete props.widthMethod;
	    if (this.state.componentWidth) {
	      if ((this.props.minWidth <= (ref = this.state.componentWidth) && ref < this.props.maxWidth)) {
	        return React.createElement("div", Object.assign({}, props), this.renderChildren());
	      } else {
	        return React.createElement("div", null);
	      }
	    } else {
	      return React.createElement("div", null);
	    }
	  }
	});
	
	PageWidthComponent = React.createClass({
	  displayName: "Breakpoint",
	  mixins: [PageWidthMixin],
	  propTypes: {
	    minWidth: React.PropTypes.number,
	    maxWidth: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      minWidth: 0,
	      maxWidth: 1000000000000000000000
	    };
	  },
	  renderChildren: function() {
	    return React.Children.map(this.props.children, (function(_this) {
	      return function(child) {
	        var ref;
	        if (((ref = child.type) != null ? ref.displayName : void 0) === "Span") {
	          return React.cloneElement(child, {
	            context: _this.props.context
	          });
	        } else {
	          return child;
	        }
	      };
	    })(this));
	  },
	  render: function() {
	    var props, ref;
	    props = objectAssign({}, this.props);
	    delete props.maxWidth;
	    delete props.minWidth;
	    delete props.widthMethod;
	    if (this.state.pageWidth) {
	      if ((this.props.minWidth <= (ref = this.state.pageWidth) && ref < this.props.maxWidth)) {
	        return React.createElement("div", Object.assign({}, props), this.renderChildren());
	      } else {
	        return React.createElement("div", null);
	      }
	    } else {
	      return React.createElement("div", null);
	    }
	  }
	});
	
	module.exports = React.createClass({
	  displayName: 'Breakpoint',
	  propTypes: {
	    widthMethod: React.PropTypes.string.isRequired,
	    minWidth: React.PropTypes.number,
	    maxWidth: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      widthMethod: 'pageWidth'
	    };
	  },
	  render: function() {
	    if (this.props.widthMethod === "pageWidth") {
	      return React.createElement(PageWidthComponent, Object.assign({}, this.props));
	    } else if (this.props.widthMethod === "componentWidth") {
	      return React.createElement(ComponentWidthComponent, Object.assign({}, this.props));
	    }
	  }
	});


/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var React, objectAssign;
	
	React = __webpack_require__(3);
	
	objectAssign = __webpack_require__(8);
	
	module.exports = React.createClass({
	  displayName: "Container",
	  render: function() {
	    var children, defaultStyles, props, styles;
	    defaultStyles = {
	      maxWidth: '960px',
	      marginLeft: 'auto',
	      marginRight: 'auto'
	    };
	    styles = objectAssign(defaultStyles, this.props.style);
	    children = this.props.children;
	    props = objectAssign({}, this.props);
	    delete props.children;
	    delete props.style;
	    return React.createElement("div", Object.assign({}, props, {
	      "style": styles
	    }), children, React.createElement("span", {
	      "style": {
	        display: 'block',
	        clear: 'both'
	      }
	    }, ' '));
	  }
	});


/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var React, objectAssign;
	
	React = __webpack_require__(3);
	
	objectAssign = __webpack_require__(8);
	
	module.exports = React.createClass({
	  displayName: "Grid",
	  propTypes: {
	    columns: React.PropTypes.number,
	    gutterRatio: React.PropTypes.number
	  },
	  getDefaultProps: function() {
	    return {
	      columns: 12,
	      gutterRatio: 1 / 4
	    };
	  },
	  renderChildren: function() {
	    return React.Children.map(this.props.children, (function(_this) {
	      return function(child) {
	        var ref, ref1;
	        if ((ref = (ref1 = child.type) != null ? ref1.displayName : void 0) === "Breakpoint" || ref === "Span") {
	          return React.cloneElement(child, {
	            context: {
	              columns: _this.props.columns,
	              gutterRatio: _this.props.gutterRatio
	            }
	          });
	        } else {
	          return child;
	        }
	      };
	    })(this));
	  },
	  render: function() {
	    var props;
	    props = objectAssign({}, this.props);
	    delete props.gutterRatio;
	    delete props.columns;
	    return React.createElement("div", Object.assign({}, props), this.renderChildren(), React.createElement("span", {
	      "style": {
	        display: 'block',
	        clear: 'both'
	      }
	    }, ' '));
	  }
	});


/***/ }),

/***/ 835:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var React, objectAssign, spanCalculate;
	
	React = __webpack_require__(3);
	
	objectAssign = __webpack_require__(8);
	
	spanCalculate = __webpack_require__(837);
	
	module.exports = React.createClass({
	  displayName: "Span",
	  propTypes: {
	    context: React.PropTypes.object,
	    columns: React.PropTypes.number,
	    at: React.PropTypes.number,
	    pre: React.PropTypes.number,
	    post: React.PropTypes.number,
	    squish: React.PropTypes.number,
	    last: React.PropTypes.bool,
	    "break": React.PropTypes.bool
	  },
	  getDefaultProps: function() {
	    return {
	      at: 0,
	      pre: 0,
	      post: 0,
	      squish: 0,
	      last: false,
	      first: false,
	      "break": false
	    };
	  },
	  renderChildren: function() {
	    return React.Children.map(this.props.children, (function(_this) {
	      return function(child) {
	        var ref;
	        if ((child != null ? (ref = child.type) != null ? ref.displayName : void 0 : void 0) === "Span") {
	          return React.cloneElement(child, {
	            context: {
	              columns: _this.props.columns,
	              gutterRatio: _this.props.context.gutterRatio
	            }
	          });
	        } else {
	          return child;
	        }
	      };
	    })(this));
	  },
	  render: function() {
	    var props, style;
	    style = spanCalculate({
	      contextColumns: this.props.context.columns,
	      gutterRatio: this.props.context.gutterRatio,
	      columns: this.props.columns,
	      at: this.props.at,
	      pre: this.props.pre,
	      post: this.props.post,
	      squish: this.props.squish,
	      last: this.props.last,
	      "break": this.props["break"]
	    });
	    style = objectAssign(style, this.props.style);
	    props = objectAssign({}, this.props, {
	      "style": style
	    });
	    delete props.at;
	    delete props["break"];
	    delete props.columns;
	    delete props.context;
	    delete props.first;
	    delete props.last;
	    delete props.post;
	    delete props.pre;
	    delete props.squish;
	    delete props.style;
	    return React.createElement("div", Object.assign({}, props, {
	      "style": style
	    }), this.renderChildren(), React.createElement("span", {
	      "style": {
	        display: 'block',
	        clear: 'both'
	      }
	    }, ' '));
	  }
	});


/***/ }),

/***/ 836:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	exports.Container = __webpack_require__(833);
	
	exports.Grid = __webpack_require__(834);
	
	exports.Breakpoint = __webpack_require__(832);
	
	exports.Span = __webpack_require__(835);


/***/ }),

/***/ 837:
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0
	var objectAssign;
	
	objectAssign = __webpack_require__(8);
	
	module.exports = function(options) {
	  var calcSpacing, calcSpanWidth, defaults, float, gutterWidth, marginLeft, marginRight, n, ops, width;
	  defaults = {
	    columns: 3,
	    at: 0,
	    pre: 0,
	    post: 0,
	    squish: 0,
	    contextColumns: 12,
	    gutterRatio: 1 / 4,
	    first: false,
	    last: false
	  };
	  ops = objectAssign(defaults, options);
	  n = 100 / (ops.contextColumns + ((ops.contextColumns - 1) * ops.gutterRatio));
	  gutterWidth = ops.gutterRatio * n;
	  calcSpanWidth = function(numColumns) {
	    return n * numColumns + gutterWidth * (numColumns - 1);
	  };
	  calcSpacing = function(numColumns) {
	    if (numColumns === 0) {
	      return 0;
	    } else {
	      return calcSpanWidth(numColumns) + gutterWidth;
	    }
	  };
	  width = calcSpanWidth(ops.columns);
	  if (ops.at === 0 && ops.pre === 0 && ops.squish === 0) {
	    marginLeft = 0;
	  } else {
	    marginLeft = calcSpacing(ops.at) + calcSpacing(ops.pre) + calcSpacing(ops.squish);
	  }
	  if (ops.last && ops.post === 0 && ops.squish === 0) {
	    marginRight = 0;
	  } else if (ops.post !== 0 || ops.squish !== 0) {
	    marginRight = calcSpacing(ops.post) + calcSpacing(ops.squish);
	    if (!ops.last) {
	      marginRight = marginRight + gutterWidth;
	    }
	  } else {
	    marginRight = gutterWidth;
	  }
	  if (ops.last) {
	    float = "right";
	  } else {
	    float = "left";
	  }
	  width = width + "%";
	  marginLeft = marginLeft + "%";
	  marginRight = marginRight + "%";
	  return {
	    float: float,
	    marginLeft: marginLeft,
	    marginRight: marginRight,
	    width: width,
	    clear: ops["break"] ? 'both' : 'none'
	  };
	};


/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _gatsbyLink = __webpack_require__(169);
	
	var _gatsbyLink2 = _interopRequireDefault(_gatsbyLink);
	
	var _reactResponsiveGrid = __webpack_require__(836);
	
	var _propTypes = __webpack_require__(13);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _typography = __webpack_require__(72);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var link_style = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' };
	var header_style_root = _extends({}, (0, _typography.scale)(1.5), { marginBottom: (0, _typography.rhythm)(1.5), marginTop: 0 });
	
	var header_style = {
	  fontFamily: 'Montserrat, sans-serif',
	  marginTop: 0,
	  marginBottom: (0, _typography.rhythm)(-1)
	};
	
	var yc = _react2.default.createElement(
	  _gatsbyLink2.default,
	  { style: link_style, to: '/' },
	  'yerevancoder'
	);
	
	var container_style = { maxWidth: (0, _typography.rhythm)(35), padding: (0, _typography.rhythm)(1.5) + ' ' + (0, _typography.rhythm)(3 / 4) };
	
	var ApplicationRoot = function (_React$Component) {
	  _inherits(ApplicationRoot, _React$Component);
	
	  function ApplicationRoot() {
	    var _temp, _this, _ret;
	
	    _classCallCheck(this, ApplicationRoot);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = { authenticated_user: null }, _temp), _possibleConstructorReturn(_this, _ret);
	  }
	
	  ApplicationRoot.prototype.getChildContext = function getChildContext() {
	    var _this2 = this;
	
	    var didAuth = function didAuth(authed_user_data, after_cb) {
	      return _this2.setState(function () {
	        return { authenticated_user: _extends({}, authed_user_data) };
	      }, function () {
	        after_cb(authed_user_data.email_account);
	      });
	    };
	    return {
	      authenticated_user: this.state.authenticated_user,
	      userDidAuthSuccessfully: didAuth
	    };
	  };
	
	  ApplicationRoot.prototype.render = function render() {
	    var _props = this.props,
	        location = _props.location,
	        children = _props.children;
	
	    var rootPath = '/';
	    if (true) {
	      rootPath = ("") + '/';
	    }
	
	    var header = null;
	    if (location.pathname === rootPath) {
	      header = _react2.default.createElement(
	        'h1',
	        { style: header_style_root },
	        yc
	      );
	    } else {
	      header = _react2.default.createElement(
	        'h3',
	        { style: header_style },
	        yc
	      );
	    }
	    return _react2.default.createElement(
	      _reactResponsiveGrid.Container,
	      { style: container_style },
	      header,
	      children()
	    );
	  };
	
	  return ApplicationRoot;
	}(_react2.default.Component);
	
	ApplicationRoot.childContextTypes = {
	  authenticated_user: _propTypes2.default.object,
	  userDidAuthSuccessfully: _propTypes2.default.func
	};
	ApplicationRoot.displayName = 'ApplicationRoot';
	exports.default = ApplicationRoot;
	module.exports = exports['default'];

/***/ })

});
//# sourceMappingURL=component---src-layouts-index-js-d33c81613075550c20d4.js.map