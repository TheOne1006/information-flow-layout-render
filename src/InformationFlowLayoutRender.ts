// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
// import "core-js/fn/array.forEach"
import StyleCtrl from "./styleController"
import LoadCtrl, { IconstructorOption } from "./loadController"
import createLineStyles from "./theme/default/baseLine"
import createDescStyles from "./theme/default/desc"
import srcTimeStyles from "./theme/default/srcTime"
import bigImgStyle from "./theme/default/bigImg"
import imgTextStyle from "./theme/default/imgText"
import imgsStyle from "./theme/default/imgs"
import footerStyle from "./theme/default/footer"
import headerStyle from "./theme/default/header"

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

export interface IwatchOption {
  scroll?: boolean
  dom?: HTMLElement | string
  onEndReachedThreshold?: number // 极限值达到之后加载信息
}

const styleController = new StyleCtrl()

export default class InformationFlowLayoutRender {
  static layoutType = {
    BIG_IMG: 0, // 全文大图
    IMG_TEXT: 1, // 左侧1张图, 右侧内容
    IMGS: 2 // 多图模式
  }
  static remarkType = {
    SHOW_DESC: 0,
    SHOW_SRC_TIME: 1
  }
  winWidth: number
  loadObj: any
  footerDom: HTMLElement
  headerDom: HTMLElement
  constructor(loadOptions: IconstructorOption) {
    if (document.body && document.body.clientWidth) {
      this.winWidth = document.body && document.body.clientWidth
    } else {
      // 获取 innerHeight / innerWidth
      this.winWidth = window.innerWidth
    }

    this.loadObj = new LoadCtrl(loadOptions)
  }
  public init(dom: string | HTMLElement, option: IwatchOption = {}) {
    const body = document.body
    let container
    if (dom && typeof dom === "string") {
      container = document.getElementById(dom) || body
    } else if (typeof dom === "object" && dom instanceof HTMLElement) {
      container = dom
    }

    if (!container) return
    // 渲染头部
    const header = this.createHeader()
    container.appendChild(header)

    const loadObj = this.loadObj

    // 渲染初始化的数据
    loadObj.getInit((data: any) => this.render(dom, data, loadObj.isEnd))

    // 监听滚动事件
    const needWatchScroll = option.scroll

    if (needWatchScroll) {
      this.watchScroll(option.dom, option.onEndReachedThreshold, (data: any) =>
        this.render(dom, data, loadObj.isEnd)
      )
    }
  }
  public render(dom: string | HTMLElement, data: object[], isEnd: boolean) {
    const body = document.body
    // 通过文档碎片插入
    const fragment = document.createDocumentFragment()
    let container

    if (dom && typeof dom === "string") {
      container = document.getElementById(dom) || body
    } else if (typeof dom === "object" && dom instanceof HTMLElement) {
      container = dom
    }

    if (!container) return

    const BIG_IMG = InformationFlowLayoutRender.layoutType.BIG_IMG
    const IMG_TEXT = InformationFlowLayoutRender.layoutType.IMG_TEXT
    const IMGS = InformationFlowLayoutRender.layoutType.IMGS

    data.forEach((item: IadItemModel) => {
      switch (item.stype) {
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
    // 底部加载信息
    const footer = this.createFooter(isEnd)
    fragment.appendChild(footer)

    container.appendChild(fragment)
  }
  // 监听 滚动
  public watchScroll(
    dom: string | HTMLElement | undefined,
    onEndReachedThreshold: number = 50,
    loadFun: Function
  ) {
    const loadObj = this.loadObj
    let watchDom = document.body

    if (dom && typeof dom === "string") {
      watchDom = document.getElementById(dom) || document.body
    } else if (typeof dom === "object" && dom instanceof HTMLElement) {
      watchDom = dom
    }

    const watchHeight = watchDom.clientHeight
    watchDom.onscroll = function(e) {
      const watchDomHeight = watchDom.scrollHeight
      const scrollTop = watchDomHeight - watchDom.scrollTop - watchHeight
      if (scrollTop <= onEndReachedThreshold) {
        loadObj.getNext(loadFun)
      }
    }
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
    const wrapDom = this.buildDom(
      "a",
      {
        href: curl,
        target: target || "_self",
        title
      },
      () => bigImgStyle.configWrapCreate(winWidth)
    )

    /**
     * title Dom
     */
    const titleDom = this.buildDom(
      "span",
      {
        innerHTML: title
      },
      () => bigImgStyle.configTitleContainerCreate(winWidth)
    )
    wrapDom.appendChild(titleDom)

    // img container
    const imgContentDom = this.buildDom("div", {}, () =>
      bigImgStyle.configImgContainerCreate(winWidth)
    )
    imgContentDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgContentDom.style.backgroundSize = "cover"

    wrapDom.appendChild(imgContentDom)

    if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
      const descDom = this.createDescDom(desc, 10, 10)
      wrapDom.appendChild(descDom)
    } else if (
      type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
      src &&
      time
    ) {
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
    const wrapDom = this.buildDom(
      "a",
      {
        href: curl,
        target: target || "_self",
        title: title
      },
      () => imgTextStyle.configWrapCreate(winWidth)
    )

    /**
     * 左侧图片
     */
    const imgDom = this.buildDom("div", {}, () =>
      imgTextStyle.configImgCreate(winWidth)
    )
    imgDom.style.background = `url(${imageUrl}) center center no-repeat`
    imgDom.style.backgroundSize = "cover"

    wrapDom.appendChild(imgDom)

    /**
     * 右侧内容
     */
    const rightContent = this.buildDom("div", {}, () =>
      imgTextStyle.configRightCreate(winWidth)
    )

    /**
     * title 相关
     */
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
    rightContent.appendChild(titleWrapDom)

    if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
      const descDom = this.createDescDom(desc, 10, 0)
      rightContent.appendChild(descDom)
    } else if (
      type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
      src &&
      time
    ) {
      const srcAndTimeDom = this.createSrcAndTimeDom(src, time, 5, 0, 20)
      rightContent.appendChild(srcAndTimeDom)
    }

    wrapDom.appendChild(rightContent)

    const lineDom = this.createLineDom(13, "")
    wrapDom.appendChild(lineDom)

    container.appendChild(wrapDom)
    return container
  }
  renderImgsItem(container: DocumentFragment, adItem: IadItemModel) {
    const { title, curl, images, target, desc, src, time, type } = adItem
    if (!images || images.length === 0) {
      return
    }

    const winWidth = this.winWidth

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = this.buildDom(
      "a",
      {
        href: curl,
        target: target || "_self",
        title: title
      },
      () => imgsStyle.configWrapCreate(winWidth)
    )

    /**
     * title
     */
    const titleDom = this.buildDom(
      "span",
      {
        innerText: title
      },
      () => imgsStyle.configTitleCreate(winWidth)
    )
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

      const imgItem = this.buildDom("div", {}, () =>
        imgsStyle.configImgItemCreate(winWidth, customStyle, imgLen)
      )
      imgItem.style.background = `url(${curImg}) center center no-repeat`
      imgItem.style.backgroundSize = "cover"

      wrapDom.appendChild(imgItem)
    }

    if (type === InformationFlowLayoutRender.remarkType.SHOW_DESC && desc) {
      const descDom = this.createDescDom(desc, 0, 10)
      wrapDom.appendChild(descDom)
    } else if (
      type === InformationFlowLayoutRender.remarkType.SHOW_SRC_TIME &&
      src &&
      time
    ) {
      const srcAndTimeDom = this.createSrcAndTimeDom(src, time, 0, 10, 20)
      wrapDom.appendChild(srcAndTimeDom)
    }

    const lineDom = this.createLineDom(0, "")
    wrapDom.appendChild(lineDom)

    container.appendChild(wrapDom)
    return container
  }
  createLineDom(top: number, position: string) {
    const lineDom = this.buildDom("div", {}, () =>
      createLineStyles(this.winWidth, {
        top,
        position
      })
    )

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
      "margin-left": left
    })

