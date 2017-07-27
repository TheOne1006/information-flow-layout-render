
export interface IbaseStyle {
  display?: string
  position?: string
  top?: number
  left?: number
  width?: number
  height?: number | string
  overflow?: string
  "text-decoration"?: string
  "font-size"?: string | number
  "font-family"?: string
  color?: string
  "text-align"?: string
  "background-color"?: string
  "line-height"?: string
  "white-space"?: string
  "text-overflow"?: string
  "o-text-overflow"?: string
  padding?: string
  margin?: string
  border?: string
}

export default class StyleCtrl {

  static pxStyles = {
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
    right: 1,
  }

  protected styleBuf = {}


  /**
   * 组装成单行的 style 内联字符串
   * @param  {object} styleObject 样式对象
   * @return {string}
   */
  protected genStyle = (styleObject?: any) => {
    let styleStr = ""
    if (styleObject) {
      const pxStyles: any = StyleCtrl.pxStyles
      for (let attrName in styleObject) {
        if (styleObject.hasOwnProperty(attrName)) {
          const val = styleObject[attrName]
          const isNeedSuffixPx = !!pxStyles[attrName] && (!isNaN(parseFloat(val)) && isFinite(val))
          styleStr += attrName + ":" + styleObject[attrName] + (isNeedSuffixPx ? "px;" : ";")
        }
      }
    }
    return styleStr
  }

  /**
   * 设置dom 元素样式
   * @param {object} container    dom 元素
   * @param {object} stylesObject styles 对象
   */
  protected setStyle = (container: HTMLElement, stylesObject?: object) => {
    let styleStr = ""
    if (!stylesObject) {
      styleStr = this.genStyle(this.styleBuf)
    } else {
      styleStr = this.genStyle(stylesObject)
    }
    // 兼容 ie
    // if (!window.attachEvent) {
    //   container.setAttribute("style", styleStr)
    // } else {
    // }
    container.style.cssText = styleStr
  }

  /**
   * 追加元素的样式设置
   * @param {object} container    dom 元素
   * @param {object} stylesObject styles 对象
   */
  protected appendStyle = (container: HTMLElement, stylesObject?: object) => {
    const appendStr = this.genStyle(stylesObject)
    const originCssText = container.style.cssText
    container.style.cssText = originCssText + appendStr
  }

  public setBaseStyles(container: HTMLElement, style: IbaseStyle) {
    // todo
    const { display, position, top, left, width, height } = style
    this.styleBuf = {
      display,
      position,
      top,
      left,
      width,
      height,
      overflow: "hidden",
      "text-decoration": "none",
    }
    this.setStyle(container, this.styleBuf)
  }

  public appendSingleFontStyle (container: HTMLElement, style: IbaseStyle) {
    this.appendStyle(container, style)
  }

  public setLineEleStyles (container: HTMLElement, style: IbaseStyle) {
    this.appendStyle(container, style)
  }
}
