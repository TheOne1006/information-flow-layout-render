/**
 * 用于处理数据统计
 */
export interface IconstructorOption {
    sxinid?: number | string;
    delay?: number;
    url?: string;
    firstRenderUrl?: string;
    createRedirectUrl?: Function;
}
export default class StatisticCtrl {
    sxinid?: string | number;
    delay?: number;
    url: string;
    firstRenderUrl?: string;
    createRedirectUrl?: Function;
    /**
     * 初始化成功 即需要 开启统计
     */
    constructor(option?: IconstructorOption);
    scriptWay(src: string): void;
    /**
     * 物料点击
     * @param  {string} sxinitemid 物料 id
     */
    materielClick(sxinitemid?: string | number): void;
    firstRender(): void;
}
