import http from '@/utils/request';
let baseUrl =  'app/req/hiaBusiness.'

//查询检验报告列表
export function getLaboratoryCheckReportList(data) {
  return http.request({
    url: baseUrl + 'getLaboratoryCheckReportList',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}

//查询检验报告结果
export function getLaboratoryCheckReportResult(data) {
  return http.request({
    url: baseUrl + 'getLaboratoryCheckReportResult',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}

//查询检查报告列表
export function getCheckReportList(data) {
  return http.request({
    url: baseUrl + 'getCheckReportList',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}


//查询检查报告结果
export function getCheckReportResult(data) {
  return http.request({
    url: baseUrl + 'getCheckReportResult',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}