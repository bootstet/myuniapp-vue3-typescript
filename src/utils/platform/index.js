import { getQueryString } from '@/utils'

const handlejJudge = (platform) => {
  const appName = getQueryString('appName') || localStorage.getItem('appName')
  const rejectAuthList = platform
  // 如果是小程序环境内直接返回
  if (rejectAuthList.some(item => item === appName)) {
    return true
  }
  return false
}

// 是否在微信小程序中  https://developers.weixin.qq.com/community/develop/doc/00022e37c78b802f186750b5751000
const isInWechatMP = () => {
  return (navigator.userAgent.match(/micromessenger/i) && navigator.userAgent.match(/miniprogram/i)) || window.__wxjs_environment === 'miniprogram';
};


// 判断是否在自带浏览器中
export const isBrowser = () => handlejJudge(['browser']) && !isInWechatMP()

// 判断是否在腾讯健康小程序中
export const isTx = () => handlejJudge(['tx']) && isInWechatMP()

// 判断是否在健康陕西小程序
export const isShaanxiJk = () => handlejJudge(['shaanxi']) && isInWechatMP()

// 判断是否在湘易办(app)环境
export const isXyb = () => handlejJudge(['xyb']) && !isInWechatMP()

// 判断是否在支付宝环境
export const isZfb = () => handlejJudge(['al']) && !isInWechatMP()

// 判断是否在爱联环境小程序
export const isAl = () => handlejJudge(['aiLianMini']) && !isInWechatMP()

// 判断是否在爱联环境App
export const isAlApp = () => handlejJudge(['aiLianApp'])