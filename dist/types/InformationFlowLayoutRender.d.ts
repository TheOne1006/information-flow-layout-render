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
    constructor();
    render(dom: string | HTMLElement, data: object[]): void;
    buildDom(nodeName: string, attrs?: any, createStyles?: Function): any;
    renderBigImgItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgTextItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    renderImgsItem(container: DocumentFragment, adItem: IadItemModel): DocumentFragment | undefined;
    createLineDom(top: number, position: string): any;
    createDescDom(desc: string, top?: number, left?: number): HTMLDivElement;
    createSrcAndTimeDom(src: string, time: string, top: number, left: number, height: number): HTMLDivElement;
}
