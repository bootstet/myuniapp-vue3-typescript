import http from '@/utils/request'

const baseUrl = 'app/req/hiaBusiness.'
const orderBaseUrl = 'app/req/order.'

// 查询随访列表
export function followUpList(data) {
  return http.request({
    url: `${baseUrl}followUpList`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询预约记录
export function getAppointList(data) {
  return http.request({
    url: `${orderBaseUrl}getAppointList`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}