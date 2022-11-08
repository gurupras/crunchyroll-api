import require$$1$1 from 'http';
import require$$2 from 'https';
import require$$0$3 from 'url';
import require$$3 from 'stream';
import require$$4 from 'assert';
import require$$0$2 from 'tty';
import require$$1 from 'util';
import require$$0$1 from 'os';
import require$$8 from 'zlib';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof$1(obj);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var regeneratorRuntime$1 = {exports: {}};

var _typeof = {exports: {}};

(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof);

(function (module) {
  var _typeof$1 = _typeof.exports["default"];
  function _regeneratorRuntime() {

    /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
    module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
      return exports;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == _typeof$1(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function value(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (undefined === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) {
                if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              }
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) {
        keys.push(key);
      }
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
        }
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(regeneratorRuntime$1);

// TODO(Babel 8): Remove this file.

var runtime = regeneratorRuntime$1.exports();
var regenerator = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if ((typeof globalThis === "undefined" ? "undefined" : _typeof$1(globalThis)) === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
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
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
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
  return val !== null && _typeof$1(val) === 'object';
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
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }
  return typeof window !== 'undefined' && typeof document !== 'undefined';
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
  if (_typeof$1(obj) !== 'object') {
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
function merge( /* obj1, obj2, obj3, ... */
) {
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
var utils$9 = {
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

var utils$8 = utils$9;
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
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
  } else if (utils$8.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils$8.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils$8.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }
      utils$8.forEach(val, function parseValue(v) {
        if (utils$8.isDate(v)) {
          v = v.toISOString();
        } else if (utils$8.isObject(v)) {
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

var utils$7 = utils$9;
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
  utils$7.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var InterceptorManager_1 = InterceptorManager$1;

var utils$6 = utils$9;
var normalizeHeaderName$1 = function normalizeHeaderName(headers, normalizedName) {
  utils$6.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

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
var enhanceError$1 = function enhanceError(error, config, code, request, response) {
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

var createError;
var hasRequiredCreateError;
function requireCreateError() {
  if (hasRequiredCreateError) return createError;
  hasRequiredCreateError = 1;
  var enhanceError = enhanceError$1;

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
  createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };
  return createError;
}

var settle;
var hasRequiredSettle;
function requireSettle() {
  if (hasRequiredSettle) return settle;
  hasRequiredSettle = 1;
  var createError = requireCreateError();

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
    }
  };
  return settle;
}

var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies) return cookies;
  hasRequiredCookies = 1;
  var utils = utils$9;
  cookies = utils.isStandardBrowserEnv() ?
  // Standard browser envs support document.cookie
  function standardBrowserEnv() {
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
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  }() :
  // Non standard browser env (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() {
        return null;
      },
      remove: function remove() {}
    };
  }();
  return cookies;
}

var isAbsoluteURL;
var hasRequiredIsAbsoluteURL;
function requireIsAbsoluteURL() {
  if (hasRequiredIsAbsoluteURL) return isAbsoluteURL;
  hasRequiredIsAbsoluteURL = 1;

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
  return isAbsoluteURL;
}

var combineURLs;
var hasRequiredCombineURLs;
function requireCombineURLs() {
  if (hasRequiredCombineURLs) return combineURLs;
  hasRequiredCombineURLs = 1;

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  };
  return combineURLs;
}

var buildFullPath;
var hasRequiredBuildFullPath;
function requireBuildFullPath() {
  if (hasRequiredBuildFullPath) return buildFullPath;
  hasRequiredBuildFullPath = 1;
  var isAbsoluteURL = requireIsAbsoluteURL();
  var combineURLs = requireCombineURLs();

  /**
   * Creates a new URL by combining the baseURL with the requestedURL,
   * only when the requestedURL is not already an absolute URL.
   * If the requestURL is absolute, this function returns the requestedURL untouched.
   *
   * @param {string} baseURL The base URL
   * @param {string} requestedURL Absolute or relative URL to combine
   * @returns {string} The combined full path
   */
  buildFullPath = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  };
  return buildFullPath;
}

var parseHeaders;
var hasRequiredParseHeaders;
function requireParseHeaders() {
  if (hasRequiredParseHeaders) return parseHeaders;
  hasRequiredParseHeaders = 1;
  var utils = utils$9;

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];

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
  parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
      return parsed;
    }
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
  return parseHeaders;
}

var isURLSameOrigin;
var hasRequiredIsURLSameOrigin;
function requireIsURLSameOrigin() {
  if (hasRequiredIsURLSameOrigin) return isURLSameOrigin;
  hasRequiredIsURLSameOrigin = 1;
  var utils = utils$9;
  isURLSameOrigin = utils.isStandardBrowserEnv() ?
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
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
        pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
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
      var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }() :
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  }();
  return isURLSameOrigin;
}

var xhr;
var hasRequiredXhr;
function requireXhr() {
  if (hasRequiredXhr) return xhr;
  hasRequiredXhr = 1;
  var utils = utils$9;
  var settle = requireSettle();
  var cookies = requireCookies();
  var buildURL = buildURL$1;
  var buildFullPath = requireBuildFullPath();
  var parseHeaders = requireParseHeaders();
  var isURLSameOrigin = requireIsURLSameOrigin();
  var createError = requireCreateError();
  xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
      var responseType = config.responseType;
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
      function onloadend() {
        if (!request) {
          return;
        }
        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
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
      }
      if ('onloadend' in request) {
        // Use onloadend if available
        request.onloadend = onloadend;
      } else {
        // Listen for ready state to emulate onloadend
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
          // readystate handler is calling before onerror or ontimeout handlers,
          // so we should call onloadend on the next 'tick'
          setTimeout(onloadend);
        };
      }

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
        reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
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
      if (responseType && responseType !== 'json') {
        request.responseType = config.responseType;
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
  return xhr;
}

var followRedirects = {exports: {}};

var src$1 = {exports: {}};

var browser$1 = {exports: {}};

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}

var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  ms = function ms(val, options) {
    options = options || {};
    var type = _typeof$1(val);
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'weeks':
      case 'week':
      case 'w':
        return n * w;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
  }
  return ms;
}

var common;
var hasRequiredCommon;
function requireCommon() {
  if (hasRequiredCommon) return common;
  hasRequiredCommon = 1;
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   */

  function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = requireMs();
    createDebug.destroy = destroy;
    Object.keys(env).forEach(function (key) {
      createDebug[key] = env[key];
    });

    /**
    * The currently active debug mode names, and names to skip.
    */

    createDebug.names = [];
    createDebug.skips = [];

    /**
    * Map of special "%n" handling functions, for the debug "format" argument.
    *
    * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
    */
    createDebug.formatters = {};

    /**
    * Selects a color for a debug namespace
    * @param {String} namespace The namespace string for the debug instance to be colored
    * @return {Number|String} An ANSI color code for the given namespace
    * @api private
    */
    function selectColor(namespace) {
      var hash = 0;
      for (var i = 0; i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;

    /**
    * Create a debugger with the given `namespace`.
    *
    * @param {String} namespace
    * @return {Function}
    * @api public
    */
    function createDebug(namespace) {
      var prevTime;
      var enableOverride = null;
      var namespacesCache;
      var enabledCache;
      function debug() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        // Disabled?
        if (!debug.enabled) {
          return;
        }
        var self = debug;

        // Set `diff` timestamp
        var curr = Number(new Date());
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== 'string') {
          // Anything else let's inspect with %O
          args.unshift('%O');
        }

        // Apply any `formatters` transformations
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // If we encounter an escaped % then don't increase the array index
          if (match === '%%') {
            return '%';
          }
          index++;
          var formatter = createDebug.formatters[format];
          if (typeof formatter === 'function') {
            var val = args[index];
            match = formatter.call(self, val);

            // Now we need to remove `args[index]` since it's inlined in the `format`
            args.splice(index, 1);
            index--;
          }
          return match;
        });

        // Apply env-specific formatting (colors, etc.)
        createDebug.formatArgs.call(self, args);
        var logFn = self.log || createDebug.log;
        logFn.apply(self, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

      Object.defineProperty(debug, 'enabled', {
        enumerable: true,
        configurable: false,
        get: function get() {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: function set(v) {
          enableOverride = v;
        }
      });

      // Env-specific initialization logic for debug instances
      if (typeof createDebug.init === 'function') {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }

    /**
    * Enables a debug mode by namespaces. This can include modes
    * separated by a colon and wildcards.
    *
    * @param {String} namespaces
    * @api public
    */
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      var i;
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;
      for (i = 0; i < len; i++) {
        if (!split[i]) {
          // ignore empty strings
          continue;
        }
        namespaces = split[i].replace(/\*/g, '.*?');
        if (namespaces[0] === '-') {
          createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
        } else {
          createDebug.names.push(new RegExp('^' + namespaces + '$'));
        }
      }
    }

    /**
    * Disable debug output.
    *
    * @return {String} namespaces
    * @api public
    */
    function disable() {
      var namespaces = [].concat(_toConsumableArray(createDebug.names.map(toNamespace)), _toConsumableArray(createDebug.skips.map(toNamespace).map(function (namespace) {
        return '-' + namespace;
      }))).join(',');
      createDebug.enable('');
      return namespaces;
    }

    /**
    * Returns true if the given mode name is enabled, false otherwise.
    *
    * @param {String} name
    * @return {Boolean}
    * @api public
    */
    function enabled(name) {
      if (name[name.length - 1] === '*') {
        return true;
      }
      var i;
      var len;
      for (i = 0, len = createDebug.skips.length; i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length; i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }

    /**
    * Convert regexp to namespace
    *
    * @param {RegExp} regxep
    * @return {String} namespace
    * @api private
    */
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
    }

    /**
    * Coerce `val`.
    *
    * @param {Mixed} val
    * @return {Mixed}
    * @api private
    */
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }

    /**
    * XXX DO NOT USE. This is a temporary stub function.
    * XXX It WILL be removed in the next major release.
    */
    function destroy() {
      console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  }
  common = setup;
  return common;
}

