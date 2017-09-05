/**
 * 大图渲染
 */
import BaseSection from "./baseSection";
declare class LayoutSections extends BaseSection {
    createHeader(winWidth: number, title?: string): any;
    createFooter(winWidth: number): any;
    createrContainer(): any;
}
export default LayoutSections;
