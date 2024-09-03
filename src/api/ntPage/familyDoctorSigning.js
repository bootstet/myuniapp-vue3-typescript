import http from '@/utils/request'

const baseUrl = 'app/req/hiaBusiness.'

// 查询签约合同详情
export function contractInfo(data) {
  return http.request({
    url: `${baseUrl}contractInfo`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询家医团队列表缓存
export function familyTeamList(data) {
  return http.request({
    url: `${baseUrl}familyTeamListCache`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取有效签约
export function getValidContract(data) {
  return http.request({
    url: `${baseUrl}getValidContract`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询家医团队详情
export function familyTeamInfo(data) {
  return http.request({
    url: `${baseUrl}familyTeamInfo`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 创建合同（签约）
export function saveContract(data) {
  return http.request({
    url: `${baseUrl}saveContract`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询协议详情
export function protocolInfo(data) {
  return http.request({
    url: `${baseUrl}protocolInfo`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询签约合同列表
export function contractList(data) {
  return http.request({
    url: `${baseUrl}contractList`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
