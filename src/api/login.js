
import http from '@/utils/request';
let baseUrl = 'template/'
// dev.gw.gly.glzhealth.com/app/req/customer.getUserByPhone
// 登录
export function login(data) {
    // 公众号登录
  return http.request({
    url: 'wx/h5/user/login/v2',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    header: {
      'fromPath': data.header
    }
  })
}
/**
 * 登录2.0
 * 弹窗不全信息
 */

export function newLoginH5(data) {
  return http.request({
    url: 'wx/h5/user/loginH5',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
  })
}

// 退出登录
export function loginOut(data) {
  return http.request({
    url: 'wx/h5/user/logout/v2',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 登录
export function wxLogin(data) {
  // 小程序登录
  return http.request({
    url: 'wx/user/login',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 小程序获取用户信息
export function getUserInfo(data) {
  return http.request({
    url: 'wx/user/info',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 小程序手机号登录
export function phoneLogin(data) {
  return http.request({
    url: 'wx/user/getPhoneAndLogin',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//获取验证码
export function getCode(data) {
  return http.request({
    url: 'msg/sendLoginVerCode',
    data,
    isSource: false,
    isSign: true
  })
}

// 退出登录
export function loginOutMp(data) {
  return http.request({
    url: 'wx/user/loginOut',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 校验openId是否生效
export function checkOpenId(data) {
  return http.request({
    url: 'checkOpenId',
    method: 'get',
    data,
    isSource: false,
    isSign: true
  })
}