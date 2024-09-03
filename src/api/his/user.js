import http from '@/utils/request';
let baseUrl = 'app/req/customer.'
let baseUrl2 = 'h5/'

// 获取用户就诊人列表
export function getVaccinatorList(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'relativePage',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 添加就诊人
export function getVaccinatorAdd(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'addRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 编辑就诊人
export function getVaccinatorEdit(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'updateRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取就诊人详情
export function getVaccinatorDetail(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'relativeDetail',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 删除就诊人
export function deleteRelative(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'deleteRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}