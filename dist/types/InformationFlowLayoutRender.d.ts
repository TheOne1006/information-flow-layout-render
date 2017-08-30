import { IconstructorOption as ILoadOptions } from "./loadController";
import { IconstructorOption as IStatisticOptions } from "./statisticController";
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
    statisticObj: any;
    footerDom: HTMLElement;
    headerDom: HTMLElement;
    containerDom: HTMLElement;
    constructor(loadOptions: ILoadOptions);
    init(dom: string | HTMLElement, watchOption: IwatchOption | undefined, statisticOption: IStatisticOptions, lazyLoad?: boolean): void;
    /**
     * 首次渲染
     * @param  {HTMLElement}     layout 容器对象
     * @param  {IwatchOption =      {}} watchOption 监听选项
     */
    initRender(layout: HTMLElement, watchOption?: IwatchOption): void;
    render(data: object[], isEnd: boolean): void;
    watchScroll(dom: string | HTMLElement | undefined, onEndReachedThreshold: number | undefined, loadFun: Function): void;
    buildDom(nodeName: string, attrs?: any, createStyles?: Function): any;
    renderBigImgItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgTextItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgsItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    createLineDom(top: number, position: string): any;
    createDescDom(desc: string, top?: number, left?: number): HTMLDivElement;
    createSrcAndTimeDom(src: string, time: string, top: number, left: number, height: number): HTMLDivElement;
    createContainer(): HTMLElement;
    createHeader(): HTMLElement;
    createFooter(isEnd: boolean): HTMLElement;
}
