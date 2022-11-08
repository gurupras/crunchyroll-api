(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Crunchyroll = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function () {
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var axios$2 = {exports: {}};

	var axios$1 = {exports: {}};

	var bind$2 = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	var bind$1 = bind$2;

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
	  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
	    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {Object} val The value to test
	 * @return {boolean} True if value is a plain Object, otherwise false
	 */
	function isPlainObject(val) {
	  if (toString.call(val) !== '[object Object]') {
	    return false;
	  }

	  var prototype = Object.getPrototypeOf(val);
	  return prototype === null || prototype === Object.prototype;
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
	                                           navigator.product === 'NativeScript' ||
	                                           navigator.product === 'NS')) {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (isPlainObject(result[key]) && isPlainObject(val)) {
	      result[key] = merge(result[key], val);
	    } else if (isPlainObject(val)) {
	      result[key] = merge({}, val);
	    } else if (isArray(val)) {
	      result[key] = val.slice();
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind$1(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 * @return {string} content value without BOM
	 */
	function stripBOM(content) {
	  if (content.charCodeAt(0) === 0xFEFF) {
	    content = content.slice(1);
	  }
	  return content;
	}

	var utils$8 = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isPlainObject: isPlainObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim,
	  stripBOM: stripBOM
	};

	var utils$7 = utils$8;

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL$1 = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils$7.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils$7.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils$7.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils$7.forEach(val, function parseValue(v) {
	        if (utils$7.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils$7.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    var hashmarkIndex = url.indexOf('#');
	    if (hashmarkIndex !== -1) {
	      url = url.slice(0, hashmarkIndex);
	    }

	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	var utils$6 = utils$8;

	function InterceptorManager$1() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager$1.prototype.use = function use(fulfilled, rejected, options) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected,
	    synchronous: options ? options.synchronous : false,
	    runWhen: options ? options.runWhen : null
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager$1.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager$1.prototype.forEach = function forEach(fn) {
	  utils$6.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager$1;

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser$1 = true;
	var env = {};
	var argv = [];
	var version$1 = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser$1,
	  env: env,
	  argv: argv,
	  version: version$1,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var utils$5 = require('./utils');
	var normalizeHeaderName = require('./helpers/normalizeHeaderName');
	var enhanceError = require('./core/enhanceError');

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils$5.isUndefined(headers) && utils$5.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = require('./adapters/xhr');
	  } else if (typeof browser$1$1 !== 'undefined' && Object.prototype.toString.call(browser$1$1) === '[object process]') {
	    // For node use HTTP adapter
	    adapter = require('./adapters/http');
	  }
	  return adapter;
	}

	function stringifySafely(rawValue, parser, encoder) {
	  if (utils$5.isString(rawValue)) {
	    try {
	      (parser || JSON.parse)(rawValue);
	      return utils$5.trim(rawValue);
	    } catch (e) {
	      if (e.name !== 'SyntaxError') {
	        throw e;
	      }
	    }
	  }

	  return (encoder || JSON.stringify)(rawValue);
	}

	var defaults$3 = {

	  transitional: {
	    silentJSONParsing: true,
	    forcedJSONParsing: true,
	    clarifyTimeoutError: false
	  },

	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Accept');
	    normalizeHeaderName(headers, 'Content-Type');

	    if (utils$5.isFormData(data) ||
	      utils$5.isArrayBuffer(data) ||
	      utils$5.isBuffer(data) ||
	      utils$5.isStream(data) ||
	      utils$5.isFile(data) ||
	      utils$5.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils$5.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils$5.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils$5.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
	      setContentTypeIfUnset(headers, 'application/json');
	      return stringifySafely(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    var transitional = this.transitional;
	    var silentJSONParsing = transitional && transitional.silentJSONParsing;
	    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
	    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

	    if (strictJSONParsing || (forcedJSONParsing && utils$5.isString(data) && data.length)) {
	      try {
	        return JSON.parse(data);
	      } catch (e) {
	        if (strictJSONParsing) {
	          if (e.name === 'SyntaxError') {
	            throw enhanceError(e, this, 'E_JSON_PARSE');
	          }
	          throw e;
	        }
	      }
	    }

	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,
	  maxBodyLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults$3.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils$5.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults$3.headers[method] = {};
	});

	utils$5.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults$3.headers[method] = utils$5.merge(DEFAULT_CONTENT_TYPE);
	});

	module.exports = defaults$3;

	var defaults$4 = /*#__PURE__*/Object.freeze({
		__proto__: null
	});

	var require$$4 = /*@__PURE__*/getAugmentedNamespace(defaults$4);

	var utils$4 = utils$8;
	var defaults$2 = require$$4;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData$1 = function transformData(data, headers, fns) {
	  var context = this || defaults$2;
	  /*eslint no-param-reassign:0*/
	  utils$4.forEach(fns, function transform(fn) {
	    data = fn.call(context, data, headers);
	  });

	  return data;
	};

	var isCancel$1;
	var hasRequiredIsCancel;

	function requireIsCancel () {
		if (hasRequiredIsCancel) return isCancel$1;
		hasRequiredIsCancel = 1;

		isCancel$1 = function isCancel(value) {
		  return !!(value && value.__CANCEL__);
		};
		return isCancel$1;
	}

	var utils$3 = utils$8;
	var transformData = transformData$1;
	var isCancel = requireIsCancel();
	var defaults$1 = require$$4;

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest$1 = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData.call(
	    config,
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils$3.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers
	  );

	  utils$3.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults$1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData.call(
	      config,
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData.call(
	          config,
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	var utils$2 = utils$8;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	var mergeConfig$2 = function mergeConfig(config1, config2) {
	  // eslint-disable-next-line no-param-reassign
	  config2 = config2 || {};
	  var config = {};

	  var valueFromConfig2Keys = ['url', 'method', 'data'];
	  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
	  var defaultToConfig2Keys = [
	    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
	    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
	    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
	    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
	    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
	  ];
	  var directMergeKeys = ['validateStatus'];

	  function getMergedValue(target, source) {
	    if (utils$2.isPlainObject(target) && utils$2.isPlainObject(source)) {
	      return utils$2.merge(target, source);
	    } else if (utils$2.isPlainObject(source)) {
	      return utils$2.merge({}, source);
	    } else if (utils$2.isArray(source)) {
	      return source.slice();
	    }
	    return source;
	  }

	  function mergeDeepProperties(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  }

	  utils$2.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    }
	  });

	  utils$2.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

	  utils$2.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
	    if (!utils$2.isUndefined(config2[prop])) {
	      config[prop] = getMergedValue(undefined, config2[prop]);
	    } else if (!utils$2.isUndefined(config1[prop])) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  utils$2.forEach(directMergeKeys, function merge(prop) {
	    if (prop in config2) {
	      config[prop] = getMergedValue(config1[prop], config2[prop]);
	    } else if (prop in config1) {
	      config[prop] = getMergedValue(undefined, config1[prop]);
	    }
	  });

	  var axiosKeys = valueFromConfig2Keys
	    .concat(mergeDeepPropertiesKeys)
	    .concat(defaultToConfig2Keys)
	    .concat(directMergeKeys);

	  var otherKeys = Object
	    .keys(config1)
	    .concat(Object.keys(config2))
	    .filter(function filterAxiosKeys(key) {
	      return axiosKeys.indexOf(key) === -1;
	    });

	  utils$2.forEach(otherKeys, mergeDeepProperties);

	  return config;
	};

	var name = "axios";
	var version = "0.21.4";
	var description = "Promise based HTTP client for the browser and node.js";
	var main = "index.js";
	var scripts = {
		test: "grunt test",
		start: "node ./sandbox/server.js",
		build: "NODE_ENV=production grunt build",
		preversion: "npm test",
		version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
		postversion: "git push && git push --tags",
		examples: "node ./examples/server.js",
		coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
		fix: "eslint --fix lib/**/*.js"
	};
	var repository = {
		type: "git",
		url: "https://github.com/axios/axios.git"
	};
	var keywords = [
		"xhr",
		"http",
		"ajax",
		"promise",
		"node"
	];
	var author = "Matt Zabriskie";
	var license = "MIT";
	var bugs = {
		url: "https://github.com/axios/axios/issues"
	};
	var homepage = "https://axios-http.com";
	var devDependencies = {
		coveralls: "^3.0.0",
		"es6-promise": "^4.2.4",
		grunt: "^1.3.0",
		"grunt-banner": "^0.6.0",
		"grunt-cli": "^1.2.0",
		"grunt-contrib-clean": "^1.1.0",
		"grunt-contrib-watch": "^1.0.0",
		"grunt-eslint": "^23.0.0",
		"grunt-karma": "^4.0.0",
		"grunt-mocha-test": "^0.13.3",
		"grunt-ts": "^6.0.0-beta.19",
		"grunt-webpack": "^4.0.2",
		"istanbul-instrumenter-loader": "^1.0.0",
		"jasmine-core": "^2.4.1",
		karma: "^6.3.2",
		"karma-chrome-launcher": "^3.1.0",
		"karma-firefox-launcher": "^2.1.0",
		"karma-jasmine": "^1.1.1",
		"karma-jasmine-ajax": "^0.1.13",
		"karma-safari-launcher": "^1.0.0",
		"karma-sauce-launcher": "^4.3.6",
		"karma-sinon": "^1.0.5",
		"karma-sourcemap-loader": "^0.3.8",
		"karma-webpack": "^4.0.2",
		"load-grunt-tasks": "^3.5.2",
		minimist: "^1.2.0",
		mocha: "^8.2.1",
		sinon: "^4.5.0",
		"terser-webpack-plugin": "^4.2.3",
		typescript: "^4.0.5",
		"url-search-params": "^0.10.0",
		webpack: "^4.44.2",
		"webpack-dev-server": "^3.11.0"
	};
	var browser = {
		"./lib/adapters/http.js": "./lib/adapters/xhr.js"
	};
	var jsdelivr = "dist/axios.min.js";
	var unpkg = "dist/axios.min.js";
	var typings = "./index.d.ts";
	var dependencies = {
		"follow-redirects": "^1.14.0"
	};
	var bundlesize = [
		{
			path: "./dist/axios.min.js",
			threshold: "5kB"
		}
	];
	var require$$0 = {
		name: name,
		version: version,
		description: description,
		main: main,
		scripts: scripts,
		repository: repository,
		keywords: keywords,
		author: author,
		license: license,
		bugs: bugs,
		homepage: homepage,
		devDependencies: devDependencies,
		browser: browser,
		jsdelivr: jsdelivr,
		unpkg: unpkg,
		typings: typings,
		dependencies: dependencies,
		bundlesize: bundlesize
	};

	var pkg = require$$0;

	var validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
	  validators$1[type] = function validator(thing) {
	    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
	  };
	});

	var deprecatedWarnings = {};
	var currentVerArr = pkg.version.split('.');

	/**
	 * Compare package versions
	 * @param {string} version
	 * @param {string?} thanVersion
	 * @returns {boolean}
	 */
	function isOlderVersion(version, thanVersion) {
	  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
	  var destVer = version.split('.');
	  for (var i = 0; i < 3; i++) {
	    if (pkgVersionArr[i] > destVer[i]) {
	      return true;
	    } else if (pkgVersionArr[i] < destVer[i]) {
	      return false;
	    }
	  }
	  return false;
	}

	/**
	 * Transitional option validator
	 * @param {function|boolean?} validator
	 * @param {string?} version
	 * @param {string} message
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
	  var isDeprecated = version && isOlderVersion(version);

	  function formatMessage(opt, desc) {
	    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
	  }

	  // eslint-disable-next-line func-names
	  return function(value, opt, opts) {
	    if (validator === false) {
	      throw new Error(formatMessage(opt, ' has been removed in ' + version));
	    }

	    if (isDeprecated && !deprecatedWarnings[opt]) {
	      deprecatedWarnings[opt] = true;
	      // eslint-disable-next-line no-console
	      console.warn(
	        formatMessage(
	          opt,
	          ' has been deprecated since v' + version + ' and will be removed in the near future'
	        )
	      );
	    }

	    return validator ? validator(value, opt, opts) : true;
	  };
	};

	/**
	 * Assert object's properties type
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 */

	function assertOptions(options, schema, allowUnknown) {
	  if (typeof options !== 'object') {
	    throw new TypeError('options must be an object');
	  }
	  var keys = Object.keys(options);
	  var i = keys.length;
	  while (i-- > 0) {
	    var opt = keys[i];
	    var validator = schema[opt];
	    if (validator) {
	      var value = options[opt];
	      var result = value === undefined || validator(value, opt, options);
	      if (result !== true) {
	        throw new TypeError('option ' + opt + ' must be ' + result);
	      }
	      continue;
	    }
	    if (allowUnknown !== true) {
	      throw Error('Unknown option ' + opt);
	    }
	  }
	}

	var validator$1 = {
	  isOlderVersion: isOlderVersion,
	  assertOptions: assertOptions,
	  validators: validators$1
	};

	var utils$1 = utils$8;
	var buildURL = buildURL$1;
	var InterceptorManager = InterceptorManager_1;
	var dispatchRequest = dispatchRequest$1;
	var mergeConfig$1 = mergeConfig$2;
	var validator = validator$1;

	var validators = validator.validators;
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios$3(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios$3.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = arguments[1] || {};
	    config.url = arguments[0];
	  } else {
	    config = config || {};
	  }

	  config = mergeConfig$1(this.defaults, config);

	  // Set config.method
	  if (config.method) {
	    config.method = config.method.toLowerCase();
	  } else if (this.defaults.method) {
	    config.method = this.defaults.method.toLowerCase();
	  } else {
	    config.method = 'get';
	  }

	  var transitional = config.transitional;

	  if (transitional !== undefined) {
	    validator.assertOptions(transitional, {
	      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
	      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
	      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
	    }, false);
	  }

	  // filter out skipped interceptors
	  var requestInterceptorChain = [];
	  var synchronousRequestInterceptors = true;
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
	      return;
	    }

	    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

	    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  var responseInterceptorChain = [];
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  var promise;

	  if (!synchronousRequestInterceptors) {
	    var chain = [dispatchRequest, undefined];

	    Array.prototype.unshift.apply(chain, requestInterceptorChain);
	    chain = chain.concat(responseInterceptorChain);

	    promise = Promise.resolve(config);
	    while (chain.length) {
	      promise = promise.then(chain.shift(), chain.shift());
	    }

	    return promise;
	  }


	  var newConfig = config;
	  while (requestInterceptorChain.length) {
	    var onFulfilled = requestInterceptorChain.shift();
	    var onRejected = requestInterceptorChain.shift();
	    try {
	      newConfig = onFulfilled(newConfig);
	    } catch (error) {
	      onRejected(error);
	      break;
	    }
	  }

	  try {
	    promise = dispatchRequest(newConfig);
	  } catch (error) {
	    return Promise.reject(error);
	  }

	  while (responseInterceptorChain.length) {
	    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
	  }

	  return promise;
	};

	Axios$3.prototype.getUri = function getUri(config) {
	  config = mergeConfig$1(this.defaults, config);
	  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
	};

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios$3.prototype[method] = function(url, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: (config || {}).data
	    }));
	  };
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios$3.prototype[method] = function(url, data, config) {
	    return this.request(mergeConfig$1(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios$3;

	var Cancel_1;
	var hasRequiredCancel;

	function requireCancel () {
		if (hasRequiredCancel) return Cancel_1;
		hasRequiredCancel = 1;

		/**
		 * A `Cancel` is an object that is thrown when an operation is canceled.
		 *
		 * @class
		 * @param {string=} message The message.
		 */
		function Cancel(message) {
		  this.message = message;
		}

		Cancel.prototype.toString = function toString() {
		  return 'Cancel' + (this.message ? ': ' + this.message : '');
		};

		Cancel.prototype.__CANCEL__ = true;

		Cancel_1 = Cancel;
		return Cancel_1;
	}

	var CancelToken_1;
	var hasRequiredCancelToken;

	function requireCancelToken () {
		if (hasRequiredCancelToken) return CancelToken_1;
		hasRequiredCancelToken = 1;

		var Cancel = requireCancel();

		/**
		 * A `CancelToken` is an object that can be used to request cancellation of an operation.
		 *
		 * @class
		 * @param {Function} executor The executor function.
		 */
		function CancelToken(executor) {
		  if (typeof executor !== 'function') {
		    throw new TypeError('executor must be a function.');
		  }

		  var resolvePromise;
		  this.promise = new Promise(function promiseExecutor(resolve) {
		    resolvePromise = resolve;
		  });

		  var token = this;
		  executor(function cancel(message) {
		    if (token.reason) {
		      // Cancellation has already been requested
		      return;
		    }

		    token.reason = new Cancel(message);
		    resolvePromise(token.reason);
		  });
		}

		/**
		 * Throws a `Cancel` if cancellation has been requested.
		 */
		CancelToken.prototype.throwIfRequested = function throwIfRequested() {
		  if (this.reason) {
		    throw this.reason;
		  }
		};

		/**
		 * Returns an object that contains a new `CancelToken` and a function that, when called,
		 * cancels the `CancelToken`.
		 */
		CancelToken.source = function source() {
		  var cancel;
		  var token = new CancelToken(function executor(c) {
		    cancel = c;
		  });
		  return {
		    token: token,
		    cancel: cancel
		  };
		};

		CancelToken_1 = CancelToken;
		return CancelToken_1;
	}

	var spread;
	var hasRequiredSpread;

	function requireSpread () {
		if (hasRequiredSpread) return spread;
		hasRequiredSpread = 1;

		/**
		 * Syntactic sugar for invoking a function and expanding an array for arguments.
		 *
		 * Common use case would be to use `Function.prototype.apply`.
		 *
		 *  ```js
		 *  function f(x, y, z) {}
		 *  var args = [1, 2, 3];
		 *  f.apply(null, args);
		 *  ```
		 *
		 * With `spread` this example can be re-written.
		 *
		 *  ```js
		 *  spread(function(x, y, z) {})([1, 2, 3]);
		 *  ```
		 *
		 * @param {Function} callback
		 * @returns {Function}
		 */
		spread = function spread(callback) {
		  return function wrap(arr) {
		    return callback.apply(null, arr);
		  };
		};
		return spread;
	}

	var isAxiosError;
	var hasRequiredIsAxiosError;

	function requireIsAxiosError () {
		if (hasRequiredIsAxiosError) return isAxiosError;
		hasRequiredIsAxiosError = 1;

		/**
		 * Determines whether the payload is an error thrown by Axios
		 *
		 * @param {*} payload The value to test
		 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
		 */
		isAxiosError = function isAxiosError(payload) {
		  return (typeof payload === 'object') && (payload.isAxiosError === true);
		};
		return isAxiosError;
	}

	var utils = utils$8;
	var bind = bind$2;
	var Axios$2 = Axios_1;
	var mergeConfig = mergeConfig$2;
	var defaults = require$$4;

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios$2(defaultConfig);
	  var instance = bind(Axios$2.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios$2.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios$2;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(mergeConfig(axios.defaults, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = requireCancel();
	axios.CancelToken = requireCancelToken();
	axios.isCancel = requireIsCancel();

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = requireSpread();

	// Expose isAxiosError
	axios.isAxiosError = requireIsAxiosError();

	axios$1.exports = axios;

	// Allow use of default import syntax in TypeScript
	axios$1.exports.default = axios;

	(function (module) {
		module.exports = axios$1.exports;
	} (axios$2));

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var subsrt$1 = {
	  format: { }
	};

	function clone(obj) {
	  return JSON.parse(JSON.stringify(obj));
	}

	/******************************************************************************************
	 * Loads the subtitle format parsers and builders
	 ******************************************************************************************/
	(function init() {
	  //Load in the predefined order
	  var formats = [ "vtt", "lrc", "smi", "ssa", "ass", "sub", "srt", "sbv", "json" ];
	  for (var i = 0; i < formats.length; i++) {
	    var f = formats[i];
	    var handler = commonjsRequire('./format/' + f + '.js');
	    subsrt$1.format[handler.name] = handler;
	  }
	})();

	/******************************************************************************************
	 * Gets a list of supported subtitle formats.
	 ******************************************************************************************/
	subsrt$1.list = function() {
	  return Object.keys(subsrt$1.format);
	};

	/******************************************************************************************
	 * Detects a subtitle format from the content.
	 ******************************************************************************************/
	subsrt$1.detect = function(content) {
	  var formats = subsrt$1.list();
	  for (var i = 0; i < formats.length; i++) {
	    var f = formats[i];
	    var handler = subsrt$1.format[f];
	    if (typeof handler == "undefined") {
	      continue;
	    }
	    if (typeof handler.detect != "function") {
	      continue;
	    }
	    //Function 'detect' can return true or format name
	    var d = handler.detect(content);
	    if (d === true) { //Logical true
	      return f;
	    }
	    if (f == d) { //Format name
	      return d;
	    }
	  }
	};

	/******************************************************************************************
	 * Parses a subtitle content.
	 ******************************************************************************************/
	subsrt$1.parse = function(content, options) {
	  options = options || { };
	  var format = options.format || subsrt$1.detect(content);
	  if (!format || format.trim().length == 0) {
	    throw new Error("Cannot determine subtitle format!");
	  }
	  
	  var handler = subsrt$1.format[format];
	  if (typeof handler == "undefined") {
	    throw new Error("Unsupported subtitle format: " + format);
	  }
	  
	  var func = handler.parse;
	  if (typeof func != "function") {
	    throw new Error("Subtitle format does not support 'parse' op: " + format);
	  }
	  
	  return func(content, options);
	};

	/******************************************************************************************
	 * Builds a subtitle content
	 ******************************************************************************************/
	subsrt$1.build = function(captions, options) {
	  options = options || { };
	  var format = options.format || "srt";
	  if (!format || format.trim().length == 0) {
	    throw new Error("Cannot determine subtitle format!");
	  }
	  
	  var handler = subsrt$1.format[format];
	  if (typeof handler == "undefined") {
	    throw new Error("Unsupported subtitle format: " + format);
	  }
	  
	  var func = handler.build;
	  if (typeof func != "function") {
	    throw new Error("Subtitle format does not support 'build' op: " + format);
	  }
	  
	  return func(captions, options);
	};

	/******************************************************************************************
	 * Converts subtitle format
	 ******************************************************************************************/
	subsrt$1.convert = function(content, options) {
	  if (typeof options == "string") {
	    options = { to: options };
	  }
	  options = options || { };
	  
	  var opt = clone(options);
	  delete opt.format;
	  
	  if (opt.from) {
	    opt.format = opt.from;
	  }
	  
	  var captions = subsrt$1.parse(content, opt);
	  if (opt.resync) {
	    captions = subsrt$1.resync(captions, opt.resync);
	  }
	  
	  opt.format = opt.to || options.format;
	  var result = subsrt$1.build(captions, opt);
	  
	  return result;
	};

	/******************************************************************************************
	 * Shifts the time of the captions.
	 ******************************************************************************************/
	subsrt$1.resync = function(captions, options) {
	  options = options || { };
	  
	  var func, ratio, frame, offset;
	  if (typeof options == "function") {
	    func = options; //User's function to handle time shift
	  }
	  else if (typeof options == "number") {
	    offset = options; //Time shift (+/- offset)
	    func = function(a) {
	      return [ a[0] + offset, a[1] + offset ];
	    };
	  }
	  else if (typeof options == "object") {
	    offset = (options.offset || 0) * (options.frame ? options.fps || 25 : 1);
	    ratio = options.ratio || 1.0;
	    frame = options.frame;
	    func = function(a) {
	      return [ Math.round(a[0] * ratio + offset), Math.round(a[1] * ratio + offset) ];
	    };
	  }
	  else {
	    throw new Error("Argument 'options' not defined!");
	  }
	  
	  var resynced = [ ];
	  for (var i = 0; i < captions.length; i++) {
	    var caption = clone(captions[i]);
	    if (typeof caption.type === "undefined" || caption.type == "caption") {
	      if (frame) {
	        var shift = func([ caption.frame.start, caption.frame.end ]);
	        if (shift && shift.length == 2) {
	          caption.frame.start = shift[0];
	          caption.frame.end = shift[1];
	          caption.frame.count = caption.frame.end - caption.frame.start;
	        }
	      }
	      else {
	        var shift = func([ caption.start, caption.end ]);
	        if (shift && shift.length == 2) {
	          caption.start = shift[0];
	          caption.end = shift[1];
	          caption.duration = caption.end - caption.start;
	        }
	      }
	    }
	    resynced.push(caption);
	  }
	  
	  return resynced;
	};

	var subsrt_1 = subsrt$1;

	const subsrt = subsrt_1;

	const oldVTT = subsrt.format.vtt;
	subsrt.format.vtt = {
	  name: 'vtt',
	  parse: oldVTT.parse,
	  build (captions, options) {
	    function replace (entry, fn) {
	      entry.data.Text = fn(entry.data.Text);
	      entry.text = fn(entry.text);
	    }
	    // Make a copy and remove meta since there's an issue with subsrt not
	    // displaying it properly.
	    const fixedCaptions = [...captions].filter(x => x.type !== 'meta');
	    // Also, trim the text while we're at it to ensure there's no newline
	    // at the start and replace & and < since these characters are not allowed
	    // as part of WebVTT spec
	    fixedCaptions.forEach(entry => {
	      if (entry.type !== 'caption') {
	        return
	      }
	      replace(entry, s => s.trim().replace('\\N', '').replace('\\R', '').replace('&', '&amp;').replace('<', '&lt;'));
	    });

	    let content = oldVTT.build(fixedCaptions, options);
	    content = content.replace(/(.*) --> (.*)/g, (match, p1, p2) => {
	      return `${p1.replace(/,/, '.')} --> ${p2.replace(/,/, '.')}`
	    });
	    return content
	  },
	  detect: oldVTT.detect
	};

	let Subtitle$2 = class Subtitle {
	  constructor (label, language, content) {
	    this.label = label;
	    this.language = language;
	    if (typeof content === 'string') {
	      this.captions = subsrt.parse(content);
	    } else {
	      this.captions = content;
	    }
	  }

	  static detect (content) {
	    return subsrt.detect(content)
	  }

	  build (format) {
	    return subsrt.build(this.captions, { format })
	  }
	};

	var subtitle = Subtitle$2;

	const Axios$1 = axios$2.exports;

	const Subtitle$1 = subtitle;

	var episode = class Episode {
	  /**
	   *
	   * @param {string} url
	   * @param {any} parameters
	   * @param {import('axios').AxiosInstance} axios
	   */
	  constructor (url, parameters, axios = Axios$1.create()) {
	    this.url = url;
	    Object.assign(this, parameters);
	    this.axios = axios;
	  }

	  async parse () {
	    throw new Error('Unimplemented')
	  }

	  getLanguageAndCountry (input) {
	    const countryMap = {
	      BR: 'Brasil',
	      DE: 'Germany',
	      ES: 'España',
	      FR: 'France',
	      IT: 'Italy',
	      JP: 'Japan',
	      LA: 'América Latina',
	      UK: 'United Kingdom',
	      US: 'America'
	    };
	    const languageMap = {
	      en: 'English',
	      de: 'Deutsch',
	      es: 'Español',
	      it: 'Italiano',
	      ja: '日本語',
	      fr: 'Français',
	      pt: 'Português',
	      ar: 'العربية',
	      ru: 'Русский',
	      kr: '한국어'
	    };

	    // If input has a -, get rid of it
	    input = input.replace(/-/g, '');
	    const lang = input.substring(0, 2).toLowerCase();
	    const ctry = input.substring(2, 4).toUpperCase();

	    const language = languageMap[lang];
	    const country = countryMap[ctry];
	    return { language, country }
	  }

	  getStreamsByLanuage (audioLang, hardsubLang) {
	    const { config: { streams } } = this;
	    return streams.filter(stream => stream.audio_lang === audioLang && stream.hardsub_lang === hardsubLang)
	  }

	  async getSubtitles () {
	    const { axios } = this;
	    const { config: { subtitles: subtitleMetadata } } = this;
	    this.subtitles = [];
	    await Promise.all(subtitleMetadata.map(async ({ language, url, title, format }) => {
	      const response = await axios.get(url);
	      if (response.status !== 200) {
	        throw new Error(response.statusText)
	      }
	      const { data: ass } = response;
	      this.subtitles.push(new Subtitle$1(title, language.substr(0, 2), ass));
	    }));
	  }

	  async processMetadata () {
	    const { config } = this;
	    const { metadata, streams } = config;
	    this.episodeTitle = metadata.title;
	    this.episodeNumber = Number(metadata.episode_number);
	    this.poster = config.thumbnail.url;
	    streams.forEach(stream => {
	      try {
	        if (stream.audio_lang) {
	          const { language, country } = this.getLanguageAndCountry(stream.audio_lang);
	          Object.assign(stream, {
	            audio: {
	              language,
	              country
	            }
	          });
	        }
	      } catch (e) {
	      }
	      try {
	        const { language, country } = this.getLanguageAndCountry(stream.hardsub_lang);
	        Object.assign(stream, {
	          hardsub: {
	            language,
	            country
	          }
	        });
	      } catch (e) {
	      }
	    }, this);
	  }
	};

	var mustache$1 = {exports: {}};

	(function (module, exports) {
		(function (global, factory) {
		  module.exports = factory() ;
		}(commonjsGlobal, (function () {
		  /*!
		   * mustache.js - Logic-less {{mustache}} templates with JavaScript
		   * http://github.com/janl/mustache.js
		   */

		  var objectToString = Object.prototype.toString;
		  var isArray = Array.isArray || function isArrayPolyfill (object) {
		    return objectToString.call(object) === '[object Array]';
		  };

		  function isFunction (object) {
		    return typeof object === 'function';
		  }

		  /**
		   * More correct typeof string handling array
		   * which normally returns typeof 'object'
		   */
		  function typeStr (obj) {
		    return isArray(obj) ? 'array' : typeof obj;
		  }

		  function escapeRegExp (string) {
		    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
		  }

		  /**
		   * Null safe way of checking whether or not an object,
		   * including its prototype, has a given property
		   */
		  function hasProperty (obj, propName) {
		    return obj != null && typeof obj === 'object' && (propName in obj);
		  }

		  /**
		   * Safe way of detecting whether or not the given thing is a primitive and
		   * whether it has the given property
		   */
		  function primitiveHasOwnProperty (primitive, propName) {
		    return (
		      primitive != null
		      && typeof primitive !== 'object'
		      && primitive.hasOwnProperty
		      && primitive.hasOwnProperty(propName)
		    );
		  }

		  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
		  // See https://github.com/janl/mustache.js/issues/189
		  var regExpTest = RegExp.prototype.test;
		  function testRegExp (re, string) {
		    return regExpTest.call(re, string);
		  }

		  var nonSpaceRe = /\S/;
		  function isWhitespace (string) {
		    return !testRegExp(nonSpaceRe, string);
		  }

		  var entityMap = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#39;',
		    '/': '&#x2F;',
		    '`': '&#x60;',
		    '=': '&#x3D;'
		  };

		  function escapeHtml (string) {
		    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
		      return entityMap[s];
		    });
		  }

		  var whiteRe = /\s*/;
		  var spaceRe = /\s+/;
		  var equalsRe = /\s*=/;
		  var curlyRe = /\s*\}/;
		  var tagRe = /#|\^|\/|>|\{|&|=|!/;

		  /**
		   * Breaks up the given `template` string into a tree of tokens. If the `tags`
		   * argument is given here it must be an array with two string values: the
		   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
		   * course, the default is to use mustaches (i.e. mustache.tags).
		   *
		   * A token is an array with at least 4 elements. The first element is the
		   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
		   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
		   * all text that appears outside a symbol this element is "text".
		   *
		   * The second element of a token is its "value". For mustache tags this is
		   * whatever else was inside the tag besides the opening symbol. For text tokens
		   * this is the text itself.
		   *
		   * The third and fourth elements of the token are the start and end indices,
		   * respectively, of the token in the original template.
		   *
		   * Tokens that are the root node of a subtree contain two more elements: 1) an
		   * array of tokens in the subtree and 2) the index in the original template at
		   * which the closing tag for that section begins.
		   *
		   * Tokens for partials also contain two more elements: 1) a string value of
		   * indendation prior to that tag and 2) the index of that tag on that line -
		   * eg a value of 2 indicates the partial is the third tag on this line.
		   */
		  function parseTemplate (template, tags) {
		    if (!template)
		      return [];
		    var lineHasNonSpace = false;
		    var sections = [];     // Stack to hold section tokens
		    var tokens = [];       // Buffer to hold the tokens
		    var spaces = [];       // Indices of whitespace tokens on the current line
		    var hasTag = false;    // Is there a {{tag}} on the current line?
		    var nonSpace = false;  // Is there a non-space char on the current line?
		    var indentation = '';  // Tracks indentation for tags that use it
		    var tagIndex = 0;      // Stores a count of number of tags encountered on a line

		    // Strips all whitespace tokens array for the current line
		    // if there was a {{#tag}} on it and otherwise only space.
		    function stripSpace () {
		      if (hasTag && !nonSpace) {
		        while (spaces.length)
		          delete tokens[spaces.pop()];
		      } else {
		        spaces = [];
		      }

		      hasTag = false;
		      nonSpace = false;
		    }

		    var openingTagRe, closingTagRe, closingCurlyRe;
		    function compileTags (tagsToCompile) {
		      if (typeof tagsToCompile === 'string')
		        tagsToCompile = tagsToCompile.split(spaceRe, 2);

		      if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
		        throw new Error('Invalid tags: ' + tagsToCompile);

		      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
		      closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
		      closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
		    }

		    compileTags(tags || mustache.tags);

		    var scanner = new Scanner(template);

		    var start, type, value, chr, token, openSection;
		    while (!scanner.eos()) {
		      start = scanner.pos;

		      // Match any text between tags.
		      value = scanner.scanUntil(openingTagRe);

		      if (value) {
		        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
		          chr = value.charAt(i);

		          if (isWhitespace(chr)) {
		            spaces.push(tokens.length);
		            indentation += chr;
		          } else {
		            nonSpace = true;
		            lineHasNonSpace = true;
		            indentation += ' ';
		          }

		          tokens.push([ 'text', chr, start, start + 1 ]);
		          start += 1;

		          // Check for whitespace on the current line.
		          if (chr === '\n') {
		            stripSpace();
		            indentation = '';
		            tagIndex = 0;
		            lineHasNonSpace = false;
		          }
		        }
		      }

		      // Match the opening tag.
		      if (!scanner.scan(openingTagRe))
		        break;

		      hasTag = true;

		      // Get the tag type.
		      type = scanner.scan(tagRe) || 'name';
		      scanner.scan(whiteRe);

		      // Get the tag value.
		      if (type === '=') {
		        value = scanner.scanUntil(equalsRe);
		        scanner.scan(equalsRe);
		        scanner.scanUntil(closingTagRe);
		      } else if (type === '{') {
		        value = scanner.scanUntil(closingCurlyRe);
		        scanner.scan(curlyRe);
		        scanner.scanUntil(closingTagRe);
		        type = '&';
		      } else {
		        value = scanner.scanUntil(closingTagRe);
		      }

		      // Match the closing tag.
		      if (!scanner.scan(closingTagRe))
		        throw new Error('Unclosed tag at ' + scanner.pos);

		      if (type == '>') {
		        token = [ type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace ];
		      } else {
		        token = [ type, value, start, scanner.pos ];
		      }
		      tagIndex++;
		      tokens.push(token);

		      if (type === '#' || type === '^') {
		        sections.push(token);
		      } else if (type === '/') {
		        // Check section nesting.
		        openSection = sections.pop();

		        if (!openSection)
		          throw new Error('Unopened section "' + value + '" at ' + start);

		        if (openSection[1] !== value)
		          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
		      } else if (type === 'name' || type === '{' || type === '&') {
		        nonSpace = true;
		      } else if (type === '=') {
		        // Set the tags for the next time around.
		        compileTags(value);
		      }
		    }

		    stripSpace();

		    // Make sure there are no open sections when we're done.
		    openSection = sections.pop();

		    if (openSection)
		      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

		    return nestTokens(squashTokens(tokens));
		  }

		  /**
		   * Combines the values of consecutive text tokens in the given `tokens` array
		   * to a single token.
		   */
		  function squashTokens (tokens) {
		    var squashedTokens = [];

		    var token, lastToken;
		    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
		      token = tokens[i];

		      if (token) {
		        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
		          lastToken[1] += token[1];
		          lastToken[3] = token[3];
		        } else {
		          squashedTokens.push(token);
		          lastToken = token;
		        }
		      }
		    }

		    return squashedTokens;
		  }

		  /**
		   * Forms the given array of `tokens` into a nested tree structure where
		   * tokens that represent a section have two additional items: 1) an array of
		   * all tokens that appear in that section and 2) the index in the original
		   * template that represents the end of that section.
		   */
		  function nestTokens (tokens) {
		    var nestedTokens = [];
		    var collector = nestedTokens;
		    var sections = [];

		    var token, section;
		    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
		      token = tokens[i];

		      switch (token[0]) {
		        case '#':
		        case '^':
		          collector.push(token);
		          sections.push(token);
		          collector = token[4] = [];
		          break;
		        case '/':
		          section = sections.pop();
		          section[5] = token[2];
		          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
		          break;
		        default:
		          collector.push(token);
		      }
		    }

		    return nestedTokens;
		  }

		  /**
		   * A simple string scanner that is used by the template parser to find
		   * tokens in template strings.
		   */
		  function Scanner (string) {
		    this.string = string;
		    this.tail = string;
		    this.pos = 0;
		  }

		  /**
		   * Returns `true` if the tail is empty (end of string).
		   */
		  Scanner.prototype.eos = function eos () {
		    return this.tail === '';
		  };

		  /**
		   * Tries to match the given regular expression at the current position.
		   * Returns the matched text if it can match, the empty string otherwise.
		   */
		  Scanner.prototype.scan = function scan (re) {
		    var match = this.tail.match(re);

		    if (!match || match.index !== 0)
		      return '';

		    var string = match[0];

		    this.tail = this.tail.substring(string.length);
		    this.pos += string.length;

		    return string;
		  };

		  /**
		   * Skips all text until the given regular expression can be matched. Returns
		   * the skipped string, which is the entire tail if no match can be made.
		   */
		  Scanner.prototype.scanUntil = function scanUntil (re) {
		    var index = this.tail.search(re), match;

		    switch (index) {
		      case -1:
		        match = this.tail;
		        this.tail = '';
		        break;
		      case 0:
		        match = '';
		        break;
		      default:
		        match = this.tail.substring(0, index);
		        this.tail = this.tail.substring(index);
		    }

		    this.pos += match.length;

		    return match;
		  };

		  /**
		   * Represents a rendering context by wrapping a view object and
		   * maintaining a reference to the parent context.
		   */
		  function Context (view, parentContext) {
		    this.view = view;
		    this.cache = { '.': this.view };
		    this.parent = parentContext;
		  }

		  /**
		   * Creates a new context using the given view with this context
		   * as the parent.
		   */
		  Context.prototype.push = function push (view) {
		    return new Context(view, this);
		  };

		  /**
		   * Returns the value of the given name in this context, traversing
		   * up the context hierarchy if the value is absent in this context's view.
		   */
		  Context.prototype.lookup = function lookup (name) {
		    var cache = this.cache;

		    var value;
		    if (cache.hasOwnProperty(name)) {
		      value = cache[name];
		    } else {
		      var context = this, intermediateValue, names, index, lookupHit = false;

		      while (context) {
		        if (name.indexOf('.') > 0) {
		          intermediateValue = context.view;
		          names = name.split('.');
		          index = 0;

		          /**
		           * Using the dot notion path in `name`, we descend through the
		           * nested objects.
		           *
		           * To be certain that the lookup has been successful, we have to
		           * check if the last object in the path actually has the property
		           * we are looking for. We store the result in `lookupHit`.
		           *
		           * This is specially necessary for when the value has been set to
		           * `undefined` and we want to avoid looking up parent contexts.
		           *
		           * In the case where dot notation is used, we consider the lookup
		           * to be successful even if the last "object" in the path is
		           * not actually an object but a primitive (e.g., a string, or an
		           * integer), because it is sometimes useful to access a property
		           * of an autoboxed primitive, such as the length of a string.
		           **/
		          while (intermediateValue != null && index < names.length) {
		            if (index === names.length - 1)
		              lookupHit = (
		                hasProperty(intermediateValue, names[index])
		                || primitiveHasOwnProperty(intermediateValue, names[index])
		              );

		            intermediateValue = intermediateValue[names[index++]];
		          }
		        } else {
		          intermediateValue = context.view[name];

		          /**
		           * Only checking against `hasProperty`, which always returns `false` if
		           * `context.view` is not an object. Deliberately omitting the check
		           * against `primitiveHasOwnProperty` if dot notation is not used.
		           *
		           * Consider this example:
		           * ```
		           * Mustache.render("The length of a football field is {{#length}}{{length}}{{/length}}.", {length: "100 yards"})
		           * ```
		           *
		           * If we were to check also against `primitiveHasOwnProperty`, as we do
		           * in the dot notation case, then render call would return:
		           *
		           * "The length of a football field is 9."
		           *
		           * rather than the expected:
		           *
		           * "The length of a football field is 100 yards."
		           **/
		          lookupHit = hasProperty(context.view, name);
		        }

		        if (lookupHit) {
		          value = intermediateValue;
		          break;
		        }

		        context = context.parent;
		      }

		      cache[name] = value;
		    }

		    if (isFunction(value))
		      value = value.call(this.view);

		    return value;
		  };

		  /**
		   * A Writer knows how to take a stream of tokens and render them to a
		   * string, given a context. It also maintains a cache of templates to
		   * avoid the need to parse the same template twice.
		   */
		  function Writer () {
		    this.templateCache = {
		      _cache: {},
		      set: function set (key, value) {
		        this._cache[key] = value;
		      },
		      get: function get (key) {
		        return this._cache[key];
		      },
		      clear: function clear () {
		        this._cache = {};
		      }
		    };
		  }

		  /**
		   * Clears all cached templates in this writer.
		   */
		  Writer.prototype.clearCache = function clearCache () {
		    if (typeof this.templateCache !== 'undefined') {
		      this.templateCache.clear();
		    }
		  };

		  /**
		   * Parses and caches the given `template` according to the given `tags` or
		   * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
		   * that is generated from the parse.
		   */
		  Writer.prototype.parse = function parse (template, tags) {
		    var cache = this.templateCache;
		    var cacheKey = template + ':' + (tags || mustache.tags).join(':');
		    var isCacheEnabled = typeof cache !== 'undefined';
		    var tokens = isCacheEnabled ? cache.get(cacheKey) : undefined;

		    if (tokens == undefined) {
		      tokens = parseTemplate(template, tags);
		      isCacheEnabled && cache.set(cacheKey, tokens);
		    }
		    return tokens;
		  };

		  /**
		   * High-level method that is used to render the given `template` with
		   * the given `view`.
		   *
		   * The optional `partials` argument may be an object that contains the
		   * names and templates of partials that are used in the template. It may
		   * also be a function that is used to load partial templates on the fly
		   * that takes a single argument: the name of the partial.
		   *
		   * If the optional `config` argument is given here, then it should be an
		   * object with a `tags` attribute or an `escape` attribute or both.
		   * If an array is passed, then it will be interpreted the same way as
		   * a `tags` attribute on a `config` object.
		   *
		   * The `tags` attribute of a `config` object must be an array with two
		   * string values: the opening and closing tags used in the template (e.g.
		   * [ "<%", "%>" ]). The default is to mustache.tags.
		   *
		   * The `escape` attribute of a `config` object must be a function which
		   * accepts a string as input and outputs a safely escaped string.
		   * If an `escape` function is not provided, then an HTML-safe string
		   * escaping function is used as the default.
		   */
		  Writer.prototype.render = function render (template, view, partials, config) {
		    var tags = this.getConfigTags(config);
		    var tokens = this.parse(template, tags);
		    var context = (view instanceof Context) ? view : new Context(view, undefined);
		    return this.renderTokens(tokens, context, partials, template, config);
		  };

		  /**
		   * Low-level method that renders the given array of `tokens` using
		   * the given `context` and `partials`.
		   *
		   * Note: The `originalTemplate` is only ever used to extract the portion
		   * of the original template that was contained in a higher-order section.
		   * If the template doesn't use higher-order sections, this argument may
		   * be omitted.
		   */
		  Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate, config) {
		    var buffer = '';

		    var token, symbol, value;
		    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
		      value = undefined;
		      token = tokens[i];
		      symbol = token[0];

		      if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);
		      else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);
		      else if (symbol === '>') value = this.renderPartial(token, context, partials, config);
		      else if (symbol === '&') value = this.unescapedValue(token, context);
		      else if (symbol === 'name') value = this.escapedValue(token, context, config);
		      else if (symbol === 'text') value = this.rawValue(token);

		      if (value !== undefined)
		        buffer += value;
		    }

		    return buffer;
		  };

		  Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate, config) {
		    var self = this;
		    var buffer = '';
		    var value = context.lookup(token[1]);

		    // This function is used to render an arbitrary template
		    // in the current context by higher-order sections.
		    function subRender (template) {
		      return self.render(template, context, partials, config);
		    }

		    if (!value) return;

		    if (isArray(value)) {
		      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
		        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
		      }
		    } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
		      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
		    } else if (isFunction(value)) {
		      if (typeof originalTemplate !== 'string')
		        throw new Error('Cannot use higher-order sections without the original template');

		      // Extract the portion of the original template that the section contains.
		      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

		      if (value != null)
		        buffer += value;
		    } else {
		      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
		    }
		    return buffer;
		  };

		  Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate, config) {
		    var value = context.lookup(token[1]);

		    // Use JavaScript's definition of falsy. Include empty arrays.
		    // See https://github.com/janl/mustache.js/issues/186
		    if (!value || (isArray(value) && value.length === 0))
		      return this.renderTokens(token[4], context, partials, originalTemplate, config);
		  };

		  Writer.prototype.indentPartial = function indentPartial (partial, indentation, lineHasNonSpace) {
		    var filteredIndentation = indentation.replace(/[^ \t]/g, '');
		    var partialByNl = partial.split('\n');
		    for (var i = 0; i < partialByNl.length; i++) {
		      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
		        partialByNl[i] = filteredIndentation + partialByNl[i];
		      }
		    }
		    return partialByNl.join('\n');
		  };

		  Writer.prototype.renderPartial = function renderPartial (token, context, partials, config) {
		    if (!partials) return;
		    var tags = this.getConfigTags(config);

		    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
		    if (value != null) {
		      var lineHasNonSpace = token[6];
		      var tagIndex = token[5];
		      var indentation = token[4];
		      var indentedValue = value;
		      if (tagIndex == 0 && indentation) {
		        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
		      }
		      var tokens = this.parse(indentedValue, tags);
		      return this.renderTokens(tokens, context, partials, indentedValue, config);
		    }
		  };

		  Writer.prototype.unescapedValue = function unescapedValue (token, context) {
		    var value = context.lookup(token[1]);
		    if (value != null)
		      return value;
		  };

		  Writer.prototype.escapedValue = function escapedValue (token, context, config) {
		    var escape = this.getConfigEscape(config) || mustache.escape;
		    var value = context.lookup(token[1]);
		    if (value != null)
		      return (typeof value === 'number' && escape === mustache.escape) ? String(value) : escape(value);
		  };

		  Writer.prototype.rawValue = function rawValue (token) {
		    return token[1];
		  };

		  Writer.prototype.getConfigTags = function getConfigTags (config) {
		    if (isArray(config)) {
		      return config;
		    }
		    else if (config && typeof config === 'object') {
		      return config.tags;
		    }
		    else {
		      return undefined;
		    }
		  };

		  Writer.prototype.getConfigEscape = function getConfigEscape (config) {
		    if (config && typeof config === 'object' && !isArray(config)) {
		      return config.escape;
		    }
		    else {
		      return undefined;
		    }
		  };

		  var mustache = {
		    name: 'mustache.js',
		    version: '4.2.0',
		    tags: [ '{{', '}}' ],
		    clearCache: undefined,
		    escape: undefined,
		    parse: undefined,
		    render: undefined,
		    Scanner: undefined,
		    Context: undefined,
		    Writer: undefined,
		    /**
		     * Allows a user to override the default caching strategy, by providing an
		     * object with set, get and clear methods. This can also be used to disable
		     * the cache by setting it to the literal `undefined`.
		     */
		    set templateCache (cache) {
		      defaultWriter.templateCache = cache;
		    },
		    /**
		     * Gets the default or overridden caching object from the default writer.
		     */
		    get templateCache () {
		      return defaultWriter.templateCache;
		    }
		  };

		  // All high-level mustache.* functions use this writer.
		  var defaultWriter = new Writer();

		  /**
		   * Clears all cached templates in the default writer.
		   */
		  mustache.clearCache = function clearCache () {
		    return defaultWriter.clearCache();
		  };

		  /**
		   * Parses and caches the given template in the default writer and returns the
		   * array of tokens it contains. Doing this ahead of time avoids the need to
		   * parse templates on the fly as they are rendered.
		   */
		  mustache.parse = function parse (template, tags) {
		    return defaultWriter.parse(template, tags);
		  };

		  /**
		   * Renders the `template` with the given `view`, `partials`, and `config`
		   * using the default writer.
		   */
		  mustache.render = function render (template, view, partials, config) {
		    if (typeof template !== 'string') {
		      throw new TypeError('Invalid template! Template should be a "string" ' +
		                          'but "' + typeStr(template) + '" was given as the first ' +
		                          'argument for mustache#render(template, view, partials)');
		    }

		    return defaultWriter.render(template, view, partials, config);
		  };

		  // Export the escaping function so that the user may override it.
		  // See https://github.com/janl/mustache.js/issues/244
		  mustache.escape = escapeHtml;

		  // Export these mainly for testing, but also for advanced usage.
		  mustache.Scanner = Scanner;
		  mustache.Context = Context;
		  mustache.Writer = Writer;

		  return mustache;

		})));
	} (mustache$1));

	const mustache = mustache$1.exports;
	const Episode$1 = episode;

	const tokenURL = 'https://www.crunchyroll.com/auth/v1/token';
	const signatureURL = 'https://www.crunchyroll.com/index/v2';
	const queryParams = '?Signature={{signature}}&Policy={{policy}}&Key-Pair-Id={{keyPairID}}';
	const metadataURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/objects/{{videoID}}${queryParams}`;
	const streamsURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/videos/{{videoID}}/streams${queryParams}`;

	const videoIDRegex = /https?:\/\/(.*\.)?crunchyroll\.com\/(\S+\/)?watch\/([a-zA-Z0-9_]+)(\/.*)?/;

	const defaultCMSType = 'cms';

	var beta = class NewEpisode extends Episode$1 {
	  /**
	   *
	   * @param {import('./types').AuthInfo} authInfo
	   * @param {string[]} templates
	   * @returns
	   */
	  async fetchMetadataURL ({ videoID, keyPairID, policy, signature, cmsBucket }, templates = [metadataURLTemplate]) {
	    const { axios } = this;
	    for (const urlTemplate of templates) {
	      try {
	        const metadataURL = mustache.render(urlTemplate, {
	          cmsBucket,
	          videoID,
	          keyPairID,
	          policy,
	          signature
	        });
	        const response = await axios.get(metadataURL);
	        return response
	      } catch (e) {
	      }
	    }
	    throw new Error('Failed to fetch data from all metadata URLs')
	  }

	  /**
	   *
	   * @param {string} href
	   * @param {import('./types').AuthInfo} authInfo
	   * @param {string[]} templates
	   * @returns
	   */
	  async fetchStreamsURL (href, { videoID, keyPairID, policy, signature, cmsBucket }, templates = [streamsURLTemplate]) {
	    const { axios } = this;
	    for (const streamsURLTemplate of templates) {
	      try {
	        const streamsURL = mustache.render(streamsURLTemplate, {
	          cmsBucket,
	          videoID,
	          keyPairID,
	          policy,
	          signature
	        });
	        const response = await axios.get(streamsURL);
	        return response
	      } catch (e) {
	      }
	    }
	    throw new Error('Failed to fetch data from all streams URLs')
	  }

	  /**
	   *
	   * @returns {Promise<string>}
	   */
	  async getAccessToken () {
	    const { axios, basicAuth } = this;
	    // We need to try two grant types
	    const grantTypes = ['etp_rt_cookie', 'client_id'];
	    for (const grantType of grantTypes) {
	      const params = new URLSearchParams();
	      params.set('grant_type', grantType);
	      try {
	        const response = await axios.post(tokenURL, params, {
	          headers: {
	            Authorization: `Basic ${basicAuth}`,
	            'content-type': 'application/x-www-form-urlencoded'
	          },
	          withCredentials: true
	        });
	        const { data: { access_token: accessToken } } = response;
	        return accessToken
	      } catch (e) {
	      }
	    }
	    throw new Error('Failed to get access token')
	  }

	  async parse () {
	    const { axios } = this;
	    let response;
	    if (!this.basicAuth) {
	      response = await axios.get(this.url);
	      // Get config
	      const data = response.data;
	      const { basicAuth } = await this.getConfigForParse(data);
	      this.basicAuth = basicAuth;
	    }
	    const accessToken = await this.getAccessToken();
	    response = await axios.get(signatureURL, {
	      headers: {
	        Authorization: `Bearer ${accessToken}`
	      }
	    });
	    const cmsType = this.cmsType || defaultCMSType;
	    const { data: { [cmsType]: { bucket: cmsBucket, key_pair_id: keyPairID, policy, signature } } } = response;
	    this.keyPairID = keyPairID;
	    this.policy = policy;
	    this.signature = signature;

	    // Get config
	    const match = videoIDRegex.exec(this.url);
	    if (!match) {
	      const err = new Error('Failed to match videoID regex to url');
	      err.data = { url: this.url, cmsBucket };
	      throw err
	    }
	    const videoID = match[3];
	    response = await this.fetchMetadataURL({ videoID, keyPairID, policy, signature, cmsBucket }, [metadataURLTemplate]);
	    const { data: { items: [objectMetadata] } } = response;
	    const { episode_metadata: metadata } = objectMetadata;
	    this.objectMetadata = objectMetadata;
	    this.metadata = metadata;
	    // Convert this to be in the same format as the older config so we get some parsing for free
	    metadata.title = this.objectMetadata.title;
	    this.seriesTitle = metadata.series_title;
	    this.seasonIndex = metadata.season_number;

	    this.config = { metadata };
	    // Poster
	    try {
	      const { images: { thumbnail: [thumbnails] } } = objectMetadata;
	      this.config.thumbnail = { url: thumbnails[thumbnails.length - 1].source };
	    } catch (e) {
	      this.config.thumbnail = { url: '' };
	    }
	    let streamsHref;
	    const streamsTemplates = [streamsURLTemplate];
	    try {
	      ;({ __links__: { streams: { href: streamsHref } } } = objectMetadata);
	      if (streamsHref) {
	        const altTemplate = `${new URL(streamsURLTemplate).origin}${streamsHref}${queryParams}`;
	        streamsTemplates.unshift(altTemplate);
	      }
	    } catch (e) {
	    }
	    response = await this.fetchStreamsURL(streamsHref, { videoID, keyPairID, policy, signature, cmsBucket }, streamsTemplates);
	    const { data: { streams: streamsRaw, subtitles: subtitlesRaw } } = response;
	    // We're going to have to convert this streams object to the old format
	    const streams = [];
	    for (const [type, data] of Object.entries(streamsRaw)) {
	      for (const [locale, entry] of Object.entries(data)) {
	        const stream = {};
	        stream.format = type;
	        stream.audio_lang = locale || 'default';
	        stream.hardsub_lang = entry.hardsub_locale;
	        stream.url = entry.url;
	        streams.push(stream);
	      }
	    }

	    const subtitles = [];
	    for (const data of Object.values(subtitlesRaw)) {
	      const { locale, format, url } = data;
	      let language;
	      let country;
	      let title;
	      try {
	        ({ language, country } = this.getLanguageAndCountry(locale));
	        title = `${language} (${country})`;
	      } catch (e) {
	        language = locale ? locale.substring(0, 2) : '--';
	        country = '';
	        title = 'Unknown';
	      }
	      const subtitle = {
	        url,
	        title,
	        language,
	        country,
	        format,
	        kind: 'captions'
	      };
	      subtitles.push(subtitle);
	    }

	    Object.assign(this.config, {
	      streams,
	      subtitles
	    });
	    await this.processMetadata();
	  }

	  async isPremiumVideo () {
	    if (!this.metadata) {
	      await this.parse();
	    }
	    const { metadata: { is_premium_only: isPremiumVideo } } = this;
	    return !!isPremiumVideo
	  }

	  // This function returns the basicAuth
	  /**
	   *
	   * @param {string} data
	   * @returns {Promise<any>}
	   */
	  async getConfigForParse (data) {
	    // This data contains the accountAuthClientId parameter that we need
	    const regex = /"accountAuthClientId":\s*"(.*?)"/g;
	    const match = regex.exec(data);
	    if (!match) {
	      throw new Error('Did not find expected pattern')
	    }
	    const id = match[1];
	    const basicAuth = btoa(`${id}:`); // This is the format they use..for some reason
	    return { basicAuth }
	  }
	};

	const Axios = axios$2.exports;
	const Episode = episode;
	const BetaEpisode = beta;
	const Subtitle = subtitle;

	async function getEpisode (url, config, axios = Axios) {
	  /** @type {Episode} */
	  const episode = new BetaEpisode(url, config, axios);
	  await episode.parse();
	  return episode
	}

	var src = {
	  BetaEpisode,
	  Episode,
	  Subtitle,
	  getEpisode
	};

	return src;

}));