/* eslint-env browser */
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser$1.exports;
  hasRequiredBrowser = 1;
  (function (module, exports) {
    /**
     * This is the web browser implementation of `debug()`.
     */

    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = function () {
      var warned = false;
      return function () {
        if (!warned) {
          warned = true;
          console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
      };
    }();

    /**
     * Colors.
     */

    exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */

    // eslint-disable-next-line complexity
    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
        return true;
      }

      // Internet Explorer and Edge do not support colors.
      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }

      // Is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
      // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
      // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
      // Double check webkit in userAgent just in case we are in a worker
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }

    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */

    function formatArgs(args) {
      args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit');

      // The final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if (match === '%%') {
          return;
        }
        index++;
        if (match === '%c') {
          // We only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }

    /**
     * Invokes `console.debug()` when available.
     * No-op when `console.debug` is not a "function".
     * If `console.debug` is not available, falls back
     * to `console.log`.
     *
     * @api public
     */
    exports.log = console.debug || console.log || function () {};

    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem('debug', namespaces);
        } else {
          exports.storage.removeItem('debug');
        }
      } catch (error) {
        // Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }

    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */
    function load() {
      var r;
      try {
        r = exports.storage.getItem('debug');
      } catch (error) {
        // Swallow
        // XXX (@Qix-) should we be logging these?
      }

      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }
      return r;
    }

    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

    function localstorage() {
      try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
      } catch (error) {
        // Swallow
        // XXX (@Qix-) should we be logging these?
      }
    }
    module.exports = requireCommon()(exports);
    var formatters = module.exports.formatters;

    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
      }
    };
  })(browser$1, browser$1.exports);
  return browser$1.exports;
}

var node = {exports: {}};

var hasFlag;
var hasRequiredHasFlag;
function requireHasFlag() {
  if (hasRequiredHasFlag) return hasFlag;
  hasRequiredHasFlag = 1;
  hasFlag = function hasFlag(flag, argv) {
    argv = argv || process.argv;
    var prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
    var pos = argv.indexOf(prefix + flag);
    var terminatorPos = argv.indexOf('--');
    return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };
  return hasFlag;
}

var supportsColor_1;
var hasRequiredSupportsColor;
function requireSupportsColor() {
  if (hasRequiredSupportsColor) return supportsColor_1;
  hasRequiredSupportsColor = 1;
  var os = require$$0$1;
  var hasFlag = requireHasFlag();
  var env = process.env;
  var forceColor;
  if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
    forceColor = false;
  } else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
    forceColor = true;
  }
  if ('FORCE_COLOR' in env) {
    forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level: level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3
    };
  }
  function supportsColor(stream) {
    if (forceColor === false) {
      return 0;
    }
    if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
      return 3;
    }
    if (hasFlag('color=256')) {
      return 2;
    }
    if (stream && !stream.isTTY && forceColor !== true) {
      return 0;
    }
    var min = forceColor ? 1 : 0;
    if (process.platform === 'win32') {
      // Node.js 7.5.0 is the first version of Node.js to include a patch to
      // libuv that enables 256 color output on Windows. Anything earlier and it
      // won't work. However, here we target Node.js 8 at minimum as it is an LTS
      // release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
      // release that supports 256 colors. Windows 10 build 14931 is the first release
      // that supports 16m/TrueColor.
      var osRelease = os.release().split('.');
      if (Number(process.versions.node.split('.')[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ('CI' in env) {
      if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function (sign) {
        return sign in env;
      }) || env.CI_NAME === 'codeship') {
        return 1;
      }
      return min;
    }
    if ('TEAMCITY_VERSION' in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if (env.COLORTERM === 'truecolor') {
      return 3;
    }
    if ('TERM_PROGRAM' in env) {
      var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
      switch (env.TERM_PROGRAM) {
        case 'iTerm.app':
          return version >= 3 ? 3 : 2;
        case 'Apple_Terminal':
          return 2;
        // No default
      }
    }

    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
      return 1;
    }
    if ('COLORTERM' in env) {
      return 1;
    }
    if (env.TERM === 'dumb') {
      return min;
    }
    return min;
  }
  function getSupportLevel(stream) {
    var level = supportsColor(stream);
    return translateLevel(level);
  }
  supportsColor_1 = {
    supportsColor: getSupportLevel,
    stdout: getSupportLevel(process.stdout),
    stderr: getSupportLevel(process.stderr)
  };
  return supportsColor_1;
}

/**
 * Module dependencies.
 */
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node.exports;
  hasRequiredNode = 1;
  (function (module, exports) {
    var tty = require$$0$2;
    var util = require$$1;

    /**
     * This is the Node.js implementation of `debug()`.
     */

    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(function () {}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');

    /**
     * Colors.
     */

    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
      // eslint-disable-next-line import/no-extraneous-dependencies
      var supportsColor = requireSupportsColor();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
      }
    } catch (error) {
      // Swallow - we only care if `supports-color` is available; it doesn't have to be.
    }

    /**
     * Build up the default `inspectOpts` object from the environment variables.
     *
     *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
     */

    exports.inspectOpts = Object.keys(process.env).filter(function (key) {
      return /^debug_/i.test(key);
    }).reduce(function (obj, key) {
      // Camel-case
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
        return k.toUpperCase();
      });

      // Coerce string value into JS value
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === 'null') {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});

    /**
     * Is stdout a TTY? Colored output is enabled when `true`.
     */

    function useColors() {
      return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }

    /**
     * Adds ANSI color escape codes if enabled.
     *
     * @api public
     */

    function formatArgs(args) {
      var name = this.namespace,
        useColors = this.useColors;
      if (useColors) {
        var c = this.color;
        var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
        var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + ' ' + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return '';
      }
      return new Date().toISOString() + ' ';
    }

    /**
     * Invokes `util.format()` with the specified arguments and writes to stderr.
     */

    function log() {
      return process.stderr.write(util.format.apply(util, arguments) + '\n');
    }

    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
      }
    }

    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */

    function load() {
      return process.env.DEBUG;
    }

    /**
     * Init logic for `debug` instances.
     *
     * Create a new `inspectOpts` object in case `useColors` is set
     * differently for a particular `debug` instance.
     */

    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = requireCommon()(exports);
    var formatters = module.exports.formatters;

    /**
     * Map %o to `util.inspect()`, all on a single line.
     */

    formatters.o = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
        return str.trim();
      }).join(' ');
    };

    /**
     * Map %O to `util.inspect()`, allowing multiple lines if needed.
     */

    formatters.O = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  })(node, node.exports);
  return node.exports;
}

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
var hasRequiredSrc;
function requireSrc() {
  if (hasRequiredSrc) return src$1.exports;
  hasRequiredSrc = 1;
  (function (module) {
    if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
      module.exports = requireBrowser();
    } else {
      module.exports = requireNode();
    }
  })(src$1);
  return src$1.exports;
}

