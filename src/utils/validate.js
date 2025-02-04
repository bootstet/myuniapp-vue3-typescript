/***************************
 * 处理表单验证相关的一些常规方法
 * ↓↓↓↓↓↓↓ 使用正则判断 ↓↓↓↓↓↓↓
 ***************************/

 export default {
  // 手机号码
  isMobile: str => {
    const reg = /^1[3-9]\d{9}$/
    return reg.test(str)
  },
  isCode: str => {
    var reg =/^\d{6}$/;
    return reg.test(str);
  },
  // 身份证号码
  isIdCard: str => {
    const reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
    return reg.test(str)
  },
  isChinese: str => {
    const reg = /[\u4e00-\u9fa5]+/gi
    return reg.test(str)
  },
  isDepositAccountName: str => {
    const reg = /^[A-Z\s]+$/
    return reg.test(str)
  },
  isNumber: str => {
    const reg = /^\d+$/
    return reg.test(str)
  }
}
