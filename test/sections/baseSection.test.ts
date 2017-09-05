import {} from "jest"
import BaseSection from "../../src/sections/baseSection"

describe("class BaseSection for create Dom Base", () => {
  let base
  let winWidth
  beforeEach(() => {
    winWidth = (document.body && document.body.clientWidth) || window.innerWidth
    base = new BaseSection()
  })

  it("base is instantiable", () => {
    expect(base).toBeInstanceOf(BaseSection)
  })

  describe("BaseSection Fun buildDom to create dom", () => {
    it("only create dom", () => {
      const target = base.buildDom("a")
      expect(target.nodeName).toBe("A")
    })

    it("create dom and Set attrbuites", () => {
      const target = base.buildDom("div", { id: "id" })
      expect(target.nodeName).toBe("DIV")
      expect(target.id).toBe("id")
    })

    it("create dom and Set styles", () => {
      const target = base.buildDom("span", {}, () => ({
        border: "1px solid #ccc"
      }))
      expect(target.nodeName).toBe("SPAN")
      expect(target.style.cssText).toBe("border: 1px solid #ccc;")
    })
  })

  describe("BaseSection Fun createLineDom to create a dom", () => {
    it("return a Div Dom with no arguments", () => {
      const targetDom = base.createLineDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    it("return a Div Dom with some arguments", () => {
      const top = 10
      const position = "abosulte"
      const targetDom = base.createLineDom(winWidth, top, position)
      expect(targetDom.style.top).toBe(`${top}px`)
      expect(targetDom.style.position).toBe(position)
    })
  })

  describe("BaseSection Fun createDescDom to create a dom", () => {
    it("no arguments", () => {
      const targetDom = base.createDescDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    it("some arguments", () => {
      const desc = "desc"
      const top = 10
      const left = 10
      const targetDom = base.createDescDom(winWidth, top, left, desc)

      expect(targetDom.innerText).toBe(desc)
      expect(targetDom.style.top).toBe(`${top}px`)
      expect(targetDom.style["margin-top"]).toBe(`${top}px`)
      expect(targetDom.style.left).toBe(`${left}px`)
      expect(targetDom.style["margin-left"]).toBe(`${left}px`)
    })
  })

  describe("BaseSection Fun createSrcAndTimeDom to create a dom", () => {
    it("no arguments", () => {
      const targetDom = base.createSrcAndTimeDom()
      expect(targetDom.nodeName).toBe("DIV")
    })
    describe("error arguments", () => {
      it("empty src", () => {
        const src = ""
        const time = "12-12"
        const targetDom = base.createSrcAndTimeDom(winWidth, 0, 0, 0, src, time)
        expect(targetDom.nodeName).toBe("DIV")
        const children = targetDom.children
        expect(children).toHaveLength(0)
      })
      it("empty time", () => {
        const src = "src"
        const time = ""
        const targetDom = base.createSrcAndTimeDom(winWidth, 0, 0, 0, src, time)
        expect(targetDom.nodeName).toBe("DIV")
        const children = targetDom.children
        expect(children).toHaveLength(0)
      })
    })
    it("truthy arguments", () => {
      const src = "src"
      const time = "12-29"
      const top = 10
      const left = 10
      const height = 20

      const targetDom = base.createSrcAndTimeDom(
        winWidth,
        top,
        left,
        height,
        src,
        time
      )
      expect(targetDom.nodeName).toBe("DIV")
      const children = targetDom.children
      expect(children).toHaveLength(2)

      expect(targetDom.style.top).toBe(`${top}px`)
      expect(targetDom.style.height).toBe(`${height}px`)
      expect(targetDom.style["margin-top"]).toBe(`${top}px`)
    })
  })
})
