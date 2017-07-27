import "core-js/fn/object/assign"

const itemFontSize = 13
const itemFontColor = "#999"

const defaultWrapConfig = {
  // top: "", // from customStyles
  // left: "", // from customStyles
  // width: "", // from customStyles
  // height: "", // from customStyles
  display: "block",
  position: "",
  "line-height": "100%",
  "text-align": "left",
}


function configWrapCreate (winWidth: number, customStyles: any)  {
  return Object.assign({},
    defaultWrapConfig,
    customStyles
  )
}

const defaultItemConfig = {
  top: 0,
  left: 0,
  width: "",
  height: "",
  display: "inline-block",
  position: "",
  "font-size": itemFontSize,
  color: itemFontColor,
  "font-family":  "Arial, Helvetica, sans-serif",
  "text-align": "left",
  // "background-colror": "#",
  // "line-height": 12, // from customStyles
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  "o-text-overflow": "ellipsis",
  "margin-right": "8px",
}

function configItemCreate (winWidth: number, customStyles: any)  {
  return Object.assign({},
    defaultItemConfig,
    customStyles
  )
}

export default {
  configWrapCreate,
  configItemCreate,
}
