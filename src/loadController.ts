import {} from "whatwg-fetch"

const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SHOW_NUM = 5

export interface IconstructorOption {
  initData?: object[]
  nextPage?: number
  pageShowNum?: number
  mockRemoteLoad?: boolean
  baseUri?: string
}

export default class LoadCtrl {
  loading: boolean
  page: number
  showNum: number
  mockRemoteLoad: boolean
  isEnd: boolean
  data: object[]
  baseUri: string
  constructor({
    initData = [],
    nextPage = DEFAULT_PAGE_NUM,
    pageShowNum = DEFAULT_PAGE_SHOW_NUM,
    mockRemoteLoad = false,
    baseUri = ""
  }: IconstructorOption) {
    this.loading = false
    this.isEnd = false
    this.page = nextPage
    this.mockRemoteLoad = mockRemoteLoad
    this.showNum = pageShowNum
    this.data = initData
    this.baseUri = baseUri
  }
  public fetch(uri: string, callback: Function) {
    if (this.loading) return

    this.loading = true
    fetch(uri)
      .then(response => {
        const data = response.json
        this.loading = false

        // 加载结束
        if (this.showNum < data.length) {
          this.isEnd = true
        }

        callback(data)
      })
      .catch(console.warn)
  }
  public fetchNext(callback: Function) {
    if (this.loading) return
    const baseUri = this.baseUri
    const uri = `${baseUri}?page=${this.page}`
    this.page = this.page + 1
    this.fetch(uri, callback)
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
