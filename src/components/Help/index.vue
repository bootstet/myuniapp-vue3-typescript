<template>
  <view v-if="show" id="help-pop-model">
    <movable-area class="movableArea">
      <movable-view class="movableView" direction="all" x="600rpx" y="800rpx">
        <view class="help_wrapper">
          <u-image
            @click="iconClick" c-click
            class="images"
            width="120"
            height="133"
            :show-loading="false"
            :fade="false"
            :src="data.iconType === 1 ? iconUrl : data.oscillationImageUrl"
          ></u-image>
        </view>
      </movable-view>
    </movable-area>
    <modal :modalshow="modalshow" :hasButtom="false" @handelClose="handelClose">
      <template v-slot:cont>
        <view class="modal-box">
          <view class="modal-cont">
            <view class="flex_self_center h1 mb_20">添加小助手</view>
            <view class="flex_self_center fs_28 c_47 tips">{{data.tips || ''}}</view>
            <view class="flex_self_center">
              <u-image
                @click="modalshow = true" c-click
                class="images"
                width="360"
                height="360"
                :show-loading="false"
                :fade="false"
                :src="data.imageUrl"
              ></u-image>
            </view>

            <view
              class="flex_self_center er-button"
              >长按识别二维码</view
            >
          </view>
        </view>
      </template>
    </modal>
  </view>
</template>


<script>
import modal from "@/components/HelpModal";
import { isJknj, getAppName } from '@/utils/index'

export default {
  components: {
    modal,
  },
  data() {
    return {
      show: true,
      modalshow: false,
      customStyle: {
        width: "450rpx",
        height: "90rpx",
        borderRadius: "46rpx",
        color: "#ffffff",
        background: "#00A3FF",
        marginTop: "78rpx",
        marginBottom: "78rpx",
      },
      data: {},
      iconUrl: 'https://static.zhil.cloud/zhil_h5_paimiao/img_zxzs.png'
    };
  },
  methods: {
    showHandle(data) {
      this.data = data
    },
    handelClose() {
      this.modalshow = false;
    },
    iconClick() {
      const { iconType, redirectLink } = this.data
      if (iconType == 2) {
        if(!redirectLink) return
        let url = redirectLink
        if(isJknj()) url += redirectLink.indexOf('?') === -1 ? `?appName=${getAppName()}` : `&appName=${getAppName()}`
        return window.location.href = url
      }
      this.modalshow = true
    }
  },
};
</script>

<style lang="scss" scoped>
.movableArea {
  position: fixed!important;;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
  .movableView {
    width: 130rpx;
    height: 130rpx;
    pointer-events: auto;
  }
}
.help_wrapper {
  .images {
    position: fixed;
    right: 0;
    bottom: 10%;
  }
}
.modal-box {
  // display: flex;
  // justify-content: center;
  .modal-cont {
    display: flex;
    flex-direction: column;
    position: relative;
    .flex_self_center {
      display: flex;
      align-self: center;
    }
    .tp {
      position: absolute;
      width: 360rpx;
      height: 360rpx;
      left: 70rpx;
      opacity: 0;
      z-index: 999;
    }
  }
}
.er-button {
  justify-content: center;
  width: 460rpx;
  height: 100rpx;
  line-height: 100rpx;;
  border-radius: 50rpx;
  color: #000;
  // background: rgb(0, 163, 255);
  margin-top: 40rpx;
  // margin-bottom: 40rpx;
}
.tips {
  line-height: 50rpx;
  text-align: center;
}
</style>
