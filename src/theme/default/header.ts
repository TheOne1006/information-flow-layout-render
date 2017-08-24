import "core-js/fn/object/assign"

const smFontSize = 12
const spacingLg = 15

/**
 * wrap 样式
 */
const defaultWrapConfig = {
  top: 0,
  left: 0,
  height: spacingLg,
  "line-height": spacingLg,
  "font-size": smFontSize,
  display: "block",
  position: "relative",
  "background-color": "#fff",
  margin: "15px 0px 0px 10px",
  overflow: "hidden"
}

export const configWrapCreate = (winWidth?: number, customStyles?: any) => {
  return Object.assign({}, defaultWrapConfig, customStyles)
}

const defaultTitleConfig = {
  top: 0,
  left: 0,
  height: spacingLg,
  "line-height": spacingLg,
  "font-size": smFontSize,
  display: "block",
  position: "relative",
  "background-color": "#fff",
  color: "#888",
  overflow: "hidden",
  "text-align": "left"
}

export const configTitleCreate = (winWidth?: number, customStyles?: any) => {
  return Object.assign({}, defaultTitleConfig, customStyles)
}

export default {
  configWrapCreate,
  configTitleCreate
}
