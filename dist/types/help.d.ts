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
declare const _default: {
    isValidURL: (url?: string) => boolean;
    completeURL: (url?: string, protocol?: string) => string;
};
export default _default;
