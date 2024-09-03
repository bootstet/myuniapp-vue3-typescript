import http from '@/utils/request'

const baseUrl = 'app/req/hiaBusiness.'

// 新增档案
export function saveHealthRecordOne(data) {
  return http.request({
    url: `${baseUrl}saveHealthRecordOne`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询档案
export function getHealthRecordOne(data) {
  return http.request({
    url: `${baseUrl}getHealthRecordOne`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 绑定档案
export function bindHealthRecord(data) {
  return http.request({
    url: `${baseUrl}bindHealthRecord`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}