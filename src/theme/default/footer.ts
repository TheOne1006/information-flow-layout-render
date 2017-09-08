import "core-js/fn/object/assign"

const smFontSize = 18
const spacingLg = 30

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
  position: "",
  "background-color": "#eee",
  color: "#888",
  overflow: "hidden",
  "text-align": "center"
}

export const configWrapCreate = (winWidth?: number, customStyles?: any) => {
  return Object.assign({}, defaultWrapConfig, customStyles)
}

export default {
  configWrapCreate
}
