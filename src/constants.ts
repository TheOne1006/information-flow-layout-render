/**
 * 常量配置
 */

export const layoutType = {
  BIG_IMG: 0, // 全文大图
  IMG_TEXT: 1, // 左侧1张图, 右侧内容
  IMGS: 2, // 多图模式
  VIDEO: 3, // 视频模式
  IMG_TEXT_AD: 4 // 三图广告, 增加曝光数据
}

export const remarkType = {
  SHOW_DESC: 0,
  SHOW_SRC_TIME: 1
}

export default {
  layoutType,
  remarkType
}
