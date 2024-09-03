<template>
  <view class="user-agreement-popup">
    <uni-popup
      :mask-click="false"
      ref="popup"
      type="center"
      class="pop-container"
      id="user-agreement-popup"
      width="600rpx"
    >
      <view class="welcome-section fs_28 c_91 fw_bold flex_c">
        <text>欢迎使用</text>
        <text>南京疫苗预约综合服务平台</text>
        <image class="img" src="https://static.zhil.cloud/zhil-web-h5/UserAgreementPopup/1gtab2p6img_chatthree@2x.png " />
      </view>
      <view class="welcome-content t_c">
        <view class="fs_36 c_2c fw_bold">疫苗预约上线啦！</view>
        <view class="fs_30 c_475266 mt_20 t_l">此版块服务由第三方提供，如有疑问，<br/>请咨询页面内的在线客服。</view>
        <view class="fs_24 checkbox mt_30 t_l">
          <u-checkbox-group>
            <u-checkbox
              v-model="checked"
              shape="circle"
              active-color="#0091FF"
              class="u-checkbox"
            >
              <view class="fs_24">
                已查阅并同意完整的
                <text class="c_91" @click="viewAgreement('jknjUserAgreement')" c-click>《用户协议》</text>
                和
                <br/>
                <text class="c_91" @click="viewAgreement('jknjPrivacyAgreement')" c-click>《隐私协议》</text>
              </view>
            </u-checkbox>
          </u-checkbox-group>
          <view class="tip fs_24 c_fc flex_row mt_20" v-if="errTip">
            <u-icon
              name="error-circle-fill"
              class="mr_5"
              size="28"
            />
            <text>请阅读并勾选《用户协议》和《隐私协议》</text>
          </view>
        </view>
        <view class="btn-container mt_40 flex_center">
          <view class="btn-item" @click="handleClose" c-click>取消</view>
          <view class="btn-item agree ml_20" @click="handleAgree" c-click>同意</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>
<script>
import { agreeProtocol } from '@/api/jknj'
import { getQueryString, getAppName } from '@/utils'
import store from '@/store'

export default {
  data() {
    return {
      checked: false,
      errTip: false,
    }
  },
  watch: {
    checked(newVal) {
      this.errTip = !newVal
    },
  },
  methods: {
    /**
     * 查看协议
     */
    viewAgreement(type) {
      window.open(`/fileStatic/${type}.html`, '_blank')
    },
    handleClose() {
      this.$refs.popup.close()
    },
    open() {
      this.$refs.popup.open("center")
    },
    async handleAgree() {
      try {
        if(!this.checked) {
          this.errTip = true
          return
        }
        const appName = getQueryString('appName') || getAppName()
        const params = {
          userId: store.getters.userInfo.userId || null,
          orgId: store.getters.source || getQueryString('source'),
          type: 3,// 类型：1-橄榄云小程序，2-机构小程序，3-机构公众号
          channel: appName || null,
        }
        const res = await agreeProtocol(params)
        console.log('res===', res)
        this.handleClose()
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .user-agreement-popup {
    .welcome-section {
      background: #DFF1FF;
      border-radius: 20rpx;
      padding: 25rpx 30rpx 75rpx 30rpx;
      position: relative;
      width: 540rpx;
      margin: 0 auto;
      .img {
        position: absolute;
        width: 159rpx;
        height: 159rpx;
        top: -40rpx;
        right: 20rpx;
      }
    }
    .welcome-content {
      width: 100%;
      background: #FFFFFF;
      border-radius: 24rpx;
      padding: 40rpx;
      transform: translateY(-40rpx);
      .checkbox {
        color: #666;
        .u-checkbox {
          align-items: baseline!important;
        }
      }
      .btn-container {
        .btn-item {
          width: 240rpx;
          height: 80rpx;
          border-radius: 24rpx;
          border: 2rpx solid #0091FF;
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0091FF;
          line-height: 80rpx;
        }
        .agree {
          background: #0091FF;
          color: #fff;
        }
      }
    }
  }
</style>