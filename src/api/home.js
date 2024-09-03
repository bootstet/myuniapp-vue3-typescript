
import http from '@/utils/request';
const baseUrl = 'template/'
const baseUrl2 = 'app/req/'
// 获取配置信息 java

export function getHomePageOrgInfoById(data) {
  return http.request({
    url: 'app/req/org.getHomePageOrgInfoById',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 小程序获取机构信息
export function getAgency(data) {
  return http.request({
    url: baseUrl2 + 'template_index',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 根据appId获取机构信息
export function getAgencyByOpenId(data) {
  return http.request({
    url: baseUrl2 + 'org.getOrgInfoByAppId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
