import http from '@/utils/request';
let baseUrl =  'app/req/org.'

//复诊审核
export function archivesMaterialCheck(data) {
  return http.request({
    url: baseUrl + 'archivesMaterialCheck',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}