import { IadItemModel } from "../interfaces";
import BaseSection from "./baseSection";
declare class ImgTextSection extends BaseSection {
    createWrapper(winWidth: number, href?: string, target?: string, title?: string, touchCallback?: Function): any;
    createTitle(winWidth: number, title: string): any;
    createImgContent(winWidth: number, imageUrl: string): any;
    createTextContent(winWidth: number): any;
    createRemark(winWidth: number, type: number, desc?: string, src?: string, time?: string): any;
    render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel, redirectUrl?: string, touchCallback?: Function): void;
}
export default ImgTextSection;
