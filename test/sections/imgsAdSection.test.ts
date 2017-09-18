import {} from "jest"
import ImgsAdSection from "../../src/sections/imgsAdSection"

import { remarkType } from "../../src/constants"

describe("class ImgsAdSection", () => {
  let section
  let winWidth
  let fragment
  beforeEach(() => {
    winWidth = (document.body && document.body.clientWidth) || window.innerWidth
    section = new ImgsAdSection()
    fragment = document.createDocumentFragment()

    const div = document.createElement("div")
    section.createSrcAndTimeDom = jest.fn().mockReturnValue(div)
    section.createDescDom = jest.fn().mockReturnValue(div)
  })

  it("section is instantiable", () => {
    expect(section).toBeInstanceOf(ImgsAdSection)
  })

  describe("ImgsAdSection Fun createAdImgs to create dom with img", () => {
    it("return a DIV Dom with arguments", () => {
      const images = ["/demo.png", "/demo.png", "/demo.png"]
      const target = section.createAdImgs(winWidth, images)

      expect(target.nodeName).toBe("SPAN")
      const childrens = target.children
      expect(childrens).toHaveLength(3)
    })
  })

  describe("ImgsAdSection Fun render", () => {
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
        time: "",
        monitorUrl: ["/demo.png"],
        reqUrls: ["/demo.png"]
      }
    })

    it("render into fragment with truthy arguments", () => {
      section.render(fragment, winWidth, adItem)
      const childrens = fragment.children
      const wrapDom = childrens[0]
      expect(wrapDom.nodeName).toBe("A")
      const others = wrapDom.children
      expect(others).toHaveLength(6)
      const exposureDom = childrens[1]
      expect(exposureDom.nodeName).toBe("SPAN")
      expect(exposureDom.children).toHaveLength(2)
    })
  })
})
