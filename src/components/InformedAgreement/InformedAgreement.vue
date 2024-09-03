<template>
	<view class="wrapper">
		<image class="top-img" src="@/static/classify/img_agreement_bg@2x.png" />

		<view class="scroll-wrapper">
			<scroll-view scroll-y="true" style="height: 100%;">
				<!-- 使用富文本 -->
				<template v-if="info.informedConsent">
					<view class='p_t_60 m_l_r over_h'>
						<rich-text :nodes="richTextHandleImg(info.informedConsent)"></rich-text>
					</view>
				</template>

				<!-- 使用详情的数据 -->
				<template v-else>
					<!-- 疫苗介绍 -->
					<view class="title m_l_r p_t_60">
						疫苗介绍
					</view>
					<view class="sub-title m_l_r m_t_20">
						{{info.name}}
					</view>
					<view class='content m_t_10 m_l_r over_h'>
						<!-- <rich-text :nodes="richTextHandleImg(info.vaccineEffect)"></rich-text> -->
						<!-- 2022/5/12改为 desc -->
						<rich-text :nodes="richTextHandleImg(info.desc)"></rich-text>
					</view>
					<view style="height: 10rpx;"></view>
					<view class="content-item m_l_r m_t_10">
						<view class="round"></view>
						<view>
							适用性别：
						</view>
						<view>
							{{info.categoryGender == 0 ? "通用" : info.categoryGender == 1 ? "男" :info.categoryGender == 2 ? "女":''}}
						</view>
					</view>
					<view class="content-item m_l_r m_t_10">
						<view class="round"></view>
						<view>
							适用年龄：
						</view>
						<view>
							{{info.age}}
						</view>
					</view>
					<view class="content-item m_l_r m_t_10">
						<view class="round"></view>
						<view>
							生产厂商：
						</view>
						<view>
							{{info.manufacturer}}
						</view>
					</view>
					<view class="content-item m_l_r m_t_10">
						<view class="round"></view>
						<view>
							生产规格：
						</view>
						<view>
							{{info.specification}}
						</view>
					</view>

					<!-- 接种程序 -->
					<view class="title m_l_r m_t_60">
						接种程序
					</view>
					<view class='content m_t_20 m_l_r over_h'>
						<rich-text :nodes="richTextHandleImg(info.procedure)"></rich-text>
					</view>

					<!-- 预约须知 -->
					<template v-if="info.bookingNote">
						<view class="title m_l_r m_t_60">
							温馨提示
						</view>
						<view class='content m_t_20 m_l_r over_h'>
							<rich-text :nodes="richTextHandleImg(info.bookingNote)"></rich-text>
						</view>
					</template>

					<!-- 不良反应 -->
					<template>
						<view class="title m_l_r m_t_60">
							不良反应
						</view>
						<view class='content m_t_20 m_l_r over_h'>
							<rich-text :nodes="richTextHandleImg(info.reaction)"></rich-text>
						</view>
					</template>

					<!-- 接种禁忌 -->
					<template>
						<view class="title m_l_r m_t_60">
							接种禁忌
						</view>
						<view class='content m_t_20 m_l_r over_h'>
							<rich-text :nodes="richTextHandleImg(info.taboo)"></rich-text>
						</view>
					</template>

					<!-- 注意事项 -->
					<template>
						<view class="title m_l_r m_t_60">
							注意事项
						</view>
						<view class='content m_t_20 m_l_r over_h'>
							<rich-text :nodes="richTextHandleImg(info.attentionPoint)"></rich-text>
						</view>
					</template>
				</template>

				<template v-if="info.isSign">
					<!-- 电子签名 -->
					<view class="flex_row flex_x_between m_l_r m_t_60">
						<view class="title t_nw">
							电子签名<text class="c_FF3833">*</text>
						</view>
						<view v-if="!signImgUrl" class="contro-container">
							<view @click="handleReset" c-click class="esign-btn esign-btn-color1">重置</view>
						</view>
					</view>
					<view class="sign-wrapper">
						<view class="sign" @touchstart="touchStart">
							<!-- #ifdef H5 -->
							<vue-esign ref="esign" :isCrop="isCrop" :width="signWidth" :height="signHeight"
								:lineWidth="lineWidth" :lineColor="lineColor" class="esign-canvas"></vue-esign>
							<!-- #endif -->

							<!-- #ifdef MP-WEIXIN -->
							<vue-sign ref="esign" :showTitle="false" class="sign-canvas" @touchstart="touchStart"
								@imgResult="mpImgResult">
							</vue-sign>
							<!-- #endif -->

							<view v-if="!signTouch" class="hint">
								在此处签名
							</view>
							<u-image v-if="signImgUrl" class="esign-canvas" :width="signWidth + 'px'"
								:height="signHeight + 'px'" :src="signImgUrl" border-radius="16rpx"></u-image>
						</view>
					</view>
				</template>
				<u-checkbox v-else v-model="agree" shape="circle" class="m_l_r m_t_60 agree-box">
					确认已阅读并同意
				</u-checkbox>
			</scroll-view>
		</view>

		<view class="bottom-btn">
			<view class="btn-to" @click="handleGenerate(signImgUrl, signImgKey)" c-click>
				去预约
			</view>
		</view>
	</view>
