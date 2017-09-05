/**
 * 大图渲染
 */
import BaseSection from "./baseSection"

import bigImgStyle from "../theme/default/bigImg"

import { remarkType } from "../constants"
import { IadItemModel } from "../interfaces"

class BigImgSection extends BaseSection {
  createWrapper(
    winWidth: number,
    href: string = "javascript:;",
    target: string = "_target",
    title: string = "",
    touchCallback?: Function
  ) {
    /**
     * 创建基础 wrap dom
     */
    const attrs = {}
    const wrapDom = this.buildDom(
      "a",
      {
        href,
        target,
        title,
        onclick: touchCallback
      },
      () => bigImgStyle.configWrapCreate(winWidth)
    )

    return wrapDom
  }
  createTitle(winWidth: number, title: string) {
    const titleEle = this.buildDom(
      "span",
      {
        innerText: title
      },
      () => bigImgStyle.configTitleContainerCreate(winWidth)
    )

    return titleEle
  }
  createContent(winWidth: number, imageUrl: string) {
    const contentEle = this.buildDom("div", {}, () =>
      bigImgStyle.configImgContainerCreate(winWidth)
    )
    contentEle.style.background = `url(${imageUrl}) center center no-repeat`
    contentEle.style.backgroundSize = "cover"

    return contentEle
  }
  createRemark(
    winWidth: number,
    type: number,
    desc?: string,
    src?: string,
    time?: string
  ) {
    if (type === remarkType.SHOW_SRC_TIME) {
      return this.createSrcAndTimeDom(winWidth, 10, 10, 20, src, time)
    }
    return this.createDescDom(winWidth, 10, 10, desc)
  }
  render(
    fragment: DocumentFragment,
    winWidth: number,
    adItem: IadItemModel,
    redirectUrl?: string,
    touchCallback?: Function
  ) {
    const { title, imageUrl, type, src, desc, time, curl, target } = adItem

    if (!imageUrl) {
      return
    }

    const wraperEle = this.createWrapper(
      winWidth,
      redirectUrl || curl,
      target,
      title,
      touchCallback
    )
    const titleEle = this.createTitle(winWidth, title)
    const contentEle = this.createContent(winWidth, imageUrl)
    const remarkEle = this.createRemark(winWidth, type, desc, src, time)
    const lineEle = this.createLineDom(winWidth, 0)

    // 组装dom
    wraperEle.appendChild(titleEle)
    wraperEle.appendChild(contentEle)
    wraperEle.appendChild(remarkEle)
    wraperEle.appendChild(lineEle)

    fragment.appendChild(wraperEle)
  }
}

export default BigImgSection
