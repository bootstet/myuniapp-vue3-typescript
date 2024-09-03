
import http from '@/utils/request';
import { platform } from '@/utils/platform.js'

// let baseUrl = 'app/order/h/com.glz.order.client.OrderService/'
let baseUrl = 'app/req/order.'

// 获取订单列表
export function getOrderList(data) {
  const urlMp = {
    'H5': baseUrl + 'getOrderListH5',
    'MP-WEIXIN': baseUrl + 'getOrderList',
    'MP': baseUrl + 'getOrderList'
  }
  return http.request({
    url: urlMp[platform],
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取订单详情信息
export function getOrderDetail(data) {
  return http.request({
    url: baseUrl + 'getOrderDetail',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 创建订单
export function createOrder(data) {
  return http.request({
    url: baseUrl + 'addOrder',
    method: 'POST',
    // data: {
    //   orderAddReqModel: data
    // },
    data,
    isSource: false,
    isSign: true,
    closeError: true
  })
}

//去支付
export function goPay(data) {
  return http.request({
    url: 'app/req/pay.pay',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 取消订单
export function cancelOrder(data) {
  return http.request({
    url: baseUrl + 'orderStatusCancel',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 退款
export function refund(data) {
  return http.request({
    url: baseUrl + 'orderStatusRefunding',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function getAppointPopup(data) {
  return http.request({
    url: 'app/req/product.getAppointPopup',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function agreementApplyCreate(data) {
  return http.request({
    url: 'app/req/order.addHpvApply',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 检查江宁档案是否存在
export function checkArchivesStatus(data) {
  return http.request({
    url: 'app/req/org.checkArchivesStatus',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 获取档案审核状态
export function getArchivesCheckStatus(data) {
  return http.request({
    url: 'app/req/org.getArchivesCheckStatus',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 江宁获取订单号
export function getOrderSnByOwn(data) {
  return http.request({
    url: 'app/req/order.getOrderSnByOwn',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}


// 获取学校
export function getSchoolTemplate(data) {
  return http.request({
    url: 'app/req/order.getSchoolTemplate',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取广告配置详情
export function getAdvertisementConfig(data) {
  return http.request({
    url: 'app/req/product.getAdvertisementConfig',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取同意书
export function getInformedConsent(data) {
  return http.request({
    url: 'app/req/order.getInformedConsent',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 确认收货
export function goodsLogisticsReceipt(data) {
  return http.request({
    url: 'app/req/order.orderStatusReceipt',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 无预约号源商品模板
export function getGoodsTemplateConfigByGoodsId(data) {
  return http.request({
    url: 'app/req/product.getGoodsTemplateConfigByGoodsId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 用户自主核销
export function writeOffAppointment(data) {
  return http.request({
    url: 'app/req/order.writeOffAppointment',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}


// 图文验证码类型 （1-创蓝  2-腾讯云）
export function getSliderChannel(data) {
  return http.request({
    url: 'app/req/order.getSliderChannel',
    method: 'POST',
    isSource: false,
    isSign: true
  })
}

// 获取下单必填配置信息

export function getRelativeConfig(data) {
  return http.request({
    url: 'app/req/customer.getRelativeConfig',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 通过陕西健康healthCode 获取用户信息
export function getHealthCardByHealthCode(data) {
  return http.request({
    url: 'app/req/customer.getHealthCardByHealthCode',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false
  })
}