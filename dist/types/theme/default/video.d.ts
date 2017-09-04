import "core-js/fn/object/assign";
export declare const configWrapCreate: (winWidth: number, customStyles?: any) => any;
export declare const configTitleContainerCreate: (winWidth: number, customStyles?: any) => any;
export declare const configContainerCreate: (winWidth: number, customStyles?: any) => any;
export declare const defaultVideoScreenConfig: {
    top: number;
    left: number;
    width: string;
    display: string;
    position: string;
    overflow: string;
    border: string;
    margin: string;
    padding: string;
};
export declare const configVideoScreenCreate: (winWidth?: number | undefined, customStyles?: any) => any;
export declare const configPlayBtnCreate: (winWidth?: number | undefined, customStyles?: any) => any;
declare const _default: {
    configWrapCreate: (winWidth: number, customStyles?: any) => any;
    configTitleContainerCreate: (winWidth: number, customStyles?: any) => any;
    configContainerCreate: (winWidth: number, customStyles?: any) => any;
    configVideoScreenCreate: (winWidth?: number | undefined, customStyles?: any) => any;
    configPlayBtnCreate: (winWidth?: number | undefined, customStyles?: any) => any;
};
export default _default;
