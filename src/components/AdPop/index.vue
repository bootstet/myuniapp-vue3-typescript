<template>
  <div>
    <!-- popup弹窗id 别删，判断重复登录会用到 -->
    <uni-popup
      ref="popup"
      type="bottom"
      class="pop-container"
      id="advertising_popup"
    >
      <view class="page">
        <view class="close" @click="popClose" c-click></view>
        <image class="image" :src="adGoodsInfo.advertisementImg"/>
        <view class="button" @click="goPage" c-click>更多服务</view>

      </view>
    </uni-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import store from "@/store";
import { mapState} from 'vuex'
import { isJknj, getAppName } from '@/utils/index'

export default {
  data() {
    return {
      adGoodsInfo: {
        advertisementImg: '',
        advertisementUrl: ''
      }
    }
  },
  comouted: {
    ...mapState({
				adGoodsInfo: state => state.order.adGoodsInfo
			})
  },
  mounted() {
    const adGoodsInfo = store.state.order?.adGoodsInfo
    this.adGoodsInfo = adGoodsInfo
  },
  methods: {
    close() {
      this.$refs.popup.open("center");
    },
    open(code) {
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("center");
    },
    popClose() {
      this.$refs.popup.close();
      store.dispatch("order/setIsAdGoods", false);
      store.dispatch("order/setAdGoodsInfo", {});
    },
    goPage() {
      const advertisementUrl = this.adGoodsInfo.advertisementUrl
      if(!advertisementUrl) return
      let url = advertisementUrl
      if(isJknj()) url += advertisementUrl.indexOf('?') === -1 ? `?appName=${getAppName()}` : `&appName=${getAppName()}`
      window.location.href = url
    }
  },
};
</script>

<style scoped lang="scss">
.page {
  position:relative;
  background: #FFFFFF;
  border-radius: 20rpx;
  border: 1px solid transparent;
  .close {
    position: absolute;
    top: -60rpx;
    right: 0;
    width: 48rpx;
    height: 48rpx;
    background-image: url('https://static.zhil.cloud/prod/h51gif0u5picon_pup_delete@2x.png');
    background-size: 100% 100%;
    background-position: 100% 100%;
  }
  .image {
    width: 540rpx;
    height: 300rpx;
    margin: 30rpx;
    border-radius: 24rpx;
  }
  .button {
    width: 400rpx;
    height: 80rpx;
    margin: 0 auto;
    margin-bottom: 30rpx;
    text-align: center;
    background: #0091FF;
    border-radius: 64rpx;
    font-size: 32rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 80rpx;
  }
}
</style>
