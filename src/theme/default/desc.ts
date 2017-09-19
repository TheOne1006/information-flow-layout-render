import "core-js/fn/object/assign"

const smFontSize = 12
/**
 * baseLine 样式
 */
const defaultDescConfig = {
  // top: 0, from custom
  // left: 0, from custom
  width: "",
  height: 20,
  display: "inline-block",
  position: "",
  "background-color": "#fff",
  overflow: "hidden",
  "text-decoration": "none",
  "font-size": smFontSize,
  color: "#999",
  "font-family": "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  "line-height": 20,
  // "white-space": "nowrap",
  "text-overflow": "ellipsis",
  "o-text-overflow": "ellipsis",
  padding: "",
  // margin: "0px 0px ${spacingMd}px 0px", // from custom
  border: ""
}

function configDescCreate(winWidth: number, customStyles: any) {
  return Object.assign(
    {},
    defaultDescConfig,
    {
      "max-width": winWidth - 80 + "px"
    },
    customStyles
  )
}

const defaultWrapConfig = {
  display: "block",
  position: "relative",
  left: 0,
  top: 0,
  height: "auto",
  "line-height": "100%",
  "text-align": "left"
}

function configDescWrapCreate(winWidth: number, customStyles?: any) {
  return Object.assign({}, defaultWrapConfig, customStyles)
}

export default {
  configDescCreate,
  configDescWrapCreate
}
