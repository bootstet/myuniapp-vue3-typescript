import store from '@/store'
import { getIsRequest, login, getIsRequestH5 } from '@/api/common.js'
import {
  getQueryString,
  isJknjApp,
  isTx,
  getMiniProgram,
  isZfb,
  isBrowser,
  isXyb,
  isShaanxiJk,
  isWeiXin,
  isAl,
  isAlApp
} from '@/utils/index'
import { currentUser } from "@/api/common.js";
import setToken from "@/utils/loginTools.js";
import Cookies from 'js-cookie'

export function authorizaFun(callUrl) {
  const href = `${getApp().globalData.baseUrl}template/auth_code?source=${store.getters.source}&url=${callUrl}`;
  window.location.href = href;
}


export default function wxAuthorize(redirectUrl) {
  return new Promise(async (resolve, reject) => {
    // 商品详情预览状态下不进行授权
    const isClick = getQueryString('isClick')
    const type = getQueryString('type') || ''
    const sourceType = getQueryString('sourceType') || ''
    const cAuth = getQueryString('cAuth') || '' // cAuth=>分账组织授权的标识
    if (['2', '3'].includes(isClick) || type === 'news') return
    if ((sourceType == 1 || cAuth) && store.getters.source) resolve() //cdc单独授权，无需判断后续
    //是否需要微信授权
    const { isRequest } = await getIsRequestH5()
    const miniprogram = (await getMiniProgram()) || false
    // 链接中有open_id不进行授权, 本地有对应机构的open_id不授权,在微信端中才去授权
    if (
      isRequest == 1 &&
      !getQueryString('open_id') &&
      !isJknjApp() &&
      !isTx() &&
      !miniprogram &&
      !isZfb() &&
      !isBrowser() &&
      !isXyb() &&
      !isShaanxiJk() &&
      !isAl() &&
      !isAlApp()
    ) {
      let toUrl = ''
      if (redirectUrl) {
        toUrl = clearUrlSourceType(redirectUrl) || redirectUrl
        toUrl = encodeURIComponent(toUrl);
        // 关闭当前页，比如登录页
        uni.navigateBack()
      } else {
        let toHref = window.location.href;
        toUrl = clearUrlSourceType(toHref) || toHref
        toUrl = encodeURIComponent(toUrl);
      }
      // isRequest 为1 清除token
      
      const tokenData = uni.getStorageSync('tokenData')
      const newData = { ...tokenData, source: ''}
      store.dispatch("common/setTokenData", newData);

   
      authorizaFun(toUrl)
    } else {
      resolve()
    }
  })
}

//清除sourceType
function clearUrlSourceType(href) {
  let index = href.indexOf('&sourceType')
  if(index > -1){
    return href.substr(0,index) + href.substr(index + 13)
  }else{
    return href;
  }
}
