(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.InformationFlowLayoutRender = factory());
}(this, (function () { 'use strict';

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

var DEFAULT_PAGE_NUM = 1;
var DEFAULT_PAGE_SHOW_NUM = 5;
var LoadCtrl = (function () {
    function LoadCtrl(_a) {
        var _b = _a.initData, initData = _b === void 0 ? [] : _b, _c = _a.nextPage, nextPage = _c === void 0 ? DEFAULT_PAGE_NUM : _c, _d = _a.pageShowNum, pageShowNum = _d === void 0 ? DEFAULT_PAGE_SHOW_NUM : _d, _e = _a.mockRemoteLoad, mockRemoteLoad = _e === void 0 ? false : _e, ajaxFetch = _a.ajaxFetch;
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
        var success = function (data) {
            _this.loading = false;
            // 加载结束
            if (_this.showNum > data.length) {
                _this.isEnd = true;
            }
            callback(data);
        };
        var fail = function (data) {
            _this.loading = false;
            _this.isEnd = true;
            console.warn(data);
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
    return LoadCtrl;
}());

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

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
    // height: (winWidth * 100 / 320) * 33 / 50 + 10 + 5,
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$2 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$2, {
        width: winWidth,
    }, customStyles);
};
/**
 * img 样式
 */
var defulatImgConfig = {
    top: spacingSm * 3,
    left: spacingMd$1,
    // width: 100 * winWidth / 320,
    // height: width * 33 / 50,
    display: "inline-block",
    position: "",
    border: "",
    margin: spacingSm * 3 + "px 0px 0px " + spacingMd$1 + "px",
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
    top: spacingSm * 3,
    // left: 100 * winWidth / 320 + spacingMd * 2,
    // width: winWidth - 3 * 10 - (100 * winWidth / 320),
    // height: (100 * winWidth / 320) * 33 / 50,
    display: "inline-block",
    position: "",
    border: "",
    margin: spacingSm * 3 + "px 0px 0px " + spacingMd$1 + "px",
    padding: "",
    "line-height": "100%",
    "vertical-align": "top"
};
var configRightCreate = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultRightContentConfig, {
        left: leftWidth + spacingMd$1 * 2,
        width: winWidth - 3 * spacingMd$1 - leftWidth,
    }, customStyles);
};
/**
 * title wrap 样式
 */
var defaultTitleWrapConfig = {
    top: spacingSm * 3 + 3,
    // left: 100 * winWidth / 320 + spacingMd * 2,
    // width: winWidth - 3 * 10 - (100 * winWidth / 320),
    // height: 40,
    display: "inline-block",
    position: "",
    "font-size": baseFontSize$1,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": baseLineHeight
};
var configTitleWrapCreate = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultTitleWrapConfig, {
        left: leftWidth + spacingMd$1 * 2,
        width: winWidth - 3 * spacingMd$1 - leftWidth
    }, customStyles);
};
var configTitleCreate = function (winWidth, customStyles) {
    var leftWidth = 100 * winWidth / 320;
    return Object.assign({}, defaultTitleWrapConfig, {
        width: winWidth - 3 * spacingMd$1 - leftWidth
    }, customStyles);
};
var imgTextStyle = {
    configWrapCreate: configWrapCreate$2,
    configImgCreate: configImgCreate,
    configRightCreate: configRightCreate,
    configTitleWrapCreate: configTitleWrapCreate,
    configTitleCreate: configTitleCreate
};

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
    height: "auto",
    display: "block",
    position: "",
    "background-color": "#fff",
    overflow: "hidden",
    "text-decoration": "none"
};
var configWrapCreate$3 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$3, {
        width: winWidth
    }, customStyles);
};
/**
 * title 样式
 */
var defaultTitleConfig$1 = {
    top: 0,
    left: spacingMd$2,
    height: "auto",
    display: "block",
    position: "",
    "font-size": baseFontSize$2,
    color: "#000",
    "font-family": "Arial, Helvetica, sans-serif",
    "text-align": "left",
    // "background-colror": "#",
    "line-height": baseLineHeight$1,
    overflow: "hidden",
    // "white-space": "nowrap",
    "-webkit-line-clamp": "2",
    "text-overflow": "ellipsis",
    "o-text-overflow": "ellipsis",
    "text-decoration": "none",
    padding: "",
    margin: spacingSm$1 * 3 + "px " + spacingMd$2 + "px 0px",
    border: ""
};
var configTitleCreate$1 = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleConfig$1, {
        width: winWidth - 2 * spacingMd$2
    }, customStyles);
};
/**
 * imgItem 样式
 */
