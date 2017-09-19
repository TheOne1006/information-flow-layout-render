import "core-js/fn/object/assign"

const spacingMd = 10
const spacingLg = 16
const spacingSm = 5
const baseFontSize = 12

/**
 * 广告标注 样式
 */
const defaultAdMaskConfig = {
  right: 15,
  top: 0,
  // height: baseFontSize,
  display: "block",
  position: "absolute",
  color: "#999",
  overflow: "hidden",
  "text-decoration": "none",
  "font-size": baseFontSize,
  "line-height": 20,
  height: 20
}

export const configAdMaskCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign({}, defaultAdMaskConfig, {}, customStyles)
}

export default {
  configAdMaskCreate
}
