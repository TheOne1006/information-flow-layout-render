import ImgsSection from "./ImgsSection"

import { IadItemModel } from "../interfaces"

class ImgsAdSection extends ImgsSection {
  /**
   * 创建广告统计的 img
   * @param  {number} winWidth
   * @param  {array} title
   * @return {[type]}          [description]
   */
  createAdImgs(winWidth: number, urls: string[]) {
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

    const adDom = this.createAdImgs(winWidth, adUrls)
    fragment.appendChild(adDom)
  }
}

export default ImgsAdSection
