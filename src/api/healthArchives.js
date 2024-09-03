// 健康沛县
import http from '@/utils/request';

// 查询健康档案
export function getHealthRecords(data) {
    return http.request({
      url: 'app/req/hiaBusiness.getHealthRecords',
      method: 'POST',
      data,
      isSign: true,
      isSource: false,
    })
}

// 查询云建档同步过来的就诊人
export function getRelativeListHealthRecord(data) {
  return http.request({
    url: 'app/req/hiaBusiness.getRelativeListHealthRecord',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}

// 表单修改
export function updateCustomForm(data) {
  return http.request({
    url: 'app/req/hiaBusiness.updateCustomForm',
    method: 'POST',
    data,
    isSign: true,
    isSource: false,
  })
}