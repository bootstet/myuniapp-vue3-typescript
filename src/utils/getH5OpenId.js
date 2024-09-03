import wxAuthorize from '@/utils/wxAuthorize.js'
import store from '@/store'

/**
 * 获取h5时中公众号 对应的openId
 * 如果登录了，则调用接口获取是否已授权，进行重定向登录
 * wxAuthorize内部根据标识如果source发生变化才会调用
 */
 const getH5OpenId = () => {
	if (store.getters.token) {
		wxAuthorize().then(res => {
			console.log("getH5OpenId openid=***************************************", store.getters.userInfo.openId)
		})
	}
}

export default getH5OpenId