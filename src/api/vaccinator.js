
import http from '@/utils/request';
let baseUrl = 'h5/'
const baseUrl2 = 'app/req/customer.'

// 获取就诊人列表
export function getVaccinatorList(data) {
  return http.request({
    url: baseUrl2 + 'getRelativeList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 知了云的订单获取就诊人列表，区分his 我的里的就诊人
export function getRelativeListForApp(data) {
  return http.request({
    url: baseUrl2 + 'getRelativeListForApp',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}


// 就诊人添加
export function getVaccinatorAdd(data) {
    return http.request({
      url: baseUrl2 + 'addAndUpdateRelative',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

/**
 * 保险身份信息同步至就诊人，只在制定商品中用，接口请求成功与否，不提示用户
 * */ 
export function synchronizeApi(data) {
  return http.request({
    url: baseUrl2 + 'addAndUpdateRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false
  })
}

// 就诊人编辑
export function getVaccinatorEdit(data) {
    return http.request({
      url: baseUrl + 'relative_edit',
      method: 'POST',
      data,
      isSource: true,
      isSign: false
    })
}

// 就诊人详情
export function getVaccinatorDetail(data) {
    return http.request({
      url: baseUrl2 + 'getRelativeDetail',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 删除就诊人
export function deleteVaccinator(data) {
  return http.request({
    url: baseUrl2 + 'removeRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取地址
export function getSysArea(data) {
  return http.request({
    url: 'app/req/org.getSysArea',
	method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取地址
export function getSysAreaByName(data) {
  return http.request({
    url: 'app/req/org.getSysAreaByName',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 获取当前选中的就诊人信息
export function getHisHomePageRelative(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl2 + 'getHisHomePageRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function asyncUserRelative(data) {
  return http.request({
    url: 'app/req/customer.asyncUserRelative',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false
  })
}

export function getUserRelativeConfig(data) {
  return http.request({
    url: 'app/req/customer.getUserRelativeConfig',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 下单校验就诊人信息
export function checkUserRelativeInfo(data) {
  return http.request({
    url: 'app/req/customer.checkUserRelativeInfo',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

/**
 * 获取就诊人列表健康档案
 * 
 * 根据自定义表单判断就诊人是否是自定义同步过来的
 */

 export function getRelativeListHealthRecord(data) {
  return http.request({
    url: 'app/req/hiaBusiness.getRelativeListHealthRecord',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 健康沛县 组装公卫地址
export function packagePublicHealthUrl(data) {
  return http.request({
    url: 'app/req/hiaBusiness.packagePublicHealthUrl',
	  method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}