import http from '@/utils/request';
let baseUrl =  'app/req/order.'
let baseUrl1 =  'app/req/pay.'

//保存挂号单
export function saveHiaOrder(data) {
  return http.request({
    url: baseUrl + 'saveHiaOrder',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
//挂号
export function saveRegister(data) {
  return http.request({
    url: baseUrl + 'saveRegister',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
// 支付
export function pay(data) {
  return http.request({
    url: baseUrl1 + 'pay',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