var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  var debug;
  debug_1 = function debug_1() {
    if (!debug) {
      try {
        /* eslint global-require: off */
        debug = requireSrc()("follow-redirects");
      } catch (error) {/* */}
      if (typeof debug !== "function") {
        debug = function debug() {/* */};
      }
    }
    debug.apply(null, arguments);
  };
  return debug_1;
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }
function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var hasRequiredFollowRedirects;
function requireFollowRedirects() {
  if (hasRequiredFollowRedirects) return followRedirects.exports;
  hasRequiredFollowRedirects = 1;
  var url = require$$0$3;
  var URL = url.URL;
  var http = require$$1$1;
  var https = require$$2;
  var Writable = require$$3.Writable;
  var assert = require$$4;
  var debug = requireDebug();

  // Create handlers that pass events from native requests
  var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
  var eventHandlers = Object.create(null);
  events.forEach(function (event) {
    eventHandlers[event] = function (arg1, arg2, arg3) {
      this._redirectable.emit(event, arg1, arg2, arg3);
    };
  });
  var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
  // Error types with codes
  var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
  var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded");
  var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
  var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);
  RedirectableRequest.prototype.abort = function () {
    abortRequest(this._currentRequest);
    this.emit("abort");
  };

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
      throw new WriteAfterEndError();
    }

    // Validate input and shift parameters if necessary
    if (!isString(data) && !isBuffer(data)) {
      throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (isFunction(encoding)) {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({
        data: data,
        encoding: encoding
      });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new MaxBodyLengthExceededError());
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (isFunction(data)) {
      callback = data;
      data = encoding = null;
    } else if (isFunction(encoding)) {
      callback = encoding;
      encoding = null;
    }

    // Write data if needed and end
    if (!data) {
      this._ended = this._ending = true;
      this._currentRequest.end(null, null, callback);
    } else {
      var self = this;
      var currentRequest = this._currentRequest;
      this.write(data, encoding, function () {
        self._ended = true;
        currentRequest.end(null, null, callback);
      });
      this._ending = true;
    }
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Global timeout for all underlying requests
  RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
    var self = this;

    // Destroys the socket on timeout
    function destroyOnTimeout(socket) {
      socket.setTimeout(msecs);
      socket.removeListener("timeout", socket.destroy);
      socket.addListener("timeout", socket.destroy);
    }

    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
      if (self._timeout) {
        clearTimeout(self._timeout);
      }
      self._timeout = setTimeout(function () {
        self.emit("timeout");
        clearTimer();
      }, msecs);
      destroyOnTimeout(socket);
    }

    // Stops a timeout from triggering
    function clearTimer() {
      // Clear the timeout
      if (self._timeout) {
        clearTimeout(self._timeout);
        self._timeout = null;
      }

      // Clean up all attached listeners
      self.removeListener("abort", clearTimer);
      self.removeListener("error", clearTimer);
      self.removeListener("response", clearTimer);
      if (callback) {
        self.removeListener("timeout", callback);
      }
      if (!self.socket) {
        self._currentRequest.removeListener("socket", startTimer);
      }
    }

    // Attach callback if passed
    if (callback) {
      this.on("timeout", callback);
    }

    // Start the timer if or when the socket is opened
    if (this.socket) {
      startTimer(this.socket);
    } else {
      this._currentRequest.once("socket", startTimer);
    }

    // Clean up on events
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);
    return this;
  };

  // Proxy all other public ClientRequest methods
  ["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function get() {
        return this._currentRequest[property];
      }
    });
  });
  RedirectableRequest.prototype._sanitizeOptions = function (options) {
    // Ensure headers are always present
    if (!options.headers) {
      options.headers = {};
    }

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      } else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }
  };

  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new TypeError("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.slice(0, -1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request and set up its event handlers
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    var _iterator = _createForOfIteratorHelper$1(events),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;
        request.on(event, eventHandlers[event]);
      }

      // RFC7230§5.3.1: When making a request directly to an origin server, […]
      // a client MUST send only the absolute path […] as the request-target.
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) :
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end
      var i = 0;
      var self = this;
      var buffers = this._requestBodyBuffers;
      (function writeNext(error) {
        // Only write if this request has not been redirected yet
        /* istanbul ignore else */
        if (request === self._currentRequest) {
          // Report any write errors
          /* istanbul ignore if */
          if (error) {
            self.emit("error", error);
          }
          // Write the next buffer if there are still left
          else if (i < buffers.length) {
            var buffer = buffers[i++];
            /* istanbul ignore else */
            if (!request.finished) {
              request.write(buffer.data, buffer.encoding, writeNext);
            }
          }
          // End the request if `end` has been called on us
          else if (self._ended) {
            request.end();
          }
        }
      })();
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: statusCode
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.

    // If the response is not a redirect; return it as-is
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
      return;
    }

    // The response is a redirect, so abort the current request
    abortRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();

    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new TooManyRedirectsError());
      return;
    }

    // Store the request headers if applicable
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
      requestHeaders = Object.assign({
        // The Host header was set by nativeProtocol.request
        Host: response.req.getHeader("host")
      }, this._options.headers);
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    var method = this._options.method;
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
    // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      removeMatchingHeaders(/^content-/i, this._options.headers);
    }

    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = url.parse(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, {
      host: currentHost
    }));

    // Determine the URL of the redirection
    var redirectUrl;
    try {
      redirectUrl = url.resolve(currentUrl, location);
    } catch (cause) {
      this.emit("error", new RedirectionError({
        cause: cause
      }));
      return;
    }

    // Create the redirected request
    debug("redirecting to", redirectUrl);
    this._isRedirect = true;
    var redirectUrlParts = url.parse(redirectUrl);
    Object.assign(this._options, redirectUrlParts);

    // Drop confidential headers when redirecting to a less secure protocol
    // or to a different domain that is not a superdomain
    if (redirectUrlParts.protocol !== currentUrlParts.protocol && redirectUrlParts.protocol !== "https:" || redirectUrlParts.host !== currentHost && !isSubdomain(redirectUrlParts.host, currentHost)) {
      removeMatchingHeaders(/^(?:authorization|cookie)$/i, this._options.headers);
    }

    // Evaluate the beforeRedirect callback
    if (isFunction(beforeRedirect)) {
      var responseDetails = {
        headers: response.headers,
        statusCode: statusCode
      };
      var requestDetails = {
        url: currentUrl,
        method: method,
        headers: requestHeaders
      };
      try {
        beforeRedirect(this._options, responseDetails, requestDetails);
      } catch (err) {
        this.emit("error", err);
        return;
      }
      this._sanitizeOptions(this._options);
    }

    // Perform the redirected request
    try {
      this._performRequest();
    } catch (cause) {
      this.emit("error", new RedirectionError({
        cause: cause
      }));
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      function request(input, options, callback) {
        // Parse parameters
        if (isString(input)) {
          var parsed;
          try {
            parsed = urlToOptions(new URL(input));
          } catch (err) {
            /* istanbul ignore next */
            parsed = url.parse(input);
          }
          if (!isString(parsed.protocol)) {
            throw new InvalidUrlError({
              input: input
            });
          }
          input = parsed;
        } else if (URL && input instanceof URL) {
          input = urlToOptions(input);
        } else {
          callback = options;
          options = input;
          input = {
            protocol: protocol
          };
        }
        if (isFunction(options)) {
          callback = options;
          options = null;
        }

        // Set defaults
        options = Object.assign({
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength
        }, input, options);
        options.nativeProtocols = nativeProtocols;
        if (!isString(options.host) && !isString(options.hostname)) {
          options.hostname = "::1";
        }
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug("options", options);
        return new RedirectableRequest(options, callback);
      }

      // Executes a GET request, following redirects
      function get(input, options, callback) {
        var wrappedRequest = wrappedProtocol.request(input, options, callback);
        wrappedRequest.end();
        return wrappedRequest;
      }

      // Expose the properties on the wrapped protocol
      Object.defineProperties(wrappedProtocol, {
        request: {
          value: request,
          configurable: true,
          enumerable: true,
          writable: true
        },
        get: {
          value: get,
          configurable: true,
          enumerable: true,
          writable: true
        }
      });
    });
    return exports;
  }

  /* istanbul ignore next */
  function noop() {/* empty */}

  // from https://github.com/nodejs/node/blob/master/lib/internal/url.js
  function urlToOptions(urlObject) {
    var options = {
      protocol: urlObject.protocol,
      hostname: urlObject.hostname.startsWith("[") ? /* istanbul ignore next */
      urlObject.hostname.slice(1, -1) : urlObject.hostname,
      hash: urlObject.hash,
      search: urlObject.search,
      pathname: urlObject.pathname,
      path: urlObject.pathname + urlObject.search,
      href: urlObject.href
    };
    if (urlObject.port !== "") {
      options.port = Number(urlObject.port);
    }
    return options;
  }
  function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for (var header in headers) {
      if (regex.test(header)) {
        lastValue = headers[header];
        delete headers[header];
      }
    }
    return lastValue === null || typeof lastValue === "undefined" ? undefined : String(lastValue).trim();
  }
  function createErrorType(code, message, baseClass) {
    // Create constructor
    function CustomError(properties) {
      Error.captureStackTrace(this, this.constructor);
      Object.assign(this, properties || {});
      this.code = code;
      this.message = this.cause ? message + ": " + this.cause.message : message;
    }

    // Attach constructor and set default properties
    CustomError.prototype = new (baseClass || Error)();
    CustomError.prototype.constructor = CustomError;
    CustomError.prototype.name = "Error [" + code + "]";
    return CustomError;
  }
  function abortRequest(request) {
    var _iterator2 = _createForOfIteratorHelper$1(events),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var event = _step2.value;
        request.removeListener(event, eventHandlers[event]);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    request.on("error", noop);
    request.abort();
  }
  function isSubdomain(subdomain, domain) {
    assert(isString(subdomain) && isString(domain));
    var dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
  }
  function isString(value) {
    return typeof value === "string" || value instanceof String;
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isBuffer(value) {
    return _typeof$1(value) === "object" && "length" in value;
  }

  // Exports
  followRedirects.exports = wrap({
    http: http,
    https: https
  });
  followRedirects.exports.wrap = wrap;
  return followRedirects.exports;
}

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

var http_1;
var hasRequiredHttp;
function requireHttp() {
  if (hasRequiredHttp) return http_1;
  hasRequiredHttp = 1;
  var utils = utils$9;
  var settle = requireSettle();
  var buildFullPath = requireBuildFullPath();
  var buildURL = buildURL$1;
  var http = require$$1$1;
  var https = require$$2;
  var httpFollow = requireFollowRedirects().http;
  var httpsFollow = requireFollowRedirects().https;
  var url = require$$0$3;
  var zlib = require$$8;
  var pkg = require$$0;
  var createError = requireCreateError();
  var enhanceError = enhanceError$1;
  var isHttps = /https:?/;

  /**
   *
   * @param {http.ClientRequestArgs} options
   * @param {AxiosProxyConfig} proxy
   * @param {string} location
   */
  function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;

    // Basic proxy authorization
    if (proxy.auth) {
      var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
      redirection.headers.host = redirection.host;
      setProxy(redirection, proxy, redirection.href);
    };
  }

  /*eslint consistent-return:0*/
  http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var resolve = function resolve(value) {
        resolvePromise(value);
      };
      var reject = function reject(value) {
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;

      // Set User-Agent (required by some servers)
      // See https://github.com/axios/axios/issues/69
      if ('User-Agent' in headers || 'user-agent' in headers) {
        // User-Agent is specified; handle case where no UA header is desired
        if (!headers['User-Agent'] && !headers['user-agent']) {
          delete headers['User-Agent'];
          delete headers['user-agent'];
        }
        // Otherwise, use specified value
      } else {
        // Only set header if it hasn't been set in config
        headers['User-Agent'] = 'axios/' + pkg.version;
      }
      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, 'utf-8');
        } else {
          return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var fullPath = buildFullPath(config.baseURL, config.url);
      var parsed = url.parse(fullPath);
      var protocol = parsed.protocol || 'http:';
      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }
      if (auth) {
        delete headers.Authorization;
      }
      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method.toUpperCase(),
        headers: headers,
        agent: agent,
        agents: {
          http: config.httpAgent,
          https: config.httpsAgent
        },
        auth: auth
      };
      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }
      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;
          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(',').map(function trim(s) {
              return s.trim();
            });
            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === '*') {
                return true;
              }
              if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                return true;
              }
              return parsed.hostname === proxyElement;
            });
          }
          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port,
              protocol: parsedProxyUrl.protocol
            };
            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(':');
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }
      if (proxy) {
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
      }
      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }
      if (config.maxBodyLength > -1) {
        options.maxBodyLength = config.maxBodyLength;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // uncompress the response body transparently if required
        var stream = res;

        // return the last request in case of redirects
        var lastRequest = res.req || req;

        // if no content, is HEAD request or decompress disabled we should not decompress
        if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
          switch (res.headers['content-encoding']) {
            /*eslint default-case:0*/
            case 'gzip':
            case 'compress':
            case 'deflate':
              // add the unzipper to the body stream processing pipeline
              stream = stream.pipe(zlib.createUnzip());

              // remove the content-encoding in order to not confuse downstream operations
              delete res.headers['content-encoding'];
              break;
          }
        }
        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };
        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          var totalResponseBytes = 0;
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);
            totalResponseBytes += chunk.length;

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
              stream.destroy();
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
            }
          });
          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config, null, lastRequest));
          });
          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
              if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                responseData = utils.stripBOM(responseData);
              }
            }
            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
        reject(enhanceError(err, config, null, req));
      });

      // Handle request timeout
      if (config.timeout) {
        // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
        var timeout = parseInt(config.timeout, 10);
        if (isNaN(timeout)) {
          reject(createError('error trying to parse `config.timeout` to int', config, 'ERR_PARSE_TIMEOUT', req));
          return;
        }

        // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
        // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
        // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
        // And then these socket which be hang up will devoring CPU little by little.
        // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
        req.setTimeout(timeout, function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + timeout + 'ms exceeded', config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', req));
        });
      }
      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;
          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils.isStream(data)) {
        data.on('error', function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };
  return http_1;
}

