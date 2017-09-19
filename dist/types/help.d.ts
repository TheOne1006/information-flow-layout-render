/**
 * 验证是否为有效 url
 * @param  {string} url
 * @return {Boolean} 是否有效
 */
export declare const isValidURL: (url?: string) => boolean;
/**
 * 补全 url
 * @param  {string} url
 * @return {string} 有效的url
 */
export declare const completeURL: (url?: string, protocol?: string) => string;
export declare const getEleHeight: (dom: any) => any;
export declare const getEleWidth: (dom: any) => any;
export declare const getScrollTop: (dom: any) => any;
declare const _default: {
    isValidURL: (url?: string) => boolean;
    completeURL: (url?: string, protocol?: string) => string;
    getEleHeight: (dom: any) => any;
    getEleWidth: (dom: any) => any;
    getScrollTop: (dom: any) => any;
};
export default _default;
