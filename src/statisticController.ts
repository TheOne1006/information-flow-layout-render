import { compile as pathCompile } from "path-to-regexp"
/**
 * 用于处理数据统计
 */
export interface IconstructorOption {
  sxinid?: number | string
  delay?: number // 延迟, 毫秒
  url?: string // 统计的url path like /static/:className/:id
  firstRenderUrl?: string // 首屏显示 reg path
  createRedirectUrl?: Function // 创建重定向 url
}

export default class StatisticCtrl {
  sxinid?: string | number
  delay?: number
  url: string
  firstRenderUrl?: string
  createRedirectUrl?: Function
  /**
   * 初始化成功 即需要 开启统计
   */
  constructor(option?: IconstructorOption) {
    this.sxinid = option && option.sxinid
    this.delay = (option && option.delay) || 100
    // 使用默认
    this.url =
      (option && option.url) ||
      "http://fight55.com/s?sxinid=:sxinid&sxinitemid=:sxinitemid(.*?)"
    this.firstRenderUrl =
      (option && option.firstRenderUrl) ||
      "http://fight55.com/s?sxinid=:sxinid&show=1"
    this.createRedirectUrl = option && option.createRedirectUrl
  }
  public scriptWay(src: string) {
    const dom = document.createElement("script")
    dom.type = "text/javascript"
    dom.src = src
    document.body.appendChild(dom)
  }
  /**
   * 物料点击
   * @param  {string} sxinitemid 物料 id
   */
  public materielClick(sxinitemid?: string | number) {
    if (!this.url) return
    const toPath = pathCompile(this.url)
    const src = toPath({ sxinid: this.sxinid, sxinitemid })
    this.scriptWay(src)
  }
  public firstRender() {
    if (!this.firstRenderUrl) return
    const toPath = pathCompile(this.firstRenderUrl)
    const src = toPath({ sxinid: this.sxinid })
    this.scriptWay(src)
  }
}
