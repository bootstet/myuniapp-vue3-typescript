
const createTxCaptcha = require("./instance/txCaptcha.js")
const createClCaptcha = require("./instance/clCaptcha.js") // 动态加载、勿用import

/**
 * 区分返回那种验证码
 * 返回验证码示例，这里需根据后台返回的验证码类型来区分引入那种验证码，用promise来处理
 * @returns promise
 * 
 */
const getCaptchaInstance = () => new Promise((resolve,reject) => {
  let createCaptcha = createClCaptcha.createClCaptcha || '2' // 默认腾讯
  const sliderChannel = localStorage.getItem('sliderChannel')
  // 1-创蓝  2-腾讯云  默认腾讯云
  if (sliderChannel === '2') {
    createCaptcha = createTxCaptcha.createTxCaptcha
    resolve(createCaptcha)
  }
  resolve(createCaptcha)
})

export default getCaptchaInstance