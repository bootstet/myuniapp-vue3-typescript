import http from '@/utils/request';
let baseUrl =  'app/req/hiaBusiness.'

//获取网格化配置列表
export function getGriddedList(data) {
  return http.request({
    url: baseUrl + 'getGriddedList',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}