var defaultImgItemConfig = {
    top: spacingSm$1,
    left: spacingMd$2,
    // width: width, (winWidth - 6) / 3
    // height: "auto", m * 66 / 98;
    display: "inline-block",
    position: "",
    padding: "",
    margin: spacingSm$1 + "px 0px " + spacingMd$2 + "px " + spacingMd$2 + "px",
    border: ""
};
var configImgItemCreate = function (winWidth, customStyles, itemLen) {
    if (itemLen === void 0) { itemLen = 3; }
    var wrapWidth = winWidth - 2 * spacingMd$2;
    var width = (wrapWidth - itemLen * 2) / itemLen;
    return Object.assign({}, defaultImgItemConfig, {
        width: width,
        height: width * 66 / 98
    }, customStyles);
};
var imgsStyle = {
    configWrapCreate: configWrapCreate$3,
    configTitleCreate: configTitleCreate$1,
    configImgItemCreate: configImgItemCreate
};

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
    configWrapCreate: configWrapCreate$4,
};

var smFontSize$2 = 12;
var spacingLg$1 = 15;
/**
 * wrap 样式
 */
var defaultWrapConfig$5 = {
    top: 0,
    left: 0,
    height: spacingLg$1,
    "line-height": spacingLg$1,
    "font-size": smFontSize$2,
    display: "block",
    position: "relative",
    "background-color": "#fff",
    "margin": "15px 0px 0px 10px",
    overflow: "hidden"
};
var configWrapCreate$5 = function (winWidth, customStyles) {
    return Object.assign({}, defaultWrapConfig$5, customStyles);
};
var defaultTitleConfig$2 = {
    top: 0,
    left: 0,
    height: spacingLg$1,
    "line-height": spacingLg$1,
    "font-size": smFontSize$2,
    display: "block",
    position: "relative",
    "background-color": "#fff",
    color: "#888",
    overflow: "hidden",
    "text-align": "left"
};
var configTitleCreate$2 = function (winWidth, customStyles) {
    return Object.assign({}, defaultTitleConfig$2, customStyles);
};
var headerStyle = {
    configWrapCreate: configWrapCreate$5,
    configTitleCreate: configTitleCreate$2,
};

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
// import "core-js/fn/array.forEach"
var styleController = new StyleCtrl();
var InformationFlowLayoutRender = (function () {
    function InformationFlowLayoutRender(loadOptions) {
        if (document.body && document.body.clientWidth) {
            this.winWidth = document.body && document.body.clientWidth;
        }
        else {
            // 获取 innerHeight / innerWidth
            this.winWidth = window.innerWidth;
        }
        this.loadObj = new LoadCtrl(loadOptions);
    }
    InformationFlowLayoutRender.prototype.init = function (dom, option) {
        var _this = this;
        if (option === void 0) { option = {}; }
        var body = document.body;
        var container;
        if (dom && typeof dom === "string") {
            container = document.getElementById(dom) || body;
        }
        else if (typeof dom === "object" && dom instanceof HTMLElement) {
            container = dom;
        }
        if (!container)
            return;
        // 渲染头部
        var header = this.createHeader();
        container.appendChild(header);
        var loadObj = this.loadObj;
        // 渲染初始化的数据
        loadObj.getInit(function (data) { return _this.render(dom, data, loadObj.isEnd); });
        // 监听滚动事件
        var needWatchScroll = option.scroll;
        if (needWatchScroll) {
            this.watchScroll(option.dom, option.onEndReachedThreshold, function (data) {
                return _this.render(dom, data, loadObj.isEnd);
            });
        }
    };
    InformationFlowLayoutRender.prototype.render = function (dom, data, isEnd) {
        var _this = this;
        var body = document.body;
        // 通过文档碎片插入
        var fragment = document.createDocumentFragment();
        var container;
        if (dom && typeof dom === "string") {
            container = document.getElementById(dom) || body;
        }
        else if (typeof dom === "object" && dom instanceof HTMLElement) {
            container = dom;
        }
        if (!container)
            return;
        var BIG_IMG = InformationFlowLayoutRender.layoutType.BIG_IMG;
        var IMG_TEXT = InformationFlowLayoutRender.layoutType.IMG_TEXT;
        var IMGS = InformationFlowLayoutRender.layoutType.IMGS;
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
                default:
                    return;
            }
        });
        // 底部加载信息
        var footer = this.createFooter(isEnd);
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
        watchDom.onscroll = function (e) {
            var watchDomHeight = watchDom.scrollHeight;
            var scrollTop = watchDomHeight - watchDom.scrollTop - watchHeight;
            if (scrollTop <= onEndReachedThreshold) {
                loadObj.getNext(loadFun);
            }
        };
    };
    InformationFlowLayoutRender.prototype.buildDom = function (nodeName, attrs, createStyles) {
        if (attrs === void 0) { attrs = {}; }
        var target = document.createElement(nodeName);
        for (var attrName in attrs) {
            if (attrs.hasOwnProperty(attrName)) {
                target[attrName] = attrs[attrName];
            }
        }
        if (createStyles) {
            var styles = createStyles();
            styleController.appendStyle(target, styles);
        }
        return target;
    };
    InformationFlowLayoutRender.prototype.renderBigImgItem = function (container, adItem) {
        var title = adItem.title, curl = adItem.curl, imageUrl = adItem.imageUrl, target = adItem.target, type = adItem.type, src = adItem.src, desc = adItem.desc, time = adItem.time;
        if (!imageUrl) {
            return;
        }
        var winWidth = this.winWidth;
        /**
         * 创建基础 wrap dom
         */
        var wrapDom = this.buildDom("a", {
            href: curl,
            target: target || "_self",
            title: title
        }, function () { return bigImgStyle.configWrapCreate(winWidth); });
        /**
         * title Dom
         */
        var titleDom = this.buildDom("span", {
            innerHTML: title
        }, function () { return bigImgStyle.configTitleContainerCreate(winWidth); });
        wrapDom.appendChild(titleDom);
        // img container
        var imgContentDom = this.buildDom("div", {}, function () {
            return bigImgStyle.configImgContainerCreate(winWidth);
        });
        imgContentDom.style.background = "url(" + imageUrl + ") center center no-repeat";
        imgContentDom.style.backgroundSize = "cover";
        wrapDom.appendChild(imgContentDom);
        if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
            var descDom = this.createDescDom(desc, 10, 10);
            wrapDom.appendChild(descDom);
        }
        else if (type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
            src &&
            time) {
            var srcAndTimeDom = this.createSrcAndTimeDom(src, time, 10, 10, 20);
            wrapDom.appendChild(srcAndTimeDom);
        }
        var lineDom = this.createLineDom(0, "");
        wrapDom.appendChild(lineDom);
        container.appendChild(wrapDom);
        return container;
    };
    InformationFlowLayoutRender.prototype.renderImgTextItem = function (container, adItem) {
        var title = adItem.title, curl = adItem.curl, imageUrl = adItem.imageUrl, target = adItem.target, type = adItem.type, src = adItem.src, time = adItem.time, desc = adItem.desc;
        if (!imageUrl) {
            return;
        }
        var winWidth = this.winWidth;
        /**
         * warp
         */
        var wrapDom = this.buildDom("a", {
            href: curl,
            target: target || "_self",
            title: title
        }, function () { return imgTextStyle.configWrapCreate(winWidth); });
        /**
         * 左侧图片
         */
        var imgDom = this.buildDom("div", {}, function () {
            return imgTextStyle.configImgCreate(winWidth);
        });
        imgDom.style.background = "url(" + imageUrl + ") center center no-repeat";
        imgDom.style.backgroundSize = "cover";
        wrapDom.appendChild(imgDom);
        /**
         * 右侧内容
         */
        var rightContent = this.buildDom("div", {}, function () {
            return imgTextStyle.configRightCreate(winWidth);
        });
        /**
         * title 相关
         */
        var titleWrapDom = this.buildDom("div", {}, function () {
            return imgTextStyle.configTitleWrapCreate(winWidth);
        });
        var titleDom = this.buildDom("span", {
            innerText: title
        }, function () { return imgTextStyle.configTitleCreate(winWidth); });
        titleWrapDom.appendChild(titleDom);
        rightContent.appendChild(titleWrapDom);
        if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
            var descDom = this.createDescDom(desc, 10, 0);
            rightContent.appendChild(descDom);
        }
        else if (type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
            src &&
            time) {
            var srcAndTimeDom = this.createSrcAndTimeDom(src, time, 5, 0, 20);
            rightContent.appendChild(srcAndTimeDom);
        }
        wrapDom.appendChild(rightContent);
        var lineDom = this.createLineDom(13, "");
        wrapDom.appendChild(lineDom);
        container.appendChild(wrapDom);
        return container;
    };
    InformationFlowLayoutRender.prototype.renderImgsItem = function (container, adItem) {
        var title = adItem.title, curl = adItem.curl, images = adItem.images, target = adItem.target, desc = adItem.desc, src = adItem.src, time = adItem.time, type = adItem.type;
        if (!images || images.length === 0) {
            return;
        }
        var winWidth = this.winWidth;
        /**
         * 创建基础 wrap dom
         */
        var wrapDom = this.buildDom("a", {
            href: curl,
            target: target || "_self",
            title: title
        }, function () { return imgsStyle.configWrapCreate(winWidth); });
        /**
         * title
         */
        var titleDom = this.buildDom("span", {
            innerText: title
        }, function () { return imgsStyle.configTitleCreate(winWidth); });
        wrapDom.appendChild(titleDom);
        /**
         * content imgs
         */
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
            wrapDom.appendChild(imgItem);
        };
        var this_1 = this;
        for (var i = 0; i < imgLen; i++) {
            _loop_1(i);
        }
        if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
            var descDom = this.createDescDom(desc, 0, 10);
            wrapDom.appendChild(descDom);
        }
        else if (type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
            src &&
            time) {
            var srcAndTimeDom = this.createSrcAndTimeDom(src, time, 0, 10, 20);
            wrapDom.appendChild(srcAndTimeDom);
        }
        var lineDom = this.createLineDom(0, "");
        wrapDom.appendChild(lineDom);
        container.appendChild(wrapDom);
        return container;
    };
    InformationFlowLayoutRender.prototype.createLineDom = function (top, position) {
        var _this = this;
        var lineDom = this.buildDom("div", {}, function () {
            return configCreate(_this.winWidth, {
                top: top,
                position: position
            });
        });
        return lineDom;
    };
    InformationFlowLayoutRender.prototype.createDescDom = function (desc, top, left) {
        if (top === void 0) { top = 0; }
        if (left === void 0) { left = 0; }
        var target = document.createElement("div");
        if (!desc) {
            return target;
        }
        target.innerHTML = desc;
        var descStyles = configCreate$1(this.winWidth, {
            top: top,
            left: left,
            "margin-top": top,
            "margin-left": left
        });
        styleController.appendStyle(target, descStyles);
        return target;
    };
    InformationFlowLayoutRender.prototype.createSrcAndTimeDom = function (src, time, top, left, height) {
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
        var wrapStyles = srcTimeStyles.configWrapCreate(this.winWidth, customStyles);
        styleController.appendStyle(target, wrapStyles);
        var srcDom = document.createElement("div");
        var itemStyles = srcTimeStyles.configItemCreate(this.winWidth, {
            "line-height": height
        });
        srcDom.innerText = src;
        styleController.appendStyle(srcDom, itemStyles);
        var timeDom = document.createElement("div");
        timeDom.innerText = time;
        styleController.appendStyle(timeDom, itemStyles);
        target.appendChild(srcDom);
        target.appendChild(timeDom);
        return target;
    };
    InformationFlowLayoutRender.prototype.createHeader = function () {
        this.headerDom = this.buildDom("div", {}, function () { return headerStyle.configWrapCreate(0); });
        var title = this.buildDom("div", {}, function () { return headerStyle.configTitleCreate(0); });
        title.innerText = "猜你喜欢";
        this.headerDom.appendChild(title);
        return this.headerDom;
    };
    InformationFlowLayoutRender.prototype.createFooter = function (isEnd) {
        if (!this.footerDom) {
            this.footerDom = this.buildDom("div", {}, function () { return footerStyle.configWrapCreate(0); });
        }
        var target = this.footerDom;
        var targetText = isEnd ? "-- 加载完成 --" : "加载更多...";
        if (target.innerText !== targetText) {
            target.innerText = targetText;
        }
        return target;
    };
    InformationFlowLayoutRender.layoutType = {
        BIG_IMG: 0,
        IMG_TEXT: 1,
        IMGS: 2 // 多图模式
    };
    InformationFlowLayoutRender.remarkType = {
        SHOW_DESC: 0,
        SHOW_SRC_TIME: 1
    };
    return InformationFlowLayoutRender;
}());

return InformationFlowLayoutRender;

})));
//# sourceMappingURL=information-flow-layout-render.umd.js.map
