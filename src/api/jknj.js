import http from '@/utils/request';


// 健康南京app获取用户数据注册知了云
export function authRegisterLogin(data) {
  return http.request({
    url: 'wx/h5/user/authRegisterLogin',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 用户同意隐私协议
export function agreeProtocol(data) {
  return http.request({
    url: 'app/req/customer.agreeProtocol',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 是否同意了隐私协议
export function isAgreeProtocol(data) {
  return http.request({
    url: 'app/req/customer.isAgreeProtocol',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}