import http from '@/utils/request';
let baseUrl = 'app/req/customer.'
// 获取用户体检报告
export function lotterySubmit(data) {
  return http.request({
    url: baseUrl + 'getUserMedicalReport',
    method: 'POST',
    data,
    isSign: true,
    isSource: true,
  })
}
// 红谷滩妇保院通过验证码查询体检报告
export function getUserMedicalReportVerifyCode(data) {
  return http.request({
    url: baseUrl + 'getUserMedicalReportVerifyCode',
    method: 'POST',
    data,
    isSign: true,
    isSource: true,
  })
}