    styleController.appendStyle(target, descStyles)

    return target
  }
  createSrcAndTimeDom(
    src: string,
    time: string,
    top: number,
    left: number,
    height: number
  ) {
    const target = document.createElement("div")
    if (!src || !time) {
      return target
    }

    const customStyles = {
      top,
      left,
      height,
      "margin-left": left,
      "margin-top": top
    }

    const wrapStyles = srcTimeStyles.configWrapCreate(
      this.winWidth,
      customStyles
    )
    styleController.appendStyle(target, wrapStyles)

    const srcDom = document.createElement("div")
    const itemStyles = srcTimeStyles.configItemCreate(this.winWidth, {
      "line-height": height
    })
    srcDom.innerText = src
    styleController.appendStyle(srcDom, itemStyles)

    const timeDom = document.createElement("div")
    timeDom.innerText = time
    styleController.appendStyle(timeDom, itemStyles)

    target.appendChild(srcDom)
    target.appendChild(timeDom)

    return target
  }
  createHeader() {
    this.headerDom = this.buildDom("div", {}, () =>
      headerStyle.configWrapCreate(0)
    )
    const title = this.buildDom("div", {}, () =>
      headerStyle.configTitleCreate(0)
    )
    title.innerText = "猜你喜欢"
    this.headerDom.appendChild(title)
    return this.headerDom
  }
  createFooter(isEnd: boolean) {
    if (!this.footerDom) {
      this.footerDom = this.buildDom("div", {}, () =>
        footerStyle.configWrapCreate(0)
      )
    }
    const target = this.footerDom
    const targetText = isEnd ? "-- 加载完成 --" : "加载更多..."
    if (target.innerText !== targetText) {
      target.innerText = targetText
    }

    return target
  }
}
