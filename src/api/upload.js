import http from '@/utils/request'

//obs 获取上传密钥
export function getAkInfo(data) {
    return http.request({
      url: 'obs/getAkInfo',
      method: 'GET',
      data,
      isSource: false,
      isSign: true,
    })
}

//obs 获取上传密钥
export function getCDNAkInfo(data) {
  return http.request({
    url: 'obs/getCDNAkInfo',
    method: 'GET',
    data,
    isSource: false,
    isSign: true,
  })
}

// 获取访问桶的临时安全密钥 文件上传改造
export function getTempSecurityToken(params) {
  return http.request({
    url: 'file/storage/getTempSecurityToken',
    method: 'get',
    isSign: true,
    params
  })
}

// 获取访问桶的临时安全密钥 文件上传改造
export function fileUploadApi(params) {
  return http.request({
    url: 'file/storage/upload',
    method: 'post',
    isSign: true,
    data: params,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
  })
}
// 获取私有桶临时访问url
export function getTempUrl(params) {
  return http.request({
    url:  'file/storage/getTempUrl',
    method: 'get',
    isSign: true,
    data: params
  })
}
