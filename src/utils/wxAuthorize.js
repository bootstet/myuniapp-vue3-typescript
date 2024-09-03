import store from '@/store'
import { getIsRequest, login } from '@/api/common.js'
import { getQueryString } from '@/utils/index'

// openId 本地有效期时长，暂定1天，可调考虑3天7天
const saveTime = 24 * 60 * 60 * 1000

export default function wxAuthorize(redirectUrl) {
  return new Promise(async (resolve, reject) => {
    // 如果机构没有变化
    if (uni.getStorageSync('sourceChanged') == false) {
      // 如果openId存在
      if (store.getters.userInfo.openId) {
        const time = store.getters.userInfo.openIdExpireTime
        // 如果没有有效期，或者有效期大于当前时间，则不重新授权
        if (!time || time > new Date().getTime()) {
          try {
            let res = await login({
              open_id: store.getters.userInfo.openId,
              userId: store.getters.userInfo.userId,
            })
            const userInfo = Object.assign(store.getters.userInfo, res)
            store.dispatch('common/setUserInfo', userInfo)
          } catch (e) {
            console.error(e)
          }
          resolve(store.getters.userInfo)
          return
        }
      }
    }
    //是否需要微信授权
    let isR = await getIsRequest()
    // TODO: 测试始终要授权
    //&& !isR.openId
    if (isR?.isRequest == 1) {
      // 获取地址栏传来的openid
      // 如果有返回openid就是请求了地址
      console.log('open_id', getQueryString('open_id'))
      if (getQueryString('open_id')) {
        try {
          let res = await login({
            open_id: getQueryString('open_id').split('#')[0],
            userId: store.getters.userInfo.userId,
          })
          const userInfo = Object.assign(store.getters.userInfo, res)
          userInfo.openIdExpireTime = new Date().getTime() + saveTime
          store.dispatch('common/setUserInfo', userInfo)
          uni.setStorageSync('sourceChanged', false)
          resolve(res)
        } catch (e) {
          console.error(e)
          resolve('')
        }
      } else {
        let toUrl = ''
        if (redirectUrl) {
          if (redirectUrl.indexOf('?') == -1) redirectUrl += '?tmp=1'
          else redirectUrl += '&tmp=1'
          toUrl = encodeURIComponent(redirectUrl)
          console.log('toUrl1', toUrl)
          // 关闭当前页，比如登录页
          uni.navigateBack()
        } else {
          let toHref = window.location.href
          if (toHref.indexOf('?') == -1) toHref += '?tmp=1'
          else toHref += '&tmp=1'
          toUrl = encodeURIComponent(toHref)
          console.log('toUrl2', toUrl)
        }
        let href = `${getApp().globalData.baseUrl}template/auth_code?source=${store.getters.source}&url=${toUrl}`
        reject('')
        console.log('href', href)
        window.location.href = href
      }
    } else {
      resolve(store.getters.userInfo)
    }
  })
}
