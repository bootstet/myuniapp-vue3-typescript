import http from '@/utils/request';
let baseUrl =  'app/req/order.'
let baseUrl1 =  'app/req/pay.'

// 支付
export function departmentPay(data) {
    return http.request({
      url: baseUrl1 + 'departmentPay',
      method: 'POST',
      data,
      isSign: true,
      isSource: false,
    })
  }