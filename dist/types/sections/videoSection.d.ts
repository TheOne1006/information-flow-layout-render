import { IadItemModel } from "../interfaces";
import BaseSection from "./baseSection";
declare class VideoSection extends BaseSection {
    createWrapper(winWidth: number): any;
    createTitle(winWidth: number, title: string): any;
    createContent(winWidth: number, source: string, poster: string): any;
    createRemark(winWidth: number, type: number, desc?: string, src?: string, time?: string): any;
    render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel): void;
}
export default VideoSection;
