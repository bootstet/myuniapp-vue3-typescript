import store from '@/store'
import { toLogin } from '@/utils'
import md5 from 'js-md5'
import login from "@/utils/loginPop"; // 登录弹窗全局组件
import { getQueryString, isEmptyStrict, getToken,getMiniProgram,isShaanxiJk, isAl, isAlApp } from '@/utils/index'
import openIdWhile from '@/utils/openId.js'
import Cookies from 'js-cookie'
import newWxAuthorize, { authorizaFun } from '@/utils/newWxAuthorize.js'

// 接口请求
function http(config = { headers: {}}) {
  /**
   * enableResIntercept 是否响应启用拦截
   */
  const { enableResIntercept = true, data = {} } = config 
  const header = config.header ? JSON.parse(JSON.stringify(config.header)) : {}
  const source = getQueryString('source') || store.getters.source
  let token = getToken(source) 
  const openIdList= uni.getStorageSync('openIdList') || {}
  const healthSecret= uni.getStorageSync('healthSecret')
  
  let openId = openIdList[source]
  let miniAppType = store.getters.miniAppType
  if(uni.getStorageSync('userInfoHis').hisOrgCode) {
	  miniAppType = 5
  }
  if(sessionStorage.getItem('healthMiniType')) {
	  miniAppType = sessionStorage.getItem('healthMiniType')
  }

  let isMiniprogram = getMiniProgram() || false;
  let isShaanxiJks = isShaanxiJk() || false;
  
  if(isMiniprogram && isShaanxiJks){
    const userId =  store.getters.userInfo?.userId || ''
    header['channel'] = 'shaanxi' || ''
    header['userId'] = userId
  }
  
  if (isAlApp() || isAl()) {
  	  token = uni.getStorageSync('aiLianToken') || ''
	  header['channel'] = 'ai_lian'
  }
  
  header['accept'] = 'application/json'
  if (config.isSource && source) {
    Object.assign(data, {
      source: store.getters.source,
    })
  }
  /**
   * 请求头携带source（orgId）, 
   */
  header['source'] = source || ''
  if (config?.params?.source) {
    header['source'] =  config?.params?.source
  }
  header['miniAppType'] = miniAppType
  if (!isEmptyStrict(openId)) {
    header['openId'] = openId
  }
  if (token) {
    header['token'] = token
  }
  /**
   * 请求是否需要签名
   */
  if (config.isSign) {
    const dateMd5 = JSON.stringify(data) || ''
    const time = new Date().getTime()
    const sign = md5('gw.h5.web#000007|' + time + '|' + dateMd5)
    header['sign'] = sign
    header['reqDate'] = time
    header['appVersion'] = 'v1.0'
    header['appId'] = 'zhil-web-h5'
    if(healthSecret) {
      header['secret'] = healthSecret
    }
  } else {
    header['authorization'] = token || ''
    if (config.method && config.method.toLocaleUpperCase() === 'POST') {
      header['content-type'] = 'application/x-www-form-urlencoded'
    }
  }

  // 停机公告功能 暂时不需要用到
  // const curTime = new Date().getTime()
  // const startTime = '2022/06/17 22:00:00'
  // const startTimeDate = Date.parse(startTime)
  // const endTime = '2022/06/18 08:00:00'
  // const endTimeDate = Date.parse(endTime)

  return new Promise((resolve, reject) => {
    uni.request({
      url:
        (config.baseUrl
          ? config.baseUrl
          : config.isSign
          ? getApp().globalData.baseUrl
          : getApp().globalData.baseUrl2) + config.url, // 路径拼接
      method: config.method ? config.method : 'GET',
      data,
      header,
      timeout: config.timeout || 60000,
      dataType: config.dataType || 'json',
      responseType: config.responseType || 'text',
      // sslVerify: config.sslVerify ? config.sslVerify : true,
      // 设为false，处理iphoneX访问不了java接口的异常
      sslVerify: false,
      withCredentials: config.withCredentials || false,
      firstIpv4: config.firstIpv4 || false,
      success(res) {
        const {code} = res.data
        // 不启用拦截器直接返回请求结果
        if (!enableResIntercept) {
          return resolve(res.data)
        }
        //创建订单、预约单时的特殊判断
        if (
          res.data.code == 25000 &&
          res.data.msg.indexOf('您不符合预约条件') != -1
        ) {
          resolve(res.data)
          return
        }
        // 需要判断接口状态值的接口
				const toHomeCode = [
          'app/req/order.getOrderDetail',
          'app/req/order.addAppointment',
          'app/req/order.updateAppointmentDate',
          'app/req/order.getOrderDetail',
          'app/req/order.orderStatusCancel',
          'app/req/order.orderStatusRefunding'
        ]
				if(toHomeCode.includes(config.url)) {
					store.dispatch('order/setOrderCode', code)
				}
        switch (code) {
          case 200:
            //请求成功
            resolve(res.data.data)
            break;
          // 新用户登录
          case 3401: 
          case 3402:
            // 拦截h5/is_Request/v2接口
            if (config.url === 'h5/is_Request/v2') {
              resolve(res.data.data)
              return
            }
            // token过期清除token 重新授权
            const tokenData = uni.getStorageSync('tokenData')
            const newData = { ...tokenData, source: ''}
            store.dispatch("common/setTokenData", newData);

            const redirectUrl = encodeURIComponent(window.location.href)
            loginHandle(resolve, reject, code, config)
            // return newWxAuthorize(redirectUrl)

						store.dispatch('common/setLoginCode', code)
            // 用户未登录或者登录过期 设置是否登录的值
            store.dispatch('common/setIsLogin', false)
            break;
          case 25011:
            // 订单列表和订单详情，确认页，校验用户不通过时，跳转到首页
            if (store.getters.isLogin) {
              jumpToHomePage()
            }
            break;
          case 35000:
            const routeArr = [
              'app/req/customer.getAddressDetail',
              'app/req/customer.getRelativeDetail',
              'app/req/customer.getSubscribeDetail'
            ]
            if(routeArr.includes(config.url)) {
              // 已登录 跳转我的页面
              uni.switchTab({  
                url: '/pages/my/index'  
              })
            }
            break;
          case 37003:case 37004:case 37005:case 37006:
            reject(
              Object.assign(res, {
                url:
                  (config.baseUrl
                    ? config.baseUrl
                    : config.isSign
                    ? process.env.VUE_APP_URL
                    : process.env.VUE_APP_PHP_URL) + config.url, // 路径拼接
                method: config.method || 'GET',
                requestData: data,
                requestHeader: header,
              })
            )
            break;
          case 3405: 
            uni.navigateTo({url: "/pages/specialPage/delete"})
            break;
          default:
            // resolve(code)
            //请求失败
            reject(
              Object.assign(res, {
                url:
                  (config.baseUrl
                    ? config.baseUrl
                    : config.isSign
                    ? process.env.VUE_APP_URL
                    : process.env.VUE_APP_PHP_URL) + config.url, // 路径拼接
                method: config.method || 'GET',
                requestData: data,
                requestHeader: header,
              })
            )
            if (config.closeError) return
            // 提示‘商品不存在’时，屏蔽错误toast
            if(code === 100006 && (res.msg || res.data.msg) === '商品不存在') return
            error(res)
            break;
        }
      },
      fail(err) {
        resolve(err)
      },
    })
  })
}

