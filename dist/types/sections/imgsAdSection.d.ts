import ImgsSection from "./ImgsSection";
import { IadItemModel } from "../interfaces";
declare class ImgsAdSection extends ImgsSection {
    /**
     * 创建广告统计的 img
     * @param  {number} winWidth
     * @param  {array} title
     * @return {[type]}          [description]
     */
    createAdImgs(winWidth: number, urls: string[]): any;
    render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel, redirectUrl?: string, touchCallback?: Function): void;
}
export default ImgsAdSection;
