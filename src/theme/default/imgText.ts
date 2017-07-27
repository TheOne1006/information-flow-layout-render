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
  // height: (winWidth * 100 / 320) * 33 / 50 + 10 + 5,
  display: "block",
  position: "",
  "background-color":  "#fff",
  overflow: "hidden",
  "text-decoration": "none",
}

export const configWrapCreate = (winWidth: number, customStyles?: any ) => {
  return Object.assign({},
    defaultWrapConfig,
    {
      width: winWidth,
      height: (winWidth * 100 / 320) * 33 / 50 + spacingMd + spacingSm * 4,
    },
    customStyles
  )
}

/**
 * img 样式
 */
const defulatImgConfig = {
  top: spacingSm * 3,
  left:  spacingMd,
  // width: 100 * winWidth / 320,
  // height: width * 33 / 50,
  display: "inline-block",
  position: "",
  border: "",
  margin: `${spacingSm*3}px 0px 0px ${spacingMd}px`,
  padding: "",
  "vertical-align": "top",
}

export const configImgCreate = (winWidth: number, customStyles?: any ) => {
  const width = 100 * winWidth / 320
  return Object.assign({},
    defulatImgConfig,
    {
      width,
      height: width * 33 / 50,
    },
    customStyles
  )
}

/**
 * rightContent 样式
 */
const defaultRightContentConfig = {
  top: spacingSm * 3,
  // left: 100 * winWidth / 320 + spacingMd * 2,
  // width: winWidth - 3 * 10 - (100 * winWidth / 320),
  // height: (100 * winWidth / 320) * 33 / 50,
  display: "inline-block",
  position: "",
  border: "",
  margin: `${spacingSm*3}px 0px 0px ${spacingMd}px`,
  padding: "",
  "line-height": "100%",
  "vertical-align": "top",
}

export const configRightCreate = (winWidth: number, customStyles?: any ) => {
  const leftWidth = 100 * winWidth / 320
  return Object.assign({},
    defaultRightContentConfig,
    {
      left: leftWidth + spacingMd * 2,
      width: winWidth - 3 * spacingMd - leftWidth,
      height: leftWidth * 33 / 50,
    },
    customStyles
  )
}


/**
 * title wrap 样式
 */
const defaultTitleWrapConfig = {
  top: spacingSm * 3 + 3,
  // left: 100 * winWidth / 320 + spacingMd * 2,
  // width: winWidth - 3 * 10 - (100 * winWidth / 320),
  height: 40,
  display: "inline-block",
  position: "",
  "font-size": baseFontSize,
  color: "#000",
  "font-family":  "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  "line-height": baseLineHeight,
}

export const configTitleWrapCreate = (winWidth: number, customStyles?: any ) => {
  const leftWidth = 100 * winWidth / 320
  return Object.assign({},
    defaultTitleWrapConfig,
    {
      left: leftWidth + spacingMd * 2,
      width: winWidth - 3 * spacingMd - leftWidth,
    },
    customStyles
  )
}

/**
 * title 样式
 */
const defaultTitleConfig = {
  top: "",
  left: "",
  // width: winWidth - 3 * 10 - (100 * winWidth / 320),
  height: "",
  display: "inline-block",
  position: "",
  "font-size": baseFontSize,
  color: "#000",
  "font-family":  "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  "line-height": 20,
  "white-space": "normal",
  "vertical-align": "middle",
}

export const configTitleCreate = (winWidth: number, customStyles?: any ) => {
  const leftWidth = 100 * winWidth / 320
  return Object.assign({},
    defaultTitleWrapConfig,
    {
      width: winWidth - 3 * spacingMd - leftWidth,
    },
    customStyles
  )
}


export default {
  configWrapCreate,
  configImgCreate,
  configRightCreate,
  configTitleWrapCreate,
  configTitleCreate,
}
