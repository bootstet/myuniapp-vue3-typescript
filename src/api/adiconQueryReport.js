import http from '@/utils/request';


//获取验证码
export function getCode(data) {
  return http.request({
    url: 'msg/sendLoginVerCode',
    data,
    isSource: false,
    isSign: true
  })
}


// 查询
export function selectVerification(params) {
    return http.request({
      url: 'app/req/hiaBusiness.selectVerification',
      method: 'POST',
      data:params,
      isSource: false,
      isSign: true
    })
}

// 分页查询报告列表
export function getReportList(params) {
  return http.request({
    url: 'app/req/hiaBusiness.getReportList',
    method: 'POST',
    data:params,
    isSource: false,
    isSign: true
  })
}

// 查询报告详情-pdf
export function getReportPdfDetail(params) {
  return http.request({
    url: 'app/req/hiaBusiness.getReportPdfDetail',
    method: 'POST',
    data:params,
    isSource: false,
    isSign: true
  })
}

// 页面埋点
export function pageBuryIngPoint(data) {
  return http.request({
    url: 'app/req/hiaBusiness.pageBuryIngPoint',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false,
  })
}