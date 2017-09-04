/**
 * 视频播放部分
 */
import BaseSection from "./baseSection";
import { IadItemModel } from "./interfaces";
declare class VideoSection extends BaseSection {
    createWrapper(winWidth: number): any;
    createTitle(winWidth: number, title: string): any;
    createContent(winWidth: number, source: string, poster: string): any;
    createRemark(winWidth: number, type: number, desc?: string, src?: string, time?: string): any;
    render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel): void;
}
export default VideoSection;
