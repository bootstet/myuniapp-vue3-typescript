import http from '@/utils/request';
let baseUrl =  'app/req/org.'

//根据cdcId查询机构核酸检测信息
export function getOrgBussinessBycdc(data) {
  return http.request({
    url: baseUrl + 'getOrgBussinessBycdc',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}