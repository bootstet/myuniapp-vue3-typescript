import { getQueryString, getAppName } from '@/utils'
import { getJknjUserInfo } from '@/utils/jknjJsBriage'
// import { parser } from 'zhiljs'
import agreementPopup from '@/utils/agreementPopup'
import { authRegisterLogin, isAgreeProtocol } from '@/api/jknj'
import setToken from '@/utils/loginTools.js'
import store from '@/store'
import once from 'lodash/once'

/**
 * 判断是否在健康南京app内
 */
export const isJknj = () => {
  const appName = getQueryString('appName') || getAppName()
  const rejectAuthList = ['jknjApp', 'nj12320']
  if (rejectAuthList.some(item => item === appName)) {
    return true
  }
  return false
}

/**
 * 是否是健康南京app
 */
export const isJknjApp = () => {
  const appName = getQueryString('appName') || getAppName()
  if (appName === 'jknjApp') {
    return true
  }
  return false
}

/**
 * 判断健康南京的渠道
 */
const determineChannels = async () => {
  const appName = getQueryString('appName')
  if (!appName) return
  uni.setStorageSync('appNameObject', appName)
}

/**
 * 判断是首次进入页面并且链接中无appName 则清除当前机构的appName缓存
 */
const clearAppName = async () => {
  const appName = getQueryString('appName')
  if(!document.referrer && !appName && getQueryString('nj') !== '1') {
    uni.setStorageSync('appNameObject', '')
  }
}

/**
 * 健康南京app免登录逻辑处理
 */
const jknjRegister = async () => {
  try {
    const jknjUsI = JSON.parse(localStorage.getItem('jknjUsI')) || {}
    const { name, idNo, phone } = jknjUsI
    const datas = {
      cdcId: store.state.common.source,
      idCard: idNo,
      mobile: phone,
      name
    }
    const res = await authRegisterLogin(datas)
    const { token: resToken } = res
    // 给关联的机构设置token
    await setToken(resToken)
    store.dispatch("common/setUserInfo", res)
    store.dispatch('common/setIsLogin', true)
  } catch (error) {
    console.error('authRegisterLogin===', error)
  }
}
/**
 * 健康南京app鸿蒙免登录逻辑处理
 */
 const harmonyOsjknjRegister = async () => {
  try {
    const getUserInfo = () => {
      const result = tjWebBridge.getUserTjInfo() 
      return result
    }
    const userInfo = once(getUserInfo)()
    console.log('harmonyOs:==>', userInfo)
    const { userName, idNumber, phone } = userInfo
    const datas = {
      cdcId: store.state.common.source,
      idCard: idNumber,
      mobile: phone,
      name: userName
    }
    const res = await authRegisterLogin(datas)
    const { token: resToken } = res
    // 给关联的机构设置token
    await setToken(resToken)
    store.dispatch("common/setUserInfo", res)
    store.dispatch('common/setIsLogin', true)
  } catch (error) {
    console.error('nanjing health authRegisterLogin===', error)
  }
}

/**
 * 进行协议弹窗确认
 */
export const isAgreementPopup = async () => {
  try {
    if(!isJknj()) return
    // 如果不是第一次进入的页面 判断上级页面是专题页 嵌套的专题页不需要弹窗
    if(document.referrer && getQueryString('nj') === '1') return
    const appName = getQueryString('appName') || getAppName()
    if(!appName) return
    const params = {
      userId: store.state.common.userInfo.userId || null,
      orgId: store.state.common.source || getQueryString('source'),
      type: 3,// 类型：1-橄榄云小程序，2-机构小程序，3-机构公众号
      channel: appName,
    }
    const res = await isAgreeProtocol(params)
    // false 需要进行弹窗确认
    if(!res) agreementPopup.install()
  } catch (error) {
    console.error(error)
  }
}

/**
 * 健康南京app实现免登录 增加协议弹窗逻辑
 */
export const handleloginForHealthyNanjing = async () => {
  // 兼容鸿蒙
  const orignType = getQueryString('orign')
  
  // 进页面 判断链接中是否带有appName参数 有的话就存储下来
  await determineChannels()
  // 首次进入页面 未带appName参数 清除当前机构/组织下的机构的appName缓存
  await clearAppName()
  // 判断不是健康南京 停止执行后续逻辑
  if(!isJknj()) return
  // 如果当前是健康南京app环境
  if(isJknjApp()) {
    // 则去app中获取用户信息
    getJknjUserInfo()
    // 请求接口进行免登录
    if (orignType === 'harmonyOs') {
      await harmonyOsjknjRegister()
    } else {
      await jknjRegister()
    }
    
  }
}