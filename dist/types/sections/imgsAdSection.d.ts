import ImgsSection from "./ImgsSection";
import { IadItemModel } from "../interfaces";
declare class ImgsAdSection extends ImgsSection {
    createContent(winWidth: number, images: string[]): any;
    /**
     * 创建广告统计的 img
     * @param  {number} winWidth
     * @param  {array} title
     * @return {[type]}          [description]
     */
    createExposureImgs(winWidth: number, urls: string[]): any;
    render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel, redirectUrl?: string, touchCallback?: Function): void;
}
export default ImgsAdSection;
