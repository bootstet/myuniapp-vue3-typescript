import { updateUserExtInfo, checkLoginCdc } from '@/api/vaccine.js'
import { getQueryString } from './index'
import store from '@/store'

/**
 * 在初始化机构信息（initOrg）之前，存储openId信息到分账商品所属的组织
 * @param {*} org 机构id
 * @param {*} cdc 组织id
 * @param {*} url 授权跳转的url
 * @returns 
 */
export function setCdcOpenId(org, cdc, url) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('setCdcOpenId方法的参数', org, cdc, url)
      const cdcId = cdc || getQueryString('cAuth') || '' // cAuth=>分账组织授权的标识
      const orgId = getQueryString('oId') || ''
      if (!cdcId) { // 页面链接中没有cAuth参数，代表不是组织授权的页面，后面的代码不需要执行了
        resolve()
        return
      }
      if (orgId && cdcId) store.dispatch('common/setSource', orgId) // 是分账组织授权的页面，有机构参数的话直接设置机构
      const { userId } = store.getters.userInfo || {}
      const openIdList = uni.getStorageSync('openIdList') || {}
      const cdcOpenId = cdc ? openIdList[org] : '' // 组织与机构使用的appid相同，则去获取机构对应的openId给到组织
      const urlOpenId = getQueryString('open_id') || ''
      if (org && cdc && !urlOpenId && !cdcOpenId) { // 未获取到openid，重新进行授权
        const toHref = `${window.location.origin}/#${url}oId=${org}&cAuth=${cdc}`;
        const href = `${getApp().globalData.baseUrl}template/auth_code?source=${cdc}&url=${encodeURIComponent(toHref)}`;
        window.location.href = href;
        return
      }
      const openId = getQueryString('open_id') || cdcOpenId || ''
      if(!openId) {
        resolve()
        return
      }
      await updateUserExtInfo({
        userId,
        orgId: cdcId,
        openId,
        type: 3
      })
      resolve()
    } catch (error) {
      console.error(error)
      reject()
    }
  })
}

/**
 * 处理分账商品授权
 * @param {*} url 授权后重定向的页面链接 示例：/pages/order/index?
 * @param {*} toast 是否需要提示
 * @param {*} id 当前商品的机构id
 * @returns 
 */
export async function handleCdcAuth(url, toast = false, id) {
  try {
    let orgId = id || getQueryString('source') || store.getters.source || '' // 链接中取到的机构id
    const userId = store.getters.userInfo.userId || '' // 用户id
    const { cdcId, isLoginCdc, isAppidSame } = await checkLoginCdc({
      userId, // 用户id
      orgId, // 机构id
      miniAppType: 3,
    }) || {}
    if (isLoginCdc) return // 当前商品所属的组织已授权，不用往下执行了
    if (isAppidSame) {
      await setCdcOpenId(orgId, cdcId, url) // 当前商品所属的组织还未授权，但组织的appid与机构的一致，所以直接取机构的openId存入组织中
      return
    }
    if (orgId == cdcId) orgId = cdcId // 当前商品所属的组织未授权，并且是从组织专题页页面进来的
    // 对组织进行授权
    const toHref = `${window.location.origin}/#${url}oId=${orgId}&cAuth=${cdcId}`;
    const href = `${getApp().globalData.baseUrl}template/auth_code?source=${cdcId}&url=${encodeURIComponent(toHref)}`;
    if (!toast) window.location.href = href;
    uni.showToast({
      title: '该用户未授权过CDC，需重新授权',
      icon: 'none',
      complete: function () {
        window.location.href = href;
      },
    })
    return false
  } catch (error) {
    console.error(error)
    return true
  }
}