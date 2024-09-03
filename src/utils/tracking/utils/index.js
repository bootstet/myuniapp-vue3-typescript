import { saveUserBehavior } from '@/api/trackig'

/**
  * 发送数据方式 - navigator.sendBeacon
  */
export function sendByBeacon (url, data) {
  return navigator.sendBeacon(url, JSON.stringify(data))
}


/**
 * 发送数据方式 - image
 */
export function sendByImage (url, data) {
  return new Promise(resolve => {
    const beacon = new Image()
    beacon.src = `${url}?v=${encodeURIComponent(JSON.stringify(data))}`
    sendReaconImageList.push(beacon)
    beacon.onload = e => {
      console.log('发送成功')
      resolve({ success: true, msg: e })
    }
    beacon.onerror = function (e) {
      console.log('发送失败')
      resolve({ success: false, msg: e })
      // console.log('e', e)
    }
  })
}

/**
  * 发送数据方式 - ajax
  */
export function sendByAjax (url, data) {
  const params = data
  // todo: request
  saveUserBehavior(params).then(res => {
    console.log('上报成功', res, data)
  })
}