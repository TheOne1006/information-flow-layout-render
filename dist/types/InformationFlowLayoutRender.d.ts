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
    sxinitemid?: any;
}
export interface IwatchOption {
    scroll?: boolean;
    dom?: HTMLElement | string;
    onEndReachedThreshold?: number;
}
export interface IstatisticOption {
    sxinid?: number | string;
    delay?: number;
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
    statisticOption?: IstatisticOption;
    constructor(loadOptions: IconstructorOption);
    init(dom: string | HTMLElement, watchOption: IwatchOption | undefined, statisticOption: IstatisticOption): void;
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
    addStatisticsScript(sxinid?: number | string, sxinitemid?: number | string): void;
}
