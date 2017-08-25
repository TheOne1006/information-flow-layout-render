import LoadCtrl from "../src/loadController"
import {} from "jest"

describe("load-controller test", () => {
  let ctrl
  let loadOptions
  beforeEach(() => {
    loadOptions = {
      initData: [],
      nextPage: 2,
      pageShowNum: 5,
      mockRemoteLoad: true
    }
    ctrl = new LoadCtrl(loadOptions)
  })

  describe("loadController Fun IconstructorOption to create new instance", () => {
    it("with out ajaxFetch", () => {
      expect(ctrl.ajaxFetch).toBe(undefined)
      expect(ctrl.loading).toBe(false)
      expect(ctrl.isEnd).toBe(false)
      expect(ctrl.page).toBe(2)
      expect(ctrl.showNum).toBe(5)
      expect(ctrl.mockRemoteLoad).toBeTruthy()
      expect(ctrl.data).toHaveLength(0)
    })
    it("with ajaxFetch", () => {
      const loadOps = {
        initData: [],
        nextPage: 2,
        pageShowNum: 5,
        mockRemoteLoad: true,
        ajaxFetch: () => ({})
      }
      const ctrl = new LoadCtrl(loadOps)

      expect(ctrl.ajaxFetch).toBe(loadOps.ajaxFetch)
    })
  })
  describe("loadController Fun fetchData", () => {
    describe("not allow done when instance attrbuites", () => {
      it("instance.loading is true", () => {
        ctrl.loading = true
        ctrl.isEnd = false
        const mockFn = jest.fn()
        ctrl.fetchData(1, mockFn)
        expect(mockFn.mock.calls).toHaveLength(0)
      })
      it("instance.isEnd is true", () => {
        ctrl.loading = false
        ctrl.isEnd = true
        const mockFn = jest.fn()
        ctrl.fetchData(1, mockFn)
        expect(mockFn.mock.calls).toHaveLength(0)
      })
    })
    describe("done success when instance attrbuites", () => {
      let fetch
      beforeEach(() => {
        fetch = jest.fn(({ page, success, fail }) => {
          success([])
        })
      })

      it("instance ajaxFetch callOnce success empty results", () => {
        ctrl.loading = false
        ctrl.isEnd = false
        ctrl.ajaxFetch = fetch
        const mockFn = jest.fn()
        ctrl.fetchData(1, mockFn)
        expect(fetch.mock.calls).toHaveLength(1)
        expect(mockFn.mock.calls).toHaveLength(1)
        expect(ctrl.isEnd).toBe(true)
      })
      it("instance ajaxFetch callOnce success some results", () => {
        fetch = jest.fn(({ page, success, fail }) => {
          success(new Array(6))
        })
        ctrl.loading = false
        ctrl.isEnd = false
        ctrl.ajaxFetch = fetch
        const mockFn = jest.fn()
        ctrl.fetchData(1, mockFn)
        expect(fetch.mock.calls).toHaveLength(1)
        expect(mockFn.mock.calls).toHaveLength(1)
        expect(ctrl.isEnd).toBe(false)
      })
    })
  })
  describe("loadController Fun fetchNext", () => {
    let callback
    beforeEach(() => {
      callback = jest.fn()
    })
    describe("not allow done when instance attrbuites", () => {
      it("instance.loading is true", () => {
        ctrl.loading = true
        ctrl.isEnd = false
        ctrl.fetchData = jest.fn()
        ctrl.fetchNext(callback)
        expect(callback.mock.calls).toHaveLength(0)
        expect(ctrl.fetchData.mock.calls).toHaveLength(0)
      })
      it("instance.isEnd is true", () => {
        ctrl.loading = false
        ctrl.isEnd = true
        ctrl.fetchData = jest.fn()
        ctrl.fetchNext(callback)
        expect(callback.mock.calls).toHaveLength(0)
        expect(ctrl.fetchData.mock.calls).toHaveLength(0)
      })
    })
    describe("allow done when instance attrbuites", () => {
      it("call argument page 1", () => {
        ctrl.loading = false
        ctrl.isEnd = false
        ctrl.page = 1
        ctrl.fetchData = jest.fn()
        ctrl.fetchNext(callback)
        expect(callback.mock.calls).toHaveLength(0)
        expect(ctrl.fetchData.mock.calls).toHaveLength(1)
      })
    })
  })

  describe("loadController Fun mockFetch", () => {
    let callback
    beforeEach(() => {
      callback = jest.fn()
    })
    describe("not allow done when instance attrbuites", () => {
      it("instance.isEnd is true", () => {
        ctrl.isEnd = true
        ctrl.fetchData = jest.fn()
        ctrl.mockFetch(1, callback)
        expect(callback.mock.calls).toHaveLength(0)
      })
    })
    describe("allow done when instance attrbuites", () => {
      it("callback done", () => {
        ctrl.data = new Array(6)
        ctrl.mockFetch(1, callback)
        expect(callback.mock.calls).toHaveLength(1)
      })
    })
  })

  describe("loadController Fun mockFetchNext", () => {
    let callback
    beforeEach(() => {
      callback = jest.fn()
    })
    describe("not allow done when instance attrbuites", () => {
      it("instance.isEnd is true", () => {
        ctrl.isEnd = true
        ctrl.mockFetchNext(callback)
        expect(callback.mock.calls).toHaveLength(0)
      })
    })
    describe("allow done when instance attrbuites", () => {
      it("call argument page 1", () => {
        ctrl.data = new Array(6)
        ctrl.isEnd = false
        ctrl.page = 1
        ctrl.mockFetchNext(callback)
        expect(callback.mock.calls).toHaveLength(1)
      })
    })
  })

  describe("loadController Fun getInit", () => {
    let callback
    beforeEach(() => {
      callback = jest.fn()
    })
    describe("instance attrbuites mockRemoteLoad", () => {
      it("instance.mockRemoteLoad is true", () => {
        ctrl.mockRemoteLoad = true
        ctrl.mockFetch = jest.fn()
        ctrl.getInit(callback)
        expect(ctrl.mockFetch.mock.calls).toHaveLength(1)
      })
      it("instance.mockRemoteLoad is false", () => {
        ctrl.mockRemoteLoad = false
        ctrl.mockFetch = jest.fn()
        ctrl.getInit(callback)
        expect(ctrl.mockFetch.mock.calls).toHaveLength(0)
        expect(callback.mock.calls).toHaveLength(1)
      })
    })
  })

  describe("loadController Fun getNext", () => {
    let callback
    beforeEach(() => {
      callback = jest.fn()
    })
    describe("instance attrbuites mockRemoteLoad", () => {
      it("instance.mockRemoteLoad is true", () => {
        ctrl.mockRemoteLoad = true
        ctrl.mockFetchNext = jest.fn()
        ctrl.fetchNext = jest.fn()
        ctrl.getNext(callback)
        expect(ctrl.fetchNext.mock.calls).toHaveLength(0)
        expect(ctrl.mockFetchNext.mock.calls).toHaveLength(1)
      })
      it("instance.mockRemoteLoad is false", () => {
        ctrl.mockRemoteLoad = false
        ctrl.mockFetchNext = jest.fn()
        ctrl.fetchNext = jest.fn()
        ctrl.getNext(callback)
        expect(ctrl.fetchNext.mock.calls).toHaveLength(1)
        expect(ctrl.mockFetchNext.mock.calls).toHaveLength(0)
      })
    })
  })
})
