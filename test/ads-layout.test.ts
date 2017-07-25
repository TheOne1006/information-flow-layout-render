import AdsLayout from "../src/ads-layout"
import {} from "jest"

describe("ads-layout test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("AdsLayout is instantiable", () => {
    expect(new AdsLayout()).toBeInstanceOf(AdsLayout)
  })
})