var utils$5 = utils$9;
var normalizeHeaderName = normalizeHeaderName$1;
var enhanceError = enhanceError$1;
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
    adapter = requireXhr();
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = requireHttp();
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
    if (utils$5.isFormData(data) || utils$5.isArrayBuffer(data) || utils$5.isBuffer(data) || utils$5.isStream(data) || utils$5.isFile(data) || utils$5.isBlob(data)) {
      return data;
    }
    if (utils$5.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$5.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils$5.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
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
    if (strictJSONParsing || forcedJSONParsing && utils$5.isString(data) && data.length) {
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
var defaults_1 = defaults$3;

var utils$4 = utils$9;
var defaults$2 = defaults_1;

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
function requireIsCancel() {
  if (hasRequiredIsCancel) return isCancel$1;
  hasRequiredIsCancel = 1;
  isCancel$1 = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
  return isCancel$1;
}

var utils$3 = utils$9;
var transformData = transformData$1;
var isCancel = requireIsCancel();
var defaults$1 = defaults_1;

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
  config.data = transformData.call(config, config.data, config.headers, config.transformRequest);

  // Flatten headers
  config.headers = utils$3.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils$3.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults$1.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }
    return Promise.reject(reason);
  });
};

var utils$2 = utils$9;

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
  var defaultToConfig2Keys = ['baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress', 'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'];
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
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils$2.forEach(otherKeys, mergeDeepProperties);
  return config;
};

