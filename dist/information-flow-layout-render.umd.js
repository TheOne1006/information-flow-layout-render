(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.InformationFlowLayoutRender = factory());
}(this, (function () { 'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index = createCommonjsModule(function (module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap');

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (isArrayLike(value) &&
      (isArray(value) || typeof value == 'string' ||
        typeof value.splice == 'function' || isBuffer(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (nonEnumShadows || isPrototype(value)) {
    return !nativeKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEmpty;
});

/**
 * 常量配置
 */
var layoutType = {
    BIG_IMG: 0,
    IMG_TEXT: 1,
    IMGS: 2,
    VIDEO: 3 // 视频模式
};
var remarkType = {
    SHOW_DESC: 0,
    SHOW_SRC_TIME: 1
};

/**
 * Expose `pathToRegexp`.
 */
var compile_1 = compile;
/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = (options && options.delimiter) || '/';
  var delimiters = (options && options.delimiters) || './';
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = (options && options.encode) || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value));

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment;
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix;

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

var StatisticCtrl = (function () {
    /**
     * 初始化成功 即需要 开启统计
     */
    function StatisticCtrl(option) {
        this.sxinid = option && option.sxinid;
        this.delay = (option && option.delay) || 100;
        // 使用默认
        this.url =
            (option && option.url) ||
                "http://fight55.com/s?sxinid=:sxinid&sxinitemid=:sxinitemid(.*?)";
        this.firstRenderUrl =
            (option && option.firstRenderUrl) ||
                "http://fight55.com/s?sxinid=:sxinid&show=1";
        this.createRedirectUrl = option && option.createRedirectUrl;
    }
    StatisticCtrl.prototype.scriptWay = function (src) {
        var dom = document.createElement("script");
        dom.type = "text/javascript";
        dom.src = src;
        document.body.appendChild(dom);
    };
    /**
     * 物料点击
     * @param  {string} sxinitemid 物料 id
     */
    StatisticCtrl.prototype.materielClick = function (sxinitemid) {
        if (!this.url)
            return;
        var toPath = compile_1(this.url);
        var src = toPath({ sxinid: this.sxinid, sxinitemid: sxinitemid });
        this.scriptWay(src);
    };
    StatisticCtrl.prototype.firstRender = function () {
        if (!this.firstRenderUrl)
            return;
        var toPath = compile_1(this.firstRenderUrl);
        var src = toPath({ sxinid: this.sxinid });
        this.scriptWay(src);
    };
    return StatisticCtrl;
}());

var DEFAULT_PAGE_NUM = 1;
var DEFAULT_PAGE_SHOW_NUM = 5;
var LoadCtrl = (function () {
    function LoadCtrl(_a) {
        var _b = _a.initData, initData = _b === void 0 ? [] : _b, _c = _a.nextPage, nextPage = _c === void 0 ? DEFAULT_PAGE_NUM : _c, _d = _a.pageShowNum, pageShowNum = _d === void 0 ? DEFAULT_PAGE_SHOW_NUM : _d, _e = _a.mockRemoteLoad, mockRemoteLoad = _e === void 0 ? false : _e, ajaxFetch = _a.ajaxFetch;
        this.events = {};
        this.loading = false;
        this.isEnd = false;
        this.page = nextPage;
        this.mockRemoteLoad = mockRemoteLoad;
        this.showNum = pageShowNum;
        this.data = initData;
        if (ajaxFetch) {
            this.ajaxFetch = ajaxFetch;
        }
    }
    LoadCtrl.prototype.fetchData = function (page, callback) {
        var _this = this;
        /**
         * 这里不处理 ajax 信息
         */
        if (this.loading)
            return;
        if (this.isEnd)
            return;
        this.loading = true;
        var fetch = this.ajaxFetch;
        this.publish("fetch-begin");
        var success = function (data) {
            _this.loading = false;
            // 加载结束
            if (_this.showNum > data.length) {
                _this.isEnd = true;
            }
            _this.publish("fetch-success");
            callback(data);
        };
        var fail = function (err) {
            _this.loading = false;
            _this.isEnd = true;
            _this.publish("fetch-fail");
            throw err;
        };
        fetch({
            page: page,
            success: success,
            fail: fail
        });
    };
    LoadCtrl.prototype.fetchNext = function (callback) {
        if (this.loading)
            return;
        if (this.isEnd)
            return;
        var page = this.page;
        this.page = page + 1;
        this.fetchData(page, callback);
    };
    LoadCtrl.prototype.mockFetch = function (currentPage, callback) {
        var dataArr = this.data;
        var showNum = this.showNum;
        var start = Math.min((currentPage - 1) * showNum, dataArr.length);
        var end = Math.min(currentPage * showNum, dataArr.length);
        if (end === dataArr.length) {
            this.isEnd = true;
        }
        var curData = dataArr.slice(start, end);
        if (curData.length) {
            callback(curData);
        }
    };
    LoadCtrl.prototype.mockFetchNext = function (callback) {
        if (this.isEnd)
            return;
        var page = this.page;
        this.page = page + 1;
        this.mockFetch(page, callback);
    };
    LoadCtrl.prototype.getInit = function (callback) {
        if (this.mockRemoteLoad) {
            // 模拟加载
            this.mockFetch(1, callback);
        }
        else {
            callback(this.data);
        }
    };
    LoadCtrl.prototype.getNext = function (callback) {
        if (this.mockRemoteLoad) {
            // 模拟加载
            this.mockFetchNext(callback);
        }
        else {
            this.fetchNext(callback);
        }
    };
    LoadCtrl.prototype.subscribe = function (key, fn) {
        if (!this.events[key]) {
            this.events[key] = [];
        }
        this.events[key].push(fn);
    };
    LoadCtrl.prototype.publish = function (key) {
        var otherArgs = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            otherArgs[_i - 1] = arguments[_i];
        }
        var fns = this.events.hasOwnProperty(key) ? this.events[key] : [];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            fn.apply(this, otherArgs);
        }
    };
    return LoadCtrl;
}());

