// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
// import "core-js/fn/array.forEach"
import StyleCtrl from "./style-controller"
import createLineStyles from "./theme/default/baseLine"
import bigImgStyle from "./theme/default/bigImg"
import imgTextStyle from "./theme/default/imgText"

export interface IadItemModel {
  stype: number
  title: string
  curl: string
  target?: string,
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

  public render(domId: string, data: object[]) {
    this.paintAd(domId, data)
    console.log("render")
  }
  public paintAd(domId: string, data: object[]) {
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
          this.renderImgTextItem(container, item)
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
    const { title, curl, imageUrl, target } = adItem
    const stype = AdsRenderRect.shapeType.BIG_IMG
    if (!imageUrl) {
      return
    }

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = document.createElement("a")
    wrapDom.href = curl
    wrapDom.target = target || "_self"
    wrapDom.title = title


    const styleController = new StyleCtrl()
    /**
     * 样式计算
     * 1. 尝试冲缓存中获取 styleCtrl
     */
    const winWidth = this.winWidth
    const wrapStyles = bigImgStyle.configWrapCreate(winWidth)
    styleController.appendSingleFontStyle(wrapDom, wrapStyles)

    /**
     * title Dom
     */
    const titleDom = document.createElement("span")
    titleDom.innerHTML = title
    const titleStyles = bigImgStyle.configTitleContainerCreate(winWidth)
    styleController.appendSingleFontStyle(titleDom, titleStyles)
    wrapDom.appendChild(titleDom)

    // img container
    const imgContentDom = document.createElement("div")
    const imgStyles = bigImgStyle.configImgContainerCreate(winWidth)

    styleController.appendSingleFontStyle(imgContentDom, imgStyles)
    imgContentDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgContentDom.style.backgroundSize = "cover"

    wrapDom.appendChild(imgContentDom)

    const lineDom = this.createLineDom(0, "")
    wrapDom.appendChild(lineDom)
    container.appendChild(wrapDom)
    container.style.display = "block"

  }
  renderImgTextItem(container: HTMLElement, adItem: IadItemModel) {
    const { title, curl, imageUrl, target } = adItem
    const stype = AdsRenderRect.shapeType.IMG_TEXT
    if (!imageUrl) {
      return
    }

    const winWidth = this.winWidth
    /**
     * warp
     */
    const wrapDom = document.createElement("a")
    wrapDom.href = curl
    wrapDom.target = target || "_self"
    wrapDom.title = title

    const styleController = new StyleCtrl()

    const wrapStyles = imgTextStyle.configWrapCreate(winWidth)
    styleController.appendSingleFontStyle(wrapDom, wrapStyles)

    /**
     * 左侧图片
     */
    const imgDom = document.createElement("div")
    const imgStyles = imgTextStyle.configImgCreate(winWidth)
    imgDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgDom.style.backgroundSize = "cover"

    styleController.appendSingleFontStyle(imgDom, imgStyles)

    wrapDom.appendChild(imgDom)


    /**
     * 右侧内容
     */
    const rightContent = document.createElement("div")
    const rightStyles = imgTextStyle.configRightCreate(winWidth)
    styleController.appendSingleFontStyle(rightContent, rightStyles)

    /**
     * title 相关
     */
    const titleWrapDom = document.createElement("div")
    const titleWrapStyles = imgTextStyle.configTitleWrapCreate(winWidth)
    styleController.appendSingleFontStyle(titleWrapDom, titleWrapStyles)

    const titleDom = document.createElement("span")
    const titleStyles = imgTextStyle.configTitleCreate(winWidth)
    styleController.appendSingleFontStyle(titleWrapDom, titleStyles)
    titleDom.innerText = title

    titleWrapDom.appendChild(titleDom)
    rightContent.appendChild(titleWrapDom)

    wrapDom.appendChild(rightContent)

    const lineDom = this.createLineDom(13, "")
    wrapDom.appendChild(lineDom)

    container.appendChild(wrapDom)
    container.style.display = "block"
    console.log("render ImgText Item")
  }
  renderImgsItem(container: HTMLElement){
    console.log("render Imgs Item")
  }
  createLineDom(top: number, position: string) {
    const lineDom = document.createElement("div")
    const styleController = new StyleCtrl()
    const lineStyles = createLineStyles(this.winWidth, {
      top,
      position
    })

    styleController.appendSingleFontStyle(lineDom, lineStyles)

    return lineDom
  }
}
