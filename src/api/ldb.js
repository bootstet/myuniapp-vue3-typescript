import http from '@/utils/request';
let baseUrl = 'app/req/'

// 保存流调表信息
export function saveInspect(data) {
    return http.request({
      url: baseUrl + 'product.saveInspect',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 查询流调表信息
export function getInspectInfo(data) {
    return http.request({
      url: baseUrl + 'product.getInspectInfo',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}
