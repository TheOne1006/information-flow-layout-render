// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
// import "core-js/fn/array.forEach"
import { compile as pathCompile } from "path-to-regexp"
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
  sxinitemid?: any
}

export interface IwatchOption {
  scroll?: boolean
  dom?: HTMLElement | string
  onEndReachedThreshold?: number // 极限值达到之后加载信息
}

export interface IstatisticOption {
  sxinid?: number | string
  delay?: number // 延迟, 毫秒
  url?: string // 统计的url path like /static/:className/:id
  createRedirectUrl?: Function // 创建重定向 url
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
  containerDom: HTMLElement
  statisticOption?: IstatisticOption
  constructor(loadOptions: IconstructorOption) {
    if (document.body && document.body.clientWidth) {
      this.winWidth = document.body && document.body.clientWidth
    } else {
      // 获取 innerHeight / innerWidth
      this.winWidth = window.innerWidth
    }

    this.loadObj = new LoadCtrl(loadOptions)
  }
  public init(
    dom: string | HTMLElement,
    watchOption: IwatchOption = {},
    statisticOption: IstatisticOption,
    lazyLoad: boolean = true // 滚动到底部后方才开始加载广告
  ) {
    const body = document.body
    let layout: any
    if (dom && typeof dom === "string") {
      layout = document.getElementById(dom) || body
    } else if (typeof dom === "object" && dom instanceof HTMLElement) {
      layout = dom
    }

    // 容错
    if (!layout) return

    const loadObj = this.loadObj
    this.statisticOption = statisticOption

    const initRender = () => {
      // 渲染头部
      const header = this.createHeader()
      const container = this.createContainer()
      container.appendChild(header)
      layout.appendChild(container)
      // 渲染初始化的数据
      loadObj.getInit((data: any) => this.render(data, loadObj.isEnd))

      // 监听滚动事件
      const needWatchScroll = watchOption.scroll

      if (needWatchScroll) {
        this.watchScroll(
          watchOption.dom,
          watchOption.onEndReachedThreshold,
          (data: any) => this.render(data, loadObj.isEnd)
        )
      }
    }

    // 非懒加载广告, 或者 container 不为 body(不适合懒加载规则)
    if (!lazyLoad || (watchOption.dom && watchOption.dom !== body)) {
      initRender()
    } else {
      const documentEle = document.documentElement
      const needLazyLoad =
        documentEle.offsetHeight > documentEle.clientHeight + 50

      if (!needLazyLoad) {
        initRender()
      } else {
        const scrollListener = function() {
          const curBody = document.body
          const scrollHeight = curBody.scrollHeight
          const scrollTop =
            scrollHeight - curBody.scrollTop - window.screen.height
          if (scrollTop <= 0) {
            initRender()
            window.removeEventListener("scroll", scrollListener)
          }
        }
        window.addEventListener("scroll", scrollListener)
      }
    }
  }
  public render(data: object[], isEnd: boolean) {
    const body = document.body
    // 通过文档碎片插入
    const fragment = document.createDocumentFragment()
    const container = this.createContainer()

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
    const scrollHandle = function() {
      const watchDomHeight = watchDom.scrollHeight
      const scrollTop =
        watchDomHeight - watchDom.scrollTop - window.screen.height
      if (scrollTop <= onEndReachedThreshold) {
        loadObj.getNext(loadFun)
      }
    }
    const bindDom = watchDom === document.body ? window : watchDom

    if (bindDom.addEventListener) {
      bindDom.addEventListener("scroll", scrollHandle)
    } else {
      bindDom.onscroll = scrollHandle
    }
  }
  buildDom(nodeName: string, attrs: any = {}, createStyles?: Function) {
    const target: any = document.createElement(nodeName)
    if (attrs) {
      for (let attrName in attrs) {
        if (attrs.hasOwnProperty(attrName)) {
          target[attrName] = attrs[attrName]
        }
      }
    }

    if (createStyles) {
      const styles = createStyles()
      styleController.appendStyle(target, styles)
    }

    return target
  }
  renderBigImgItem(container: DocumentFragment, adItem: IadItemModel) {
    const {
      title,
      curl,
      imageUrl,
      target,
      type,
      src,
      desc,
      time,
      sxinitemid
    } = adItem
    if (!imageUrl) {
      return
    }
    let redirectUrl = curl

    if (
      this.statisticOption &&
      typeof this.statisticOption.createRedirectUrl === "function"
    ) {
      // 容错
      redirectUrl = this.statisticOption.createRedirectUrl(adItem) || curl
    }

    const winWidth = this.winWidth

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = this.buildDom(
      "a",
      {
        href: redirectUrl,
        target: target || "_self",
        title,
        onclick: (e: Event) => {
          // 兼容支持 js 模拟 a 连接
          if (this.statisticOption) {
            this.addStatisticsScript(this.statisticOption.sxinid, sxinitemid)
            setTimeout(() => {
              window.open(redirectUrl, target || "_self")
            }, this.statisticOption.delay || 100)
            return false
          }
        }
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
    const {
      title,
      curl,
      imageUrl,
      target,
      type,
      src,
      time,
      desc,
      sxinitemid
    } = adItem
    if (!imageUrl) {
      return
    }

    let redirectUrl = curl

    if (
      this.statisticOption &&
      typeof this.statisticOption.createRedirectUrl === "function"
    ) {
      // 容错
      redirectUrl = this.statisticOption.createRedirectUrl(adItem) || curl
    }

    const winWidth = this.winWidth
    /**
     * warp
     */
    const wrapDom = this.buildDom(
      "a",
      {
        href: redirectUrl,
        target: target || "_self",
        title: title,
        onclick: (e: Event) => {
          // 兼容支持 js 模拟 a 连接
          if (this.statisticOption) {
            this.addStatisticsScript(this.statisticOption.sxinid, sxinitemid)
            setTimeout(() => {
              window.open(redirectUrl, target || "_self")
            }, this.statisticOption.delay || 100)
            return false
          }
        }
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
    const {
      title,
      curl,
      images,
      target,
      desc,
      src,
      time,
      type,
      sxinitemid
    } = adItem
    if (!images || images.length === 0) {
      return
    }

    let redirectUrl = curl

    if (
      this.statisticOption &&
      typeof this.statisticOption.createRedirectUrl === "function"
    ) {
      // 容错
      redirectUrl = this.statisticOption.createRedirectUrl(adItem) || curl
    }

    const winWidth = this.winWidth

    /**
     * 创建基础 wrap dom
     */
    const wrapDom = this.buildDom(
      "a",
      {
        href: redirectUrl,
        target: target || "_self",
        title: title,
        onclick: (e: Event) => {
          // 兼容支持 js 模拟 a 连接
          if (this.statisticOption) {
            this.addStatisticsScript(this.statisticOption.sxinid, sxinitemid)
            setTimeout(() => {
              window.open(redirectUrl, target || "_self")
            }, this.statisticOption.delay || 100)
            return false
          }
        }
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
    target.innerText = desc

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
  createContainer() {
    if (!this.containerDom) {
      this.containerDom = this.buildDom("div", {})
    }
    return this.containerDom
  }
  createHeader() {
    this.headerDom = this.buildDom("div", {}, () =>
      headerStyle.configWrapCreate(this.winWidth)
    )
    const title = this.buildDom("div", {}, () =>
      headerStyle.configTitleCreate(this.winWidth)
    )
    title.innerText = "猜你喜欢"
    this.headerDom.appendChild(title)
    return this.headerDom
  }
  createFooter(isEnd: boolean) {
    if (!this.footerDom) {
      this.footerDom = this.buildDom("div", {}, () =>
        footerStyle.configWrapCreate(this.winWidth)
      )
    }
    const target = this.footerDom
    const targetText = isEnd ? "-- 加载完成 --" : "加载中..."
    if (target.innerText !== targetText) {
      target.innerText = targetText
    }

    return target
  }
  addStatisticsScript(sxinid?: number | string, sxinitemid?: number | string) {
    if (!this.statisticOption || !this.statisticOption.url) {
      return
    }
    const toPath = pathCompile(this.statisticOption.url)
    // const src = `http://fight55.com/s?sxinid=${sxinid}&sxinitemid=${sxinitemid}`
    const src = toPath({ sxinid, sxinitemid })
    const dom = document.createElement("script")
    dom.type = "text/javascript"
    dom.src = src
    document.body.insertBefore(dom, document.body.children.item(0))
  }
}
