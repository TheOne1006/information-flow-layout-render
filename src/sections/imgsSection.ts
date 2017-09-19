/**
 * 多图部分
 */
import { remarkType } from "../constants"
import { IadItemModel } from "../interfaces"

import imgsStyle from "../theme/default/imgs"

import BaseSection from "./baseSection"

class ImgsSection extends BaseSection {
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
      () => imgsStyle.configWrapCreate(winWidth)
    )

    return wrapDom
  }
  createTitle(winWidth: number, title: string) {
    const titleEle = this.buildDom(
      "span",
      {
        innerText: title
      },
      () => imgsStyle.configTitleCreate(winWidth)
    )

    return titleEle
  }
  createContent(winWidth: number, images: string[]) {
    // imgsWrapDom
    const wrapDom = this.buildDom("div", {}, () =>
      imgsStyle.configImgsWrapCreate(winWidth)
    )

    const contentEles = []
    const imgLen = images.length

    for (let i = 0; i < imgLen; i++) {
      const curImg = images[i]

      const customStyle: any = {}

      if (i !== 0) {
        customStyle["margin-left"] = "3px"
      }

      const imgItem = this.buildDom("div", {}, () =>
        imgsStyle.configImgItemCreate(winWidth, customStyle, imgLen)
      )
      imgItem.style.background = `url(${curImg}) center center no-repeat`
      imgItem.style.backgroundSize = "cover"

      contentEles.push(imgItem)
    }

    for (let index in contentEles) {
      wrapDom.appendChild(contentEles[index])
    }

    return wrapDom
  }
  createRemark(
    winWidth: number,
    type: number,
    desc?: string,
    src?: string,
    time?: string
  ) {
    if (type === remarkType.SHOW_SRC_TIME) {
      return this.createSrcAndTimeDom(winWidth, 0, 10, 20, src, time)
    }
    return this.createDescDom(winWidth, 0, 10, desc)
  }
  render(
    fragment: DocumentFragment,
    winWidth: number,
    adItem: IadItemModel,
    redirectUrl?: string,
    touchCallback?: Function
  ) {
    const { title, images, type, src, desc, time, curl, target } = adItem

    if (!images || images.length === 0) {
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
    const contentEle = this.createContent(winWidth, images)
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

export default ImgsSection
