<template>
	<u-modal
		v-model="show"
		width="600"
		:show-title="true"
		:title-style="{
			'font-weight': '500',
			'font-size': '32rpx'
		}"
		@cancel="closeModal"
		:show-confirm-button="false"
		:show-cancel-button="false">
		<view class="slot-content">
			<view class="model-desc mt_20 mb_40">
				是否取消该挂号？
			</view>
			<view class="flex_row flex_x_center pb_40">
				<view class="btn cancel" @click="closeModal" c-click>取消</view>
				<view class="btn ml_20" @click="handleCancelRegistered" c-click>确认</view>
			</view>
		</view>
	</u-modal>
</template>

<script>
	export default {
		props: {
			show: {
			  type: Boolean,
			  default: true
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleCancelRegistered() {
				this.$emit('handleCancelRegistered', true)
			},
			closeModal() {
				this.$emit('closeModal', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.model-desc {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		text-align: center;
	}
	.btn {
		width: 240rpx;
		height: 80rpx;
		background: #00B5FF;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 80rpx;
		text-align: center;
		box-shadow: none;
	}
	.btn.cancel {
		background: #F2F3F5;
		color: #999999;
	}
</style>
