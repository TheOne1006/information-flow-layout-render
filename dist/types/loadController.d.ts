export interface IconstructorOption {
    initData?: object[];
    nextPage?: number;
    pageShowNum?: number;
    mockRemoteLoad?: boolean;
    ajaxFetch?: Function;
}
export default class LoadCtrl {
    loading: boolean;
    page: number;
    showNum: number;
    mockRemoteLoad: boolean;
    isEnd: boolean;
    data: object[];
    ajaxFetch: Function;
    events: any;
    constructor({initData, nextPage, pageShowNum, mockRemoteLoad, ajaxFetch}: IconstructorOption);
    fetchData(page: number, callback: Function): void;
    fetchNext(callback: Function): void;
    mockFetch(currentPage: number, callback: Function): void;
    mockFetchNext(callback: Function): void;
    getInit(callback: Function): void;
    getNext(callback: Function): void;
    subscribe(key: string, fn: Function): void;
    publish(key: string, ...otherArgs: any[]): false | undefined;
}
