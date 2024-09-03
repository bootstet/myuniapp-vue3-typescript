import http from '@/utils/request';
let baseUrl = 'app/req/hiaBusiness.'
let baseUrl2 = 'h5/'

// 获取待缴费列表
export function getWaitPaymentInfo(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'getWaitPaymentInfo',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 获取已缴费列表
export function getPaymentRecord(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'getPaymentRecord',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取已缴费详情
export function getPaymentDetails(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'getPaymentDetails',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取缴费单的支付状态
export function getPaymentByOrderSn(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/pay.getPaymentByOrderSn',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}