var StyleCtrl = (function () {
    function StyleCtrl() {
        var _this = this;
        /**
         * 组装成单行的 style 内联字符串
         * @param  {object} styleObject 样式对象
         * @return {string}
         */
        this.genStyle = function (styleObject) {
            var styleStr = "";
            if (styleObject) {
                var pxStyles = StyleCtrl.pxStyles;
                for (var attrName in styleObject) {
                    if (styleObject.hasOwnProperty(attrName)) {
                        var val = styleObject[attrName];
                        var isNeedSuffixPx = !!pxStyles[attrName] && (!isNaN(parseFloat(val)) && isFinite(val));
                        styleStr +=
                            attrName +
                                ":" +
                                styleObject[attrName] +
                                (isNeedSuffixPx ? "px;" : ";");
                    }
                }
            }
            return styleStr;
        };
        /**
         * 追加元素的样式设置
         * @param {object} container    dom 元素
         * @param {object} stylesObject styles 对象
         */
        this.appendStyle = function (container, stylesObject) {
            var appendStr = _this.genStyle(stylesObject);
            var originCssText = container.style.cssText;
            container.style.cssText = originCssText + appendStr;
        };
    }
    StyleCtrl.pxStyles = {
        width: 1,
        height: 1,
        "line-height": 1,
        "padding-left": 1,
        "padding-right": 1,
        "padding-top": 1,
        "padding-bottom": 1,
        "border-width": 1,
        "font-size": 1,
        "margin-left": 1,
        "margin-right": 1,
        "margin-top": 1,
        "margin-bottom": 1,
        "border-left-width": 1,
        "border-right-width": 1,
        "border-top-width": 1,
        "border-bottom-width": 1,
        top: 1,
        left: 1,
        bottom: 1,
        right: 1
    };
    /**
     * 获取 dom 对象的 属性
     * @param {object} obj  dom 对象
     * @param {String} prop 属性名
     */
    StyleCtrl.getCurrentStyle = function (dom, prop) {
        if (dom.currentStyle) {
            return dom.currentStyle[prop];
        }
        else if (window.getComputedStyle) {
            return window.getComputedStyle(dom)[prop];
        }
    };
    return StyleCtrl;
}());

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
});

