import "core-js/fn/object/assign"

const mdFontSize = 16
const spacingLg = 30

/**
 * wrap 样式
 */
const defaultWrapConfig = {
  top: 0,
  left: 0,
  height: spacingLg,
  "line-height": spacingLg,
  display: "block",
  position: "relative",
  "background-color": "#fff",
  margin: "15px 0px 0px 10px",
  overflow: "visible",
  "z-index": "-1",
  "border-bottom": "2px solid #dddddd"
}

export const configWrapCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign(
    {},
    defaultWrapConfig,
    { width: winWidth - 15 },
    customStyles
  )
}

const defaultTitleConfig = {
  top: 0,
  left: 0,
  height: spacingLg,
  width: 70,
  "line-height": spacingLg,
  "font-size": mdFontSize,
  // display: "block",
  position: "relative",
  // "background-color": "#fff",
  color: "#888",
  overflow: "hidden",
  "text-align": "left",
  "border-bottom": "2px solid #4280db"
}

export const configTitleCreate = (winWidth?: number, customStyles?: any) => {
  return Object.assign({}, defaultTitleConfig, customStyles)
}

export default {
  configWrapCreate,
  configTitleCreate
}
