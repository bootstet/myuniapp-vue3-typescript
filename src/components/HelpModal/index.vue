<template>
  <view>
    <view class="modal_wrapper">
      <u-modal
        v-model="modalshow"
        :show-title="false"
        :show-confirm-button="false"
        :show-cancel-button="false"
        :mask-close-able="false"
      >
        <view>
          <view class="modal-content">
            <!-- <view>该疫苗已被<text class="c_f65 ft_weight">五联疫苗</text>替换，加入将移除</view>
							<view>替换的疫苗接种记录，您确定要继续？</view> -->
            <view class="modal_close" @click="closeModal" c-click>
              <u-image
                width="30"
                height="30"
                :show-loading="false"
                :fade="false"
                src="https://static.zhil.cloud/h5/paimiao/1ghr6p20icon_popup_close@2x.png"
              ></u-image>
            </view>
            <slot name="cont"></slot>
          </view>
          <view
            v-if="hasButtom"
            class="modal-button-box"
            :style="[isButtonReverse ? buttonReverse : '']"
          >
            <view
              :class="[
                type === 1 ? 'modal-button-q' : 'modal-button-s',
                'pubclass',
              ]"
              @click="handelLClick" c-click
              >{{ leftButtonText }}</view
            >
            <view class="mr_width"></view>
            <view
              :class="[
                type === 1 ? 'modal-button-s' : 'modal-button-q',
                'pubclass',
              ]"
              @click="handelRClick" c-click
              >{{ rightButtonText }}</view
            >
          </view>
        </view>
      </u-modal>
    </view>
  </view>
</template>


<script>
export default {
  props: {
    modalshow: {
      type: Boolean,
      default: false,
    },
    hasButtom: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Number,
      default: 1,
    },
    isButtonReverse: {
      type: Boolean,
      default: false,
    },
    leftButtonText: {
      type: String,
      default: "取消",
    },
    rightButtonText: {
      type: String,
      default: "确认",
    },
    names: {
      type: String,
      default: "modalshow",
    },
  },
  data() {
    return {
      buttonReverse: {
        flexDirection: "row-reverse",
      },
    };
  },
  mounted() {},

  methods: {
    handelLClick() {
      this.$emit("handelLeftClick", false);
    },
    handelRClick() {
      this.$emit("handelRightClick", false);
    },
    closeModal() {
      this.$emit("handelClose", { names: this.names });
    },
  },
};
</script>

<style lang="scss" scoped>
.modal_wrapper {
  .modal_close {
    position: absolute;
    right: 30rpx;
    top: 30rpx;
  }
  .modal-content {
    padding: 60rpx 40rpx;
    font-size: 28rpx;
    position: relative;
  }
  .modal-button-box {
    display: flex;
    justify-content: center;
    margin-bottom: 40rpx;
    // flex-direction: row-reverse;
    .mr_width {
      width: 20rpx;
    }
    .pubclass {
      width: 240rpx;
      height: 80rpx;
      border-radius: 40px;
      font-weight: bold;
      line-height: 80rpx;
      text-align: center;
    }
    .modal-button-s {
      background: #f2f3f5;
      color: #878d99;
    }
    .modal-button-q {
      background: #00a3ff;
      color: #fff;
    }
  }
}
</style>
