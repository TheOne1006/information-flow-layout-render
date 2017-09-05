/**
 * 大图渲染
 */
import BaseSection from "./baseSection"

import footerStyle from "../theme/default/footer"
import headerStyle from "../theme/default/header"

import { IadItemModel } from "../interfaces"

class LayoutSections extends BaseSection {
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
  createFooter(winWidth: number) {
    return this.buildDom("div", {}, () =>
      footerStyle.configWrapCreate(winWidth)
    )
  }
  createrContainer() {
    return this.buildDom("div", {})
  }
}

export default LayoutSections
