import http from '@/utils/request'

// 获取就诊人列表
export function getVaccinatorList(data) {
    return http.request({
      url: 'app/req/customer.getRelativeList',
      method: 'POST',
      data,
      isSource: false,
      isSign: true,
      enableResIntercept: false
    })
  }