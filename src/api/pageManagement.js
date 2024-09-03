import http from '@/utils/request';
let baseUrl = 'app/req/org.'

// 获取订单列表
export function getPageDetailByOrgId(data) {
    return http.request({
      url: baseUrl + 'getPageDetailByOrgId',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 根据id获取商品
export function getGoodsByOrgId(data) {
  return http.request({
    url: 'app/req/' + 'product.getGoodsByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function getArchivesMaterialList(data) {
  return http.request({
    url: baseUrl + 'getArchivesMaterialList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function getOrgVaccineMapList(data) {
  return http.request({
    url: baseUrl + 'getOrgVaccineMapList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function getOrgVaccineMapAreaList(data) {
  return http.request({
    url: baseUrl + 'getOrgVaccineMapAreaList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//获取指定事件专题页ID(埋点使用)
export function getOrgEventPageIds(data) {
  return http.request({
    url: baseUrl + 'getOrgEventPageIds',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//判断用户是否关注机构公共号
export function checkSub(data) {
  return http.request({
    url: 'app/req/message.checkSub',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询机构主题页弹窗详情
export function dialogDetail(data) {
  return http.request({
    method: 'POST',
    url:  'app/req/org.dialogByPageId',
    isSource: false,
    isSign: true,
    data
  })
}