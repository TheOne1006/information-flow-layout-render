import {} from "jest"
import InformationFlowLayoutRender from "../src/InformationFlowLayoutRender"

describe("ads-layout test", () => {
  let layout
  let loadOptions
  beforeEach(() => {
    loadOptions = {
      initData: [],
      nextPage: 2,
      pageShowNum: 5,
      mockRemoteLoad: true
    }
    layout = new InformationFlowLayoutRender(loadOptions)
  })

  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("InformationFlowLayoutRender is instantiable", () => {
    expect(layout).toBeInstanceOf(InformationFlowLayoutRender)
  })

  describe("InformationFlowLayoutRender Fun footer to change innerText", () => {
    beforeEach(() => {
      layout.footerDom = document.createElement("div")
    })
    it("argument isEnd true", () => {
      const isEnd = true
      const isLoading = false
      const targetDom = layout.footer(isEnd)
      expect(targetDom.innerText).toBe("-- 加载完成 --")
    })
    it("argument isEnd false & isLoading true", () => {
      const isEnd = false
      const isLoading = true
      const targetDom = layout.footer(isEnd, isLoading)
      expect(targetDom.innerText).toBe("加载中...")
    })
    it("argument isEnd false & isLoading false", () => {
      const isEnd = false
      const isLoading = false
      const targetDom = layout.footer(isEnd, isLoading)
      expect(targetDom.innerText).toBe("加载更多")
    })
    it("argument change", () => {
      const isEnd = false
      const isLoading = false
      const isLoading2 = true
      const targetDom = layout.footer(isEnd, isLoading)
      const targetDom2 = layout.footer(isEnd, isLoading2)

      expect(targetDom.innerText).toBe("加载中...")
    })
  })
})
