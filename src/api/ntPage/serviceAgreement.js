import http from '@/utils/request'

const baseUrl = 'app/req/hiaBusiness.'

// 查询随访列表
export function protocolInfo(data) {
  return http.request({
    url: `${baseUrl}protocolInfo`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}