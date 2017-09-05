import {} from "jest"
import LayoutSections from "../../src/sections/layoutSections"

describe("class LayoutSections for create Layout Dom", () => {
  let layout
  let winWidth
  beforeEach(() => {
    winWidth = (document.body && document.body.clientWidth) || window.innerWidth
    layout = new LayoutSections()
  })

  it("layout is instantiable", () => {
    expect(layout).toBeInstanceOf(LayoutSections)
  })

  it("LayoutSections Fun createHeader to create a dom", () => {
    const targetDom = layout.createHeader()
    expect(targetDom.nodeName).toBe("DIV")
    const children = targetDom.children
    expect(children).toHaveLength(1)
    expect(children[0].innerText).toBe("猜你喜欢")
  })

  it("LayoutSections Fun createFooter to create a dom", () => {
    const targetDom = layout.createFooter()
    expect(targetDom.nodeName).toBe("DIV")
  })

  it("LayoutSections Fun createrContainer to create a dom", () => {
    const targetDom = layout.createrContainer()
    expect(targetDom.nodeName).toBe("DIV")
  })
})
