import AdsLayout from "../src/ads-layout"
import {} from "jest"

describe("ads-layout test", () => {
  let adsLayout
  beforeEach(() => {
    adsLayout = new AdsLayout()
  })

  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("AdsLayout is instantiable", () => {
    expect(new AdsLayout()).toBeInstanceOf(AdsLayout)
  })

  describe("AdsLayout Fun buildDom to create dom", () => {
    it("only create dom", () => {
      const target = adsLayout.buildDom("a")
      expect(target.nodeName).toBe("A")
    })

    it("create dom and Set attrbuites", () => {
      const target = adsLayout.buildDom("div", { id: "id" })
      expect(target.nodeName).toBe("DIV")
      expect(target.id).toBe("id")
    })

    it("create dom and Set styles", () => {
      const target = adsLayout.buildDom("span", {}, () => ({
        "border": "1px solid #ccc",
      }))
      expect(target.nodeName).toBe("SPAN")
      expect(target.style.cssText).toBe("border: 1px solid #ccc;")
    })
  })

  describe("AdsLayout Fun renderBigImgItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments" , () => {
      const expectd = adsLayout.renderBigImgItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderBigImgItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })

    it("return some children dom with truthy arguments when type = 0" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderBigImgItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(4)
    })
  })

  describe("AdsLayout Fun renderImgTextItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments" , () => {
      const expectd = adsLayout.renderImgTextItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderImgTextItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })

    it("return some children dom with truthy arguments when type = 0" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderImgTextItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })
  })

  describe("AdsLayout Fun renderImgsItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments" , () => {
      const expectd = adsLayout.renderImgsItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        images:
        [
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        ],
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderImgsItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(5)
    })

    it("return some children dom with truthy arguments when type = 0" , () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        images:
        [
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        ],
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      adsLayout.renderImgsItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(6)
    })
  })
})
