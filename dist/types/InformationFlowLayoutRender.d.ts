import { IconstructorOption } from "./loadController";
export interface IadItemModel {
    stype: number;
    title: string;
    curl: string;
    target?: string;
    imageUrl?: string;
    images?: string[];
    desc?: string;
    src?: string;
    time?: string;
    type?: any;
}
export interface IwatchOption {
    scroll?: boolean;
    dom?: HTMLElement | string;
    onEndReachedThreshold?: number;
}
export default class InformationFlowLayoutRender {
    static layoutType: {
        BIG_IMG: number;
        IMG_TEXT: number;
        IMGS: number;
    };
    static remarkType: {
        SHOW_DESC: number;
        SHOW_SRC_TIME: number;
    };
    winWidth: number;
    loadObj: any;
    footerDom: HTMLElement;
    headerDom: HTMLElement;
    constructor(loadOptions: IconstructorOption);
    init(dom: string | HTMLElement, option?: IwatchOption): void;
    render(dom: string | HTMLElement, data: object[], isEnd: boolean): void;
    watchScroll(dom: string | HTMLElement | undefined, onEndReachedThreshold: number | undefined, loadFun: Function): void;
    buildDom(nodeName: string, attrs?: any, createStyles?: Function): any;
    renderBigImgItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgTextItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgsItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    createLineDom(top: number, position: string): any;
    createDescDom(desc: string, top?: number, left?: number): HTMLDivElement;
    createSrcAndTimeDom(src: string, time: string, top: number, left: number, height: number): HTMLDivElement;
    createHeader(): HTMLElement;
    createFooter(isEnd: boolean): HTMLElement;
}
