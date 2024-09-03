import http from '@/utils/request';

// 获取消息模板
export function xybGetUserInfo(data) {
  return http.request({
    url: 'app/req/hiaBusiness.xybGetUserInfo',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
    enableResIntercept: false
  })
}