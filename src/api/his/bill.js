import http from '@/utils/request';
// let baseUrl = 'app/req/customer.'
let baseUrl = 'app/req/hiaBusiness.'
let baseUrl2 = 'h5/'

// 获取支票列表
export function getBillList(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'getBillList',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 获取支票列表
export function billSendMail(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'billSendMail',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 重定向pdf链接
export function redirectBill(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'redirectBill',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}