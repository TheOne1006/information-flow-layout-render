import "core-js/fn/object/assign"

const spacingMd = 10
const baseFontSize = 18

/**
 * wrap 样式
 */
const defaultWrapConfig = {
  top: 0,
  left: 0,
  height: "auto",
  display: "block",
  position: "",
  "background-color": "#fff",
  overflow: "hidden",
  "text-decoration": "none"
}

export const configWrapCreate = (winWidth: number, customStyles?: any) => {
  return Object.assign({}, defaultWrapConfig, { width: winWidth }, customStyles)
}

/**
 * title 样式
 */
const defaultTitleContainerConfig = {
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
  "line-height": "auto",
  overflow: "hidden",
  // "white-space": "nowrap",
  "text-overflow": "ellipsis",
  "o-text-overflow": "ellipsis",
  "text-decoration": "none",
  padding: "",
  margin: `${spacingMd}px 0px 0px ${spacingMd}px`,
  border: ""
}

export const configTitleContainerCreate = (
  winWidth: number,
  customStyles?: any
) => {
  return Object.assign(
    {},
    defaultTitleContainerConfig,
    {
      width: winWidth - 2 * spacingMd
    },
    customStyles
  )
}

/**
 * img container 样式
 */
const defaultImgContainerConfig = {
  top: 0,
  left: spacingMd,
  // width: customHeight,
  // height: customHeight * 1 / 2.3,
  display: "block",
  position: "",
  "background-size": "cover",
  overflow: "hidden",
  border: "",
  margin: `${spacingMd / 2}px 0px 0px ${spacingMd}px`,
  padding: ""
}

export const configImgContainerCreate = (
  winWidth: number,
  customStyles?: any
) => {
  const width = winWidth - 2 * spacingMd
  return Object.assign(
    {},
    defaultImgContainerConfig,
    {
      width,
      height: width * 1 / 2.3
    },
    customStyles
  )
}

export default {
  configWrapCreate,
  configTitleContainerCreate,
  configImgContainerCreate
}
