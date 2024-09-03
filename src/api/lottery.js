import http from '@/utils/request';
let baseUrl = 'template/'
// 提交疫苗
export function lotterySubmit(data) {
  return http.request({
    url: baseUrl + 'form',
    data,
    isSign: false,
    isSource: true,
  })
}