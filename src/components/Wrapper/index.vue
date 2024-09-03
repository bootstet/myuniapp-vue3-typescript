<template>
	<view>
		<view class='page_wrapper'>
			<slot />
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

/**
* 页面的根布局
* 小程序中，token不存在时，mounted就调用接口校验登录，token不可用就弹出授权窗 (h5中跳到单独的登录页，比如：接口返回处)
* 授权窗中完成1.授权个人 2.授权手机号，
* 1.如果当前页面不需要登录则传入 needLogin:false，自行接受刷新传入方法refreshData和selfRefresh:true
*/
<script>
	import { toLogin } from '@/utils'
	import {
		wxLogin
	} from '@/api/login'

	export default {
		components: {
		},
		props: {
			// 页面是否需要登录
			needLogin: {
				type: Boolean,
				default: true
			},
			// 是否自行注册了刷新方法，由于小程序不支持$listeners
			selfRefresh: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				openLogin: false,
				tokenStr: ''
			}
		},
		async mounted() {
			// #ifdef MP
			if (this.needLogin && !this.$store.getters.token) {
				await this.getCode()
			}
			// console.log("this.$store.getters.token=", this.$store.getters.token)
			// #endif
		},
		// watch: {
			// #ifdef MP
			// '$store.getters.tokenUseful'(newVal, oldVal) {
				// console.log("wrapper 中watch -- newVal,oldVal", newVal, oldVal)
				// if (this.needLogin) {
				// 	if (!newVal) {
						// 显示弹窗
						// this.openLogin = true
					// } else {
						// this.openLogin = false

						// console.log("this.selfRefresh=", this.selfRefresh)
						// 如果有注册刷新方法
						// if (this.selfRefresh) {
						// 	this.$emit('refreshData')
						// 	return
						// }

						// 由于每个页面都有监听，一旦需要重启
						// 多个页面都会调用该方法，目前只会重启最后一个页面
						// 最好还是应该在具体页面里处理刷新问题
						// if (getApp().globalData.pageRestart) {
						// 	getApp().globalData.pageRestart = false

						// 	// 登录成功，重新打开当前页面
						// 	const pages = getCurrentPages()
						// 	const routePath = pages[pages.length - 1].route

						// 	// TODO: 如果tab页有修改，此处相应进行修改
						// 	if (routePath == 'pages/home/index' ||
						// 		routePath == 'pages/order/index' ||
						// 		routePath == 'pages/my/index'
						// 	) {
						// 		uni.reLaunch({
						// 			url: "/" + routePath
						// 		})
						// 	} else {
						// 		uni.redirectTo({
						// 			url: "/" + routePath
						// 		})
						// 	}
						// }
					// }
				// }
			// }
			// #endif
		// },
		methods: {
			/**
			 * 尝试使用code值进行登录
			 */
			getCode() {
				uni.login({
					success:async (res) => {
						console.log("getCode", res)
						if (res.code) {
							//发起网络请求
							await this.login(res.code)
						} else {
							// this.$u.toast('登录失败！')
							const str = res.errMsg || ''
							this.$u.toast('获取code异常' + str)
						}
					},
					fail: (err) => {
						this.$u.toast('获取code fail！')
					}
				})
			},
			/**
			 * 调用登录
			 */
			async login(wxCode) {
				const res = await wxLogin({
					miniAppType: 2,
					code: wxCode,
					appId: getApp().globalData.appId
				})
				console.log('wxLogin=', res)
				// TODO：用于测试，后面移除
				// res.registFlag = false
				if (res && res.registFlag) {
					if (this.selfRefresh) {
						// 刷新数据
						if(res.token) this.$store.dispatch('common/setToken', res.token)
						this.$store.dispatch('common/setSource', res.orgId)
						this.$store.dispatch('common/setUserInfo', res)
						this.$emit('refreshData')
						return
					}else{
						toLogin()
					}
				} else {
					// 需要重新登录
					// this.tokenStr = res.token || ''
					// this.openLogin = true
					toLogin()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page_wrapper {
		height: 100vh;
		font-family: 'PingFangSC-Regular', 'PingFang SC', sans-serif;
		color: #333;
		// 给苹果底部小白条留出空间
		padding-bottom: calc(env(safe-area-inset-bottom));
	}
</style>