var _isObject = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function(it){
  if(!_isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

var document$1 = _global.document;
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function(it){
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function(){
  return Object.defineProperty(_domCreate('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function(it, S){
  if(!_isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP             = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes){
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if(_ie8DomDefine)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

var _hide = _descriptors ? function(object, key, value){
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function(it, key){
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _redefine = createCommonjsModule(function (module) {
var SRC       = _uid('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

_core.inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)_has(val, 'name') || _hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)_has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === _global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      _hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else _hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function(fn, that, length){
  _aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? _core : _core[name] || (_core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if(target)_redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)_hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
var _export = $export;

var toString = {}.toString;

var _cof = function(it){
  return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings

var _toIobject = function(it){
  return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil  = Math.ceil;
var floor = Math.floor;
var _toInteger = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength
var min       = Math.min;
var _toLength = function(it){
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max       = Math.max;
var min$1       = Math.min;
var _toIndex = function(index, length){
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes

var _arrayIncludes = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = _toIobject($this)
      , length = _toLength(O.length)
      , index  = _toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var SHARED = '__core-js_shared__';
var store  = _global[SHARED] || (_global[SHARED] = {});
var _shared = function(key){
  return store[key] || (store[key] = {});
};

var shared = _shared('keys');
var _sharedKey = function(key){
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO     = _sharedKey('IE_PROTO');

var _objectKeysInternal = function(object, names){
  var O      = _toIobject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)_has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(_has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O){
  return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function(it){
  return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)
var $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = _toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = _objectGops.f
    , isEnum     = _objectPie.f;
  while(aLen > index){
    var S      = _iobject(arguments[index++])
      , keys   = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

/**
 * baseLine 样式
 */
var defaultConfig = {
    "line-height": 0,
    "background-color": "#eee",
    padding: "",
    margin: "8px 0px 0px 10px",
    border: "",
    left: 10,
    height: 1,
    top: 0,
    position: "",
    display: "block",
};
function configCreate(winWidth, customStyles) {
    return Object.assign({}, defaultConfig, { width: winWidth - 20 }, customStyles);
}

var smFontSize = 12;
/**
 * baseLine 样式
 */
var defaultConfig$1 = {
    // top: 0, from custom
    // left: 0, from custom
    width: "",
    height: 12,
    display: "inline-block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none",
    "font-size": smFontSize,
    color: "#999",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": 12,
    // "white-space": "nowrap",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    padding: "",
    // margin: "0px 0px ${spacingMd}px 0px", // from custom
    border: ""
};
function configCreate$1(winWidth, customStyles) {
    return Object.assign({}, defaultConfig$1, customStyles);
}

var itemFontSize = 12;
var itemFontColor = "#999";
var defaultWrapConfig = {
    // top: "", // from customStyles
    // left: "", // from customStyles
    // width: "", // from customStyles
    // height: "", // from customStyles
    display: "block",
    position: "",
    "line-height": "100%",
    "text-align": "left"
};
function configWrapCreate(winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig, customStyles);
}
var defaultItemConfig = {
    top: 0,
    left: 0,
    width: "",
    height: "",
    display: "inline-block",
    position: "",
    "font-size": itemFontSize,
    color: itemFontColor,
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    // "line-height": 12, // from customStyles
    "white-space": "nowrap",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    "margin-right": "8px"
};
function configItemCreate(winWidth, customStyles) {
    return Object.assign({}, defaultItemConfig, customStyles);
}
var srcTimeStyles = {
    configWrapCreate: configWrapCreate,
    configItemCreate: configItemCreate
};

/**
 * 基础的 Section 构建者
 */
var styleController = new StyleCtrl();
var BaseSection = (function () {
    function BaseSection() {
    }
    /**
     * FIXME: 使用 chache 缓存, 增加渲染速度
     * 构建dom 元素, 以及设置 属性, 以及构建其内联样式
     * @param  {string}   nodeName     标签名
     * @param  {object}   attrs  目标标签属性
     * @param  {Function} createStyles 构建样式的方法, 返回值为 Object
     * @return {HTMLElement} 构建完成的 dom 对象
     */
    BaseSection.prototype.buildDom = function (nodeName, attrs, createStyles) {
        if (attrs === void 0) { attrs = {}; }
        var target = document.createElement(nodeName);
        if (attrs) {
            for (var attrName in attrs) {
                if (attrs.hasOwnProperty(attrName)) {
                    target[attrName] = attrs[attrName];
                }
            }
        }
        if (createStyles) {
            var styles = createStyles();
            styleController.appendStyle(target, styles);
        }
        return target;
    };
    /**
     * 创建 desc 的 dom
     * @param  {number}   winWidth window 宽度
     * @param  {number}   top  top属性
     * @param  {number}   left left 属性
     * @param  {string}   desc 描述信息
     * @return {HTMLElement}
     */
    BaseSection.prototype.createDescDom = function (winWidth, top, left, desc) {
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        var attrs = {
            innerText: desc || ""
        };
        var descStyles = configCreate$1(winWidth, {
            top: top,
            left: left,
            "margin-top": top,
            "margin-left": left
        });
        var target = this.buildDom("div", attrs, function () { return descStyles; });
        return target;
    };
    /**
     * 创建 src 和 time 的相关 dom
     * @param  {number} winWidth window 的 宽度
     * @param  {string} src      来源
     * @param  {string} time     时间
     * @param  {number} top      top 属性
     * @param  {number} left     left 属性
     * @param  {number} height   dom 高度
     * @return {HTMLElement}
     */
    BaseSection.prototype.createSrcAndTimeDom = function (winWidth, top, left, height, src, time) {
        var target = document.createElement("div");
        if (!src || !time) {
            return target;
        }
        var customStyles = {
            top: top,
            left: left,
            height: height,
            "margin-left": left,
            "margin-top": top
        };
        var wrapStyles = srcTimeStyles.configWrapCreate(winWidth, customStyles);
        styleController.appendStyle(target, wrapStyles);
        /**
         * src 相关 dom
         */
        var srcDom = document.createElement("div");
        var itemStyles = srcTimeStyles.configItemCreate(winWidth, {
            "line-height": height
        });
        srcDom.innerText = src;
        styleController.appendStyle(srcDom, itemStyles);
        /**
         * time 相关 dom
         */
        var timeDom = document.createElement("div");
        timeDom.innerText = time;
        styleController.appendStyle(timeDom, itemStyles);
        target.appendChild(srcDom);
        target.appendChild(timeDom);
        return target;
    };
    /**
     * 创建分割线
     * @param  {number} winWidth window width
     * @param  {number} top      top 属性
     * @param  {string} position position 属性
     * @return {HTMLElement}
     */
    BaseSection.prototype.createLineDom = function (winWidth, top, position) {
        if (position === void 0) { position = ""; }
        var lineDom = this.buildDom("div", {}, function () {
            return configCreate(winWidth, {
                top: top,
                position: position
            });
        });
        return lineDom;
    };
    return BaseSection;
}());

var spacingMd = 10;
var baseFontSize = 18;
/**
 * wrap 样式
 */
var defaultWrapConfig$1 = {
    top: 0,
    left: 0,
    height: "auto",
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$1 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$1, { width: winWidth }, customStyles);
};
/**
 * title 样式
 */
var defaultTitleContainerConfig = {
    top: 0,
    left: spacingMd,
    height: "auto",
    display: "block",
    position: "",
    "font-size": baseFontSize,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": "auto",
    overflow: "hidden",
    // "white-space": "nowrap",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    "text-decoration": "none",
    padding: "",
    margin: spacingMd + "px 0px 0px " + spacingMd + "px",
    border: ""
};
var configTitleContainerCreate = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleContainerConfig, {
        width: winWidth - 2 * spacingMd
    }, customStyles);
};
/**
 * img container 样式
 */
var defaultImgContainerConfig = {
    top: 0,
    left: spacingMd,
    // width: customHeight,
    // height: customHeight * 1 / 2.3,
    display: "block",
    position: "",
    "background-size": "cover",
    overflow: "hidden",
    border: "",
    margin: spacingMd / 2 + "px 0px 0px " + spacingMd + "px",
    padding: ""
};
var configImgContainerCreate = function (winWidth, customStyles) {
    var width = winWidth - 2 * spacingMd;
    return Object.assign({}, defaultImgContainerConfig, {
        width: width,
        height: width * 1 / 2.3
    }, customStyles);
};
var bigImgStyle = {
    configWrapCreate: configWrapCreate$1,
    configTitleContainerCreate: configTitleContainerCreate,
    configImgContainerCreate: configImgContainerCreate
};

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 大图渲染
 */
var BigImgSection = (function (_super) {
    __extends(BigImgSection, _super);
    function BigImgSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigImgSection.prototype.createWrapper = function (winWidth, href, target, title, touchCallback) {
        if (href === void 0) { href = "javascript:;"; }
        if (target === void 0) { target = "_target"; }
        if (title === void 0) { title = ""; }
        /**
         * 创建基础 wrap dom
         */
        var attrs = {};
        var wrapDom = this.buildDom("a", {
            href: href,
            target: target,
            title: title,
            onclick: touchCallback
        }, function () { return bigImgStyle.configWrapCreate(winWidth); });
        return wrapDom;
    };
    BigImgSection.prototype.createTitle = function (winWidth, title) {
        var titleEle = this.buildDom("span", {
            innerText: title
        }, function () { return bigImgStyle.configTitleContainerCreate(winWidth); });
        return titleEle;
    };
    BigImgSection.prototype.createContent = function (winWidth, imageUrl) {
        var contentEle = this.buildDom("div", {}, function () {
            return bigImgStyle.configImgContainerCreate(winWidth);
        });
        contentEle.style.background = "url(" + imageUrl + ") center center no-repeat";
        contentEle.style.backgroundSize = "cover";
        return contentEle;
    };
    BigImgSection.prototype.createRemark = function (winWidth, type, desc, src, time) {
        if (type === remarkType.SHOW_SRC_TIME) {
            return this.createSrcAndTimeDom(winWidth, 10, 10, 20, src, time);
        }
        return this.createDescDom(winWidth, 10, 10, desc);
    };
    BigImgSection.prototype.render = function (fragment, winWidth, adItem, redirectUrl, touchCallback) {
        var title = adItem.title, imageUrl = adItem.imageUrl, type = adItem.type, src = adItem.src, desc = adItem.desc, time = adItem.time, curl = adItem.curl, target = adItem.target;
        if (!imageUrl) {
            return;
        }
        var wraperEle = this.createWrapper(winWidth, redirectUrl || curl, target, title, touchCallback);
        var titleEle = this.createTitle(winWidth, title);
        var contentEle = this.createContent(winWidth, imageUrl);
        var remarkEle = this.createRemark(winWidth, type, desc, src, time);
        var lineEle = this.createLineDom(winWidth, 0);
        // 组装dom
        wraperEle.appendChild(titleEle);
        wraperEle.appendChild(contentEle);
        wraperEle.appendChild(remarkEle);
        wraperEle.appendChild(lineEle);
        fragment.appendChild(wraperEle);
    };
    return BigImgSection;
}(BaseSection));

var spacingMd$1 = 10;
var spacingSm = 5;
var baseFontSize$1 = 18;
var baseLineHeight = 20;
/**
 * wrap 样式
 */
var defaultWrapConfig$2 = {
    top: 0,
    left: 0,
    // width: winWidth,
    height: "auto",
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$2 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$2, {
        width: winWidth
    }, customStyles);
};
/**
 * title 样式
 */
var defaultTitleConfig = {
    top: 0,
    left: spacingMd$1,
    height: "auto",
    display: "block",
    position: "",
    "font-size": baseFontSize$1,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": baseLineHeight,
    overflow: "hidden",
    // "white-space": "nowrap",
    "-webkit-line-clamp": "2",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    "text-decoration": "none",
    padding: "",
    margin: spacingSm * 3 + "px " + spacingMd$1 + "px 0px",
    border: ""
};
var configTitleCreate = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleConfig, {
        width: winWidth - 2 * spacingMd$1
    }, customStyles);
};
/**
 * imgItem 样式
 */
var defaultImgItemConfig = {
    top: spacingSm,
    left: spacingMd$1,
    // width: width, (winWidth - 6) / 3
    // height: "auto", m * 66 / 98;
    display: "inline-block",
    position: "",
    padding: "",
    margin: spacingSm + "px 0px " + spacingMd$1 + "px " + spacingMd$1 + "px",
    border: ""
};
var configImgItemCreate = function (winWidth, customStyles, itemLen) {
    if (itemLen === void 0) { itemLen = 3; }
    var wrapWidth = winWidth - 2 * spacingMd$1;
    var width = (wrapWidth - itemLen * 2) / itemLen;
    return Object.assign({}, defaultImgItemConfig, {
        width: width,
        height: width * 66 / 98
    }, customStyles);
};
var imgsStyle = {
    configWrapCreate: configWrapCreate$2,
    configTitleCreate: configTitleCreate,
    configImgItemCreate: configImgItemCreate
};

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 多图部分
 */
var ImgsSection = (function (_super) {
    __extends$1(ImgsSection, _super);
    function ImgsSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImgsSection.prototype.createWrapper = function (winWidth, href, target, title, touchCallback) {
        if (href === void 0) { href = "javascript:;"; }
        if (target === void 0) { target = "_target"; }
        if (title === void 0) { title = ""; }
        /**
         * 创建基础 wrap dom
         */
        var attrs = {};
        var wrapDom = this.buildDom("a", {
            href: href,
            target: target,
            title: title,
            onclick: touchCallback
        }, function () { return imgsStyle.configWrapCreate(winWidth); });
        return wrapDom;
    };
    ImgsSection.prototype.createTitle = function (winWidth, title) {
        var titleEle = this.buildDom("span", {
            innerText: title
        }, function () { return imgsStyle.configTitleCreate(winWidth); });
        return titleEle;
    };
    ImgsSection.prototype.createContent = function (winWidth, images) {
        var contentEles = [];
        var imgLen = images.length;
        var _loop_1 = function (i) {
            var curImg = images[i];
            var customStyle = {};
            if (i !== 0) {
                customStyle["margin-left"] = "3px";
            }
            var imgItem = this_1.buildDom("div", {}, function () {
                return imgsStyle.configImgItemCreate(winWidth, customStyle, imgLen);
            });
            imgItem.style.background = "url(" + curImg + ") center center no-repeat";
            imgItem.style.backgroundSize = "cover";
            contentEles.push(imgItem);
        };
        var this_1 = this;
        for (var i = 0; i < imgLen; i++) {
            _loop_1(i);
        }
        return contentEles;
    };
    ImgsSection.prototype.createRemark = function (winWidth, type, desc, src, time) {
        if (type === remarkType.SHOW_SRC_TIME) {
            return this.createSrcAndTimeDom(winWidth, 0, 10, 20, src, time);
        }
        return this.createDescDom(winWidth, 0, 10, desc);
    };
    ImgsSection.prototype.render = function (fragment, winWidth, adItem, redirectUrl, touchCallback) {
        var title = adItem.title, images = adItem.images, type = adItem.type, src = adItem.src, desc = adItem.desc, time = adItem.time, curl = adItem.curl, target = adItem.target;
        if (!images || images.length === 0) {
            return;
        }
        var wraperEle = this.createWrapper(winWidth, redirectUrl || curl, target, title, touchCallback);
        var titleEle = this.createTitle(winWidth, title);
        var contentEles = this.createContent(winWidth, images);
        var remarkEle = this.createRemark(winWidth, type, desc, src, time);
        var lineEle = this.createLineDom(winWidth, 0);
        // 组装dom
        wraperEle.appendChild(titleEle);
        for (var index in contentEles) {
            wraperEle.appendChild(contentEles[index]);
        }
        wraperEle.appendChild(remarkEle);
        wraperEle.appendChild(lineEle);
        fragment.appendChild(wraperEle);
    };
    return ImgsSection;
}(BaseSection));

var spacingMd$2 = 10;
var spacingSm$1 = 5;
var baseFontSize$2 = 18;
var baseLineHeight$1 = 20;
/**
 * wrap 样式
 */
var defaultWrapConfig$3 = {
    top: 0,
    left: 0,
    // width: winWidth,
    // height: (winWidth * 100 / 320) * 33 / 50 + 10 + 5,
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$3 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$3, {
        width: winWidth
        // height: winWidth * 100 / 320 * 33 / 50 + spacingMd + spacingSm * 4
    }, customStyles);
};
/**
 * img 样式
 */
var defulatImgConfig = {
    top: spacingSm$1 * 3,
    left: spacingMd$2,
    // width: 100 * winWidth / 320,
    // height: width * 33 / 50,
    display: "inline-block",
    position: "",
    border: "",
    margin: spacingSm$1 * 3 + "px 0px 0px " + spacingMd$2 + "px",
    padding: "",
    "vertical-align": "top"
};
var configImgCreate = function (winWidth, customStyles) {
    var width = 100 * winWidth / 320;
    return Object.assign({}, defulatImgConfig, {
        width: width,
        height: width * 33 / 50
    }, customStyles);
};
/**
 * rightContent 样式
 */
var defaultRightContentConfig = {
    top: spacingSm$1 * 3,
    // left: 100 * winWidth / 320 + spacingMd * 2,
    // width: winWidth - 3 * 10 - (100 * winWidth / 320),
    // height: (100 * winWidth / 320) * 33 / 50,
    display: "inline-block",
    position: "",
    border: "",
    margin: spacingSm$1 * 3 + "px 0px 0px " + spacingMd$2 + "px",
    padding: "",
    "line-height": "100%",
    "vertical-align": "top"
};
var configRightCreate = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultRightContentConfig, {
        left: leftWidth + spacingMd$2 * 2,
        width: winWidth - 3 * spacingMd$2 - leftWidth
        // height: leftWidth * 33 / 50
    }, customStyles);
};
/**
 * title wrap 样式
 */
var defaultTitleWrapConfig = {
    top: spacingSm$1 * 3 + 3,
    // left: 100 * winWidth / 320 + spacingMd * 2,
    // width: winWidth - 3 * 10 - (100 * winWidth / 320),
    // height: 40,
    display: "inline-block",
    position: "",
    "font-size": baseFontSize$2,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": baseLineHeight$1
};
var configTitleWrapCreate = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultTitleWrapConfig, {
        left: leftWidth + spacingMd$2 * 2,
        width: winWidth - 3 * spacingMd$2 - leftWidth
    }, customStyles);
};
var configTitleCreate$1 = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultTitleWrapConfig, {
        width: winWidth - 3 * spacingMd$2 - leftWidth
    }, customStyles);
};
var imgTextStyle = {
    configWrapCreate: configWrapCreate$3,
    configImgCreate: configImgCreate,
    configRightCreate: configRightCreate,
    configTitleWrapCreate: configTitleWrapCreate,
    configTitleCreate: configTitleCreate$1
};

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 图文部分
 */
var ImgTextSection = (function (_super) {
    __extends$2(ImgTextSection, _super);
    function ImgTextSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImgTextSection.prototype.createWrapper = function (winWidth, href, target, title, touchCallback) {
        if (href === void 0) { href = "javascript:;"; }
        if (target === void 0) { target = "_target"; }
        if (title === void 0) { title = ""; }
        /**
         * 创建基础 wrap dom
         */
        var attrs = {};
        var wrapDom = this.buildDom("a", {
            href: href,
            target: target,
            title: title,
            onclick: touchCallback
        }, function () { return imgTextStyle.configWrapCreate(winWidth); });
        return wrapDom;
    };
    ImgTextSection.prototype.createTitle = function (winWidth, title) {
        var titleWrapDom = this.buildDom("div", {}, function () {
            return imgTextStyle.configTitleWrapCreate(winWidth);
        });
        var titleDom = this.buildDom("span", {
            innerText: title
        }, function () { return imgTextStyle.configTitleCreate(winWidth); });
        titleWrapDom.appendChild(titleDom);
        return titleWrapDom;
    };
    ImgTextSection.prototype.createImgContent = function (winWidth, imageUrl) {
        var imgDom = this.buildDom("div", {}, function () {
            return imgTextStyle.configImgCreate(winWidth);
        });
        imgDom.style.background = "url(" + imageUrl + ") center center no-repeat";
        imgDom.style.backgroundSize = "cover";
        return imgDom;
    };
    ImgTextSection.prototype.createTextContent = function (winWidth) {
        var contentEle = this.buildDom("div", {}, function () {
            return imgTextStyle.configRightCreate(winWidth);
        });
        return contentEle;
    };
    ImgTextSection.prototype.createRemark = function (winWidth, type, desc, src, time) {
        if (type === remarkType.SHOW_SRC_TIME) {
            return this.createSrcAndTimeDom(winWidth, 5, 0, 20, src, time);
        }
        return this.createDescDom(winWidth, 10, 0, desc);
    };
    ImgTextSection.prototype.render = function (fragment, winWidth, adItem, redirectUrl, touchCallback) {
        var title = adItem.title, imageUrl = adItem.imageUrl, type = adItem.type, src = adItem.src, desc = adItem.desc, time = adItem.time, curl = adItem.curl, target = adItem.target;
        if (!imageUrl) {
            return;
        }
        var wraperEle = this.createWrapper(winWidth, redirectUrl || curl, target, title, touchCallback);
        var titleEle = this.createTitle(winWidth, title);
        var imgContentEle = this.createImgContent(winWidth, imageUrl);
        var textContentEle = this.createTextContent(winWidth);
        var remarkEle = this.createRemark(winWidth, type, desc, src, time);
        var lineEle = this.createLineDom(winWidth, 13);
        // 组装dom
        textContentEle.appendChild(titleEle);
        textContentEle.appendChild(remarkEle);
        wraperEle.appendChild(imgContentEle);
        wraperEle.appendChild(textContentEle);
        wraperEle.appendChild(lineEle);
        fragment.appendChild(wraperEle);
    };
    return ImgTextSection;
}(BaseSection));

var smFontSize$1 = 12;
var spacingLg = 15;
/**
 * wrap 样式
 */
var defaultWrapConfig$4 = {
    top: 0,
    left: 0,
    height: spacingLg,
    "line-height": spacingLg,
    "font-size": smFontSize$1,
    display: "block",
    position: "",
    "background-color": "#eee",
    color: "#888",
    overflow: "hidden",
    "text-align": "center"
};
var configWrapCreate$4 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$4, customStyles);
};
var footerStyle = {
    configWrapCreate: configWrapCreate$4
};

var mdFontSize = 16;
var spacingLg$1 = 30;
/**
 * wrap 样式
 */
var defaultWrapConfig$5 = {
    top: 0,
    left: 0,
    height: spacingLg$1,
    "line-height": spacingLg$1,
    display: "block",
    position: "relative",
    "background-color": "#fff",
    margin: "15px 0px 0px 10px",
    overflow: "visible",
    "z-index": "-1",
    "border-bottom": "2px solid #dddddd"
};
var configWrapCreate$5 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$5, { width: winWidth - 15 }, customStyles);
};
var defaultTitleConfig$2 = {
    top: 0,
    left: 0,
    height: spacingLg$1,
    width: 70,
    "line-height": spacingLg$1,
    "font-size": mdFontSize,
    // display: "block",
    position: "relative",
    // "background-color": "#fff",
    color: "#888",
    overflow: "hidden",
    "text-align": "left",
    "border-bottom": "2px solid #4280db"
};
var configTitleCreate$2 = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleConfig$2, customStyles);
};
var headerStyle = {
    configWrapCreate: configWrapCreate$5,
    configTitleCreate: configTitleCreate$2
};

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 大图渲染
 */