var pkg = require$$0;
var validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators$1[type] = function validator(thing) {
    return _typeof$1(thing) === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
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
  return function (value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }
    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
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
  if (_typeof$1(options) !== 'object') {
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

var utils$1 = utils$9;
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
  Axios$3.prototype[method] = function (url, config) {
    return this.request(mergeConfig$1(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios$3.prototype[method] = function (url, data, config) {
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
function requireCancel() {
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
function requireCancelToken() {
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
function requireSpread() {
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
function requireIsAxiosError() {
  if (hasRequiredIsAxiosError) return isAxiosError;
  hasRequiredIsAxiosError = 1;

  /**
   * Determines whether the payload is an error thrown by Axios
   *
   * @param {*} payload The value to test
   * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
   */
  isAxiosError = function isAxiosError(payload) {
    return _typeof$1(payload) === 'object' && payload.isAxiosError === true;
  };
  return isAxiosError;
}

var utils = utils$9;
var bind = bind$2;
var Axios$2 = Axios_1;
var mergeConfig = mergeConfig$2;
var defaults = defaults_1;

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
})(axios$2);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

var ssa;
var hasRequiredSsa;
function requireSsa() {
  if (hasRequiredSsa) return ssa;
  hasRequiredSsa = 1;
  var FORMAT_NAME = "ssa";
  var helper = {
    toMilliseconds: function toMilliseconds(s) {
      var match = /^\s*(\d+:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
      var hh = match[1] ? parseInt(match[1].replace(":", "")) : 0;
      var mm = parseInt(match[2]);
      var ss = parseInt(match[3]);
      var ff = match[5] ? parseInt(match[5]) : 0;
      var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff * 10;
      return ms;
    },
    toTimeString: function toTimeString(ms) {
      var hh = Math.floor(ms / 1000 / 3600);
      var mm = Math.floor(ms / 1000 / 60 % 60);
      var ss = Math.floor(ms / 1000 % 60);
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
    var captions = [];
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
                meta = {};
                meta.type = "meta";
                meta.data = {};
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
                var caption = {};
                caption.type = "style";
                caption.data = {};
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
                //Work-around for missing text (when the text contains ',' char)
                var getPosition = function getPosition(s, search, index) {
                  return s.split(search, index).join(search).length;
                };
                var values = value.split(/\s*,\s*/g);
                var caption = {};
                caption.type = "caption";
                caption.data = {};
                for (var c = 0; c < columns.length && c < values.length; c++) {
                  caption.data[columns[c]] = values[c];
                }
                caption.start = helper.toMilliseconds(caption.data["Start"]);
                caption.end = helper.toMilliseconds(caption.data["End"]);
                caption.duration = caption.end - caption.start;
                caption.content = caption.data["Text"];
                var indexOfText = getPosition(value, ',', columns.length - 1) + 1;
                caption.content = value.substr(indexOfText);
                caption.data["Text"] = caption.content;
                caption.text = caption.content.replace(/\\N/g, eol) //"\N" for new line
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
  }

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
    } else {
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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  ssa = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return ssa;
}

var ass;
var hasRequiredAss;
function requireAss() {
  if (hasRequiredAss) return ass;
  hasRequiredAss = 1;
  var FORMAT_NAME = "ass";

  //Compatible format
  var ssa = requireSsa();
  ass = {
    name: FORMAT_NAME,
    helper: ssa.helper,
    detect: ssa.detect,
    parse: ssa.parse,
    build: ssa.build
  };
  return ass;
}

var json;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json;
  hasRequiredJson = 1;
  var FORMAT_NAME = "json";

  /******************************************************************************************
   * Parses captions in JSON format
   ******************************************************************************************/
  function parse(content, options) {
    return JSON.parse(content);
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  json = {
    name: FORMAT_NAME,
    detect: detect,
    parse: parse,
    build: build
  };
  return json;
}

var lrc;
var hasRequiredLrc;
function requireLrc() {
  if (hasRequiredLrc) return lrc;
  hasRequiredLrc = 1;
  var FORMAT_NAME = "lrc";
  var helper = {
    toMilliseconds: function toMilliseconds(s) {
      var match = /^\s*(\d+):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
      var mm = parseInt(match[1]);
      var ss = parseInt(match[2]);
      var ff = match[4] ? parseInt(match[4]) : 0;
      var ms = mm * 60 * 1000 + ss * 1000 + ff * 10;
      return ms;
    },
    toTimeString: function toTimeString(ms) {
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
    var captions = [];
    options.eol || "\r\n";
    var parts = content.split(/\r?\n/);
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i] || parts[i].trim().length == 0) {
        continue;
      }

      //LRC content
      var regex = /^\[(\d{1,2}:\d{1,2}([.,]\d{1,3})?)\](.*)(\r?\n)*$/gi;
      var match = regex.exec(parts[i]);
      if (match) {
        var caption = {};
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
        var caption = {};
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
  }

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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  lrc = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return lrc;
}

var sbv;
var hasRequiredSbv;
function requireSbv() {
  if (hasRequiredSbv) return sbv;
  hasRequiredSbv = 1;
  var FORMAT_NAME = "sbv";
  var helper = {
    toMilliseconds: function toMilliseconds(s) {
      var match = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
      var hh = parseInt(match[1]);
      var mm = parseInt(match[2]);
      var ss = parseInt(match[3]);
      var ff = match[5] ? parseInt(match[5]) : 0;
      var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
      return ms;
    },
    toTimeString: function toTimeString(ms) {
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
    var captions = [];
    var eol = options.eol || "\r\n";
    var parts = content.split(/\r?\n\s+\r?\n/);
    for (var i = 0; i < parts.length; i++) {
      var regex = /^(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*[,;]\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
      var match = regex.exec(parts[i]);
      if (match) {
        var caption = {};
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
  }

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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  sbv = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return sbv;
}

var smi;
var hasRequiredSmi;
function requireSmi() {
  if (hasRequiredSmi) return smi;
  hasRequiredSmi = 1;
  var FORMAT_NAME = "smi";
  var helper = {
    htmlEncode: function htmlEncode(text) {
      return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;')
      //.replace(/\s/g, '&nbsp;')
      .replace(/\r?\n/g, '<BR>');
    },
    htmlDecode: function htmlDecode(html, eol) {
      return html.replace(/\<BR\s*\/?\>/gi, eol || '\r\n').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }
  };

  /******************************************************************************************
   * Parses captions in SAMI format (.smi)
   ******************************************************************************************/
  function parse(content, options) {
    var captions = [];
    var eol = options.eol || "\r\n";
    var title = /\<TITLE[^\>]*\>([\s\S]*)\<\/TITLE\>/gi.exec(content);
    if (title) {
      var caption = {};
      caption.type = "meta";
      caption.name = "title";
      caption.data = title[1].replace(/^[\s\r\n]*/g, "").replace(/[\s\r\n]*$/g, "");
      captions.push(caption);
    }
    var style = /\<STYLE[^\>]*\>([\s\S]*)\<\/STYLE\>/gi.exec(content);
    if (style) {
      var caption = {};
      caption.type = "meta";
      caption.name = "style";
      caption.data = style[1];
      captions.push(caption);
    }
    var sami = content.replace(/^[\s\S]*\<BODY[^\>]*\>/gi, "") //Remove content before body
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
        var caption = {};
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
          blank = html.replace(/&nbsp;/gi, " ").replace(/[\s\r\n]+/g, "").length == 0;
          caption.text = helper.htmlDecode(html, eol);
        }
        if (!options.preserveSpaces && blank) {
          if (options.verbose) {
            console.log("INFO: Skipping white space caption at " + caption.start);
          }
        } else {
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
  }

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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  smi = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return smi;
}

var srt;
var hasRequiredSrt;
function requireSrt() {
  if (hasRequiredSrt) return srt;
  hasRequiredSrt = 1;
  var FORMAT_NAME = "srt";
  var helper = {
    toMilliseconds: function toMilliseconds(s) {
      var match = /^\s*(\d{1,2}):(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
      var hh = parseInt(match[1]);
      var mm = parseInt(match[2]);
      var ss = parseInt(match[3]);
      var ff = match[5] ? parseInt(match[5]) : 0;
      var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
      return ms;
    },
    toTimeString: function toTimeString(ms) {
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
    var captions = [];
    var eol = options.eol || "\r\n";
    var parts = content.split(/\r?\n\s+\r?\n/g);
    for (var i = 0; i < parts.length; i++) {
      var regex = /^(\d+)\r?\n(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*(\d{1,2}:\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
      var match = regex.exec(parts[i]);
      if (match) {
        var caption = {};
        caption.type = "caption";
        caption.index = parseInt(match[1]);
        caption.start = helper.toMilliseconds(match[2]);
        caption.end = helper.toMilliseconds(match[4]);
        caption.duration = caption.end - caption.start;
        var lines = match[6].split(/\r?\n/);
        caption.content = lines.join(eol);
        caption.text = caption.content.replace(/\<[^\>]+\>/g, "") //<b>bold</b> or <i>italic</i>
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
  }

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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  srt = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return srt;
}

var sub;
var hasRequiredSub;
function requireSub() {
  if (hasRequiredSub) return sub;
  hasRequiredSub = 1;
  var FORMAT_NAME = "sub";
  var DEFAULT_FPS = 25;

  /******************************************************************************************
   * Parses captions in MicroDVD format: https://en.wikipedia.org/wiki/MicroDVD
   ******************************************************************************************/
  function parse(content, options) {
    var fps = options.fps > 0 ? options.fps : DEFAULT_FPS;
    var captions = [];
    var eol = options.eol || "\r\n";
    var parts = content.split(/\r?\n/g);
    for (var i = 0; i < parts.length; i++) {
      var regex = /^\{(\d+)\}\{(\d+)\}(.*)$/gi;
      var match = regex.exec(parts[i]);
      if (match) {
        var caption = {};
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
  }

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
        var startFrame = _typeof$1(caption.frame) == "object" && caption.frame.start >= 0 ? caption.frame.start : caption.start * fps;
        var endFrame = _typeof$1(caption.frame) == "object" && caption.frame.end >= 0 ? caption.frame.end : caption.end * fps;
        var text = caption.text.replace(/\r?\n/, "|");
        sub += "{" + startFrame + "}" + "{" + endFrame + "}" + text + eol;
        continue;
      }
      if (options.verbose) {
        console.log("SKIP:", caption);
      }
    }
    return sub;
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  sub = {
    name: FORMAT_NAME,
    detect: detect,
    parse: parse,
    build: build
  };
  return sub;
}

var vtt;
var hasRequiredVtt;
function requireVtt() {
  if (hasRequiredVtt) return vtt;
  hasRequiredVtt = 1;
  var FORMAT_NAME = "vtt";
  var helper = {
    toMilliseconds: function toMilliseconds(s) {
      var match = /^\s*(\d{1,2}:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
      var hh = match[1] ? parseInt(match[1].replace(":", "")) : 0;
      var mm = parseInt(match[2]);
      var ss = parseInt(match[3]);
      var ff = match[5] ? parseInt(match[5]) : 0;
      var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff;
      return ms;
    },
    toTimeString: function toTimeString(ms) {
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
    var captions = [];
    var eol = options.eol || "\r\n";
    var parts = content.split(/\r?\n\s+\r?\n/);
    for (var i = 0; i < parts.length; i++) {
      //WebVTT data
      var regex = /^([^\r\n]+\r?\n)?((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\s*\-\-\>\s*((\d{1,2}:)?\d{1,2}:\d{1,2}([.,]\d{1,3})?)\r?\n([\s\S]*)(\r?\n)*$/gi;
      var match = regex.exec(parts[i]);
      if (match) {
        var caption = {};
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
        caption.text = caption.content.replace(/\<[^\>]+\>/g, "") //<b>bold</b> or <i>italic</i>
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
        var caption = {};
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
  }

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
  }

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
  }

  /******************************************************************************************
   * Export
   ******************************************************************************************/
  vtt = {
    name: FORMAT_NAME,
    helper: helper,
    detect: detect,
    parse: parse,
    build: build
  };
  return vtt;
}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
		"/node_modules/subsrt/lib/format/ass.js": requireAss,
		"/node_modules/subsrt/lib/format/json.js": requireJson,
		"/node_modules/subsrt/lib/format/lrc.js": requireLrc,
		"/node_modules/subsrt/lib/format/sbv.js": requireSbv,
		"/node_modules/subsrt/lib/format/smi.js": requireSmi,
		"/node_modules/subsrt/lib/format/srt.js": requireSrt,
		"/node_modules/subsrt/lib/format/ssa.js": requireSsa,
		"/node_modules/subsrt/lib/format/sub.js": requireSub,
		"/node_modules/subsrt/lib/format/vtt.js": requireVtt
	});
}

function createCommonjsRequire(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	};
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}

var subsrt$1 = {
  format: {}
};
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/******************************************************************************************
 * Loads the subtitle format parsers and builders
 ******************************************************************************************/
(function init() {
  //Load in the predefined order
  var formats = ["vtt", "lrc", "smi", "ssa", "ass", "sub", "srt", "sbv", "json"];
  for (var i = 0; i < formats.length; i++) {
    var f = formats[i];
    var handler = createCommonjsRequire("/node_modules/subsrt/lib")('./format/' + f + '.js');
    subsrt$1.format[handler.name] = handler;
  }
})();

/******************************************************************************************
 * Gets a list of supported subtitle formats.
 ******************************************************************************************/
subsrt$1.list = function () {
  return Object.keys(subsrt$1.format);
};

/******************************************************************************************
 * Detects a subtitle format from the content.
 ******************************************************************************************/
subsrt$1.detect = function (content) {
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
    if (d === true) {
      //Logical true
      return f;
    }
    if (f == d) {
      //Format name
      return d;
    }
  }
};

/******************************************************************************************
 * Parses a subtitle content.
 ******************************************************************************************/
subsrt$1.parse = function (content, options) {
  options = options || {};
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
subsrt$1.build = function (captions, options) {
  options = options || {};
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
subsrt$1.convert = function (content, options) {
  if (typeof options == "string") {
    options = {
      to: options
    };
  }
  options = options || {};
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
subsrt$1.resync = function (captions, options) {
  options = options || {};
  var func, ratio, frame, offset;
  if (typeof options == "function") {
    func = options; //User's function to handle time shift
  } else if (typeof options == "number") {
    offset = options; //Time shift (+/- offset)
    func = function func(a) {
      return [a[0] + offset, a[1] + offset];
    };
  } else if (_typeof$1(options) == "object") {
    offset = (options.offset || 0) * (options.frame ? options.fps || 25 : 1);
    ratio = options.ratio || 1.0;
    frame = options.frame;
    func = function func(a) {
      return [Math.round(a[0] * ratio + offset), Math.round(a[1] * ratio + offset)];
    };
  } else {
    throw new Error("Argument 'options' not defined!");
  }
  var resynced = [];
  for (var i = 0; i < captions.length; i++) {
    var caption = clone(captions[i]);
    if (typeof caption.type === "undefined" || caption.type == "caption") {
      if (frame) {
        var shift = func([caption.frame.start, caption.frame.end]);
        if (shift && shift.length == 2) {
          caption.frame.start = shift[0];
          caption.frame.end = shift[1];
          caption.frame.count = caption.frame.end - caption.frame.start;
        }
      } else {
        var shift = func([caption.start, caption.end]);
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

var subsrt = subsrt_1;
var oldVTT = subsrt.format.vtt;
subsrt.format.vtt = {
  name: 'vtt',
  parse: oldVTT.parse,
  build: function build(captions, options) {
    function replace(entry, fn) {
      entry.data.Text = fn(entry.data.Text);
      entry.text = fn(entry.text);
    }
    // Make a copy and remove meta since there's an issue with subsrt not
    // displaying it properly.
    var fixedCaptions = _toConsumableArray(captions).filter(function (x) {
      return x.type !== 'meta';
    });
    // Also, trim the text while we're at it to ensure there's no newline
    // at the start and replace & and < since these characters are not allowed
    // as part of WebVTT spec
    fixedCaptions.forEach(function (entry) {
      if (entry.type !== 'caption') {
        return;
      }
      replace(entry, function (s) {
        return s.trim().replace('\\N', '').replace('\\R', '').replace('&', '&amp;').replace('<', '&lt;');
      });
    });
    var content = oldVTT.build(fixedCaptions, options);
    content = content.replace(/(.*) --> (.*)/g, function (match, p1, p2) {
      return "".concat(p1.replace(/,/, '.'), " --> ").concat(p2.replace(/,/, '.'));
    });
    return content;
  },
  detect: oldVTT.detect
};
var Subtitle$2 = /*#__PURE__*/function () {
  function Subtitle(label, language, content) {
    _classCallCheck(this, Subtitle);
    this.label = label;
    this.language = language;
    if (typeof content === 'string') {
      this.captions = subsrt.parse(content);
    } else {
      this.captions = content;
    }
  }
  _createClass(Subtitle, [{
    key: "build",
    value: function build(format) {
      return subsrt.build(this.captions, {
        format: format
      });
    }
  }], [{
    key: "detect",
    value: function detect(content) {
      return subsrt.detect(content);
    }
  }]);
  return Subtitle;
}();
var subtitle = Subtitle$2;

var Axios$1 = axios$2.exports;
var Subtitle$1 = subtitle;
var episode = /*#__PURE__*/function () {
  /**
   *
   * @param {string} url
   * @param {any} parameters
   * @param {import('axios').AxiosInstance} axios
   */
  function Episode(url, parameters) {
    var axios = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Axios$1.create();
    _classCallCheck(this, Episode);
    this.url = url;
    Object.assign(this, parameters);
    this.axios = axios;
  }
  _createClass(Episode, [{
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Unimplemented');
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function parse() {
        return _parse.apply(this, arguments);
      }
      return parse;
    }()
  }, {
    key: "getLanguageAndCountry",
    value: function getLanguageAndCountry(input) {
      var countryMap = {
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
      var languageMap = {
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
      var lang = input.substring(0, 2).toLowerCase();
      var ctry = input.substring(2, 4).toUpperCase();
      var language = languageMap[lang];
      var country = countryMap[ctry];
      return {
        language: language,
        country: country
      };
    }
  }, {
    key: "getStreamsByLanuage",
    value: function getStreamsByLanuage(audioLang, hardsubLang) {
      var streams = this.config.streams;
      return streams.filter(function (stream) {
        return stream.audio_lang === audioLang && stream.hardsub_lang === hardsubLang;
      });
    }
  }, {
    key: "getSubtitles",
    value: function () {
      var _getSubtitles = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        var _this = this;
        var axios, subtitleMetadata;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                axios = this.axios;
                subtitleMetadata = this.config.subtitles;
                this.subtitles = [];
                _context3.next = 5;
                return Promise.all(subtitleMetadata.map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(_ref) {
                    var language, url, title, response, ass;
                    return regenerator.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            language = _ref.language, url = _ref.url, title = _ref.title, _ref.format;
                            _context2.next = 3;
                            return axios.get(url);
                          case 3:
                            response = _context2.sent;
                            if (!(response.status !== 200)) {
                              _context2.next = 6;
                              break;
                            }
                            throw new Error(response.statusText);
                          case 6:
                            ass = response.data;
                            _this.subtitles.push(new Subtitle$1(title, language.substr(0, 2), ass));
                          case 8:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));
                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function getSubtitles() {
        return _getSubtitles.apply(this, arguments);
      }
      return getSubtitles;
    }()
  }, {
    key: "processMetadata",
    value: function () {
      var _processMetadata = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        var _this2 = this;
        var config, metadata, streams;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                config = this.config;
                metadata = config.metadata, streams = config.streams;
                this.episodeTitle = metadata.title;
                this.episodeNumber = Number(metadata.episode_number);
                this.poster = config.thumbnail.url;
                streams.forEach(function (stream) {
                  try {
                    if (stream.audio_lang) {
                      var _this2$getLanguageAnd = _this2.getLanguageAndCountry(stream.audio_lang),
                        language = _this2$getLanguageAnd.language,
                        country = _this2$getLanguageAnd.country;
                      Object.assign(stream, {
                        audio: {
                          language: language,
                          country: country
                        }
                      });
                    }
                  } catch (e) {}
                  try {
                    var _this2$getLanguageAnd2 = _this2.getLanguageAndCountry(stream.hardsub_lang),
                      _language = _this2$getLanguageAnd2.language,
                      _country = _this2$getLanguageAnd2.country;
                    Object.assign(stream, {
                      hardsub: {
                        language: _language,
                        country: _country
                      }
                    });
                  } catch (e) {}
                }, this);
              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function processMetadata() {
        return _processMetadata.apply(this, arguments);
      }
      return processMetadata;
    }()
  }]);
  return Episode;
}();

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest();
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var mustache$1 = {exports: {}};

(function (module, exports) {
  (function (global, factory) {
    module.exports = factory() ;
  })(commonjsGlobal, function () {

    /*!
     * mustache.js - Logic-less {{mustache}} templates with JavaScript
     * http://github.com/janl/mustache.js
     */
    var objectToString = Object.prototype.toString;
    var isArray = Array.isArray || function isArrayPolyfill(object) {
      return objectToString.call(object) === '[object Array]';
    };
    function isFunction(object) {
      return typeof object === 'function';
    }

    /**
     * More correct typeof string handling array
     * which normally returns typeof 'object'
     */
    function typeStr(obj) {
      return isArray(obj) ? 'array' : _typeof$1(obj);
    }
    function escapeRegExp(string) {
      return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    }

    /**
     * Null safe way of checking whether or not an object,
     * including its prototype, has a given property
     */
    function hasProperty(obj, propName) {
      return obj != null && _typeof$1(obj) === 'object' && propName in obj;
    }

    /**
     * Safe way of detecting whether or not the given thing is a primitive and
     * whether it has the given property
     */
    function primitiveHasOwnProperty(primitive, propName) {
      return primitive != null && _typeof$1(primitive) !== 'object' && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
    }

    // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
    // See https://github.com/janl/mustache.js/issues/189
    var regExpTest = RegExp.prototype.test;
    function testRegExp(re, string) {
      return regExpTest.call(re, string);
    }
    var nonSpaceRe = /\S/;
    function isWhitespace(string) {
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
    function escapeHtml(string) {
      return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
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
    function parseTemplate(template, tags) {
      if (!template) return [];
      var lineHasNonSpace = false;
      var sections = []; // Stack to hold section tokens
      var tokens = []; // Buffer to hold the tokens
      var spaces = []; // Indices of whitespace tokens on the current line
      var hasTag = false; // Is there a {{tag}} on the current line?
      var nonSpace = false; // Is there a non-space char on the current line?
      var indentation = ''; // Tracks indentation for tags that use it
      var tagIndex = 0; // Stores a count of number of tags encountered on a line

      // Strips all whitespace tokens array for the current line
      // if there was a {{#tag}} on it and otherwise only space.
      function stripSpace() {
        if (hasTag && !nonSpace) {
          while (spaces.length) {
            delete tokens[spaces.pop()];
          }
        } else {
          spaces = [];
        }
        hasTag = false;
        nonSpace = false;
      }
      var openingTagRe, closingTagRe, closingCurlyRe;
      function compileTags(tagsToCompile) {
        if (typeof tagsToCompile === 'string') tagsToCompile = tagsToCompile.split(spaceRe, 2);
        if (!isArray(tagsToCompile) || tagsToCompile.length !== 2) throw new Error('Invalid tags: ' + tagsToCompile);
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
            tokens.push(['text', chr, start, start + 1]);
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
        if (!scanner.scan(openingTagRe)) break;
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
        if (!scanner.scan(closingTagRe)) throw new Error('Unclosed tag at ' + scanner.pos);
        if (type == '>') {
          token = [type, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
        } else {
          token = [type, value, start, scanner.pos];
        }
        tagIndex++;
        tokens.push(token);
        if (type === '#' || type === '^') {
          sections.push(token);
        } else if (type === '/') {
          // Check section nesting.
          openSection = sections.pop();
          if (!openSection) throw new Error('Unopened section "' + value + '" at ' + start);
          if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
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
      if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
      return nestTokens(squashTokens(tokens));
    }

    /**
     * Combines the values of consecutive text tokens in the given `tokens` array
     * to a single token.
     */
    function squashTokens(tokens) {
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
    function nestTokens(tokens) {
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
    function Scanner(string) {
      this.string = string;
      this.tail = string;
      this.pos = 0;
    }

    /**
     * Returns `true` if the tail is empty (end of string).
     */
    Scanner.prototype.eos = function eos() {
      return this.tail === '';
    };

    /**
     * Tries to match the given regular expression at the current position.
     * Returns the matched text if it can match, the empty string otherwise.
     */
    Scanner.prototype.scan = function scan(re) {
      var match = this.tail.match(re);
      if (!match || match.index !== 0) return '';
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    };

    /**
     * Skips all text until the given regular expression can be matched. Returns
     * the skipped string, which is the entire tail if no match can be made.
     */
    Scanner.prototype.scanUntil = function scanUntil(re) {
      var index = this.tail.search(re),
        match;
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
    function Context(view, parentContext) {
      this.view = view;
      this.cache = {
        '.': this.view
      };
      this.parent = parentContext;
    }

    /**
     * Creates a new context using the given view with this context
     * as the parent.
     */
    Context.prototype.push = function push(view) {
      return new Context(view, this);
    };

    /**
     * Returns the value of the given name in this context, traversing
     * up the context hierarchy if the value is absent in this context's view.
     */
    Context.prototype.lookup = function lookup(name) {
      var cache = this.cache;
      var value;
      if (cache.hasOwnProperty(name)) {
        value = cache[name];
      } else {
        var context = this,
          intermediateValue,
          names,
          index,
          lookupHit = false;
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
              if (index === names.length - 1) lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
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
      if (isFunction(value)) value = value.call(this.view);
      return value;
    };

    /**
     * A Writer knows how to take a stream of tokens and render them to a
     * string, given a context. It also maintains a cache of templates to
     * avoid the need to parse the same template twice.
     */
    function Writer() {
      this.templateCache = {
        _cache: {},
        set: function set(key, value) {
          this._cache[key] = value;
        },
        get: function get(key) {
          return this._cache[key];
        },
        clear: function clear() {
          this._cache = {};
        }
      };
    }

    /**
     * Clears all cached templates in this writer.
     */
    Writer.prototype.clearCache = function clearCache() {
      if (typeof this.templateCache !== 'undefined') {
        this.templateCache.clear();
      }
    };

    /**
     * Parses and caches the given `template` according to the given `tags` or
     * `mustache.tags` if `tags` is omitted,  and returns the array of tokens
     * that is generated from the parse.
     */
    Writer.prototype.parse = function parse(template, tags) {
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
    Writer.prototype.render = function render(template, view, partials, config) {
      var tags = this.getConfigTags(config);
      var tokens = this.parse(template, tags);
      var context = view instanceof Context ? view : new Context(view, undefined);
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
    Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config) {
      var buffer = '';
      var token, symbol, value;
      for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
        value = undefined;
        token = tokens[i];
        symbol = token[0];
        if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate, config);else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate, config);else if (symbol === '>') value = this.renderPartial(token, context, partials, config);else if (symbol === '&') value = this.unescapedValue(token, context);else if (symbol === 'name') value = this.escapedValue(token, context, config);else if (symbol === 'text') value = this.rawValue(token);
        if (value !== undefined) buffer += value;
      }
      return buffer;
    };
    Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config) {
      var self = this;
      var buffer = '';
      var value = context.lookup(token[1]);

      // This function is used to render an arbitrary template
      // in the current context by higher-order sections.
      function subRender(template) {
        return self.render(template, context, partials, config);
      }
      if (!value) return;
      if (isArray(value)) {
        for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
          buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config);
        }
      } else if (_typeof$1(value) === 'object' || typeof value === 'string' || typeof value === 'number') {
        buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config);
      } else if (isFunction(value)) {
        if (typeof originalTemplate !== 'string') throw new Error('Cannot use higher-order sections without the original template');

        // Extract the portion of the original template that the section contains.
        value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
        if (value != null) buffer += value;
      } else {
        buffer += this.renderTokens(token[4], context, partials, originalTemplate, config);
      }
      return buffer;
    };
    Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config) {
      var value = context.lookup(token[1]);

      // Use JavaScript's definition of falsy. Include empty arrays.
      // See https://github.com/janl/mustache.js/issues/186
      if (!value || isArray(value) && value.length === 0) return this.renderTokens(token[4], context, partials, originalTemplate, config);
    };
    Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
      var filteredIndentation = indentation.replace(/[^ \t]/g, '');
      var partialByNl = partial.split('\n');
      for (var i = 0; i < partialByNl.length; i++) {
        if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
          partialByNl[i] = filteredIndentation + partialByNl[i];
        }
      }
      return partialByNl.join('\n');
    };
    Writer.prototype.renderPartial = function renderPartial(token, context, partials, config) {
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
    Writer.prototype.unescapedValue = function unescapedValue(token, context) {
      var value = context.lookup(token[1]);
      if (value != null) return value;
    };
    Writer.prototype.escapedValue = function escapedValue(token, context, config) {
      var escape = this.getConfigEscape(config) || mustache.escape;
      var value = context.lookup(token[1]);
      if (value != null) return typeof value === 'number' && escape === mustache.escape ? String(value) : escape(value);
    };
    Writer.prototype.rawValue = function rawValue(token) {
      return token[1];
    };
    Writer.prototype.getConfigTags = function getConfigTags(config) {
      if (isArray(config)) {
        return config;
      } else if (config && _typeof$1(config) === 'object') {
        return config.tags;
      } else {
        return undefined;
      }
    };
    Writer.prototype.getConfigEscape = function getConfigEscape(config) {
      if (config && _typeof$1(config) === 'object' && !isArray(config)) {
        return config.escape;
      } else {
        return undefined;
      }
    };
    var mustache = {
      name: 'mustache.js',
      version: '4.2.0',
      tags: ['{{', '}}'],
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
      set templateCache(cache) {
        defaultWriter.templateCache = cache;
      },
      /**
       * Gets the default or overridden caching object from the default writer.
       */
      get templateCache() {
        return defaultWriter.templateCache;
      }
    };

    // All high-level mustache.* functions use this writer.
    var defaultWriter = new Writer();

    /**
     * Clears all cached templates in the default writer.
     */
    mustache.clearCache = function clearCache() {
      return defaultWriter.clearCache();
    };

    /**
     * Parses and caches the given template in the default writer and returns the
     * array of tokens it contains. Doing this ahead of time avoids the need to
     * parse templates on the fly as they are rendered.
     */
    mustache.parse = function parse(template, tags) {
      return defaultWriter.parse(template, tags);
    };

    /**
     * Renders the `template` with the given `view`, `partials`, and `config`
     * using the default writer.
     */
    mustache.render = function render(template, view, partials, config) {
      if (typeof template !== 'string') {
        throw new TypeError('Invalid template! Template should be a "string" ' + 'but "' + typeStr(template) + '" was given as the first ' + 'argument for mustache#render(template, view, partials)');
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
  });
})(mustache$1);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var mustache = mustache$1.exports;
var Episode$1 = episode;
var tokenURL = 'https://www.crunchyroll.com/auth/v1/token';
var signatureURL = 'https://www.crunchyroll.com/index/v2';
var queryParams = '?Signature={{signature}}&Policy={{policy}}&Key-Pair-Id={{keyPairID}}';
var metadataURLTemplate = "https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/objects/{{videoID}}".concat(queryParams);
var streamsURLTemplate = "https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/videos/{{videoID}}/streams".concat(queryParams);
var videoIDRegex = /https?:\/\/(.*\.)?crunchyroll\.com\/(\S+\/)?watch\/([a-zA-Z0-9_]+)(\/.*)?/;
var defaultCMSType = 'cms';
var beta = /*#__PURE__*/function (_Episode) {
  _inherits(NewEpisode, _Episode);
  var _super = _createSuper(NewEpisode);
  function NewEpisode() {
    _classCallCheck(this, NewEpisode);
    return _super.apply(this, arguments);
  }
  _createClass(NewEpisode, [{
    key: "fetchMetadataURL",
    value:
    /**
     *
     * @param {import('./types').AuthInfo} authInfo
     * @param {string[]} templates
     * @returns
     */
    function () {
      var _fetchMetadataURL = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(_ref) {
        var videoID,
          keyPairID,
          policy,
          signature,
          cmsBucket,
          templates,
          axios,
          _iterator,
          _step,
          urlTemplate,
          metadataURL,
          response,
          _args = arguments;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                videoID = _ref.videoID, keyPairID = _ref.keyPairID, policy = _ref.policy, signature = _ref.signature, cmsBucket = _ref.cmsBucket;
                templates = _args.length > 1 && _args[1] !== undefined ? _args[1] : [metadataURLTemplate];
                axios = this.axios;
                _iterator = _createForOfIteratorHelper(templates);
                _context.prev = 4;
                _iterator.s();
              case 6:
                if ((_step = _iterator.n()).done) {
                  _context.next = 20;
                  break;
                }
                urlTemplate = _step.value;
                _context.prev = 8;
                metadataURL = mustache.render(urlTemplate, {
                  cmsBucket: cmsBucket,
                  videoID: videoID,
                  keyPairID: keyPairID,
                  policy: policy,
                  signature: signature
                });
                _context.next = 12;
                return axios.get(metadataURL);
              case 12:
                response = _context.sent;
                return _context.abrupt("return", response);
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](8);
              case 18:
                _context.next = 6;
                break;
              case 20:
                _context.next = 25;
                break;
              case 22:
                _context.prev = 22;
                _context.t1 = _context["catch"](4);
                _iterator.e(_context.t1);
              case 25:
                _context.prev = 25;
                _iterator.f();
                return _context.finish(25);
              case 28:
                throw new Error('Failed to fetch data from all metadata URLs');
              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 22, 25, 28], [8, 16]]);
      }));
      function fetchMetadataURL(_x) {
        return _fetchMetadataURL.apply(this, arguments);
      }
      return fetchMetadataURL;
    }()
    /**
     *
     * @param {string} href
     * @param {import('./types').AuthInfo} authInfo
     * @param {string[]} templates
     * @returns
     */
  }, {
    key: "fetchStreamsURL",
    value: function () {
      var _fetchStreamsURL = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(href, _ref2) {
        var videoID,
          keyPairID,
          policy,
          signature,
          cmsBucket,
          templates,
          axios,
          _iterator2,
          _step2,
          _streamsURLTemplate,
          streamsURL,
          response,
          _args2 = arguments;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                videoID = _ref2.videoID, keyPairID = _ref2.keyPairID, policy = _ref2.policy, signature = _ref2.signature, cmsBucket = _ref2.cmsBucket;
                templates = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : [streamsURLTemplate];
                axios = this.axios;
                _iterator2 = _createForOfIteratorHelper(templates);
                _context2.prev = 4;
                _iterator2.s();
              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 20;
                  break;
                }
                _streamsURLTemplate = _step2.value;
                _context2.prev = 8;
                streamsURL = mustache.render(_streamsURLTemplate, {
                  cmsBucket: cmsBucket,
                  videoID: videoID,
                  keyPairID: keyPairID,
                  policy: policy,
                  signature: signature
                });
                _context2.next = 12;
                return axios.get(streamsURL);
              case 12:
                response = _context2.sent;
                return _context2.abrupt("return", response);
              case 16:
                _context2.prev = 16;
                _context2.t0 = _context2["catch"](8);
              case 18:
                _context2.next = 6;
                break;
              case 20:
                _context2.next = 25;
                break;
              case 22:
                _context2.prev = 22;
                _context2.t1 = _context2["catch"](4);
                _iterator2.e(_context2.t1);
              case 25:
                _context2.prev = 25;
                _iterator2.f();
                return _context2.finish(25);
              case 28:
                throw new Error('Failed to fetch data from all streams URLs');
              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 22, 25, 28], [8, 16]]);
      }));
      function fetchStreamsURL(_x2, _x3) {
        return _fetchStreamsURL.apply(this, arguments);
      }
      return fetchStreamsURL;
    }()
    /**
     *
     * @returns {Promise<string>}
     */
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        var axios, basicAuth, grantTypes, _i, _grantTypes, grantType, params, response, accessToken;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                axios = this.axios, basicAuth = this.basicAuth; // We need to try two grant types
                grantTypes = ['etp_rt_cookie', 'client_id'];
                _i = 0, _grantTypes = grantTypes;
              case 3:
                if (!(_i < _grantTypes.length)) {
                  _context3.next = 20;
                  break;
                }
                grantType = _grantTypes[_i];
                params = new URLSearchParams();
                params.set('grant_type', grantType);
                _context3.prev = 7;
                _context3.next = 10;
                return axios.post(tokenURL, params, {
                  headers: {
                    Authorization: "Basic ".concat(basicAuth),
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  withCredentials: true
                });
              case 10:
                response = _context3.sent;
                accessToken = response.data.access_token;
                return _context3.abrupt("return", accessToken);
              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](7);
              case 17:
                _i++;
                _context3.next = 3;
                break;
              case 20:
                throw new Error('Failed to get access token');
              case 21:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 15]]);
      }));
      function getAccessToken() {
        return _getAccessToken.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "parse",
    value: function () {
      var _parse = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        var axios, response, data, _yield$this$getConfig, basicAuth, accessToken, cmsType, _response, _response$data$cmsTyp, cmsBucket, keyPairID, policy, signature, match, err, videoID, _response2, _response2$data$items, objectMetadata, metadata, _objectMetadata$image, thumbnails, streamsHref, streamsTemplates, altTemplate, _response3, _response3$data, streamsRaw, subtitlesRaw, streams, _i2, _Object$entries, _Object$entries$_i, type, _i3, _Object$entries2, _Object$entries2$_i, locale, entry, stream, subtitles, _i4, _Object$values, _data, _locale, format, url, language, country, title, _this$getLanguageAndC, subtitle;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                axios = this.axios;
                if (this.basicAuth) {
                  _context4.next = 11;
                  break;
                }
                _context4.next = 4;
                return axios.get(this.url);
              case 4:
                response = _context4.sent;
                // Get config
                data = response.data;
                _context4.next = 8;
                return this.getConfigForParse(data);
              case 8:
                _yield$this$getConfig = _context4.sent;
                basicAuth = _yield$this$getConfig.basicAuth;
                this.basicAuth = basicAuth;
              case 11:
                _context4.next = 13;
                return this.getAccessToken();
              case 13:
                accessToken = _context4.sent;
                _context4.next = 16;
                return axios.get(signatureURL, {
                  headers: {
                    Authorization: "Bearer ".concat(accessToken)
                  }
                });
              case 16:
                response = _context4.sent;
                cmsType = this.cmsType || defaultCMSType;
                _response = response, _response$data$cmsTyp = _response.data[cmsType], cmsBucket = _response$data$cmsTyp.bucket, keyPairID = _response$data$cmsTyp.key_pair_id, policy = _response$data$cmsTyp.policy, signature = _response$data$cmsTyp.signature;
                this.keyPairID = keyPairID;
                this.policy = policy;
                this.signature = signature;

                // Get config
                match = videoIDRegex.exec(this.url);
                if (match) {
                  _context4.next = 27;
                  break;
                }
                err = new Error('Failed to match videoID regex to url');
                err.data = {
                  url: this.url,
                  cmsBucket: cmsBucket
                };
                throw err;
              case 27:
                videoID = match[3];
                _context4.next = 30;
                return this.fetchMetadataURL({
                  videoID: videoID,
                  keyPairID: keyPairID,
                  policy: policy,
                  signature: signature,
                  cmsBucket: cmsBucket
                }, [metadataURLTemplate]);
              case 30:
                response = _context4.sent;
                _response2 = response, _response2$data$items = _slicedToArray(_response2.data.items, 1), objectMetadata = _response2$data$items[0];
                metadata = objectMetadata.episode_metadata;
                this.objectMetadata = objectMetadata;
                this.metadata = metadata;
                // Convert this to be in the same format as the older config so we get some parsing for free
                metadata.title = this.objectMetadata.title;
                this.seriesTitle = metadata.series_title;
                this.seasonIndex = metadata.season_number;
                this.config = {
                  metadata: metadata
                };
                // Poster
                try {
                  _objectMetadata$image = _slicedToArray(objectMetadata.images.thumbnail, 1), thumbnails = _objectMetadata$image[0];
                  this.config.thumbnail = {
                    url: thumbnails[thumbnails.length - 1].source
                  };
                } catch (e) {
                  this.config.thumbnail = {
                    url: ''
                  };
                }
                streamsTemplates = [streamsURLTemplate];
                try {
                  ;
                  streamsHref = objectMetadata.__links__.streams.href;
                  if (streamsHref) {
                    altTemplate = "".concat(new URL(streamsURLTemplate).origin).concat(streamsHref).concat(queryParams);
                    streamsTemplates.unshift(altTemplate);
                  }
                } catch (e) {}
                _context4.next = 44;
                return this.fetchStreamsURL(streamsHref, {
                  videoID: videoID,
                  keyPairID: keyPairID,
                  policy: policy,
                  signature: signature,
                  cmsBucket: cmsBucket
                }, streamsTemplates);
              case 44:
                response = _context4.sent;
                _response3 = response, _response3$data = _response3.data, streamsRaw = _response3$data.streams, subtitlesRaw = _response3$data.subtitles; // We're going to have to convert this streams object to the old format
                streams = [];
                for (_i2 = 0, _Object$entries = Object.entries(streamsRaw); _i2 < _Object$entries.length; _i2++) {
                  _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2), type = _Object$entries$_i[0], data = _Object$entries$_i[1];
                  for (_i3 = 0, _Object$entries2 = Object.entries(data); _i3 < _Object$entries2.length; _i3++) {
                    _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2), locale = _Object$entries2$_i[0], entry = _Object$entries2$_i[1];
                    stream = {};
                    stream.format = type;
                    stream.audio_lang = locale || 'default';
                    stream.hardsub_lang = entry.hardsub_locale;
                    stream.url = entry.url;
                    streams.push(stream);
                  }
                }
                subtitles = [];
                for (_i4 = 0, _Object$values = Object.values(subtitlesRaw); _i4 < _Object$values.length; _i4++) {
                  _data = _Object$values[_i4];
                  _locale = _data.locale, format = _data.format, url = _data.url;
                  language = void 0;
                  country = void 0;
                  title = void 0;
                  try {
                    _this$getLanguageAndC = this.getLanguageAndCountry(_locale);
                    language = _this$getLanguageAndC.language;
                    country = _this$getLanguageAndC.country;
                    title = "".concat(language, " (").concat(country, ")");
                  } catch (e) {
                    language = _locale ? _locale.substring(0, 2) : '--';
                    country = '';
                    title = 'Unknown';
                  }
                  subtitle = {
                    url: url,
                    title: title,
                    language: language,
                    country: country,
                    format: format,
                    kind: 'captions'
                  };
                  subtitles.push(subtitle);
                }
                Object.assign(this.config, {
                  streams: streams,
                  subtitles: subtitles
                });
                _context4.next = 53;
                return this.processMetadata();
              case 53:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function parse() {
        return _parse.apply(this, arguments);
      }
      return parse;
    }()
  }, {
    key: "isPremiumVideo",
    value: function () {
      var _isPremiumVideo = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5() {
        var isPremiumVideo;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this.metadata) {
                  _context5.next = 3;
                  break;
                }
                _context5.next = 3;
                return this.parse();
              case 3:
                isPremiumVideo = this.metadata.is_premium_only;
                return _context5.abrupt("return", !!isPremiumVideo);
              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function isPremiumVideo() {
        return _isPremiumVideo.apply(this, arguments);
      }
      return isPremiumVideo;
    }() // This function returns the basicAuth
    /**
     *
     * @param {string} data
     * @returns {Promise<any>}
     */
  }, {
    key: "getConfigForParse",
    value: function () {
      var _getConfigForParse = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(data) {
        var regex, match, id, basicAuth;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // This data contains the accountAuthClientId parameter that we need
                regex = /"accountAuthClientId":\s*"(.*?)"/g;
                match = regex.exec(data);
                if (match) {
                  _context6.next = 4;
                  break;
                }
                throw new Error('Did not find expected pattern');
              case 4:
                id = match[1];
                basicAuth = btoa("".concat(id, ":")); // This is the format they use..for some reason
                return _context6.abrupt("return", {
                  basicAuth: basicAuth
                });
              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function getConfigForParse(_x4) {
        return _getConfigForParse.apply(this, arguments);
      }
      return getConfigForParse;
    }()
  }]);
  return NewEpisode;
}(Episode$1);

var Axios = axios$2.exports;
var Episode = episode;
var BetaEpisode = beta;
var Subtitle = subtitle;
function getEpisode(_x, _x2) {
  return _getEpisode.apply(this, arguments);
}
function _getEpisode() {
  _getEpisode = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(url, config) {
    var axios,
      episode,
      _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            axios = _args.length > 2 && _args[2] !== undefined ? _args[2] : Axios;
            /** @type {Episode} */
            episode = new BetaEpisode(url, config, axios);
            _context.next = 4;
            return episode.parse();
          case 4:
            return _context.abrupt("return", episode);
          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getEpisode.apply(this, arguments);
}
var src = {
  BetaEpisode: BetaEpisode,
  Episode: Episode,
  Subtitle: Subtitle,
  getEpisode: getEpisode
};

export { src as default };
