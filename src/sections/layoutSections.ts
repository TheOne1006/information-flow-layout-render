/**
 * layout 布局渲染
 */
import BaseSection from "./baseSection"

import footerStyle from "../theme/default/footer"
import headerStyle from "../theme/default/header"

import { IadItemModel } from "../interfaces"

class LayoutSections extends BaseSection {
  /**
   * 页头
   * @param  {number}    winWidth 页面宽度
   * @param  {string}    title 标题文字
   * @return {HTMLElement}
   */
  createHeader(winWidth: number, title: string = "猜你喜欢") {
    const headerEle = this.buildDom("div", {}, () =>
      headerStyle.configWrapCreate(winWidth)
    )
    const titleEle = this.buildDom("div", {}, () =>
      headerStyle.configTitleCreate(winWidth)
    )
    titleEle.innerText = title

    headerEle.appendChild(titleEle)
    return headerEle
  }
  /**
   * 底部 Dom
   * @param  {number} winWidth 页面宽度
   * @return {HTMLElement}
   */
  createFooter(winWidth: number) {
    return this.buildDom("div", {}, () =>
      footerStyle.configWrapCreate(winWidth)
    )
  }
  /**
   * 容器 Dom
   * @return {HTMLElement}
   */
  createrContainer() {
    return this.buildDom("div", {})
  }
}

export default LayoutSections
