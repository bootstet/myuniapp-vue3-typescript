import http from '@/utils/request';
let baseUrl =  'app/req/hiaBusiness.'

//查询科室排班信息（号源）
export function getSchedulingInfo(data) {
  return http.request({
    url: baseUrl + 'getSchedulingInfo',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
//获取号源日期
export function getWeekSchedulingInfo(data) {
  return http.request({
    url: baseUrl + 'getWeekSchedulingInfo',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}