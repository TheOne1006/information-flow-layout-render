export interface IbaseStyle {
    display?: string;
    position?: string;
    top?: number;
    left?: number;
    width?: number;
    height?: number | string;
    overflow?: string;
    "text-decoration"?: string;
    "font-size"?: string | number;
    "font-family"?: string;
    color?: string;
    "text-align"?: string;
    "background-color"?: string;
    "line-height"?: string;
    "white-space"?: string;
    "text-overflow"?: string;
    "o-text-overflow"?: string;
    padding?: string;
    margin?: string;
    border?: string;
}
export default class StyleCtrl {
    static pxStyles: {
        width: number;
        height: number;
        "line-height": number;
        "padding-left": number;
        "padding-right": number;
        "padding-top": number;
        "padding-bottom": number;
        "border-width": number;
        "font-size": number;
        "margin-left": number;
        "margin-right": number;
        "margin-top": number;
        "margin-bottom": number;
        "border-left-width": number;
        "border-right-width": number;
        "border-top-width": number;
        "border-bottom-width": number;
        top: number;
        left: number;
        bottom: number;
        right: number;
    };
    /**
     * 组装成单行的 style 内联字符串
     * @param  {object} styleObject 样式对象
     * @return {string}
     */
    protected genStyle: (styleObject?: any) => string;
    /**
     * 追加元素的样式设置
     * @param {object} container    dom 元素
     * @param {object} stylesObject styles 对象
     */
    appendStyle: (container: HTMLElement, stylesObject?: object | undefined) => void;
}
