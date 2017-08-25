const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SHOW_NUM = 5

export interface IconstructorOption {
  initData?: object[]
  nextPage?: number
  pageShowNum?: number
  mockRemoteLoad?: boolean
  ajaxFetch?: Function
}

export default class LoadCtrl {
  loading: boolean
  page: number
  showNum: number
  mockRemoteLoad: boolean
  isEnd: boolean
  data: object[]
  ajaxFetch: Function
  constructor({
    initData = [],
    nextPage = DEFAULT_PAGE_NUM,
    pageShowNum = DEFAULT_PAGE_SHOW_NUM,
    mockRemoteLoad = false,
    ajaxFetch
  }: IconstructorOption) {
    this.loading = false
    this.isEnd = false
    this.page = nextPage
    this.mockRemoteLoad = mockRemoteLoad
    this.showNum = pageShowNum
    this.data = initData
    if (ajaxFetch) {
      this.ajaxFetch = ajaxFetch
    }
  }
  public fetchData(page: number, callback: Function) {
    /**
     * 这里不处理 ajax 信息
     */
    if (this.loading) return
    if (this.isEnd) return

    this.loading = true
    const fetch = this.ajaxFetch

    const success = (data: object[]) => {
      this.loading = false
      // 加载结束
      if (this.showNum > data.length) {
        this.isEnd = true
      }
      callback(data)
    }

    const fail = (err: any) => {
      this.loading = false
      this.isEnd = true
      throw err
    }

    fetch({
      page,
      success,
      fail
    })
  }
  public fetchNext(callback: Function) {
    if (this.loading) return
    if (this.isEnd) return

    const page = this.page
    this.page = page + 1
    this.fetchData(page, callback)
  }
  public mockFetch(currentPage: number, callback: Function) {
    const dataArr = this.data
    const showNum = this.showNum
    const start = Math.min((currentPage - 1) * showNum, dataArr.length)
    const end = Math.min(currentPage * showNum, dataArr.length)

    if (end === dataArr.length) {
      this.isEnd = true
    }

    const curData = dataArr.slice(start, end)
    if (curData.length) {
      callback(curData)
    }
  }
  public mockFetchNext(callback: Function) {
    if (this.isEnd) return

    const page = this.page
    this.page = page + 1

    this.mockFetch(page, callback)
  }
  public getInit(callback: Function) {
    if (this.mockRemoteLoad) {
      // 模拟加载
      this.mockFetch(1, callback)
    } else {
      callback(this.data)
    }
  }
  public getNext(callback: Function) {
    if (this.mockRemoteLoad) {
      // 模拟加载
      this.mockFetchNext(callback)
    } else {
      this.fetchNext(callback)
    }
  }
}
