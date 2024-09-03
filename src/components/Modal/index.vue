<template>
	<view>
		<u-modal
      v-model="visible"
      :title="title"
      :show-confirm-button="false"
      :title-style="{
        'fontWeight': 'bold',
      }"
    >
      <view class="slot-btn">
        <div class="modal-content" v-html="content"></div>
        <view :class="{'flex_row flex_x_between bottom-btn-box': showCancelButton}">
          <view class="cancel-btn" v-if="showCancelButton" @click="cancel" c-click>取消</view>
          <view class="primary-btn" :class="{'mlr_0': showCancelButton}" @click="closePopup" c-click>确认</view>
        </view>
			</view>
    </u-modal>
	</view>
</template>
	
<script>
	export default {
		data() {
			return {
        visible: false,
			}
		},
    props: {
      // 是否显示弹窗
      show: {
        type: Boolean,
        default: true
      },
      // 弹窗内容
      content: {
        type: String,
        default: ''
      },
      // 弹窗标题
      title: {
        type: String,
        default: '温馨提示'
      },
      // 是否显示取消按钮
      showCancelButton: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      show(newVal){
        this.visible = newVal
      }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup', true)
      },
      cancel() {
        this.$emit('cancel')
      },
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
    padding: 0 60rpx;
  }
  .bottom-btn-box {
    padding: 0 50rpx;
  }
  .cancel-btn {
    width: 260rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #F4F4F4;
    border-radius: 40px;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #475266;
    text-align: center;
    margin-bottom: 40rpx;
    margin-right: 20rpx;
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
  .mlr_0 {
    margin-left: 0;
    margin-right: 0;
  }
</style>