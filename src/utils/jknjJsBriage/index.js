const u = navigator.userAgent

const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //根据输出结果true或者false来判断ios终端

const userBriData = '{ "type": "user", "path": "info", "jsCallBack" : "javacalljswithargs"}'

export const getJknjUserInfo = () => {
  if (isAndroid) {
    if (!window.jknjAndroid) {
      return 
    }
    return window.jknjAndroid.jkwyWebBridge(userBriData)
  }
  if (isIos) {
    if (!window.webkit) {
      return
    }
    return window.webkit.messageHandlers.jkwyWebBridge.postMessage(userBriData);
  }
}