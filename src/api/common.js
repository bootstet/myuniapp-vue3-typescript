
import http from '@/utils/request';
import { isJknj } from '@/utils/index'
import { getQueryString, getAppName } from '@/utils/index'

let baseUrl = 'template/' 
let baseUrl2 = 'app/req/'
let curUrl = ''
const nodeEnv = process.env.NODE_ENV
//新域名 java
//旧域名 php
switch(nodeEnv) {
  case 'development':case 'dev':case 'new-development':
    curUrl = 'https://api-dev.zhil.cloud/'
    break
  case 'test':case 'new-test':
    curUrl = 'https://api-ft1.zhil.cloud/'
    break
  case 'production':case 'new-production':case 'hw-prod':
    curUrl = 'https://api.zhil.cloud/'
    break
  case 'sit':
    curUrl = 'https://api-sit.zhil.cloud/'
    break
}
// 获取微信授权配置
export function wxConfig(data) {
  return http.request({
    url: baseUrl + 'template_setting',
    method: 'POST',
    data,
    isSource: true,
    isSign: false
  })
}

// java获取微信授权配置
export function javaWxConfig(data, closeError = true) {
  return http.request({
    url: 'wx/tools/h5/genSignInfo',
    method: 'POST',
    data,
    isSource: true,
    isSign: true,
    closeError: closeError
  })
}

// 授权获取用户信息
export function getUserInfo(data) {
  return http.request({
    baseUrl: `${curUrl}${baseUrl}auth_code`,
    url: '', 
    data,
    isSource: true,
    isSign: false
  })
}

// 授权是否需要微信授权
export function getIsRequest(data) {
  return http.request({
    baseUrl: curUrl,
    url: 'h5/is_Request/v2',
    data,
    isSource: true,
    isSign: false
  })
}

/**
 * 获取用户在当前机构下是否存在openId
 */
export function getOpenInByOry() {
  return http.request({
    baseUrl: curUrl,
    url: 'h5/is_Request/v2',
    isSource: true,
    isSign: false,
    enableResIntercept: false
  })
}

/**
 * 补全用户openId信息
 * @param {*} data 
 * @returns 
 */
export function putOpenId(data) {
  return http.request({
    baseUrl: `${curUrl}${baseUrl}template_login`,
    url: '',
    data,
    isSource: true,
    isSign: false,
    enableResIntercept: false
  })
}

// php登录
export function login(data) {
  return http.request({
    baseUrl: `${curUrl}${baseUrl}template_login`,
    url: '',
    data,
    isSource: true,
    isSign: false
  })
}

// 获取居委会列表
export function getCommitteeList(data) {
  return http.request({
    url: baseUrl2 + 'org.getCommitteeListByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取机构信息
export function getOrgInfoById(data) {
  return http.request({
    url: baseUrl2 + 'org.getOrgInfoById',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//获取用户信息
export function currentUser() {
  return http.request({
    url: 'wx/h5/user/currentUser',
    isSource: false,
    method: 'get',
    isSign: true,
    enableResIntercept: false
  })
}

/**
 * 腾讯健康小程序登录
 */
export function loginTencent(data) {
  return http.request({
    baseUrl: curUrl,
    url: 'ext/login/tencent',
    isSource: true,
    method: 'post',
    isSign: false,
    enableResIntercept: false,
    data
  })
}

/**
 * 登录2.0
 * 判断是否需要授权
 */
 export function getIsRequestH5() {
  const appName = getQueryString('appName') || getAppName()
  const params = {
    baseUrl: curUrl,
    url: 'h5/isRequestH5',
    isSource: true,
    isSign: false
  }
  // 健康南京appheader添加appName字段
  if (isJknj()) {
    params.header = {
      appName
    }
  }
  return http.request(params)
}
/**
 * 登录2.0
 * 根据收openId 获取手机号列表,当老用户需要登录时，根据openid返回手机号，用户不再需要填手机号
 */
export function getPhoneListByOpenId(data) {
  return http.request({
    method: 'POST',
    data,
    // baseUrl: curUrl,
    url:  'app/req/customer.getPhoneListByOpenId',
    isSource: false,
    isSign: true,
  })
}
/**
 * 获取与该机构共享token的机构  如同属一家cdc、存在上下级关系
 */

export function getOrgRelationList(params) {
  return http.request({
    method: 'get',
    url:  'wx/h5/user/getOrgRelationList',
    isSource: false,
    isSign: true,
    params
  })
}