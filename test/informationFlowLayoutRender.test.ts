import InformationFlowLayoutRender from "../src/InformationFlowLayoutRender"
import {} from "jest"

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

  describe("InformationFlowLayoutRender Fun buildDom to create dom", () => {
    it("only create dom", () => {
      const target = layout.buildDom("a")
      expect(target.nodeName).toBe("A")
    })

    it("create dom and Set attrbuites", () => {
      const target = layout.buildDom("div", { id: "id" })
      expect(target.nodeName).toBe("DIV")
      expect(target.id).toBe("id")
    })

    it("create dom and Set styles", () => {
      const target = layout.buildDom("span", {}, () => ({
        border: "1px solid #ccc"
      }))
      expect(target.nodeName).toBe("SPAN")
      expect(target.style.cssText).toBe("border: 1px solid #ccc;")
    })
  })

  describe("InformationFlowLayoutRender Fun renderBigImgItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments", () => {
      const expectd = layout.renderBigImgItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl:
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderBigImgItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })

    it("return some children dom with truthy arguments when type = 0", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl:
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderBigImgItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(4)
    })
  })

  describe("InformationFlowLayoutRender Fun renderImgTextItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments", () => {
      const expectd = layout.renderImgTextItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl:
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderImgTextItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })

    it("return some children dom with truthy arguments when type = 0", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl:
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderImgTextItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(3)
    })
  })

  describe("InformationFlowLayoutRender Fun renderImgsItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments", () => {
      const expectd = layout.renderImgsItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        images: [
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58"
        ],
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderImgsItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(5)
    })

    it("return some children dom with truthy arguments when type = 0", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        images: [
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58"
        ],
        type: 0,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderImgsItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(6)
    })
  })

  describe("InformationFlowLayoutRender Fun renderImgsItem to create some dom", () => {
    let targetDom
    beforeEach(() => {
      targetDom = document.createElement("div")
    })

    it("return undefined with error arguments", () => {
      const expectd = layout.renderImgsItem(targetDom, { title: "title" })
      expect(expectd).toBe(undefined)
    })

    it("return some children dom with truthy arguments when type = 1", () => {
      const itemOptions = {
        title: "title",
        curl: "https://www.baidu.com",
        images: [
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58",
          "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=567265072,815321324&fm=58"
        ],
        type: 1,
        src: "baidu",
        desc: "desc",
        time: ""
      }
      layout.renderImgsItem(targetDom, itemOptions)
      const childrens = targetDom.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(5)
    })
  })
  describe("InformationFlowLayoutRender Fun createLineDom to create a dom", () => {
    it("return a Div Dom with no arguments", () => {
      const targetDom = layout.createLineDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    it("return a Div Dom with some arguments", () => {
      const top = 10
      const position = "abosulte"
      const targetDom = layout.createLineDom(top, position)
      expect(targetDom.style.top).toBe(`${top}px`)
      expect(targetDom.style.position).toBe(position)
    })
  })
  describe("InformationFlowLayoutRender Fun createDescDom to create a dom", () => {
    it("no arguments", () => {
      const targetDom = layout.createDescDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    it("some arguments", () => {
      const desc = "desc"
      const top = 10
      const left = 10
      const targetDom = layout.createDescDom(desc, top, left)

      expect(targetDom.innerText).toBe(desc)
      expect(targetDom.style.top).toBe(`${top}px`)
      expect(targetDom.style["margin-top"]).toBe(`${top}px`)
      expect(targetDom.style.left).toBe(`${left}px`)
      expect(targetDom.style["margin-left"]).toBe(`${left}px`)
    })
  })
  describe("InformationFlowLayoutRender Fun createSrcAndTimeDom to create a dom", () => {
    it("no arguments", () => {
      const targetDom = layout.createSrcAndTimeDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    describe("error arguments", () => {
      it("empty src", () => {
        const src = ""
        const time = "12-12"
        const targetDom = layout.createSrcAndTimeDom()
        expect(targetDom.nodeName).toBe("DIV")
      })
    })
  })
})
