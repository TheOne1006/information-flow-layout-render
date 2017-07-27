import "core-js/fn/object/assign"

const smFontSize = 12
/**
 * baseLine 样式
 */
const defaultConfig = {
  // top: 0, from custom
  // left: 0, from custom
  width: "",
  height: 12,
  display: "inline-block",
  position: "",
  "background-color":  "#fff",
  overflow: "hidden",
  "text-decoration": "none",
  "font-size": smFontSize,
  color: "#999",
  "font-family":  "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  "line-height": 12,
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  "o-text-overflow": "ellipsis",
  padding: "",
  // margin: "0px 0px ${spacingMd}px 0px", // from custom
  border: ""
}

function configCreate (winWidth: number, customStyles: any)  {
  return Object.assign({},
    defaultConfig,
    customStyles
  )
}
export default configCreate
