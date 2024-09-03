import http from '@/utils/request';
let baseUrl = 'app/req/'

// 获取机构信息/下属机构列表
export function getOrgInfoModel(data) {
  return http.request({
    url: baseUrl + 'orgInspect.getOrgInfoModel',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 获取流调信息表
export function getInspectInfo(data) {
  return http.request({
    url: baseUrl + 'orgInspect.getInspectInfo',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 保存流调表
export function saveInspectInfo(data) {
  return http.request({
    url: baseUrl + 'orgInspect.saveInspectInfo',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 删除流调表(重填)
export function delById(data) {
  return http.request({
    url: baseUrl + 'orgInspect.delById',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}