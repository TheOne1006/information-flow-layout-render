// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
// import "core-js/fn/array.forEach"
import StyleCtrl from "./style-controller"

export interface IadItemModel {
  stype: number
  title: string
  curl: string
  imageUrl?: string
}

export default class AdsRenderRect {
  static shapeType = {
    BIG_IMG: 0,     // 全文大图
    IMG_TEXT: 1,  // 左侧1张图, 右侧内容
    IMGS: 2,   // 多图模式
  }
  winWidth: number
  winHeight: number
  constructor() {
    // 获取 innerHeight / innerWidth
    if (window.innerHeight && window.innerWidth) {
      this.winWidth = window.innerWidth
      this.winHeight = window.innerHeight
    } else {
      if ((document.body) && (document.body.clientHeight) && (document.body.clientWidth)) {
        this.winHeight = document.body.clientHeight
        this.winWidth = document.body && document.body.clientWidth
      }
    }
  }

  render(domId: string, data: object[]) {
    this.paintAd(domId, data)
    console.log("render")
  }
  paintAd(domId: string, data: object[]) {
    const body = document.body
    const container = domId && document.getElementById(domId) || body
    const BIG_IMG = AdsRenderRect.shapeType.BIG_IMG
    const IMG_TEXT = AdsRenderRect.shapeType.IMG_TEXT
    const IMGS = AdsRenderRect.shapeType.IMGS

    data.forEach((item: IadItemModel) => {
      switch(item.stype) {
        case BIG_IMG:
          this.renderBigImgItem(container, item)
        break
        case IMG_TEXT:
          this.renderImgTextItem(container)
        break
        case IMGS:
          this.renderImgsItem(container)
        break
        default:
          return
      }
    })
  }
  renderBigImgItem(container: HTMLElement, adItem: IadItemModel) {
    const { title, curl, imageUrl } = adItem
    if (!imageUrl) {
      return
    }
    /**
     * 样式计算
     */
    const styleController = new StyleCtrl()
    const winWidth = this.winWidth

  }
  renderImgTextItem(container: HTMLElement) {
    console.log("render ImgText Item")
  }
  renderImgsItem(container: HTMLElement){
    console.log("render Imgs Item")
  }
}
