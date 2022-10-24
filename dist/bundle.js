(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Crunchyroll"] = factory();
	else
		root["Crunchyroll"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

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

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
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
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
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
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

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
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
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
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
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
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
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

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
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

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
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


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

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
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
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
      a[key] = bind(val, thisArg);
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

module.exports = {
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


/***/ }),

/***/ "./node_modules/mustache/mustache.js":
/*!*******************************************!*\
  !*** ./node_modules/mustache/mustache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// This file has been generated from mustache.mjs
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

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
    version: '4.1.0',
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


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
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

process.nextTick = function (fun) {
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
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/subsrt/lib/format sync recursive ^\\.\\/.*\\.js$":
/*!**********************************************************!*\
  !*** ./node_modules/subsrt/lib/format sync ^\.\/.*\.js$ ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ass.js": "./node_modules/subsrt/lib/format/ass.js",
	"./json.js": "./node_modules/subsrt/lib/format/json.js",
	"./lrc.js": "./node_modules/subsrt/lib/format/lrc.js",
	"./sbv.js": "./node_modules/subsrt/lib/format/sbv.js",
	"./smi.js": "./node_modules/subsrt/lib/format/smi.js",
	"./srt.js": "./node_modules/subsrt/lib/format/srt.js",
	"./ssa.js": "./node_modules/subsrt/lib/format/ssa.js",
	"./sub.js": "./node_modules/subsrt/lib/format/sub.js",
	"./vtt.js": "./node_modules/subsrt/lib/format/vtt.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/subsrt/lib/format sync recursive ^\\.\\/.*\\.js$";

/***/ }),

/***/ "./node_modules/subsrt/lib/format/ass.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/ass.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "ass";

//Compatible format
var ssa = __webpack_require__(/*! ./ssa.js */ "./node_modules/subsrt/lib/format/ssa.js");