var LayoutSections$1 = (function (_super) {
    __extends$3(LayoutSections, _super);
    function LayoutSections() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LayoutSections.prototype.createHeader = function (winWidth, title) {
        if (title === void 0) { title = "猜你喜欢"; }
        var headerEle = this.buildDom("div", {}, function () {
            return headerStyle.configWrapCreate(winWidth);
        });
        var titleEle = this.buildDom("div", {}, function () {
            return headerStyle.configTitleCreate(winWidth);
        });
        titleEle.innerText = title;
        headerEle.appendChild(titleEle);
        return headerEle;
    };
    LayoutSections.prototype.createFooter = function (winWidth) {
        return this.buildDom("div", {}, function () {
            return footerStyle.configWrapCreate(winWidth);
        });
    };
    LayoutSections.prototype.createrContainer = function () {
        return this.buildDom("div", {});
    };
    return LayoutSections;
}(BaseSection));

var spacingMd$3 = 10;
var baseFontSize$3 = 18;
/**
 * wrap 样式
 */
var defaultWrapConfig$6 = {
    top: 0,
    left: 0,
    height: "auto",
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$6 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$6, { width: winWidth }, customStyles);
};
/**
 * title 样式
 */
var defaultTitleContainerConfig$1 = {
    top: 0,
    left: spacingMd$3,
    height: "auto",
    display: "block",
    position: "",
    "font-size": baseFontSize$3,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": "auto",
    overflow: "hidden",
    // "white-space": "nowrap",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    "text-decoration": "none",
    padding: "",
    margin: spacingMd$3 + "px 0px 0px " + spacingMd$3 + "px",
    border: ""
};
var configTitleContainerCreate$1 = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleContainerConfig$1, {
        width: winWidth - 2 * spacingMd$3
    }, customStyles);
};
/**
 * container 样式
 */
