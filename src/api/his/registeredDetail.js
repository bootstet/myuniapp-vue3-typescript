import http from '@/utils/request';
let baseUrl =  'app/req/order.'

//获取HIA订单详情
export function getOrderHiaDetail(data) {
  return http.request({
    url: baseUrl + 'getOrderHiaDetail',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
//取消挂号
export function cancelRegister(data) {
  return http.request({
    url: baseUrl + 'cancelRegister',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}