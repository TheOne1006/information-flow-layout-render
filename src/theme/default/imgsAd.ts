import "core-js/fn/object/assign"

const spacingMd = 10
const spacingLg = 16
const spacingSm = 5
const baseFontSize = 14

/**
 * 广告标注 样式
 */
const defaultAdMaskConfig = {
  bottom: spacingLg,
  right: spacingLg,
  height: baseFontSize,
  display: "block",
  position: "absolute",
  color: "#fff",
  overflow: "hidden",
  "text-decoration": "none",
  "font-size": baseFontSize,
  "line-height": baseFontSize
}

export const configAdMaskCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign({}, defaultAdMaskConfig, {}, customStyles)
}

export default {
  configAdMaskCreate
}