var defaultContainerConfig = {
    top: 0,
    // left: spacingMd,
    // width: customHeight,
    // height: customHeight * 1 / 2.3,
    display: "block",
    position: "relative",
    "background-size": "cover",
    overflow: "hidden",
    border: "",
    margin: spacingMd$3 / 2 + "px 0px 0px " + spacingMd$3 + "px",
    padding: ""
};
var configContainerCreate = function (winWidth, customStyles) {
    var width = winWidth - 2 * spacingMd$3;
    return Object.assign({}, defaultContainerConfig, {
        width: width
        // height: width * 1 / 2.3
    }, customStyles);
};
var defaultVideoScreenConfig = {
    top: 0,
    left: 0,
    width: "100%",
    // height: customHeight * 1 / 2.3,
    display: "block",
    position: "",
    overflow: "hidden",
    border: "",
    margin: "",
    padding: ""
};
var configVideoScreenCreate = function (winWidth, customStyles) {
    return Object.assign({}, defaultVideoScreenConfig, {}, customStyles);
};
var defaultPlayBtnConfig = {
    top: "50%",
    left: "50%",
    width: "15%",
    "z-index": 99,
    "Webkit-transform": "translate(-50%, -50%)",
    transform: "translate(-50%, -50%)",
    display: "block",
    position: "absolute",
    background: "",
    overflow: "hidden",
    border: "",
    margin: "",
    padding: ""
};
var configPlayBtnCreate = function (winWidth, customStyles) {
    return Object.assign({}, defaultPlayBtnConfig, customStyles);
};
var videoStyle = {
    configWrapCreate: configWrapCreate$6,
    configTitleContainerCreate: configTitleContainerCreate$1,
    configContainerCreate: configContainerCreate,
    configVideoScreenCreate: configVideoScreenCreate,
    configPlayBtnCreate: configPlayBtnCreate
};

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 视频播放部分
 * XXX: 点击回调统计代码
 */
