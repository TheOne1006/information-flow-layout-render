import { IadItemModel } from "./interfaces";
import { IconstructorOption as IStatisticOptions } from "./statisticController";
import { IconstructorOption as ILoadOptions } from "./loadController";
export interface IwatchOption {
    scroll?: boolean;
    click?: boolean;
    dom?: HTMLElement | string;
    onEndReachedThreshold?: number;
}
export default class InformationFlowLayoutRender {
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
    render(data: object[]): void;
    watchScroll(dom: string | HTMLElement | undefined, onEndReachedThreshold: number | undefined, loadFun: Function): void;
    watchLoadMoreBtn(loadFun: Function): void;
    renderBigImgItem(container: DocumentFragment, adItem: IadItemModel): void;
    renderImgTextItem(container: DocumentFragment, adItem: IadItemModel): void;
    renderImgsItem(container: DocumentFragment, adItem: IadItemModel): void;
    footer(isEnd?: boolean, isLoading?: boolean): HTMLElement;
}
