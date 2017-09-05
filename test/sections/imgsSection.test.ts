import {} from "jest"
import ImgsSection from "../../src/sections/imgsSection"

import { remarkType } from "../../src/constants"

describe("class ImgsSection", () => {
  let section
  let winWidth
  let fragment
  beforeEach(() => {
    winWidth = (document.body && document.body.clientWidth) || window.innerWidth
    section = new ImgsSection()
    fragment = document.createDocumentFragment()

    const div = document.createElement("div")
    section.createSrcAndTimeDom = jest.fn().mockReturnValue(div)
    section.createDescDom = jest.fn().mockReturnValue(div)
  })

  it("section is instantiable", () => {
    expect(section).toBeInstanceOf(ImgsSection)
  })

  describe("ImgsSection Fun createWrapper to create element a", () => {
    it("use default", () => {
      const target = section.createWrapper(winWidth)
      expect(target.nodeName).toBe("A")
      expect(target.href).toBe("javascript:;")
      expect(target.target).toBe("_target")
      expect(target.title).toBe("")
    })

    it("use arguments", () => {
      const href = "http://www.theone.io/"
      const attrTarget = "_self"
      const title = "title"
      const target = section.createWrapper(winWidth, href, attrTarget, title)
      expect(target.nodeName).toBe("A")
      expect(target.href).toBe(href)
      expect(target.target).toBe(attrTarget)
      expect(target.title).toBe(title)
    })
  })

  describe("ImgsSection Fun createTitle to create element span", () => {
    it("return a DIV Dom with arguments", () => {
      const title = "title"
      const targetDom = section.createTitle(winWidth, title)
      expect(targetDom.innerText).toBe(title)
    })
  })

  describe("ImgsSection Fun createContent to create array", () => {
    it("return a DIV Dom with arguments", () => {
      const images = ["/demo.png", "/demo.png", "/demo.png"]
      const result = section.createContent(winWidth, images)

      expect(result).toHaveLength(3)
    })
  })

  describe("ImgsSection Fun createRemark", () => {
    it("if type is SHOW_DESC then done this.createDescDom", () => {
      section.createRemark(winWidth, remarkType.SHOW_DESC)

      expect(section.createSrcAndTimeDom.mock.calls).toHaveLength(0)
      expect(section.createDescDom.mock.calls).toHaveLength(1)
    })
    it("if type is SHOW_SRC_TIME then done this.createSrcAndTimeDom", () => {
      section.createRemark(winWidth, remarkType.SHOW_SRC_TIME)

      expect(section.createSrcAndTimeDom.mock.calls).toHaveLength(1)
      expect(section.createDescDom.mock.calls).toHaveLength(0)
    })
  })

  describe("ImgsSection Fun render", () => {
    let fragment
    let adItem
    beforeEach(() => {
      fragment = document.createDocumentFragment()
      adItem = {
        title: "title",
        curl: "https://www.baidu.com",
        images: ["/demo.png", "/demo.png", "/demo.png"],
        type: remarkType.SHOW_DESC,
        src: "baidu",
        desc: "desc",
        time: ""
      }
    })

    it("render into fragment with truthy arguments", () => {
      section.render(fragment, winWidth, adItem)
      const childrens = fragment.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(6)
    })

    it("render return undefined with error arguments", () => {
      adItem.imageUrl = ""
      const result = section.render(fragment, winWidth, adItem)
      expect(result).toBeUndefined()
    })
  })
})
