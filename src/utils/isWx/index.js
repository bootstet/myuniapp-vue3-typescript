// 判断是不是微信平台
const isWeiXin = () => /MicroMessenger/i.test(window.navigator.userAgent)

export default isWeiXin
