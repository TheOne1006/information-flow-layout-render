import {} from "jest"
import ImgTextSection from "../../src/sections/imgTextSection"

import { remarkType } from "../../src/constants"

describe("class ImgTextSection", () => {
  let section
  let winWidth
  let fragment
  beforeEach(() => {
    winWidth = (document.body && document.body.clientWidth) || window.innerWidth
    section = new ImgTextSection()
    fragment = document.createDocumentFragment()

    const div = document.createElement("div")
    section.createSrcAndTimeDom = jest.fn().mockReturnValue(div)
    section.createDescDom = jest.fn().mockReturnValue(div)
  })

  it("section is instantiable", () => {
    expect(section).toBeInstanceOf(ImgTextSection)
  })

  describe("ImgTextSection Fun createWrapper to create element a", () => {
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

  describe("ImgTextSection Fun createTitle to create element span", () => {
    it("return a DIV Dom with arguments", () => {
      const title = "title"
      const targetDom = section.createTitle(winWidth, title)
      const firstChildren = targetDom.children[0]
      expect(firstChildren.innerText).toBe(title)
    })
  })

  describe("ImgTextSection Fun createImgContent to create a dom", () => {
    it("return a DIV Dom with arguments", () => {
      const imageUrl = "/demo.png"
      const targetDom = section.createImgContent(winWidth, imageUrl)

      expect(targetDom.style.background).toBe(
        `url(${imageUrl}) no-repeat center`
      )
    })
  })

  describe("ImgTextSection Fun createTextContent to create a dom", () => {
    it("return a DIV", () => {
      const targetDom = section.createImgContent(winWidth)

      expect(targetDom.nodeName).toBe("DIV")
    })
  })

  describe("ImgTextSection Fun createRemark", () => {
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

  describe("ImgTextSection Fun render", () => {
    let fragment
    let adItem
    beforeEach(() => {
      fragment = document.createDocumentFragment()
      adItem = {
        title: "title",
        curl: "https://www.baidu.com",
        imageUrl: "/demo.png",
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
      expect(others).toHaveLength(3)
    })

    it("render return undefined with error arguments", () => {
      adItem.imageUrl = ""
      const result = section.render(fragment, winWidth, adItem)
      expect(result).toBeUndefined()
    })
  })
})