module.exports = {
  name: FORMAT_NAME,
  helper: ssa.helper,
  detect: ssa.detect,
  parse: ssa.parse,
  build: ssa.build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/json.js":
/*!************************************************!*\
  !*** ./node_modules/subsrt/lib/format/json.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "json";

/******************************************************************************************
 * Parses captions in JSON format
 ******************************************************************************************/
function parse(content, options) {
  return JSON.parse(content);
};

/******************************************************************************************
 * Builds captions in JSON format
 ******************************************************************************************/
function build(captions, options) {
  return JSON.stringify(captions, " ", 2);
}

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === "string") {
    if (/^\[[\s\r\n]*\{[\s\S]*\}[\s\r\n]*\]$/g.test(content)) {
      /*
      [
        { ... }
      ]
      */
      return "json";
    }
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/lrc.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/lrc.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "lrc";

var helper = {
  toMilliseconds: function(s) {
    var match = /^\s*(\d+):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var mm = parseInt(match[1]);
    var ss = parseInt(match[2]);
    var ff = match[4] ? parseInt(match[4]) : 0;
    var ms = mm * 60 * 1000 + ss * 1000 + ff * 10;
    return ms;
  },
  toTimeString: function(ms) {
    var mm = Math.floor(ms / 1000 / 60);
    var ss = Math.floor(ms / 1000 % 60);
    var ff = Math.floor(ms % 1000);
    var time = (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + "." + (ff < 100 ? "0" : "") + (ff < 10 ? "0" : Math.floor(ff / 10));
    return time;
  }
};

/******************************************************************************************
 * Parses captions in LRC format: https://en.wikipedia.org/wiki/LRC_%28file_format%29
 ******************************************************************************************/
function parse(content, options) {
  var prev = null;
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i] || parts[i].trim().length == 0) {
      continue;
    }
  
    //LRC content
    var regex = /^\[(\d{1,2}:\d{1,2}([.,]\d{1,3})?)\](.*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.start = helper.toMilliseconds(match[1]);
      caption.end = caption.start + 2000;
      caption.duration = caption.end - caption.start;
      caption.content = match[3];
      caption.text = caption.content;
      captions.push(caption);
      
      //Update previous
      if (prev) {
        prev.end = caption.start;
        prev.duration = prev.end - prev.start;
      }
      prev = caption;
      continue;
    }
    
    //LRC meta
    var meta = /^\[([\w\d]+):([^\]]*)\](\r?\n)*$/gi.exec(parts[i]);
    if (meta) {
      var caption = { };
      caption.type = "meta";
      caption.tag = meta[1];
      if (meta[2]) {
        caption.data = meta[2];
      }
      captions.push(caption);
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in LRC format: https://en.wikipedia.org/wiki/LRC_%28file_format%29
 ******************************************************************************************/
function build(captions, options) {
  var content = "";
  var lyrics = false;
  var eol = options.eol || "\r\n";
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (caption.type == "meta") {
      if (caption.tag && caption.data) {
        content += "[" + caption.tag + ":" + caption.data.replace(/[\r\n]+/g, " ") + "]" + eol;
      }
      continue;
    }
    
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      if (!lyrics) {
        content += eol; //New line when lyrics start
        lyrics = true;
      }
      content += "[" + helper.toTimeString(caption.start) + "]" + caption.text + eol;
      continue;
    }
    
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return content;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === "string") {
    if (/\r?\n\[(\d+:\d{1,2}([.,]\d{1,3})?)\](.*)\r?\n/.test(content)) {
      /*
      [04:48.28]Sister, perfume?
      */
      //return "lrc";
      return true;
    }
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/sbv.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/sbv.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "sbv";

var helper = {
  toMilliseconds: function(s) {
    var match = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var hh = parseInt(match[1]);
    var mm = parseInt(match[2]);
    var ss = parseInt(match[3]);
    var ff = match[5] ? parseInt(match[5]) : 0;
    var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
    return ms;
  },
  toTimeString: function(ms) {
    var hh = Math.floor(ms / 1000 / 3600);
    var mm = Math.floor(ms / 1000 / 60 % 60);
    var ss = Math.floor(ms / 1000 % 60);
    var ff = Math.floor(ms % 1000);
    var time = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + "." + (ff < 100 ? "0" : "") + (ff < 10 ? "0" : "") + ff;
    return time;
  }
};

/******************************************************************************************
 * Parses captions in SubViewer format (.sbv)
 ******************************************************************************************/
function parse(content, options) {
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n\s+\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    var regex = /^(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*[,;]\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.start = helper.toMilliseconds(match[1]);
      caption.end = helper.toMilliseconds(match[3]);
      caption.duration = caption.end - caption.start;
      var lines = match[5].split(/\[br\]|\r?\n/gi);
      caption.content = lines.join(eol);
      caption.text = caption.content.replace(/\>\>\s*[^:]+:\s*/g, ""); //>> SPEAKER NAME: 
      captions.push(caption);
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in SubViewer format (.sbv)
 ******************************************************************************************/
function build(captions, options) {
  var content = "";
  var eol = options.eol || "\r\n";
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      content += helper.toTimeString(caption.start) + "," + helper.toTimeString(caption.end) + eol;
      content += caption.text + eol;
      content += eol;
      continue;
    }
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return content;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content !== "string") {
    throw new Error("Expected string content!");
  }
  
  if (/\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?\s*[,;]\s*\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?/g.test(content)) {
    /*
    00:04:48.280,00:04:50.510
    Sister, perfume?
    */
    return "sbv";
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/smi.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/smi.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "smi";

var helper = {
  htmlEncode: function(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      //.replace(/\s/g, '&nbsp;')
      .replace(/\r?\n/g, '<BR>');
  },
  htmlDecode: function(html, eol){
    return html
      .replace(/\<BR\s*\/?\>/gi, eol || '\r\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  }
};

/******************************************************************************************
 * Parses captions in SAMI format (.smi)
 ******************************************************************************************/
function parse(content, options) {
  var captions = [ ];
  var eol = options.eol || "\r\n";
  
  var title = /\<TITLE[^\>]*\>([\s\S]*)\<\/TITLE\>/gi.exec(content);
  if (title) {
    var caption = { };
    caption.type = "meta";
    caption.name = "title";
    caption.data = title[1].replace(/^[\s\r\n]*/g, "").replace(/[\s\r\n]*$/g, "");
    captions.push(caption);
  }
  
  var style = /\<STYLE[^\>]*\>([\s\S]*)\<\/STYLE\>/gi.exec(content);
  if (style) {
    var caption = { };
    caption.type = "meta";
    caption.name = "style";
    caption.data = style[1];
    captions.push(caption);
  }
  
  var sami = content
    .replace(/^[\s\S]*\<BODY[^\>]*\>/gi, "") //Remove content before body
    .replace(/\<\/BODY[^\>]*\>[\s\S]*$/gi, ""); //Remove content after body
    
  var prev = null;
  var parts = sami.split(/\<SYNC/gi);
  for (var i = 0; i < parts.length; i++) {
    if (!parts[i] || parts[i].trim().length == 0) {
      continue;
    }
    
    var part = '<SYNC' + parts[i];
    
    //<SYNC Start = 1000>
    var match = /^\<SYNC[^\>]+Start\s*=\s*["']?(\d+)["']?[^\>]*\>([\s\S]*)/gi.exec(part);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.start = parseInt(match[1]);
      caption.end = caption.start + 2000;
      caption.duration = caption.end - caption.start;
      caption.content = match[2].replace(/^\<\/SYNC[^\>]*>/gi, "");
      
      var blank = true;
      var p = /^\<P[^\>]+Class\s*=\s*["']?([\w\d\-_]+)["']?[^\>]*\>([\s\S]*)/gi.exec(caption.content);
      if (!p) {
        p = /^\<P([^\>]*)\>([\s\S]*)/gi.exec(caption.content);
      }
      if (p) {
        var html = p[2].replace(/\<P[\s\S]+$/gi, ""); //Remove string after another <P> tag
        html = html.replace(/\<BR\s*\/?\>[\s\r\n]+/gi, eol).replace(/\<BR\s*\/?\>/gi, eol).replace(/\<[^\>]+\>/g, ""); //Remove all tags
        html = html.replace(/^[\s\r\n]+/g, "").replace(/[\s\r\n]+$/g, ""); //Trim new lines and spaces
        blank = (html.replace(/&nbsp;/gi, " ").replace(/[\s\r\n]+/g, "").length == 0);
        caption.text  = helper.htmlDecode(html, eol);
      }
      
      if (!options.preserveSpaces && blank) {
        if (options.verbose) {
          console.log("INFO: Skipping white space caption at " + caption.start);
        }
      }
      else {
        captions.push(caption);
      }
      
      //Update previous
      if (prev) {
        prev.end = caption.start;
        prev.duration = prev.end - prev.start;
      }
      prev = caption;
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  
  return captions;
};

/******************************************************************************************
 * Builds captions in SAMI format (.smi)
 ******************************************************************************************/
function build(captions, options) {
  var eol = options.eol || "\r\n";
  
  var content = "";
  content += '<SAMI>' + eol;
  content += '<HEAD>' + eol;
  content += '<TITLE>' + (options.title || "") + '</TITLE>' + eol;
  content += '<STYLE TYPE="text/css">' + eol;
  content += '<!--' + eol;
  content += 'P { font-family: Arial; font-weight: normal; color: white; background-color: black; text-align: center; }' + eol;
  content += '.LANG { Name: ' + (options.langName || "English") + '; lang: ' + (options.langCode || "en-US") + '; SAMIType: CC; }' + eol;
  content += '-->' + eol;
  content += '</STYLE>' + eol;
  content += '</HEAD>' + eol;
  content += '<BODY>' + eol;
  
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (caption.type == "meta") {
      continue;
    }
    
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      //Start of caption
      content += '<SYNC Start=' + caption.start + '>' + eol;
      content += '  <P Class=LANG>' + helper.htmlEncode(caption.text || "") + (options.closeTags ? '</P>' : "") + eol;
      if (options.closeTags) {
        content += '</SYNC>' + eol;
      }
      
      //Blank line indicates the end of caption
      content += '<SYNC Start=' + caption.end + '>' + eol;
      content += '  <P Class=LANG>' + '&nbsp;' + (options.closeTags ? '</P>' : "") + eol;
      if (options.closeTags) {
        content += '</SYNC>' + eol;
      }
      
      continue;
    }
    
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }

  content += '</BODY>' + eol;
  content += '</SAMI>' + eol;
  
  return content;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === "string") {
    if (/\<SAMI[^\>]*\>[\s\S]*\<BODY[^\>]*\>/g.test(content)) {
      /*
      <SAMI>
      <BODY>
      <SYNC Start=...
      ...
      </BODY>
      </SAMI>
      */
      return "smi";
    }
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/srt.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/srt.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "srt";

var helper = {
  toMilliseconds: function(s) {
    var match = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var hh = parseInt(match[1]);
    var mm = parseInt(match[2]);
    var ss = parseInt(match[3]);
    var ff = match[5] ? parseInt(match[5]) : 0;
    var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
    return ms;
  },
  toTimeString: function(ms) {
    var hh = Math.floor(ms / 1000 / 3600);
    var mm = Math.floor(ms / 1000 / 60 % 60);
    var ss = Math.floor(ms / 1000 % 60);
    var ff = Math.floor(ms % 1000);
    var time = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + "," + (ff < 100 ? "0" : "") + (ff < 10 ? "0" : "") + ff;
    return time;
  }
};

/******************************************************************************************
 * Parses captions in SubRip format (.srt)
 ******************************************************************************************/
function parse(content, options) {
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n\s+\r?\n/g);
  for (var i = 0; i < parts.length; i++) {
    var regex = /^(\d+)\r?\n(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.index = parseInt(match[1]);
      caption.start = helper.toMilliseconds(match[2]);
      caption.end = helper.toMilliseconds(match[4]);
      caption.duration = caption.end - caption.start;
      var lines = match[6].split(/\r?\n/);
      caption.content = lines.join(eol);
      caption.text = caption.content
        .replace(/\<[^\>]+\>/g, "") //<b>bold</b> or <i>italic</i>
        .replace(/\{[^\}]+\}/g, "") //{b}bold{/b} or {i}italic{/i}
        .replace(/\>\>\s*[^:]*:\s*/g, ""); //>> SPEAKER NAME: 
      captions.push(caption);
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in SubRip format (.srt)
 ******************************************************************************************/
function build(captions, options) {
  var srt = "";
  var eol = options.eol || "\r\n";
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      srt += (i + 1).toString() + eol;
      srt += helper.toTimeString(caption.start) + " --> " + helper.toTimeString(caption.end) + eol;
      srt += caption.text + eol;
      srt += eol;
      continue;
    }
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return srt;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === "string") {
    if (/\d+\r?\n\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?\s*\-\-\>\s*\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?/g.test(content)) {
      /*
      3
      00:04:48,280 --> 00:04:50,510
      Sister, perfume?
      */
      return FORMAT_NAME;
    }
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/ssa.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/ssa.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "ssa";

var helper = {
  toMilliseconds: function(s) {
    var match = /^\s*(\d+:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var hh = match[1] ? parseInt(match[1].replace(":", "")) : 0;
    var mm = parseInt(match[2]);
    var ss = parseInt(match[3]);
    var ff = match[5] ? parseInt(match[5]) : 0;
    var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff * 10;
    return ms;
  },
  toTimeString: function(ms) {
    var hh = Math.floor(ms/ 1000 / 3600);
    var mm = Math.floor(ms/ 1000 / 60 % 60);
    var ss = Math.floor(ms/ 1000 % 60);
    var ff = Math.floor(ms % 1000 / 10); //2 digits
    var time = hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + "." + (ff < 10 ? "0" : "") + ff;
    return time;
  }
};

/******************************************************************************************
 * Parses captions in SubStation Alpha format (.ssa)
 ******************************************************************************************/
function parse(content, options) {
  var meta;
  var columns = null;
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n\s*\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    var regex = /^\s*\[([^\]]+)\]\r?\n([\s\S]*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var tag = match[1];
      var lines = match[2].split(/\r?\n/);
      for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        if (/^\s*;/.test(line)) {
          continue; //Skip comment
        }
        var m = /^\s*([^:]+):\s*(.*)(\r?\n)?$/.exec(line);
        if (m) {
          if (tag == "Script Info") {
            if (!meta) {
              meta = { };
              meta.type = "meta";
              meta.data = { };
              captions.push(meta);
            }
            var name = m[1].trim();
            var value = m[2].trim();
            meta.data[name] = value;
            continue;
          }
          if (tag == "V4 Styles" || tag == "V4+ Styles") {
            var name = m[1].trim();
            var value = m[2].trim();
            if (name == "Format") {
              columns = value.split(/\s*,\s*/g);
              continue;
            }
            if (name == "Style") {
              var values = value.split(/\s*,\s*/g);
              var caption = { };
              caption.type = "style";
              caption.data = { };
              for (var c = 0; c < columns.length && c < values.length; c++) {
                caption.data[columns[c]] = values[c];
              }
              captions.push(caption);
              continue;
            }
          }
          if (tag == "Events") {
            var name = m[1].trim();
            var value = m[2].trim();
            if (name == "Format") {
              columns = value.split(/\s*,\s*/g);
              continue;
            }
            if (name == "Dialogue") {
              var values = value.split(/\s*,\s*/g);
              var caption = { };
              caption.type = "caption";
              caption.data = { };
              for (var c = 0; c < columns.length && c < values.length; c++) {
                caption.data[columns[c]] = values[c];
              }
              caption.start = helper.toMilliseconds(caption.data["Start"]);
              caption.end = helper.toMilliseconds(caption.data["End"]);
              caption.duration = caption.end - caption.start;
              caption.content = caption.data["Text"];
              
              //Work-around for missing text (when the text contains ',' char)
              function getPosition(s, search, index) {
                return s.split(search, index).join(search).length;
              }
              var indexOfText = getPosition(value, ',', columns.length - 1) + 1;
              caption.content = value.substr(indexOfText);
              caption.data["Text"] = caption.content;
              
              caption.text = caption.content
                .replace(/\\N/g, eol) //"\N" for new line
                .replace(/\{[^\}]+\}/g, ""); //{\pos(400,570)}
              captions.push(caption);
              continue;
            }
          }
        }
      }
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in SubStation Alpha format (.ssa)
 ******************************************************************************************/
function build(captions, options) {
  var eol = options.eol || "\r\n";
  var ass = options.format == "ass";
  
  var content = "";
  content += "[Script Info]" + eol;
  content += "; Script generated by subsrt " + eol;
  content += "ScriptType: v4.00" + (ass ? "+" : "") + eol;
  content += "Collisions: Normal" + eol;
  content += eol;
  if (ass) {
    content += "[V4+ Styles]" + eol;
    content += "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding" + eol;
    content += "Style: DefaultVCD, Arial,28,&H00B4FCFC,&H00B4FCFC,&H00000008,&H80000008,-1,0,0,0,100,100,0.00,0.00,1,1.00,2.00,2,30,30,30,0" + eol;
  }
  else {
    content += "[V4 Styles]" + eol;
    content += "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, TertiaryColour, BackColour, Bold, Italic, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, AlphaLevel, Encoding" + eol;
    content += "Style: DefaultVCD, Arial,28,11861244,11861244,11861244,-2147483640,-1,0,1,1,2,2,30,30,30,0,0" + eol;
  }
  content += eol;
  content += "[Events]" + eol;
  content += "Format: " + (ass ? "Layer" : "Marked") + ", Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text" + eol;
  
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (caption.type == "meta") {
      continue;
    }
    
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      content += "Dialogue: " + (ass ? "0" : "Marked=0") + "," + helper.toTimeString(caption.start) + "," + helper.toTimeString(caption.end) + ",DefaultVCD, NTP,0000,0000,0000,," + caption.text.replace(/\r?\n/g, "\\N") + eol;
      continue;
    }
    
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return content;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content !== "string") {
    throw new Error("Expected string content!");
  }
  
  if (/^[\s\r\n]*\[Script Info\]\r?\n/g.test(content) && /[\s\r\n]*\[Events\]\r?\n/g.test(content)) {
    /*
    [Script Info]
    ...
    [Events]
    */
    
    //Advanced (V4+) styles for ASS format
    return content.indexOf("[V4+ Styles]") > 0 ? "ass" : "ssa";
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/sub.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/sub.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "sub";
var DEFAULT_FPS = 25;

/******************************************************************************************
 * Parses captions in MicroDVD format: https://en.wikipedia.org/wiki/MicroDVD
 ******************************************************************************************/
function parse(content, options) {
  var fps = options.fps > 0 ? options.fps : DEFAULT_FPS;
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n/g);
  for (var i = 0; i < parts.length; i++) {
    var regex = /^\{(\d+)\}\{(\d+)\}(.*)$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.index = i + 1;
      caption.frame = {
        start: parseInt(match[1]),
        end: parseInt(match[2])
      };
      caption.frame.count = caption.frame.end - caption.frame.start;
      caption.start = Math.round(caption.frame.start / fps);
      caption.end = Math.round(caption.frame.end / fps);
      caption.duration = caption.end - caption.start;
      var lines = match[3].split(/\|/g);
      caption.content = lines.join(eol);
      caption.text = caption.content.replace(/\{[^\}]+\}/g, ""); //{0}{25}{c:$0000ff}{y:b,u}{f:DeJaVuSans}{s:12}Hello!
      captions.push(caption);
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in MicroDVD format: https://en.wikipedia.org/wiki/MicroDVD
 ******************************************************************************************/
function build(captions, options) {
  var fps = options.fps > 0 ? options.fps : DEFAULT_FPS;
  
  var sub = "";
  var eol = options.eol || "\r\n";
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      var startFrame = typeof caption.frame == "object" && caption.frame.start >= 0 ? caption.frame.start : caption.start * fps;
      var endFrame = typeof caption.frame == "object" && caption.frame.end >= 0 ? caption.frame.end : caption.end * fps;
      var text = caption.text.replace(/\r?\n/, "|");
      sub += "{" + startFrame + "}" + "{" + endFrame + "}" + text + eol;
      continue;
    }
    
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return sub;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content === "string") {
    if (/^\{\d+\}\{\d+\}(.*)/.test(content)) {
      /*
      {7207}{7262}Sister, perfume?
      */
      return FORMAT_NAME;
    }
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  detect: detect,
  parse: parse,
  build: build
};

/***/ }),

/***/ "./node_modules/subsrt/lib/format/vtt.js":
/*!***********************************************!*\
  !*** ./node_modules/subsrt/lib/format/vtt.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var FORMAT_NAME = "vtt";

var helper = {
  toMilliseconds: function(s) {
    var match = /^\s*(\d{1,2}:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var hh = match[1] ? parseInt(match[1].replace(":", "")) : 0;
    var mm = parseInt(match[2]);
    var ss = parseInt(match[3]);
    var ff = match[5] ? parseInt(match[5]) : 0;
    var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
    return ms;
  },
  toTimeString: function(ms) {
    var hh = Math.floor(ms / 1000 / 3600);
    var mm = Math.floor(ms / 1000 / 60 % 60);
    var ss = Math.floor(ms / 1000 % 60);
    var ff = Math.floor(ms % 1000);
    var time = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + "." + (ff < 100 ? "0" : "") + (ff < 10 ? "0" : "") + ff;
    return time;
  }
};

/******************************************************************************************
 * Parses captions in WebVTT format (Web Video Text Tracks Format)
 ******************************************************************************************/
function parse(content, options) {
  var index = 1;
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n\s+\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    //WebVTT data
    var regex = /^([^\r\n]+\r?\n)?((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var caption = { };
      caption.type = "caption";
      caption.index = index++;
      if (match[1]) {
        caption.cue = match[1].replace(/[\r\n]*/gi, "");
      }
      caption.start = helper.toMilliseconds(match[2]);
      caption.end = helper.toMilliseconds(match[5]);
      caption.duration = caption.end - caption.start;
      var lines = match[8].split(/\r?\n/);
      caption.content = lines.join(eol);
      caption.text = caption.content
        .replace(/\<[^\>]+\>/g, "") //<b>bold</b> or <i>italic</i>
        .replace(/\{[^\}]+\}/g, ""); //{b}bold{/b} or {i}italic{/i}
      captions.push(caption);
      continue;
    }
    
    //WebVTT meta
    var meta = /^([A-Z]+)(\r?\n([\s\S]*))?$/.exec(parts[i]);
    if (!meta) {
      //Try inline meta
      meta = /^([A-Z]+)\s+([^\r\n]*)?$/.exec(parts[i]);
    }
    if (meta) {
      var caption = { };
      caption.type = "meta";
      caption.name = meta[1];
      if (meta[3]) {
        caption.data = meta[3];
      }
      captions.push(caption);
      continue;
    }
    
    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

/******************************************************************************************
 * Builds captions in WebVTT format (Web Video Text Tracks Format)
 ******************************************************************************************/
function build(captions, options) {
  var eol = options.eol || "\r\n";
  var content = "WEBVTT" + eol + eol;
  for (var i = 0; i < captions.length; i++) {
    var caption = captions[i];
    if (caption.type == "meta") {
      if (caption.name == "WEBVTT") continue;
      content += caption.name + eol;
      content += caption.data ? caption.data + eol : "";
      content += eol;
      continue;
    }
    
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      content += (i + 1).toString() + eol;
      content += helper.toTimeString(caption.start) + " --> " + helper.toTimeString(caption.end) + eol;
      content += caption.text + eol;
      content += eol;
      continue;
    }
    
    if (options.verbose) {
      console.log("SKIP:", caption);
    }
  }
  
  return content;
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
function detect(content) {
  if (typeof content !== "string") {
    throw new Error("Expected string content!");
  }
  
  if (/^[\s\r\n]*WEBVTT\r?\n/g.test(content)) {
    /*
    WEBVTT
    ...
    */
    return "vtt";
  }
};

/******************************************************************************************
 * Export
 ******************************************************************************************/
module.exports = {
  name: FORMAT_NAME,
  helper: helper,
  detect: detect,
  parse: parse,
  build: build
};


/***/ }),

/***/ "./node_modules/subsrt/lib/subsrt.js":
/*!*******************************************!*\
  !*** ./node_modules/subsrt/lib/subsrt.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var subsrt = {
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
    var handler = __webpack_require__("./node_modules/subsrt/lib/format sync recursive ^\\.\\/.*\\.js$")("./" + f + ".js");
    subsrt.format[handler.name] = handler;
  }
})();

/******************************************************************************************
 * Gets a list of supported subtitle formats.
 ******************************************************************************************/
subsrt.list = function() {
  return Object.keys(subsrt.format);
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
subsrt.detect = function(content) {
  var formats = subsrt.list();
  for (var i = 0; i < formats.length; i++) {
    var f = formats[i];
    var handler = subsrt.format[f];
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
subsrt.parse = function(content, options) {
  options = options || { };
  var format = options.format || subsrt.detect(content);
  if (!format || format.trim().length == 0) {
    throw new Error("Cannot determine subtitle format!");
  }
  
  var handler = subsrt.format[format];
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
subsrt.build = function(captions, options) {
  options = options || { };
  var format = options.format || "srt";
  if (!format || format.trim().length == 0) {
    throw new Error("Cannot determine subtitle format!");
  }
  
  var handler = subsrt.format[format];
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
subsrt.convert = function(content, options) {
  if (typeof options == "string") {
    options = { to: options };
  }
  options = options || { };
  
  var opt = clone(options);
  delete opt.format;
  
  if (opt.from) {
    opt.format = opt.from;
  }
  
  var captions = subsrt.parse(content, opt);
  if (opt.resync) {
    captions = subsrt.resync(captions, opt.resync);
  }
  
  opt.format = opt.to || options.format;
  var result = subsrt.build(captions, opt);
  
  return result;
};

/******************************************************************************************
 * Shifts the time of the captions.
 ******************************************************************************************/
subsrt.resync = function(captions, options) {
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

module.exports = subsrt;

/***/ }),

/***/ "./src/beta.js":
/*!*********************!*\
  !*** ./src/beta.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const mustache = __webpack_require__(/*! mustache */ "./node_modules/mustache/mustache.js")
const Episode = __webpack_require__(/*! ./episode */ "./src/episode.js")

const tokenURL = 'https://www.crunchyroll.com/auth/v1/token'
const signatureURL = 'https://www.crunchyroll.com/index/v2'
const queryParams = '?Signature={{signature}}&Policy={{policy}}&Key-Pair-Id={{keyPairID}}'
const metadataURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/objects/{{videoID}}${queryParams}`
const streamsURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/videos/{{videoID}}/streams${queryParams}`

const videoIDRegex = /https?:\/\/(.*\.)?crunchyroll\.com\/(\S+\/)?watch\/([a-zA-Z0-9_]+)(\/.*)?/

const defaultCMSType = 'cms'

module.exports = class NewEpisode extends Episode {
  async fetchMetadataURL ({ videoID, keyPairID, policy, signature, cmsBucket }, templates = [metadataURLTemplate]) {
    const { axios } = this
    for (const urlTemplate of templates) {
      try {
        const metadataURL = mustache.render(urlTemplate, {
          cmsBucket,
          videoID,
          keyPairID,
          policy,
          signature
        })
        const response = await axios.get(metadataURL)
        return response
      } catch (e) {
      }
    }
    throw new Error('Failed to fetch data from all metadata URLs')
  }

  async fetchStreamsURL (href, { videoID, keyPairID, policy, signature, cmsBucket }, templates = [streamsURLTemplate]) {
    const { axios } = this
    for (const streamsURLTemplate of templates) {
      try {
        const streamsURL = mustache.render(streamsURLTemplate, {
          cmsBucket,
          videoID,
          keyPairID,
          policy,
          signature
        })
        const response = await axios.get(streamsURL)
        return response
      } catch (e) {
      }
    }
    throw new Error('Failed to fetch data from all streams URLs')
  }

  async getAccessToken () {
    const { axios, basicAuth } = this
    // We need to try two grant types
    const grantTypes = ['etp_rt_cookie', 'client_id']
    for (const grantType of grantTypes) {
      const params = new URLSearchParams()
      params.set('grant_type', grantType)
      try {
        const response = await axios.post(tokenURL, params, {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        const { data: { access_token: accessToken } } = response
        return accessToken
      } catch (e) {
      }
    }
    throw new Error('Failed to get access token')
  }

  async parse () {
    const { axios } = this
    let response
    if (!this.basicAuth) {
      response = await axios.get(this.url)
      // Get config
      const data = response.data
      const { basicAuth } = await this.getConfigForParse(data)
      this.basicAuth = basicAuth
    }
    const accessToken = await this.getAccessToken()
    response = await axios.get(signatureURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const cmsType = this.cmsType || defaultCMSType
    const { data: { [cmsType]: { bucket: cmsBucket, key_pair_id: keyPairID, policy, signature } } } = response
    this.keyPairID = keyPairID
    this.policy = policy
    this.signature = signature

    // Get config
    const match = videoIDRegex.exec(this.url)
    if (!match) {
      const err = new Error('Failed to match videoID regex to url')
      err.data = { url: this.url, cmsBucket }
      throw err
    }
    const videoID = match[3]
    response = await this.fetchMetadataURL({ videoID, keyPairID, policy, signature, cmsBucket }, [metadataURLTemplate])
    const { data: { items: [objectMetadata] } } = response
    const { episode_metadata: metadata } = objectMetadata
    this.objectMetadata = objectMetadata
    this.metadata = metadata
    // Convert this to be in the same format as the older config so we get some parsing for free
    metadata.title = this.objectMetadata.title
    this.seriesTitle = metadata.series_title
    this.seasonIndex = metadata.season_number

    this.config = { metadata }
    // Poster
    try {
      const { images: { thumbnail: [thumbnails] } } = objectMetadata
      this.config.thumbnail = { url: thumbnails[thumbnails.length - 1].source }
    } catch (e) {
      this.config.thumbnail = { url: '' }
    }
    let streamsHref
    const streamsTemplates = [streamsURLTemplate]
    try {
      ;({ __links__: { streams: { href: streamsHref } } } = objectMetadata)
      if (streamsHref) {
        const altTemplate = `${new URL(streamsURLTemplate).origin}${streamsHref}${queryParams}`
        streamsTemplates.unshift(altTemplate)
      }
    } catch (e) {
    }
    response = await this.fetchStreamsURL(streamsHref, { videoID, keyPairID, policy, signature, cmsBucket }, streamsTemplates)
    const { data: { streams: streamsRaw, subtitles: subtitlesRaw } } = response
    // We're going to have to convert this streams object to the old format
    const streams = []
    for (const [type, data] of Object.entries(streamsRaw)) {
      for (const [locale, entry] of Object.entries(data)) {
        const stream = {}
        stream.format = type
        stream.audio_lang = locale || 'default'
        stream.hardsub_lang = entry.hardsub_locale
        stream.url = entry.url
        streams.push(stream)
      }
    }

    const subtitles = []
    for (const data of Object.values(subtitlesRaw)) {
      const { locale, format, url } = data
      let language
      let country
      let title
      try {
        ({ language, country } = this.getLanguageAndCountry(locale))
        title = `${language} (${country})`
      } catch (e) {
        language = locale ? locale.substring(0, 2) : '--'
        country = ''
        title = 'Unknown'
      }
      const subtitle = {
        url,
        title,
        language,
        country,
        format,
        kind: 'captions'
      }
      subtitles.push(subtitle)
    }

    Object.assign(this.config, {
      streams,
      subtitles
    })
    await this.processMetadata()
  }

  async isPremiumVideo () {
    if (!this.metadata) {
      await this.parse()
    }
    const { metadata: { is_premium_only: isPremiumVideo } } = this
    return !!isPremiumVideo
  }

  // This function returns the basicAuth
  async getConfigForParse (data) {
    // This data contains the accountAuthClientId parameter that we need
    const regex = /"accountAuthClientId":\s*"(.*?)"/g
    const match = regex.exec(data)
    if (!match) {
      throw new Error('Did not find expected pattern')
    }
    const id = match[1]
    const basicAuth = btoa(`${id}:`) // This is the format they use..for some reason
    return { basicAuth }
  }
}


/***/ }),

/***/ "./src/episode.js":
/*!************************!*\
  !*** ./src/episode.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")

const Subtitle = __webpack_require__(/*! ./subtitle */ "./src/subtitle.js")

module.exports = class Episode {
  constructor (url, parameters, axios = Axios) {
    this.url = url
    Object.assign(this, parameters)
    this.axios = axios
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
    }
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
    }

    // If input has a -, get rid of it
    input = input.replace(/-/g, '')
    const lang = input.substring(0, 2).toLowerCase()
    const ctry = input.substring(2, 4).toUpperCase()

    const language = languageMap[lang]
    const country = countryMap[ctry]
    return { language, country }
  }

  getStreamsByLanuage (audioLang, hardsubLang) {
    const { config: { streams } } = this
    return streams.filter(stream => stream.audio_lang === audioLang && stream.hardsub_lang === hardsubLang)
  }

  async getSubtitles () {
    const { axios } = this
    const { config: { subtitles: subtitleMetadata } } = this
    this.subtitles = []
    await Promise.all(subtitleMetadata.map(async ({ language, url, title, format }) => {
      const response = await axios.get(url)
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      const { data: ass } = response
      this.subtitles.push(new Subtitle(title, language.substr(0, 2), ass))
    }))
  }

  async processMetadata () {
    const { config } = this
    const { metadata, streams } = config
    this.episodeTitle = metadata.title
    this.episodeNumber = Number(metadata.episode_number)
    this.poster = config.thumbnail.url
    streams.forEach(stream => {
      try {
        if (stream.audio_lang) {
          const { language, country } = this.getLanguageAndCountry(stream.audio_lang)
          Object.assign(stream, {
            audio: {
              language,
              country
            }
          })
        }
      } catch (e) {
      }
      try {
        const { language, country } = this.getLanguageAndCountry(stream.hardsub_lang)
        Object.assign(stream, {
          hardsub: {
            language,
            country
          }
        })
      } catch (e) {
      }
    }, this)
  }
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js")
const Episode = __webpack_require__(/*! ./episode */ "./src/episode.js")
const BetaEpisode = __webpack_require__(/*! ./beta */ "./src/beta.js")
const Subtitle = __webpack_require__(/*! ./subtitle */ "./src/subtitle.js")

async function getEpisode (url, config, axios = Axios) {
  /** @type {Episode} */
  const episode = new BetaEpisode(url, config, axios)
  await episode.parse()
  return episode
}

module.exports = {
  BetaEpisode,
  Episode,
  Subtitle,
  getEpisode
}


/***/ }),

/***/ "./src/subtitle.js":
/*!*************************!*\
  !*** ./src/subtitle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const subsrt = __webpack_require__(/*! subsrt */ "./node_modules/subsrt/lib/subsrt.js")

const oldVTT = subsrt.format.vtt
subsrt.format.vtt = {
  name: 'vtt',
  parse: oldVTT.parse,
  build (captions, options) {
    function replace (entry, fn) {
      entry.data.Text = fn(entry.data.Text)
      entry.text = fn(entry.text)
    }
    // Make a copy and remove meta since there's an issue with subsrt not
    // displaying it properly.
    const fixedCaptions = [...captions].filter(x => x.type !== 'meta')
    // Also, trim the text while we're at it to ensure there's no newline
    // at the start and replace & and < since these characters are not allowed
    // as part of WebVTT spec
    fixedCaptions.forEach(entry => {
      if (entry.type !== 'caption') {
        return
      }
      replace(entry, s => s.trim().replace('\\N', '').replace('\\R', '').replace('&', '&amp;').replace('<', '&lt;'))
    })

    let content = oldVTT.build(fixedCaptions, options)
    content = content.replace(/(.*) --> (.*)/g, (match, p1, p2) => {
      return `${p1.replace(/,/, '.')} --> ${p2.replace(/,/, '.')}`
    })
    return content
  },
  detect: oldVTT.detect
}

class Subtitle {
  constructor (label, language, content) {
    this.label = label
    this.language = language
    if (typeof content === 'string') {
      this.captions = subsrt.parse(content)
    } else {
      this.captions = content
    }
  }

  static detect (content) {
    return subsrt.detect(content)
  }

  build (format) {
    return subsrt.build(this.captions, { format })
  }
}

module.exports = Subtitle


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9tdXN0YWNoZS9tdXN0YWNoZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQgc3luYyBeXFwuXFwvLipcXC5qcyQiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvYXNzLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L2pzb24uanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvbHJjLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3Nidi5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zbWkuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvc3J0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3NzYS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zdWIuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvdnR0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvc3Vic3J0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vc3JjL2JldGEuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9zcmMvZXBpc29kZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL3NyYy9zdWJ0aXRsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztRQ1ZBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFP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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhDQUE4QyxlQUFlO0FBQzdEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGlEQUFpRCxpQkFBaUI7QUFDbEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdCQUF3QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNwd0JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QWdCLHFCQUFxQixPQUFPLHFCQUFxQjtBQUNqRSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdDQUF3QyxTQUFTO0FBQ2pEO0FBQ0E7O0FBRUEiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQ3J1bmNoeXJvbGxcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQ3J1bmNoeXJvbGxcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG4vLyBFeHBvc2UgaXNBeGlvc0Vycm9yXG5heGlvcy5pc0F4aW9zRXJyb3IgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNBeGlvc0Vycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzXG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5JywgJ3BhcmFtcyddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd0aW1lb3V0TWVzc2FnZScsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdkZWNvbXByZXNzJyxcbiAgICAnbWF4Q29udGVudExlbmd0aCcsICdtYXhCb2R5TGVuZ3RoJywgJ21heFJlZGlyZWN0cycsICd0cmFuc3BvcnQnLCAnaHR0cEFnZW50JyxcbiAgICAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJywgJ3Jlc3BvbnNlRW5jb2RpbmcnXG4gIF07XG4gIHZhciBkaXJlY3RNZXJnZUtleXMgPSBbJ3ZhbGlkYXRlU3RhdHVzJ107XG5cbiAgZnVuY3Rpb24gZ2V0TWVyZ2VkVmFsdWUodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHRhcmdldCwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlKHt9LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gc291cmNlLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goZGlyZWN0TWVyZ2VLZXlzLCBmdW5jdGlvbiBtZXJnZShwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmIChwcm9wIGluIGNvbmZpZzEpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXNcbiAgICAuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKVxuICAgIC5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpXG4gICAgLmNvbmNhdChkaXJlY3RNZXJnZUtleXMpO1xuXG4gIHZhciBvdGhlcktleXMgPSBPYmplY3RcbiAgICAua2V5cyhjb25maWcxKVxuICAgIC5jb25jYXQoT2JqZWN0LmtleXMoY29uZmlnMikpXG4gICAgLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gICAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIG1lcmdlRGVlcFByb3BlcnRpZXMpO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgbWF4Qm9keUxlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiAodHlwZW9mIHBheWxvYWQgPT09ICdvYmplY3QnKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcilcbiAgICAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsKSB7XG4gIGlmICh0b1N0cmluZy5jYWxsKHZhbCkgIT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdChyZXN1bHRba2V5XSkgJiYgaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbC5zbGljZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogUmVtb3ZlIGJ5dGUgb3JkZXIgbWFya2VyLiBUaGlzIGNhdGNoZXMgRUYgQkIgQkYgKHRoZSBVVEYtOCBCT00pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgd2l0aCBCT01cbiAqIEByZXR1cm4ge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5mdW5jdGlvbiBzdHJpcEJPTShjb250ZW50KSB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzUGxhaW5PYmplY3Q6IGlzUGxhaW5PYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbSxcbiAgc3RyaXBCT006IHN0cmlwQk9NXG59O1xuIiwiLy8gVGhpcyBmaWxlIGhhcyBiZWVuIGdlbmVyYXRlZCBmcm9tIG11c3RhY2hlLm1qc1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5NdXN0YWNoZSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuICAvKiFcbiAgICogbXVzdGFjaGUuanMgLSBMb2dpYy1sZXNzIHt7bXVzdGFjaGV9fSB0ZW1wbGF0ZXMgd2l0aCBKYXZhU2NyaXB0XG4gICAqIGh0dHA6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanNcbiAgICovXG5cbiAgdmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXlQb2x5ZmlsbCAob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICBmdW5jdGlvbiBpc0Z1bmN0aW9uIChvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3JlIGNvcnJlY3QgdHlwZW9mIHN0cmluZyBoYW5kbGluZyBhcnJheVxuICAgKiB3aGljaCBub3JtYWxseSByZXR1cm5zIHR5cGVvZiAnb2JqZWN0J1xuICAgKi9cbiAgZnVuY3Rpb24gdHlwZVN0ciAob2JqKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdhcnJheScgOiB0eXBlb2Ygb2JqO1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlUmVnRXhwIChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXC1cXFtcXF17fSgpKis/LixcXFxcXFxeJHwjXFxzXS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICAvKipcbiAgICogTnVsbCBzYWZlIHdheSBvZiBjaGVja2luZyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QsXG4gICAqIGluY2x1ZGluZyBpdHMgcHJvdG90eXBlLCBoYXMgYSBnaXZlbiBwcm9wZXJ0eVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzUHJvcGVydHkgKG9iaiwgcHJvcE5hbWUpIHtcbiAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgKHByb3BOYW1lIGluIG9iaik7XG4gIH1cblxuICAvKipcbiAgICogU2FmZSB3YXkgb2YgZGV0ZWN0aW5nIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiB0aGluZyBpcyBhIHByaW1pdGl2ZSBhbmRcbiAgICogd2hldGhlciBpdCBoYXMgdGhlIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBwcmltaXRpdmVIYXNPd25Qcm9wZXJ0eSAocHJpbWl0aXZlLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiAoXG4gICAgICBwcmltaXRpdmUgIT0gbnVsbFxuICAgICAgJiYgdHlwZW9mIHByaW1pdGl2ZSAhPT0gJ29iamVjdCdcbiAgICAgICYmIHByaW1pdGl2ZS5oYXNPd25Qcm9wZXJ0eVxuICAgICAgJiYgcHJpbWl0aXZlLmhhc093blByb3BlcnR5KHByb3BOYW1lKVxuICAgICk7XG4gIH1cblxuICAvLyBXb3JrYXJvdW5kIGZvciBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NPVUNIREItNTc3XG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMTg5XG4gIHZhciByZWdFeHBUZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xuICBmdW5jdGlvbiB0ZXN0UmVnRXhwIChyZSwgc3RyaW5nKSB7XG4gICAgcmV0dXJuIHJlZ0V4cFRlc3QuY2FsbChyZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBub25TcGFjZVJlID0gL1xcUy87XG4gIGZ1bmN0aW9uIGlzV2hpdGVzcGFjZSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuICF0ZXN0UmVnRXhwKG5vblNwYWNlUmUsIHN0cmluZyk7XG4gIH1cblxuICB2YXIgZW50aXR5TWFwID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7JyxcbiAgICAnLyc6ICcmI3gyRjsnLFxuICAgICdgJzogJyYjeDYwOycsXG4gICAgJz0nOiAnJiN4M0Q7J1xuICB9O1xuXG4gIGZ1bmN0aW9uIGVzY2FwZUh0bWwgKHN0cmluZykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bJjw+XCInYD1cXC9dL2csIGZ1bmN0aW9uIGZyb21FbnRpdHlNYXAgKHMpIHtcbiAgICAgIHJldHVybiBlbnRpdHlNYXBbc107XG4gICAgfSk7XG4gIH1cblxuICB2YXIgd2hpdGVSZSA9IC9cXHMqLztcbiAgdmFyIHNwYWNlUmUgPSAvXFxzKy87XG4gIHZhciBlcXVhbHNSZSA9IC9cXHMqPS87XG4gIHZhciBjdXJseVJlID0gL1xccypcXH0vO1xuICB2YXIgdGFnUmUgPSAvI3xcXF58XFwvfD58XFx7fCZ8PXwhLztcblxuICAvKipcbiAgICogQnJlYWtzIHVwIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHN0cmluZyBpbnRvIGEgdHJlZSBvZiB0b2tlbnMuIElmIHRoZSBgdGFnc2BcbiAgICogYXJndW1lbnQgaXMgZ2l2ZW4gaGVyZSBpdCBtdXN0IGJlIGFuIGFycmF5IHdpdGggdHdvIHN0cmluZyB2YWx1ZXM6IHRoZVxuICAgKiBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MgdXNlZCBpbiB0aGUgdGVtcGxhdGUgKGUuZy4gWyBcIjwlXCIsIFwiJT5cIiBdKS4gT2ZcbiAgICogY291cnNlLCB0aGUgZGVmYXVsdCBpcyB0byB1c2UgbXVzdGFjaGVzIChpLmUuIG11c3RhY2hlLnRhZ3MpLlxuICAgKlxuICAgKiBBIHRva2VuIGlzIGFuIGFycmF5IHdpdGggYXQgbGVhc3QgNCBlbGVtZW50cy4gVGhlIGZpcnN0IGVsZW1lbnQgaXMgdGhlXG4gICAqIG11c3RhY2hlIHN5bWJvbCB0aGF0IHdhcyB1c2VkIGluc2lkZSB0aGUgdGFnLCBlLmcuIFwiI1wiIG9yIFwiJlwiLiBJZiB0aGUgdGFnXG4gICAqIGRpZCBub3QgY29udGFpbiBhIHN5bWJvbCAoaS5lLiB7e215VmFsdWV9fSkgdGhpcyBlbGVtZW50IGlzIFwibmFtZVwiLiBGb3JcbiAgICogYWxsIHRleHQgdGhhdCBhcHBlYXJzIG91dHNpZGUgYSBzeW1ib2wgdGhpcyBlbGVtZW50IGlzIFwidGV4dFwiLlxuICAgKlxuICAgKiBUaGUgc2Vjb25kIGVsZW1lbnQgb2YgYSB0b2tlbiBpcyBpdHMgXCJ2YWx1ZVwiLiBGb3IgbXVzdGFjaGUgdGFncyB0aGlzIGlzXG4gICAqIHdoYXRldmVyIGVsc2Ugd2FzIGluc2lkZSB0aGUgdGFnIGJlc2lkZXMgdGhlIG9wZW5pbmcgc3ltYm9sLiBGb3IgdGV4dCB0b2tlbnNcbiAgICogdGhpcyBpcyB0aGUgdGV4dCBpdHNlbGYuXG4gICAqXG4gICAqIFRoZSB0aGlyZCBhbmQgZm91cnRoIGVsZW1lbnRzIG9mIHRoZSB0b2tlbiBhcmUgdGhlIHN0YXJ0IGFuZCBlbmQgaW5kaWNlcyxcbiAgICogcmVzcGVjdGl2ZWx5LCBvZiB0aGUgdG9rZW4gaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBUb2tlbnMgdGhhdCBhcmUgdGhlIHJvb3Qgbm9kZSBvZiBhIHN1YnRyZWUgY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYW5cbiAgICogYXJyYXkgb2YgdG9rZW5zIGluIHRoZSBzdWJ0cmVlIGFuZCAyKSB0aGUgaW5kZXggaW4gdGhlIG9yaWdpbmFsIHRlbXBsYXRlIGF0XG4gICAqIHdoaWNoIHRoZSBjbG9zaW5nIHRhZyBmb3IgdGhhdCBzZWN0aW9uIGJlZ2lucy5cbiAgICpcbiAgICogVG9rZW5zIGZvciBwYXJ0aWFscyBhbHNvIGNvbnRhaW4gdHdvIG1vcmUgZWxlbWVudHM6IDEpIGEgc3RyaW5nIHZhbHVlIG9mXG4gICAqIGluZGVuZGF0aW9uIHByaW9yIHRvIHRoYXQgdGFnIGFuZCAyKSB0aGUgaW5kZXggb2YgdGhhdCB0YWcgb24gdGhhdCBsaW5lIC1cbiAgICogZWcgYSB2YWx1ZSBvZiAyIGluZGljYXRlcyB0aGUgcGFydGlhbCBpcyB0aGUgdGhpcmQgdGFnIG9uIHRoaXMgbGluZS5cbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlVGVtcGxhdGUgKHRlbXBsYXRlLCB0YWdzKSB7XG4gICAgaWYgKCF0ZW1wbGF0ZSlcbiAgICAgIHJldHVybiBbXTtcbiAgICB2YXIgbGluZUhhc05vblNwYWNlID0gZmFsc2U7XG4gICAgdmFyIHNlY3Rpb25zID0gW107ICAgICAvLyBTdGFjayB0byBob2xkIHNlY3Rpb24gdG9rZW5zXG4gICAgdmFyIHRva2VucyA9IFtdOyAgICAgICAvLyBCdWZmZXIgdG8gaG9sZCB0aGUgdG9rZW5zXG4gICAgdmFyIHNwYWNlcyA9IFtdOyAgICAgICAvLyBJbmRpY2VzIG9mIHdoaXRlc3BhY2UgdG9rZW5zIG9uIHRoZSBjdXJyZW50IGxpbmVcbiAgICB2YXIgaGFzVGFnID0gZmFsc2U7ICAgIC8vIElzIHRoZXJlIGEge3t0YWd9fSBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBub25TcGFjZSA9IGZhbHNlOyAgLy8gSXMgdGhlcmUgYSBub24tc3BhY2UgY2hhciBvbiB0aGUgY3VycmVudCBsaW5lP1xuICAgIHZhciBpbmRlbnRhdGlvbiA9ICcnOyAgLy8gVHJhY2tzIGluZGVudGF0aW9uIGZvciB0YWdzIHRoYXQgdXNlIGl0XG4gICAgdmFyIHRhZ0luZGV4ID0gMDsgICAgICAvLyBTdG9yZXMgYSBjb3VudCBvZiBudW1iZXIgb2YgdGFncyBlbmNvdW50ZXJlZCBvbiBhIGxpbmVcblxuICAgIC8vIFN0cmlwcyBhbGwgd2hpdGVzcGFjZSB0b2tlbnMgYXJyYXkgZm9yIHRoZSBjdXJyZW50IGxpbmVcbiAgICAvLyBpZiB0aGVyZSB3YXMgYSB7eyN0YWd9fSBvbiBpdCBhbmQgb3RoZXJ3aXNlIG9ubHkgc3BhY2UuXG4gICAgZnVuY3Rpb24gc3RyaXBTcGFjZSAoKSB7XG4gICAgICBpZiAoaGFzVGFnICYmICFub25TcGFjZSkge1xuICAgICAgICB3aGlsZSAoc3BhY2VzLmxlbmd0aClcbiAgICAgICAgICBkZWxldGUgdG9rZW5zW3NwYWNlcy5wb3AoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcGFjZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgaGFzVGFnID0gZmFsc2U7XG4gICAgICBub25TcGFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcGVuaW5nVGFnUmUsIGNsb3NpbmdUYWdSZSwgY2xvc2luZ0N1cmx5UmU7XG4gICAgZnVuY3Rpb24gY29tcGlsZVRhZ3MgKHRhZ3NUb0NvbXBpbGUpIHtcbiAgICAgIGlmICh0eXBlb2YgdGFnc1RvQ29tcGlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHRhZ3NUb0NvbXBpbGUgPSB0YWdzVG9Db21waWxlLnNwbGl0KHNwYWNlUmUsIDIpO1xuXG4gICAgICBpZiAoIWlzQXJyYXkodGFnc1RvQ29tcGlsZSkgfHwgdGFnc1RvQ29tcGlsZS5sZW5ndGggIT09IDIpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCB0YWdzOiAnICsgdGFnc1RvQ29tcGlsZSk7XG5cbiAgICAgIG9wZW5pbmdUYWdSZSA9IG5ldyBSZWdFeHAoZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMF0pICsgJ1xcXFxzKicpO1xuICAgICAgY2xvc2luZ1RhZ1JlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCh0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgICBjbG9zaW5nQ3VybHlSZSA9IG5ldyBSZWdFeHAoJ1xcXFxzKicgKyBlc2NhcGVSZWdFeHAoJ30nICsgdGFnc1RvQ29tcGlsZVsxXSkpO1xuICAgIH1cblxuICAgIGNvbXBpbGVUYWdzKHRhZ3MgfHwgbXVzdGFjaGUudGFncyk7XG5cbiAgICB2YXIgc2Nhbm5lciA9IG5ldyBTY2FubmVyKHRlbXBsYXRlKTtcblxuICAgIHZhciBzdGFydCwgdHlwZSwgdmFsdWUsIGNociwgdG9rZW4sIG9wZW5TZWN0aW9uO1xuICAgIHdoaWxlICghc2Nhbm5lci5lb3MoKSkge1xuICAgICAgc3RhcnQgPSBzY2FubmVyLnBvcztcblxuICAgICAgLy8gTWF0Y2ggYW55IHRleHQgYmV0d2VlbiB0YWdzLlxuICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChvcGVuaW5nVGFnUmUpO1xuXG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpIDwgdmFsdWVMZW5ndGg7ICsraSkge1xuICAgICAgICAgIGNociA9IHZhbHVlLmNoYXJBdChpKTtcblxuICAgICAgICAgIGlmIChpc1doaXRlc3BhY2UoY2hyKSkge1xuICAgICAgICAgICAgc3BhY2VzLnB1c2godG9rZW5zLmxlbmd0aCk7XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiArPSBjaHI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGxpbmVIYXNOb25TcGFjZSA9IHRydWU7XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiArPSAnICc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdG9rZW5zLnB1c2goWyAndGV4dCcsIGNociwgc3RhcnQsIHN0YXJ0ICsgMSBdKTtcbiAgICAgICAgICBzdGFydCArPSAxO1xuXG4gICAgICAgICAgLy8gQ2hlY2sgZm9yIHdoaXRlc3BhY2Ugb24gdGhlIGN1cnJlbnQgbGluZS5cbiAgICAgICAgICBpZiAoY2hyID09PSAnXFxuJykge1xuICAgICAgICAgICAgc3RyaXBTcGFjZSgpO1xuICAgICAgICAgICAgaW5kZW50YXRpb24gPSAnJztcbiAgICAgICAgICAgIHRhZ0luZGV4ID0gMDtcbiAgICAgICAgICAgIGxpbmVIYXNOb25TcGFjZSA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgb3BlbmluZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihvcGVuaW5nVGFnUmUpKVxuICAgICAgICBicmVhaztcblxuICAgICAgaGFzVGFnID0gdHJ1ZTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdHlwZS5cbiAgICAgIHR5cGUgPSBzY2FubmVyLnNjYW4odGFnUmUpIHx8ICduYW1lJztcbiAgICAgIHNjYW5uZXIuc2Nhbih3aGl0ZVJlKTtcblxuICAgICAgLy8gR2V0IHRoZSB0YWcgdmFsdWUuXG4gICAgICBpZiAodHlwZSA9PT0gJz0nKSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW4oZXF1YWxzUmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAneycpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nQ3VybHlSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihjdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgICAgdHlwZSA9ICcmJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gc2Nhbm5lci5zY2FuVW50aWwoY2xvc2luZ1RhZ1JlKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF0Y2ggdGhlIGNsb3NpbmcgdGFnLlxuICAgICAgaWYgKCFzY2FubmVyLnNjYW4oY2xvc2luZ1RhZ1JlKSlcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCB0YWcgYXQgJyArIHNjYW5uZXIucG9zKTtcblxuICAgICAgaWYgKHR5cGUgPT0gJz4nKSB7XG4gICAgICAgIHRva2VuID0gWyB0eXBlLCB2YWx1ZSwgc3RhcnQsIHNjYW5uZXIucG9zLCBpbmRlbnRhdGlvbiwgdGFnSW5kZXgsIGxpbmVIYXNOb25TcGFjZSBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rZW4gPSBbIHR5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3MgXTtcbiAgICAgIH1cbiAgICAgIHRhZ0luZGV4Kys7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG5cbiAgICAgIGlmICh0eXBlID09PSAnIycgfHwgdHlwZSA9PT0gJ14nKSB7XG4gICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnLycpIHtcbiAgICAgICAgLy8gQ2hlY2sgc2VjdGlvbiBuZXN0aW5nLlxuICAgICAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgICAgIGlmICghb3BlblNlY3Rpb24pXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbm9wZW5lZCBzZWN0aW9uIFwiJyArIHZhbHVlICsgJ1wiIGF0ICcgKyBzdGFydCk7XG5cbiAgICAgICAgaWYgKG9wZW5TZWN0aW9uWzFdICE9PSB2YWx1ZSlcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHNlY3Rpb24gXCInICsgb3BlblNlY3Rpb25bMV0gKyAnXCIgYXQgJyArIHN0YXJ0KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25hbWUnIHx8IHR5cGUgPT09ICd7JyB8fCB0eXBlID09PSAnJicpIHtcbiAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgLy8gU2V0IHRoZSB0YWdzIGZvciB0aGUgbmV4dCB0aW1lIGFyb3VuZC5cbiAgICAgICAgY29tcGlsZVRhZ3ModmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0cmlwU3BhY2UoKTtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSBhcmUgbm8gb3BlbiBzZWN0aW9ucyB3aGVuIHdlJ3JlIGRvbmUuXG4gICAgb3BlblNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcblxuICAgIGlmIChvcGVuU2VjdGlvbilcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgcmV0dXJuIG5lc3RUb2tlbnMoc3F1YXNoVG9rZW5zKHRva2VucykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbWJpbmVzIHRoZSB2YWx1ZXMgb2YgY29uc2VjdXRpdmUgdGV4dCB0b2tlbnMgaW4gdGhlIGdpdmVuIGB0b2tlbnNgIGFycmF5XG4gICAqIHRvIGEgc2luZ2xlIHRva2VuLlxuICAgKi9cbiAgZnVuY3Rpb24gc3F1YXNoVG9rZW5zICh0b2tlbnMpIHtcbiAgICB2YXIgc3F1YXNoZWRUb2tlbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgbGFzdFRva2VuO1xuICAgIGZvciAodmFyIGkgPSAwLCBudW1Ub2tlbnMgPSB0b2tlbnMubGVuZ3RoOyBpIDwgbnVtVG9rZW5zOyArK2kpIHtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgaWYgKHRva2VuWzBdID09PSAndGV4dCcgJiYgbGFzdFRva2VuICYmIGxhc3RUb2tlblswXSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgbGFzdFRva2VuWzFdICs9IHRva2VuWzFdO1xuICAgICAgICAgIGxhc3RUb2tlblszXSA9IHRva2VuWzNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNxdWFzaGVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGxhc3RUb2tlbiA9IHRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNxdWFzaGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcm1zIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCBpbnRvIGEgbmVzdGVkIHRyZWUgc3RydWN0dXJlIHdoZXJlXG4gICAqIHRva2VucyB0aGF0IHJlcHJlc2VudCBhIHNlY3Rpb24gaGF2ZSB0d28gYWRkaXRpb25hbCBpdGVtczogMSkgYW4gYXJyYXkgb2ZcbiAgICogYWxsIHRva2VucyB0aGF0IGFwcGVhciBpbiB0aGF0IHNlY3Rpb24gYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWxcbiAgICogdGVtcGxhdGUgdGhhdCByZXByZXNlbnRzIHRoZSBlbmQgb2YgdGhhdCBzZWN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gbmVzdFRva2VucyAodG9rZW5zKSB7XG4gICAgdmFyIG5lc3RlZFRva2VucyA9IFtdO1xuICAgIHZhciBjb2xsZWN0b3IgPSBuZXN0ZWRUb2tlbnM7XG4gICAgdmFyIHNlY3Rpb25zID0gW107XG5cbiAgICB2YXIgdG9rZW4sIHNlY3Rpb247XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnIyc6XG4gICAgICAgIGNhc2UgJ14nOlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgICAgICBzZWN0aW9ucy5wdXNoKHRva2VuKTtcbiAgICAgICAgICBjb2xsZWN0b3IgPSB0b2tlbls0XSA9IFtdO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcvJzpcbiAgICAgICAgICBzZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG4gICAgICAgICAgc2VjdGlvbls1XSA9IHRva2VuWzJdO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHNlY3Rpb25zLmxlbmd0aCA+IDAgPyBzZWN0aW9uc1tzZWN0aW9ucy5sZW5ndGggLSAxXVs0XSA6IG5lc3RlZFRva2VucztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb2xsZWN0b3IucHVzaCh0b2tlbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5lc3RlZFRva2VucztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIHNpbXBsZSBzdHJpbmcgc2Nhbm5lciB0aGF0IGlzIHVzZWQgYnkgdGhlIHRlbXBsYXRlIHBhcnNlciB0byBmaW5kXG4gICAqIHRva2VucyBpbiB0ZW1wbGF0ZSBzdHJpbmdzLlxuICAgKi9cbiAgZnVuY3Rpb24gU2Nhbm5lciAoc3RyaW5nKSB7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWlsID0gc3RyaW5nO1xuICAgIHRoaXMucG9zID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdGFpbCBpcyBlbXB0eSAoZW5kIG9mIHN0cmluZykuXG4gICAqL1xuICBTY2FubmVyLnByb3RvdHlwZS5lb3MgPSBmdW5jdGlvbiBlb3MgKCkge1xuICAgIHJldHVybiB0aGlzLnRhaWwgPT09ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmllcyB0byBtYXRjaCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGF0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKiBSZXR1cm5zIHRoZSBtYXRjaGVkIHRleHQgaWYgaXQgY2FuIG1hdGNoLCB0aGUgZW1wdHkgc3RyaW5nIG90aGVyd2lzZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiBzY2FuIChyZSkge1xuICAgIHZhciBtYXRjaCA9IHRoaXMudGFpbC5tYXRjaChyZSk7XG5cbiAgICBpZiAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICE9PSAwKVxuICAgICAgcmV0dXJuICcnO1xuXG4gICAgdmFyIHN0cmluZyA9IG1hdGNoWzBdO1xuXG4gICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhzdHJpbmcubGVuZ3RoKTtcbiAgICB0aGlzLnBvcyArPSBzdHJpbmcubGVuZ3RoO1xuXG4gICAgcmV0dXJuIHN0cmluZztcbiAgfTtcblxuICAvKipcbiAgICogU2tpcHMgYWxsIHRleHQgdW50aWwgdGhlIGdpdmVuIHJlZ3VsYXIgZXhwcmVzc2lvbiBjYW4gYmUgbWF0Y2hlZC4gUmV0dXJuc1xuICAgKiB0aGUgc2tpcHBlZCBzdHJpbmcsIHdoaWNoIGlzIHRoZSBlbnRpcmUgdGFpbCBpZiBubyBtYXRjaCBjYW4gYmUgbWFkZS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLnNjYW5VbnRpbCA9IGZ1bmN0aW9uIHNjYW5VbnRpbCAocmUpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLnRhaWwuc2VhcmNoKHJlKSwgbWF0Y2g7XG5cbiAgICBzd2l0Y2ggKGluZGV4KSB7XG4gICAgICBjYXNlIC0xOlxuICAgICAgICBtYXRjaCA9IHRoaXMudGFpbDtcbiAgICAgICAgdGhpcy50YWlsID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAwOlxuICAgICAgICBtYXRjaCA9ICcnO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICAgIHRoaXMudGFpbCA9IHRoaXMudGFpbC5zdWJzdHJpbmcoaW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMucG9zICs9IG1hdGNoLmxlbmd0aDtcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfTtcblxuICAvKipcbiAgICogUmVwcmVzZW50cyBhIHJlbmRlcmluZyBjb250ZXh0IGJ5IHdyYXBwaW5nIGEgdmlldyBvYmplY3QgYW5kXG4gICAqIG1haW50YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgY29udGV4dC5cbiAgICovXG4gIGZ1bmN0aW9uIENvbnRleHQgKHZpZXcsIHBhcmVudENvbnRleHQpIHtcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY2FjaGUgPSB7ICcuJzogdGhpcy52aWV3IH07XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnRDb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgY29udGV4dCB1c2luZyB0aGUgZ2l2ZW4gdmlldyB3aXRoIHRoaXMgY29udGV4dFxuICAgKiBhcyB0aGUgcGFyZW50LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKHZpZXcpIHtcbiAgICByZXR1cm4gbmV3IENvbnRleHQodmlldywgdGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBnaXZlbiBuYW1lIGluIHRoaXMgY29udGV4dCwgdHJhdmVyc2luZ1xuICAgKiB1cCB0aGUgY29udGV4dCBoaWVyYXJjaHkgaWYgdGhlIHZhbHVlIGlzIGFic2VudCBpbiB0aGlzIGNvbnRleHQncyB2aWV3LlxuICAgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUubG9va3VwID0gZnVuY3Rpb24gbG9va3VwIChuYW1lKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5jYWNoZTtcblxuICAgIHZhciB2YWx1ZTtcbiAgICBpZiAoY2FjaGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIHZhbHVlID0gY2FjaGVbbmFtZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgaW50ZXJtZWRpYXRlVmFsdWUsIG5hbWVzLCBpbmRleCwgbG9va3VwSGl0ID0gZmFsc2U7XG5cbiAgICAgIHdoaWxlIChjb250ZXh0KSB7XG4gICAgICAgIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IDApIHtcbiAgICAgICAgICBpbnRlcm1lZGlhdGVWYWx1ZSA9IGNvbnRleHQudmlldztcbiAgICAgICAgICBuYW1lcyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgICAgICBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBVc2luZyB0aGUgZG90IG5vdGlvbiBwYXRoIGluIGBuYW1lYCwgd2UgZGVzY2VuZCB0aHJvdWdoIHRoZVxuICAgICAgICAgICAqIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVG8gYmUgY2VydGFpbiB0aGF0IHRoZSBsb29rdXAgaGFzIGJlZW4gc3VjY2Vzc2Z1bCwgd2UgaGF2ZSB0b1xuICAgICAgICAgICAqIGNoZWNrIGlmIHRoZSBsYXN0IG9iamVjdCBpbiB0aGUgcGF0aCBhY3R1YWxseSBoYXMgdGhlIHByb3BlcnR5XG4gICAgICAgICAgICogd2UgYXJlIGxvb2tpbmcgZm9yLiBXZSBzdG9yZSB0aGUgcmVzdWx0IGluIGBsb29rdXBIaXRgLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogVGhpcyBpcyBzcGVjaWFsbHkgbmVjZXNzYXJ5IGZvciB3aGVuIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXQgdG9cbiAgICAgICAgICAgKiBgdW5kZWZpbmVkYCBhbmQgd2Ugd2FudCB0byBhdm9pZCBsb29raW5nIHVwIHBhcmVudCBjb250ZXh0cy5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIEluIHRoZSBjYXNlIHdoZXJlIGRvdCBub3RhdGlvbiBpcyB1c2VkLCB3ZSBjb25zaWRlciB0aGUgbG9va3VwXG4gICAgICAgICAgICogdG8gYmUgc3VjY2Vzc2Z1bCBldmVuIGlmIHRoZSBsYXN0IFwib2JqZWN0XCIgaW4gdGhlIHBhdGggaXNcbiAgICAgICAgICAgKiBub3QgYWN0dWFsbHkgYW4gb2JqZWN0IGJ1dCBhIHByaW1pdGl2ZSAoZS5nLiwgYSBzdHJpbmcsIG9yIGFuXG4gICAgICAgICAgICogaW50ZWdlciksIGJlY2F1c2UgaXQgaXMgc29tZXRpbWVzIHVzZWZ1bCB0byBhY2Nlc3MgYSBwcm9wZXJ0eVxuICAgICAgICAgICAqIG9mIGFuIGF1dG9ib3hlZCBwcmltaXRpdmUsIHN1Y2ggYXMgdGhlIGxlbmd0aCBvZiBhIHN0cmluZy5cbiAgICAgICAgICAgKiovXG4gICAgICAgICAgd2hpbGUgKGludGVybWVkaWF0ZVZhbHVlICE9IG51bGwgJiYgaW5kZXggPCBuYW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gbmFtZXMubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgICAgbG9va3VwSGl0ID0gKFxuICAgICAgICAgICAgICAgIGhhc1Byb3BlcnR5KGludGVybWVkaWF0ZVZhbHVlLCBuYW1lc1tpbmRleF0pXG4gICAgICAgICAgICAgICAgfHwgcHJpbWl0aXZlSGFzT3duUHJvcGVydHkoaW50ZXJtZWRpYXRlVmFsdWUsIG5hbWVzW2luZGV4XSlcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaW50ZXJtZWRpYXRlVmFsdWUgPSBpbnRlcm1lZGlhdGVWYWx1ZVtuYW1lc1tpbmRleCsrXV07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGludGVybWVkaWF0ZVZhbHVlID0gY29udGV4dC52aWV3W25hbWVdO1xuXG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogT25seSBjaGVja2luZyBhZ2FpbnN0IGBoYXNQcm9wZXJ0eWAsIHdoaWNoIGFsd2F5cyByZXR1cm5zIGBmYWxzZWAgaWZcbiAgICAgICAgICAgKiBgY29udGV4dC52aWV3YCBpcyBub3QgYW4gb2JqZWN0LiBEZWxpYmVyYXRlbHkgb21pdHRpbmcgdGhlIGNoZWNrXG4gICAgICAgICAgICogYWdhaW5zdCBgcHJpbWl0aXZlSGFzT3duUHJvcGVydHlgIGlmIGRvdCBub3RhdGlvbiBpcyBub3QgdXNlZC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIENvbnNpZGVyIHRoaXMgZXhhbXBsZTpcbiAgICAgICAgICAgKiBgYGBcbiAgICAgICAgICAgKiBNdXN0YWNoZS5yZW5kZXIoXCJUaGUgbGVuZ3RoIG9mIGEgZm9vdGJhbGwgZmllbGQgaXMge3sjbGVuZ3RofX17e2xlbmd0aH19e3svbGVuZ3RofX0uXCIsIHtsZW5ndGg6IFwiMTAwIHlhcmRzXCJ9KVxuICAgICAgICAgICAqIGBgYFxuICAgICAgICAgICAqXG4gICAgICAgICAgICogSWYgd2Ugd2VyZSB0byBjaGVjayBhbHNvIGFnYWluc3QgYHByaW1pdGl2ZUhhc093blByb3BlcnR5YCwgYXMgd2UgZG9cbiAgICAgICAgICAgKiBpbiB0aGUgZG90IG5vdGF0aW9uIGNhc2UsIHRoZW4gcmVuZGVyIGNhbGwgd291bGQgcmV0dXJuOlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogXCJUaGUgbGVuZ3RoIG9mIGEgZm9vdGJhbGwgZmllbGQgaXMgOS5cIlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogcmF0aGVyIHRoYW4gdGhlIGV4cGVjdGVkOlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogXCJUaGUgbGVuZ3RoIG9mIGEgZm9vdGJhbGwgZmllbGQgaXMgMTAwIHlhcmRzLlwiXG4gICAgICAgICAgICoqL1xuICAgICAgICAgIGxvb2t1cEhpdCA9IGhhc1Byb3BlcnR5KGNvbnRleHQudmlldywgbmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobG9va3VwSGl0KSB7XG4gICAgICAgICAgdmFsdWUgPSBpbnRlcm1lZGlhdGVWYWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudDtcbiAgICAgIH1cblxuICAgICAgY2FjaGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwodGhpcy52aWV3KTtcblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQSBXcml0ZXIga25vd3MgaG93IHRvIHRha2UgYSBzdHJlYW0gb2YgdG9rZW5zIGFuZCByZW5kZXIgdGhlbSB0byBhXG4gICAqIHN0cmluZywgZ2l2ZW4gYSBjb250ZXh0LiBJdCBhbHNvIG1haW50YWlucyBhIGNhY2hlIG9mIHRlbXBsYXRlcyB0b1xuICAgKiBhdm9pZCB0aGUgbmVlZCB0byBwYXJzZSB0aGUgc2FtZSB0ZW1wbGF0ZSB0d2ljZS5cbiAgICovXG4gIGZ1bmN0aW9uIFdyaXRlciAoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZUNhY2hlID0ge1xuICAgICAgX2NhY2hlOiB7fSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0IChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlW2tleV0gPSB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jYWNoZVtrZXldO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICAgIHRoaXMuX2NhY2hlID0ge307XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhpcyB3cml0ZXIuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGVtcGxhdGVDYWNoZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMudGVtcGxhdGVDYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBgdGFnc2Agb3JcbiAgICogYG11c3RhY2hlLnRhZ3NgIGlmIGB0YWdzYCBpcyBvbWl0dGVkLCAgYW5kIHJldHVybnMgdGhlIGFycmF5IG9mIHRva2Vuc1xuICAgKiB0aGF0IGlzIGdlbmVyYXRlZCBmcm9tIHRoZSBwYXJzZS5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLnRlbXBsYXRlQ2FjaGU7XG4gICAgdmFyIGNhY2hlS2V5ID0gdGVtcGxhdGUgKyAnOicgKyAodGFncyB8fCBtdXN0YWNoZS50YWdzKS5qb2luKCc6Jyk7XG4gICAgdmFyIGlzQ2FjaGVFbmFibGVkID0gdHlwZW9mIGNhY2hlICE9PSAndW5kZWZpbmVkJztcbiAgICB2YXIgdG9rZW5zID0gaXNDYWNoZUVuYWJsZWQgPyBjYWNoZS5nZXQoY2FjaGVLZXkpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRva2VucyA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRva2VucyA9IHBhcnNlVGVtcGxhdGUodGVtcGxhdGUsIHRhZ3MpO1xuICAgICAgaXNDYWNoZUVuYWJsZWQgJiYgY2FjaGUuc2V0KGNhY2hlS2V5LCB0b2tlbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdoLWxldmVsIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gcmVuZGVyIHRoZSBnaXZlbiBgdGVtcGxhdGVgIHdpdGhcbiAgICogdGhlIGdpdmVuIGB2aWV3YC5cbiAgICpcbiAgICogVGhlIG9wdGlvbmFsIGBwYXJ0aWFsc2AgYXJndW1lbnQgbWF5IGJlIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZVxuICAgKiBuYW1lcyBhbmQgdGVtcGxhdGVzIG9mIHBhcnRpYWxzIHRoYXQgYXJlIHVzZWQgaW4gdGhlIHRlbXBsYXRlLiBJdCBtYXlcbiAgICogYWxzbyBiZSBhIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBsb2FkIHBhcnRpYWwgdGVtcGxhdGVzIG9uIHRoZSBmbHlcbiAgICogdGhhdCB0YWtlcyBhIHNpbmdsZSBhcmd1bWVudDogdGhlIG5hbWUgb2YgdGhlIHBhcnRpYWwuXG4gICAqXG4gICAqIElmIHRoZSBvcHRpb25hbCBgY29uZmlnYCBhcmd1bWVudCBpcyBnaXZlbiBoZXJlLCB0aGVuIGl0IHNob3VsZCBiZSBhblxuICAgKiBvYmplY3Qgd2l0aCBhIGB0YWdzYCBhdHRyaWJ1dGUgb3IgYW4gYGVzY2FwZWAgYXR0cmlidXRlIG9yIGJvdGguXG4gICAqIElmIGFuIGFycmF5IGlzIHBhc3NlZCwgdGhlbiBpdCB3aWxsIGJlIGludGVycHJldGVkIHRoZSBzYW1lIHdheSBhc1xuICAgKiBhIGB0YWdzYCBhdHRyaWJ1dGUgb24gYSBgY29uZmlnYCBvYmplY3QuXG4gICAqXG4gICAqIFRoZSBgdGFnc2AgYXR0cmlidXRlIG9mIGEgYGNvbmZpZ2Agb2JqZWN0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d29cbiAgICogc3RyaW5nIHZhbHVlczogdGhlIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLlxuICAgKiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBUaGUgZGVmYXVsdCBpcyB0byBtdXN0YWNoZS50YWdzLlxuICAgKlxuICAgKiBUaGUgYGVzY2FwZWAgYXR0cmlidXRlIG9mIGEgYGNvbmZpZ2Agb2JqZWN0IG11c3QgYmUgYSBmdW5jdGlvbiB3aGljaFxuICAgKiBhY2NlcHRzIGEgc3RyaW5nIGFzIGlucHV0IGFuZCBvdXRwdXRzIGEgc2FmZWx5IGVzY2FwZWQgc3RyaW5nLlxuICAgKiBJZiBhbiBgZXNjYXBlYCBmdW5jdGlvbiBpcyBub3QgcHJvdmlkZWQsIHRoZW4gYW4gSFRNTC1zYWZlIHN0cmluZ1xuICAgKiBlc2NhcGluZyBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0LlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgY29uZmlnKSB7XG4gICAgdmFyIHRhZ3MgPSB0aGlzLmdldENvbmZpZ1RhZ3MoY29uZmlnKTtcbiAgICB2YXIgdG9rZW5zID0gdGhpcy5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gICAgdmFyIGNvbnRleHQgPSAodmlldyBpbnN0YW5jZW9mIENvbnRleHQpID8gdmlldyA6IG5ldyBDb250ZXh0KHZpZXcsIHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIHRlbXBsYXRlLCBjb25maWcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb3ctbGV2ZWwgbWV0aG9kIHRoYXQgcmVuZGVycyB0aGUgZ2l2ZW4gYXJyYXkgb2YgYHRva2Vuc2AgdXNpbmdcbiAgICogdGhlIGdpdmVuIGBjb250ZXh0YCBhbmQgYHBhcnRpYWxzYC5cbiAgICpcbiAgICogTm90ZTogVGhlIGBvcmlnaW5hbFRlbXBsYXRlYCBpcyBvbmx5IGV2ZXIgdXNlZCB0byBleHRyYWN0IHRoZSBwb3J0aW9uXG4gICAqIG9mIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSB0aGF0IHdhcyBjb250YWluZWQgaW4gYSBoaWdoZXItb3JkZXIgc2VjdGlvbi5cbiAgICogSWYgdGhlIHRlbXBsYXRlIGRvZXNuJ3QgdXNlIGhpZ2hlci1vcmRlciBzZWN0aW9ucywgdGhpcyBhcmd1bWVudCBtYXlcbiAgICogYmUgb21pdHRlZC5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyVG9rZW5zID0gZnVuY3Rpb24gcmVuZGVyVG9rZW5zICh0b2tlbnMsIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpIHtcbiAgICB2YXIgYnVmZmVyID0gJyc7XG5cbiAgICB2YXIgdG9rZW4sIHN5bWJvbCwgdmFsdWU7XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgIHN5bWJvbCA9IHRva2VuWzBdO1xuXG4gICAgICBpZiAoc3ltYm9sID09PSAnIycpIHZhbHVlID0gdGhpcy5yZW5kZXJTZWN0aW9uKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ14nKSB2YWx1ZSA9IHRoaXMucmVuZGVySW52ZXJ0ZWQodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnPicpIHZhbHVlID0gdGhpcy5yZW5kZXJQYXJ0aWFsKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgY29uZmlnKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJyYnKSB2YWx1ZSA9IHRoaXMudW5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnbmFtZScpIHZhbHVlID0gdGhpcy5lc2NhcGVkVmFsdWUodG9rZW4sIGNvbnRleHQsIGNvbmZpZyk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICd0ZXh0JykgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlKHRva2VuKTtcblxuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmZmVyO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyU2VjdGlvbiA9IGZ1bmN0aW9uIHJlbmRlclNlY3Rpb24gKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBidWZmZXIgPSAnJztcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG5cbiAgICAvLyBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gcmVuZGVyIGFuIGFyYml0cmFyeSB0ZW1wbGF0ZVxuICAgIC8vIGluIHRoZSBjdXJyZW50IGNvbnRleHQgYnkgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIHN1YlJlbmRlciAodGVtcGxhdGUpIHtcbiAgICAgIHJldHVybiBzZWxmLnJlbmRlcih0ZW1wbGF0ZSwgY29udGV4dCwgcGFydGlhbHMsIGNvbmZpZyk7XG4gICAgfVxuXG4gICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuXG4gICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBmb3IgKHZhciBqID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGogPCB2YWx1ZUxlbmd0aDsgKytqKSB7XG4gICAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dC5wdXNoKHZhbHVlW2pdKSwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUsIGNvbmZpZyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWUpLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICBpZiAodHlwZW9mIG9yaWdpbmFsVGVtcGxhdGUgIT09ICdzdHJpbmcnKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zIHdpdGhvdXQgdGhlIG9yaWdpbmFsIHRlbXBsYXRlJyk7XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIHBvcnRpb24gb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgdGhlIHNlY3Rpb24gY29udGFpbnMuXG4gICAgICB2YWx1ZSA9IHZhbHVlLmNhbGwoY29udGV4dC52aWV3LCBvcmlnaW5hbFRlbXBsYXRlLnNsaWNlKHRva2VuWzNdLCB0b2tlbls1XSksIHN1YlJlbmRlcik7XG5cbiAgICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgICBidWZmZXIgKz0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1ZmZlciArPSB0aGlzLnJlbmRlclRva2Vucyh0b2tlbls0XSwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUsIGNvbmZpZyk7XG4gICAgfVxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJJbnZlcnRlZCA9IGZ1bmN0aW9uIHJlbmRlckludmVydGVkICh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUsIGNvbmZpZykge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFVzZSBKYXZhU2NyaXB0J3MgZGVmaW5pdGlvbiBvZiBmYWxzeS4gSW5jbHVkZSBlbXB0eSBhcnJheXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODZcbiAgICBpZiAoIXZhbHVlIHx8IChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApKVxuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmluZGVudFBhcnRpYWwgPSBmdW5jdGlvbiBpbmRlbnRQYXJ0aWFsIChwYXJ0aWFsLCBpbmRlbnRhdGlvbiwgbGluZUhhc05vblNwYWNlKSB7XG4gICAgdmFyIGZpbHRlcmVkSW5kZW50YXRpb24gPSBpbmRlbnRhdGlvbi5yZXBsYWNlKC9bXiBcXHRdL2csICcnKTtcbiAgICB2YXIgcGFydGlhbEJ5TmwgPSBwYXJ0aWFsLnNwbGl0KCdcXG4nKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRpYWxCeU5sLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocGFydGlhbEJ5TmxbaV0ubGVuZ3RoICYmIChpID4gMCB8fCAhbGluZUhhc05vblNwYWNlKSkge1xuICAgICAgICBwYXJ0aWFsQnlObFtpXSA9IGZpbHRlcmVkSW5kZW50YXRpb24gKyBwYXJ0aWFsQnlObFtpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhcnRpYWxCeU5sLmpvaW4oJ1xcbicpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmVuZGVyUGFydGlhbCA9IGZ1bmN0aW9uIHJlbmRlclBhcnRpYWwgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgY29uZmlnKSB7XG4gICAgaWYgKCFwYXJ0aWFscykgcmV0dXJuO1xuICAgIHZhciB0YWdzID0gdGhpcy5nZXRDb25maWdUYWdzKGNvbmZpZyk7XG5cbiAgICB2YXIgdmFsdWUgPSBpc0Z1bmN0aW9uKHBhcnRpYWxzKSA/IHBhcnRpYWxzKHRva2VuWzFdKSA6IHBhcnRpYWxzW3Rva2VuWzFdXTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgdmFyIGxpbmVIYXNOb25TcGFjZSA9IHRva2VuWzZdO1xuICAgICAgdmFyIHRhZ0luZGV4ID0gdG9rZW5bNV07XG4gICAgICB2YXIgaW5kZW50YXRpb24gPSB0b2tlbls0XTtcbiAgICAgIHZhciBpbmRlbnRlZFZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGFnSW5kZXggPT0gMCAmJiBpbmRlbnRhdGlvbikge1xuICAgICAgICBpbmRlbnRlZFZhbHVlID0gdGhpcy5pbmRlbnRQYXJ0aWFsKHZhbHVlLCBpbmRlbnRhdGlvbiwgbGluZUhhc05vblNwYWNlKTtcbiAgICAgIH1cbiAgICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKGluZGVudGVkVmFsdWUsIHRhZ3MpO1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVyVG9rZW5zKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIGluZGVudGVkVmFsdWUsIGNvbmZpZyk7XG4gICAgfVxuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUudW5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiB1bmVzY2FwZWRWYWx1ZSAodG9rZW4sIGNvbnRleHQpIHtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gdmFsdWU7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5lc2NhcGVkVmFsdWUgPSBmdW5jdGlvbiBlc2NhcGVkVmFsdWUgKHRva2VuLCBjb250ZXh0LCBjb25maWcpIHtcbiAgICB2YXIgZXNjYXBlID0gdGhpcy5nZXRDb25maWdFc2NhcGUoY29uZmlnKSB8fCBtdXN0YWNoZS5lc2NhcGU7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmIGVzY2FwZSA9PT0gbXVzdGFjaGUuZXNjYXBlKSA/IFN0cmluZyh2YWx1ZSkgOiBlc2NhcGUodmFsdWUpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUucmF3VmFsdWUgPSBmdW5jdGlvbiByYXdWYWx1ZSAodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW5bMV07XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5nZXRDb25maWdUYWdzID0gZnVuY3Rpb24gZ2V0Q29uZmlnVGFncyAoY29uZmlnKSB7XG4gICAgaWYgKGlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG4gICAgZWxzZSBpZiAoY29uZmlnICYmIHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gY29uZmlnLnRhZ3M7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5nZXRDb25maWdFc2NhcGUgPSBmdW5jdGlvbiBnZXRDb25maWdFc2NhcGUgKGNvbmZpZykge1xuICAgIGlmIChjb25maWcgJiYgdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgIWlzQXJyYXkoY29uZmlnKSkge1xuICAgICAgcmV0dXJuIGNvbmZpZy5lc2NhcGU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgdmFyIG11c3RhY2hlID0ge1xuICAgIG5hbWU6ICdtdXN0YWNoZS5qcycsXG4gICAgdmVyc2lvbjogJzQuMS4wJyxcbiAgICB0YWdzOiBbICd7eycsICd9fScgXSxcbiAgICBjbGVhckNhY2hlOiB1bmRlZmluZWQsXG4gICAgZXNjYXBlOiB1bmRlZmluZWQsXG4gICAgcGFyc2U6IHVuZGVmaW5lZCxcbiAgICByZW5kZXI6IHVuZGVmaW5lZCxcbiAgICBTY2FubmVyOiB1bmRlZmluZWQsXG4gICAgQ29udGV4dDogdW5kZWZpbmVkLFxuICAgIFdyaXRlcjogdW5kZWZpbmVkLFxuICAgIC8qKlxuICAgICAqIEFsbG93cyBhIHVzZXIgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgY2FjaGluZyBzdHJhdGVneSwgYnkgcHJvdmlkaW5nIGFuXG4gICAgICogb2JqZWN0IHdpdGggc2V0LCBnZXQgYW5kIGNsZWFyIG1ldGhvZHMuIFRoaXMgY2FuIGFsc28gYmUgdXNlZCB0byBkaXNhYmxlXG4gICAgICogdGhlIGNhY2hlIGJ5IHNldHRpbmcgaXQgdG8gdGhlIGxpdGVyYWwgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgc2V0IHRlbXBsYXRlQ2FjaGUgKGNhY2hlKSB7XG4gICAgICBkZWZhdWx0V3JpdGVyLnRlbXBsYXRlQ2FjaGUgPSBjYWNoZTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGRlZmF1bHQgb3Igb3ZlcnJpZGRlbiBjYWNoaW5nIG9iamVjdCBmcm9tIHRoZSBkZWZhdWx0IHdyaXRlci5cbiAgICAgKi9cbiAgICBnZXQgdGVtcGxhdGVDYWNoZSAoKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFdyaXRlci50ZW1wbGF0ZUNhY2hlO1xuICAgIH1cbiAgfTtcblxuICAvLyBBbGwgaGlnaC1sZXZlbCBtdXN0YWNoZS4qIGZ1bmN0aW9ucyB1c2UgdGhpcyB3cml0ZXIuXG4gIHZhciBkZWZhdWx0V3JpdGVyID0gbmV3IFdyaXRlcigpO1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgYWxsIGNhY2hlZCB0ZW1wbGF0ZXMgaW4gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLmNsZWFyQ2FjaGUoKTtcbiAgfTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuZCBjYWNoZXMgdGhlIGdpdmVuIHRlbXBsYXRlIGluIHRoZSBkZWZhdWx0IHdyaXRlciBhbmQgcmV0dXJucyB0aGVcbiAgICogYXJyYXkgb2YgdG9rZW5zIGl0IGNvbnRhaW5zLiBEb2luZyB0aGlzIGFoZWFkIG9mIHRpbWUgYXZvaWRzIHRoZSBuZWVkIHRvXG4gICAqIHBhcnNlIHRlbXBsYXRlcyBvbiB0aGUgZmx5IGFzIHRoZXkgYXJlIHJlbmRlcmVkLlxuICAgKi9cbiAgbXVzdGFjaGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5wYXJzZSh0ZW1wbGF0ZSwgdGFncyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlcnMgdGhlIGB0ZW1wbGF0ZWAgd2l0aCB0aGUgZ2l2ZW4gYHZpZXdgLCBgcGFydGlhbHNgLCBhbmQgYGNvbmZpZ2BcbiAgICogdXNpbmcgdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgKi9cbiAgbXVzdGFjaGUucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyICh0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIGNvbmZpZykge1xuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRlbXBsYXRlISBUZW1wbGF0ZSBzaG91bGQgYmUgYSBcInN0cmluZ1wiICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYnV0IFwiJyArIHR5cGVTdHIodGVtcGxhdGUpICsgJ1wiIHdhcyBnaXZlbiBhcyB0aGUgZmlyc3QgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhcmd1bWVudCBmb3IgbXVzdGFjaGUjcmVuZGVyKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscyknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVmYXVsdFdyaXRlci5yZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBjb25maWcpO1xuICB9O1xuXG4gIC8vIEV4cG9ydCB0aGUgZXNjYXBpbmcgZnVuY3Rpb24gc28gdGhhdCB0aGUgdXNlciBtYXkgb3ZlcnJpZGUgaXQuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qcy9pc3N1ZXMvMjQ0XG4gIG11c3RhY2hlLmVzY2FwZSA9IGVzY2FwZUh0bWw7XG5cbiAgLy8gRXhwb3J0IHRoZXNlIG1haW5seSBmb3IgdGVzdGluZywgYnV0IGFsc28gZm9yIGFkdmFuY2VkIHVzYWdlLlxuICBtdXN0YWNoZS5TY2FubmVyID0gU2Nhbm5lcjtcbiAgbXVzdGFjaGUuQ29udGV4dCA9IENvbnRleHQ7XG4gIG11c3RhY2hlLldyaXRlciA9IFdyaXRlcjtcblxuICByZXR1cm4gbXVzdGFjaGU7XG5cbn0pKSk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIG1hcCA9IHtcblx0XCIuL2Fzcy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L2Fzcy5qc1wiLFxuXHRcIi4vanNvbi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L2pzb24uanNcIixcblx0XCIuL2xyYy5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L2xyYy5qc1wiLFxuXHRcIi4vc2J2LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvc2J2LmpzXCIsXG5cdFwiLi9zbWkuanNcIjogXCIuL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zbWkuanNcIixcblx0XCIuL3NydC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3NydC5qc1wiLFxuXHRcIi4vc3NhLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvc3NhLmpzXCIsXG5cdFwiLi9zdWIuanNcIjogXCIuL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zdWIuanNcIixcblx0XCIuL3Z0dC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3Z0dC5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdCBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qXFxcXC5qcyRcIjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwiYXNzXCI7XG5cbi8vQ29tcGF0aWJsZSBmb3JtYXRcbnZhciBzc2EgPSByZXF1aXJlKCcuL3NzYS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogc3NhLmhlbHBlcixcbiAgZGV0ZWN0OiBzc2EuZGV0ZWN0LFxuICBwYXJzZTogc3NhLnBhcnNlLFxuICBidWlsZDogc3NhLmJ1aWxkXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEZPUk1BVF9OQU1FID0gXCJqc29uXCI7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBKU09OIGZvcm1hdFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHBhcnNlKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCk7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCdWlsZHMgY2FwdGlvbnMgaW4gSlNPTiBmb3JtYXRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBidWlsZChjYXB0aW9ucywgb3B0aW9ucykge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoY2FwdGlvbnMsIFwiIFwiLCAyKTtcbn1cblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICgvXlxcW1tcXHNcXHJcXG5dKlxce1tcXHNcXFNdKlxcfVtcXHNcXHJcXG5dKlxcXSQvZy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAvKlxuICAgICAgW1xuICAgICAgICB7IC4uLiB9XG4gICAgICBdXG4gICAgICAqL1xuICAgICAgcmV0dXJuIFwianNvblwiO1xuICAgIH1cbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRXhwb3J0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IEZPUk1BVF9OQU1FLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcImxyY1wiO1xuXG52YXIgaGVscGVyID0ge1xuICB0b01pbGxpc2Vjb25kczogZnVuY3Rpb24ocykge1xuICAgIHZhciBtYXRjaCA9IC9eXFxzKihcXGQrKTooXFxkezEsMn0pKFsuLF0oXFxkezEsM30pKT9cXHMqJC8uZXhlYyhzKTtcbiAgICB2YXIgbW0gPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgdmFyIHNzID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHZhciBmZiA9IG1hdGNoWzRdID8gcGFyc2VJbnQobWF0Y2hbNF0pIDogMDtcbiAgICB2YXIgbXMgPSBtbSAqIDYwICogMTAwMCArIHNzICogMTAwMCArIGZmICogMTA7XG4gICAgcmV0dXJuIG1zO1xuICB9LFxuICB0b1RpbWVTdHJpbmc6IGZ1bmN0aW9uKG1zKSB7XG4gICAgdmFyIG1tID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyA2MCk7XG4gICAgdmFyIHNzID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgJSA2MCk7XG4gICAgdmFyIGZmID0gTWF0aC5mbG9vcihtcyAlIDEwMDApO1xuICAgIHZhciB0aW1lID0gKG1tIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgbW0gKyBcIjpcIiArIChzcyA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHNzICsgXCIuXCIgKyAoZmYgPCAxMDAgPyBcIjBcIiA6IFwiXCIpICsgKGZmIDwgMTAgPyBcIjBcIiA6IE1hdGguZmxvb3IoZmYgLyAxMCkpO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQYXJzZXMgY2FwdGlvbnMgaW4gTFJDIGZvcm1hdDogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTFJDXyUyOGZpbGVfZm9ybWF0JTI5XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgcHJldiA9IG51bGw7XG4gIHZhciBjYXB0aW9ucyA9IFsgXTtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoL1xccj9cXG4vKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghcGFydHNbaV0gfHwgcGFydHNbaV0udHJpbSgpLmxlbmd0aCA9PSAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gIFxuICAgIC8vTFJDIGNvbnRlbnRcbiAgICB2YXIgcmVnZXggPSAvXlxcWyhcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXF0oLiopKFxccj9cXG4pKiQvZ2k7XG4gICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyhwYXJ0c1tpXSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICAgIGNhcHRpb24udHlwZSA9IFwiY2FwdGlvblwiO1xuICAgICAgY2FwdGlvbi5zdGFydCA9IGhlbHBlci50b01pbGxpc2Vjb25kcyhtYXRjaFsxXSk7XG4gICAgICBjYXB0aW9uLmVuZCA9IGNhcHRpb24uc3RhcnQgKyAyMDAwO1xuICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgIGNhcHRpb24uY29udGVudCA9IG1hdGNoWzNdO1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi5jb250ZW50O1xuICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIFxuICAgICAgLy9VcGRhdGUgcHJldmlvdXNcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHByZXYuZW5kID0gY2FwdGlvbi5zdGFydDtcbiAgICAgICAgcHJldi5kdXJhdGlvbiA9IHByZXYuZW5kIC0gcHJldi5zdGFydDtcbiAgICAgIH1cbiAgICAgIHByZXYgPSBjYXB0aW9uO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIC8vTFJDIG1ldGFcbiAgICB2YXIgbWV0YSA9IC9eXFxbKFtcXHdcXGRdKyk6KFteXFxdXSopXFxdKFxccj9cXG4pKiQvZ2kuZXhlYyhwYXJ0c1tpXSk7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJtZXRhXCI7XG4gICAgICBjYXB0aW9uLnRhZyA9IG1ldGFbMV07XG4gICAgICBpZiAobWV0YVsyXSkge1xuICAgICAgICBjYXB0aW9uLmRhdGEgPSBtZXRhWzJdO1xuICAgICAgfVxuICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIldBUk46IFVua25vd24gcGFydFwiLCBwYXJ0c1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYXB0aW9ucztcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBMUkMgZm9ybWF0OiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MUkNfJTI4ZmlsZV9mb3JtYXQlMjlcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBidWlsZChjYXB0aW9ucywgb3B0aW9ucykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIHZhciBseXJpY3MgPSBmYWxzZTtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2FwdGlvbiA9IGNhcHRpb25zW2ldO1xuICAgIGlmIChjYXB0aW9uLnR5cGUgPT0gXCJtZXRhXCIpIHtcbiAgICAgIGlmIChjYXB0aW9uLnRhZyAmJiBjYXB0aW9uLmRhdGEpIHtcbiAgICAgICAgY29udGVudCArPSBcIltcIiArIGNhcHRpb24udGFnICsgXCI6XCIgKyBjYXB0aW9uLmRhdGEucmVwbGFjZSgvW1xcclxcbl0rL2csIFwiIFwiKSArIFwiXVwiICsgZW9sO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgaWYgKCFseXJpY3MpIHtcbiAgICAgICAgY29udGVudCArPSBlb2w7IC8vTmV3IGxpbmUgd2hlbiBseXJpY3Mgc3RhcnRcbiAgICAgICAgbHlyaWNzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gXCJbXCIgKyBoZWxwZXIudG9UaW1lU3RyaW5nKGNhcHRpb24uc3RhcnQpICsgXCJdXCIgKyBjYXB0aW9uLnRleHQgKyBlb2w7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJTS0lQOlwiLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICgvXFxyP1xcblxcWyhcXGQrOlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxcXSguKilcXHI/XFxuLy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAvKlxuICAgICAgWzA0OjQ4LjI4XVNpc3RlciwgcGVyZnVtZT9cbiAgICAgICovXG4gICAgICAvL3JldHVybiBcImxyY1wiO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogaGVscGVyLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcInNidlwiO1xuXG52YXIgaGVscGVyID0ge1xuICB0b01pbGxpc2Vjb25kczogZnVuY3Rpb24ocykge1xuICAgIHZhciBtYXRjaCA9IC9eXFxzKihcXGR7MSwyfSk6KFxcZHsxLDJ9KTooXFxkezEsMn0pKFsuLF0oXFxkezEsM30pKT9cXHMqJC8uZXhlYyhzKTtcbiAgICB2YXIgaGggPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgdmFyIG1tID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHZhciBzcyA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICB2YXIgZmYgPSBtYXRjaFs1XSA/IHBhcnNlSW50KG1hdGNoWzVdKSA6IDA7XG4gICAgdmFyIG1zID0gaGggKiAzNjAwICogMTAwMCArIG1tICogNjAgKiAxMDAwICsgc3MgKiAxMDAwICsgZmY7XG4gICAgcmV0dXJuIG1zO1xuICB9LFxuICB0b1RpbWVTdHJpbmc6IGZ1bmN0aW9uKG1zKSB7XG4gICAgdmFyIGhoID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyAzNjAwKTtcbiAgICB2YXIgbW0gPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwICUgNjApO1xuICAgIHZhciBzcyA9IE1hdGguZmxvb3IobXMgLyAxMDAwICUgNjApO1xuICAgIHZhciBmZiA9IE1hdGguZmxvb3IobXMgJSAxMDAwKTtcbiAgICB2YXIgdGltZSA9IChoaCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGhoICsgXCI6XCIgKyAobW0gPCAxMCA/IFwiMFwiIDogXCJcIikgKyBtbSArIFwiOlwiICsgKHNzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgc3MgKyBcIi5cIiArIChmZiA8IDEwMCA/IFwiMFwiIDogXCJcIikgKyAoZmYgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBmZjtcbiAgICByZXR1cm4gdGltZTtcbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGNhcHRpb25zIGluIFN1YlZpZXdlciBmb3JtYXQgKC5zYnYpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgY2FwdGlvbnMgPSBbIF07XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICB2YXIgcGFydHMgPSBjb250ZW50LnNwbGl0KC9cXHI/XFxuXFxzK1xccj9cXG4vKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWdleCA9IC9eKFxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccypbLDtdXFxzKihcXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXHI/XFxuKFtcXHNcXFNdKikoXFxyP1xcbikqJC9naTtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJjYXB0aW9uXCI7XG4gICAgICBjYXB0aW9uLnN0YXJ0ID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzFdKTtcbiAgICAgIGNhcHRpb24uZW5kID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzNdKTtcbiAgICAgIGNhcHRpb24uZHVyYXRpb24gPSBjYXB0aW9uLmVuZCAtIGNhcHRpb24uc3RhcnQ7XG4gICAgICB2YXIgbGluZXMgPSBtYXRjaFs1XS5zcGxpdCgvXFxbYnJcXF18XFxyP1xcbi9naSk7XG4gICAgICBjYXB0aW9uLmNvbnRlbnQgPSBsaW5lcy5qb2luKGVvbCk7XG4gICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLmNvbnRlbnQucmVwbGFjZSgvXFw+XFw+XFxzKlteOl0rOlxccyovZywgXCJcIik7IC8vPj4gU1BFQUtFUiBOQU1FOiBcbiAgICAgIGNhcHRpb25zLnB1c2goY2FwdGlvbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBVbmtub3duIHBhcnRcIiwgcGFydHNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FwdGlvbnM7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCdWlsZHMgY2FwdGlvbnMgaW4gU3ViVmlld2VyIGZvcm1hdCAoLnNidilcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBidWlsZChjYXB0aW9ucywgb3B0aW9ucykge1xuICB2YXIgY29udGVudCA9IFwiXCI7XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAodHlwZW9mIGNhcHRpb24udHlwZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjYXB0aW9uLnR5cGUgPT0gXCJjYXB0aW9uXCIpIHtcbiAgICAgIGNvbnRlbnQgKz0gaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLnN0YXJ0KSArIFwiLFwiICsgaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLmVuZCkgKyBlb2w7XG4gICAgICBjb250ZW50ICs9IGNhcHRpb24udGV4dCArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gZW9sO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0tJUDpcIiwgY2FwdGlvbik7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERldGVjdHMgYSBzdWJ0aXRsZSBmb3JtYXQgZnJvbSB0aGUgY29udGVudC5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBkZXRlY3QoY29udGVudCkge1xuICBpZiAodHlwZW9mIGNvbnRlbnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBzdHJpbmcgY29udGVudCFcIik7XG4gIH1cbiAgXG4gIGlmICgvXFxkezEsMn06XFxkezEsMn06XFxkezEsMn0oWy4sXVxcZHsxLDN9KT9cXHMqWyw7XVxccypcXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPy9nLnRlc3QoY29udGVudCkpIHtcbiAgICAvKlxuICAgIDAwOjA0OjQ4LjI4MCwwMDowNDo1MC41MTBcbiAgICBTaXN0ZXIsIHBlcmZ1bWU/XG4gICAgKi9cbiAgICByZXR1cm4gXCJzYnZcIjtcbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRXhwb3J0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IEZPUk1BVF9OQU1FLFxuICBoZWxwZXI6IGhlbHBlcixcbiAgZGV0ZWN0OiBkZXRlY3QsXG4gIHBhcnNlOiBwYXJzZSxcbiAgYnVpbGQ6IGJ1aWxkXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEZPUk1BVF9OQU1FID0gXCJzbWlcIjtcblxudmFyIGhlbHBlciA9IHtcbiAgaHRtbEVuY29kZTogZnVuY3Rpb24odGV4dCkge1xuICAgIHJldHVybiB0ZXh0XG4gICAgICAucmVwbGFjZSgvJi9nLCAnJmFtcDsnKVxuICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgLnJlcGxhY2UoLycvZywgJyYjMzk7JylcbiAgICAgIC5yZXBsYWNlKC9cXDwvZywgJyZsdDsnKVxuICAgICAgLnJlcGxhY2UoL1xcPi9nLCAnJmd0OycpXG4gICAgICAvLy5yZXBsYWNlKC9cXHMvZywgJyZuYnNwOycpXG4gICAgICAucmVwbGFjZSgvXFxyP1xcbi9nLCAnPEJSPicpO1xuICB9LFxuICBodG1sRGVjb2RlOiBmdW5jdGlvbihodG1sLCBlb2wpe1xuICAgIHJldHVybiBodG1sXG4gICAgICAucmVwbGFjZSgvXFw8QlJcXHMqXFwvP1xcPi9naSwgZW9sIHx8ICdcXHJcXG4nKVxuICAgICAgLnJlcGxhY2UoLyZuYnNwOy9nLCAnICcpXG4gICAgICAucmVwbGFjZSgvJnF1b3Q7L2csICdcIicpXG4gICAgICAucmVwbGFjZSgvJiMzOTsvZywgXCInXCIpXG4gICAgICAucmVwbGFjZSgvJmx0Oy9nLCAnPCcpXG4gICAgICAucmVwbGFjZSgvJmd0Oy9nLCAnPicpXG4gICAgICAucmVwbGFjZSgvJmFtcDsvZywgJyYnKTtcbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGNhcHRpb25zIGluIFNBTUkgZm9ybWF0ICguc21pKVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHBhcnNlKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgdmFyIGNhcHRpb25zID0gWyBdO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgXG4gIHZhciB0aXRsZSA9IC9cXDxUSVRMRVteXFw+XSpcXD4oW1xcc1xcU10qKVxcPFxcL1RJVExFXFw+L2dpLmV4ZWMoY29udGVudCk7XG4gIGlmICh0aXRsZSkge1xuICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgIGNhcHRpb24udHlwZSA9IFwibWV0YVwiO1xuICAgIGNhcHRpb24ubmFtZSA9IFwidGl0bGVcIjtcbiAgICBjYXB0aW9uLmRhdGEgPSB0aXRsZVsxXS5yZXBsYWNlKC9eW1xcc1xcclxcbl0qL2csIFwiXCIpLnJlcGxhY2UoL1tcXHNcXHJcXG5dKiQvZywgXCJcIik7XG4gICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgfVxuICBcbiAgdmFyIHN0eWxlID0gL1xcPFNUWUxFW15cXD5dKlxcPihbXFxzXFxTXSopXFw8XFwvU1RZTEVcXD4vZ2kuZXhlYyhjb250ZW50KTtcbiAgaWYgKHN0eWxlKSB7XG4gICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgY2FwdGlvbi50eXBlID0gXCJtZXRhXCI7XG4gICAgY2FwdGlvbi5uYW1lID0gXCJzdHlsZVwiO1xuICAgIGNhcHRpb24uZGF0YSA9IHN0eWxlWzFdO1xuICAgIGNhcHRpb25zLnB1c2goY2FwdGlvbik7XG4gIH1cbiAgXG4gIHZhciBzYW1pID0gY29udGVudFxuICAgIC5yZXBsYWNlKC9eW1xcc1xcU10qXFw8Qk9EWVteXFw+XSpcXD4vZ2ksIFwiXCIpIC8vUmVtb3ZlIGNvbnRlbnQgYmVmb3JlIGJvZHlcbiAgICAucmVwbGFjZSgvXFw8XFwvQk9EWVteXFw+XSpcXD5bXFxzXFxTXSokL2dpLCBcIlwiKTsgLy9SZW1vdmUgY29udGVudCBhZnRlciBib2R5XG4gICAgXG4gIHZhciBwcmV2ID0gbnVsbDtcbiAgdmFyIHBhcnRzID0gc2FtaS5zcGxpdCgvXFw8U1lOQy9naSk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXBhcnRzW2ldIHx8IHBhcnRzW2ldLnRyaW0oKS5sZW5ndGggPT0gMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIHZhciBwYXJ0ID0gJzxTWU5DJyArIHBhcnRzW2ldO1xuICAgIFxuICAgIC8vPFNZTkMgU3RhcnQgPSAxMDAwPlxuICAgIHZhciBtYXRjaCA9IC9eXFw8U1lOQ1teXFw+XStTdGFydFxccyo9XFxzKltcIiddPyhcXGQrKVtcIiddP1teXFw+XSpcXD4oW1xcc1xcU10qKS9naS5leGVjKHBhcnQpO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICBjYXB0aW9uLnR5cGUgPSBcImNhcHRpb25cIjtcbiAgICAgIGNhcHRpb24uc3RhcnQgPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgICBjYXB0aW9uLmVuZCA9IGNhcHRpb24uc3RhcnQgKyAyMDAwO1xuICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgIGNhcHRpb24uY29udGVudCA9IG1hdGNoWzJdLnJlcGxhY2UoL15cXDxcXC9TWU5DW15cXD5dKj4vZ2ksIFwiXCIpO1xuICAgICAgXG4gICAgICB2YXIgYmxhbmsgPSB0cnVlO1xuICAgICAgdmFyIHAgPSAvXlxcPFBbXlxcPl0rQ2xhc3NcXHMqPVxccypbXCInXT8oW1xcd1xcZFxcLV9dKylbXCInXT9bXlxcPl0qXFw+KFtcXHNcXFNdKikvZ2kuZXhlYyhjYXB0aW9uLmNvbnRlbnQpO1xuICAgICAgaWYgKCFwKSB7XG4gICAgICAgIHAgPSAvXlxcPFAoW15cXD5dKilcXD4oW1xcc1xcU10qKS9naS5leGVjKGNhcHRpb24uY29udGVudCk7XG4gICAgICB9XG4gICAgICBpZiAocCkge1xuICAgICAgICB2YXIgaHRtbCA9IHBbMl0ucmVwbGFjZSgvXFw8UFtcXHNcXFNdKyQvZ2ksIFwiXCIpOyAvL1JlbW92ZSBzdHJpbmcgYWZ0ZXIgYW5vdGhlciA8UD4gdGFnXG4gICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoL1xcPEJSXFxzKlxcLz9cXD5bXFxzXFxyXFxuXSsvZ2ksIGVvbCkucmVwbGFjZSgvXFw8QlJcXHMqXFwvP1xcPi9naSwgZW9sKS5yZXBsYWNlKC9cXDxbXlxcPl0rXFw+L2csIFwiXCIpOyAvL1JlbW92ZSBhbGwgdGFnc1xuICAgICAgICBodG1sID0gaHRtbC5yZXBsYWNlKC9eW1xcc1xcclxcbl0rL2csIFwiXCIpLnJlcGxhY2UoL1tcXHNcXHJcXG5dKyQvZywgXCJcIik7IC8vVHJpbSBuZXcgbGluZXMgYW5kIHNwYWNlc1xuICAgICAgICBibGFuayA9IChodG1sLnJlcGxhY2UoLyZuYnNwOy9naSwgXCIgXCIpLnJlcGxhY2UoL1tcXHNcXHJcXG5dKy9nLCBcIlwiKS5sZW5ndGggPT0gMCk7XG4gICAgICAgIGNhcHRpb24udGV4dCAgPSBoZWxwZXIuaHRtbERlY29kZShodG1sLCBlb2wpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoIW9wdGlvbnMucHJlc2VydmVTcGFjZXMgJiYgYmxhbmspIHtcbiAgICAgICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiSU5GTzogU2tpcHBpbmcgd2hpdGUgc3BhY2UgY2FwdGlvbiBhdCBcIiArIGNhcHRpb24uc3RhcnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy9VcGRhdGUgcHJldmlvdXNcbiAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgIHByZXYuZW5kID0gY2FwdGlvbi5zdGFydDtcbiAgICAgICAgcHJldi5kdXJhdGlvbiA9IHByZXYuZW5kIC0gcHJldi5zdGFydDtcbiAgICAgIH1cbiAgICAgIHByZXYgPSBjYXB0aW9uO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiV0FSTjogVW5rbm93biBwYXJ0XCIsIHBhcnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBjYXB0aW9ucztcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBTQU1JIGZvcm1hdCAoLnNtaSlcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBidWlsZChjYXB0aW9ucywgb3B0aW9ucykge1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgXG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgY29udGVudCArPSAnPFNBTUk+JyArIGVvbDtcbiAgY29udGVudCArPSAnPEhFQUQ+JyArIGVvbDtcbiAgY29udGVudCArPSAnPFRJVExFPicgKyAob3B0aW9ucy50aXRsZSB8fCBcIlwiKSArICc8L1RJVExFPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzxTVFlMRSBUWVBFPVwidGV4dC9jc3NcIj4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8IS0tJyArIGVvbDtcbiAgY29udGVudCArPSAnUCB7IGZvbnQtZmFtaWx5OiBBcmlhbDsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgY29sb3I6IHdoaXRlOyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgdGV4dC1hbGlnbjogY2VudGVyOyB9JyArIGVvbDtcbiAgY29udGVudCArPSAnLkxBTkcgeyBOYW1lOiAnICsgKG9wdGlvbnMubGFuZ05hbWUgfHwgXCJFbmdsaXNoXCIpICsgJzsgbGFuZzogJyArIChvcHRpb25zLmxhbmdDb2RlIHx8IFwiZW4tVVNcIikgKyAnOyBTQU1JVHlwZTogQ0M7IH0nICsgZW9sO1xuICBjb250ZW50ICs9ICctLT4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8L1NUWUxFPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzwvSEVBRD4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8Qk9EWT4nICsgZW9sO1xuICBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2FwdGlvbnNbaV07XG4gICAgaWYgKGNhcHRpb24udHlwZSA9PSBcIm1ldGFcIikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgLy9TdGFydCBvZiBjYXB0aW9uXG4gICAgICBjb250ZW50ICs9ICc8U1lOQyBTdGFydD0nICsgY2FwdGlvbi5zdGFydCArICc+JyArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gJyAgPFAgQ2xhc3M9TEFORz4nICsgaGVscGVyLmh0bWxFbmNvZGUoY2FwdGlvbi50ZXh0IHx8IFwiXCIpICsgKG9wdGlvbnMuY2xvc2VUYWdzID8gJzwvUD4nIDogXCJcIikgKyBlb2w7XG4gICAgICBpZiAob3B0aW9ucy5jbG9zZVRhZ3MpIHtcbiAgICAgICAgY29udGVudCArPSAnPC9TWU5DPicgKyBlb2w7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vQmxhbmsgbGluZSBpbmRpY2F0ZXMgdGhlIGVuZCBvZiBjYXB0aW9uXG4gICAgICBjb250ZW50ICs9ICc8U1lOQyBTdGFydD0nICsgY2FwdGlvbi5lbmQgKyAnPicgKyBlb2w7XG4gICAgICBjb250ZW50ICs9ICcgIDxQIENsYXNzPUxBTkc+JyArICcmbmJzcDsnICsgKG9wdGlvbnMuY2xvc2VUYWdzID8gJzwvUD4nIDogXCJcIikgKyBlb2w7XG4gICAgICBpZiAob3B0aW9ucy5jbG9zZVRhZ3MpIHtcbiAgICAgICAgY29udGVudCArPSAnPC9TWU5DPicgKyBlb2w7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNLSVA6XCIsIGNhcHRpb24pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnRlbnQgKz0gJzwvQk9EWT4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8L1NBTUk+JyArIGVvbDtcbiAgXG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICgvXFw8U0FNSVteXFw+XSpcXD5bXFxzXFxTXSpcXDxCT0RZW15cXD5dKlxcPi9nLnRlc3QoY29udGVudCkpIHtcbiAgICAgIC8qXG4gICAgICA8U0FNST5cbiAgICAgIDxCT0RZPlxuICAgICAgPFNZTkMgU3RhcnQ9Li4uXG4gICAgICAuLi5cbiAgICAgIDwvQk9EWT5cbiAgICAgIDwvU0FNST5cbiAgICAgICovXG4gICAgICByZXR1cm4gXCJzbWlcIjtcbiAgICB9XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEV4cG9ydFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBGT1JNQVRfTkFNRSxcbiAgaGVscGVyOiBoZWxwZXIsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwic3J0XCI7XG5cbnZhciBoZWxwZXIgPSB7XG4gIHRvTWlsbGlzZWNvbmRzOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG1hdGNoID0gL15cXHMqKFxcZHsxLDJ9KTooXFxkezEsMn0pOihcXGR7MSwyfSkoWy4sXShcXGR7MSwzfSkpP1xccyokLy5leGVjKHMpO1xuICAgIHZhciBoaCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICB2YXIgbW0gPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgdmFyIHNzID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHZhciBmZiA9IG1hdGNoWzVdID8gcGFyc2VJbnQobWF0Y2hbNV0pIDogMDtcbiAgICB2YXIgbXMgPSBoaCAqIDM2MDAgKiAxMDAwICsgbW0gKiA2MCAqIDEwMDAgKyBzcyAqIDEwMDAgKyBmZjtcbiAgICByZXR1cm4gbXM7XG4gIH0sXG4gIHRvVGltZVN0cmluZzogZnVuY3Rpb24obXMpIHtcbiAgICB2YXIgaGggPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDM2MDApO1xuICAgIHZhciBtbSA9IE1hdGguZmxvb3IobXMgLyAxMDAwIC8gNjAgJSA2MCk7XG4gICAgdmFyIHNzID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgJSA2MCk7XG4gICAgdmFyIGZmID0gTWF0aC5mbG9vcihtcyAlIDEwMDApO1xuICAgIHZhciB0aW1lID0gKGhoIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgaGggKyBcIjpcIiArIChtbSA8IDEwID8gXCIwXCIgOiBcIlwiKSArIG1tICsgXCI6XCIgKyAoc3MgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBzcyArIFwiLFwiICsgKGZmIDwgMTAwID8gXCIwXCIgOiBcIlwiKSArIChmZiA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGZmO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQYXJzZXMgY2FwdGlvbnMgaW4gU3ViUmlwIGZvcm1hdCAoLnNydClcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBwYXJzZShjb250ZW50LCBvcHRpb25zKSB7XG4gIHZhciBjYXB0aW9ucyA9IFsgXTtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoL1xccj9cXG5cXHMrXFxyP1xcbi9nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWdleCA9IC9eKFxcZCspXFxyP1xcbihcXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXHMqXFwtXFwtXFw+XFxzKihcXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXHI/XFxuKFtcXHNcXFNdKikoXFxyP1xcbikqJC9naTtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJjYXB0aW9uXCI7XG4gICAgICBjYXB0aW9uLmluZGV4ID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgICAgY2FwdGlvbi5zdGFydCA9IGhlbHBlci50b01pbGxpc2Vjb25kcyhtYXRjaFsyXSk7XG4gICAgICBjYXB0aW9uLmVuZCA9IGhlbHBlci50b01pbGxpc2Vjb25kcyhtYXRjaFs0XSk7XG4gICAgICBjYXB0aW9uLmR1cmF0aW9uID0gY2FwdGlvbi5lbmQgLSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgdmFyIGxpbmVzID0gbWF0Y2hbNl0uc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgIGNhcHRpb24uY29udGVudCA9IGxpbmVzLmpvaW4oZW9sKTtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24uY29udGVudFxuICAgICAgICAucmVwbGFjZSgvXFw8W15cXD5dK1xcPi9nLCBcIlwiKSAvLzxiPmJvbGQ8L2I+IG9yIDxpPml0YWxpYzwvaT5cbiAgICAgICAgLnJlcGxhY2UoL1xce1teXFx9XStcXH0vZywgXCJcIikgLy97Yn1ib2xkey9ifSBvciB7aX1pdGFsaWN7L2l9XG4gICAgICAgIC5yZXBsYWNlKC9cXD5cXD5cXHMqW146XSo6XFxzKi9nLCBcIlwiKTsgLy8+PiBTUEVBS0VSIE5BTUU6IFxuICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIldBUk46IFVua25vd24gcGFydFwiLCBwYXJ0c1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYXB0aW9ucztcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBTdWJSaXAgZm9ybWF0ICguc3J0KVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBzcnQgPSBcIlwiO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2FwdGlvbnNbaV07XG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICBzcnQgKz0gKGkgKyAxKS50b1N0cmluZygpICsgZW9sO1xuICAgICAgc3J0ICs9IGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5zdGFydCkgKyBcIiAtLT4gXCIgKyBoZWxwZXIudG9UaW1lU3RyaW5nKGNhcHRpb24uZW5kKSArIGVvbDtcbiAgICAgIHNydCArPSBjYXB0aW9uLnRleHQgKyBlb2w7XG4gICAgICBzcnQgKz0gZW9sO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0tJUDpcIiwgY2FwdGlvbik7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gc3J0O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICgvXFxkK1xccj9cXG5cXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pP1xccypcXC1cXC1cXD5cXHMqXFxkezEsMn06XFxkezEsMn06XFxkezEsMn0oWy4sXVxcZHsxLDN9KT8vZy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAvKlxuICAgICAgM1xuICAgICAgMDA6MDQ6NDgsMjgwIC0tPiAwMDowNDo1MCw1MTBcbiAgICAgIFNpc3RlciwgcGVyZnVtZT9cbiAgICAgICovXG4gICAgICByZXR1cm4gRk9STUFUX05BTUU7XG4gICAgfVxuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogaGVscGVyLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcInNzYVwiO1xuXG52YXIgaGVscGVyID0ge1xuICB0b01pbGxpc2Vjb25kczogZnVuY3Rpb24ocykge1xuICAgIHZhciBtYXRjaCA9IC9eXFxzKihcXGQrOik/KFxcZHsxLDJ9KTooXFxkezEsMn0pKFsuLF0oXFxkezEsM30pKT9cXHMqJC8uZXhlYyhzKTtcbiAgICB2YXIgaGggPSBtYXRjaFsxXSA/IHBhcnNlSW50KG1hdGNoWzFdLnJlcGxhY2UoXCI6XCIsIFwiXCIpKSA6IDA7XG4gICAgdmFyIG1tID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHZhciBzcyA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICB2YXIgZmYgPSBtYXRjaFs1XSA/IHBhcnNlSW50KG1hdGNoWzVdKSA6IDA7XG4gICAgdmFyIG1zID0gaGggKiAzNjAwICogMTAwMCArIG1tICogNjAgKiAxMDAwICsgc3MgKiAxMDAwICsgZmYgKiAxMDtcbiAgICByZXR1cm4gbXM7XG4gIH0sXG4gIHRvVGltZVN0cmluZzogZnVuY3Rpb24obXMpIHtcbiAgICB2YXIgaGggPSBNYXRoLmZsb29yKG1zLyAxMDAwIC8gMzYwMCk7XG4gICAgdmFyIG1tID0gTWF0aC5mbG9vcihtcy8gMTAwMCAvIDYwICUgNjApO1xuICAgIHZhciBzcyA9IE1hdGguZmxvb3IobXMvIDEwMDAgJSA2MCk7XG4gICAgdmFyIGZmID0gTWF0aC5mbG9vcihtcyAlIDEwMDAgLyAxMCk7IC8vMiBkaWdpdHNcbiAgICB2YXIgdGltZSA9IGhoICsgXCI6XCIgKyAobW0gPCAxMCA/IFwiMFwiIDogXCJcIikgKyBtbSArIFwiOlwiICsgKHNzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgc3MgKyBcIi5cIiArIChmZiA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGZmO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQYXJzZXMgY2FwdGlvbnMgaW4gU3ViU3RhdGlvbiBBbHBoYSBmb3JtYXQgKC5zc2EpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgbWV0YTtcbiAgdmFyIGNvbHVtbnMgPSBudWxsO1xuICB2YXIgY2FwdGlvbnMgPSBbIF07XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICB2YXIgcGFydHMgPSBjb250ZW50LnNwbGl0KC9cXHI/XFxuXFxzKlxccj9cXG4vKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWdleCA9IC9eXFxzKlxcWyhbXlxcXV0rKVxcXVxccj9cXG4oW1xcc1xcU10qKShcXHI/XFxuKSokL2dpO1xuICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFydHNbaV0pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIHRhZyA9IG1hdGNoWzFdO1xuICAgICAgdmFyIGxpbmVzID0gbWF0Y2hbMl0uc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbGluZXMubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tsXTtcbiAgICAgICAgaWYgKC9eXFxzKjsvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICBjb250aW51ZTsgLy9Ta2lwIGNvbW1lbnRcbiAgICAgICAgfVxuICAgICAgICB2YXIgbSA9IC9eXFxzKihbXjpdKyk6XFxzKiguKikoXFxyP1xcbik/JC8uZXhlYyhsaW5lKTtcbiAgICAgICAgaWYgKG0pIHtcbiAgICAgICAgICBpZiAodGFnID09IFwiU2NyaXB0IEluZm9cIikge1xuICAgICAgICAgICAgaWYgKCFtZXRhKSB7XG4gICAgICAgICAgICAgIG1ldGEgPSB7IH07XG4gICAgICAgICAgICAgIG1ldGEudHlwZSA9IFwibWV0YVwiO1xuICAgICAgICAgICAgICBtZXRhLmRhdGEgPSB7IH07XG4gICAgICAgICAgICAgIGNhcHRpb25zLnB1c2gobWV0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1bMV0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gbVsyXS50cmltKCk7XG4gICAgICAgICAgICBtZXRhLmRhdGFbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGFnID09IFwiVjQgU3R5bGVzXCIgfHwgdGFnID09IFwiVjQrIFN0eWxlc1wiKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1bMV0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gbVsyXS50cmltKCk7XG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkZvcm1hdFwiKSB7XG4gICAgICAgICAgICAgIGNvbHVtbnMgPSB2YWx1ZS5zcGxpdCgvXFxzKixcXHMqL2cpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiU3R5bGVcIikge1xuICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gdmFsdWUuc3BsaXQoL1xccyosXFxzKi9nKTtcbiAgICAgICAgICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICAgICAgICAgIGNhcHRpb24udHlwZSA9IFwic3R5bGVcIjtcbiAgICAgICAgICAgICAgY2FwdGlvbi5kYXRhID0geyB9O1xuICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNvbHVtbnMubGVuZ3RoICYmIGMgPCB2YWx1ZXMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uLmRhdGFbY29sdW1uc1tjXV0gPSB2YWx1ZXNbY107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0YWcgPT0gXCJFdmVudHNcIikge1xuICAgICAgICAgICAgdmFyIG5hbWUgPSBtWzFdLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IG1bMl0udHJpbSgpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJGb3JtYXRcIikge1xuICAgICAgICAgICAgICBjb2x1bW5zID0gdmFsdWUuc3BsaXQoL1xccyosXFxzKi9nKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkRpYWxvZ3VlXCIpIHtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHZhbHVlLnNwbGl0KC9cXHMqLFxccyovZyk7XG4gICAgICAgICAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgICAgICAgICBjYXB0aW9uLnR5cGUgPSBcImNhcHRpb25cIjtcbiAgICAgICAgICAgICAgY2FwdGlvbi5kYXRhID0geyB9O1xuICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IGNvbHVtbnMubGVuZ3RoICYmIGMgPCB2YWx1ZXMubGVuZ3RoOyBjKyspIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uLmRhdGFbY29sdW1uc1tjXV0gPSB2YWx1ZXNbY107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2FwdGlvbi5zdGFydCA9IGhlbHBlci50b01pbGxpc2Vjb25kcyhjYXB0aW9uLmRhdGFbXCJTdGFydFwiXSk7XG4gICAgICAgICAgICAgIGNhcHRpb24uZW5kID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKGNhcHRpb24uZGF0YVtcIkVuZFwiXSk7XG4gICAgICAgICAgICAgIGNhcHRpb24uZHVyYXRpb24gPSBjYXB0aW9uLmVuZCAtIGNhcHRpb24uc3RhcnQ7XG4gICAgICAgICAgICAgIGNhcHRpb24uY29udGVudCA9IGNhcHRpb24uZGF0YVtcIlRleHRcIl07XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAvL1dvcmstYXJvdW5kIGZvciBtaXNzaW5nIHRleHQgKHdoZW4gdGhlIHRleHQgY29udGFpbnMgJywnIGNoYXIpXG4gICAgICAgICAgICAgIGZ1bmN0aW9uIGdldFBvc2l0aW9uKHMsIHNlYXJjaCwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcy5zcGxpdChzZWFyY2gsIGluZGV4KS5qb2luKHNlYXJjaCkubGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBpbmRleE9mVGV4dCA9IGdldFBvc2l0aW9uKHZhbHVlLCAnLCcsIGNvbHVtbnMubGVuZ3RoIC0gMSkgKyAxO1xuICAgICAgICAgICAgICBjYXB0aW9uLmNvbnRlbnQgPSB2YWx1ZS5zdWJzdHIoaW5kZXhPZlRleHQpO1xuICAgICAgICAgICAgICBjYXB0aW9uLmRhdGFbXCJUZXh0XCJdID0gY2FwdGlvbi5jb250ZW50O1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi5jb250ZW50XG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxOL2csIGVvbCkgLy9cIlxcTlwiIGZvciBuZXcgbGluZVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHtbXlxcfV0rXFx9L2csIFwiXCIpOyAvL3tcXHBvcyg0MDAsNTcwKX1cbiAgICAgICAgICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiV0FSTjogVW5rbm93biBwYXJ0XCIsIHBhcnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhcHRpb25zO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGNhcHRpb25zIGluIFN1YlN0YXRpb24gQWxwaGEgZm9ybWF0ICguc3NhKVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICB2YXIgYXNzID0gb3B0aW9ucy5mb3JtYXQgPT0gXCJhc3NcIjtcbiAgXG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgY29udGVudCArPSBcIltTY3JpcHQgSW5mb11cIiArIGVvbDtcbiAgY29udGVudCArPSBcIjsgU2NyaXB0IGdlbmVyYXRlZCBieSBzdWJzcnQgXCIgKyBlb2w7XG4gIGNvbnRlbnQgKz0gXCJTY3JpcHRUeXBlOiB2NC4wMFwiICsgKGFzcyA/IFwiK1wiIDogXCJcIikgKyBlb2w7XG4gIGNvbnRlbnQgKz0gXCJDb2xsaXNpb25zOiBOb3JtYWxcIiArIGVvbDtcbiAgY29udGVudCArPSBlb2w7XG4gIGlmIChhc3MpIHtcbiAgICBjb250ZW50ICs9IFwiW1Y0KyBTdHlsZXNdXCIgKyBlb2w7XG4gICAgY29udGVudCArPSBcIkZvcm1hdDogTmFtZSwgRm9udG5hbWUsIEZvbnRzaXplLCBQcmltYXJ5Q29sb3VyLCBTZWNvbmRhcnlDb2xvdXIsIE91dGxpbmVDb2xvdXIsIEJhY2tDb2xvdXIsIEJvbGQsIEl0YWxpYywgVW5kZXJsaW5lLCBTdHJpa2VPdXQsIFNjYWxlWCwgU2NhbGVZLCBTcGFjaW5nLCBBbmdsZSwgQm9yZGVyU3R5bGUsIE91dGxpbmUsIFNoYWRvdywgQWxpZ25tZW50LCBNYXJnaW5MLCBNYXJnaW5SLCBNYXJnaW5WLCBFbmNvZGluZ1wiICsgZW9sO1xuICAgIGNvbnRlbnQgKz0gXCJTdHlsZTogRGVmYXVsdFZDRCwgQXJpYWwsMjgsJkgwMEI0RkNGQywmSDAwQjRGQ0ZDLCZIMDAwMDAwMDgsJkg4MDAwMDAwOCwtMSwwLDAsMCwxMDAsMTAwLDAuMDAsMC4wMCwxLDEuMDAsMi4wMCwyLDMwLDMwLDMwLDBcIiArIGVvbDtcbiAgfVxuICBlbHNlIHtcbiAgICBjb250ZW50ICs9IFwiW1Y0IFN0eWxlc11cIiArIGVvbDtcbiAgICBjb250ZW50ICs9IFwiRm9ybWF0OiBOYW1lLCBGb250bmFtZSwgRm9udHNpemUsIFByaW1hcnlDb2xvdXIsIFNlY29uZGFyeUNvbG91ciwgVGVydGlhcnlDb2xvdXIsIEJhY2tDb2xvdXIsIEJvbGQsIEl0YWxpYywgQm9yZGVyU3R5bGUsIE91dGxpbmUsIFNoYWRvdywgQWxpZ25tZW50LCBNYXJnaW5MLCBNYXJnaW5SLCBNYXJnaW5WLCBBbHBoYUxldmVsLCBFbmNvZGluZ1wiICsgZW9sO1xuICAgIGNvbnRlbnQgKz0gXCJTdHlsZTogRGVmYXVsdFZDRCwgQXJpYWwsMjgsMTE4NjEyNDQsMTE4NjEyNDQsMTE4NjEyNDQsLTIxNDc0ODM2NDAsLTEsMCwxLDEsMiwyLDMwLDMwLDMwLDAsMFwiICsgZW9sO1xuICB9XG4gIGNvbnRlbnQgKz0gZW9sO1xuICBjb250ZW50ICs9IFwiW0V2ZW50c11cIiArIGVvbDtcbiAgY29udGVudCArPSBcIkZvcm1hdDogXCIgKyAoYXNzID8gXCJMYXllclwiIDogXCJNYXJrZWRcIikgKyBcIiwgU3RhcnQsIEVuZCwgU3R5bGUsIE5hbWUsIE1hcmdpbkwsIE1hcmdpblIsIE1hcmdpblYsIEVmZmVjdCwgVGV4dFwiICsgZW9sO1xuICBcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2FwdGlvbnNbaV07XG4gICAgaWYgKGNhcHRpb24udHlwZSA9PSBcIm1ldGFcIikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgY29udGVudCArPSBcIkRpYWxvZ3VlOiBcIiArIChhc3MgPyBcIjBcIiA6IFwiTWFya2VkPTBcIikgKyBcIixcIiArIGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5zdGFydCkgKyBcIixcIiArIGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5lbmQpICsgXCIsRGVmYXVsdFZDRCwgTlRQLDAwMDAsMDAwMCwwMDAwLCxcIiArIGNhcHRpb24udGV4dC5yZXBsYWNlKC9cXHI/XFxuL2csIFwiXFxcXE5cIikgKyBlb2w7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJTS0lQOlwiLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIHN0cmluZyBjb250ZW50IVwiKTtcbiAgfVxuICBcbiAgaWYgKC9eW1xcc1xcclxcbl0qXFxbU2NyaXB0IEluZm9cXF1cXHI/XFxuL2cudGVzdChjb250ZW50KSAmJiAvW1xcc1xcclxcbl0qXFxbRXZlbnRzXFxdXFxyP1xcbi9nLnRlc3QoY29udGVudCkpIHtcbiAgICAvKlxuICAgIFtTY3JpcHQgSW5mb11cbiAgICAuLi5cbiAgICBbRXZlbnRzXVxuICAgICovXG4gICAgXG4gICAgLy9BZHZhbmNlZCAoVjQrKSBzdHlsZXMgZm9yIEFTUyBmb3JtYXRcbiAgICByZXR1cm4gY29udGVudC5pbmRleE9mKFwiW1Y0KyBTdHlsZXNdXCIpID4gMCA/IFwiYXNzXCIgOiBcInNzYVwiO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogaGVscGVyLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcInN1YlwiO1xudmFyIERFRkFVTFRfRlBTID0gMjU7XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBNaWNyb0RWRCBmb3JtYXQ6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01pY3JvRFZEXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgZnBzID0gb3B0aW9ucy5mcHMgPiAwID8gb3B0aW9ucy5mcHMgOiBERUZBVUxUX0ZQUztcbiAgdmFyIGNhcHRpb25zID0gWyBdO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgdmFyIHBhcnRzID0gY29udGVudC5zcGxpdCgvXFxyP1xcbi9nKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciByZWdleCA9IC9eXFx7KFxcZCspXFx9XFx7KFxcZCspXFx9KC4qKSQvZ2k7XG4gICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyhwYXJ0c1tpXSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICAgIGNhcHRpb24udHlwZSA9IFwiY2FwdGlvblwiO1xuICAgICAgY2FwdGlvbi5pbmRleCA9IGkgKyAxO1xuICAgICAgY2FwdGlvbi5mcmFtZSA9IHtcbiAgICAgICAgc3RhcnQ6IHBhcnNlSW50KG1hdGNoWzFdKSxcbiAgICAgICAgZW5kOiBwYXJzZUludChtYXRjaFsyXSlcbiAgICAgIH07XG4gICAgICBjYXB0aW9uLmZyYW1lLmNvdW50ID0gY2FwdGlvbi5mcmFtZS5lbmQgLSBjYXB0aW9uLmZyYW1lLnN0YXJ0O1xuICAgICAgY2FwdGlvbi5zdGFydCA9IE1hdGgucm91bmQoY2FwdGlvbi5mcmFtZS5zdGFydCAvIGZwcyk7XG4gICAgICBjYXB0aW9uLmVuZCA9IE1hdGgucm91bmQoY2FwdGlvbi5mcmFtZS5lbmQgLyBmcHMpO1xuICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgIHZhciBsaW5lcyA9IG1hdGNoWzNdLnNwbGl0KC9cXHwvZyk7XG4gICAgICBjYXB0aW9uLmNvbnRlbnQgPSBsaW5lcy5qb2luKGVvbCk7XG4gICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLmNvbnRlbnQucmVwbGFjZSgvXFx7W15cXH1dK1xcfS9nLCBcIlwiKTsgLy97MH17MjV9e2M6JDAwMDBmZn17eTpiLHV9e2Y6RGVKYVZ1U2Fuc317czoxMn1IZWxsbyFcbiAgICAgIGNhcHRpb25zLnB1c2goY2FwdGlvbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBVbmtub3duIHBhcnRcIiwgcGFydHNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FwdGlvbnM7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCdWlsZHMgY2FwdGlvbnMgaW4gTWljcm9EVkQgZm9ybWF0OiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9NaWNyb0RWRFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBmcHMgPSBvcHRpb25zLmZwcyA+IDAgPyBvcHRpb25zLmZwcyA6IERFRkFVTFRfRlBTO1xuICBcbiAgdmFyIHN1YiA9IFwiXCI7XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAodHlwZW9mIGNhcHRpb24udHlwZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjYXB0aW9uLnR5cGUgPT0gXCJjYXB0aW9uXCIpIHtcbiAgICAgIHZhciBzdGFydEZyYW1lID0gdHlwZW9mIGNhcHRpb24uZnJhbWUgPT0gXCJvYmplY3RcIiAmJiBjYXB0aW9uLmZyYW1lLnN0YXJ0ID49IDAgPyBjYXB0aW9uLmZyYW1lLnN0YXJ0IDogY2FwdGlvbi5zdGFydCAqIGZwcztcbiAgICAgIHZhciBlbmRGcmFtZSA9IHR5cGVvZiBjYXB0aW9uLmZyYW1lID09IFwib2JqZWN0XCIgJiYgY2FwdGlvbi5mcmFtZS5lbmQgPj0gMCA/IGNhcHRpb24uZnJhbWUuZW5kIDogY2FwdGlvbi5lbmQgKiBmcHM7XG4gICAgICB2YXIgdGV4dCA9IGNhcHRpb24udGV4dC5yZXBsYWNlKC9cXHI/XFxuLywgXCJ8XCIpO1xuICAgICAgc3ViICs9IFwie1wiICsgc3RhcnRGcmFtZSArIFwifVwiICsgXCJ7XCIgKyBlbmRGcmFtZSArIFwifVwiICsgdGV4dCArIGVvbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNLSVA6XCIsIGNhcHRpb24pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHN1Yjtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERldGVjdHMgYSBzdWJ0aXRsZSBmb3JtYXQgZnJvbSB0aGUgY29udGVudC5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBkZXRlY3QoY29udGVudCkge1xuICBpZiAodHlwZW9mIGNvbnRlbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICBpZiAoL15cXHtcXGQrXFx9XFx7XFxkK1xcfSguKikvLnRlc3QoY29udGVudCkpIHtcbiAgICAgIC8qXG4gICAgICB7NzIwN317NzI2Mn1TaXN0ZXIsIHBlcmZ1bWU/XG4gICAgICAqL1xuICAgICAgcmV0dXJuIEZPUk1BVF9OQU1FO1xuICAgIH1cbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRXhwb3J0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IEZPUk1BVF9OQU1FLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcInZ0dFwiO1xuXG52YXIgaGVscGVyID0ge1xuICB0b01pbGxpc2Vjb25kczogZnVuY3Rpb24ocykge1xuICAgIHZhciBtYXRjaCA9IC9eXFxzKihcXGR7MSwyfTopPyhcXGR7MSwyfSk6KFxcZHsxLDJ9KShbLixdKFxcZHsxLDN9KSk/XFxzKiQvLmV4ZWMocyk7XG4gICAgdmFyIGhoID0gbWF0Y2hbMV0gPyBwYXJzZUludChtYXRjaFsxXS5yZXBsYWNlKFwiOlwiLCBcIlwiKSkgOiAwO1xuICAgIHZhciBtbSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICB2YXIgc3MgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgdmFyIGZmID0gbWF0Y2hbNV0gPyBwYXJzZUludChtYXRjaFs1XSkgOiAwO1xuICAgIHZhciBtcyA9IGhoICogMzYwMCAqIDEwMDAgKyBtbSAqIDYwICogMTAwMCArIHNzICogMTAwMCArIGZmO1xuICAgIHJldHVybiBtcztcbiAgfSxcbiAgdG9UaW1lU3RyaW5nOiBmdW5jdGlvbihtcykge1xuICAgIHZhciBoaCA9IE1hdGguZmxvb3IobXMgLyAxMDAwIC8gMzYwMCk7XG4gICAgdmFyIG1tID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyA2MCAlIDYwKTtcbiAgICB2YXIgc3MgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAlIDYwKTtcbiAgICB2YXIgZmYgPSBNYXRoLmZsb29yKG1zICUgMTAwMCk7XG4gICAgdmFyIHRpbWUgPSAoaGggPCAxMCA/IFwiMFwiIDogXCJcIikgKyBoaCArIFwiOlwiICsgKG1tIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgbW0gKyBcIjpcIiArIChzcyA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHNzICsgXCIuXCIgKyAoZmYgPCAxMDAgPyBcIjBcIiA6IFwiXCIpICsgKGZmIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgZmY7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBXZWJWVFQgZm9ybWF0IChXZWIgVmlkZW8gVGV4dCBUcmFja3MgRm9ybWF0KVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHBhcnNlKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgdmFyIGluZGV4ID0gMTtcbiAgdmFyIGNhcHRpb25zID0gWyBdO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgdmFyIHBhcnRzID0gY29udGVudC5zcGxpdCgvXFxyP1xcblxccytcXHI/XFxuLyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAvL1dlYlZUVCBkYXRhXG4gICAgdmFyIHJlZ2V4ID0gL14oW15cXHJcXG5dK1xccj9cXG4pPygoXFxkezEsMn06KT9cXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXHMqXFwtXFwtXFw+XFxzKigoXFxkezEsMn06KT9cXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPylcXHI/XFxuKFtcXHNcXFNdKikoXFxyP1xcbikqJC9naTtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJjYXB0aW9uXCI7XG4gICAgICBjYXB0aW9uLmluZGV4ID0gaW5kZXgrKztcbiAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICBjYXB0aW9uLmN1ZSA9IG1hdGNoWzFdLnJlcGxhY2UoL1tcXHJcXG5dKi9naSwgXCJcIik7XG4gICAgICB9XG4gICAgICBjYXB0aW9uLnN0YXJ0ID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzJdKTtcbiAgICAgIGNhcHRpb24uZW5kID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzVdKTtcbiAgICAgIGNhcHRpb24uZHVyYXRpb24gPSBjYXB0aW9uLmVuZCAtIGNhcHRpb24uc3RhcnQ7XG4gICAgICB2YXIgbGluZXMgPSBtYXRjaFs4XS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgY2FwdGlvbi5jb250ZW50ID0gbGluZXMuam9pbihlb2wpO1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi5jb250ZW50XG4gICAgICAgIC5yZXBsYWNlKC9cXDxbXlxcPl0rXFw+L2csIFwiXCIpIC8vPGI+Ym9sZDwvYj4gb3IgPGk+aXRhbGljPC9pPlxuICAgICAgICAucmVwbGFjZSgvXFx7W15cXH1dK1xcfS9nLCBcIlwiKTsgLy97Yn1ib2xkey9ifSBvciB7aX1pdGFsaWN7L2l9XG4gICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIC8vV2ViVlRUIG1ldGFcbiAgICB2YXIgbWV0YSA9IC9eKFtBLVpdKykoXFxyP1xcbihbXFxzXFxTXSopKT8kLy5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAoIW1ldGEpIHtcbiAgICAgIC8vVHJ5IGlubGluZSBtZXRhXG4gICAgICBtZXRhID0gL14oW0EtWl0rKVxccysoW15cXHJcXG5dKik/JC8uZXhlYyhwYXJ0c1tpXSk7XG4gICAgfVxuICAgIGlmIChtZXRhKSB7XG4gICAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICAgIGNhcHRpb24udHlwZSA9IFwibWV0YVwiO1xuICAgICAgY2FwdGlvbi5uYW1lID0gbWV0YVsxXTtcbiAgICAgIGlmIChtZXRhWzNdKSB7XG4gICAgICAgIGNhcHRpb24uZGF0YSA9IG1ldGFbM107XG4gICAgICB9XG4gICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiV0FSTjogVW5rbm93biBwYXJ0XCIsIHBhcnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhcHRpb25zO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGNhcHRpb25zIGluIFdlYlZUVCBmb3JtYXQgKFdlYiBWaWRlbyBUZXh0IFRyYWNrcyBGb3JtYXQpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gYnVpbGQoY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBjb250ZW50ID0gXCJXRUJWVFRcIiArIGVvbCArIGVvbDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2FwdGlvbnNbaV07XG4gICAgaWYgKGNhcHRpb24udHlwZSA9PSBcIm1ldGFcIikge1xuICAgICAgaWYgKGNhcHRpb24ubmFtZSA9PSBcIldFQlZUVFwiKSBjb250aW51ZTtcbiAgICAgIGNvbnRlbnQgKz0gY2FwdGlvbi5uYW1lICsgZW9sO1xuICAgICAgY29udGVudCArPSBjYXB0aW9uLmRhdGEgPyBjYXB0aW9uLmRhdGEgKyBlb2wgOiBcIlwiO1xuICAgICAgY29udGVudCArPSBlb2w7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICBjb250ZW50ICs9IChpICsgMSkudG9TdHJpbmcoKSArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLnN0YXJ0KSArIFwiIC0tPiBcIiArIGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5lbmQpICsgZW9sO1xuICAgICAgY29udGVudCArPSBjYXB0aW9uLnRleHQgKyBlb2w7XG4gICAgICBjb250ZW50ICs9IGVvbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNLSVA6XCIsIGNhcHRpb24pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgc3RyaW5nIGNvbnRlbnQhXCIpO1xuICB9XG4gIFxuICBpZiAoL15bXFxzXFxyXFxuXSpXRUJWVFRcXHI/XFxuL2cudGVzdChjb250ZW50KSkge1xuICAgIC8qXG4gICAgV0VCVlRUXG4gICAgLi4uXG4gICAgKi9cbiAgICByZXR1cm4gXCJ2dHRcIjtcbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRXhwb3J0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IEZPUk1BVF9OQU1FLFxuICBoZWxwZXI6IGhlbHBlcixcbiAgZGV0ZWN0OiBkZXRlY3QsXG4gIHBhcnNlOiBwYXJzZSxcbiAgYnVpbGQ6IGJ1aWxkXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3Vic3J0ID0ge1xuICBmb3JtYXQ6IHsgfVxufTtcblxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBMb2FkcyB0aGUgc3VidGl0bGUgZm9ybWF0IHBhcnNlcnMgYW5kIGJ1aWxkZXJzXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuKGZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vTG9hZCBpbiB0aGUgcHJlZGVmaW5lZCBvcmRlclxuICB2YXIgZm9ybWF0cyA9IFsgXCJ2dHRcIiwgXCJscmNcIiwgXCJzbWlcIiwgXCJzc2FcIiwgXCJhc3NcIiwgXCJzdWJcIiwgXCJzcnRcIiwgXCJzYnZcIiwgXCJqc29uXCIgXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3JtYXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGYgPSBmb3JtYXRzW2ldO1xuICAgIHZhciBoYW5kbGVyID0gcmVxdWlyZSgnLi9mb3JtYXQvJyArIGYgKyAnLmpzJyk7XG4gICAgc3Vic3J0LmZvcm1hdFtoYW5kbGVyLm5hbWVdID0gaGFuZGxlcjtcbiAgfVxufSkoKTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogR2V0cyBhIGxpc3Qgb2Ygc3VwcG9ydGVkIHN1YnRpdGxlIGZvcm1hdHMuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuc3Vic3J0Lmxpc3QgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHN1YnNydC5mb3JtYXQpO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnN1YnNydC5kZXRlY3QgPSBmdW5jdGlvbihjb250ZW50KSB7XG4gIHZhciBmb3JtYXRzID0gc3Vic3J0Lmxpc3QoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmb3JtYXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGYgPSBmb3JtYXRzW2ldO1xuICAgIHZhciBoYW5kbGVyID0gc3Vic3J0LmZvcm1hdFtmXTtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgaGFuZGxlci5kZXRlY3QgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy9GdW5jdGlvbiAnZGV0ZWN0JyBjYW4gcmV0dXJuIHRydWUgb3IgZm9ybWF0IG5hbWVcbiAgICB2YXIgZCA9IGhhbmRsZXIuZGV0ZWN0KGNvbnRlbnQpO1xuICAgIGlmIChkID09PSB0cnVlKSB7IC8vTG9naWNhbCB0cnVlXG4gICAgICByZXR1cm4gZjtcbiAgICB9XG4gICAgaWYgKGYgPT0gZCkgeyAvL0Zvcm1hdCBuYW1lXG4gICAgICByZXR1cm4gZDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBhIHN1YnRpdGxlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuc3Vic3J0LnBhcnNlID0gZnVuY3Rpb24oY29udGVudCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7IH07XG4gIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBzdWJzcnQuZGV0ZWN0KGNvbnRlbnQpO1xuICBpZiAoIWZvcm1hdCB8fCBmb3JtYXQudHJpbSgpLmxlbmd0aCA9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGRldGVybWluZSBzdWJ0aXRsZSBmb3JtYXQhXCIpO1xuICB9XG4gIFxuICB2YXIgaGFuZGxlciA9IHN1YnNydC5mb3JtYXRbZm9ybWF0XTtcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBzdWJ0aXRsZSBmb3JtYXQ6IFwiICsgZm9ybWF0KTtcbiAgfVxuICBcbiAgdmFyIGZ1bmMgPSBoYW5kbGVyLnBhcnNlO1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3VidGl0bGUgZm9ybWF0IGRvZXMgbm90IHN1cHBvcnQgJ3BhcnNlJyBvcDogXCIgKyBmb3JtYXQpO1xuICB9XG4gIFxuICByZXR1cm4gZnVuYyhjb250ZW50LCBvcHRpb25zKTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBhIHN1YnRpdGxlIGNvbnRlbnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zdWJzcnQuYnVpbGQgPSBmdW5jdGlvbihjYXB0aW9ucywgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7IH07XG4gIHZhciBmb3JtYXQgPSBvcHRpb25zLmZvcm1hdCB8fCBcInNydFwiO1xuICBpZiAoIWZvcm1hdCB8fCBmb3JtYXQudHJpbSgpLmxlbmd0aCA9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGRldGVybWluZSBzdWJ0aXRsZSBmb3JtYXQhXCIpO1xuICB9XG4gIFxuICB2YXIgaGFuZGxlciA9IHN1YnNydC5mb3JtYXRbZm9ybWF0XTtcbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbnN1cHBvcnRlZCBzdWJ0aXRsZSBmb3JtYXQ6IFwiICsgZm9ybWF0KTtcbiAgfVxuICBcbiAgdmFyIGZ1bmMgPSBoYW5kbGVyLmJ1aWxkO1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiU3VidGl0bGUgZm9ybWF0IGRvZXMgbm90IHN1cHBvcnQgJ2J1aWxkJyBvcDogXCIgKyBmb3JtYXQpO1xuICB9XG4gIFxuICByZXR1cm4gZnVuYyhjYXB0aW9ucywgb3B0aW9ucyk7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBDb252ZXJ0cyBzdWJ0aXRsZSBmb3JtYXRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zdWJzcnQuY29udmVydCA9IGZ1bmN0aW9uKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09IFwic3RyaW5nXCIpIHtcbiAgICBvcHRpb25zID0geyB0bzogb3B0aW9ucyB9O1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHsgfTtcbiAgXG4gIHZhciBvcHQgPSBjbG9uZShvcHRpb25zKTtcbiAgZGVsZXRlIG9wdC5mb3JtYXQ7XG4gIFxuICBpZiAob3B0LmZyb20pIHtcbiAgICBvcHQuZm9ybWF0ID0gb3B0LmZyb207XG4gIH1cbiAgXG4gIHZhciBjYXB0aW9ucyA9IHN1YnNydC5wYXJzZShjb250ZW50LCBvcHQpO1xuICBpZiAob3B0LnJlc3luYykge1xuICAgIGNhcHRpb25zID0gc3Vic3J0LnJlc3luYyhjYXB0aW9ucywgb3B0LnJlc3luYyk7XG4gIH1cbiAgXG4gIG9wdC5mb3JtYXQgPSBvcHQudG8gfHwgb3B0aW9ucy5mb3JtYXQ7XG4gIHZhciByZXN1bHQgPSBzdWJzcnQuYnVpbGQoY2FwdGlvbnMsIG9wdCk7XG4gIFxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogU2hpZnRzIHRoZSB0aW1lIG9mIHRoZSBjYXB0aW9ucy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zdWJzcnQucmVzeW5jID0gZnVuY3Rpb24oY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgeyB9O1xuICBcbiAgdmFyIGZ1bmMsIHJhdGlvLCBmcmFtZSwgb2Zmc2V0O1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZnVuYyA9IG9wdGlvbnM7IC8vVXNlcidzIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aW1lIHNoaWZ0XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJudW1iZXJcIikge1xuICAgIG9mZnNldCA9IG9wdGlvbnM7IC8vVGltZSBzaGlmdCAoKy8tIG9mZnNldClcbiAgICBmdW5jID0gZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIFsgYVswXSArIG9mZnNldCwgYVsxXSArIG9mZnNldCBdO1xuICAgIH07XG4gIH1cbiAgZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJvYmplY3RcIikge1xuICAgIG9mZnNldCA9IChvcHRpb25zLm9mZnNldCB8fCAwKSAqIChvcHRpb25zLmZyYW1lID8gb3B0aW9ucy5mcHMgfHwgMjUgOiAxKTtcbiAgICByYXRpbyA9IG9wdGlvbnMucmF0aW8gfHwgMS4wO1xuICAgIGZyYW1lID0gb3B0aW9ucy5mcmFtZTtcbiAgICBmdW5jID0gZnVuY3Rpb24oYSkge1xuICAgICAgcmV0dXJuIFsgTWF0aC5yb3VuZChhWzBdICogcmF0aW8gKyBvZmZzZXQpLCBNYXRoLnJvdW5kKGFbMV0gKiByYXRpbyArIG9mZnNldCkgXTtcbiAgICB9O1xuICB9XG4gIGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkFyZ3VtZW50ICdvcHRpb25zJyBub3QgZGVmaW5lZCFcIik7XG4gIH1cbiAgXG4gIHZhciByZXN5bmNlZCA9IFsgXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2xvbmUoY2FwdGlvbnNbaV0pO1xuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgIHZhciBzaGlmdCA9IGZ1bmMoWyBjYXB0aW9uLmZyYW1lLnN0YXJ0LCBjYXB0aW9uLmZyYW1lLmVuZCBdKTtcbiAgICAgICAgaWYgKHNoaWZ0ICYmIHNoaWZ0Lmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgY2FwdGlvbi5mcmFtZS5zdGFydCA9IHNoaWZ0WzBdO1xuICAgICAgICAgIGNhcHRpb24uZnJhbWUuZW5kID0gc2hpZnRbMV07XG4gICAgICAgICAgY2FwdGlvbi5mcmFtZS5jb3VudCA9IGNhcHRpb24uZnJhbWUuZW5kIC0gY2FwdGlvbi5mcmFtZS5zdGFydDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBzaGlmdCA9IGZ1bmMoWyBjYXB0aW9uLnN0YXJ0LCBjYXB0aW9uLmVuZCBdKTtcbiAgICAgICAgaWYgKHNoaWZ0ICYmIHNoaWZ0Lmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgY2FwdGlvbi5zdGFydCA9IHNoaWZ0WzBdO1xuICAgICAgICAgIGNhcHRpb24uZW5kID0gc2hpZnRbMV07XG4gICAgICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXN5bmNlZC5wdXNoKGNhcHRpb24pO1xuICB9XG4gIFxuICByZXR1cm4gcmVzeW5jZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1YnNydDsiLCJjb25zdCBtdXN0YWNoZSA9IHJlcXVpcmUoJ211c3RhY2hlJylcbmNvbnN0IEVwaXNvZGUgPSByZXF1aXJlKCcuL2VwaXNvZGUnKVxuXG5jb25zdCB0b2tlblVSTCA9ICdodHRwczovL3d3dy5jcnVuY2h5cm9sbC5jb20vYXV0aC92MS90b2tlbidcbmNvbnN0IHNpZ25hdHVyZVVSTCA9ICdodHRwczovL3d3dy5jcnVuY2h5cm9sbC5jb20vaW5kZXgvdjInXG5jb25zdCBxdWVyeVBhcmFtcyA9ICc/U2lnbmF0dXJlPXt7c2lnbmF0dXJlfX0mUG9saWN5PXt7cG9saWN5fX0mS2V5LVBhaXItSWQ9e3trZXlQYWlySUR9fSdcbmNvbnN0IG1ldGFkYXRhVVJMVGVtcGxhdGUgPSBgaHR0cHM6Ly93d3cuY3J1bmNoeXJvbGwuY29tL2Ntcy92Mnt7e2Ntc0J1Y2tldH19fS9vYmplY3RzL3t7dmlkZW9JRH19JHtxdWVyeVBhcmFtc31gXG5jb25zdCBzdHJlYW1zVVJMVGVtcGxhdGUgPSBgaHR0cHM6Ly93d3cuY3J1bmNoeXJvbGwuY29tL2Ntcy92Mnt7e2Ntc0J1Y2tldH19fS92aWRlb3Mve3t2aWRlb0lEfX0vc3RyZWFtcyR7cXVlcnlQYXJhbXN9YFxuXG5jb25zdCB2aWRlb0lEUmVnZXggPSAvaHR0cHM/OlxcL1xcLyguKlxcLik/Y3J1bmNoeXJvbGxcXC5jb21cXC8oXFxTK1xcLyk/d2F0Y2hcXC8oW2EtekEtWjAtOV9dKykoXFwvLiopPy9cblxuY29uc3QgZGVmYXVsdENNU1R5cGUgPSAnY21zJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIE5ld0VwaXNvZGUgZXh0ZW5kcyBFcGlzb2RlIHtcbiAgYXN5bmMgZmV0Y2hNZXRhZGF0YVVSTCAoeyB2aWRlb0lELCBrZXlQYWlySUQsIHBvbGljeSwgc2lnbmF0dXJlLCBjbXNCdWNrZXQgfSwgdGVtcGxhdGVzID0gW21ldGFkYXRhVVJMVGVtcGxhdGVdKSB7XG4gICAgY29uc3QgeyBheGlvcyB9ID0gdGhpc1xuICAgIGZvciAoY29uc3QgdXJsVGVtcGxhdGUgb2YgdGVtcGxhdGVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtZXRhZGF0YVVSTCA9IG11c3RhY2hlLnJlbmRlcih1cmxUZW1wbGF0ZSwge1xuICAgICAgICAgIGNtc0J1Y2tldCxcbiAgICAgICAgICB2aWRlb0lELFxuICAgICAgICAgIGtleVBhaXJJRCxcbiAgICAgICAgICBwb2xpY3ksXG4gICAgICAgICAgc2lnbmF0dXJlXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KG1ldGFkYXRhVVJMKVxuICAgICAgICByZXR1cm4gcmVzcG9uc2VcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggZGF0YSBmcm9tIGFsbCBtZXRhZGF0YSBVUkxzJylcbiAgfVxuXG4gIGFzeW5jIGZldGNoU3RyZWFtc1VSTCAoaHJlZiwgeyB2aWRlb0lELCBrZXlQYWlySUQsIHBvbGljeSwgc2lnbmF0dXJlLCBjbXNCdWNrZXQgfSwgdGVtcGxhdGVzID0gW3N0cmVhbXNVUkxUZW1wbGF0ZV0pIHtcbiAgICBjb25zdCB7IGF4aW9zIH0gPSB0aGlzXG4gICAgZm9yIChjb25zdCBzdHJlYW1zVVJMVGVtcGxhdGUgb2YgdGVtcGxhdGVzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBzdHJlYW1zVVJMID0gbXVzdGFjaGUucmVuZGVyKHN0cmVhbXNVUkxUZW1wbGF0ZSwge1xuICAgICAgICAgIGNtc0J1Y2tldCxcbiAgICAgICAgICB2aWRlb0lELFxuICAgICAgICAgIGtleVBhaXJJRCxcbiAgICAgICAgICBwb2xpY3ksXG4gICAgICAgICAgc2lnbmF0dXJlXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHN0cmVhbXNVUkwpXG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBkYXRhIGZyb20gYWxsIHN0cmVhbXMgVVJMcycpXG4gIH1cblxuICBhc3luYyBnZXRBY2Nlc3NUb2tlbiAoKSB7XG4gICAgY29uc3QgeyBheGlvcywgYmFzaWNBdXRoIH0gPSB0aGlzXG4gICAgLy8gV2UgbmVlZCB0byB0cnkgdHdvIGdyYW50IHR5cGVzXG4gICAgY29uc3QgZ3JhbnRUeXBlcyA9IFsnZXRwX3J0X2Nvb2tpZScsICdjbGllbnRfaWQnXVxuICAgIGZvciAoY29uc3QgZ3JhbnRUeXBlIG9mIGdyYW50VHlwZXMpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuICAgICAgcGFyYW1zLnNldCgnZ3JhbnRfdHlwZScsIGdyYW50VHlwZSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdCh0b2tlblVSTCwgcGFyYW1zLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWNBdXRofWAsXG4gICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCB7IGRhdGE6IHsgYWNjZXNzX3Rva2VuOiBhY2Nlc3NUb2tlbiB9IH0gPSByZXNwb25zZVxuICAgICAgICByZXR1cm4gYWNjZXNzVG9rZW5cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZ2V0IGFjY2VzcyB0b2tlbicpXG4gIH1cblxuICBhc3luYyBwYXJzZSAoKSB7XG4gICAgY29uc3QgeyBheGlvcyB9ID0gdGhpc1xuICAgIGxldCByZXNwb25zZVxuICAgIGlmICghdGhpcy5iYXNpY0F1dGgpIHtcbiAgICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHRoaXMudXJsKVxuICAgICAgLy8gR2V0IGNvbmZpZ1xuICAgICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGFcbiAgICAgIGNvbnN0IHsgYmFzaWNBdXRoIH0gPSBhd2FpdCB0aGlzLmdldENvbmZpZ0ZvclBhcnNlKGRhdGEpXG4gICAgICB0aGlzLmJhc2ljQXV0aCA9IGJhc2ljQXV0aFxuICAgIH1cbiAgICBjb25zdCBhY2Nlc3NUb2tlbiA9IGF3YWl0IHRoaXMuZ2V0QWNjZXNzVG9rZW4oKVxuICAgIHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHNpZ25hdHVyZVVSTCwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YWNjZXNzVG9rZW59YFxuICAgICAgfVxuICAgIH0pXG4gICAgY29uc3QgY21zVHlwZSA9IHRoaXMuY21zVHlwZSB8fCBkZWZhdWx0Q01TVHlwZVxuICAgIGNvbnN0IHsgZGF0YTogeyBbY21zVHlwZV06IHsgYnVja2V0OiBjbXNCdWNrZXQsIGtleV9wYWlyX2lkOiBrZXlQYWlySUQsIHBvbGljeSwgc2lnbmF0dXJlIH0gfSB9ID0gcmVzcG9uc2VcbiAgICB0aGlzLmtleVBhaXJJRCA9IGtleVBhaXJJRFxuICAgIHRoaXMucG9saWN5ID0gcG9saWN5XG4gICAgdGhpcy5zaWduYXR1cmUgPSBzaWduYXR1cmVcblxuICAgIC8vIEdldCBjb25maWdcbiAgICBjb25zdCBtYXRjaCA9IHZpZGVvSURSZWdleC5leGVjKHRoaXMudXJsKVxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIG1hdGNoIHZpZGVvSUQgcmVnZXggdG8gdXJsJylcbiAgICAgIGVyci5kYXRhID0geyB1cmw6IHRoaXMudXJsLCBjbXNCdWNrZXQgfVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICAgIGNvbnN0IHZpZGVvSUQgPSBtYXRjaFszXVxuICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaE1ldGFkYXRhVVJMKHsgdmlkZW9JRCwga2V5UGFpcklELCBwb2xpY3ksIHNpZ25hdHVyZSwgY21zQnVja2V0IH0sIFttZXRhZGF0YVVSTFRlbXBsYXRlXSlcbiAgICBjb25zdCB7IGRhdGE6IHsgaXRlbXM6IFtvYmplY3RNZXRhZGF0YV0gfSB9ID0gcmVzcG9uc2VcbiAgICBjb25zdCB7IGVwaXNvZGVfbWV0YWRhdGE6IG1ldGFkYXRhIH0gPSBvYmplY3RNZXRhZGF0YVxuICAgIHRoaXMub2JqZWN0TWV0YWRhdGEgPSBvYmplY3RNZXRhZGF0YVxuICAgIHRoaXMubWV0YWRhdGEgPSBtZXRhZGF0YVxuICAgIC8vIENvbnZlcnQgdGhpcyB0byBiZSBpbiB0aGUgc2FtZSBmb3JtYXQgYXMgdGhlIG9sZGVyIGNvbmZpZyBzbyB3ZSBnZXQgc29tZSBwYXJzaW5nIGZvciBmcmVlXG4gICAgbWV0YWRhdGEudGl0bGUgPSB0aGlzLm9iamVjdE1ldGFkYXRhLnRpdGxlXG4gICAgdGhpcy5zZXJpZXNUaXRsZSA9IG1ldGFkYXRhLnNlcmllc190aXRsZVxuICAgIHRoaXMuc2Vhc29uSW5kZXggPSBtZXRhZGF0YS5zZWFzb25fbnVtYmVyXG5cbiAgICB0aGlzLmNvbmZpZyA9IHsgbWV0YWRhdGEgfVxuICAgIC8vIFBvc3RlclxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGltYWdlczogeyB0aHVtYm5haWw6IFt0aHVtYm5haWxzXSB9IH0gPSBvYmplY3RNZXRhZGF0YVxuICAgICAgdGhpcy5jb25maWcudGh1bWJuYWlsID0geyB1cmw6IHRodW1ibmFpbHNbdGh1bWJuYWlscy5sZW5ndGggLSAxXS5zb3VyY2UgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRoaXMuY29uZmlnLnRodW1ibmFpbCA9IHsgdXJsOiAnJyB9XG4gICAgfVxuICAgIGxldCBzdHJlYW1zSHJlZlxuICAgIGNvbnN0IHN0cmVhbXNUZW1wbGF0ZXMgPSBbc3RyZWFtc1VSTFRlbXBsYXRlXVxuICAgIHRyeSB7XG4gICAgICA7KHsgX19saW5rc19fOiB7IHN0cmVhbXM6IHsgaHJlZjogc3RyZWFtc0hyZWYgfSB9IH0gPSBvYmplY3RNZXRhZGF0YSlcbiAgICAgIGlmIChzdHJlYW1zSHJlZikge1xuICAgICAgICBjb25zdCBhbHRUZW1wbGF0ZSA9IGAke25ldyBVUkwoc3RyZWFtc1VSTFRlbXBsYXRlKS5vcmlnaW59JHtzdHJlYW1zSHJlZn0ke3F1ZXJ5UGFyYW1zfWBcbiAgICAgICAgc3RyZWFtc1RlbXBsYXRlcy51bnNoaWZ0KGFsdFRlbXBsYXRlKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICB9XG4gICAgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoU3RyZWFtc1VSTChzdHJlYW1zSHJlZiwgeyB2aWRlb0lELCBrZXlQYWlySUQsIHBvbGljeSwgc2lnbmF0dXJlLCBjbXNCdWNrZXQgfSwgc3RyZWFtc1RlbXBsYXRlcylcbiAgICBjb25zdCB7IGRhdGE6IHsgc3RyZWFtczogc3RyZWFtc1Jhdywgc3VidGl0bGVzOiBzdWJ0aXRsZXNSYXcgfSB9ID0gcmVzcG9uc2VcbiAgICAvLyBXZSdyZSBnb2luZyB0byBoYXZlIHRvIGNvbnZlcnQgdGhpcyBzdHJlYW1zIG9iamVjdCB0byB0aGUgb2xkIGZvcm1hdFxuICAgIGNvbnN0IHN0cmVhbXMgPSBbXVxuICAgIGZvciAoY29uc3QgW3R5cGUsIGRhdGFdIG9mIE9iamVjdC5lbnRyaWVzKHN0cmVhbXNSYXcpKSB7XG4gICAgICBmb3IgKGNvbnN0IFtsb2NhbGUsIGVudHJ5XSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgICBjb25zdCBzdHJlYW0gPSB7fVxuICAgICAgICBzdHJlYW0uZm9ybWF0ID0gdHlwZVxuICAgICAgICBzdHJlYW0uYXVkaW9fbGFuZyA9IGxvY2FsZSB8fCAnZGVmYXVsdCdcbiAgICAgICAgc3RyZWFtLmhhcmRzdWJfbGFuZyA9IGVudHJ5LmhhcmRzdWJfbG9jYWxlXG4gICAgICAgIHN0cmVhbS51cmwgPSBlbnRyeS51cmxcbiAgICAgICAgc3RyZWFtcy5wdXNoKHN0cmVhbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzdWJ0aXRsZXMgPSBbXVxuICAgIGZvciAoY29uc3QgZGF0YSBvZiBPYmplY3QudmFsdWVzKHN1YnRpdGxlc1JhdykpIHtcbiAgICAgIGNvbnN0IHsgbG9jYWxlLCBmb3JtYXQsIHVybCB9ID0gZGF0YVxuICAgICAgbGV0IGxhbmd1YWdlXG4gICAgICBsZXQgY291bnRyeVxuICAgICAgbGV0IHRpdGxlXG4gICAgICB0cnkge1xuICAgICAgICAoeyBsYW5ndWFnZSwgY291bnRyeSB9ID0gdGhpcy5nZXRMYW5ndWFnZUFuZENvdW50cnkobG9jYWxlKSlcbiAgICAgICAgdGl0bGUgPSBgJHtsYW5ndWFnZX0gKCR7Y291bnRyeX0pYFxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBsYW5ndWFnZSA9IGxvY2FsZSA/IGxvY2FsZS5zdWJzdHJpbmcoMCwgMikgOiAnLS0nXG4gICAgICAgIGNvdW50cnkgPSAnJ1xuICAgICAgICB0aXRsZSA9ICdVbmtub3duJ1xuICAgICAgfVxuICAgICAgY29uc3Qgc3VidGl0bGUgPSB7XG4gICAgICAgIHVybCxcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGxhbmd1YWdlLFxuICAgICAgICBjb3VudHJ5LFxuICAgICAgICBmb3JtYXQsXG4gICAgICAgIGtpbmQ6ICdjYXB0aW9ucydcbiAgICAgIH1cbiAgICAgIHN1YnRpdGxlcy5wdXNoKHN1YnRpdGxlKVxuICAgIH1cblxuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jb25maWcsIHtcbiAgICAgIHN0cmVhbXMsXG4gICAgICBzdWJ0aXRsZXNcbiAgICB9KVxuICAgIGF3YWl0IHRoaXMucHJvY2Vzc01ldGFkYXRhKClcbiAgfVxuXG4gIGFzeW5jIGlzUHJlbWl1bVZpZGVvICgpIHtcbiAgICBpZiAoIXRoaXMubWV0YWRhdGEpIHtcbiAgICAgIGF3YWl0IHRoaXMucGFyc2UoKVxuICAgIH1cbiAgICBjb25zdCB7IG1ldGFkYXRhOiB7IGlzX3ByZW1pdW1fb25seTogaXNQcmVtaXVtVmlkZW8gfSB9ID0gdGhpc1xuICAgIHJldHVybiAhIWlzUHJlbWl1bVZpZGVvXG4gIH1cblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJhc2ljQXV0aFxuICBhc3luYyBnZXRDb25maWdGb3JQYXJzZSAoZGF0YSkge1xuICAgIC8vIFRoaXMgZGF0YSBjb250YWlucyB0aGUgYWNjb3VudEF1dGhDbGllbnRJZCBwYXJhbWV0ZXIgdGhhdCB3ZSBuZWVkXG4gICAgY29uc3QgcmVnZXggPSAvXCJhY2NvdW50QXV0aENsaWVudElkXCI6XFxzKlwiKC4qPylcIi9nXG4gICAgY29uc3QgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdEaWQgbm90IGZpbmQgZXhwZWN0ZWQgcGF0dGVybicpXG4gICAgfVxuICAgIGNvbnN0IGlkID0gbWF0Y2hbMV1cbiAgICBjb25zdCBiYXNpY0F1dGggPSBidG9hKGAke2lkfTpgKSAvLyBUaGlzIGlzIHRoZSBmb3JtYXQgdGhleSB1c2UuLmZvciBzb21lIHJlYXNvblxuICAgIHJldHVybiB7IGJhc2ljQXV0aCB9XG4gIH1cbn1cbiIsImNvbnN0IEF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuXG5jb25zdCBTdWJ0aXRsZSA9IHJlcXVpcmUoJy4vc3VidGl0bGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEVwaXNvZGUge1xuICBjb25zdHJ1Y3RvciAodXJsLCBwYXJhbWV0ZXJzLCBheGlvcyA9IEF4aW9zKSB7XG4gICAgdGhpcy51cmwgPSB1cmxcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHBhcmFtZXRlcnMpXG4gICAgdGhpcy5heGlvcyA9IGF4aW9zXG4gIH1cblxuICBhc3luYyBwYXJzZSAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmltcGxlbWVudGVkJylcbiAgfVxuXG4gIGdldExhbmd1YWdlQW5kQ291bnRyeSAoaW5wdXQpIHtcbiAgICBjb25zdCBjb3VudHJ5TWFwID0ge1xuICAgICAgQlI6ICdCcmFzaWwnLFxuICAgICAgREU6ICdHZXJtYW55JyxcbiAgICAgIEVTOiAnRXNwYcOxYScsXG4gICAgICBGUjogJ0ZyYW5jZScsXG4gICAgICBJVDogJ0l0YWx5JyxcbiAgICAgIEpQOiAnSmFwYW4nLFxuICAgICAgTEE6ICdBbcOpcmljYSBMYXRpbmEnLFxuICAgICAgVUs6ICdVbml0ZWQgS2luZ2RvbScsXG4gICAgICBVUzogJ0FtZXJpY2EnXG4gICAgfVxuICAgIGNvbnN0IGxhbmd1YWdlTWFwID0ge1xuICAgICAgZW46ICdFbmdsaXNoJyxcbiAgICAgIGRlOiAnRGV1dHNjaCcsXG4gICAgICBlczogJ0VzcGHDsW9sJyxcbiAgICAgIGl0OiAnSXRhbGlhbm8nLFxuICAgICAgamE6ICfml6XmnKzoqp4nLFxuICAgICAgZnI6ICdGcmFuw6dhaXMnLFxuICAgICAgcHQ6ICdQb3J0dWd1w6pzJyxcbiAgICAgIGFyOiAn2KfZhNi52LHYqNmK2KknLFxuICAgICAgcnU6ICfQoNGD0YHRgdC60LjQuScsXG4gICAgICBrcjogJ+2VnOq1reyWtCdcbiAgICB9XG5cbiAgICAvLyBJZiBpbnB1dCBoYXMgYSAtLCBnZXQgcmlkIG9mIGl0XG4gICAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC8tL2csICcnKVxuICAgIGNvbnN0IGxhbmcgPSBpbnB1dC5zdWJzdHJpbmcoMCwgMikudG9Mb3dlckNhc2UoKVxuICAgIGNvbnN0IGN0cnkgPSBpbnB1dC5zdWJzdHJpbmcoMiwgNCkudG9VcHBlckNhc2UoKVxuXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSBsYW5ndWFnZU1hcFtsYW5nXVxuICAgIGNvbnN0IGNvdW50cnkgPSBjb3VudHJ5TWFwW2N0cnldXG4gICAgcmV0dXJuIHsgbGFuZ3VhZ2UsIGNvdW50cnkgfVxuICB9XG5cbiAgZ2V0U3RyZWFtc0J5TGFudWFnZSAoYXVkaW9MYW5nLCBoYXJkc3ViTGFuZykge1xuICAgIGNvbnN0IHsgY29uZmlnOiB7IHN0cmVhbXMgfSB9ID0gdGhpc1xuICAgIHJldHVybiBzdHJlYW1zLmZpbHRlcihzdHJlYW0gPT4gc3RyZWFtLmF1ZGlvX2xhbmcgPT09IGF1ZGlvTGFuZyAmJiBzdHJlYW0uaGFyZHN1Yl9sYW5nID09PSBoYXJkc3ViTGFuZylcbiAgfVxuXG4gIGFzeW5jIGdldFN1YnRpdGxlcyAoKSB7XG4gICAgY29uc3QgeyBheGlvcyB9ID0gdGhpc1xuICAgIGNvbnN0IHsgY29uZmlnOiB7IHN1YnRpdGxlczogc3VidGl0bGVNZXRhZGF0YSB9IH0gPSB0aGlzXG4gICAgdGhpcy5zdWJ0aXRsZXMgPSBbXVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHN1YnRpdGxlTWV0YWRhdGEubWFwKGFzeW5jICh7IGxhbmd1YWdlLCB1cmwsIHRpdGxlLCBmb3JtYXQgfSkgPT4ge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodXJsKVxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KVxuICAgICAgfVxuICAgICAgY29uc3QgeyBkYXRhOiBhc3MgfSA9IHJlc3BvbnNlXG4gICAgICB0aGlzLnN1YnRpdGxlcy5wdXNoKG5ldyBTdWJ0aXRsZSh0aXRsZSwgbGFuZ3VhZ2Uuc3Vic3RyKDAsIDIpLCBhc3MpKVxuICAgIH0pKVxuICB9XG5cbiAgYXN5bmMgcHJvY2Vzc01ldGFkYXRhICgpIHtcbiAgICBjb25zdCB7IGNvbmZpZyB9ID0gdGhpc1xuICAgIGNvbnN0IHsgbWV0YWRhdGEsIHN0cmVhbXMgfSA9IGNvbmZpZ1xuICAgIHRoaXMuZXBpc29kZVRpdGxlID0gbWV0YWRhdGEudGl0bGVcbiAgICB0aGlzLmVwaXNvZGVOdW1iZXIgPSBOdW1iZXIobWV0YWRhdGEuZXBpc29kZV9udW1iZXIpXG4gICAgdGhpcy5wb3N0ZXIgPSBjb25maWcudGh1bWJuYWlsLnVybFxuICAgIHN0cmVhbXMuZm9yRWFjaChzdHJlYW0gPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHN0cmVhbS5hdWRpb19sYW5nKSB7XG4gICAgICAgICAgY29uc3QgeyBsYW5ndWFnZSwgY291bnRyeSB9ID0gdGhpcy5nZXRMYW5ndWFnZUFuZENvdW50cnkoc3RyZWFtLmF1ZGlvX2xhbmcpXG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihzdHJlYW0sIHtcbiAgICAgICAgICAgIGF1ZGlvOiB7XG4gICAgICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgICAgICBjb3VudHJ5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBsYW5ndWFnZSwgY291bnRyeSB9ID0gdGhpcy5nZXRMYW5ndWFnZUFuZENvdW50cnkoc3RyZWFtLmhhcmRzdWJfbGFuZylcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzdHJlYW0sIHtcbiAgICAgICAgICBoYXJkc3ViOiB7XG4gICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgIGNvdW50cnlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfSwgdGhpcylcbiAgfVxufVxuIiwiY29uc3QgQXhpb3MgPSByZXF1aXJlKCdheGlvcycpXG5jb25zdCBFcGlzb2RlID0gcmVxdWlyZSgnLi9lcGlzb2RlJylcbmNvbnN0IEJldGFFcGlzb2RlID0gcmVxdWlyZSgnLi9iZXRhJylcbmNvbnN0IFN1YnRpdGxlID0gcmVxdWlyZSgnLi9zdWJ0aXRsZScpXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEVwaXNvZGUgKHVybCwgY29uZmlnLCBheGlvcyA9IEF4aW9zKSB7XG4gIC8qKiBAdHlwZSB7RXBpc29kZX0gKi9cbiAgY29uc3QgZXBpc29kZSA9IG5ldyBCZXRhRXBpc29kZSh1cmwsIGNvbmZpZywgYXhpb3MpXG4gIGF3YWl0IGVwaXNvZGUucGFyc2UoKVxuICByZXR1cm4gZXBpc29kZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmV0YUVwaXNvZGUsXG4gIEVwaXNvZGUsXG4gIFN1YnRpdGxlLFxuICBnZXRFcGlzb2RlXG59XG4iLCJjb25zdCBzdWJzcnQgPSByZXF1aXJlKCdzdWJzcnQnKVxuXG5jb25zdCBvbGRWVFQgPSBzdWJzcnQuZm9ybWF0LnZ0dFxuc3Vic3J0LmZvcm1hdC52dHQgPSB7XG4gIG5hbWU6ICd2dHQnLFxuICBwYXJzZTogb2xkVlRULnBhcnNlLFxuICBidWlsZCAoY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgICBmdW5jdGlvbiByZXBsYWNlIChlbnRyeSwgZm4pIHtcbiAgICAgIGVudHJ5LmRhdGEuVGV4dCA9IGZuKGVudHJ5LmRhdGEuVGV4dClcbiAgICAgIGVudHJ5LnRleHQgPSBmbihlbnRyeS50ZXh0KVxuICAgIH1cbiAgICAvLyBNYWtlIGEgY29weSBhbmQgcmVtb3ZlIG1ldGEgc2luY2UgdGhlcmUncyBhbiBpc3N1ZSB3aXRoIHN1YnNydCBub3RcbiAgICAvLyBkaXNwbGF5aW5nIGl0IHByb3Blcmx5LlxuICAgIGNvbnN0IGZpeGVkQ2FwdGlvbnMgPSBbLi4uY2FwdGlvbnNdLmZpbHRlcih4ID0+IHgudHlwZSAhPT0gJ21ldGEnKVxuICAgIC8vIEFsc28sIHRyaW0gdGhlIHRleHQgd2hpbGUgd2UncmUgYXQgaXQgdG8gZW5zdXJlIHRoZXJlJ3Mgbm8gbmV3bGluZVxuICAgIC8vIGF0IHRoZSBzdGFydCBhbmQgcmVwbGFjZSAmIGFuZCA8IHNpbmNlIHRoZXNlIGNoYXJhY3RlcnMgYXJlIG5vdCBhbGxvd2VkXG4gICAgLy8gYXMgcGFydCBvZiBXZWJWVFQgc3BlY1xuICAgIGZpeGVkQ2FwdGlvbnMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICBpZiAoZW50cnkudHlwZSAhPT0gJ2NhcHRpb24nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmVwbGFjZShlbnRyeSwgcyA9PiBzLnRyaW0oKS5yZXBsYWNlKCdcXFxcTicsICcnKS5yZXBsYWNlKCdcXFxcUicsICcnKS5yZXBsYWNlKCcmJywgJyZhbXA7JykucmVwbGFjZSgnPCcsICcmbHQ7JykpXG4gICAgfSlcblxuICAgIGxldCBjb250ZW50ID0gb2xkVlRULmJ1aWxkKGZpeGVkQ2FwdGlvbnMsIG9wdGlvbnMpXG4gICAgY29udGVudCA9IGNvbnRlbnQucmVwbGFjZSgvKC4qKSAtLT4gKC4qKS9nLCAobWF0Y2gsIHAxLCBwMikgPT4ge1xuICAgICAgcmV0dXJuIGAke3AxLnJlcGxhY2UoLywvLCAnLicpfSAtLT4gJHtwMi5yZXBsYWNlKC8sLywgJy4nKX1gXG4gICAgfSlcbiAgICByZXR1cm4gY29udGVudFxuICB9LFxuICBkZXRlY3Q6IG9sZFZUVC5kZXRlY3Rcbn1cblxuY2xhc3MgU3VidGl0bGUge1xuICBjb25zdHJ1Y3RvciAobGFiZWwsIGxhbmd1YWdlLCBjb250ZW50KSB7XG4gICAgdGhpcy5sYWJlbCA9IGxhYmVsXG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmd1YWdlXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jYXB0aW9ucyA9IHN1YnNydC5wYXJzZShjb250ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhcHRpb25zID0gY29udGVudFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZXRlY3QgKGNvbnRlbnQpIHtcbiAgICByZXR1cm4gc3Vic3J0LmRldGVjdChjb250ZW50KVxuICB9XG5cbiAgYnVpbGQgKGZvcm1hdCkge1xuICAgIHJldHVybiBzdWJzcnQuYnVpbGQodGhpcy5jYXB0aW9ucywgeyBmb3JtYXQgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN1YnRpdGxlXG4iXSwic291cmNlUm9vdCI6IiJ9