/** 跳转到首页 */
function jumpToHomePage() {
  // #ifdef  H5
  const indexUrl = uni.getStorageSync("indexUrl")
  const router =
    indexUrl === 'pages/home/index'
      ? 'switchTab'
      : 'reLaunch'
  uni[router]({
    url: `/${indexUrl}`,
  })
  // #endif
  // #ifdef MP-WEIXIN
  uni.switchTab({
    url: "/pages/home/index",
  })
  // #endif
}

function error(res) {
  // console.log(res, 'err')
  let duration = 2000
  const hint = ['您还没完善本人信息，请前往：我的—就诊人管理—完善或添加本人信息后在填写档案。', '您提交的健康档案身份证非本人，请前往：我的—就诊人管理—完善或添加本人信息。']
  if((res.data.message&&hint.indexOf(res.data.message)!=-1) || (res.data.msg&&hint.indexOf(res.data.msg)!=-1)) {
    duration = 3000
  }
  uni.showToast({
    title: res.data.message || res.data.msg,
    icon: 'none',
    duration: duration,
  })
}

function loginHandle(resolve, reject, code, config) {
  // 清除健康档案的本地缓存
  localStorage.removeItem('healthInformationForm')
  localStorage.removeItem('basicInformationForm')

  //去登录，非h5
  // #ifdef MP
  toLogin()
  // #endif

  //去登录
  // #ifdef H5
  /**
    * 当多个接口同时返回未登录，导致url参数错误,
    * 如果当前路径已经login页面，不做跳转
    * fromPath 当前返回需要登录信息的接口名称
    */
  if (location.hash.includes('/pages/login/index')) {
    return
  }
  if (location.hash.includes('hisPage')) {
    const url = `/pages/login/index?fromPath=${config.url}&url=${encodeURIComponent(window.location.href.split('#')[1])}`
    uni.redirectTo({url})
  } else {
    login.install(code)
    reject('用户没有登录')
  }
  // #endif
}

export default {
  // POST请求
  post(url, data, config) {
    const configs = Object.assign(config ? config : {}, {
      url,
      data,
      method: 'POST',
    })
    return http(configs)
  },
  // GET请求
  get(url, config) {
    const configs = Object.assign(config ? config : {}, {
      url,
    })
    return http(configs)
  },
  request(config) {
    return http(config)
  },
}
 