</template>

/**
* 商品详情页，知情协议书
*/
<script>
	import OSS from 'ali-oss'
	// #ifdef MP-WEIXIN
	import VueSign from '@/components/Signature/index.vue'
	import uploadFile from '@/utils/obs/upload'
	// #endif
	// import getUploadToken from '@/utils/upload'
	import getUploadToken from '@/utils/uploadIntergrate'
	import {
		base64ToBlob
	} from '@/utils/baseToUrl'

	export default {
		components: {
			// #ifdef MP-WEIXIN
			VueSign
			// #endif
		},
		props: {
			info: {
				type: Object,
				default: {}
			},
			signImgUrl: {
				type: String,
				default: ''
			},
			signImgKey: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				lineWidth: 5,
				isCrop: false,
				lineColor: '#000000',
				signWidth: this.rpx2px(670),
				signHeight: this.rpx2px(300),
				signTouch: false,
				// 小程序签名文件
				mpSignFile: '',
				agree: false
			}
		},
		methods: {
			/**
			 * 处理小程序中 rich-text img 样式width:100%不成功
			 * 对富文本中，img标签增加宽度限制
			 */
			richTextHandleImg(richText) {
				// #ifdef MP-WEIXIN
				return richText ? richText.replace(/<img/g, '<img style="max-width:100%"') : ''
				// #endif
				// #ifdef H5
				return richText
				// #endif
			},
			/**
			 * rpx转为px
			 */
			rpx2px(rpx) {
				const systemInfo = uni.getSystemInfoSync()
				return rpx / (750 / systemInfo.windowWidth)
			},
			touchStart() {
				this.signTouch = true
			},
			/**
			 * 重置
			 */
			handleReset() {
				// #ifdef H5
				this.$refs.esign.reset()
				// #endif
				// #ifdef MP-WEIXIN
				this.$refs.esign.clear()
				this.mpSignFile = ''
				// #endif
				this.signTouch = false
			},
			async handleGenerate(signImgUrl, signImgKey) {
				console.log(this.info.isSign, 'ddddddddd');
				if(!this.info.isSign) {
					if(this.agree) {
						this.$emit("signResult", {
							typeName: signImgKey,
							tempUrl: signImgUrl
						})
					} else {
						this.$u.toast('请滑动到底部，勾选确认已阅读并同意')
					}
					return
				}
				console.log('signImgUrl------------', signImgUrl);
				console.log('signImgKey------------', signImgKey);
				if (signImgUrl && signImgKey) {
					this.$emit("signResult", {
						typeName: signImgKey,
						tempUrl: signImgUrl
					})
					return
				}
				// #ifdef H5
				this.$refs.esign
					.generate()
					.then(async (res) => {
						//文件上传路径
						const typeName = 'povH5/signature'
						//文件标识
						const marking = 'signature'
						const blob = await base64ToBlob({
							b64data: res
						})
						console.log('blob', blob)
						try {
							uni.showLoading({
								title: '电子签名上传中',
								mask: true
							})
							const result = await getUploadToken('private', blob, typeName, marking,
								`${Math.random().toFixed(4) * 10000}.png`)
							console.log('result', result)
							if (result) {
								const {
									tempUrl,
									typeName
								} = result
								this.$emit("signResult", {
									typeName,
									tempUrl
								})
							}
						} catch (error) {
							console.error('getUploadToken error', error)
						} finally {
							uni.hideLoading()
						}
					})
					.catch(err => {
						console.log("err=", err)
						if (err != 'Warning: Not Signned!') {
							this.$u.toast(`出错: ${err}`)
						} else {
							this.$u.toast('请滑动到底部，进行电子签名')
						}
					})
				// #endif

				// #ifdef MP-WEIXIN
				if (!this.mpSignFile) {
					this.$u.toast('请滑动到底部，进行电子签名')
					return
				}
				uploadFile({
					filePath: this.mpSignFile,
					dir: 'povH5/signature/',
					marking: 'signature',
					success: (res) => {
						console.log("上传成功=", res)
						if (result) {
							const {
								tempUrl,
								typeName
							} = res
							this.$emit("signResult", {
								typeName,
								tempUrl
							})
						}
					},
					fail: (err) => {
						this.$u.toast(`上传出错: ${err}`)
					}
				})
				// #endif
			},
			//将base64转换为文件..
			dataURLtoFile(dataurl, filename) {
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], filename, {
					type: mime
				});
			},
			mpImgResult(file) {
				this.mpSignFile = file
				// console.log('file----', file);
			}
		}
	}
