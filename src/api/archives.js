

import http from '@/utils/request';
let baseUrl =  'app/req/org.'
let baseUrlPhp = 'template/'

// 获取模板
export function getItemFormApi(data) {
  return http.request({
    url: baseUrl + 'getItemForm',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 检查档案存在情况
export function checkArchivesStatus(data) {
  return http.request({
    url: baseUrl + 'checkArchivesStatus',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取家医签约信息
export function getDoctorSignInfo(data) {
  return http.request({
    url: baseUrl + 'getDoctorSignInfo',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 获取全部服务包
export function getServicePackage(data) {
  return http.request({
    url: baseUrl + 'getServicePackage',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 居民建档
export function addArchivesMaterial(data) {
  return http.request({
    url: baseUrl + 'addArchivesMaterial',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 发送验证码
export function getPhoneCode(data) {
  return http.request({
    url: baseUrlPhp + 'template_code',
    method: 'GET',
    data,
    isSource: false,
    isSign: false
  })
}

// 居民档案详情
export function getArchivesInfo(data) {
  return http.request({
    url: baseUrl + 'getArchivesInfo',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 签约
export function addDoctorSign(data) {
  return http.request({
    url: baseUrl + 'addDoctorSign',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 实名认证
export function idCardAuth(data) {
  return http.request({
    url: baseUrl + 'idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取分页家庭医生
export function getDoctor(data) {
  return http.request({
    url: baseUrl + 'getDoctor',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取是否可以自主选择医生
export function getOrgOptionalDoctor(data) {
  return http.request({
    url: baseUrl + 'getOrgOptionalDoctor',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
//更新居民档案
export function updateArchivesMaterial(data) {
  return http.request({
    url: baseUrl + 'updateArchivesMaterial',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 建档新实名认证
export function archivesIdCardAuth(data) {
  return http.request({
    url: 'app/req/customer.idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}