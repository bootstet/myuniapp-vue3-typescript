
import http from '@/utils/request';
let baseUrl = 'app/req/product.'
let baseUrl2 = 'h5/'

// 获儿童疫苗列表
export function getVaccineNotice(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'getVaccineNotice',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 页面统计
export function productDetailStatistics(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.productDetailStatistics',
    method: 'POST',
    data,
    isSign: true,
    isSource: false
  })
}
// 注册统计
export function registerStatistics(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.registerStatistics',
    method: 'POST',
    data,
    isSign: true,
    isSource: false
  })
}
// 疫苗地图埋点
export function pointSave(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.pointSave',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
    enableResIntercept: false,
  })
}

// 爱婴 下单页面埋点  统计宝马云课堂渠道
export function classPointSave(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.saveUserChanel',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
    enableResIntercept: false,
  })
}