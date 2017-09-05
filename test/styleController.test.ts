import {} from "jest"
import StyleCtrl from "../src/styleController"

describe("style-controller test", () => {
  it("protected func genStyle return a empty", () => {
    const styleCtrl = new StyleCtrl()
    const expectStr = ""
    const receivedStr = (styleCtrl as any).genStyle()
    expect(receivedStr).toBe(expectStr)
  })
  it("protected func genStyle return a string with validate data", () => {
    const styles = {
      display: "block",
      width: 100
    }

    const styleCtrl = new StyleCtrl()
    const expectStr = "display:block;width:100px;"
    /**
     * 单元测试 私有方法
     * http://patrickdesjardins.com/blog/how-to-unit-test-private-method-in-typescript-part-2
     */
    const receivedStr = (styleCtrl as any).genStyle(styles)
    expect(receivedStr).toBe(expectStr)
  })

  it("protected func genStyle return a string with undefind", () => {
    const styleCtrl = new StyleCtrl()
    const expectStr = ""
    const receivedStr = (styleCtrl as any).genStyle()
    expect(receivedStr).toBe(expectStr)
  })

  it("protected func appendStyle with validate data", () => {
    const styles = {
      display: "block",
      width: 100
    }
    const expectStr = "display: block; width: 100px;"

    const styleCtrl = new StyleCtrl() as any
    const divEle = document.createElement("div")
    styleCtrl.appendStyle(divEle, styles)
    const receivedStr = divEle.style.cssText

    expect(receivedStr).toBe(expectStr)
  })

  it("public func appendStyle with validate data", () => {
    const styles = {
      display: "display",
      position: "relative",
      top: 0,
      left: 0,
      width: 100,
      height: 100
    }
    const expectStr =
      "display: display; position: relative; top: 0px; left: 0px; width: 100px; height: 100px;"

    const styleCtrl = new StyleCtrl() as any
    const divEle = document.createElement("div")
    styleCtrl.appendStyle(divEle, styles)
    const receivedStr = divEle.style.cssText

    expect(receivedStr).toBe(expectStr)
  })
})
