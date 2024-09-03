import http from '@/utils/request';
const baseUrl = 'app/req/hiaBusiness.'

// 查询服务包列表
export function serverPackList(data) {
    return http.request({
      url: baseUrl + 'serverPackList',
      method: 'POST',
      data,
      isSign: true
    })
}

// 查询签约合同详情
export function contractInfo(data) {
    return http.request({
      url: baseUrl + 'contractInfo',
      method: 'POST',
      data,
      isSign: true
    })
}

// 查询档案
export function getHealthRecordOne(data) {
    return http.request({
      url: baseUrl + 'getHealthRecordOne',
      method: 'POST',
      data,
      isSign: true
    })
}

// 获取有效签约
export function getValidContract(data) {
    return http.request({
      url: baseUrl + 'getValidContract',
      method: 'POST',
      data,
      isSign: true
    })
}

// 获取线下签约商品id
export function getOfflineProductId(data) {
    return http.request({
      url: baseUrl + 'getOfflineProductId',
      method: 'POST',
      data,
      isSign: true
    })
}
