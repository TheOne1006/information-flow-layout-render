/**
 * 基础的 Section 构建者
 */
import StyleCtrl from "../styleController"

import createLineStyles from "../theme/default/baseLine"
import createDescStyles from "../theme/default/desc"
import srcTimeStyles from "../theme/default/srcTime"

const styleController = new StyleCtrl()

export class BaseSection {
  /**
   * FIXME: 使用 chache 缓存, 增加渲染速度
   * 构建dom 元素, 以及设置 属性, 以及构建其内联样式
   * @param  {string}   nodeName     标签名
   * @param  {object}   attrs  目标标签属性
   * @param  {Function} createStyles 构建样式的方法, 返回值为 Object
   * @return {HTMLElement} 构建完成的 dom 对象
   */
  buildDom(nodeName: string, attrs: any = {}, createStyles?: Function) {
    const target: any = document.createElement(nodeName)
    if (attrs) {
      for (let attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
          target[attrName] = attrs[attrName]
        }
      }
    }

    if (createStyles) {
      const styles = createStyles()
      styleController.appendStyle(target, styles)
    }

    return target
  }
  /**
   * 创建 desc 的 dom
   * @param  {number}   winWidth window 宽度
   * @param  {number}   top  top属性
   * @param  {number}   left left 属性
   * @param  {string}   desc 描述信息
   * @return {HTMLElement}
   */
  createDescDom(
    winWidth: number,
    top: number = 0,
    left: number = 0,
    desc?: string
  ) {
    const attrs = {
      innerText: desc || ""
    }

    const descStyles = createDescStyles.configDescCreate(winWidth, {
      top,
      left,
      "margin-top": top,
      "margin-left": left
    })

    const target = this.buildDom("div", attrs, () => descStyles)
    const wrap = this.buildDom("div", {}, () =>
      createDescStyles.configDescWrapCreate(winWidth)
    )
    wrap.appendChild(target)
    // const wrap = this.buildDom("div", attrs, () => descWrapStyles)
    return wrap
  }
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
  createSrcAndTimeDom(
    winWidth: number,
    top: number,
    left: number,
    height: number,
    src?: string,
    time?: string
  ) {
    const target = document.createElement("div")
    if (!src || !time) {
      return target
    }

    const customStyles = {
      top,
      height,
      "margin-left": left,
      "margin-top": top
    }

    const wrapStyles = srcTimeStyles.configWrapCreate(winWidth, customStyles)
    styleController.appendStyle(target, wrapStyles)

    /**
     * src 相关 dom
     */
    const srcDom = document.createElement("div")
    const itemStyles = srcTimeStyles.configItemCreate(winWidth, {
      "line-height": height
    })
    srcDom.innerText = src
    styleController.appendStyle(srcDom, itemStyles)

    /**
     * time 相关 dom
     */
    const timeDom = document.createElement("div")
    timeDom.innerText = time
    styleController.appendStyle(timeDom, itemStyles)

    target.appendChild(srcDom)
    target.appendChild(timeDom)

    return target
  }
  /**
   * 创建分割线
   * @param  {number} winWidth window width
   * @param  {number} top      top 属性
   * @param  {string} position position 属性
   * @return {HTMLElement}
   */
  createLineDom(winWidth: number, top: number, position: string = "") {
    const lineDom = this.buildDom("div", {}, () =>
      createLineStyles(winWidth, {
        top,
        position
      })
    )

    return lineDom
  }
}

export default BaseSection