</script>

<style lang="scss" scoped>
	$mainColor: #00A3FF;

	.wrapper {
		display: flex;
		flex-direction: column;
		padding-bottom: calc(env(safe-area-inset-bottom));

		/deep/ rich-text {
			img {
				max-width: 100%;
			}
		}

		/deep/ ul {
			padding-inline-start: 30rpx;
		}

		/deep/ ul li::marker {
			color: $mainColor !important;
		}


		.top-img {
			margin: 0 auto;
			width: 458rpx;
			height: 80rpx;
		}

		.scroll-wrapper {
			flex: 1;
			overflow: hidden;

			.m_l_r {
				margin-left: 40rpx;
				margin-right: 40rpx;
			}

			.p_t_60 {
				padding-top: 60rpx;
			}

			.m_t_60 {
				margin-top: 60rpx;
			}

			.m_t_10 {
				margin-top: 10rpx;
			}

			.m_t_20 {
				margin-top: 20rpx;
			}

			.title {
				font-size: 36rpx;
				font-weight: bold;
				color: $mainColor;
				line-height: 50rpx;
			}

			.sub-title {
				font-size: 30rpx;
				font-weight: bold;
				color: #475266;
				line-height: 42rpx;
			}

			.content {
				font-size: 26rpx;
				color: #475266;
				line-height: 40rpx;
			}

			.content-item {
				display: flex;
				font-size: 26rpx;
				color: #475266;
				line-height: 37rpx;

				.round {
					margin-top: 14rpx;
					margin-right: 15rpx;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: $mainColor;
				}
			}

			.contro-container {
				display: flex;
				width: 100%;
				justify-content: flex-end;

				.esign-btn {
					margin: 20rpx 5rpx 0 5rpx;
					text-align: center;
					font-size: 30rpx;
					font-weight: 400;
					color: #00A3FF;
					box-sizing: border-box;
					width: 120rpx;
					height: 50rpx;
					background-color: #FFFFFF;
					border-radius: 30rpx;
					border: 2rpx solid #00A3FF;
				}
			}

			.sign-wrapper {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 20rpx;
				padding-bottom: 20rpx;

				.sign {
					width: 100%;
					position: relative;
					height: 300rpx;

					.esign-canvas {
						position: absolute;
						top: 0;
						left: 40rpx;
						border-radius: 16rpx;
						overflow: hidden;
						background-color: rgba(244, 244, 244, 1) !important;
					}

					.sign-canvas {
						position: absolute;
						width: calc(100% - 80rpx);
						top: 0;
						left: 40rpx;
						border-radius: 16rpx;
						overflow: hidden;
						background-color: rgba(244, 244, 244, 1) !important;
					}

					.hint {
						position: absolute;
						top: 121rpx;
						left: 270rpx;
						font-size: 42rpx;
						font-weight: bold;
						color: #CCCCCC;
						line-height: 59rpx;
						pointer-events: none;
					}
				}
			}

			.agree-box {
				padding-bottom: 20rpx;
				/deep/ .u-checkbox__label {
					font-size: 34rpx;
				}
			}
		}

		.bottom-btn {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0 -10rpx 20rpx 0 rgba(71, 82, 102, 0.1);
			margin-bottom: constant(safe-area-inset-bottom); /*兼容 IOS<11.2*/
  		margin-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
			.btn-to {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 600rpx;
				height: 80rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #FFFFFF;
				background-color: #00A3FF;
				border-radius: 40rpx;
			}
		}
	}
</style>
