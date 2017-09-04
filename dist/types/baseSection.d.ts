export declare class BaseSection {
    /**
     * FIXME: 使用 chache 缓存, 增加渲染速度
     * 构建dom 元素, 以及设置 属性, 以及构建其内联样式
     * @param  {string}   nodeName     标签名
     * @param  {object}   attrs  目标标签属性
     * @param  {Function} createStyles 构建样式的方法, 返回值为 Object
     * @return {HTMLElement} 构建完成的 dom 对象
     */
    buildDom(nodeName: string, attrs?: any, createStyles?: Function): any;
    /**
     * 创建 desc 的 dom
     * @param  {number}   winWidth window 宽度
     * @param  {number}   top  top属性
     * @param  {number}   left left 属性
     * @param  {string}   desc 描述信息
     * @return {HTMLElement}
     */
    createDescDom(winWidth: number, top?: number, left?: number, desc?: string): any;
    /**
     * 创建 src 和 time 的相关 dom
     * @param  {number} winWidth window 的 宽度
     * @param  {string} src      来源
     * @param  {string} time     时间
     * @param  {number} top      top 属性
     * @param  {number} left     left 属性
     * @param  {number} height   dom 高度
     * @return {HTMLElement}
     */
    createSrcAndTimeDom(winWidth: number, top: number, left: number, height: number, src?: string, time?: string): HTMLDivElement;
    /**
     * 创建分割线
     * @param  {number} winWidth window width
     * @param  {number} top      top 属性
     * @param  {string} position position 属性
     * @return {HTMLElement}
     */
    createLineDom(winWidth: number, top: number, position?: string): any;
}
export default BaseSection;
