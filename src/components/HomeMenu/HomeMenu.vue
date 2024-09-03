<template>
  <view>
    <view v-for='item in list' :key="item.type" class='pt_30 list-content pb_20 mb_20'>
      <view class="section flex_row" v-if="item.title">
        <view class="section-icon"></view>
        <text class="section-title">{{item.title}}</text>
      </view>
      <scroll-view class='over_x' scroll-x>
        <view class='list-wrapper ptb_30'>
          <view class='list-ul flex_c_center br_16'
            v-for='t in item.children' :key='t.title'
            @click='goJump(t)' c-click>
            <u-image width="68" height="68" :fade="false" mode='aspectFit'
              :src="t.imgUrl">
              <u-loading slot="loading"></u-loading>
            </u-image>
            <view class='list-li-title' :style="{'width': t.width?t.width:item.width}">
              {{t.title}}
            </view>
            <view v-if="t.signText" class="sign">{{t.signText}}</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>
<script>
import {
  mapGetters
} from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  computed: {
    ...mapGetters(['cdcId'])
  },
  methods: {
    /**
     * 跳转
     */
    goJump(item) {
      console.log('source', this.cdcId)
      //外链
      if(!item.link) {
        this.$u.toast('敬请期待!')
        return
      }
      if(item.linkType==1) {
        self.location.href = item.link
        return
      }
      let url = ''
      if(item.link.indexOf('?') == -1) {
        url = item.link + '?source='+this.cdcId
      } else {
        url = item.link + '&source='+this.cdcId
      }
      uni.navigateTo({
        url: url
      })
    },
  }
}
</script>
<style scoped lang="scss">
  .list-content {
    background: #FFFFFF;
    border-radius: 20rpx;
    .section {
      .section-icon {
        width: 4rpx;
        height: 20rpx;
        background: #00A3FF;
        border-radius: 2rpx;
        margin-right: 10rpx;
      }
      .section-title {
        font-size: 32rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #2C2F37;
        line-height: 45rpx;
      }
    }
    .list-wrapper {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: -41rpx;
      .list-ul {
        width: calc(100% / 3);
        flex-shrink: 0;
        margin-bottom: 41rpx;
        position: relative;
        .sign {
          position: absolute;
          left: 50%;
          bottom: -30rpx;
          transform: translateX(-50%);
          width: 100rpx;
          height: 30rpx;
          background: #32C5FF;
          border-radius: 15rpx;
          font-size: 22rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          text-align: center;
        }
        .list-li-title {
          font-size: 26rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 400;
          color: #475266;
          text-align: center;
          word-wrap:break-word;
          word-break:normal;
          margin-top: 12rpx;
        }
      }
    }
  }
</style>