// import svgs from "../theme/default/svgs"
var VideoSection = (function (_super) {
    __extends$4(VideoSection, _super);
    function VideoSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoSection.prototype.createWrapper = function (winWidth) {
        /**
         * 创建基础 wrap dom
         */
        var attrs = {};
        var wrapDom = this.buildDom("div", attrs, function () {
            return videoStyle.configWrapCreate(winWidth);
        });
        return wrapDom;
    };
    VideoSection.prototype.createTitle = function (winWidth, title) {
        var titleDom = this.buildDom("span", {
            innerHTML: title
        }, function () { return videoStyle.configTitleContainerCreate(winWidth); });
        return titleDom;
    };
    VideoSection.prototype.createContent = function (winWidth, source, poster) {
        /**
         * 播放按钮
         */
        // const xmlString = svgs("play")
        // const btnEle = this.buildDom("div", {
        //   innerHTML: xmlString,
        //   }, () => videoStyle.configPlayBtnCreate()
        // )
        /**
         * video 元素
         */
        var attrs = {
            poster: poster,
            src: source,
            controls: "controls",
            preload: "none"
        };
        var videoEle = this.buildDom("video", attrs, function () {
            return videoStyle.configVideoScreenCreate(winWidth);
        });
        videoEle.addEventListener("play", function () {
            var allVideos = document.querySelectorAll("video");
            // 停播其他 video
            for (var indexVideo in allVideos) {
                var currentVideo = allVideos[indexVideo];
                if (currentVideo !== videoEle) {
                    var playing = currentVideo.paused === false;
                    if (playing) {
                        currentVideo.pause();
                    }
                }
            }
        });
        /**
         * 容器标签
         */
        var contentEle = this.buildDom("div", {
            onclick: function (e) {
                if (videoEle.paused || videoEle.ended) {
                    videoEle.play();
                }
                else {
                    videoEle.pause();
                }
            }
        }, function () { return videoStyle.configContainerCreate(winWidth); });
        contentEle.appendChild(videoEle);
        // contentEle.appendChild(btnEle)
        return contentEle;
    };
    VideoSection.prototype.createRemark = function (winWidth, type, desc, src, time) {
        if (type === remarkType.SHOW_SRC_TIME) {
            return this.createSrcAndTimeDom(winWidth, 10, 10, 20, src, time);
        }
        return this.createDescDom(winWidth, 10, 10, desc);
    };
    VideoSection.prototype.render = function (fragment, winWidth, adItem) {
        var title = adItem.title, source = adItem.source, imageUrl = adItem.imageUrl, type = adItem.type, src = adItem.src, desc = adItem.desc, time = adItem.time;
        if (!imageUrl || !source) {
            return;
        }
        var wraperEle = this.createWrapper(winWidth);
        var titleEle = this.createTitle(winWidth, title);
        var contentEle = this.createContent(winWidth, source, imageUrl);
        var remarkEle = this.createRemark(winWidth, type, desc, src, time);
        var lineEle = this.createLineDom(winWidth, 0);
        // 组装dom
        wraperEle.appendChild(titleEle);
        wraperEle.appendChild(contentEle);
        wraperEle.appendChild(remarkEle);
        wraperEle.appendChild(lineEle);
        fragment.appendChild(wraperEle);
    };
    return VideoSection;
}(BaseSection));

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
// import "core-js/fn/array.forEach"
var videoSectioner = new VideoSection();
var imgTextSectioner = new ImgTextSection();
var bigImgSectioner = new BigImgSection();
var imgsSectioner = new ImgsSection();
var layoutsSectioner = new LayoutSections$1();
var InformationFlowLayoutRender = (function () {
    function InformationFlowLayoutRender(loadOptions) {
        var _this = this;
        if (document.body && document.body.clientWidth) {
            this.winWidth = document.body && document.body.clientWidth;
        }
        else {
            // 获取 innerHeight / innerWidth
            this.winWidth = window.innerWidth;
        }
        this.loadObj = new LoadCtrl(loadOptions);
        this.loadObj.subscribe("fetch-begin", function () {
            _this.footer(_this.loadObj.isEnd, _this.loadObj.loading);
        });
        this.loadObj.subscribe("fetch-success", function () {
            _this.footer(_this.loadObj.isEnd, _this.loadObj.loading);
        });
        this.loadObj.subscribe("fetch-fail", function () {
            _this.footer(_this.loadObj.isEnd, _this.loadObj.loading);
        });
    }
    InformationFlowLayoutRender.prototype.init = function (dom, watchOption, statisticOption, lazyLoad // 滚动到底部后方才开始加载广告
    ) {
        var _this = this;
        if (watchOption === void 0) { watchOption = {}; }
        if (lazyLoad === void 0) { lazyLoad = true; } // 滚动到底部后方才开始加载广告
        var body = document.body;
        var layout;
        if (dom && typeof dom === "string") {
            layout = document.getElementById(dom) || body;
        }
        else if (typeof dom === "object" && dom instanceof HTMLElement) {
            layout = dom;
        }
        // 容错
        if (!layout)
            return;
        var loadObj = this.loadObj;
        // 检测是否开启 统计选项
        if (!index(statisticOption)) {
            this.statisticObj = new StatisticCtrl(statisticOption);
        }
        // 初始化属性
        this.headerDom = layoutsSectioner.createHeader(this.winWidth);
        this.footerDom = layoutsSectioner.createFooter(this.winWidth);
        this.footer(loadObj.isEnd, loadObj.loading);
        this.containerDom = layoutsSectioner.createrContainer();
        // XXX: 优化逻辑
        // 非懒加载广告, 或者 container 不为 body(不适合懒加载规则)
        if (!lazyLoad || (watchOption.dom && watchOption.dom !== body)) {
            // 关闭懒加载
            // 监听对象非body
            this.initRender(layout, watchOption);
        }
        else {
            var documentEle = document.documentElement;
            var needLazyLoad = documentEle.offsetHeight > documentEle.clientHeight + 50;
            if (!needLazyLoad) {
                this.initRender(layout, watchOption);
            }
            else {
                var scrollListener_1 = function () {
                    var curBody = document.body;
                    var scrollHeight = curBody.scrollHeight;
                    var scrollTop = scrollHeight - curBody.scrollTop - window.screen.height;
                    if (scrollTop <= 0) {
                        _this.initRender(layout, watchOption);
                        window.removeEventListener("scroll", scrollListener_1);
                    }
                };
                window.addEventListener("scroll", scrollListener_1);
            }
        }
    };
    /**
     * 首次渲染
     * @param  {HTMLElement}     layout 容器对象
     * @param  {IwatchOption =      {}} watchOption 监听选项
     */
    InformationFlowLayoutRender.prototype.initRender = function (layout, watchOption) {
        var _this = this;
        if (watchOption === void 0) { watchOption = {}; }
        // 渲染头部
        var header = this.headerDom;
        // 渲染
        var container = this.containerDom;
        container.appendChild(header);
        layout.appendChild(container);
        var loadObj = this.loadObj;
        // 渲染初始化的数据
        loadObj.getInit(function (data) {
            return _this.render(data);
        });
        // 首次渲染统计
        if (this.statisticObj) {
            this.statisticObj.firstRender();
        }
        // 监听滚动事件
        var needWatchScroll = watchOption.scroll;
        if (needWatchScroll) {
            this.watchScroll(watchOption.dom, watchOption.onEndReachedThreshold, function (data) { return _this.render(data); });
        }
        // 监听点击事件
        if (watchOption && watchOption.click) {
            this.watchLoadMoreBtn(function (data) {
                return _this.render(data);
            });
        }
    };
    InformationFlowLayoutRender.prototype.render = function (data) {
        var _this = this;
        var body = document.body;
        // 通过文档碎片插入
        var fragment = document.createDocumentFragment();
        var container = this.containerDom;
        var BIG_IMG = layoutType.BIG_IMG;
        var IMG_TEXT = layoutType.IMG_TEXT;
        var IMGS = layoutType.IMGS;
        var VIDEO = layoutType.VIDEO;
        data.forEach(function (item) {
            switch (item.stype) {
                case BIG_IMG:
                    _this.renderBigImgItem(fragment, item);
                    break;
                case IMG_TEXT:
                    _this.renderImgTextItem(fragment, item);
                    break;
                case IMGS:
                    _this.renderImgsItem(fragment, item);
                    break;
                case VIDEO:
                    videoSectioner.render(fragment, _this.winWidth, item);
                    break;
                default:
                    return;
            }
        });
        // 底部加载信息
        var footer = this.footer();
        fragment.appendChild(footer);
        container.appendChild(fragment);
    };
    // 监听 滚动
    InformationFlowLayoutRender.prototype.watchScroll = function (dom, onEndReachedThreshold, loadFun) {
        if (onEndReachedThreshold === void 0) { onEndReachedThreshold = 50; }
        var loadObj = this.loadObj;
        var watchDom = document.body;
        if (dom && typeof dom === "string") {
            watchDom = document.getElementById(dom) || document.body;
        }
        else if (typeof dom === "object" && dom instanceof HTMLElement) {
            watchDom = dom;
        }
        var watchHeight = watchDom.clientHeight;
        var scrollHandle = function () {
            var watchDomHeight = watchDom.scrollHeight;
            var scrollTop = watchDomHeight - watchDom.scrollTop - window.screen.height;
            if (scrollTop <= onEndReachedThreshold) {
                loadObj.getNext(loadFun);
            }
        };
        var bindDom = watchDom === document.body ? window : watchDom;
        if (bindDom.addEventListener) {
            bindDom.addEventListener("scroll", scrollHandle);
        }
        else {
            bindDom.onscroll = scrollHandle;
        }
    };
    InformationFlowLayoutRender.prototype.watchLoadMoreBtn = function (loadFun) {
        var loadObj = this.loadObj;
        var footer = this.footer();
        var clickHandle = function () {
            loadObj.getNext(loadFun);
        };
        if (footer.addEventListener) {
            footer.addEventListener("click", function () { return clickHandle(); });
        }
        else {
            footer.onclick = function () { return clickHandle(); };
        }
    };
    InformationFlowLayoutRender.prototype.renderBigImgItem = function (container, adItem) {
        var _this = this;
        var imageUrl = adItem.imageUrl, curl = adItem.curl, target = adItem.target, sxinitemid = adItem.sxinitemid;
        if (!imageUrl) {
            return;
        }
        var redirectUrl = curl;
        if (this.statisticObj &&
            typeof this.statisticObj.createRedirectUrl === "function") {
            // 容错
            redirectUrl = this.statisticObj.createRedirectUrl(adItem) || curl;
        }
        var touchCallback = function () {
            if (_this.statisticObj) {
                _this.statisticObj.materielClick(sxinitemid);
                setTimeout(function () {
                    window.open(redirectUrl, target || "_target");
                }, _this.statisticObj.delay);
                return false;
            }
        };
        bigImgSectioner.render(container, this.winWidth, adItem, redirectUrl, touchCallback);
    };
    InformationFlowLayoutRender.prototype.renderImgTextItem = function (container, adItem) {
        var _this = this;
        var title = adItem.title, curl = adItem.curl, imageUrl = adItem.imageUrl, target = adItem.target, type = adItem.type, src = adItem.src, time = adItem.time, desc = adItem.desc, sxinitemid = adItem.sxinitemid;
        if (!imageUrl) {
            return;
        }
        var redirectUrl = curl;
        if (this.statisticObj &&
            typeof this.statisticObj.createRedirectUrl === "function") {
            // 容错
            redirectUrl = this.statisticObj.createRedirectUrl(adItem) || curl;
        }
        var winWidth = this.winWidth;
        var touchCallback = function () {
            if (_this.statisticObj) {
                _this.statisticObj.materielClick(sxinitemid);
                setTimeout(function () {
                    window.open(redirectUrl, target || "_target");
                }, _this.statisticObj.delay);
                return false;
            }
        };
        imgTextSectioner.render(container, winWidth, adItem, redirectUrl, touchCallback);
    };
    InformationFlowLayoutRender.prototype.renderImgsItem = function (container, adItem) {
        var _this = this;
        var title = adItem.title, curl = adItem.curl, images = adItem.images, target = adItem.target, desc = adItem.desc, src = adItem.src, time = adItem.time, type = adItem.type, sxinitemid = adItem.sxinitemid;
        if (!images || images.length === 0) {
            return;
        }
        var redirectUrl = curl;
        if (this.statisticObj &&
            typeof this.statisticObj.createRedirectUrl === "function") {
            // 容错
            redirectUrl = this.statisticObj.createRedirectUrl(adItem) || curl;
        }
        var winWidth = this.winWidth;
        var touchCallback = function () {
            if (_this.statisticObj) {
                _this.statisticObj.materielClick(sxinitemid);
                setTimeout(function () {
                    window.open(redirectUrl, target || "_target");
                }, _this.statisticObj.delay);
                return false;
            }
        };
        imgsSectioner.render(container, winWidth, adItem, redirectUrl, touchCallback);
    };
    // getter & setter
    InformationFlowLayoutRender.prototype.footer = function (isEnd, isLoading) {
        var target = this.footerDom;
        if (typeof isEnd === "undefined" && typeof isLoading === "undefined") {
            return target;
        }
        var targetText = isEnd ? "-- 加载完成 --" : isLoading ? "加载中..." : "加载更多";
        if (target.innerText !== targetText) {
            target.innerText = targetText;
        }
        return target;
    };
    return InformationFlowLayoutRender;
}());

return InformationFlowLayoutRender;

})));
//# sourceMappingURL=information-flow-layout-render.umd.js.map
