// DOM 操作
const contains = document.documentElement.contains
  ? function(parent: any, node: any) {
      return parent !== node && parent.contains(node)
    }
  : function(parent: any, node: any) {
      //  tslint:disable
      while (node && (node = node.parentNode)) {
        if (node === parent) return true
      }
      return false
    }
function isWindow(obj: any) {
  return obj != null && obj === obj.window
}
function isDocument(obj: any) {
  return obj != null && obj.nodeType === obj.DOCUMENT_NODE
}
function getOffset(dom: HTMLElement) {
  if (
    document.documentElement !== dom &&
    !contains(document.documentElement, dom)
  ) {
    return { top: 0, left: 0 }
  }
  const obj = dom.getBoundingClientRect()
  return {
    left: obj.left + window.pageXOffset,
    top: obj.top + window.pageYOffset,
    width: Math.round(obj.width),
    height: Math.round(obj.height)
  }
}

// from jquery
function getWindow(elem: any) {
  return isWindow(elem)
    ? elem
    : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false
}

/**
 * Generate get height and width like zepto
 */
const getEleHeightOrWidth = (dom: any, dimension: string) => {
  const el = dom
  const dimensionProperty = dimension.replace(/./, function(m) {
    return m[0].toUpperCase()
  })

  if (isWindow(el)) {
    return el["inner" + dimensionProperty]
  }
  if (isDocument(el)) {
    return el.documentElement["scroll" + dimensionProperty]
  }
  const offset: any = getOffset(el)

  return offset[dimensionProperty]
}

/**
 * 验证是否为有效 url
 * @param  {string} url
 * @return {Boolean} 是否有效
 */
export const isValidURL = (url: string = "") => {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return !!url && urlregex.test(url)
}

/**
 * 补全 url
 * @param  {string} url
 * @return {string} 有效的url
 */
export const completeURL = (url: string = "", protocol: string = "http") => {
  const regexWithOutProtocol = /^\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  if (url && regexWithOutProtocol.test(url)) {
    return protocol + ":" + url
  }
  return url
}

export const getEleHeight = (dom: any) => {
  return getEleHeightOrWidth(dom, "height")
}

export const getEleWidth = (dom: any) => {
  return getEleHeightOrWidth(dom, "width")
}

// jquery 1.9
export const getScrollTop = (dom: any) => {
  const prop = "pageYOffset"
  const method = "scrollTop"
  const win = getWindow(dom)
  if (win) {
    return prop in win ? win[prop] : win.document.documentElement[method]
  }

  return dom[method]
}

// parseUrl in window https://gist.github.com/jlong/2428561
export const parseUrl = (url: string) => {
  const parser = document.createElement("a")
  parser.href = url
  const urlObj = {
    protocol: parser.protocol, // => "http:"
    hostname: parser.hostname, // => "example.com"
    port: parser.port, // => "3000"
    pathname: parser.pathname, // => "/pathname/"
    search: parser.search, // => "?search=test"
    hash: parser.hash, // => "#hash"
    host: parser.host // => "example.com:3000"
  }
  return urlObj
}

export default {
  isValidURL,
  completeURL,
  getEleHeight,
  getEleWidth,
  getScrollTop,
  parseUrl
}
