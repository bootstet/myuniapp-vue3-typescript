import http from '@/utils/request';
let baseUrl =  'app/req/org.'

//根据机构id查询机构信息List
export function getOrgInfoListById(data) {
  return http.request({
    url: baseUrl + 'getOrgInfoListById',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}