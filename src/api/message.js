import http from '@/utils/request';
let baseUrl =  'app/req/message.'

// 获取消息模板
export function getSubsibes(data) {
  return http.request({
    url: baseUrl + 'getSubscribes',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}