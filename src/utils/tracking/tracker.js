
import { sendByBeacon, sendByImage, sendByAjax } from './utils/index'
import cloneDeep from 'lodash/cloneDeep'
import store from '@/store'
import { getQueryString } from '@/utils/index'
/**
 * 埋点示例
 */
class Tracker {
  url = ''
  defaultUrl = 'app/req/customer.saveUserBehavior'
  constructor(props) {
    const beaconUrl = props?.url || this.defaultUrl;
    this.url = `${process.env.VUE_APP_URL}${beaconUrl}`
  }
  /**
   * 数据浏览器访问量
   */
  pv (data, sendType) {
    const type = sendType || 1 // sendType可选参数，默认为1 
    this.event('pv', data, type);
  }
  /**
   * 点击事件
   */
  click (data, sendType) {
    const type = sendType || 1 // sendType可选参数，默认为1 
    this.event('click', data, type);
  }

  /**
   * 发送数据
   * @param: url:上报埋点地址 params： 埋点参数 sendType： 上报方式，默认为1 beacon上报 2： img上报  3： ajax 上报
   */
  send (url, params, sendType) {

    const { name } = store.state.common.agencyInfo
    const { userId } = store.state.common.userInfo
    const urlSource = params.urlSource
    // urlSource 为true标识只取url中的source，不在取store中的source
    const source = urlSource ? getQueryString('source') : store.getters.source

    const transData = {
      ...cloneDeep(params),
      orgId: params.orgId || source,
      pageTitle: params.pageTitle || document.title,
      pageUrl: window.location.href,
      userId,
      orgName: name 
    }
    // 后端传空报错
    if (transData.orgId === '') {
      transData.orgId = 0
    }
    if (transData.userId === '') {
      transData.userId = 0
    }
    // 不需要传给后端
    if (urlSource) {
      delete transData.urlSource
    }
    const data = transData
    const sendNum = sendType // 1 beacon上报  2 img上报 3 ajax 上报
    if (sendNum === 1) {
      sendByBeacon(url, data)
    } else if (sendNum === 2) {
      const paramsArr = [];
      for (let key in params) {
        const val = params[key];
        paramsArr.push(`${key}-${val}`);
      }
      sendByImage(paramsArr, data)
    } else {
      sendByAjax(url, data) 
    }
  }
  /**
   * 内部事件
   */
  event (key, value, sendType) {
    const isAwait = value.isAwait || false
    const { name } = store.state.common.agencyInfo
    const data = {
      ...cloneDeep(value)
    }
    // 有异步需要时，先不执行，将事件存在等待队列中，待需要的数据异步请求到以后在去统一发送
    if (isAwait && !name) {
      // 前端自定义的参数，用完了要删掉，不要传给后端
      delete data.isAwait
      uni.$on('acceptAgencyInfo', (val) => {
        this.send(this.url, data, sendType)
			})
      return
    }
    delete data.isAwait
    // todo： 埋点类型逻辑入口，后续页面停留时间等，可以在这里写，目前仅发送请求
    // 如果value.title为空,则等待框架处理document.title,延迟17ms
    // 为什么是17ms?  一秒60Hz是基准,平均1Hz是17毫秒,只要出来了页面那就有 document.title
    if (key === 'pv') {
      setTimeout(
        () => {
          this.send(this.url, data, sendType)
        }, 
        value.title ? 0 : 17
      );
      
    } else if (key === 'click') {
      this.send(this.url, data, sendType)
    }
  }
}

export default Tracker;