import { wxConfig, getUserInfo } from '@/api/common.js';
import wxAuthorize from '@/utils/wxAuthorize.js';
import wx from 'weixin-js-sdk'

export default async function config() {
    // let userInfo = await getUserInfo()
    let userInfo = await wxAuthorize()
	console.log(userInfo, 'userInfo')
    if(userInfo){
        let config = await wxConfig({ url: encodeURIComponent(window.location.href) })
        console.log(config, 'settting')
        if (config.wx_template_id) {
            let subTemplateId = config.wx_template_id
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: config.AppId, // 必填，公众号的唯一标识
                timestamp: config.timestamp, // 必填，生成签名的时间戳
                nonceStr: config.nonceStr, // 必填，生成签名的随机串
                signature: config.signature,// 必填，签名
                jsApiList: ['chooseInvoiceTitle'],
                openTagList: ['wx-open-subscribe']
            });
            return subTemplateId
        }else{
            return ""
        }
    }else{
        return ""
    }
}
