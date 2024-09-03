<template>
  <view class="backhome" @click="backHomepage" c-click>
    <image src="https://static.zhil.cloud/zhil_web_h5/jy/2.0/icon_button_home@2x.png" class="backhome-img"></image>
  </view>
</template>
<script>
export default {
  methods: {
    /**
     * 返回首页
     */
    backHomepage() {
      const type = uni.getStorageSync('indexUrl')!='pages/home/index'?'reLaunch':'switchTab'
      uni[type]({
        url: '/'+uni.getStorageSync('indexUrl')
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .backhome {
		position: fixed;
		bottom: 328rpx;
		bottom: calc(env(safe-area-inset-bottom) + 328rpx);
		left: 0;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		padding: 7rpx 6rpx 7rpx 18rpx;
		background-color: #ffffff;
		box-shadow: -3rpx 3rpx 10rpx 0 rgba(0, 184, 139, 0.15);
		border-radius: 0 100rpx 100rpx 0;
		.backhome-img {
			width: 68rpx;
			height: 68rpx;
			margin-left: 10rpx;
			display: block;
		}
	}
</style>