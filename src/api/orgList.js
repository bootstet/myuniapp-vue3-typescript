import http from '@/utils/request';
let baseUrl =  'app/req/org.'

//根据机构id查询机构信息List
export function getOrgInfoListById(data) {
  return http.request({
    url: baseUrl + 'getCdcOrgList',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}

//根据机构id查询机构信息List
export function getAreaNameByOrgId(data) {
  return http.request({
    url: 'app/req/org.getAreaNameByOrgId',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}


//获取推广信息
export function getDistributionInfo(data) {
  return http.request({
    url: 'app/req/org.getDistributionInfo',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}


//分销数据统计埋点

export function distributionStatisticsPoint(data) {
  return http.request({
    url: 'app/req/org.distributionStatisticsPoint',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
    enableResIntercept: false,
  })
}

//江宁机构列表
export function getPovByCdcId(data) {
  return http.request({
    url: 'app/req/org.getPovByCdcId',
    method: 'POST',
    data,
    isSign: true,
    isSource: false
  })
}