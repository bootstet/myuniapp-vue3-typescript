import requestForJava from '@/utils/request';
import http from '@/utils/request';


//获取验证码
export function get_yz_ma(params) {
    return http.request({
      url: 'msg/sendCode',
      method: 'GET',
      data: params,
      isSource: false,
      isSign: true
    })
}


// 提交查询信息
export function post_msg(params) {
    // return requestForJava({
    //     url: `/app/req/customer.getUserMedicalReport`,
    //     method: 'post',
    //     data: params,
    //     isSign: true
    // })
    return http.request({
      url: 'app/req/customer.getUserMedicalReport',
      method: 'POST',
      data:params,
      isSource: false,
      isSign: true
    })
}



