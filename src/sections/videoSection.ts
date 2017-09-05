/**
 * 视频播放部分
 * XXX: 点击回调统计代码
 */
import { remarkType } from "../constants"
import { IadItemModel } from "../interfaces"
import videoStyle from "../theme/default/video"
import BaseSection from "./baseSection"
// import svgs from "../theme/default/svgs"

class VideoSection extends BaseSection {
  createWrapper(winWidth: number) {
    /**
     * 创建基础 wrap dom
     */
    const attrs = {}
    const wrapDom = this.buildDom("div", attrs, () =>
      videoStyle.configWrapCreate(winWidth)
    )
    return wrapDom
  }
  createTitle(winWidth: number, title: string) {
    const titleDom = this.buildDom(
      "span",
      {
        innerHTML: title
      },
      () => videoStyle.configTitleContainerCreate(winWidth)
    )

    return titleDom
  }
  createContent(winWidth: number, source: string, poster: string) {
    /**
     * 播放按钮
     */
    // const xmlString = svgs("play")
    // const btnEle = this.buildDom("div", {
    //   innerHTML: xmlString,
    //   }, () => videoStyle.configPlayBtnCreate()
    // )

    /**
     * video 元素
     */
    const attrs = {
      poster,
      src: source,
      controls: "controls",
      preload: "none"
    }
    const videoEle = this.buildDom("video", attrs, () =>
      videoStyle.configVideoScreenCreate(winWidth)
    )
    videoEle.addEventListener("play", function() {
      const allVideos = document.querySelectorAll("video")
      // 停播其他 video
      for (let indexVideo in allVideos) {
        const currentVideo = allVideos[indexVideo]
        if (currentVideo !== videoEle) {
          const playing = currentVideo.paused === false
          if (playing) {
            currentVideo.pause()
          }
        }
      }
    })

    /**
     * 容器标签
     */
    const contentEle = this.buildDom(
      "div",
      {
        onclick: (e: Event) => {
          if (videoEle.paused || videoEle.ended) {
            videoEle.play()
          } else {
            videoEle.pause()
          }
        }
      },
      () => videoStyle.configContainerCreate(winWidth)
    )

    contentEle.appendChild(videoEle)
    // contentEle.appendChild(btnEle)

    return contentEle
  }
  createRemark(
    winWidth: number,
    type: number,
    desc?: string,
    src?: string,
    time?: string
  ) {
    if (type === remarkType.SHOW_SRC_TIME) {
      return this.createSrcAndTimeDom(winWidth, 10, 10, 20, src, time)
    }
    return this.createDescDom(winWidth, 10, 10, desc)
  }
  render(fragment: DocumentFragment, winWidth: number, adItem: IadItemModel) {
    const { title, source, imageUrl, type, src, desc, time } = adItem

    if (!imageUrl || !source) {
      return
    }

    const wraperEle = this.createWrapper(winWidth)
    const titleEle = this.createTitle(winWidth, title)
    const contentEle = this.createContent(winWidth, source, imageUrl)
    const remarkEle = this.createRemark(winWidth, type, desc, src, time)
    const lineEle = this.createLineDom(winWidth, 0)

    // 组装dom
    wraperEle.appendChild(titleEle)
    wraperEle.appendChild(contentEle)
    wraperEle.appendChild(remarkEle)
    wraperEle.appendChild(lineEle)

    fragment.appendChild(wraperEle)
  }
}

export default VideoSection
