import store from "@/store";
import wx from 'weixin-js-sdk'

/**
 * 消息订阅
 * @class SubscribeMsg
 */

class SubscribeMsg {
  constructor() {
    this.mesType = {
      arrival: [4, 25], // 【疫苗到货通知】
      paySuc: [6, 21, 31], // 【付款成功通知】
      besSuc: [7, 22, 28], // 【预约成功通知】
      besCancel: [8, 23, 29], // 【预约取消通知】
      doctorWarn: [9, 24, 30], // 【就诊提醒通知】
      refound: [10, 26, 32], // 【退款成功通知】
    }
  }

  /**
   *  模板id等信息处理
   */
  handleMsg(type) {
    // 模板数据id从store中拿，没有在去localStoreage中拿
    // const storTem = uni.getStorageSync("templateId")
    const storTem = store.getters.templateIdList
    if(!storTem) return []
    const templateIdList = storTem
    if (Object.prototype.toString.call(type) === '[object Array]') {
      const result = type.reduce((acc, cur) => {
        const id  = templateIdList.filter(item => this.mesType[cur].includes(item.templateId))[0]?.wxTemplateId
        if (id) {
          acc.push(id)
        }
        return acc
      }, [])
      console.log('templateid - result', result)
      return result
    } else {
      const result = templateIdList.filter(item => item.templateId === type)[0]?.wxTemplateId
      return [result]
    }
  }
  /**
   * 唤起消息授权弹窗
   * @param {string} type 授权弹框标识 映射 sceneType 字段
   * @param {() => any} [complete] 完成回调
   * @param {(res: any) => any} [success] 成功回调
   * @param {(e: any) => any} [fail] 失败回调
   * @memberof SubscribeMsg
   */
  requestSubscribeMessage(type, complete, success, fail) {
    try {
      const tmpId = this.handleMsg(type)
      wx.requestSubscribeMessage({
        tmplIds: tmpId,
        success(res) {
          console.log('subscribe response:', res)
          if(success) success('fail',e)
        },
        fail(e) {
          console.log('subscribe fail:', e)
          // if (complete) complete()
        },
        complete() {
          if (complete) complete();
        },
      })
    } catch (error) {
      console.error(error)
      console.error('订阅消息异常');
      if (complete) complete();
    }
  }
}
const getSubscribeMsgInstance = (() => {
  let subscribetor;
  return () => {
    if (subscribetor) {
      return subscribetor
    }
    return (subscribetor = new SubscribeMsg());
  }
})()

export default getSubscribeMsgInstance();