import http from '@/utils/request'

const baseUrl = 'app/req/hiaBusiness.'

// 查询服务包详情
export function serverPackInfo(data) {
  return http.request({
    url: `${baseUrl}serverPackInfo`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}