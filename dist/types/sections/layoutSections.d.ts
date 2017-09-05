/**
 * layout 布局渲染
 */
import BaseSection from "./baseSection";
declare class LayoutSections extends BaseSection {
    /**
     * 页头
     * @param  {number}    winWidth 页面宽度
     * @param  {string}    title 标题文字
     * @return {HTMLElement}
     */
    createHeader(winWidth: number, title?: string): any;
    /**
     * 底部 Dom
     * @param  {number} winWidth 页面宽度
     * @return {HTMLElement}
     */
    createFooter(winWidth: number): any;
    /**
     * 容器 Dom
     * @return {HTMLElement}
     */
    createrContainer(): any;
}
export default LayoutSections;
