import "core-js/fn/object/assign"
/**
 * baseLine 样式
 */
const defaultConfig = {
  "line-height": 0,
  "background-color": "#eee",
  padding: "",
  margin: "8px 0px 0px 10px",
  border: "",
  left: 10,
  height: 1,
  top: 0,
  position: "",
  display: "block",
}

function configCreate (winWidth: number, customStyles: any)  {
  return Object.assign({},
    defaultConfig,
    { width: winWidth - 20 },
    customStyles
  )
}
export default configCreate
