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

const tokenURL = 'https://beta-api.crunchyroll.com/auth/v1/token'
const signatureURL = 'https://beta-api.crunchyroll.com/index/v2'
const queryParams = '?Signature={{signature}}&Policy={{policy}}&Key-Pair-Id={{keyPairID}}'
const metadataURLTemplate = `https://beta-api.crunchyroll.com/cms/v2{{{cmsBucket}}}/objects/{{videoID}}${queryParams}`
const streamsURLTemplate = `https://beta-api.crunchyroll.com/cms/v2{{{cmsBucket}}}/videos/{{videoID}}/streams${queryParams}`

const videoIDRegex = /https?:\/\/(.*\.)?crunchyroll\.com\/(\S+\/)?watch\/([a-zA-Z0-9_]+)(\/.*)?/

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

  async parse () {
    const { axios, basicAuth } = this
    let response
    // First get signature, policy and keyPairID
    const params = new URLSearchParams()
    params.set('grant_type', 'etp_rt_cookie')
    response = await axios.post(tokenURL, params, {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'content-type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    const { data: { access_token: accessToken } } = response
    response = await axios.get(signatureURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const { data: { cms: { bucket: cmsBucket, key_pair_id: keyPairID, policy, signature } } } = response
    this.keyPairID = keyPairID
    this.policy = policy
    this.signature = signature

    // Get config
    const match = videoIDRegex.exec(this.url)
    if (!match) {
      const err = new Error('Failed to match videoID regex to url')
      err.data = { url: this.url }
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
const OldEpisode = __webpack_require__(/*! ./old */ "./src/old.js")
const Subtitle = __webpack_require__(/*! ./subtitle */ "./src/subtitle.js")

async function getEpisode (url, config, axios = Axios) {
  /** @type {Episode} */
  let episode
  if (url.includes('beta.crunchyroll')) {
    episode = new BetaEpisode(url, config, axios)
  } else {
    episode = new OldEpisode(url, config, axios)
  }
  await episode.parse()
  return episode
}

module.exports = {
  BetaEpisode,
  OldEpisode,
  Episode,
  Subtitle,
  getEpisode
}


/***/ }),

/***/ "./src/old.js":
/*!********************!*\
  !*** ./src/old.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const Episode = __webpack_require__(/*! ./episode */ "./src/episode.js")

module.exports = class OldEpisode extends Episode {
  async parse () {
    const { axios } = this
    const response = await axios.get(this.url)
    // Get config
    const data = response.data
    await this.parseConfig(data)
    await this.getSubtitles()
  }

  async isPremiumVideo () {
    const { axios } = this
    const response = await axios.get(this.url)
    const { data } = response
    const pattern = /<script type="application\/ld\+json">\s*(\{.*?\})\s*<\/script>/mg
    const match = pattern.exec(data)
    if (match) {
      const metadataStr = match[1]
      const metadata = JSON.parse(metadataStr)
      const { potentialAction = {} } = metadata
      const { actionAccessibilityRequirement = {} } = potentialAction
      const { category = 'nologinrequired', requiresSubscription = [] } = actionAccessibilityRequirement
      return category !== 'nologinrequired' && requiresSubscription.length > 0
    }
    return false
  }

  async parseConfig (data) {
    let regex = /vilos\.config\.media\s*=\s*(\{.*\})/m
    let match = regex.exec(data)
    if (!match) {
      throw new Error('Failed to find config')
    }
    const config = JSON.parse(match[1])

    // We need to get seriesTitle separately
    regex = /vilos\.config\.analytics\s*=\s*(\{.*\})/m
    match = regex.exec(data)
    if (match) {
      try {
        const analytics = JSON.parse(match[1])
        this.seriesTitle = analytics.media_reporting_parent.title
      } catch (e) {
      }
    }

    this.config = config
    await this.processMetadata()
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9tdXN0YWNoZS9tdXN0YWNoZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQgc3luYyBeXFwuXFwvLipcXC5qcyQiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvYXNzLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L2pzb24uanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvbHJjLmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3Nidi5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zbWkuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvc3J0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3NzYS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zdWIuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvdnR0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvc3Vic3J0LmpzIiwid2VicGFjazovL0NydW5jaHlyb2xsLy4vc3JjL2JldGEuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9zcmMvZXBpc29kZS5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9DcnVuY2h5cm9sbC8uL3NyYy9vbGQuanMiLCJ3ZWJwYWNrOi8vQ3J1bmNoeXJvbGwvLi9zcmMvc3VidGl0bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFB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TztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0UsV0FBVyxVQUFVLFNBQVMsS0FBSyxvQkFBb0I7QUFDekg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsZUFBZTtBQUM3RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpREFBaUQsaUJBQWlCO0FBQ2xFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDcHdCRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRjs7Ozs7Ozs7Ozs7O0FDOUJhOztBQUViOztBQUVBO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLHlEQUFVOztBQUU1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FD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b0MsRUFBRTtBQUNuRCxhQUFhLDBEQUEwRDtBQUN2RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyxJQUFJO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsSUFBSTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25EQSxlQUFlLG1CQUFPLENBQUMsbURBQVE7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGLHFCQUFxQjtBQUNqSCxLQUFLOztBQUVMO0FBQ0E7QUFDQSxnQkFBZ0IscUJBQXFCLE9BQU8scUJBQXFCO0FBQ2pFLEtBQUs7QUFDTDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLFNBQVM7QUFDakQ7QUFDQTs7QUFFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDcnVuY2h5cm9sbFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJDcnVuY2h5cm9sbFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkID8gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGNvbmZpZy5hdXRoLnBhc3N3b3JkKSkgOiAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICghcmVxdWVzdERhdGEpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgLy8gU2V0IGNvbmZpZy5tZXRob2RcbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IChjb25maWcgfHwge30pLmRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QobWVyZ2VDb25maWcoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknLCAncGFyYW1zJ107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFtcbiAgICAnYmFzZVVSTCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLFxuICAgICd0aW1lb3V0JywgJ3RpbWVvdXRNZXNzYWdlJywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ2RlY29tcHJlc3MnLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJywgJ21heEJvZHlMZW5ndGgnLCAnbWF4UmVkaXJlY3RzJywgJ3RyYW5zcG9ydCcsICdodHRwQWdlbnQnLFxuICAgICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnLCAncmVzcG9uc2VFbmNvZGluZydcbiAgXTtcbiAgdmFyIGRpcmVjdE1lcmdlS2V5cyA9IFsndmFsaWRhdGVTdGF0dXMnXTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgdXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2UodGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMltwcm9wXSk7XG4gICAgfVxuICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBtZXJnZURlZXBQcm9wZXJ0aWVzKTtcblxuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzFbcHJvcF0pO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChkaXJlY3RNZXJnZUtleXMsIGZ1bmN0aW9uIG1lcmdlKHByb3ApIHtcbiAgICBpZiAocHJvcCBpbiBjb25maWcyKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH0pO1xuXG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5c1xuICAgIC5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpXG4gICAgLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cylcbiAgICAuY29uY2F0KGRpcmVjdE1lcmdlS2V5cyk7XG5cbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdFxuICAgIC5rZXlzKGNvbmZpZzEpXG4gICAgLmNvbmNhdChPYmplY3Qua2V5cyhjb25maWcyKSlcbiAgICAuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgICB9KTtcblxuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgbWVyZ2VEZWVwUHJvcGVydGllcyk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBwYXlsb2FkIGlzIGFuIGVycm9yIHRocm93biBieSBBeGlvcywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBeGlvc0Vycm9yKHBheWxvYWQpIHtcbiAgcmV0dXJuICh0eXBlb2YgcGF5bG9hZCA9PT0gJ29iamVjdCcpICYmIChwYXlsb2FkLmlzQXhpb3NFcnJvciA9PT0gdHJ1ZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWwpIHtcbiAgaWYgKHRvU3RyaW5nLmNhbGwodmFsKSAhPT0gJ1tvYmplY3QgT2JqZWN0XScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgcHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiBwcm90b3R5cGUgPT09IG51bGwgfHwgcHJvdG90eXBlID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdDogaXNQbGFpbk9iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltLFxuICBzdHJpcEJPTTogc3RyaXBCT01cbn07XG4iLCIvLyBUaGlzIGZpbGUgaGFzIGJlZW4gZ2VuZXJhdGVkIGZyb20gbXVzdGFjaGUubWpzXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLk11c3RhY2hlID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qIVxuICAgKiBtdXN0YWNoZS5qcyAtIExvZ2ljLWxlc3Mge3ttdXN0YWNoZX19IHRlbXBsYXRlcyB3aXRoIEphdmFTY3JpcHRcbiAgICogaHR0cDovL2dpdGh1Yi5jb20vamFubC9tdXN0YWNoZS5qc1xuICAgKi9cblxuICB2YXIgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheVBvbHlmaWxsIChvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRnVuY3Rpb24gKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnZnVuY3Rpb24nO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vcmUgY29ycmVjdCB0eXBlb2Ygc3RyaW5nIGhhbmRsaW5nIGFycmF5XG4gICAqIHdoaWNoIG5vcm1hbGx5IHJldHVybnMgdHlwZW9mICdvYmplY3QnXG4gICAqL1xuICBmdW5jdGlvbiB0eXBlU3RyIChvYmopIHtcbiAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ2FycmF5JyA6IHR5cGVvZiBvYmo7XG4gIH1cblxuICBmdW5jdGlvbiBlc2NhcGVSZWdFeHAgKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcLVxcW1xcXXt9KCkqKz8uLFxcXFxcXF4kfCNcXHNdL2csICdcXFxcJCYnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBOdWxsIHNhZmUgd2F5IG9mIGNoZWNraW5nIHdoZXRoZXIgb3Igbm90IGFuIG9iamVjdCxcbiAgICogaW5jbHVkaW5nIGl0cyBwcm90b3R5cGUsIGhhcyBhIGdpdmVuIHByb3BlcnR5XG4gICAqL1xuICBmdW5jdGlvbiBoYXNQcm9wZXJ0eSAob2JqLCBwcm9wTmFtZSkge1xuICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAocHJvcE5hbWUgaW4gb2JqKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYWZlIHdheSBvZiBkZXRlY3Rpbmcgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIHRoaW5nIGlzIGEgcHJpbWl0aXZlIGFuZFxuICAgKiB3aGV0aGVyIGl0IGhhcyB0aGUgZ2l2ZW4gcHJvcGVydHlcbiAgICovXG4gIGZ1bmN0aW9uIHByaW1pdGl2ZUhhc093blByb3BlcnR5IChwcmltaXRpdmUsIHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHByaW1pdGl2ZSAhPSBudWxsXG4gICAgICAmJiB0eXBlb2YgcHJpbWl0aXZlICE9PSAnb2JqZWN0J1xuICAgICAgJiYgcHJpbWl0aXZlLmhhc093blByb3BlcnR5XG4gICAgICAmJiBwcmltaXRpdmUuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpXG4gICAgKTtcbiAgfVxuXG4gIC8vIFdvcmthcm91bmQgZm9yIGh0dHBzOi8vaXNzdWVzLmFwYWNoZS5vcmcvamlyYS9icm93c2UvQ09VQ0hEQi01NzdcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8xODlcbiAgdmFyIHJlZ0V4cFRlc3QgPSBSZWdFeHAucHJvdG90eXBlLnRlc3Q7XG4gIGZ1bmN0aW9uIHRlc3RSZWdFeHAgKHJlLCBzdHJpbmcpIHtcbiAgICByZXR1cm4gcmVnRXhwVGVzdC5jYWxsKHJlLCBzdHJpbmcpO1xuICB9XG5cbiAgdmFyIG5vblNwYWNlUmUgPSAvXFxTLztcbiAgZnVuY3Rpb24gaXNXaGl0ZXNwYWNlIChzdHJpbmcpIHtcbiAgICByZXR1cm4gIXRlc3RSZWdFeHAobm9uU3BhY2VSZSwgc3RyaW5nKTtcbiAgfVxuXG4gIHZhciBlbnRpdHlNYXAgPSB7XG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnLFxuICAgICdcIic6ICcmcXVvdDsnLFxuICAgIFwiJ1wiOiAnJiMzOTsnLFxuICAgICcvJzogJyYjeDJGOycsXG4gICAgJ2AnOiAnJiN4NjA7JyxcbiAgICAnPSc6ICcmI3gzRDsnXG4gIH07XG5cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbCAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1smPD5cIidgPVxcL10vZywgZnVuY3Rpb24gZnJvbUVudGl0eU1hcCAocykge1xuICAgICAgcmV0dXJuIGVudGl0eU1hcFtzXTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciB3aGl0ZVJlID0gL1xccyovO1xuICB2YXIgc3BhY2VSZSA9IC9cXHMrLztcbiAgdmFyIGVxdWFsc1JlID0gL1xccyo9LztcbiAgdmFyIGN1cmx5UmUgPSAvXFxzKlxcfS87XG4gIHZhciB0YWdSZSA9IC8jfFxcXnxcXC98PnxcXHt8Jnw9fCEvO1xuXG4gIC8qKlxuICAgKiBCcmVha3MgdXAgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgc3RyaW5nIGludG8gYSB0cmVlIG9mIHRva2Vucy4gSWYgdGhlIGB0YWdzYFxuICAgKiBhcmd1bWVudCBpcyBnaXZlbiBoZXJlIGl0IG11c3QgYmUgYW4gYXJyYXkgd2l0aCB0d28gc3RyaW5nIHZhbHVlczogdGhlXG4gICAqIG9wZW5pbmcgYW5kIGNsb3NpbmcgdGFncyB1c2VkIGluIHRoZSB0ZW1wbGF0ZSAoZS5nLiBbIFwiPCVcIiwgXCIlPlwiIF0pLiBPZlxuICAgKiBjb3Vyc2UsIHRoZSBkZWZhdWx0IGlzIHRvIHVzZSBtdXN0YWNoZXMgKGkuZS4gbXVzdGFjaGUudGFncykuXG4gICAqXG4gICAqIEEgdG9rZW4gaXMgYW4gYXJyYXkgd2l0aCBhdCBsZWFzdCA0IGVsZW1lbnRzLiBUaGUgZmlyc3QgZWxlbWVudCBpcyB0aGVcbiAgICogbXVzdGFjaGUgc3ltYm9sIHRoYXQgd2FzIHVzZWQgaW5zaWRlIHRoZSB0YWcsIGUuZy4gXCIjXCIgb3IgXCImXCIuIElmIHRoZSB0YWdcbiAgICogZGlkIG5vdCBjb250YWluIGEgc3ltYm9sIChpLmUuIHt7bXlWYWx1ZX19KSB0aGlzIGVsZW1lbnQgaXMgXCJuYW1lXCIuIEZvclxuICAgKiBhbGwgdGV4dCB0aGF0IGFwcGVhcnMgb3V0c2lkZSBhIHN5bWJvbCB0aGlzIGVsZW1lbnQgaXMgXCJ0ZXh0XCIuXG4gICAqXG4gICAqIFRoZSBzZWNvbmQgZWxlbWVudCBvZiBhIHRva2VuIGlzIGl0cyBcInZhbHVlXCIuIEZvciBtdXN0YWNoZSB0YWdzIHRoaXMgaXNcbiAgICogd2hhdGV2ZXIgZWxzZSB3YXMgaW5zaWRlIHRoZSB0YWcgYmVzaWRlcyB0aGUgb3BlbmluZyBzeW1ib2wuIEZvciB0ZXh0IHRva2Vuc1xuICAgKiB0aGlzIGlzIHRoZSB0ZXh0IGl0c2VsZi5cbiAgICpcbiAgICogVGhlIHRoaXJkIGFuZCBmb3VydGggZWxlbWVudHMgb2YgdGhlIHRva2VuIGFyZSB0aGUgc3RhcnQgYW5kIGVuZCBpbmRpY2VzLFxuICAgKiByZXNwZWN0aXZlbHksIG9mIHRoZSB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUuXG4gICAqXG4gICAqIFRva2VucyB0aGF0IGFyZSB0aGUgcm9vdCBub2RlIG9mIGEgc3VidHJlZSBjb250YWluIHR3byBtb3JlIGVsZW1lbnRzOiAxKSBhblxuICAgKiBhcnJheSBvZiB0b2tlbnMgaW4gdGhlIHN1YnRyZWUgYW5kIDIpIHRoZSBpbmRleCBpbiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgYXRcbiAgICogd2hpY2ggdGhlIGNsb3NpbmcgdGFnIGZvciB0aGF0IHNlY3Rpb24gYmVnaW5zLlxuICAgKlxuICAgKiBUb2tlbnMgZm9yIHBhcnRpYWxzIGFsc28gY29udGFpbiB0d28gbW9yZSBlbGVtZW50czogMSkgYSBzdHJpbmcgdmFsdWUgb2ZcbiAgICogaW5kZW5kYXRpb24gcHJpb3IgdG8gdGhhdCB0YWcgYW5kIDIpIHRoZSBpbmRleCBvZiB0aGF0IHRhZyBvbiB0aGF0IGxpbmUgLVxuICAgKiBlZyBhIHZhbHVlIG9mIDIgaW5kaWNhdGVzIHRoZSBwYXJ0aWFsIGlzIHRoZSB0aGlyZCB0YWcgb24gdGhpcyBsaW5lLlxuICAgKi9cbiAgZnVuY3Rpb24gcGFyc2VUZW1wbGF0ZSAodGVtcGxhdGUsIHRhZ3MpIHtcbiAgICBpZiAoIXRlbXBsYXRlKVxuICAgICAgcmV0dXJuIFtdO1xuICAgIHZhciBsaW5lSGFzTm9uU3BhY2UgPSBmYWxzZTtcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTsgICAgIC8vIFN0YWNrIHRvIGhvbGQgc2VjdGlvbiB0b2tlbnNcbiAgICB2YXIgdG9rZW5zID0gW107ICAgICAgIC8vIEJ1ZmZlciB0byBob2xkIHRoZSB0b2tlbnNcbiAgICB2YXIgc3BhY2VzID0gW107ICAgICAgIC8vIEluZGljZXMgb2Ygd2hpdGVzcGFjZSB0b2tlbnMgb24gdGhlIGN1cnJlbnQgbGluZVxuICAgIHZhciBoYXNUYWcgPSBmYWxzZTsgICAgLy8gSXMgdGhlcmUgYSB7e3RhZ319IG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIG5vblNwYWNlID0gZmFsc2U7ICAvLyBJcyB0aGVyZSBhIG5vbi1zcGFjZSBjaGFyIG9uIHRoZSBjdXJyZW50IGxpbmU/XG4gICAgdmFyIGluZGVudGF0aW9uID0gJyc7ICAvLyBUcmFja3MgaW5kZW50YXRpb24gZm9yIHRhZ3MgdGhhdCB1c2UgaXRcbiAgICB2YXIgdGFnSW5kZXggPSAwOyAgICAgIC8vIFN0b3JlcyBhIGNvdW50IG9mIG51bWJlciBvZiB0YWdzIGVuY291bnRlcmVkIG9uIGEgbGluZVxuXG4gICAgLy8gU3RyaXBzIGFsbCB3aGl0ZXNwYWNlIHRva2VucyBhcnJheSBmb3IgdGhlIGN1cnJlbnQgbGluZVxuICAgIC8vIGlmIHRoZXJlIHdhcyBhIHt7I3RhZ319IG9uIGl0IGFuZCBvdGhlcndpc2Ugb25seSBzcGFjZS5cbiAgICBmdW5jdGlvbiBzdHJpcFNwYWNlICgpIHtcbiAgICAgIGlmIChoYXNUYWcgJiYgIW5vblNwYWNlKSB7XG4gICAgICAgIHdoaWxlIChzcGFjZXMubGVuZ3RoKVxuICAgICAgICAgIGRlbGV0ZSB0b2tlbnNbc3BhY2VzLnBvcCgpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNwYWNlcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBoYXNUYWcgPSBmYWxzZTtcbiAgICAgIG5vblNwYWNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wZW5pbmdUYWdSZSwgY2xvc2luZ1RhZ1JlLCBjbG9zaW5nQ3VybHlSZTtcbiAgICBmdW5jdGlvbiBjb21waWxlVGFncyAodGFnc1RvQ29tcGlsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0YWdzVG9Db21waWxlID09PSAnc3RyaW5nJylcbiAgICAgICAgdGFnc1RvQ29tcGlsZSA9IHRhZ3NUb0NvbXBpbGUuc3BsaXQoc3BhY2VSZSwgMik7XG5cbiAgICAgIGlmICghaXNBcnJheSh0YWdzVG9Db21waWxlKSB8fCB0YWdzVG9Db21waWxlLmxlbmd0aCAhPT0gMilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHRhZ3M6ICcgKyB0YWdzVG9Db21waWxlKTtcblxuICAgICAgb3BlbmluZ1RhZ1JlID0gbmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAodGFnc1RvQ29tcGlsZVswXSkgKyAnXFxcXHMqJyk7XG4gICAgICBjbG9zaW5nVGFnUmUgPSBuZXcgUmVnRXhwKCdcXFxccyonICsgZXNjYXBlUmVnRXhwKHRhZ3NUb0NvbXBpbGVbMV0pKTtcbiAgICAgIGNsb3NpbmdDdXJseVJlID0gbmV3IFJlZ0V4cCgnXFxcXHMqJyArIGVzY2FwZVJlZ0V4cCgnfScgKyB0YWdzVG9Db21waWxlWzFdKSk7XG4gICAgfVxuXG4gICAgY29tcGlsZVRhZ3ModGFncyB8fCBtdXN0YWNoZS50YWdzKTtcblxuICAgIHZhciBzY2FubmVyID0gbmV3IFNjYW5uZXIodGVtcGxhdGUpO1xuXG4gICAgdmFyIHN0YXJ0LCB0eXBlLCB2YWx1ZSwgY2hyLCB0b2tlbiwgb3BlblNlY3Rpb247XG4gICAgd2hpbGUgKCFzY2FubmVyLmVvcygpKSB7XG4gICAgICBzdGFydCA9IHNjYW5uZXIucG9zO1xuXG4gICAgICAvLyBNYXRjaCBhbnkgdGV4dCBiZXR3ZWVuIHRhZ3MuXG4gICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKG9wZW5pbmdUYWdSZSk7XG5cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgdmFsdWVMZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGkgPCB2YWx1ZUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2hyID0gdmFsdWUuY2hhckF0KGkpO1xuXG4gICAgICAgICAgaWYgKGlzV2hpdGVzcGFjZShjaHIpKSB7XG4gICAgICAgICAgICBzcGFjZXMucHVzaCh0b2tlbnMubGVuZ3RoKTtcbiAgICAgICAgICAgIGluZGVudGF0aW9uICs9IGNocjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9uU3BhY2UgPSB0cnVlO1xuICAgICAgICAgICAgbGluZUhhc05vblNwYWNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGluZGVudGF0aW9uICs9ICcgJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0b2tlbnMucHVzaChbICd0ZXh0JywgY2hyLCBzdGFydCwgc3RhcnQgKyAxIF0pO1xuICAgICAgICAgIHN0YXJ0ICs9IDE7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3Igd2hpdGVzcGFjZSBvbiB0aGUgY3VycmVudCBsaW5lLlxuICAgICAgICAgIGlmIChjaHIgPT09ICdcXG4nKSB7XG4gICAgICAgICAgICBzdHJpcFNwYWNlKCk7XG4gICAgICAgICAgICBpbmRlbnRhdGlvbiA9ICcnO1xuICAgICAgICAgICAgdGFnSW5kZXggPSAwO1xuICAgICAgICAgICAgbGluZUhhc05vblNwYWNlID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIE1hdGNoIHRoZSBvcGVuaW5nIHRhZy5cbiAgICAgIGlmICghc2Nhbm5lci5zY2FuKG9wZW5pbmdUYWdSZSkpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBoYXNUYWcgPSB0cnVlO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB0eXBlLlxuICAgICAgdHlwZSA9IHNjYW5uZXIuc2Nhbih0YWdSZSkgfHwgJ25hbWUnO1xuICAgICAgc2Nhbm5lci5zY2FuKHdoaXRlUmUpO1xuXG4gICAgICAvLyBHZXQgdGhlIHRhZyB2YWx1ZS5cbiAgICAgIGlmICh0eXBlID09PSAnPScpIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhbihlcXVhbHNSZSk7XG4gICAgICAgIHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdUYWdSZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICB2YWx1ZSA9IHNjYW5uZXIuc2NhblVudGlsKGNsb3NpbmdDdXJseVJlKTtcbiAgICAgICAgc2Nhbm5lci5zY2FuKGN1cmx5UmUpO1xuICAgICAgICBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgICB0eXBlID0gJyYnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWUgPSBzY2FubmVyLnNjYW5VbnRpbChjbG9zaW5nVGFnUmUpO1xuICAgICAgfVxuXG4gICAgICAvLyBNYXRjaCB0aGUgY2xvc2luZyB0YWcuXG4gICAgICBpZiAoIXNjYW5uZXIuc2NhbihjbG9zaW5nVGFnUmUpKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuY2xvc2VkIHRhZyBhdCAnICsgc2Nhbm5lci5wb3MpO1xuXG4gICAgICBpZiAodHlwZSA9PSAnPicpIHtcbiAgICAgICAgdG9rZW4gPSBbIHR5cGUsIHZhbHVlLCBzdGFydCwgc2Nhbm5lci5wb3MsIGluZGVudGF0aW9uLCB0YWdJbmRleCwgbGluZUhhc05vblNwYWNlIF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2tlbiA9IFsgdHlwZSwgdmFsdWUsIHN0YXJ0LCBzY2FubmVyLnBvcyBdO1xuICAgICAgfVxuICAgICAgdGFnSW5kZXgrKztcbiAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHR5cGUgPT09ICcjJyB8fCB0eXBlID09PSAnXicpIHtcbiAgICAgICAgc2VjdGlvbnMucHVzaCh0b2tlbik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICcvJykge1xuICAgICAgICAvLyBDaGVjayBzZWN0aW9uIG5lc3RpbmcuXG4gICAgICAgIG9wZW5TZWN0aW9uID0gc2VjdGlvbnMucG9wKCk7XG5cbiAgICAgICAgaWYgKCFvcGVuU2VjdGlvbilcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vub3BlbmVkIHNlY3Rpb24gXCInICsgdmFsdWUgKyAnXCIgYXQgJyArIHN0YXJ0KTtcblxuICAgICAgICBpZiAob3BlblNlY3Rpb25bMV0gIT09IHZhbHVlKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5jbG9zZWQgc2VjdGlvbiBcIicgKyBvcGVuU2VjdGlvblsxXSArICdcIiBhdCAnICsgc3RhcnQpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnbmFtZScgfHwgdHlwZSA9PT0gJ3snIHx8IHR5cGUgPT09ICcmJykge1xuICAgICAgICBub25TcGFjZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICc9Jykge1xuICAgICAgICAvLyBTZXQgdGhlIHRhZ3MgZm9yIHRoZSBuZXh0IHRpbWUgYXJvdW5kLlxuICAgICAgICBjb21waWxlVGFncyh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RyaXBTcGFjZSgpO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZXJlIGFyZSBubyBvcGVuIHNlY3Rpb25zIHdoZW4gd2UncmUgZG9uZS5cbiAgICBvcGVuU2VjdGlvbiA9IHNlY3Rpb25zLnBvcCgpO1xuXG4gICAgaWYgKG9wZW5TZWN0aW9uKVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmNsb3NlZCBzZWN0aW9uIFwiJyArIG9wZW5TZWN0aW9uWzFdICsgJ1wiIGF0ICcgKyBzY2FubmVyLnBvcyk7XG5cbiAgICByZXR1cm4gbmVzdFRva2VucyhzcXVhc2hUb2tlbnModG9rZW5zKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tYmluZXMgdGhlIHZhbHVlcyBvZiBjb25zZWN1dGl2ZSB0ZXh0IHRva2VucyBpbiB0aGUgZ2l2ZW4gYHRva2Vuc2AgYXJyYXlcbiAgICogdG8gYSBzaW5nbGUgdG9rZW4uXG4gICAqL1xuICBmdW5jdGlvbiBzcXVhc2hUb2tlbnMgKHRva2Vucykge1xuICAgIHZhciBzcXVhc2hlZFRva2VucyA9IFtdO1xuXG4gICAgdmFyIHRva2VuLCBsYXN0VG9rZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG51bVRva2VucyA9IHRva2Vucy5sZW5ndGg7IGkgPCBudW1Ub2tlbnM7ICsraSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd0ZXh0JyAmJiBsYXN0VG9rZW4gJiYgbGFzdFRva2VuWzBdID09PSAndGV4dCcpIHtcbiAgICAgICAgICBsYXN0VG9rZW5bMV0gKz0gdG9rZW5bMV07XG4gICAgICAgICAgbGFzdFRva2VuWzNdID0gdG9rZW5bM107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3F1YXNoZWRUb2tlbnMucHVzaCh0b2tlbik7XG4gICAgICAgICAgbGFzdFRva2VuID0gdG9rZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3F1YXNoZWRUb2tlbnM7XG4gIH1cblxuICAvKipcbiAgICogRm9ybXMgdGhlIGdpdmVuIGFycmF5IG9mIGB0b2tlbnNgIGludG8gYSBuZXN0ZWQgdHJlZSBzdHJ1Y3R1cmUgd2hlcmVcbiAgICogdG9rZW5zIHRoYXQgcmVwcmVzZW50IGEgc2VjdGlvbiBoYXZlIHR3byBhZGRpdGlvbmFsIGl0ZW1zOiAxKSBhbiBhcnJheSBvZlxuICAgKiBhbGwgdG9rZW5zIHRoYXQgYXBwZWFyIGluIHRoYXQgc2VjdGlvbiBhbmQgMikgdGhlIGluZGV4IGluIHRoZSBvcmlnaW5hbFxuICAgKiB0ZW1wbGF0ZSB0aGF0IHJlcHJlc2VudHMgdGhlIGVuZCBvZiB0aGF0IHNlY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBuZXN0VG9rZW5zICh0b2tlbnMpIHtcbiAgICB2YXIgbmVzdGVkVG9rZW5zID0gW107XG4gICAgdmFyIGNvbGxlY3RvciA9IG5lc3RlZFRva2VucztcbiAgICB2YXIgc2VjdGlvbnMgPSBbXTtcblxuICAgIHZhciB0b2tlbiwgc2VjdGlvbjtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgICAgc3dpdGNoICh0b2tlblswXSkge1xuICAgICAgICBjYXNlICcjJzpcbiAgICAgICAgY2FzZSAnXic6XG4gICAgICAgICAgY29sbGVjdG9yLnB1c2godG9rZW4pO1xuICAgICAgICAgIHNlY3Rpb25zLnB1c2godG9rZW4pO1xuICAgICAgICAgIGNvbGxlY3RvciA9IHRva2VuWzRdID0gW107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgIHNlY3Rpb24gPSBzZWN0aW9ucy5wb3AoKTtcbiAgICAgICAgICBzZWN0aW9uWzVdID0gdG9rZW5bMl07XG4gICAgICAgICAgY29sbGVjdG9yID0gc2VjdGlvbnMubGVuZ3RoID4gMCA/IHNlY3Rpb25zW3NlY3Rpb25zLmxlbmd0aCAtIDFdWzRdIDogbmVzdGVkVG9rZW5zO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoKHRva2VuKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmVzdGVkVG9rZW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgc2ltcGxlIHN0cmluZyBzY2FubmVyIHRoYXQgaXMgdXNlZCBieSB0aGUgdGVtcGxhdGUgcGFyc2VyIHRvIGZpbmRcbiAgICogdG9rZW5zIGluIHRlbXBsYXRlIHN0cmluZ3MuXG4gICAqL1xuICBmdW5jdGlvbiBTY2FubmVyIChzdHJpbmcpIHtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhaWwgPSBzdHJpbmc7XG4gICAgdGhpcy5wb3MgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB0YWlsIGlzIGVtcHR5IChlbmQgb2Ygc3RyaW5nKS5cbiAgICovXG4gIFNjYW5uZXIucHJvdG90eXBlLmVvcyA9IGZ1bmN0aW9uIGVvcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFpbCA9PT0gJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyaWVzIHRvIG1hdGNoIHRoZSBnaXZlbiByZWd1bGFyIGV4cHJlc3Npb24gYXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqIFJldHVybnMgdGhlIG1hdGNoZWQgdGV4dCBpZiBpdCBjYW4gbWF0Y2gsIHRoZSBlbXB0eSBzdHJpbmcgb3RoZXJ3aXNlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIHNjYW4gKHJlKSB7XG4gICAgdmFyIG1hdGNoID0gdGhpcy50YWlsLm1hdGNoKHJlKTtcblxuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2guaW5kZXggIT09IDApXG4gICAgICByZXR1cm4gJyc7XG5cbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hbMF07XG5cbiAgICB0aGlzLnRhaWwgPSB0aGlzLnRhaWwuc3Vic3RyaW5nKHN0cmluZy5sZW5ndGgpO1xuICAgIHRoaXMucG9zICs9IHN0cmluZy5sZW5ndGg7XG5cbiAgICByZXR1cm4gc3RyaW5nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTa2lwcyBhbGwgdGV4dCB1bnRpbCB0aGUgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uIGNhbiBiZSBtYXRjaGVkLiBSZXR1cm5zXG4gICAqIHRoZSBza2lwcGVkIHN0cmluZywgd2hpY2ggaXMgdGhlIGVudGlyZSB0YWlsIGlmIG5vIG1hdGNoIGNhbiBiZSBtYWRlLlxuICAgKi9cbiAgU2Nhbm5lci5wcm90b3R5cGUuc2NhblVudGlsID0gZnVuY3Rpb24gc2NhblVudGlsIChyZSkge1xuICAgIHZhciBpbmRleCA9IHRoaXMudGFpbC5zZWFyY2gocmUpLCBtYXRjaDtcblxuICAgIHN3aXRjaCAoaW5kZXgpIHtcbiAgICAgIGNhc2UgLTE6XG4gICAgICAgIG1hdGNoID0gdGhpcy50YWlsO1xuICAgICAgICB0aGlzLnRhaWwgPSAnJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIG1hdGNoID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbWF0Y2ggPSB0aGlzLnRhaWwuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgICAgdGhpcy50YWlsID0gdGhpcy50YWlsLnN1YnN0cmluZyhpbmRleCk7XG4gICAgfVxuXG4gICAgdGhpcy5wb3MgKz0gbWF0Y2gubGVuZ3RoO1xuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGEgcmVuZGVyaW5nIGNvbnRleHQgYnkgd3JhcHBpbmcgYSB2aWV3IG9iamVjdCBhbmRcbiAgICogbWFpbnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gQ29udGV4dCAodmlldywgcGFyZW50Q29udGV4dCkge1xuICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgdGhpcy5jYWNoZSA9IHsgJy4nOiB0aGlzLnZpZXcgfTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudENvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBjb250ZXh0IHVzaW5nIHRoZSBnaXZlbiB2aWV3IHdpdGggdGhpcyBjb250ZXh0XG4gICAqIGFzIHRoZSBwYXJlbnQuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCAodmlldykge1xuICAgIHJldHVybiBuZXcgQ29udGV4dCh2aWV3LCB0aGlzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIGdpdmVuIG5hbWUgaW4gdGhpcyBjb250ZXh0LCB0cmF2ZXJzaW5nXG4gICAqIHVwIHRoZSBjb250ZXh0IGhpZXJhcmNoeSBpZiB0aGUgdmFsdWUgaXMgYWJzZW50IGluIHRoaXMgY29udGV4dCdzIHZpZXcuXG4gICAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAgKG5hbWUpIHtcbiAgICB2YXIgY2FjaGUgPSB0aGlzLmNhY2hlO1xuXG4gICAgdmFyIHZhbHVlO1xuICAgIGlmIChjYWNoZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgdmFsdWUgPSBjYWNoZVtuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBpbnRlcm1lZGlhdGVWYWx1ZSwgbmFtZXMsIGluZGV4LCBsb29rdXBIaXQgPSBmYWxzZTtcblxuICAgICAgd2hpbGUgKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKG5hbWUuaW5kZXhPZignLicpID4gMCkge1xuICAgICAgICAgIGludGVybWVkaWF0ZVZhbHVlID0gY29udGV4dC52aWV3O1xuICAgICAgICAgIG5hbWVzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgICAgICAgIGluZGV4ID0gMDtcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIFVzaW5nIHRoZSBkb3Qgbm90aW9uIHBhdGggaW4gYG5hbWVgLCB3ZSBkZXNjZW5kIHRocm91Z2ggdGhlXG4gICAgICAgICAgICogbmVzdGVkIG9iamVjdHMuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUbyBiZSBjZXJ0YWluIHRoYXQgdGhlIGxvb2t1cCBoYXMgYmVlbiBzdWNjZXNzZnVsLCB3ZSBoYXZlIHRvXG4gICAgICAgICAgICogY2hlY2sgaWYgdGhlIGxhc3Qgb2JqZWN0IGluIHRoZSBwYXRoIGFjdHVhbGx5IGhhcyB0aGUgcHJvcGVydHlcbiAgICAgICAgICAgKiB3ZSBhcmUgbG9va2luZyBmb3IuIFdlIHN0b3JlIHRoZSByZXN1bHQgaW4gYGxvb2t1cEhpdGAuXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBUaGlzIGlzIHNwZWNpYWxseSBuZWNlc3NhcnkgZm9yIHdoZW4gdGhlIHZhbHVlIGhhcyBiZWVuIHNldCB0b1xuICAgICAgICAgICAqIGB1bmRlZmluZWRgIGFuZCB3ZSB3YW50IHRvIGF2b2lkIGxvb2tpbmcgdXAgcGFyZW50IGNvbnRleHRzLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogSW4gdGhlIGNhc2Ugd2hlcmUgZG90IG5vdGF0aW9uIGlzIHVzZWQsIHdlIGNvbnNpZGVyIHRoZSBsb29rdXBcbiAgICAgICAgICAgKiB0byBiZSBzdWNjZXNzZnVsIGV2ZW4gaWYgdGhlIGxhc3QgXCJvYmplY3RcIiBpbiB0aGUgcGF0aCBpc1xuICAgICAgICAgICAqIG5vdCBhY3R1YWxseSBhbiBvYmplY3QgYnV0IGEgcHJpbWl0aXZlIChlLmcuLCBhIHN0cmluZywgb3IgYW5cbiAgICAgICAgICAgKiBpbnRlZ2VyKSwgYmVjYXVzZSBpdCBpcyBzb21ldGltZXMgdXNlZnVsIHRvIGFjY2VzcyBhIHByb3BlcnR5XG4gICAgICAgICAgICogb2YgYW4gYXV0b2JveGVkIHByaW1pdGl2ZSwgc3VjaCBhcyB0aGUgbGVuZ3RoIG9mIGEgc3RyaW5nLlxuICAgICAgICAgICAqKi9cbiAgICAgICAgICB3aGlsZSAoaW50ZXJtZWRpYXRlVmFsdWUgIT0gbnVsbCAmJiBpbmRleCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSBuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgICAgICAgICBsb29rdXBIaXQgPSAoXG4gICAgICAgICAgICAgICAgaGFzUHJvcGVydHkoaW50ZXJtZWRpYXRlVmFsdWUsIG5hbWVzW2luZGV4XSlcbiAgICAgICAgICAgICAgICB8fCBwcmltaXRpdmVIYXNPd25Qcm9wZXJ0eShpbnRlcm1lZGlhdGVWYWx1ZSwgbmFtZXNbaW5kZXhdKVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpbnRlcm1lZGlhdGVWYWx1ZSA9IGludGVybWVkaWF0ZVZhbHVlW25hbWVzW2luZGV4KytdXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW50ZXJtZWRpYXRlVmFsdWUgPSBjb250ZXh0LnZpZXdbbmFtZV07XG5cbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBPbmx5IGNoZWNraW5nIGFnYWluc3QgYGhhc1Byb3BlcnR5YCwgd2hpY2ggYWx3YXlzIHJldHVybnMgYGZhbHNlYCBpZlxuICAgICAgICAgICAqIGBjb250ZXh0LnZpZXdgIGlzIG5vdCBhbiBvYmplY3QuIERlbGliZXJhdGVseSBvbWl0dGluZyB0aGUgY2hlY2tcbiAgICAgICAgICAgKiBhZ2FpbnN0IGBwcmltaXRpdmVIYXNPd25Qcm9wZXJ0eWAgaWYgZG90IG5vdGF0aW9uIGlzIG5vdCB1c2VkLlxuICAgICAgICAgICAqXG4gICAgICAgICAgICogQ29uc2lkZXIgdGhpcyBleGFtcGxlOlxuICAgICAgICAgICAqIGBgYFxuICAgICAgICAgICAqIE11c3RhY2hlLnJlbmRlcihcIlRoZSBsZW5ndGggb2YgYSBmb290YmFsbCBmaWVsZCBpcyB7eyNsZW5ndGh9fXt7bGVuZ3RofX17ey9sZW5ndGh9fS5cIiwge2xlbmd0aDogXCIxMDAgeWFyZHNcIn0pXG4gICAgICAgICAgICogYGBgXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBJZiB3ZSB3ZXJlIHRvIGNoZWNrIGFsc28gYWdhaW5zdCBgcHJpbWl0aXZlSGFzT3duUHJvcGVydHlgLCBhcyB3ZSBkb1xuICAgICAgICAgICAqIGluIHRoZSBkb3Qgbm90YXRpb24gY2FzZSwgdGhlbiByZW5kZXIgY2FsbCB3b3VsZCByZXR1cm46XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBcIlRoZSBsZW5ndGggb2YgYSBmb290YmFsbCBmaWVsZCBpcyA5LlwiXG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiByYXRoZXIgdGhhbiB0aGUgZXhwZWN0ZWQ6XG4gICAgICAgICAgICpcbiAgICAgICAgICAgKiBcIlRoZSBsZW5ndGggb2YgYSBmb290YmFsbCBmaWVsZCBpcyAxMDAgeWFyZHMuXCJcbiAgICAgICAgICAgKiovXG4gICAgICAgICAgbG9va3VwSGl0ID0gaGFzUHJvcGVydHkoY29udGV4dC52aWV3LCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsb29rdXBIaXQpIHtcbiAgICAgICAgICB2YWx1ZSA9IGludGVybWVkaWF0ZVZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQucGFyZW50O1xuICAgICAgfVxuXG4gICAgICBjYWNoZVtuYW1lXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSlcbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbCh0aGlzLnZpZXcpO1xuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIFdyaXRlciBrbm93cyBob3cgdG8gdGFrZSBhIHN0cmVhbSBvZiB0b2tlbnMgYW5kIHJlbmRlciB0aGVtIHRvIGFcbiAgICogc3RyaW5nLCBnaXZlbiBhIGNvbnRleHQuIEl0IGFsc28gbWFpbnRhaW5zIGEgY2FjaGUgb2YgdGVtcGxhdGVzIHRvXG4gICAqIGF2b2lkIHRoZSBuZWVkIHRvIHBhcnNlIHRoZSBzYW1lIHRlbXBsYXRlIHR3aWNlLlxuICAgKi9cbiAgZnVuY3Rpb24gV3JpdGVyICgpIHtcbiAgICB0aGlzLnRlbXBsYXRlQ2FjaGUgPSB7XG4gICAgICBfY2FjaGU6IHt9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQgKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5fY2FjaGVba2V5XSA9IHZhbHVlO1xuICAgICAgfSxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0IChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlW2tleV07XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyICgpIHtcbiAgICAgICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGlzIHdyaXRlci5cbiAgICovXG4gIFdyaXRlci5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUgKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy50ZW1wbGF0ZUNhY2hlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy50ZW1wbGF0ZUNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gYHRlbXBsYXRlYCBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGB0YWdzYCBvclxuICAgKiBgbXVzdGFjaGUudGFnc2AgaWYgYHRhZ3NgIGlzIG9taXR0ZWQsICBhbmQgcmV0dXJucyB0aGUgYXJyYXkgb2YgdG9rZW5zXG4gICAqIHRoYXQgaXMgZ2VuZXJhdGVkIGZyb20gdGhlIHBhcnNlLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlICh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHZhciBjYWNoZSA9IHRoaXMudGVtcGxhdGVDYWNoZTtcbiAgICB2YXIgY2FjaGVLZXkgPSB0ZW1wbGF0ZSArICc6JyArICh0YWdzIHx8IG11c3RhY2hlLnRhZ3MpLmpvaW4oJzonKTtcbiAgICB2YXIgaXNDYWNoZUVuYWJsZWQgPSB0eXBlb2YgY2FjaGUgIT09ICd1bmRlZmluZWQnO1xuICAgIHZhciB0b2tlbnMgPSBpc0NhY2hlRW5hYmxlZCA/IGNhY2hlLmdldChjYWNoZUtleSkgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAodG9rZW5zID09IHVuZGVmaW5lZCkge1xuICAgICAgdG9rZW5zID0gcGFyc2VUZW1wbGF0ZSh0ZW1wbGF0ZSwgdGFncyk7XG4gICAgICBpc0NhY2hlRW5hYmxlZCAmJiBjYWNoZS5zZXQoY2FjaGVLZXksIHRva2Vucyk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2gtbGV2ZWwgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byByZW5kZXIgdGhlIGdpdmVuIGB0ZW1wbGF0ZWAgd2l0aFxuICAgKiB0aGUgZ2l2ZW4gYHZpZXdgLlxuICAgKlxuICAgKiBUaGUgb3B0aW9uYWwgYHBhcnRpYWxzYCBhcmd1bWVudCBtYXkgYmUgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgdGhlXG4gICAqIG5hbWVzIGFuZCB0ZW1wbGF0ZXMgb2YgcGFydGlhbHMgdGhhdCBhcmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuIEl0IG1heVxuICAgKiBhbHNvIGJlIGEgZnVuY3Rpb24gdGhhdCBpcyB1c2VkIHRvIGxvYWQgcGFydGlhbCB0ZW1wbGF0ZXMgb24gdGhlIGZseVxuICAgKiB0aGF0IHRha2VzIGEgc2luZ2xlIGFyZ3VtZW50OiB0aGUgbmFtZSBvZiB0aGUgcGFydGlhbC5cbiAgICpcbiAgICogSWYgdGhlIG9wdGlvbmFsIGBjb25maWdgIGFyZ3VtZW50IGlzIGdpdmVuIGhlcmUsIHRoZW4gaXQgc2hvdWxkIGJlIGFuXG4gICAqIG9iamVjdCB3aXRoIGEgYHRhZ3NgIGF0dHJpYnV0ZSBvciBhbiBgZXNjYXBlYCBhdHRyaWJ1dGUgb3IgYm90aC5cbiAgICogSWYgYW4gYXJyYXkgaXMgcGFzc2VkLCB0aGVuIGl0IHdpbGwgYmUgaW50ZXJwcmV0ZWQgdGhlIHNhbWUgd2F5IGFzXG4gICAqIGEgYHRhZ3NgIGF0dHJpYnV0ZSBvbiBhIGBjb25maWdgIG9iamVjdC5cbiAgICpcbiAgICogVGhlIGB0YWdzYCBhdHRyaWJ1dGUgb2YgYSBgY29uZmlnYCBvYmplY3QgbXVzdCBiZSBhbiBhcnJheSB3aXRoIHR3b1xuICAgKiBzdHJpbmcgdmFsdWVzOiB0aGUgb3BlbmluZyBhbmQgY2xvc2luZyB0YWdzIHVzZWQgaW4gdGhlIHRlbXBsYXRlIChlLmcuXG4gICAqIFsgXCI8JVwiLCBcIiU+XCIgXSkuIFRoZSBkZWZhdWx0IGlzIHRvIG11c3RhY2hlLnRhZ3MuXG4gICAqXG4gICAqIFRoZSBgZXNjYXBlYCBhdHRyaWJ1dGUgb2YgYSBgY29uZmlnYCBvYmplY3QgbXVzdCBiZSBhIGZ1bmN0aW9uIHdoaWNoXG4gICAqIGFjY2VwdHMgYSBzdHJpbmcgYXMgaW5wdXQgYW5kIG91dHB1dHMgYSBzYWZlbHkgZXNjYXBlZCBzdHJpbmcuXG4gICAqIElmIGFuIGBlc2NhcGVgIGZ1bmN0aW9uIGlzIG5vdCBwcm92aWRlZCwgdGhlbiBhbiBIVE1MLXNhZmUgc3RyaW5nXG4gICAqIGVzY2FwaW5nIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIGRlZmF1bHQuXG4gICAqL1xuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlciAodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzLCBjb25maWcpIHtcbiAgICB2YXIgdGFncyA9IHRoaXMuZ2V0Q29uZmlnVGFncyhjb25maWcpO1xuICAgIHZhciB0b2tlbnMgPSB0aGlzLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgICB2YXIgY29udGV4dCA9ICh2aWV3IGluc3RhbmNlb2YgQ29udGV4dCkgPyB2aWV3IDogbmV3IENvbnRleHQodmlldywgdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgdGVtcGxhdGUsIGNvbmZpZyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvdy1sZXZlbCBtZXRob2QgdGhhdCByZW5kZXJzIHRoZSBnaXZlbiBhcnJheSBvZiBgdG9rZW5zYCB1c2luZ1xuICAgKiB0aGUgZ2l2ZW4gYGNvbnRleHRgIGFuZCBgcGFydGlhbHNgLlxuICAgKlxuICAgKiBOb3RlOiBUaGUgYG9yaWdpbmFsVGVtcGxhdGVgIGlzIG9ubHkgZXZlciB1c2VkIHRvIGV4dHJhY3QgdGhlIHBvcnRpb25cbiAgICogb2YgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIHRoYXQgd2FzIGNvbnRhaW5lZCBpbiBhIGhpZ2hlci1vcmRlciBzZWN0aW9uLlxuICAgKiBJZiB0aGUgdGVtcGxhdGUgZG9lc24ndCB1c2UgaGlnaGVyLW9yZGVyIHNlY3Rpb25zLCB0aGlzIGFyZ3VtZW50IG1heVxuICAgKiBiZSBvbWl0dGVkLlxuICAgKi9cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJUb2tlbnMgPSBmdW5jdGlvbiByZW5kZXJUb2tlbnMgKHRva2VucywgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUsIGNvbmZpZykge1xuICAgIHZhciBidWZmZXIgPSAnJztcblxuICAgIHZhciB0b2tlbiwgc3ltYm9sLCB2YWx1ZTtcbiAgICBmb3IgKHZhciBpID0gMCwgbnVtVG9rZW5zID0gdG9rZW5zLmxlbmd0aDsgaSA8IG51bVRva2VuczsgKytpKSB7XG4gICAgICB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgc3ltYm9sID0gdG9rZW5bMF07XG5cbiAgICAgIGlmIChzeW1ib2wgPT09ICcjJykgdmFsdWUgPSB0aGlzLnJlbmRlclNlY3Rpb24odG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnXicpIHZhbHVlID0gdGhpcy5yZW5kZXJJbnZlcnRlZCh0b2tlbiwgY29udGV4dCwgcGFydGlhbHMsIG9yaWdpbmFsVGVtcGxhdGUsIGNvbmZpZyk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICc+JykgdmFsdWUgPSB0aGlzLnJlbmRlclBhcnRpYWwodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBjb25maWcpO1xuICAgICAgZWxzZSBpZiAoc3ltYm9sID09PSAnJicpIHZhbHVlID0gdGhpcy51bmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCk7XG4gICAgICBlbHNlIGlmIChzeW1ib2wgPT09ICduYW1lJykgdmFsdWUgPSB0aGlzLmVzY2FwZWRWYWx1ZSh0b2tlbiwgY29udGV4dCwgY29uZmlnKTtcbiAgICAgIGVsc2UgaWYgKHN5bWJvbCA9PT0gJ3RleHQnKSB2YWx1ZSA9IHRoaXMucmF3VmFsdWUodG9rZW4pO1xuXG4gICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgYnVmZmVyICs9IHZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBidWZmZXI7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJTZWN0aW9uID0gZnVuY3Rpb24gcmVuZGVyU2VjdGlvbiAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGJ1ZmZlciA9ICcnO1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcblxuICAgIC8vIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byByZW5kZXIgYW4gYXJiaXRyYXJ5IHRlbXBsYXRlXG4gICAgLy8gaW4gdGhlIGN1cnJlbnQgY29udGV4dCBieSBoaWdoZXItb3JkZXIgc2VjdGlvbnMuXG4gICAgZnVuY3Rpb24gc3ViUmVuZGVyICh0ZW1wbGF0ZSkge1xuICAgICAgcmV0dXJuIHNlbGYucmVuZGVyKHRlbXBsYXRlLCBjb250ZXh0LCBwYXJ0aWFscywgY29uZmlnKTtcbiAgICB9XG5cbiAgICBpZiAoIXZhbHVlKSByZXR1cm47XG5cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIGZvciAodmFyIGogPSAwLCB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aDsgaiA8IHZhbHVlTGVuZ3RoOyArK2opIHtcbiAgICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LnB1c2godmFsdWVbal0pLCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBidWZmZXIgKz0gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQucHVzaCh2YWx1ZSksIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3JpZ2luYWxUZW1wbGF0ZSAhPT0gJ3N0cmluZycpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBoaWdoZXItb3JkZXIgc2VjdGlvbnMgd2l0aG91dCB0aGUgb3JpZ2luYWwgdGVtcGxhdGUnKTtcblxuICAgICAgLy8gRXh0cmFjdCB0aGUgcG9ydGlvbiBvZiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgdGhhdCB0aGUgc2VjdGlvbiBjb250YWlucy5cbiAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChjb250ZXh0LnZpZXcsIG9yaWdpbmFsVGVtcGxhdGUuc2xpY2UodG9rZW5bM10sIHRva2VuWzVdKSwgc3ViUmVuZGVyKTtcblxuICAgICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICAgIGJ1ZmZlciArPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmZmVyICs9IHRoaXMucmVuZGVyVG9rZW5zKHRva2VuWzRdLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLnJlbmRlckludmVydGVkID0gZnVuY3Rpb24gcmVuZGVySW52ZXJ0ZWQgKHRva2VuLCBjb250ZXh0LCBwYXJ0aWFscywgb3JpZ2luYWxUZW1wbGF0ZSwgY29uZmlnKSB7XG4gICAgdmFyIHZhbHVlID0gY29udGV4dC5sb29rdXAodG9rZW5bMV0pO1xuXG4gICAgLy8gVXNlIEphdmFTY3JpcHQncyBkZWZpbml0aW9uIG9mIGZhbHN5LiBJbmNsdWRlIGVtcHR5IGFycmF5cy5cbiAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2phbmwvbXVzdGFjaGUuanMvaXNzdWVzLzE4NlxuICAgIGlmICghdmFsdWUgfHwgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkpXG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5bNF0sIGNvbnRleHQsIHBhcnRpYWxzLCBvcmlnaW5hbFRlbXBsYXRlLCBjb25maWcpO1xuICB9O1xuXG4gIFdyaXRlci5wcm90b3R5cGUuaW5kZW50UGFydGlhbCA9IGZ1bmN0aW9uIGluZGVudFBhcnRpYWwgKHBhcnRpYWwsIGluZGVudGF0aW9uLCBsaW5lSGFzTm9uU3BhY2UpIHtcbiAgICB2YXIgZmlsdGVyZWRJbmRlbnRhdGlvbiA9IGluZGVudGF0aW9uLnJlcGxhY2UoL1teIFxcdF0vZywgJycpO1xuICAgIHZhciBwYXJ0aWFsQnlObCA9IHBhcnRpYWwuc3BsaXQoJ1xcbicpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydGlhbEJ5TmwubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChwYXJ0aWFsQnlObFtpXS5sZW5ndGggJiYgKGkgPiAwIHx8ICFsaW5lSGFzTm9uU3BhY2UpKSB7XG4gICAgICAgIHBhcnRpYWxCeU5sW2ldID0gZmlsdGVyZWRJbmRlbnRhdGlvbiArIHBhcnRpYWxCeU5sW2ldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFydGlhbEJ5Tmwuam9pbignXFxuJyk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yZW5kZXJQYXJ0aWFsID0gZnVuY3Rpb24gcmVuZGVyUGFydGlhbCAodG9rZW4sIGNvbnRleHQsIHBhcnRpYWxzLCBjb25maWcpIHtcbiAgICBpZiAoIXBhcnRpYWxzKSByZXR1cm47XG4gICAgdmFyIHRhZ3MgPSB0aGlzLmdldENvbmZpZ1RhZ3MoY29uZmlnKTtcblxuICAgIHZhciB2YWx1ZSA9IGlzRnVuY3Rpb24ocGFydGlhbHMpID8gcGFydGlhbHModG9rZW5bMV0pIDogcGFydGlhbHNbdG9rZW5bMV1dO1xuICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICB2YXIgbGluZUhhc05vblNwYWNlID0gdG9rZW5bNl07XG4gICAgICB2YXIgdGFnSW5kZXggPSB0b2tlbls1XTtcbiAgICAgIHZhciBpbmRlbnRhdGlvbiA9IHRva2VuWzRdO1xuICAgICAgdmFyIGluZGVudGVkVmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmICh0YWdJbmRleCA9PSAwICYmIGluZGVudGF0aW9uKSB7XG4gICAgICAgIGluZGVudGVkVmFsdWUgPSB0aGlzLmluZGVudFBhcnRpYWwodmFsdWUsIGluZGVudGF0aW9uLCBsaW5lSGFzTm9uU3BhY2UpO1xuICAgICAgfVxuICAgICAgdmFyIHRva2VucyA9IHRoaXMucGFyc2UoaW5kZW50ZWRWYWx1ZSwgdGFncyk7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJUb2tlbnModG9rZW5zLCBjb250ZXh0LCBwYXJ0aWFscywgaW5kZW50ZWRWYWx1ZSwgY29uZmlnKTtcbiAgICB9XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS51bmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIHVuZXNjYXBlZFZhbHVlICh0b2tlbiwgY29udGV4dCkge1xuICAgIHZhciB2YWx1ZSA9IGNvbnRleHQubG9va3VwKHRva2VuWzFdKTtcbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmVzY2FwZWRWYWx1ZSA9IGZ1bmN0aW9uIGVzY2FwZWRWYWx1ZSAodG9rZW4sIGNvbnRleHQsIGNvbmZpZykge1xuICAgIHZhciBlc2NhcGUgPSB0aGlzLmdldENvbmZpZ0VzY2FwZShjb25maWcpIHx8IG11c3RhY2hlLmVzY2FwZTtcbiAgICB2YXIgdmFsdWUgPSBjb250ZXh0Lmxvb2t1cCh0b2tlblsxXSk7XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICByZXR1cm4gKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZXNjYXBlID09PSBtdXN0YWNoZS5lc2NhcGUpID8gU3RyaW5nKHZhbHVlKSA6IGVzY2FwZSh2YWx1ZSk7XG4gIH07XG5cbiAgV3JpdGVyLnByb3RvdHlwZS5yYXdWYWx1ZSA9IGZ1bmN0aW9uIHJhd1ZhbHVlICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlblsxXTtcbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmdldENvbmZpZ1RhZ3MgPSBmdW5jdGlvbiBnZXRDb25maWdUYWdzIChjb25maWcpIHtcbiAgICBpZiAoaXNBcnJheShjb25maWcpKSB7XG4gICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWcgJiYgdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBjb25maWcudGFncztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBXcml0ZXIucHJvdG90eXBlLmdldENvbmZpZ0VzY2FwZSA9IGZ1bmN0aW9uIGdldENvbmZpZ0VzY2FwZSAoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZyAmJiB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiAhaXNBcnJheShjb25maWcpKSB7XG4gICAgICByZXR1cm4gY29uZmlnLmVzY2FwZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbXVzdGFjaGUgPSB7XG4gICAgbmFtZTogJ211c3RhY2hlLmpzJyxcbiAgICB2ZXJzaW9uOiAnNC4xLjAnLFxuICAgIHRhZ3M6IFsgJ3t7JywgJ319JyBdLFxuICAgIGNsZWFyQ2FjaGU6IHVuZGVmaW5lZCxcbiAgICBlc2NhcGU6IHVuZGVmaW5lZCxcbiAgICBwYXJzZTogdW5kZWZpbmVkLFxuICAgIHJlbmRlcjogdW5kZWZpbmVkLFxuICAgIFNjYW5uZXI6IHVuZGVmaW5lZCxcbiAgICBDb250ZXh0OiB1bmRlZmluZWQsXG4gICAgV3JpdGVyOiB1bmRlZmluZWQsXG4gICAgLyoqXG4gICAgICogQWxsb3dzIGEgdXNlciB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBjYWNoaW5nIHN0cmF0ZWd5LCBieSBwcm92aWRpbmcgYW5cbiAgICAgKiBvYmplY3Qgd2l0aCBzZXQsIGdldCBhbmQgY2xlYXIgbWV0aG9kcy4gVGhpcyBjYW4gYWxzbyBiZSB1c2VkIHRvIGRpc2FibGVcbiAgICAgKiB0aGUgY2FjaGUgYnkgc2V0dGluZyBpdCB0byB0aGUgbGl0ZXJhbCBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBzZXQgdGVtcGxhdGVDYWNoZSAoY2FjaGUpIHtcbiAgICAgIGRlZmF1bHRXcml0ZXIudGVtcGxhdGVDYWNoZSA9IGNhY2hlO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZGVmYXVsdCBvciBvdmVycmlkZGVuIGNhY2hpbmcgb2JqZWN0IGZyb20gdGhlIGRlZmF1bHQgd3JpdGVyLlxuICAgICAqL1xuICAgIGdldCB0ZW1wbGF0ZUNhY2hlICgpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnRlbXBsYXRlQ2FjaGU7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFsbCBoaWdoLWxldmVsIG11c3RhY2hlLiogZnVuY3Rpb25zIHVzZSB0aGlzIHdyaXRlci5cbiAgdmFyIGRlZmF1bHRXcml0ZXIgPSBuZXcgV3JpdGVyKCk7XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbGwgY2FjaGVkIHRlbXBsYXRlcyBpbiB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSAoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRXcml0ZXIuY2xlYXJDYWNoZSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQYXJzZXMgYW5kIGNhY2hlcyB0aGUgZ2l2ZW4gdGVtcGxhdGUgaW4gdGhlIGRlZmF1bHQgd3JpdGVyIGFuZCByZXR1cm5zIHRoZVxuICAgKiBhcnJheSBvZiB0b2tlbnMgaXQgY29udGFpbnMuIERvaW5nIHRoaXMgYWhlYWQgb2YgdGltZSBhdm9pZHMgdGhlIG5lZWQgdG9cbiAgICogcGFyc2UgdGVtcGxhdGVzIG9uIHRoZSBmbHkgYXMgdGhleSBhcmUgcmVuZGVyZWQuXG4gICAqL1xuICBtdXN0YWNoZS5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlICh0ZW1wbGF0ZSwgdGFncykge1xuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnBhcnNlKHRlbXBsYXRlLCB0YWdzKTtcbiAgfTtcblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgYHRlbXBsYXRlYCB3aXRoIHRoZSBnaXZlbiBgdmlld2AsIGBwYXJ0aWFsc2AsIGFuZCBgY29uZmlnYFxuICAgKiB1c2luZyB0aGUgZGVmYXVsdCB3cml0ZXIuXG4gICAqL1xuICBtdXN0YWNoZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIgKHRlbXBsYXRlLCB2aWV3LCBwYXJ0aWFscywgY29uZmlnKSB7XG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGVtcGxhdGUhIFRlbXBsYXRlIHNob3VsZCBiZSBhIFwic3RyaW5nXCIgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdidXQgXCInICsgdHlwZVN0cih0ZW1wbGF0ZSkgKyAnXCIgd2FzIGdpdmVuIGFzIHRoZSBmaXJzdCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FyZ3VtZW50IGZvciBtdXN0YWNoZSNyZW5kZXIodGVtcGxhdGUsIHZpZXcsIHBhcnRpYWxzKScpO1xuICAgIH1cblxuICAgIHJldHVybiBkZWZhdWx0V3JpdGVyLnJlbmRlcih0ZW1wbGF0ZSwgdmlldywgcGFydGlhbHMsIGNvbmZpZyk7XG4gIH07XG5cbiAgLy8gRXhwb3J0IHRoZSBlc2NhcGluZyBmdW5jdGlvbiBzbyB0aGF0IHRoZSB1c2VyIG1heSBvdmVycmlkZSBpdC5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qYW5sL211c3RhY2hlLmpzL2lzc3Vlcy8yNDRcbiAgbXVzdGFjaGUuZXNjYXBlID0gZXNjYXBlSHRtbDtcblxuICAvLyBFeHBvcnQgdGhlc2UgbWFpbmx5IGZvciB0ZXN0aW5nLCBidXQgYWxzbyBmb3IgYWR2YW5jZWQgdXNhZ2UuXG4gIG11c3RhY2hlLlNjYW5uZXIgPSBTY2FubmVyO1xuICBtdXN0YWNoZS5Db250ZXh0ID0gQ29udGV4dDtcbiAgbXVzdGFjaGUuV3JpdGVyID0gV3JpdGVyO1xuXG4gIHJldHVybiBtdXN0YWNoZTtcblxufSkpKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXNzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvYXNzLmpzXCIsXG5cdFwiLi9qc29uLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvanNvbi5qc1wiLFxuXHRcIi4vbHJjLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvbHJjLmpzXCIsXG5cdFwiLi9zYnYuanNcIjogXCIuL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zYnYuanNcIixcblx0XCIuL3NtaS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3NtaS5qc1wiLFxuXHRcIi4vc3J0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvc3J0LmpzXCIsXG5cdFwiLi9zc2EuanNcIjogXCIuL25vZGVfbW9kdWxlcy9zdWJzcnQvbGliL2Zvcm1hdC9zc2EuanNcIixcblx0XCIuL3N1Yi5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0L3N1Yi5qc1wiLFxuXHRcIi4vdnR0LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvc3Vic3J0L2xpYi9mb3JtYXQvdnR0LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vbm9kZV9tb2R1bGVzL3N1YnNydC9saWIvZm9ybWF0IHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLipcXFxcLmpzJFwiOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEZPUk1BVF9OQU1FID0gXCJhc3NcIjtcblxuLy9Db21wYXRpYmxlIGZvcm1hdFxudmFyIHNzYSA9IHJlcXVpcmUoJy4vc3NhLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBGT1JNQVRfTkFNRSxcbiAgaGVscGVyOiBzc2EuaGVscGVyLFxuICBkZXRlY3Q6IHNzYS5kZXRlY3QsXG4gIHBhcnNlOiBzc2EucGFyc2UsXG4gIGJ1aWxkOiBzc2EuYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcImpzb25cIjtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGNhcHRpb25zIGluIEpTT04gZm9ybWF0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICByZXR1cm4gSlNPTi5wYXJzZShjb250ZW50KTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBKU09OIGZvcm1hdFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShjYXB0aW9ucywgXCIgXCIsIDIpO1xufVxuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKC9eXFxbW1xcc1xcclxcbl0qXFx7W1xcc1xcU10qXFx9W1xcc1xcclxcbl0qXFxdJC9nLnRlc3QoY29udGVudCkpIHtcbiAgICAgIC8qXG4gICAgICBbXG4gICAgICAgIHsgLi4uIH1cbiAgICAgIF1cbiAgICAgICovXG4gICAgICByZXR1cm4gXCJqc29uXCI7XG4gICAgfVxuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwibHJjXCI7XG5cbnZhciBoZWxwZXIgPSB7XG4gIHRvTWlsbGlzZWNvbmRzOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG1hdGNoID0gL15cXHMqKFxcZCspOihcXGR7MSwyfSkoWy4sXShcXGR7MSwzfSkpP1xccyokLy5leGVjKHMpO1xuICAgIHZhciBtbSA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICB2YXIgc3MgPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgdmFyIGZmID0gbWF0Y2hbNF0gPyBwYXJzZUludChtYXRjaFs0XSkgOiAwO1xuICAgIHZhciBtcyA9IG1tICogNjAgKiAxMDAwICsgc3MgKiAxMDAwICsgZmYgKiAxMDtcbiAgICByZXR1cm4gbXM7XG4gIH0sXG4gIHRvVGltZVN0cmluZzogZnVuY3Rpb24obXMpIHtcbiAgICB2YXIgbW0gPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwKTtcbiAgICB2YXIgc3MgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAlIDYwKTtcbiAgICB2YXIgZmYgPSBNYXRoLmZsb29yKG1zICUgMTAwMCk7XG4gICAgdmFyIHRpbWUgPSAobW0gPCAxMCA/IFwiMFwiIDogXCJcIikgKyBtbSArIFwiOlwiICsgKHNzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgc3MgKyBcIi5cIiArIChmZiA8IDEwMCA/IFwiMFwiIDogXCJcIikgKyAoZmYgPCAxMCA/IFwiMFwiIDogTWF0aC5mbG9vcihmZiAvIDEwKSk7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBMUkMgZm9ybWF0OiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MUkNfJTI4ZmlsZV9mb3JtYXQlMjlcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBwYXJzZShjb250ZW50LCBvcHRpb25zKSB7XG4gIHZhciBwcmV2ID0gbnVsbDtcbiAgdmFyIGNhcHRpb25zID0gWyBdO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgdmFyIHBhcnRzID0gY29udGVudC5zcGxpdCgvXFxyP1xcbi8pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFwYXJ0c1tpXSB8fCBwYXJ0c1tpXS50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgXG4gICAgLy9MUkMgY29udGVudFxuICAgIHZhciByZWdleCA9IC9eXFxbKFxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxcXSguKikoXFxyP1xcbikqJC9naTtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJjYXB0aW9uXCI7XG4gICAgICBjYXB0aW9uLnN0YXJ0ID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzFdKTtcbiAgICAgIGNhcHRpb24uZW5kID0gY2FwdGlvbi5zdGFydCArIDIwMDA7XG4gICAgICBjYXB0aW9uLmR1cmF0aW9uID0gY2FwdGlvbi5lbmQgLSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgY2FwdGlvbi5jb250ZW50ID0gbWF0Y2hbM107XG4gICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLmNvbnRlbnQ7XG4gICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgXG4gICAgICAvL1VwZGF0ZSBwcmV2aW91c1xuICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgcHJldi5lbmQgPSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgICBwcmV2LmR1cmF0aW9uID0gcHJldi5lbmQgLSBwcmV2LnN0YXJ0O1xuICAgICAgfVxuICAgICAgcHJldiA9IGNhcHRpb247XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgLy9MUkMgbWV0YVxuICAgIHZhciBtZXRhID0gL15cXFsoW1xcd1xcZF0rKTooW15cXF1dKilcXF0oXFxyP1xcbikqJC9naS5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWV0YSkge1xuICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICBjYXB0aW9uLnR5cGUgPSBcIm1ldGFcIjtcbiAgICAgIGNhcHRpb24udGFnID0gbWV0YVsxXTtcbiAgICAgIGlmIChtZXRhWzJdKSB7XG4gICAgICAgIGNhcHRpb24uZGF0YSA9IG1ldGFbMl07XG4gICAgICB9XG4gICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiV0FSTjogVW5rbm93biBwYXJ0XCIsIHBhcnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhcHRpb25zO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGNhcHRpb25zIGluIExSQyBmb3JtYXQ6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xSQ18lMjhmaWxlX2Zvcm1hdCUyOVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgdmFyIGx5cmljcyA9IGZhbHNlO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYXB0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBjYXB0aW9uID0gY2FwdGlvbnNbaV07XG4gICAgaWYgKGNhcHRpb24udHlwZSA9PSBcIm1ldGFcIikge1xuICAgICAgaWYgKGNhcHRpb24udGFnICYmIGNhcHRpb24uZGF0YSkge1xuICAgICAgICBjb250ZW50ICs9IFwiW1wiICsgY2FwdGlvbi50YWcgKyBcIjpcIiArIGNhcHRpb24uZGF0YS5yZXBsYWNlKC9bXFxyXFxuXSsvZywgXCIgXCIpICsgXCJdXCIgKyBlb2w7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICBpZiAoIWx5cmljcykge1xuICAgICAgICBjb250ZW50ICs9IGVvbDsgLy9OZXcgbGluZSB3aGVuIGx5cmljcyBzdGFydFxuICAgICAgICBseXJpY3MgPSB0cnVlO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBcIltcIiArIGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5zdGFydCkgKyBcIl1cIiArIGNhcHRpb24udGV4dCArIGVvbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNLSVA6XCIsIGNhcHRpb24pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKC9cXHI/XFxuXFxbKFxcZCs6XFxkezEsMn0oWy4sXVxcZHsxLDN9KT8pXFxdKC4qKVxccj9cXG4vLnRlc3QoY29udGVudCkpIHtcbiAgICAgIC8qXG4gICAgICBbMDQ6NDguMjhdU2lzdGVyLCBwZXJmdW1lP1xuICAgICAgKi9cbiAgICAgIC8vcmV0dXJuIFwibHJjXCI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEV4cG9ydFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBGT1JNQVRfTkFNRSxcbiAgaGVscGVyOiBoZWxwZXIsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwic2J2XCI7XG5cbnZhciBoZWxwZXIgPSB7XG4gIHRvTWlsbGlzZWNvbmRzOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG1hdGNoID0gL15cXHMqKFxcZHsxLDJ9KTooXFxkezEsMn0pOihcXGR7MSwyfSkoWy4sXShcXGR7MSwzfSkpP1xccyokLy5leGVjKHMpO1xuICAgIHZhciBoaCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICB2YXIgbW0gPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgdmFyIHNzID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHZhciBmZiA9IG1hdGNoWzVdID8gcGFyc2VJbnQobWF0Y2hbNV0pIDogMDtcbiAgICB2YXIgbXMgPSBoaCAqIDM2MDAgKiAxMDAwICsgbW0gKiA2MCAqIDEwMDAgKyBzcyAqIDEwMDAgKyBmZjtcbiAgICByZXR1cm4gbXM7XG4gIH0sXG4gIHRvVGltZVN0cmluZzogZnVuY3Rpb24obXMpIHtcbiAgICB2YXIgaGggPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDM2MDApO1xuICAgIHZhciBtbSA9IE1hdGguZmxvb3IobXMgLyAxMDAwIC8gNjAgJSA2MCk7XG4gICAgdmFyIHNzID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgJSA2MCk7XG4gICAgdmFyIGZmID0gTWF0aC5mbG9vcihtcyAlIDEwMDApO1xuICAgIHZhciB0aW1lID0gKGhoIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgaGggKyBcIjpcIiArIChtbSA8IDEwID8gXCIwXCIgOiBcIlwiKSArIG1tICsgXCI6XCIgKyAoc3MgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBzcyArIFwiLlwiICsgKGZmIDwgMTAwID8gXCIwXCIgOiBcIlwiKSArIChmZiA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGZmO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQYXJzZXMgY2FwdGlvbnMgaW4gU3ViVmlld2VyIGZvcm1hdCAoLnNidilcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBwYXJzZShjb250ZW50LCBvcHRpb25zKSB7XG4gIHZhciBjYXB0aW9ucyA9IFsgXTtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoL1xccj9cXG5cXHMrXFxyP1xcbi8pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlZ2V4ID0gL14oXFxkezEsMn06XFxkezEsMn06XFxkezEsMn0oWy4sXVxcZHsxLDN9KT8pXFxzKlssO11cXHMqKFxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccj9cXG4oW1xcc1xcU10qKShcXHI/XFxuKSokL2dpO1xuICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFydHNbaV0pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICBjYXB0aW9uLnR5cGUgPSBcImNhcHRpb25cIjtcbiAgICAgIGNhcHRpb24uc3RhcnQgPSBoZWxwZXIudG9NaWxsaXNlY29uZHMobWF0Y2hbMV0pO1xuICAgICAgY2FwdGlvbi5lbmQgPSBoZWxwZXIudG9NaWxsaXNlY29uZHMobWF0Y2hbM10pO1xuICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgIHZhciBsaW5lcyA9IG1hdGNoWzVdLnNwbGl0KC9cXFticlxcXXxcXHI/XFxuL2dpKTtcbiAgICAgIGNhcHRpb24uY29udGVudCA9IGxpbmVzLmpvaW4oZW9sKTtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24uY29udGVudC5yZXBsYWNlKC9cXD5cXD5cXHMqW146XSs6XFxzKi9nLCBcIlwiKTsgLy8+PiBTUEVBS0VSIE5BTUU6IFxuICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIldBUk46IFVua25vd24gcGFydFwiLCBwYXJ0c1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYXB0aW9ucztcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBTdWJWaWV3ZXIgZm9ybWF0ICguc2J2KVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBjb250ZW50ID0gXCJcIjtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2FwdGlvbiA9IGNhcHRpb25zW2ldO1xuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgY29udGVudCArPSBoZWxwZXIudG9UaW1lU3RyaW5nKGNhcHRpb24uc3RhcnQpICsgXCIsXCIgKyBoZWxwZXIudG9UaW1lU3RyaW5nKGNhcHRpb24uZW5kKSArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gY2FwdGlvbi50ZXh0ICsgZW9sO1xuICAgICAgY29udGVudCArPSBlb2w7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJTS0lQOlwiLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBjb250ZW50O1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCAhPT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkV4cGVjdGVkIHN0cmluZyBjb250ZW50IVwiKTtcbiAgfVxuICBcbiAgaWYgKC9cXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pP1xccypbLDtdXFxzKlxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/L2cudGVzdChjb250ZW50KSkge1xuICAgIC8qXG4gICAgMDA6MDQ6NDguMjgwLDAwOjA0OjUwLjUxMFxuICAgIFNpc3RlciwgcGVyZnVtZT9cbiAgICAqL1xuICAgIHJldHVybiBcInNidlwiO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogaGVscGVyLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRk9STUFUX05BTUUgPSBcInNtaVwiO1xuXG52YXIgaGVscGVyID0ge1xuICBodG1sRW5jb2RlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgcmV0dXJuIHRleHRcbiAgICAgIC5yZXBsYWNlKC8mL2csICcmYW1wOycpXG4gICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgLnJlcGxhY2UoL1xcPC9nLCAnJmx0OycpXG4gICAgICAucmVwbGFjZSgvXFw+L2csICcmZ3Q7JylcbiAgICAgIC8vLnJlcGxhY2UoL1xccy9nLCAnJm5ic3A7JylcbiAgICAgIC5yZXBsYWNlKC9cXHI/XFxuL2csICc8QlI+Jyk7XG4gIH0sXG4gIGh0bWxEZWNvZGU6IGZ1bmN0aW9uKGh0bWwsIGVvbCl7XG4gICAgcmV0dXJuIGh0bWxcbiAgICAgIC5yZXBsYWNlKC9cXDxCUlxccypcXC8/XFw+L2dpLCBlb2wgfHwgJ1xcclxcbicpXG4gICAgICAucmVwbGFjZSgvJm5ic3A7L2csICcgJylcbiAgICAgIC5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJylcbiAgICAgIC5yZXBsYWNlKC8mIzM5Oy9nLCBcIidcIilcbiAgICAgIC5yZXBsYWNlKC8mbHQ7L2csICc8JylcbiAgICAgIC5yZXBsYWNlKC8mZ3Q7L2csICc+JylcbiAgICAgIC5yZXBsYWNlKC8mYW1wOy9nLCAnJicpO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBQYXJzZXMgY2FwdGlvbnMgaW4gU0FNSSBmb3JtYXQgKC5zbWkpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgY2FwdGlvbnMgPSBbIF07XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICBcbiAgdmFyIHRpdGxlID0gL1xcPFRJVExFW15cXD5dKlxcPihbXFxzXFxTXSopXFw8XFwvVElUTEVcXD4vZ2kuZXhlYyhjb250ZW50KTtcbiAgaWYgKHRpdGxlKSB7XG4gICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgY2FwdGlvbi50eXBlID0gXCJtZXRhXCI7XG4gICAgY2FwdGlvbi5uYW1lID0gXCJ0aXRsZVwiO1xuICAgIGNhcHRpb24uZGF0YSA9IHRpdGxlWzFdLnJlcGxhY2UoL15bXFxzXFxyXFxuXSovZywgXCJcIikucmVwbGFjZSgvW1xcc1xcclxcbl0qJC9nLCBcIlwiKTtcbiAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICB9XG4gIFxuICB2YXIgc3R5bGUgPSAvXFw8U1RZTEVbXlxcPl0qXFw+KFtcXHNcXFNdKilcXDxcXC9TVFlMRVxcPi9naS5leGVjKGNvbnRlbnQpO1xuICBpZiAoc3R5bGUpIHtcbiAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICBjYXB0aW9uLnR5cGUgPSBcIm1ldGFcIjtcbiAgICBjYXB0aW9uLm5hbWUgPSBcInN0eWxlXCI7XG4gICAgY2FwdGlvbi5kYXRhID0gc3R5bGVbMV07XG4gICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgfVxuICBcbiAgdmFyIHNhbWkgPSBjb250ZW50XG4gICAgLnJlcGxhY2UoL15bXFxzXFxTXSpcXDxCT0RZW15cXD5dKlxcPi9naSwgXCJcIikgLy9SZW1vdmUgY29udGVudCBiZWZvcmUgYm9keVxuICAgIC5yZXBsYWNlKC9cXDxcXC9CT0RZW15cXD5dKlxcPltcXHNcXFNdKiQvZ2ksIFwiXCIpOyAvL1JlbW92ZSBjb250ZW50IGFmdGVyIGJvZHlcbiAgICBcbiAgdmFyIHByZXYgPSBudWxsO1xuICB2YXIgcGFydHMgPSBzYW1pLnNwbGl0KC9cXDxTWU5DL2dpKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghcGFydHNbaV0gfHwgcGFydHNbaV0udHJpbSgpLmxlbmd0aCA9PSAwKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHBhcnQgPSAnPFNZTkMnICsgcGFydHNbaV07XG4gICAgXG4gICAgLy88U1lOQyBTdGFydCA9IDEwMDA+XG4gICAgdmFyIG1hdGNoID0gL15cXDxTWU5DW15cXD5dK1N0YXJ0XFxzKj1cXHMqW1wiJ10/KFxcZCspW1wiJ10/W15cXD5dKlxcPihbXFxzXFxTXSopL2dpLmV4ZWMocGFydCk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICAgIGNhcHRpb24udHlwZSA9IFwiY2FwdGlvblwiO1xuICAgICAgY2FwdGlvbi5zdGFydCA9IHBhcnNlSW50KG1hdGNoWzFdKTtcbiAgICAgIGNhcHRpb24uZW5kID0gY2FwdGlvbi5zdGFydCArIDIwMDA7XG4gICAgICBjYXB0aW9uLmR1cmF0aW9uID0gY2FwdGlvbi5lbmQgLSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgY2FwdGlvbi5jb250ZW50ID0gbWF0Y2hbMl0ucmVwbGFjZSgvXlxcPFxcL1NZTkNbXlxcPl0qPi9naSwgXCJcIik7XG4gICAgICBcbiAgICAgIHZhciBibGFuayA9IHRydWU7XG4gICAgICB2YXIgcCA9IC9eXFw8UFteXFw+XStDbGFzc1xccyo9XFxzKltcIiddPyhbXFx3XFxkXFwtX10rKVtcIiddP1teXFw+XSpcXD4oW1xcc1xcU10qKS9naS5leGVjKGNhcHRpb24uY29udGVudCk7XG4gICAgICBpZiAoIXApIHtcbiAgICAgICAgcCA9IC9eXFw8UChbXlxcPl0qKVxcPihbXFxzXFxTXSopL2dpLmV4ZWMoY2FwdGlvbi5jb250ZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChwKSB7XG4gICAgICAgIHZhciBodG1sID0gcFsyXS5yZXBsYWNlKC9cXDxQW1xcc1xcU10rJC9naSwgXCJcIik7IC8vUmVtb3ZlIHN0cmluZyBhZnRlciBhbm90aGVyIDxQPiB0YWdcbiAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZSgvXFw8QlJcXHMqXFwvP1xcPltcXHNcXHJcXG5dKy9naSwgZW9sKS5yZXBsYWNlKC9cXDxCUlxccypcXC8/XFw+L2dpLCBlb2wpLnJlcGxhY2UoL1xcPFteXFw+XStcXD4vZywgXCJcIik7IC8vUmVtb3ZlIGFsbCB0YWdzXG4gICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UoL15bXFxzXFxyXFxuXSsvZywgXCJcIikucmVwbGFjZSgvW1xcc1xcclxcbl0rJC9nLCBcIlwiKTsgLy9UcmltIG5ldyBsaW5lcyBhbmQgc3BhY2VzXG4gICAgICAgIGJsYW5rID0gKGh0bWwucmVwbGFjZSgvJm5ic3A7L2dpLCBcIiBcIikucmVwbGFjZSgvW1xcc1xcclxcbl0rL2csIFwiXCIpLmxlbmd0aCA9PSAwKTtcbiAgICAgICAgY2FwdGlvbi50ZXh0ICA9IGhlbHBlci5odG1sRGVjb2RlKGh0bWwsIGVvbCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICghb3B0aW9ucy5wcmVzZXJ2ZVNwYWNlcyAmJiBibGFuaykge1xuICAgICAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJJTkZPOiBTa2lwcGluZyB3aGl0ZSBzcGFjZSBjYXB0aW9uIGF0IFwiICsgY2FwdGlvbi5zdGFydCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvL1VwZGF0ZSBwcmV2aW91c1xuICAgICAgaWYgKHByZXYpIHtcbiAgICAgICAgcHJldi5lbmQgPSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgICBwcmV2LmR1cmF0aW9uID0gcHJldi5lbmQgLSBwcmV2LnN0YXJ0O1xuICAgICAgfVxuICAgICAgcHJldiA9IGNhcHRpb247XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBVbmtub3duIHBhcnRcIiwgcGFydHNbaV0pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGNhcHRpb25zO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGNhcHRpb25zIGluIFNBTUkgZm9ybWF0ICguc21pKVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGJ1aWxkKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICBcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9ICc8U0FNST4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8SEVBRD4nICsgZW9sO1xuICBjb250ZW50ICs9ICc8VElUTEU+JyArIChvcHRpb25zLnRpdGxlIHx8IFwiXCIpICsgJzwvVElUTEU+JyArIGVvbDtcbiAgY29udGVudCArPSAnPFNUWUxFIFRZUEU9XCJ0ZXh0L2Nzc1wiPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzwhLS0nICsgZW9sO1xuICBjb250ZW50ICs9ICdQIHsgZm9udC1mYW1pbHk6IEFyaWFsOyBmb250LXdlaWdodDogbm9ybWFsOyBjb2xvcjogd2hpdGU7IGJhY2tncm91bmQtY29sb3I6IGJsYWNrOyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0nICsgZW9sO1xuICBjb250ZW50ICs9ICcuTEFORyB7IE5hbWU6ICcgKyAob3B0aW9ucy5sYW5nTmFtZSB8fCBcIkVuZ2xpc2hcIikgKyAnOyBsYW5nOiAnICsgKG9wdGlvbnMubGFuZ0NvZGUgfHwgXCJlbi1VU1wiKSArICc7IFNBTUlUeXBlOiBDQzsgfScgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJy0tPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzwvU1RZTEU+JyArIGVvbDtcbiAgY29udGVudCArPSAnPC9IRUFEPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzxCT0RZPicgKyBlb2w7XG4gIFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAoY2FwdGlvbi50eXBlID09IFwibWV0YVwiKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICAvL1N0YXJ0IG9mIGNhcHRpb25cbiAgICAgIGNvbnRlbnQgKz0gJzxTWU5DIFN0YXJ0PScgKyBjYXB0aW9uLnN0YXJ0ICsgJz4nICsgZW9sO1xuICAgICAgY29udGVudCArPSAnICA8UCBDbGFzcz1MQU5HPicgKyBoZWxwZXIuaHRtbEVuY29kZShjYXB0aW9uLnRleHQgfHwgXCJcIikgKyAob3B0aW9ucy5jbG9zZVRhZ3MgPyAnPC9QPicgOiBcIlwiKSArIGVvbDtcbiAgICAgIGlmIChvcHRpb25zLmNsb3NlVGFncykge1xuICAgICAgICBjb250ZW50ICs9ICc8L1NZTkM+JyArIGVvbDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy9CbGFuayBsaW5lIGluZGljYXRlcyB0aGUgZW5kIG9mIGNhcHRpb25cbiAgICAgIGNvbnRlbnQgKz0gJzxTWU5DIFN0YXJ0PScgKyBjYXB0aW9uLmVuZCArICc+JyArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gJyAgPFAgQ2xhc3M9TEFORz4nICsgJyZuYnNwOycgKyAob3B0aW9ucy5jbG9zZVRhZ3MgPyAnPC9QPicgOiBcIlwiKSArIGVvbDtcbiAgICAgIGlmIChvcHRpb25zLmNsb3NlVGFncykge1xuICAgICAgICBjb250ZW50ICs9ICc8L1NZTkM+JyArIGVvbDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0tJUDpcIiwgY2FwdGlvbik7XG4gICAgfVxuICB9XG5cbiAgY29udGVudCArPSAnPC9CT0RZPicgKyBlb2w7XG4gIGNvbnRlbnQgKz0gJzwvU0FNST4nICsgZW9sO1xuICBcbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKC9cXDxTQU1JW15cXD5dKlxcPltcXHNcXFNdKlxcPEJPRFlbXlxcPl0qXFw+L2cudGVzdChjb250ZW50KSkge1xuICAgICAgLypcbiAgICAgIDxTQU1JPlxuICAgICAgPEJPRFk+XG4gICAgICA8U1lOQyBTdGFydD0uLi5cbiAgICAgIC4uLlxuICAgICAgPC9CT0RZPlxuICAgICAgPC9TQU1JPlxuICAgICAgKi9cbiAgICAgIHJldHVybiBcInNtaVwiO1xuICAgIH1cbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRXhwb3J0XG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5hbWU6IEZPUk1BVF9OQU1FLFxuICBoZWxwZXI6IGhlbHBlcixcbiAgZGV0ZWN0OiBkZXRlY3QsXG4gIHBhcnNlOiBwYXJzZSxcbiAgYnVpbGQ6IGJ1aWxkXG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIEZPUk1BVF9OQU1FID0gXCJzcnRcIjtcblxudmFyIGhlbHBlciA9IHtcbiAgdG9NaWxsaXNlY29uZHM6IGZ1bmN0aW9uKHMpIHtcbiAgICB2YXIgbWF0Y2ggPSAvXlxccyooXFxkezEsMn0pOihcXGR7MSwyfSk6KFxcZHsxLDJ9KShbLixdKFxcZHsxLDN9KSk/XFxzKiQvLmV4ZWMocyk7XG4gICAgdmFyIGhoID0gcGFyc2VJbnQobWF0Y2hbMV0pO1xuICAgIHZhciBtbSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcbiAgICB2YXIgc3MgPSBwYXJzZUludChtYXRjaFszXSk7XG4gICAgdmFyIGZmID0gbWF0Y2hbNV0gPyBwYXJzZUludChtYXRjaFs1XSkgOiAwO1xuICAgIHZhciBtcyA9IGhoICogMzYwMCAqIDEwMDAgKyBtbSAqIDYwICogMTAwMCArIHNzICogMTAwMCArIGZmO1xuICAgIHJldHVybiBtcztcbiAgfSxcbiAgdG9UaW1lU3RyaW5nOiBmdW5jdGlvbihtcykge1xuICAgIHZhciBoaCA9IE1hdGguZmxvb3IobXMgLyAxMDAwIC8gMzYwMCk7XG4gICAgdmFyIG1tID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyA2MCAlIDYwKTtcbiAgICB2YXIgc3MgPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAlIDYwKTtcbiAgICB2YXIgZmYgPSBNYXRoLmZsb29yKG1zICUgMTAwMCk7XG4gICAgdmFyIHRpbWUgPSAoaGggPCAxMCA/IFwiMFwiIDogXCJcIikgKyBoaCArIFwiOlwiICsgKG1tIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgbW0gKyBcIjpcIiArIChzcyA8IDEwID8gXCIwXCIgOiBcIlwiKSArIHNzICsgXCIsXCIgKyAoZmYgPCAxMDAgPyBcIjBcIiA6IFwiXCIpICsgKGZmIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgZmY7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBTdWJSaXAgZm9ybWF0ICguc3J0KVxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIHBhcnNlKGNvbnRlbnQsIG9wdGlvbnMpIHtcbiAgdmFyIGNhcHRpb25zID0gWyBdO1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgdmFyIHBhcnRzID0gY29udGVudC5zcGxpdCgvXFxyP1xcblxccytcXHI/XFxuL2cpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlZ2V4ID0gL14oXFxkKylcXHI/XFxuKFxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccypcXC1cXC1cXD5cXHMqKFxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccj9cXG4oW1xcc1xcU10qKShcXHI/XFxuKSokL2dpO1xuICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFydHNbaV0pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICBjYXB0aW9uLnR5cGUgPSBcImNhcHRpb25cIjtcbiAgICAgIGNhcHRpb24uaW5kZXggPSBwYXJzZUludChtYXRjaFsxXSk7XG4gICAgICBjYXB0aW9uLnN0YXJ0ID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzJdKTtcbiAgICAgIGNhcHRpb24uZW5kID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKG1hdGNoWzRdKTtcbiAgICAgIGNhcHRpb24uZHVyYXRpb24gPSBjYXB0aW9uLmVuZCAtIGNhcHRpb24uc3RhcnQ7XG4gICAgICB2YXIgbGluZXMgPSBtYXRjaFs2XS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgY2FwdGlvbi5jb250ZW50ID0gbGluZXMuam9pbihlb2wpO1xuICAgICAgY2FwdGlvbi50ZXh0ID0gY2FwdGlvbi5jb250ZW50XG4gICAgICAgIC5yZXBsYWNlKC9cXDxbXlxcPl0rXFw+L2csIFwiXCIpIC8vPGI+Ym9sZDwvYj4gb3IgPGk+aXRhbGljPC9pPlxuICAgICAgICAucmVwbGFjZSgvXFx7W15cXH1dK1xcfS9nLCBcIlwiKSAvL3tifWJvbGR7L2J9IG9yIHtpfWl0YWxpY3svaX1cbiAgICAgICAgLnJlcGxhY2UoL1xcPlxcPlxccypbXjpdKjpcXHMqL2csIFwiXCIpOyAvLz4+IFNQRUFLRVIgTkFNRTogXG4gICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiV0FSTjogVW5rbm93biBwYXJ0XCIsIHBhcnRzW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhcHRpb25zO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGNhcHRpb25zIGluIFN1YlJpcCBmb3JtYXQgKC5zcnQpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gYnVpbGQoY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgdmFyIHNydCA9IFwiXCI7XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAodHlwZW9mIGNhcHRpb24udHlwZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjYXB0aW9uLnR5cGUgPT0gXCJjYXB0aW9uXCIpIHtcbiAgICAgIHNydCArPSAoaSArIDEpLnRvU3RyaW5nKCkgKyBlb2w7XG4gICAgICBzcnQgKz0gaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLnN0YXJ0KSArIFwiIC0tPiBcIiArIGhlbHBlci50b1RpbWVTdHJpbmcoY2FwdGlvbi5lbmQpICsgZW9sO1xuICAgICAgc3J0ICs9IGNhcHRpb24udGV4dCArIGVvbDtcbiAgICAgIHNydCArPSBlb2w7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJTS0lQOlwiLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBzcnQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgaWYgKC9cXGQrXFxyP1xcblxcZHsxLDJ9OlxcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/XFxzKlxcLVxcLVxcPlxccypcXGR7MSwyfTpcXGR7MSwyfTpcXGR7MSwyfShbLixdXFxkezEsM30pPy9nLnRlc3QoY29udGVudCkpIHtcbiAgICAgIC8qXG4gICAgICAzXG4gICAgICAwMDowNDo0OCwyODAgLS0+IDAwOjA0OjUwLDUxMFxuICAgICAgU2lzdGVyLCBwZXJmdW1lP1xuICAgICAgKi9cbiAgICAgIHJldHVybiBGT1JNQVRfTkFNRTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEV4cG9ydFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBGT1JNQVRfTkFNRSxcbiAgaGVscGVyOiBoZWxwZXIsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwic3NhXCI7XG5cbnZhciBoZWxwZXIgPSB7XG4gIHRvTWlsbGlzZWNvbmRzOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG1hdGNoID0gL15cXHMqKFxcZCs6KT8oXFxkezEsMn0pOihcXGR7MSwyfSkoWy4sXShcXGR7MSwzfSkpP1xccyokLy5leGVjKHMpO1xuICAgIHZhciBoaCA9IG1hdGNoWzFdID8gcGFyc2VJbnQobWF0Y2hbMV0ucmVwbGFjZShcIjpcIiwgXCJcIikpIDogMDtcbiAgICB2YXIgbW0gPSBwYXJzZUludChtYXRjaFsyXSk7XG4gICAgdmFyIHNzID0gcGFyc2VJbnQobWF0Y2hbM10pO1xuICAgIHZhciBmZiA9IG1hdGNoWzVdID8gcGFyc2VJbnQobWF0Y2hbNV0pIDogMDtcbiAgICB2YXIgbXMgPSBoaCAqIDM2MDAgKiAxMDAwICsgbW0gKiA2MCAqIDEwMDAgKyBzcyAqIDEwMDAgKyBmZiAqIDEwO1xuICAgIHJldHVybiBtcztcbiAgfSxcbiAgdG9UaW1lU3RyaW5nOiBmdW5jdGlvbihtcykge1xuICAgIHZhciBoaCA9IE1hdGguZmxvb3IobXMvIDEwMDAgLyAzNjAwKTtcbiAgICB2YXIgbW0gPSBNYXRoLmZsb29yKG1zLyAxMDAwIC8gNjAgJSA2MCk7XG4gICAgdmFyIHNzID0gTWF0aC5mbG9vcihtcy8gMTAwMCAlIDYwKTtcbiAgICB2YXIgZmYgPSBNYXRoLmZsb29yKG1zICUgMTAwMCAvIDEwKTsgLy8yIGRpZ2l0c1xuICAgIHZhciB0aW1lID0gaGggKyBcIjpcIiArIChtbSA8IDEwID8gXCIwXCIgOiBcIlwiKSArIG1tICsgXCI6XCIgKyAoc3MgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBzcyArIFwiLlwiICsgKGZmIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgZmY7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIFBhcnNlcyBjYXB0aW9ucyBpbiBTdWJTdGF0aW9uIEFscGhhIGZvcm1hdCAoLnNzYSlcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBwYXJzZShjb250ZW50LCBvcHRpb25zKSB7XG4gIHZhciBtZXRhO1xuICB2YXIgY29sdW1ucyA9IG51bGw7XG4gIHZhciBjYXB0aW9ucyA9IFsgXTtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBwYXJ0cyA9IGNvbnRlbnQuc3BsaXQoL1xccj9cXG5cXHMqXFxyP1xcbi8pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlZ2V4ID0gL15cXHMqXFxbKFteXFxdXSspXFxdXFxyP1xcbihbXFxzXFxTXSopKFxccj9cXG4pKiQvZ2k7XG4gICAgdmFyIG1hdGNoID0gcmVnZXguZXhlYyhwYXJ0c1tpXSk7XG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB2YXIgdGFnID0gbWF0Y2hbMV07XG4gICAgICB2YXIgbGluZXMgPSBtYXRjaFsyXS5zcGxpdCgvXFxyP1xcbi8pO1xuICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBsaW5lcy5sZW5ndGg7IGwrKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2xdO1xuICAgICAgICBpZiAoL15cXHMqOy8udGVzdChsaW5lKSkge1xuICAgICAgICAgIGNvbnRpbnVlOyAvL1NraXAgY29tbWVudFxuICAgICAgICB9XG4gICAgICAgIHZhciBtID0gL15cXHMqKFteOl0rKTpcXHMqKC4qKShcXHI/XFxuKT8kLy5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgIGlmICh0YWcgPT0gXCJTY3JpcHQgSW5mb1wiKSB7XG4gICAgICAgICAgICBpZiAoIW1ldGEpIHtcbiAgICAgICAgICAgICAgbWV0YSA9IHsgfTtcbiAgICAgICAgICAgICAgbWV0YS50eXBlID0gXCJtZXRhXCI7XG4gICAgICAgICAgICAgIG1ldGEuZGF0YSA9IHsgfTtcbiAgICAgICAgICAgICAgY2FwdGlvbnMucHVzaChtZXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuYW1lID0gbVsxXS50cmltKCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBtWzJdLnRyaW0oKTtcbiAgICAgICAgICAgIG1ldGEuZGF0YVtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0YWcgPT0gXCJWNCBTdHlsZXNcIiB8fCB0YWcgPT0gXCJWNCsgU3R5bGVzXCIpIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gbVsxXS50cmltKCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBtWzJdLnRyaW0oKTtcbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiRm9ybWF0XCIpIHtcbiAgICAgICAgICAgICAgY29sdW1ucyA9IHZhbHVlLnNwbGl0KC9cXHMqLFxccyovZyk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJTdHlsZVwiKSB7XG4gICAgICAgICAgICAgIHZhciB2YWx1ZXMgPSB2YWx1ZS5zcGxpdCgvXFxzKixcXHMqL2cpO1xuICAgICAgICAgICAgICB2YXIgY2FwdGlvbiA9IHsgfTtcbiAgICAgICAgICAgICAgY2FwdGlvbi50eXBlID0gXCJzdHlsZVwiO1xuICAgICAgICAgICAgICBjYXB0aW9uLmRhdGEgPSB7IH07XG4gICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY29sdW1ucy5sZW5ndGggJiYgYyA8IHZhbHVlcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGNhcHRpb24uZGF0YVtjb2x1bW5zW2NdXSA9IHZhbHVlc1tjXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRhZyA9PSBcIkV2ZW50c1wiKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IG1bMV0udHJpbSgpO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gbVsyXS50cmltKCk7XG4gICAgICAgICAgICBpZiAobmFtZSA9PSBcIkZvcm1hdFwiKSB7XG4gICAgICAgICAgICAgIGNvbHVtbnMgPSB2YWx1ZS5zcGxpdCgvXFxzKixcXHMqL2cpO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuYW1lID09IFwiRGlhbG9ndWVcIikge1xuICAgICAgICAgICAgICB2YXIgdmFsdWVzID0gdmFsdWUuc3BsaXQoL1xccyosXFxzKi9nKTtcbiAgICAgICAgICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICAgICAgICAgIGNhcHRpb24udHlwZSA9IFwiY2FwdGlvblwiO1xuICAgICAgICAgICAgICBjYXB0aW9uLmRhdGEgPSB7IH07XG4gICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgY29sdW1ucy5sZW5ndGggJiYgYyA8IHZhbHVlcy5sZW5ndGg7IGMrKykge1xuICAgICAgICAgICAgICAgIGNhcHRpb24uZGF0YVtjb2x1bW5zW2NdXSA9IHZhbHVlc1tjXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXB0aW9uLnN0YXJ0ID0gaGVscGVyLnRvTWlsbGlzZWNvbmRzKGNhcHRpb24uZGF0YVtcIlN0YXJ0XCJdKTtcbiAgICAgICAgICAgICAgY2FwdGlvbi5lbmQgPSBoZWxwZXIudG9NaWxsaXNlY29uZHMoY2FwdGlvbi5kYXRhW1wiRW5kXCJdKTtcbiAgICAgICAgICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgICAgICAgICAgY2FwdGlvbi5jb250ZW50ID0gY2FwdGlvbi5kYXRhW1wiVGV4dFwiXTtcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vV29yay1hcm91bmQgZm9yIG1pc3NpbmcgdGV4dCAod2hlbiB0aGUgdGV4dCBjb250YWlucyAnLCcgY2hhcilcbiAgICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UG9zaXRpb24ocywgc2VhcmNoLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnNwbGl0KHNlYXJjaCwgaW5kZXgpLmpvaW4oc2VhcmNoKS5sZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGluZGV4T2ZUZXh0ID0gZ2V0UG9zaXRpb24odmFsdWUsICcsJywgY29sdW1ucy5sZW5ndGggLSAxKSArIDE7XG4gICAgICAgICAgICAgIGNhcHRpb24uY29udGVudCA9IHZhbHVlLnN1YnN0cihpbmRleE9mVGV4dCk7XG4gICAgICAgICAgICAgIGNhcHRpb24uZGF0YVtcIlRleHRcIl0gPSBjYXB0aW9uLmNvbnRlbnQ7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXE4vZywgZW9sKSAvL1wiXFxOXCIgZm9yIG5ldyBsaW5lXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xce1teXFx9XStcXH0vZywgXCJcIik7IC8ve1xccG9zKDQwMCw1NzApfVxuICAgICAgICAgICAgICBjYXB0aW9ucy5wdXNoKGNhcHRpb24pO1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBVbmtub3duIHBhcnRcIiwgcGFydHNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FwdGlvbnM7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCdWlsZHMgY2FwdGlvbnMgaW4gU3ViU3RhdGlvbiBBbHBoYSBmb3JtYXQgKC5zc2EpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gYnVpbGQoY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIHZhciBhc3MgPSBvcHRpb25zLmZvcm1hdCA9PSBcImFzc1wiO1xuICBcbiAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICBjb250ZW50ICs9IFwiW1NjcmlwdCBJbmZvXVwiICsgZW9sO1xuICBjb250ZW50ICs9IFwiOyBTY3JpcHQgZ2VuZXJhdGVkIGJ5IHN1YnNydCBcIiArIGVvbDtcbiAgY29udGVudCArPSBcIlNjcmlwdFR5cGU6IHY0LjAwXCIgKyAoYXNzID8gXCIrXCIgOiBcIlwiKSArIGVvbDtcbiAgY29udGVudCArPSBcIkNvbGxpc2lvbnM6IE5vcm1hbFwiICsgZW9sO1xuICBjb250ZW50ICs9IGVvbDtcbiAgaWYgKGFzcykge1xuICAgIGNvbnRlbnQgKz0gXCJbVjQrIFN0eWxlc11cIiArIGVvbDtcbiAgICBjb250ZW50ICs9IFwiRm9ybWF0OiBOYW1lLCBGb250bmFtZSwgRm9udHNpemUsIFByaW1hcnlDb2xvdXIsIFNlY29uZGFyeUNvbG91ciwgT3V0bGluZUNvbG91ciwgQmFja0NvbG91ciwgQm9sZCwgSXRhbGljLCBVbmRlcmxpbmUsIFN0cmlrZU91dCwgU2NhbGVYLCBTY2FsZVksIFNwYWNpbmcsIEFuZ2xlLCBCb3JkZXJTdHlsZSwgT3V0bGluZSwgU2hhZG93LCBBbGlnbm1lbnQsIE1hcmdpbkwsIE1hcmdpblIsIE1hcmdpblYsIEVuY29kaW5nXCIgKyBlb2w7XG4gICAgY29udGVudCArPSBcIlN0eWxlOiBEZWZhdWx0VkNELCBBcmlhbCwyOCwmSDAwQjRGQ0ZDLCZIMDBCNEZDRkMsJkgwMDAwMDAwOCwmSDgwMDAwMDA4LC0xLDAsMCwwLDEwMCwxMDAsMC4wMCwwLjAwLDEsMS4wMCwyLjAwLDIsMzAsMzAsMzAsMFwiICsgZW9sO1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnRlbnQgKz0gXCJbVjQgU3R5bGVzXVwiICsgZW9sO1xuICAgIGNvbnRlbnQgKz0gXCJGb3JtYXQ6IE5hbWUsIEZvbnRuYW1lLCBGb250c2l6ZSwgUHJpbWFyeUNvbG91ciwgU2Vjb25kYXJ5Q29sb3VyLCBUZXJ0aWFyeUNvbG91ciwgQmFja0NvbG91ciwgQm9sZCwgSXRhbGljLCBCb3JkZXJTdHlsZSwgT3V0bGluZSwgU2hhZG93LCBBbGlnbm1lbnQsIE1hcmdpbkwsIE1hcmdpblIsIE1hcmdpblYsIEFscGhhTGV2ZWwsIEVuY29kaW5nXCIgKyBlb2w7XG4gICAgY29udGVudCArPSBcIlN0eWxlOiBEZWZhdWx0VkNELCBBcmlhbCwyOCwxMTg2MTI0NCwxMTg2MTI0NCwxMTg2MTI0NCwtMjE0NzQ4MzY0MCwtMSwwLDEsMSwyLDIsMzAsMzAsMzAsMCwwXCIgKyBlb2w7XG4gIH1cbiAgY29udGVudCArPSBlb2w7XG4gIGNvbnRlbnQgKz0gXCJbRXZlbnRzXVwiICsgZW9sO1xuICBjb250ZW50ICs9IFwiRm9ybWF0OiBcIiArIChhc3MgPyBcIkxheWVyXCIgOiBcIk1hcmtlZFwiKSArIFwiLCBTdGFydCwgRW5kLCBTdHlsZSwgTmFtZSwgTWFyZ2luTCwgTWFyZ2luUiwgTWFyZ2luViwgRWZmZWN0LCBUZXh0XCIgKyBlb2w7XG4gIFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAoY2FwdGlvbi50eXBlID09IFwibWV0YVwiKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICBjb250ZW50ICs9IFwiRGlhbG9ndWU6IFwiICsgKGFzcyA/IFwiMFwiIDogXCJNYXJrZWQ9MFwiKSArIFwiLFwiICsgaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLnN0YXJ0KSArIFwiLFwiICsgaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLmVuZCkgKyBcIixEZWZhdWx0VkNELCBOVFAsMDAwMCwwMDAwLDAwMDAsLFwiICsgY2FwdGlvbi50ZXh0LnJlcGxhY2UoL1xccj9cXG4vZywgXCJcXFxcTlwiKSArIGVvbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlNLSVA6XCIsIGNhcHRpb24pO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGNvbnRlbnQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gZGV0ZWN0KGNvbnRlbnQpIHtcbiAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgc3RyaW5nIGNvbnRlbnQhXCIpO1xuICB9XG4gIFxuICBpZiAoL15bXFxzXFxyXFxuXSpcXFtTY3JpcHQgSW5mb1xcXVxccj9cXG4vZy50ZXN0KGNvbnRlbnQpICYmIC9bXFxzXFxyXFxuXSpcXFtFdmVudHNcXF1cXHI/XFxuL2cudGVzdChjb250ZW50KSkge1xuICAgIC8qXG4gICAgW1NjcmlwdCBJbmZvXVxuICAgIC4uLlxuICAgIFtFdmVudHNdXG4gICAgKi9cbiAgICBcbiAgICAvL0FkdmFuY2VkIChWNCspIHN0eWxlcyBmb3IgQVNTIGZvcm1hdFxuICAgIHJldHVybiBjb250ZW50LmluZGV4T2YoXCJbVjQrIFN0eWxlc11cIikgPiAwID8gXCJhc3NcIiA6IFwic3NhXCI7XG4gIH1cbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEV4cG9ydFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuICBuYW1lOiBGT1JNQVRfTkFNRSxcbiAgaGVscGVyOiBoZWxwZXIsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwic3ViXCI7XG52YXIgREVGQVVMVF9GUFMgPSAyNTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGNhcHRpb25zIGluIE1pY3JvRFZEIGZvcm1hdDogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTWljcm9EVkRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBwYXJzZShjb250ZW50LCBvcHRpb25zKSB7XG4gIHZhciBmcHMgPSBvcHRpb25zLmZwcyA+IDAgPyBvcHRpb25zLmZwcyA6IERFRkFVTFRfRlBTO1xuICB2YXIgY2FwdGlvbnMgPSBbIF07XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICB2YXIgcGFydHMgPSBjb250ZW50LnNwbGl0KC9cXHI/XFxuL2cpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHJlZ2V4ID0gL15cXHsoXFxkKylcXH1cXHsoXFxkKylcXH0oLiopJC9naTtcbiAgICB2YXIgbWF0Y2ggPSByZWdleC5leGVjKHBhcnRzW2ldKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJjYXB0aW9uXCI7XG4gICAgICBjYXB0aW9uLmluZGV4ID0gaSArIDE7XG4gICAgICBjYXB0aW9uLmZyYW1lID0ge1xuICAgICAgICBzdGFydDogcGFyc2VJbnQobWF0Y2hbMV0pLFxuICAgICAgICBlbmQ6IHBhcnNlSW50KG1hdGNoWzJdKVxuICAgICAgfTtcbiAgICAgIGNhcHRpb24uZnJhbWUuY291bnQgPSBjYXB0aW9uLmZyYW1lLmVuZCAtIGNhcHRpb24uZnJhbWUuc3RhcnQ7XG4gICAgICBjYXB0aW9uLnN0YXJ0ID0gTWF0aC5yb3VuZChjYXB0aW9uLmZyYW1lLnN0YXJ0IC8gZnBzKTtcbiAgICAgIGNhcHRpb24uZW5kID0gTWF0aC5yb3VuZChjYXB0aW9uLmZyYW1lLmVuZCAvIGZwcyk7XG4gICAgICBjYXB0aW9uLmR1cmF0aW9uID0gY2FwdGlvbi5lbmQgLSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgdmFyIGxpbmVzID0gbWF0Y2hbM10uc3BsaXQoL1xcfC9nKTtcbiAgICAgIGNhcHRpb24uY29udGVudCA9IGxpbmVzLmpvaW4oZW9sKTtcbiAgICAgIGNhcHRpb24udGV4dCA9IGNhcHRpb24uY29udGVudC5yZXBsYWNlKC9cXHtbXlxcfV0rXFx9L2csIFwiXCIpOyAvL3swfXsyNX17YzokMDAwMGZmfXt5OmIsdX17ZjpEZUphVnVTYW5zfXtzOjEyfUhlbGxvIVxuICAgICAgY2FwdGlvbnMucHVzaChjYXB0aW9uKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAob3B0aW9ucy52ZXJib3NlKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIldBUk46IFVua25vd24gcGFydFwiLCBwYXJ0c1tpXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYXB0aW9ucztcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIEJ1aWxkcyBjYXB0aW9ucyBpbiBNaWNyb0RWRCBmb3JtYXQ6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01pY3JvRFZEXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gYnVpbGQoY2FwdGlvbnMsIG9wdGlvbnMpIHtcbiAgdmFyIGZwcyA9IG9wdGlvbnMuZnBzID4gMCA/IG9wdGlvbnMuZnBzIDogREVGQVVMVF9GUFM7XG4gIFxuICB2YXIgc3ViID0gXCJcIjtcbiAgdmFyIGVvbCA9IG9wdGlvbnMuZW9sIHx8IFwiXFxyXFxuXCI7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FwdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2FwdGlvbiA9IGNhcHRpb25zW2ldO1xuICAgIGlmICh0eXBlb2YgY2FwdGlvbi50eXBlID09PSBcInVuZGVmaW5lZFwiIHx8IGNhcHRpb24udHlwZSA9PSBcImNhcHRpb25cIikge1xuICAgICAgdmFyIHN0YXJ0RnJhbWUgPSB0eXBlb2YgY2FwdGlvbi5mcmFtZSA9PSBcIm9iamVjdFwiICYmIGNhcHRpb24uZnJhbWUuc3RhcnQgPj0gMCA/IGNhcHRpb24uZnJhbWUuc3RhcnQgOiBjYXB0aW9uLnN0YXJ0ICogZnBzO1xuICAgICAgdmFyIGVuZEZyYW1lID0gdHlwZW9mIGNhcHRpb24uZnJhbWUgPT0gXCJvYmplY3RcIiAmJiBjYXB0aW9uLmZyYW1lLmVuZCA+PSAwID8gY2FwdGlvbi5mcmFtZS5lbmQgOiBjYXB0aW9uLmVuZCAqIGZwcztcbiAgICAgIHZhciB0ZXh0ID0gY2FwdGlvbi50ZXh0LnJlcGxhY2UoL1xccj9cXG4vLCBcInxcIik7XG4gICAgICBzdWIgKz0gXCJ7XCIgKyBzdGFydEZyYW1lICsgXCJ9XCIgKyBcIntcIiArIGVuZEZyYW1lICsgXCJ9XCIgKyB0ZXh0ICsgZW9sO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0tJUDpcIiwgY2FwdGlvbik7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gc3ViO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogRGV0ZWN0cyBhIHN1YnRpdGxlIGZvcm1hdCBmcm9tIHRoZSBjb250ZW50LlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbmZ1bmN0aW9uIGRldGVjdChjb250ZW50KSB7XG4gIGlmICh0eXBlb2YgY29udGVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGlmICgvXlxce1xcZCtcXH1cXHtcXGQrXFx9KC4qKS8udGVzdChjb250ZW50KSkge1xuICAgICAgLypcbiAgICAgIHs3MjA3fXs3MjYyfVNpc3RlciwgcGVyZnVtZT9cbiAgICAgICovXG4gICAgICByZXR1cm4gRk9STUFUX05BTUU7XG4gICAgfVxuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGRldGVjdDogZGV0ZWN0LFxuICBwYXJzZTogcGFyc2UsXG4gIGJ1aWxkOiBidWlsZFxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBGT1JNQVRfTkFNRSA9IFwidnR0XCI7XG5cbnZhciBoZWxwZXIgPSB7XG4gIHRvTWlsbGlzZWNvbmRzOiBmdW5jdGlvbihzKSB7XG4gICAgdmFyIG1hdGNoID0gL15cXHMqKFxcZHsxLDJ9Oik/KFxcZHsxLDJ9KTooXFxkezEsMn0pKFsuLF0oXFxkezEsM30pKT9cXHMqJC8uZXhlYyhzKTtcbiAgICB2YXIgaGggPSBtYXRjaFsxXSA/IHBhcnNlSW50KG1hdGNoWzFdLnJlcGxhY2UoXCI6XCIsIFwiXCIpKSA6IDA7XG4gICAgdmFyIG1tID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xuICAgIHZhciBzcyA9IHBhcnNlSW50KG1hdGNoWzNdKTtcbiAgICB2YXIgZmYgPSBtYXRjaFs1XSA/IHBhcnNlSW50KG1hdGNoWzVdKSA6IDA7XG4gICAgdmFyIG1zID0gaGggKiAzNjAwICogMTAwMCArIG1tICogNjAgKiAxMDAwICsgc3MgKiAxMDAwICsgZmY7XG4gICAgcmV0dXJuIG1zO1xuICB9LFxuICB0b1RpbWVTdHJpbmc6IGZ1bmN0aW9uKG1zKSB7XG4gICAgdmFyIGhoID0gTWF0aC5mbG9vcihtcyAvIDEwMDAgLyAzNjAwKTtcbiAgICB2YXIgbW0gPSBNYXRoLmZsb29yKG1zIC8gMTAwMCAvIDYwICUgNjApO1xuICAgIHZhciBzcyA9IE1hdGguZmxvb3IobXMgLyAxMDAwICUgNjApO1xuICAgIHZhciBmZiA9IE1hdGguZmxvb3IobXMgJSAxMDAwKTtcbiAgICB2YXIgdGltZSA9IChoaCA8IDEwID8gXCIwXCIgOiBcIlwiKSArIGhoICsgXCI6XCIgKyAobW0gPCAxMCA/IFwiMFwiIDogXCJcIikgKyBtbSArIFwiOlwiICsgKHNzIDwgMTAgPyBcIjBcIiA6IFwiXCIpICsgc3MgKyBcIi5cIiArIChmZiA8IDEwMCA/IFwiMFwiIDogXCJcIikgKyAoZmYgPCAxMCA/IFwiMFwiIDogXCJcIikgKyBmZjtcbiAgICByZXR1cm4gdGltZTtcbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGNhcHRpb25zIGluIFdlYlZUVCBmb3JtYXQgKFdlYiBWaWRlbyBUZXh0IFRyYWNrcyBGb3JtYXQpXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuZnVuY3Rpb24gcGFyc2UoY29udGVudCwgb3B0aW9ucykge1xuICB2YXIgaW5kZXggPSAxO1xuICB2YXIgY2FwdGlvbnMgPSBbIF07XG4gIHZhciBlb2wgPSBvcHRpb25zLmVvbCB8fCBcIlxcclxcblwiO1xuICB2YXIgcGFydHMgPSBjb250ZW50LnNwbGl0KC9cXHI/XFxuXFxzK1xccj9cXG4vKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIC8vV2ViVlRUIGRhdGFcbiAgICB2YXIgcmVnZXggPSAvXihbXlxcclxcbl0rXFxyP1xcbik/KChcXGR7MSwyfTopP1xcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccypcXC1cXC1cXD5cXHMqKChcXGR7MSwyfTopP1xcZHsxLDJ9OlxcZHsxLDJ9KFsuLF1cXGR7MSwzfSk/KVxccj9cXG4oW1xcc1xcU10qKShcXHI/XFxuKSokL2dpO1xuICAgIHZhciBtYXRjaCA9IHJlZ2V4LmV4ZWMocGFydHNbaV0pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgdmFyIGNhcHRpb24gPSB7IH07XG4gICAgICBjYXB0aW9uLnR5cGUgPSBcImNhcHRpb25cIjtcbiAgICAgIGNhcHRpb24uaW5kZXggPSBpbmRleCsrO1xuICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgIGNhcHRpb24uY3VlID0gbWF0Y2hbMV0ucmVwbGFjZSgvW1xcclxcbl0qL2dpLCBcIlwiKTtcbiAgICAgIH1cbiAgICAgIGNhcHRpb24uc3RhcnQgPSBoZWxwZXIudG9NaWxsaXNlY29uZHMobWF0Y2hbMl0pO1xuICAgICAgY2FwdGlvbi5lbmQgPSBoZWxwZXIudG9NaWxsaXNlY29uZHMobWF0Y2hbNV0pO1xuICAgICAgY2FwdGlvbi5kdXJhdGlvbiA9IGNhcHRpb24uZW5kIC0gY2FwdGlvbi5zdGFydDtcbiAgICAgIHZhciBsaW5lcyA9IG1hdGNoWzhdLnNwbGl0KC9cXHI/XFxuLyk7XG4gICAgICBjYXB0aW9uLmNvbnRlbnQgPSBsaW5lcy5qb2luKGVvbCk7XG4gICAgICBjYXB0aW9uLnRleHQgPSBjYXB0aW9uLmNvbnRlbnRcbiAgICAgICAgLnJlcGxhY2UoL1xcPFteXFw+XStcXD4vZywgXCJcIikgLy88Yj5ib2xkPC9iPiBvciA8aT5pdGFsaWM8L2k+XG4gICAgICAgIC5yZXBsYWNlKC9cXHtbXlxcfV0rXFx9L2csIFwiXCIpOyAvL3tifWJvbGR7L2J9IG9yIHtpfWl0YWxpY3svaX1cbiAgICAgIGNhcHRpb25zLnB1c2goY2FwdGlvbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgLy9XZWJWVFQgbWV0YVxuICAgIHZhciBtZXRhID0gL14oW0EtWl0rKShcXHI/XFxuKFtcXHNcXFNdKikpPyQvLmV4ZWMocGFydHNbaV0pO1xuICAgIGlmICghbWV0YSkge1xuICAgICAgLy9UcnkgaW5saW5lIG1ldGFcbiAgICAgIG1ldGEgPSAvXihbQS1aXSspXFxzKyhbXlxcclxcbl0qKT8kLy5leGVjKHBhcnRzW2ldKTtcbiAgICB9XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHZhciBjYXB0aW9uID0geyB9O1xuICAgICAgY2FwdGlvbi50eXBlID0gXCJtZXRhXCI7XG4gICAgICBjYXB0aW9uLm5hbWUgPSBtZXRhWzFdO1xuICAgICAgaWYgKG1ldGFbM10pIHtcbiAgICAgICAgY2FwdGlvbi5kYXRhID0gbWV0YVszXTtcbiAgICAgIH1cbiAgICAgIGNhcHRpb25zLnB1c2goY2FwdGlvbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMudmVyYm9zZSkge1xuICAgICAgY29uc29sZS5sb2coXCJXQVJOOiBVbmtub3duIHBhcnRcIiwgcGFydHNbaV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2FwdGlvbnM7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBCdWlsZHMgY2FwdGlvbnMgaW4gV2ViVlRUIGZvcm1hdCAoV2ViIFZpZGVvIFRleHQgVHJhY2tzIEZvcm1hdClcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBidWlsZChjYXB0aW9ucywgb3B0aW9ucykge1xuICB2YXIgZW9sID0gb3B0aW9ucy5lb2wgfHwgXCJcXHJcXG5cIjtcbiAgdmFyIGNvbnRlbnQgPSBcIldFQlZUVFwiICsgZW9sICsgZW9sO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjYXB0aW9uc1tpXTtcbiAgICBpZiAoY2FwdGlvbi50eXBlID09IFwibWV0YVwiKSB7XG4gICAgICBpZiAoY2FwdGlvbi5uYW1lID09IFwiV0VCVlRUXCIpIGNvbnRpbnVlO1xuICAgICAgY29udGVudCArPSBjYXB0aW9uLm5hbWUgKyBlb2w7XG4gICAgICBjb250ZW50ICs9IGNhcHRpb24uZGF0YSA/IGNhcHRpb24uZGF0YSArIGVvbCA6IFwiXCI7XG4gICAgICBjb250ZW50ICs9IGVvbDtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBcbiAgICBpZiAodHlwZW9mIGNhcHRpb24udHlwZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBjYXB0aW9uLnR5cGUgPT0gXCJjYXB0aW9uXCIpIHtcbiAgICAgIGNvbnRlbnQgKz0gKGkgKyAxKS50b1N0cmluZygpICsgZW9sO1xuICAgICAgY29udGVudCArPSBoZWxwZXIudG9UaW1lU3RyaW5nKGNhcHRpb24uc3RhcnQpICsgXCIgLS0+IFwiICsgaGVscGVyLnRvVGltZVN0cmluZyhjYXB0aW9uLmVuZCkgKyBlb2w7XG4gICAgICBjb250ZW50ICs9IGNhcHRpb24udGV4dCArIGVvbDtcbiAgICAgIGNvbnRlbnQgKz0gZW9sO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIFxuICAgIGlmIChvcHRpb25zLnZlcmJvc2UpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU0tJUDpcIiwgY2FwdGlvbik7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gY29udGVudDtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIERldGVjdHMgYSBzdWJ0aXRsZSBmb3JtYXQgZnJvbSB0aGUgY29udGVudC5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5mdW5jdGlvbiBkZXRlY3QoY29udGVudCkge1xuICBpZiAodHlwZW9mIGNvbnRlbnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBzdHJpbmcgY29udGVudCFcIik7XG4gIH1cbiAgXG4gIGlmICgvXltcXHNcXHJcXG5dKldFQlZUVFxccj9cXG4vZy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgLypcbiAgICBXRUJWVFRcbiAgICAuLi5cbiAgICAqL1xuICAgIHJldHVybiBcInZ0dFwiO1xuICB9XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBFeHBvcnRcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbmFtZTogRk9STUFUX05BTUUsXG4gIGhlbHBlcjogaGVscGVyLFxuICBkZXRlY3Q6IGRldGVjdCxcbiAgcGFyc2U6IHBhcnNlLFxuICBidWlsZDogYnVpbGRcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdWJzcnQgPSB7XG4gIGZvcm1hdDogeyB9XG59O1xuXG5mdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIExvYWRzIHRoZSBzdWJ0aXRsZSBmb3JtYXQgcGFyc2VycyBhbmQgYnVpbGRlcnNcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgLy9Mb2FkIGluIHRoZSBwcmVkZWZpbmVkIG9yZGVyXG4gIHZhciBmb3JtYXRzID0gWyBcInZ0dFwiLCBcImxyY1wiLCBcInNtaVwiLCBcInNzYVwiLCBcImFzc1wiLCBcInN1YlwiLCBcInNydFwiLCBcInNidlwiLCBcImpzb25cIiBdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1hdHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZiA9IGZvcm1hdHNbaV07XG4gICAgdmFyIGhhbmRsZXIgPSByZXF1aXJlKCcuL2Zvcm1hdC8nICsgZiArICcuanMnKTtcbiAgICBzdWJzcnQuZm9ybWF0W2hhbmRsZXIubmFtZV0gPSBoYW5kbGVyO1xuICB9XG59KSgpO1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBHZXRzIGEgbGlzdCBvZiBzdXBwb3J0ZWQgc3VidGl0bGUgZm9ybWF0cy5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zdWJzcnQubGlzdCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMoc3Vic3J0LmZvcm1hdCk7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBEZXRlY3RzIGEgc3VidGl0bGUgZm9ybWF0IGZyb20gdGhlIGNvbnRlbnQuXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuc3Vic3J0LmRldGVjdCA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgdmFyIGZvcm1hdHMgPSBzdWJzcnQubGlzdCgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1hdHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZiA9IGZvcm1hdHNbaV07XG4gICAgdmFyIGhhbmRsZXIgPSBzdWJzcnQuZm9ybWF0W2ZdO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyLmRldGVjdCAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICAvL0Z1bmN0aW9uICdkZXRlY3QnIGNhbiByZXR1cm4gdHJ1ZSBvciBmb3JtYXQgbmFtZVxuICAgIHZhciBkID0gaGFuZGxlci5kZXRlY3QoY29udGVudCk7XG4gICAgaWYgKGQgPT09IHRydWUpIHsgLy9Mb2dpY2FsIHRydWVcbiAgICAgIHJldHVybiBmO1xuICAgIH1cbiAgICBpZiAoZiA9PSBkKSB7IC8vRm9ybWF0IG5hbWVcbiAgICAgIHJldHVybiBkO1xuICAgIH1cbiAgfVxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogUGFyc2VzIGEgc3VidGl0bGUgY29udGVudC5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5zdWJzcnQucGFyc2UgPSBmdW5jdGlvbihjb250ZW50LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHsgfTtcbiAgdmFyIGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0IHx8IHN1YnNydC5kZXRlY3QoY29udGVudCk7XG4gIGlmICghZm9ybWF0IHx8IGZvcm1hdC50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZGV0ZXJtaW5lIHN1YnRpdGxlIGZvcm1hdCFcIik7XG4gIH1cbiAgXG4gIHZhciBoYW5kbGVyID0gc3Vic3J0LmZvcm1hdFtmb3JtYXRdO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHN1YnRpdGxlIGZvcm1hdDogXCIgKyBmb3JtYXQpO1xuICB9XG4gIFxuICB2YXIgZnVuYyA9IGhhbmRsZXIucGFyc2U7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdWJ0aXRsZSBmb3JtYXQgZG9lcyBub3Qgc3VwcG9ydCAncGFyc2UnIG9wOiBcIiArIGZvcm1hdCk7XG4gIH1cbiAgXG4gIHJldHVybiBmdW5jKGNvbnRlbnQsIG9wdGlvbnMpO1xufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogQnVpbGRzIGEgc3VidGl0bGUgY29udGVudFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnN1YnNydC5idWlsZCA9IGZ1bmN0aW9uKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHsgfTtcbiAgdmFyIGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0IHx8IFwic3J0XCI7XG4gIGlmICghZm9ybWF0IHx8IGZvcm1hdC50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZGV0ZXJtaW5lIHN1YnRpdGxlIGZvcm1hdCFcIik7XG4gIH1cbiAgXG4gIHZhciBoYW5kbGVyID0gc3Vic3J0LmZvcm1hdFtmb3JtYXRdO1xuICBpZiAodHlwZW9mIGhhbmRsZXIgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlVuc3VwcG9ydGVkIHN1YnRpdGxlIGZvcm1hdDogXCIgKyBmb3JtYXQpO1xuICB9XG4gIFxuICB2YXIgZnVuYyA9IGhhbmRsZXIuYnVpbGQ7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTdWJ0aXRsZSBmb3JtYXQgZG9lcyBub3Qgc3VwcG9ydCAnYnVpbGQnIG9wOiBcIiArIGZvcm1hdCk7XG4gIH1cbiAgXG4gIHJldHVybiBmdW5jKGNhcHRpb25zLCBvcHRpb25zKTtcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIENvbnZlcnRzIHN1YnRpdGxlIGZvcm1hdFxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnN1YnNydC5jb252ZXJ0ID0gZnVuY3Rpb24oY29udGVudCwgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gXCJzdHJpbmdcIikge1xuICAgIG9wdGlvbnMgPSB7IHRvOiBvcHRpb25zIH07XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgeyB9O1xuICBcbiAgdmFyIG9wdCA9IGNsb25lKG9wdGlvbnMpO1xuICBkZWxldGUgb3B0LmZvcm1hdDtcbiAgXG4gIGlmIChvcHQuZnJvbSkge1xuICAgIG9wdC5mb3JtYXQgPSBvcHQuZnJvbTtcbiAgfVxuICBcbiAgdmFyIGNhcHRpb25zID0gc3Vic3J0LnBhcnNlKGNvbnRlbnQsIG9wdCk7XG4gIGlmIChvcHQucmVzeW5jKSB7XG4gICAgY2FwdGlvbnMgPSBzdWJzcnQucmVzeW5jKGNhcHRpb25zLCBvcHQucmVzeW5jKTtcbiAgfVxuICBcbiAgb3B0LmZvcm1hdCA9IG9wdC50byB8fCBvcHRpb25zLmZvcm1hdDtcbiAgdmFyIHJlc3VsdCA9IHN1YnNydC5idWlsZChjYXB0aW9ucywgb3B0KTtcbiAgXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBTaGlmdHMgdGhlIHRpbWUgb2YgdGhlIGNhcHRpb25zLlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbnN1YnNydC5yZXN5bmMgPSBmdW5jdGlvbihjYXB0aW9ucywgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7IH07XG4gIFxuICB2YXIgZnVuYywgcmF0aW8sIGZyYW1lLCBvZmZzZXQ7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBmdW5jID0gb3B0aW9uczsgLy9Vc2VyJ3MgZnVuY3Rpb24gdG8gaGFuZGxlIHRpbWUgc2hpZnRcbiAgfVxuICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcIm51bWJlclwiKSB7XG4gICAgb2Zmc2V0ID0gb3B0aW9uczsgLy9UaW1lIHNoaWZ0ICgrLy0gb2Zmc2V0KVxuICAgIGZ1bmMgPSBmdW5jdGlvbihhKSB7XG4gICAgICByZXR1cm4gWyBhWzBdICsgb2Zmc2V0LCBhWzFdICsgb2Zmc2V0IF07XG4gICAgfTtcbiAgfVxuICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucyA9PSBcIm9iamVjdFwiKSB7XG4gICAgb2Zmc2V0ID0gKG9wdGlvbnMub2Zmc2V0IHx8IDApICogKG9wdGlvbnMuZnJhbWUgPyBvcHRpb25zLmZwcyB8fCAyNSA6IDEpO1xuICAgIHJhdGlvID0gb3B0aW9ucy5yYXRpbyB8fCAxLjA7XG4gICAgZnJhbWUgPSBvcHRpb25zLmZyYW1lO1xuICAgIGZ1bmMgPSBmdW5jdGlvbihhKSB7XG4gICAgICByZXR1cm4gWyBNYXRoLnJvdW5kKGFbMF0gKiByYXRpbyArIG9mZnNldCksIE1hdGgucm91bmQoYVsxXSAqIHJhdGlvICsgb2Zmc2V0KSBdO1xuICAgIH07XG4gIH1cbiAgZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgJ29wdGlvbnMnIG5vdCBkZWZpbmVkIVwiKTtcbiAgfVxuICBcbiAgdmFyIHJlc3luY2VkID0gWyBdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNhcHRpb24gPSBjbG9uZShjYXB0aW9uc1tpXSk7XG4gICAgaWYgKHR5cGVvZiBjYXB0aW9uLnR5cGUgPT09IFwidW5kZWZpbmVkXCIgfHwgY2FwdGlvbi50eXBlID09IFwiY2FwdGlvblwiKSB7XG4gICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgdmFyIHNoaWZ0ID0gZnVuYyhbIGNhcHRpb24uZnJhbWUuc3RhcnQsIGNhcHRpb24uZnJhbWUuZW5kIF0pO1xuICAgICAgICBpZiAoc2hpZnQgJiYgc2hpZnQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICBjYXB0aW9uLmZyYW1lLnN0YXJ0ID0gc2hpZnRbMF07XG4gICAgICAgICAgY2FwdGlvbi5mcmFtZS5lbmQgPSBzaGlmdFsxXTtcbiAgICAgICAgICBjYXB0aW9uLmZyYW1lLmNvdW50ID0gY2FwdGlvbi5mcmFtZS5lbmQgLSBjYXB0aW9uLmZyYW1lLnN0YXJ0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNoaWZ0ID0gZnVuYyhbIGNhcHRpb24uc3RhcnQsIGNhcHRpb24uZW5kIF0pO1xuICAgICAgICBpZiAoc2hpZnQgJiYgc2hpZnQubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICBjYXB0aW9uLnN0YXJ0ID0gc2hpZnRbMF07XG4gICAgICAgICAgY2FwdGlvbi5lbmQgPSBzaGlmdFsxXTtcbiAgICAgICAgICBjYXB0aW9uLmR1cmF0aW9uID0gY2FwdGlvbi5lbmQgLSBjYXB0aW9uLnN0YXJ0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3luY2VkLnB1c2goY2FwdGlvbik7XG4gIH1cbiAgXG4gIHJldHVybiByZXN5bmNlZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc3Vic3J0OyIsImNvbnN0IG11c3RhY2hlID0gcmVxdWlyZSgnbXVzdGFjaGUnKVxuY29uc3QgRXBpc29kZSA9IHJlcXVpcmUoJy4vZXBpc29kZScpXG5cbmNvbnN0IHRva2VuVVJMID0gJ2h0dHBzOi8vYmV0YS1hcGkuY3J1bmNoeXJvbGwuY29tL2F1dGgvdjEvdG9rZW4nXG5jb25zdCBzaWduYXR1cmVVUkwgPSAnaHR0cHM6Ly9iZXRhLWFwaS5jcnVuY2h5cm9sbC5jb20vaW5kZXgvdjInXG5jb25zdCBxdWVyeVBhcmFtcyA9ICc/U2lnbmF0dXJlPXt7c2lnbmF0dXJlfX0mUG9saWN5PXt7cG9saWN5fX0mS2V5LVBhaXItSWQ9e3trZXlQYWlySUR9fSdcbmNvbnN0IG1ldGFkYXRhVVJMVGVtcGxhdGUgPSBgaHR0cHM6Ly9iZXRhLWFwaS5jcnVuY2h5cm9sbC5jb20vY21zL3Yye3t7Y21zQnVja2V0fX19L29iamVjdHMve3t2aWRlb0lEfX0ke3F1ZXJ5UGFyYW1zfWBcbmNvbnN0IHN0cmVhbXNVUkxUZW1wbGF0ZSA9IGBodHRwczovL2JldGEtYXBpLmNydW5jaHlyb2xsLmNvbS9jbXMvdjJ7e3tjbXNCdWNrZXR9fX0vdmlkZW9zL3t7dmlkZW9JRH19L3N0cmVhbXMke3F1ZXJ5UGFyYW1zfWBcblxuY29uc3QgdmlkZW9JRFJlZ2V4ID0gL2h0dHBzPzpcXC9cXC8oLipcXC4pP2NydW5jaHlyb2xsXFwuY29tXFwvKFxcUytcXC8pP3dhdGNoXFwvKFthLXpBLVowLTlfXSspKFxcLy4qKT8vXG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgTmV3RXBpc29kZSBleHRlbmRzIEVwaXNvZGUge1xuICBhc3luYyBmZXRjaE1ldGFkYXRhVVJMICh7IHZpZGVvSUQsIGtleVBhaXJJRCwgcG9saWN5LCBzaWduYXR1cmUsIGNtc0J1Y2tldCB9LCB0ZW1wbGF0ZXMgPSBbbWV0YWRhdGFVUkxUZW1wbGF0ZV0pIHtcbiAgICBjb25zdCB7IGF4aW9zIH0gPSB0aGlzXG4gICAgZm9yIChjb25zdCB1cmxUZW1wbGF0ZSBvZiB0ZW1wbGF0ZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG1ldGFkYXRhVVJMID0gbXVzdGFjaGUucmVuZGVyKHVybFRlbXBsYXRlLCB7XG4gICAgICAgICAgY21zQnVja2V0LFxuICAgICAgICAgIHZpZGVvSUQsXG4gICAgICAgICAga2V5UGFpcklELFxuICAgICAgICAgIHBvbGljeSxcbiAgICAgICAgICBzaWduYXR1cmVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQobWV0YWRhdGFVUkwpXG4gICAgICAgIHJldHVybiByZXNwb25zZVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBkYXRhIGZyb20gYWxsIG1ldGFkYXRhIFVSTHMnKVxuICB9XG5cbiAgYXN5bmMgZmV0Y2hTdHJlYW1zVVJMIChocmVmLCB7IHZpZGVvSUQsIGtleVBhaXJJRCwgcG9saWN5LCBzaWduYXR1cmUsIGNtc0J1Y2tldCB9LCB0ZW1wbGF0ZXMgPSBbc3RyZWFtc1VSTFRlbXBsYXRlXSkge1xuICAgIGNvbnN0IHsgYXhpb3MgfSA9IHRoaXNcbiAgICBmb3IgKGNvbnN0IHN0cmVhbXNVUkxUZW1wbGF0ZSBvZiB0ZW1wbGF0ZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN0cmVhbXNVUkwgPSBtdXN0YWNoZS5yZW5kZXIoc3RyZWFtc1VSTFRlbXBsYXRlLCB7XG4gICAgICAgICAgY21zQnVja2V0LFxuICAgICAgICAgIHZpZGVvSUQsXG4gICAgICAgICAga2V5UGFpcklELFxuICAgICAgICAgIHBvbGljeSxcbiAgICAgICAgICBzaWduYXR1cmVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQoc3RyZWFtc1VSTClcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIGRhdGEgZnJvbSBhbGwgc3RyZWFtcyBVUkxzJylcbiAgfVxuXG4gIGFzeW5jIHBhcnNlICgpIHtcbiAgICBjb25zdCB7IGF4aW9zLCBiYXNpY0F1dGggfSA9IHRoaXNcbiAgICBsZXQgcmVzcG9uc2VcbiAgICAvLyBGaXJzdCBnZXQgc2lnbmF0dXJlLCBwb2xpY3kgYW5kIGtleVBhaXJJRFxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKVxuICAgIHBhcmFtcy5zZXQoJ2dyYW50X3R5cGUnLCAnZXRwX3J0X2Nvb2tpZScpXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5wb3N0KHRva2VuVVJMLCBwYXJhbXMsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJhc2ljICR7YmFzaWNBdXRofWAsXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgfSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgIH0pXG4gICAgY29uc3QgeyBkYXRhOiB7IGFjY2Vzc190b2tlbjogYWNjZXNzVG9rZW4gfSB9ID0gcmVzcG9uc2VcbiAgICByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChzaWduYXR1cmVVUkwsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FjY2Vzc1Rva2VufWBcbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnN0IHsgZGF0YTogeyBjbXM6IHsgYnVja2V0OiBjbXNCdWNrZXQsIGtleV9wYWlyX2lkOiBrZXlQYWlySUQsIHBvbGljeSwgc2lnbmF0dXJlIH0gfSB9ID0gcmVzcG9uc2VcbiAgICB0aGlzLmtleVBhaXJJRCA9IGtleVBhaXJJRFxuICAgIHRoaXMucG9saWN5ID0gcG9saWN5XG4gICAgdGhpcy5zaWduYXR1cmUgPSBzaWduYXR1cmVcblxuICAgIC8vIEdldCBjb25maWdcbiAgICBjb25zdCBtYXRjaCA9IHZpZGVvSURSZWdleC5leGVjKHRoaXMudXJsKVxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcignRmFpbGVkIHRvIG1hdGNoIHZpZGVvSUQgcmVnZXggdG8gdXJsJylcbiAgICAgIGVyci5kYXRhID0geyB1cmw6IHRoaXMudXJsIH1cbiAgICAgIHRocm93IGVyclxuICAgIH1cbiAgICBjb25zdCB2aWRlb0lEID0gbWF0Y2hbM11cbiAgICByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hNZXRhZGF0YVVSTCh7IHZpZGVvSUQsIGtleVBhaXJJRCwgcG9saWN5LCBzaWduYXR1cmUsIGNtc0J1Y2tldCB9LCBbbWV0YWRhdGFVUkxUZW1wbGF0ZV0pXG4gICAgY29uc3QgeyBkYXRhOiB7IGl0ZW1zOiBbb2JqZWN0TWV0YWRhdGFdIH0gfSA9IHJlc3BvbnNlXG4gICAgY29uc3QgeyBlcGlzb2RlX21ldGFkYXRhOiBtZXRhZGF0YSB9ID0gb2JqZWN0TWV0YWRhdGFcbiAgICB0aGlzLm9iamVjdE1ldGFkYXRhID0gb2JqZWN0TWV0YWRhdGFcbiAgICB0aGlzLm1ldGFkYXRhID0gbWV0YWRhdGFcbiAgICAvLyBDb252ZXJ0IHRoaXMgdG8gYmUgaW4gdGhlIHNhbWUgZm9ybWF0IGFzIHRoZSBvbGRlciBjb25maWcgc28gd2UgZ2V0IHNvbWUgcGFyc2luZyBmb3IgZnJlZVxuICAgIG1ldGFkYXRhLnRpdGxlID0gdGhpcy5vYmplY3RNZXRhZGF0YS50aXRsZVxuICAgIHRoaXMuc2VyaWVzVGl0bGUgPSBtZXRhZGF0YS5zZXJpZXNfdGl0bGVcbiAgICB0aGlzLnNlYXNvbkluZGV4ID0gbWV0YWRhdGEuc2Vhc29uX251bWJlclxuXG4gICAgdGhpcy5jb25maWcgPSB7IG1ldGFkYXRhIH1cbiAgICAvLyBQb3N0ZXJcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbWFnZXM6IHsgdGh1bWJuYWlsOiBbdGh1bWJuYWlsc10gfSB9ID0gb2JqZWN0TWV0YWRhdGFcbiAgICAgIHRoaXMuY29uZmlnLnRodW1ibmFpbCA9IHsgdXJsOiB0aHVtYm5haWxzW3RodW1ibmFpbHMubGVuZ3RoIC0gMV0uc291cmNlIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0aGlzLmNvbmZpZy50aHVtYm5haWwgPSB7IHVybDogJycgfVxuICAgIH1cbiAgICBsZXQgc3RyZWFtc0hyZWZcbiAgICBjb25zdCBzdHJlYW1zVGVtcGxhdGVzID0gW3N0cmVhbXNVUkxUZW1wbGF0ZV1cbiAgICB0cnkge1xuICAgICAgOyh7IF9fbGlua3NfXzogeyBzdHJlYW1zOiB7IGhyZWY6IHN0cmVhbXNIcmVmIH0gfSB9ID0gb2JqZWN0TWV0YWRhdGEpXG4gICAgICBpZiAoc3RyZWFtc0hyZWYpIHtcbiAgICAgICAgY29uc3QgYWx0VGVtcGxhdGUgPSBgJHtuZXcgVVJMKHN0cmVhbXNVUkxUZW1wbGF0ZSkub3JpZ2lufSR7c3RyZWFtc0hyZWZ9JHtxdWVyeVBhcmFtc31gXG4gICAgICAgIHN0cmVhbXNUZW1wbGF0ZXMudW5zaGlmdChhbHRUZW1wbGF0ZSlcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgfVxuICAgIHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaFN0cmVhbXNVUkwoc3RyZWFtc0hyZWYsIHsgdmlkZW9JRCwga2V5UGFpcklELCBwb2xpY3ksIHNpZ25hdHVyZSwgY21zQnVja2V0IH0sIHN0cmVhbXNUZW1wbGF0ZXMpXG4gICAgY29uc3QgeyBkYXRhOiB7IHN0cmVhbXM6IHN0cmVhbXNSYXcsIHN1YnRpdGxlczogc3VidGl0bGVzUmF3IH0gfSA9IHJlc3BvbnNlXG4gICAgLy8gV2UncmUgZ29pbmcgdG8gaGF2ZSB0byBjb252ZXJ0IHRoaXMgc3RyZWFtcyBvYmplY3QgdG8gdGhlIG9sZCBmb3JtYXRcbiAgICBjb25zdCBzdHJlYW1zID0gW11cbiAgICBmb3IgKGNvbnN0IFt0eXBlLCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyhzdHJlYW1zUmF3KSkge1xuICAgICAgZm9yIChjb25zdCBbbG9jYWxlLCBlbnRyeV0gb2YgT2JqZWN0LmVudHJpZXMoZGF0YSkpIHtcbiAgICAgICAgY29uc3Qgc3RyZWFtID0ge31cbiAgICAgICAgc3RyZWFtLmZvcm1hdCA9IHR5cGVcbiAgICAgICAgc3RyZWFtLmF1ZGlvX2xhbmcgPSBsb2NhbGUgfHwgJ2RlZmF1bHQnXG4gICAgICAgIHN0cmVhbS5oYXJkc3ViX2xhbmcgPSBlbnRyeS5oYXJkc3ViX2xvY2FsZVxuICAgICAgICBzdHJlYW0udXJsID0gZW50cnkudXJsXG4gICAgICAgIHN0cmVhbXMucHVzaChzdHJlYW0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc3VidGl0bGVzID0gW11cbiAgICBmb3IgKGNvbnN0IGRhdGEgb2YgT2JqZWN0LnZhbHVlcyhzdWJ0aXRsZXNSYXcpKSB7XG4gICAgICBjb25zdCB7IGxvY2FsZSwgZm9ybWF0LCB1cmwgfSA9IGRhdGFcbiAgICAgIGxldCBsYW5ndWFnZVxuICAgICAgbGV0IGNvdW50cnlcbiAgICAgIGxldCB0aXRsZVxuICAgICAgdHJ5IHtcbiAgICAgICAgKHsgbGFuZ3VhZ2UsIGNvdW50cnkgfSA9IHRoaXMuZ2V0TGFuZ3VhZ2VBbmRDb3VudHJ5KGxvY2FsZSkpXG4gICAgICAgIHRpdGxlID0gYCR7bGFuZ3VhZ2V9ICgke2NvdW50cnl9KWBcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgbGFuZ3VhZ2UgPSBsb2NhbGUgPyBsb2NhbGUuc3Vic3RyaW5nKDAsIDIpIDogJy0tJ1xuICAgICAgICBjb3VudHJ5ID0gJydcbiAgICAgICAgdGl0bGUgPSAnVW5rbm93bidcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN1YnRpdGxlID0ge1xuICAgICAgICB1cmwsXG4gICAgICAgIHRpdGxlLFxuICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgY291bnRyeSxcbiAgICAgICAgZm9ybWF0LFxuICAgICAgICBraW5kOiAnY2FwdGlvbnMnXG4gICAgICB9XG4gICAgICBzdWJ0aXRsZXMucHVzaChzdWJ0aXRsZSlcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlnLCB7XG4gICAgICBzdHJlYW1zLFxuICAgICAgc3VidGl0bGVzXG4gICAgfSlcbiAgICBhd2FpdCB0aGlzLnByb2Nlc3NNZXRhZGF0YSgpXG4gIH1cblxuICBhc3luYyBpc1ByZW1pdW1WaWRlbyAoKSB7XG4gICAgaWYgKCF0aGlzLm1ldGFkYXRhKSB7XG4gICAgICBhd2FpdCB0aGlzLnBhcnNlKClcbiAgICB9XG4gICAgY29uc3QgeyBtZXRhZGF0YTogeyBpc19wcmVtaXVtX29ubHk6IGlzUHJlbWl1bVZpZGVvIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gISFpc1ByZW1pdW1WaWRlb1xuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBiYXNpY0F1dGhcbiAgYXN5bmMgZ2V0Q29uZmlnRm9yUGFyc2UgKGRhdGEpIHtcbiAgICAvLyBUaGlzIGRhdGEgY29udGFpbnMgdGhlIGFjY291bnRBdXRoQ2xpZW50SWQgcGFyYW1ldGVyIHRoYXQgd2UgbmVlZFxuICAgIGNvbnN0IHJlZ2V4ID0gL1wiYWNjb3VudEF1dGhDbGllbnRJZFwiOlxccypcIiguKj8pXCIvZ1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhkYXRhKVxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRGlkIG5vdCBmaW5kIGV4cGVjdGVkIHBhdHRlcm4nKVxuICAgIH1cbiAgICBjb25zdCBpZCA9IG1hdGNoWzFdXG4gICAgY29uc3QgYmFzaWNBdXRoID0gYnRvYShgJHtpZH06YCkgLy8gVGhpcyBpcyB0aGUgZm9ybWF0IHRoZXkgdXNlLi5mb3Igc29tZSByZWFzb25cbiAgICByZXR1cm4geyBiYXNpY0F1dGggfVxuICB9XG59XG4iLCJjb25zdCBBeGlvcyA9IHJlcXVpcmUoJ2F4aW9zJylcblxuY29uc3QgU3VidGl0bGUgPSByZXF1aXJlKCcuL3N1YnRpdGxlJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBFcGlzb2RlIHtcbiAgY29uc3RydWN0b3IgKHVybCwgcGFyYW1ldGVycywgYXhpb3MgPSBBeGlvcykge1xuICAgIHRoaXMudXJsID0gdXJsXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwYXJhbWV0ZXJzKVxuICAgIHRoaXMuYXhpb3MgPSBheGlvc1xuICB9XG5cbiAgYXN5bmMgcGFyc2UgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5pbXBsZW1lbnRlZCcpXG4gIH1cblxuICBnZXRMYW5ndWFnZUFuZENvdW50cnkgKGlucHV0KSB7XG4gICAgY29uc3QgY291bnRyeU1hcCA9IHtcbiAgICAgIEJSOiAnQnJhc2lsJyxcbiAgICAgIERFOiAnR2VybWFueScsXG4gICAgICBFUzogJ0VzcGHDsWEnLFxuICAgICAgRlI6ICdGcmFuY2UnLFxuICAgICAgSVQ6ICdJdGFseScsXG4gICAgICBKUDogJ0phcGFuJyxcbiAgICAgIExBOiAnQW3DqXJpY2EgTGF0aW5hJyxcbiAgICAgIFVLOiAnVW5pdGVkIEtpbmdkb20nLFxuICAgICAgVVM6ICdBbWVyaWNhJ1xuICAgIH1cbiAgICBjb25zdCBsYW5ndWFnZU1hcCA9IHtcbiAgICAgIGVuOiAnRW5nbGlzaCcsXG4gICAgICBkZTogJ0RldXRzY2gnLFxuICAgICAgZXM6ICdFc3Bhw7FvbCcsXG4gICAgICBpdDogJ0l0YWxpYW5vJyxcbiAgICAgIGphOiAn5pel5pys6KqeJyxcbiAgICAgIGZyOiAnRnJhbsOnYWlzJyxcbiAgICAgIHB0OiAnUG9ydHVndcOqcycsXG4gICAgICBhcjogJ9in2YTYudix2KjZitipJyxcbiAgICAgIHJ1OiAn0KDRg9GB0YHQutC40LknLFxuICAgICAga3I6ICftlZzqta3slrQnXG4gICAgfVxuXG4gICAgLy8gSWYgaW5wdXQgaGFzIGEgLSwgZ2V0IHJpZCBvZiBpdFxuICAgIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvLS9nLCAnJylcbiAgICBjb25zdCBsYW5nID0gaW5wdXQuc3Vic3RyaW5nKDAsIDIpLnRvTG93ZXJDYXNlKClcbiAgICBjb25zdCBjdHJ5ID0gaW5wdXQuc3Vic3RyaW5nKDIsIDQpLnRvVXBwZXJDYXNlKClcblxuICAgIGNvbnN0IGxhbmd1YWdlID0gbGFuZ3VhZ2VNYXBbbGFuZ11cbiAgICBjb25zdCBjb3VudHJ5ID0gY291bnRyeU1hcFtjdHJ5XVxuICAgIHJldHVybiB7IGxhbmd1YWdlLCBjb3VudHJ5IH1cbiAgfVxuXG4gIGdldFN0cmVhbXNCeUxhbnVhZ2UgKGF1ZGlvTGFuZywgaGFyZHN1YkxhbmcpIHtcbiAgICBjb25zdCB7IGNvbmZpZzogeyBzdHJlYW1zIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gc3RyZWFtcy5maWx0ZXIoc3RyZWFtID0+IHN0cmVhbS5hdWRpb19sYW5nID09PSBhdWRpb0xhbmcgJiYgc3RyZWFtLmhhcmRzdWJfbGFuZyA9PT0gaGFyZHN1YkxhbmcpXG4gIH1cblxuICBhc3luYyBnZXRTdWJ0aXRsZXMgKCkge1xuICAgIGNvbnN0IHsgYXhpb3MgfSA9IHRoaXNcbiAgICBjb25zdCB7IGNvbmZpZzogeyBzdWJ0aXRsZXM6IHN1YnRpdGxlTWV0YWRhdGEgfSB9ID0gdGhpc1xuICAgIHRoaXMuc3VidGl0bGVzID0gW11cbiAgICBhd2FpdCBQcm9taXNlLmFsbChzdWJ0aXRsZU1ldGFkYXRhLm1hcChhc3luYyAoeyBsYW5ndWFnZSwgdXJsLCB0aXRsZSwgZm9ybWF0IH0pID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KHVybClcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dClcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZGF0YTogYXNzIH0gPSByZXNwb25zZVxuICAgICAgdGhpcy5zdWJ0aXRsZXMucHVzaChuZXcgU3VidGl0bGUodGl0bGUsIGxhbmd1YWdlLnN1YnN0cigwLCAyKSwgYXNzKSlcbiAgICB9KSlcbiAgfVxuXG4gIGFzeW5jIHByb2Nlc3NNZXRhZGF0YSAoKSB7XG4gICAgY29uc3QgeyBjb25maWcgfSA9IHRoaXNcbiAgICBjb25zdCB7IG1ldGFkYXRhLCBzdHJlYW1zIH0gPSBjb25maWdcbiAgICB0aGlzLmVwaXNvZGVUaXRsZSA9IG1ldGFkYXRhLnRpdGxlXG4gICAgdGhpcy5lcGlzb2RlTnVtYmVyID0gTnVtYmVyKG1ldGFkYXRhLmVwaXNvZGVfbnVtYmVyKVxuICAgIHRoaXMucG9zdGVyID0gY29uZmlnLnRodW1ibmFpbC51cmxcbiAgICBzdHJlYW1zLmZvckVhY2goc3RyZWFtID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChzdHJlYW0uYXVkaW9fbGFuZykge1xuICAgICAgICAgIGNvbnN0IHsgbGFuZ3VhZ2UsIGNvdW50cnkgfSA9IHRoaXMuZ2V0TGFuZ3VhZ2VBbmRDb3VudHJ5KHN0cmVhbS5hdWRpb19sYW5nKVxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oc3RyZWFtLCB7XG4gICAgICAgICAgICBhdWRpbzoge1xuICAgICAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICAgICAgY291bnRyeVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgbGFuZ3VhZ2UsIGNvdW50cnkgfSA9IHRoaXMuZ2V0TGFuZ3VhZ2VBbmRDb3VudHJ5KHN0cmVhbS5oYXJkc3ViX2xhbmcpXG4gICAgICAgIE9iamVjdC5hc3NpZ24oc3RyZWFtLCB7XG4gICAgICAgICAgaGFyZHN1Yjoge1xuICAgICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgICBjb3VudHJ5XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgfVxuICAgIH0sIHRoaXMpXG4gIH1cbn1cbiIsImNvbnN0IEF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgRXBpc29kZSA9IHJlcXVpcmUoJy4vZXBpc29kZScpXG5jb25zdCBCZXRhRXBpc29kZSA9IHJlcXVpcmUoJy4vYmV0YScpXG5jb25zdCBPbGRFcGlzb2RlID0gcmVxdWlyZSgnLi9vbGQnKVxuY29uc3QgU3VidGl0bGUgPSByZXF1aXJlKCcuL3N1YnRpdGxlJylcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXBpc29kZSAodXJsLCBjb25maWcsIGF4aW9zID0gQXhpb3MpIHtcbiAgLyoqIEB0eXBlIHtFcGlzb2RlfSAqL1xuICBsZXQgZXBpc29kZVxuICBpZiAodXJsLmluY2x1ZGVzKCdiZXRhLmNydW5jaHlyb2xsJykpIHtcbiAgICBlcGlzb2RlID0gbmV3IEJldGFFcGlzb2RlKHVybCwgY29uZmlnLCBheGlvcylcbiAgfSBlbHNlIHtcbiAgICBlcGlzb2RlID0gbmV3IE9sZEVwaXNvZGUodXJsLCBjb25maWcsIGF4aW9zKVxuICB9XG4gIGF3YWl0IGVwaXNvZGUucGFyc2UoKVxuICByZXR1cm4gZXBpc29kZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmV0YUVwaXNvZGUsXG4gIE9sZEVwaXNvZGUsXG4gIEVwaXNvZGUsXG4gIFN1YnRpdGxlLFxuICBnZXRFcGlzb2RlXG59XG4iLCJjb25zdCBFcGlzb2RlID0gcmVxdWlyZSgnLi9lcGlzb2RlJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBPbGRFcGlzb2RlIGV4dGVuZHMgRXBpc29kZSB7XG4gIGFzeW5jIHBhcnNlICgpIHtcbiAgICBjb25zdCB7IGF4aW9zIH0gPSB0aGlzXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodGhpcy51cmwpXG4gICAgLy8gR2V0IGNvbmZpZ1xuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5kYXRhXG4gICAgYXdhaXQgdGhpcy5wYXJzZUNvbmZpZyhkYXRhKVxuICAgIGF3YWl0IHRoaXMuZ2V0U3VidGl0bGVzKClcbiAgfVxuXG4gIGFzeW5jIGlzUHJlbWl1bVZpZGVvICgpIHtcbiAgICBjb25zdCB7IGF4aW9zIH0gPSB0aGlzXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQodGhpcy51cmwpXG4gICAgY29uc3QgeyBkYXRhIH0gPSByZXNwb25zZVxuICAgIGNvbnN0IHBhdHRlcm4gPSAvPHNjcmlwdCB0eXBlPVwiYXBwbGljYXRpb25cXC9sZFxcK2pzb25cIj5cXHMqKFxcey4qP1xcfSlcXHMqPFxcL3NjcmlwdD4vbWdcbiAgICBjb25zdCBtYXRjaCA9IHBhdHRlcm4uZXhlYyhkYXRhKVxuICAgIGlmIChtYXRjaCkge1xuICAgICAgY29uc3QgbWV0YWRhdGFTdHIgPSBtYXRjaFsxXVxuICAgICAgY29uc3QgbWV0YWRhdGEgPSBKU09OLnBhcnNlKG1ldGFkYXRhU3RyKVxuICAgICAgY29uc3QgeyBwb3RlbnRpYWxBY3Rpb24gPSB7fSB9ID0gbWV0YWRhdGFcbiAgICAgIGNvbnN0IHsgYWN0aW9uQWNjZXNzaWJpbGl0eVJlcXVpcmVtZW50ID0ge30gfSA9IHBvdGVudGlhbEFjdGlvblxuICAgICAgY29uc3QgeyBjYXRlZ29yeSA9ICdub2xvZ2lucmVxdWlyZWQnLCByZXF1aXJlc1N1YnNjcmlwdGlvbiA9IFtdIH0gPSBhY3Rpb25BY2Nlc3NpYmlsaXR5UmVxdWlyZW1lbnRcbiAgICAgIHJldHVybiBjYXRlZ29yeSAhPT0gJ25vbG9naW5yZXF1aXJlZCcgJiYgcmVxdWlyZXNTdWJzY3JpcHRpb24ubGVuZ3RoID4gMFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGFzeW5jIHBhcnNlQ29uZmlnIChkYXRhKSB7XG4gICAgbGV0IHJlZ2V4ID0gL3ZpbG9zXFwuY29uZmlnXFwubWVkaWFcXHMqPVxccyooXFx7LipcXH0pL21cbiAgICBsZXQgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmluZCBjb25maWcnKVxuICAgIH1cbiAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKG1hdGNoWzFdKVxuXG4gICAgLy8gV2UgbmVlZCB0byBnZXQgc2VyaWVzVGl0bGUgc2VwYXJhdGVseVxuICAgIHJlZ2V4ID0gL3ZpbG9zXFwuY29uZmlnXFwuYW5hbHl0aWNzXFxzKj1cXHMqKFxcey4qXFx9KS9tXG4gICAgbWF0Y2ggPSByZWdleC5leGVjKGRhdGEpXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBhbmFseXRpY3MgPSBKU09OLnBhcnNlKG1hdGNoWzFdKVxuICAgICAgICB0aGlzLnNlcmllc1RpdGxlID0gYW5hbHl0aWNzLm1lZGlhX3JlcG9ydGluZ19wYXJlbnQudGl0bGVcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZ1xuICAgIGF3YWl0IHRoaXMucHJvY2Vzc01ldGFkYXRhKClcbiAgfVxufVxuIiwiY29uc3Qgc3Vic3J0ID0gcmVxdWlyZSgnc3Vic3J0JylcblxuY29uc3Qgb2xkVlRUID0gc3Vic3J0LmZvcm1hdC52dHRcbnN1YnNydC5mb3JtYXQudnR0ID0ge1xuICBuYW1lOiAndnR0JyxcbiAgcGFyc2U6IG9sZFZUVC5wYXJzZSxcbiAgYnVpbGQgKGNhcHRpb25zLCBvcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gcmVwbGFjZSAoZW50cnksIGZuKSB7XG4gICAgICBlbnRyeS5kYXRhLlRleHQgPSBmbihlbnRyeS5kYXRhLlRleHQpXG4gICAgICBlbnRyeS50ZXh0ID0gZm4oZW50cnkudGV4dClcbiAgICB9XG4gICAgLy8gTWFrZSBhIGNvcHkgYW5kIHJlbW92ZSBtZXRhIHNpbmNlIHRoZXJlJ3MgYW4gaXNzdWUgd2l0aCBzdWJzcnQgbm90XG4gICAgLy8gZGlzcGxheWluZyBpdCBwcm9wZXJseS5cbiAgICBjb25zdCBmaXhlZENhcHRpb25zID0gWy4uLmNhcHRpb25zXS5maWx0ZXIoeCA9PiB4LnR5cGUgIT09ICdtZXRhJylcbiAgICAvLyBBbHNvLCB0cmltIHRoZSB0ZXh0IHdoaWxlIHdlJ3JlIGF0IGl0IHRvIGVuc3VyZSB0aGVyZSdzIG5vIG5ld2xpbmVcbiAgICAvLyBhdCB0aGUgc3RhcnQgYW5kIHJlcGxhY2UgJiBhbmQgPCBzaW5jZSB0aGVzZSBjaGFyYWN0ZXJzIGFyZSBub3QgYWxsb3dlZFxuICAgIC8vIGFzIHBhcnQgb2YgV2ViVlRUIHNwZWNcbiAgICBmaXhlZENhcHRpb25zLmZvckVhY2goZW50cnkgPT4ge1xuICAgICAgaWYgKGVudHJ5LnR5cGUgIT09ICdjYXB0aW9uJykge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJlcGxhY2UoZW50cnksIHMgPT4gcy50cmltKCkucmVwbGFjZSgnXFxcXE4nLCAnJykucmVwbGFjZSgnXFxcXFInLCAnJykucmVwbGFjZSgnJicsICcmYW1wOycpLnJlcGxhY2UoJzwnLCAnJmx0OycpKVxuICAgIH0pXG5cbiAgICBsZXQgY29udGVudCA9IG9sZFZUVC5idWlsZChmaXhlZENhcHRpb25zLCBvcHRpb25zKVxuICAgIGNvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoLyguKikgLS0+ICguKikvZywgKG1hdGNoLCBwMSwgcDIpID0+IHtcbiAgICAgIHJldHVybiBgJHtwMS5yZXBsYWNlKC8sLywgJy4nKX0gLS0+ICR7cDIucmVwbGFjZSgvLC8sICcuJyl9YFxuICAgIH0pXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfSxcbiAgZGV0ZWN0OiBvbGRWVFQuZGV0ZWN0XG59XG5cbmNsYXNzIFN1YnRpdGxlIHtcbiAgY29uc3RydWN0b3IgKGxhYmVsLCBsYW5ndWFnZSwgY29udGVudCkge1xuICAgIHRoaXMubGFiZWwgPSBsYWJlbFxuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5ndWFnZVxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuY2FwdGlvbnMgPSBzdWJzcnQucGFyc2UoY29udGVudClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYXB0aW9ucyA9IGNvbnRlbnRcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGV0ZWN0IChjb250ZW50KSB7XG4gICAgcmV0dXJuIHN1YnNydC5kZXRlY3QoY29udGVudClcbiAgfVxuXG4gIGJ1aWxkIChmb3JtYXQpIHtcbiAgICByZXR1cm4gc3Vic3J0LmJ1aWxkKHRoaXMuY2FwdGlvbnMsIHsgZm9ybWF0IH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdWJ0aXRsZVxuIl0sInNvdXJjZVJvb3QiOiIifQ==