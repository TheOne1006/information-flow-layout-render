import "core-js/fn/object/assign"

const spacingMd = 10
const spacingSm = 5
const baseFontSize = 18
const baseLineHeight = 20

/**
 * wrap 样式
 */
const defaultWrapConfig = {
  top: 0,
  left: 0,
  // width: winWidth,
  height: "auto",
  display: "block",
  position: "",
  "background-color": "#fff",
  overflow: "hidden",
  "text-decoration": "none"
}

export const configWrapCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign(
    {},
    defaultWrapConfig,
    {
      width: winWidth
    },
    customStyles
  )
}

/**
 * title 样式
 */
const defaultTitleConfig = {
  top: 0,
  left: spacingMd,
  height: "auto",
  display: "block",
  position: "",
  "font-size": baseFontSize,
  color: "#000",
  "font-family": "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  "line-height": baseLineHeight,
  overflow: "hidden",
  // "white-space": "nowrap",
  "-webkit-line-clamp": "2",
  "text-overflow": "ellipsis",
  "o-text-overflow": "ellipsis",
  "text-decoration": "none",
  padding: "",
  margin: `${spacingSm * 3}px ${spacingMd}px 0px`,
  border: ""
}

export const configTitleCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign(
    {},
    defaultTitleConfig,
    {
      width: winWidth - 2 * spacingMd
    },
    customStyles
  )
}

const defaultImgsWrapConfig = {
  position: "relative",
  top: 0,
  left: 0,
  width: "100%",
  height: "auto",
  display: "block",
  padding: "none",
  margin: "none",
  border: "none",
  overflow: "hidden"
}

export const configImgsWrapCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign({}, defaultImgsWrapConfig, {}, customStyles)
}

/**
 * imgItem 样式
 */
const defaultImgItemConfig = {
  top: spacingSm,
  left: spacingMd,
  // width: width, (winWidth - 6) / 3
  // height: "auto", m * 66 / 98;
  display: "inline-block",
  position: "",
  padding: "",
  margin: `${spacingSm}px 0px ${spacingMd}px ${spacingMd}px`,
  border: ""
}

export const configImgItemCreate = (
  winWidth: number,
  customStyles?: any,
  itemLen: number = 3
) => {
  const wrapWidth = winWidth - 2 * spacingMd
  const width = (wrapWidth - itemLen * 2) / itemLen

  return Object.assign(
    {},
    defaultImgItemConfig,
    {
      width: width,
      height: width * 66 / 98
    },
    customStyles
  )
}

export default {
  configWrapCreate,
  configTitleCreate,
  configImgItemCreate,
  configImgsWrapCreate
}
