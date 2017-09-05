/**
 * 图文部分
 */
import { remarkType } from "../constants"
import { IadItemModel } from "../interfaces"
import imgTextStyle from "../theme/default/imgText"
import BaseSection from "./baseSection"

class ImgTextSection extends BaseSection {
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
      () => imgTextStyle.configWrapCreate(winWidth)
    )

    return wrapDom
  }
  createTitle(winWidth: number, title: string) {
    const titleWrapDom = this.buildDom("div", {}, () =>
      imgTextStyle.configTitleWrapCreate(winWidth)
    )

    const titleDom = this.buildDom(
      "span",
      {
        innerText: title
      },
      () => imgTextStyle.configTitleCreate(winWidth)
    )

    titleWrapDom.appendChild(titleDom)
    return titleWrapDom
  }
  createImgContent(winWidth: number, imageUrl: string) {
    const imgDom = this.buildDom("div", {}, () =>
      imgTextStyle.configImgCreate(winWidth)
    )
    imgDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgDom.style.backgroundSize = "cover"

    return imgDom
  }
  createTextContent(winWidth: number) {
    const contentEle = this.buildDom("div", {}, () =>
      imgTextStyle.configRightCreate(winWidth)
    )

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
      return this.createSrcAndTimeDom(winWidth, 5, 0, 20, src, time)
    }
    return this.createDescDom(winWidth, 10, 0, desc)
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
    const imgContentEle = this.createImgContent(winWidth, imageUrl)
    const textContentEle = this.createTextContent(winWidth)
    const remarkEle = this.createRemark(winWidth, type, desc, src, time)
    const lineEle = this.createLineDom(winWidth, 13)

    // 组装dom
    textContentEle.appendChild(titleEle)
    textContentEle.appendChild(remarkEle)
    wraperEle.appendChild(imgContentEle)
    wraperEle.appendChild(textContentEle)
    wraperEle.appendChild(lineEle)

    fragment.appendChild(wraperEle)
  }
}

export default ImgTextSection
