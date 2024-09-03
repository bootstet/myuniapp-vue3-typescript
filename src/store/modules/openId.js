
import openIdWhile from '@/utils/openId.js'
import { checkOpenId } from '@/api/login'
import { getQueryString, clearUrlOpenid } from '@/utils'

// 存储openId
export const saveOpenId = async () => {
  return new Promise( async(resolve) => {
    // 储存open_id
    let openId = getQueryString('open_id')
    const nonce_str = getQueryString('nonce_str') || ''
    const sourceId = getQueryString('source')

    // 优化openId存储逻辑 新加一层校验，校验通过在存入本地浏览器
    if (!nonce_str && !openId) {
      resolve()
      return 
    }
    const res = await checkOpenId({
      openId,
      nonceStr: nonce_str
    })
    if (res) {
      resolve()

      const openIdList = uni.getStorageSync('openIdList') || {}
      openIdList[sourceId] = openId
      uni.setStorageSync('openIdList', openIdList)
      console.log('存储openId')
      clearUrlOpenid()
    } else {
      clearUrlOpenid()
      resolve()
    }
  })
}