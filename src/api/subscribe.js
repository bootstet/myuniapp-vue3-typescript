import http from '@/utils/request';
let baseUrl = 'h5/'
const baseUrl2 = 'app/req/customer.'

// 获取订阅列表
export function getSubscribeList(data) {
    return http.request({
      url: baseUrl2 + 'getSubscribeList',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 订阅详情
export function getSubscribeItem(data) {
  return http.request({
    url: baseUrl2 + 'getSubscribeDetail',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
//

// 取消订阅
export function cancelSubscribe(data) {
    return http.request({
      url: baseUrl2 + 'cancelSubscribe',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 添加订阅
export function addSubscribe(data) {
  return http.request({
    // url: baseUrl + 'subscribe_add',
    url: 'app/req/customer.subscribe',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 是否订阅
// export function isSubscribe(data) {
//   return http.request({
//     url: 'app/req/customer.isSubscribe',
//     method: 'POST',
//     data,
//     isSource: false,
//     isSign: true
//   })
// }

// 获取小程序订阅模板id
export function getWxSubscribe(data) {
  return http.request({
    url: 'app/req/org.getOrgMaTemplateId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}