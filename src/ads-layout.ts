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

const styleController = new StyleCtrl()

export default class AdsRenderRect {
  static shapeType = {
    BIG_IMG: 0,     // 全文大图
    IMG_TEXT: 1,  // 左侧1张图, 右侧内容
    IMGS: 2,   // 多图模式
  }
  winWidth: number
  constructor() {
    // 获取 innerHeight / innerWidth
    if (window.innerHeight) {
      this.winWidth = window.innerWidth
    } else {
      if ((document.body) && (document.body.clientWidth)) {
        this.winWidth = document.body && document.body.clientWidth
      }
    }
  }
  public render(domId: string, data: object[]) {
    const body = document.body
    // 通过文档碎片插入
    const fragment = document.createDocumentFragment()
    const container = domId && document.getElementById(domId) || body
    const BIG_IMG = AdsRenderRect.shapeType.BIG_IMG
    const IMG_TEXT = AdsRenderRect.shapeType.IMG_TEXT
    const IMGS = AdsRenderRect.shapeType.IMGS

    data.forEach((item: IadItemModel) => {
      switch(item.stype) {
        case BIG_IMG:
          this.renderBigImgItem(fragment, item)
        break
        case IMG_TEXT:
          this.renderImgTextItem(fragment, item)
        break
        case IMGS:
          this.renderImgsItem(fragment, item)
        break
        default:
          return
      }
    })
    container.appendChild(fragment)
  }
  buildDom(nodeName: string, attrs: any = {}, createStyles?: Function) {
    const target: any = document.createElement(nodeName)
    for (let attrName in attrs) {
      if (attrs.hasOwnProperty(attrName)) {
        target[attrName] = attrs[attrName]
      }
    }

    if (createStyles) {
      const styles = createStyles()
      styleController.appendStyle(target, styles)
    }

    return target
  }
  renderBigImgItem(container: DocumentFragment, adItem: IadItemModel) {
    const { title, curl, imageUrl, target, type, src, desc, time } = adItem
    if (!imageUrl) {
      return
    }

    const winWidth = this.winWidth

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = this.buildDom("a", {
      href: curl,
      target: target || "_self",
      title,
    }, () => bigImgStyle.configWrapCreate(winWidth))

    /**
     * title Dom
     */
    const titleDom = this.buildDom("span", {
      innerHTML: title
    }, () => bigImgStyle.configTitleContainerCreate(winWidth))
    wrapDom.appendChild(titleDom)

    // img container
    const imgContentDom = this.buildDom("div",
      {},
      () => bigImgStyle.configImgContainerCreate(winWidth))
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
    return container
  }
  renderImgTextItem(container: DocumentFragment, adItem: IadItemModel) {
    const { title, curl, imageUrl, target, type, src, time, desc } = adItem
    if (!imageUrl) {
      return
    }

    const winWidth = this.winWidth
    /**
     * warp
     */
    const wrapDom = this.buildDom("a",
      {
        href: curl,
        target: target || "_self",
        title: title,
      },
      () => imgTextStyle.configWrapCreate(winWidth))

    /**
     * 左侧图片
     */
    const imgDom = this.buildDom("div",
      {},
      () => imgTextStyle.configImgCreate(winWidth))
    imgDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgDom.style.backgroundSize = "cover"

    wrapDom.appendChild(imgDom)

    /**
     * 右侧内容
     */
    const rightContent = this.buildDom("div",
      {},
      () => imgTextStyle.configRightCreate(winWidth)
    )

    /**
     * title 相关
     */
    const titleWrapDom = this.buildDom("div" ,
      {},
      () => imgTextStyle.configTitleWrapCreate(winWidth)
    )

    const titleDom = this.buildDom("span", {
      innerText: title,
    },
    () => imgTextStyle.configTitleCreate(winWidth))

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
    return container
  }
  renderImgsItem(container: DocumentFragment, adItem: IadItemModel){
    const { title, curl, images, target, desc, src, time, type } = adItem
    if (!images || images.length === 0) {
      return
    }

    const winWidth = this.winWidth

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = this.buildDom("a", {
      href: curl,
      target: target || "_self",
      title: title,
    }, () => imgsStyle.configWrapCreate(winWidth))

    /**
     * title
     */
    const titleDom = this.buildDom("span", {
      innerText: title,
    }, () => imgsStyle.configTitleCreate(winWidth))
    wrapDom.appendChild(titleDom)

    /**
     * content imgs
     */
    const imgLen = images.length
    for (let i = 0; i < imgLen; i++) {
      const curImg = images[i]

      const customStyle: any = {}

      if (i !== 0) {
        customStyle["margin-left"] = "3px"
      }

      const imgItem = this.buildDom("div",
        {},
        () => imgsStyle.configImgItemCreate(winWidth, customStyle, imgLen)
      )
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
    return container
  }
  createLineDom(top: number, position: string) {
    const lineDom = this.buildDom("div",
      {},
      () => createLineStyles(this.winWidth, {
        top,
        position
      }))

    return lineDom
  }
  createDescDom(desc: string, top: number = 0, left: number = 0) {
    const target = document.createElement("div")
    if (!desc) {
      return target
    }
    target.innerHTML = desc

    const descStyles = createDescStyles(this.winWidth, {
      top,
      left,
      "margin-top": top,
      "margin-left": left,
    })

    styleController.appendStyle(target, descStyles)

    return target
  }
  createSrcAndTimeDom(src: string, time: string, top: number, left: number, height: number) {
    const target = document.createElement("div")
    if (!src || !time) {
      return target
    }

    const customStyles = {
      top,
      left,
      height,
      "margin-left": left,
      "margin-top": top,
    }

    const wrapStyles = srcTimeStyles.configWrapCreate(this.winWidth, customStyles)
    styleController.appendStyle(target, wrapStyles)

    const srcDom = document.createElement("div")
    const itemStyles = srcTimeStyles.configItemCreate(this.winWidth, {"line-height": height})
    srcDom.innerText = src
    styleController.appendStyle(srcDom, itemStyles)

    const timeDom = document.createElement("div")
    timeDom.innerText = time
    styleController.appendStyle(timeDom, itemStyles)

    target.appendChild(srcDom)
    target.appendChild(timeDom)

    return target
  }
}
