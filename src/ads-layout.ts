// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
// import "core-js/fn/array.forEach"
import StyleCtrl from "./style-controller"
import createLineStyles from "./theme/default/baseLine"
import createDescStyles from "./theme/default/desc"
import srcTimeStyles from "./theme/default/srcTime"
import bigImgStyle from "./theme/default/bigImg"
import imgTextStyle from "./theme/default/imgText"
import imgsStyle from "./theme/default/imgs"

export interface IadItemModel {
  stype: number
  title: string
  curl: string
  target?: string
  imageUrl?: string
  images?: string[]
  desc?: string
  src?: string
  time?: string
  type?: any
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
          this.renderImgsItem(container, item)
        break
        default:
          return
      }
    })
  }
  renderBigImgItem(container: HTMLElement, adItem: IadItemModel) {
    const { title, curl, imageUrl, target, type, src, desc, time } = adItem
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

    if (type === 0 && desc) {
      const descDom = this.createDescDom(desc, 10, 10)
      wrapDom.appendChild(descDom)
    } else if (src && time) {
      const srcAndTimeDom = this.createSrcAndTimeDom(src, time, 10, 10, 20)
      wrapDom.appendChild(srcAndTimeDom)
    }

    const lineDom = this.createLineDom(0, "")
    wrapDom.appendChild(lineDom)
    container.appendChild(wrapDom)
    container.style.display = "block"

  }
  renderImgTextItem(container: HTMLElement, adItem: IadItemModel) {
    const { title, curl, imageUrl, target, type, src, time, desc } = adItem
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

    if (type === 0 && desc) {
      const descDom = this.createDescDom(desc, 15, 0)
      rightContent.appendChild(descDom)
    } else if (src && time) {
      const srcAndTimeDom = this.createSrcAndTimeDom(src, time, 0, 0, 20)
      rightContent.appendChild(srcAndTimeDom)
    }

    wrapDom.appendChild(rightContent)

    const lineDom = this.createLineDom(13, "")
    wrapDom.appendChild(lineDom)

    container.appendChild(wrapDom)
    container.style.display = "block"
    console.log("render ImgText Item")
  }
  renderImgsItem(container: HTMLElement, adItem: IadItemModel){
    const { title, curl, images, target, desc, src, time, type } = adItem
    if (!images || images.length === 0) {
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
    const wrapStyles = imgsStyle.configWrapCreate(winWidth)
    styleController.appendSingleFontStyle(wrapDom, wrapStyles)

    /**
     * title
     */
    const titleDom = document.createElement("span")
    titleDom.innerHTML = title
    const titleStyles = imgsStyle.configTitleCreate(winWidth)
    styleController.appendSingleFontStyle(titleDom, titleStyles)
    wrapDom.appendChild(titleDom)

    /**
     * content imgs
     */
    const imgLen = images.length
    for (let i = 0; i < imgLen; i++) {
      const curImg = images[i]

      const imgItem = document.createElement("div")
      const customStyle: any = {}

      if (i !== 0) {
        customStyle["margin-left"] = "3px"
      }

      const imgStyles = imgsStyle.configImgItemCreate(winWidth, customStyle, imgLen)

      styleController.appendSingleFontStyle(imgItem, imgStyles)
      imgItem.style.background = `url(${curImg}) center center no-repeat`
      imgItem.style.backgroundSize = "cover"

      wrapDom.appendChild(imgItem)
    }

    if (type === 0 && desc) {
      const descDom = this.createDescDom(desc, 0, 10)
      wrapDom.appendChild(descDom)
    } else if (src && time) {
      const srcAndTimeDom = this.createSrcAndTimeDom(src, time, 0, 10, 20)
      wrapDom.appendChild(srcAndTimeDom)
    }

    const lineDom = this.createLineDom(0, "")
    wrapDom.appendChild(lineDom)

    container.appendChild(wrapDom)
    container.style.display = "block"
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
  createDescDom(desc: string, top: number = 0, left: number = 0) {
    const target = document.createElement("div")
    if (!desc) {
      return target
    }
    target.innerHTML = desc

    const styleController = new StyleCtrl()
    const descStyles = createDescStyles(this.winWidth, {
      top,
      left,
      "margin-top": top,
      "margin-left": left,
    })

    styleController.appendSingleFontStyle(target, descStyles)

    return target
  }
  createSrcAndTimeDom(src: string, time: string, top: number, left: number, height: number) {
    const target = document.createElement("div")
    if (!src || !time) {
      return target
    }
    const styleController = new StyleCtrl()

    const customStyles = {
      top,
      left,
      height,
      "margin-left": left,
      "margin-top": top,
    }

    const wrapStyles = srcTimeStyles.configWrapCreate(this.winWidth, customStyles)
    styleController.appendSingleFontStyle(target, wrapStyles)

    const srcDom = document.createElement("div")
    const itemStyles = srcTimeStyles.configItemCreate(this.winWidth, {"line-height": height})
    srcDom.innerText = src
    styleController.appendSingleFontStyle(srcDom, itemStyles)

    const timeDom = document.createElement("div")
    timeDom.innerText = time
    styleController.appendSingleFontStyle(timeDom, itemStyles)

    target.appendChild(srcDom)
    target.appendChild(timeDom)

    return target
  }
}
