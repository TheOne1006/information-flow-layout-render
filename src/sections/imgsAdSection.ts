import ImgsSection from "./ImgsSection"

import { IadItemModel } from "../interfaces"

import imgsAdStyle from "../theme/default/imgsAd"

class ImgsAdSection extends ImgsSection {
  createRemark(
    winWidth: number,
    type: number,
    desc?: string,
    src?: string,
    time?: string
  ) {
    const wrap = super.createRemark(winWidth, type, desc, src, time)
    const adMask = this.buildDom(
      "div",
      {
        innerText: "广告"
      },
      () => imgsAdStyle.configAdMaskCreate(winWidth)
    )

    wrap.appendChild(adMask)

    return wrap
  }
  // createContent(winWidth: number, images: string[]) {
  //   const wrap = super.createContent(winWidth, images)
  //   const adMask = this.buildDom(
  //     "div",
  //     {
  //       innerText: "广告"
  //     },
  //     () => imgsAdStyle.configAdMaskCreate(winWidth)
  //   )
  //
  //   wrap.appendChild(adMask)
  //
  //   return wrap
  // }
  /**
   * 创建广告统计的 img
   * @param  {number} winWidth
   * @param  {array} title
   * @return {[type]}          [description]
   */
  createExposureImgs(winWidth: number, urls: string[]) {
    const wrapDom = this.buildDom("span", {}, () => ({ display: "none" }))

    const imgLen = urls.length

    for (let i = 0; i < imgLen; i++) {
      const curImg = urls[i]

      const imgItem = this.buildDom("img", {
        src: curImg
      })

      wrapDom.appendChild(imgItem)
    }

    return wrapDom
  }
  render(
    fragment: DocumentFragment,
    winWidth: number,
    adItem: IadItemModel,
    redirectUrl?: string,
    touchCallback?: Function
  ) {
    super.render(fragment, winWidth, adItem, redirectUrl, touchCallback)
    const { monitorUrl, reqUrls } = adItem
    let adUrls: string[] = []

    if (monitorUrl && monitorUrl.length) {
      adUrls = adUrls.concat(monitorUrl)
    }
    if (reqUrls && reqUrls.length) {
      adUrls = adUrls.concat(reqUrls)
    }

    const adDom = this.createExposureImgs(winWidth, adUrls)
    fragment.appendChild(adDom)
  }
}

export default ImgsAdSection
