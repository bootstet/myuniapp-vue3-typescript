<template>
	<view>
		<u-modal v-model="show" :title="showTitle" :show-confirm-button="false">
      <view class="slot-btn">
        <text class="modal-content">{{content}}</text>
				<view class="primary-btn" @click="closePopup" c-click>确认</view>
			</view>
    </u-modal>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
			}
		},
    props: {
      show: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: ''
      },
	  showTitle: {
		  type: String,
		  default: '预约失败'
	  }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup', true)
      }
    }
	}
</script>
<style scoped lang="scss">
  .modal-content {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin: 20rpx 0 40rpx 0;
    display: block;
    text-align: center;
  }
  .primary-btn {
    width: 260rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #00A3FF;
    border-radius: 40px;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 40rpx;
  }
</style>