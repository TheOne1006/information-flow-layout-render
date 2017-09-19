// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
// import "core-js/fn/array.forEach"
import "core-js/fn/object/assign"

import isEmpty from "lodash.isempty"

import helper from "./help"

import { IadItemModel } from "./interfaces"

import { layoutType } from "./constants"

import StatisticCtrl, {
  IconstructorOption as IStatisticOptions
} from "./statisticController"

import LoadCtrl, { IconstructorOption as ILoadOptions } from "./loadController"

import BigImgSection from "./sections/bigImgSection"
import ImgsSection from "./sections/imgsSection"
import ImgTextSection from "./sections/imgTextSection"

import ImgsAdSection from "./sections/imgsAdSection"
import LayoutsSection from "./sections/layoutSections"
import VideoSection from "./sections/videoSection"

export interface IwatchOption {
  scroll?: boolean
  click?: boolean
  dom?: HTMLElement | string
  onEndReachedThreshold?: number // 极限值达到之后加载信息
}

const videoSectioner = new VideoSection()
const imgTextSectioner = new ImgTextSection()
const bigImgSectioner = new BigImgSection()
const imgsSectioner = new ImgsSection()
const imgsAdSectioner = new ImgsAdSection()
const layoutsSectioner = new LayoutsSection()

export default class InformationFlowLayoutRender {
  winWidth: number
  loadObj: any
  statisticObj: any
  footerDom: HTMLElement
  headerDom: HTMLElement
  containerDom: HTMLElement
  constructor(loadOptions: ILoadOptions) {
    if (document.body && document.body.clientWidth) {
      this.winWidth = document.body && document.body.clientWidth
    } else {
      // 获取 innerHeight / innerWidth
      this.winWidth = window.innerWidth
    }

    this.loadObj = new LoadCtrl(loadOptions)

    this.loadObj.subscribe("fetch-begin", () => {
      this.footer(this.loadObj.isEnd, this.loadObj.loading)
    })
    this.loadObj.subscribe("fetch-success", () => {
      this.footer(this.loadObj.isEnd, this.loadObj.loading)
    })
    this.loadObj.subscribe("fetch-fail", () => {
      this.footer(this.loadObj.isEnd, this.loadObj.loading)
    })
  }
  public init(
    dom: string | HTMLElement,
    watchOption: IwatchOption = {},
    statisticOption: IStatisticOptions,
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

    // 检测是否开启 统计选项
    if (!isEmpty(statisticOption)) {
      this.statisticObj = new StatisticCtrl(statisticOption)
    }

    // 初始化属性
    this.headerDom = layoutsSectioner.createHeader(this.winWidth)
    this.footerDom = layoutsSectioner.createFooter(this.winWidth)
    this.footer(loadObj.isEnd, loadObj.loading)
    this.containerDom = layoutsSectioner.createrContainer()

    // XXX: 优化逻辑
    // 非懒加载广告, 或者 container 不为 body(不适合懒加载规则)
    if (!lazyLoad || (watchOption.dom && watchOption.dom !== body)) {
      // 关闭懒加载
      // 监听对象非body
      this.initRender(layout, watchOption)
    } else {
      /**
       *  jquery 实现
       *  var doc_height = $(document).height();
       *  var scroll_top = $(window).scrollTop();
       *  var window_height = $(window).height();
       *  scroll_top + window_height >= doc_height 底部
       */
      const body = document.body
      const docHeight = helper.getEleHeight(document) // 文档高度
      const winHeight = helper.getEleHeight(window) // 可视区高度

      const initScrollTop = helper.getScrollTop(window) // 初始化时的滚动高度
      const isInBottom = initScrollTop + winHeight >= docHeight - 10

      // 存在底部,略过监听
      if (isInBottom) {
        this.initRender(layout, watchOption)
      } else {
        const that = this

        const scrollListener = () => {
          // 监听
          const scrollListenTop = helper.getScrollTop(window) // 距离顶部的距离
          const isInListenBottom = scrollListenTop + winHeight >= docHeight - 10

          if (isInListenBottom) {
            that.initRender(layout, watchOption)
            window.removeEventListener("scroll", scrollListener)
          }
        }
        window.addEventListener("scroll", scrollListener)
      }
    }
  }
  /**
   * 首次渲染
   * @param  {HTMLElement}     layout 容器对象
   * @param  {IwatchOption =      {}} watchOption 监听选项
   */
  public initRender(layout: HTMLElement, watchOption: IwatchOption = {}) {
    // 渲染头部
    const header = this.headerDom
    // 渲染
    const container = this.containerDom
    container.appendChild(header)
    layout.appendChild(container)
    const loadObj = this.loadObj
    // 渲染初始化的数据
    loadObj.getInit((data: any) => this.render(data))

    // 首次渲染统计
    if (this.statisticObj) {
      this.statisticObj.firstRender()
    }

    // 监听滚动事件
    const needWatchScroll = watchOption.scroll

    if (needWatchScroll) {
      this.watchScroll(
        watchOption.dom,
        watchOption.onEndReachedThreshold,
        (data: any) => this.render(data)
      )
    }

    // 监听点击事件

    if (watchOption && watchOption.click) {
      this.watchLoadMoreBtn((data: any) => this.render(data))
    }
  }
  public render(data: object[]) {
    const body = document.body
    // 通过文档碎片插入
    const fragment = document.createDocumentFragment()
    const container = this.containerDom

    const BIG_IMG = layoutType.BIG_IMG
    const IMG_TEXT = layoutType.IMG_TEXT
    const IMGS = layoutType.IMGS
    const VIDEO = layoutType.VIDEO
    const IMG_TEXT_AD = layoutType.IMG_TEXT_AD

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
        case VIDEO:
          videoSectioner.render(fragment, this.winWidth, item)
          break
        case IMG_TEXT_AD:
          this.renderImgsAdItem(fragment, item)
          break
        default:
          return
      }
    })
    // 底部加载信息
    const footer = this.footer()
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
    let watchDomHeight = 0

    if (dom && typeof dom === "string") {
      watchDom = document.getElementById(dom) || document.body
    } else if (typeof dom === "object" && dom instanceof HTMLElement) {
      watchDom = dom
      watchDomHeight = helper.getEleHeight(watchDom)
    }

    if (watchDom === document.body) {
      watchDomHeight = helper.getEleHeight(window)
    } else {
      watchDomHeight = helper.getEleHeight(watchDom)
    }

    const scrollHandle = function() {
      let watchDomDocHeight = 0 // 文档可滚动高度
      let wathchScrollTop = 0 // 滚动高度

      if (watchDom === document.body) {
        watchDomDocHeight = helper.getEleHeight(document)
        wathchScrollTop = helper.getScrollTop(window)
      } else {
        wathchScrollTop = helper.getScrollTop(watchDom)
        watchDomDocHeight = watchDom.scrollHeight
      }

      const scrollTop = watchDomDocHeight - wathchScrollTop - watchDomHeight
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
  public watchLoadMoreBtn(loadFun: Function) {
    const loadObj = this.loadObj
    const footer = this.footer()

    const clickHandle = function() {
      loadObj.getNext(loadFun)
    }

    if (footer.addEventListener) {
      footer.addEventListener("click", () => clickHandle())
    } else {
      footer.onclick = () => clickHandle()
    }
  }
  renderBigImgItem(container: DocumentFragment, adItem: IadItemModel) {
    const { imageUrl, curl, target, sxinitemid } = adItem

    if (!imageUrl) {
      return
    }

    let redirectUrl = curl

    if (
      this.statisticObj &&
      typeof this.statisticObj.createRedirectUrl === "function"
    ) {
      // 容错, 1. curl 补全, 2.createRedirectUrl 函数返回非字符串
      let validURL = curl
      if (!helper.isValidURL(curl)) {
        validURL = helper.completeURL(curl)
      }
      const cloneItem = Object.assign({}, adItem, { curl: validURL })
      redirectUrl = this.statisticObj.createRedirectUrl(cloneItem) || curl
    }

    const touchCallback = () => {
      if (this.statisticObj) {
        this.statisticObj.materielClick(sxinitemid)
        setTimeout(() => {
          window.open(redirectUrl, target || "_target")
        }, this.statisticObj.delay)
        return false
      }
    }

    bigImgSectioner.render(
      container,
      this.winWidth,
      adItem,
      redirectUrl,
      touchCallback
    )
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
      this.statisticObj &&
      typeof this.statisticObj.createRedirectUrl === "function"
    ) {
      // 容错, 1. curl 补全, 2.createRedirectUrl 函数返回非字符串
      let validURL = curl
      if (!helper.isValidURL(curl)) {
        validURL = helper.completeURL(curl)
      }
      const cloneItem = Object.assign({}, adItem, { curl: validURL })
      redirectUrl = this.statisticObj.createRedirectUrl(cloneItem) || curl
    }

    const winWidth = this.winWidth

    const touchCallback = () => {
      if (this.statisticObj) {
        this.statisticObj.materielClick(sxinitemid)
        setTimeout(() => {
          window.open(redirectUrl, target || "_target")
        }, this.statisticObj.delay)
        return false
      }
    }

    imgTextSectioner.render(
      container,
      winWidth,
      adItem,
      redirectUrl,
      touchCallback
    )
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
      this.statisticObj &&
      typeof this.statisticObj.createRedirectUrl === "function"
    ) {
      // 容错, 1. curl 补全, 2.createRedirectUrl 函数返回非字符串
      let validURL = curl
      if (!helper.isValidURL(curl)) {
        validURL = helper.completeURL(curl)
      }
      const cloneItem = Object.assign({}, adItem, { curl: validURL })
      redirectUrl = this.statisticObj.createRedirectUrl(cloneItem) || curl
    }

    const winWidth = this.winWidth

    const touchCallback = () => {
      if (this.statisticObj) {
        this.statisticObj.materielClick(sxinitemid)
        setTimeout(() => {
          window.open(redirectUrl, target || "_target")
        }, this.statisticObj.delay)
        return false
      }
    }

    imgsSectioner.render(
      container,
      winWidth,
      adItem,
      redirectUrl,
      touchCallback
    )
  }
  renderImgsAdItem(container: DocumentFragment, adItem: IadItemModel) {
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
      this.statisticObj &&
      typeof this.statisticObj.createRedirectUrl === "function"
    ) {
      // 容错, 1. curl 补全, 2.createRedirectUrl 函数返回非字符串
      let validURL = curl
      if (!helper.isValidURL(curl)) {
        validURL = helper.completeURL(curl)
      }
      const cloneItem = Object.assign({}, adItem, { curl: validURL })
      redirectUrl = this.statisticObj.createRedirectUrl(cloneItem) || curl
    }

    const winWidth = this.winWidth

    const touchCallback = () => {
      if (this.statisticObj) {
        this.statisticObj.materielClick(sxinitemid)
        setTimeout(() => {
          window.open(redirectUrl, target || "_target")
        }, this.statisticObj.delay)
        return false
      }
    }

    imgsAdSectioner.render(
      container,
      winWidth,
      adItem,
      redirectUrl,
      touchCallback
    )
  }
  // getter & setter
  footer(isEnd?: boolean, isLoading?: boolean) {
    const target = this.footerDom

    if (typeof isEnd === "undefined" && typeof isLoading === "undefined") {
      return target
    }

    const targetText = isEnd ? "-- 加载完成 --" : isLoading ? "加载中..." : "加载更多"

    if (target.innerText !== targetText) {
      target.innerText = targetText
    }
    return target
  }
}
