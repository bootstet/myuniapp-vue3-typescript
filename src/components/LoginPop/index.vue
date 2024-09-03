<template>
  <div>
    <!-- popup弹窗id 别删，判断重复登录会用到 -->
    <uni-popup
      :mask-click="false"
      ref="popup"
      type="bottom"
      class="pop-container"
      id="new_login_popup"
      :safe-area="false"
    >
      <view class="page over_y">
        <view class="title">完善信息</view>
        <view class="close" @click="popClose" c-click></view>
        <view class="info"
          >手机号将用于登录校验、接收通知，请您如实填写本人信息</view
        >
        <u-form :model="form" ref="uForm" class="loginForm">
          <u-form-item class="loginItem" v-if="phoneType === 'input'" :border-bottom="false"	:style="{ borderBottom: `1rpx solid ${phoneBorderColor}`}">
            <u-input
              class="phoneInput"
              v-model="form.phone"
              placeholder="请输入您的手机号"
              :placeholder-style="placeholderStyle"
              :custom-style="customStyle"
              @focus="phoneCodeFocus"
              @blur="phoneveriCodeBlur"
            />
          </u-form-item>
          <u-form-item v-if="phoneType === 'select' && options.length === 1" class="loginItem" :border-bottom="false"	>
            <u-input
              class="phoneInput"
              v-model="form.phone"
              disabled
              placeholder="请输入您的手机号"
              :placeholder-style="placeholderStyle"
              :custom-style="customStyle"
            />
          </u-form-item>
          <u-form-item v-else-if="phoneType === 'select' && options.length > 1" class="loginItem" :border-bottom="false"	>
            <u-input
              class="phoneInput"
              v-model="form.phone"
              placeholder="请输入您的手机号"
              type="select"
              @click="onShowPhone"
              :custom-style="customStyle"
            >
            </u-input>
          </u-form-item>
          <u-form-item class="loginItem" :border-bottom="false" :style="{ borderBottom: `1rpx solid ${veriBorderColor}`}"	>
            <view class="flex_row w_100">
              <u-input
               class="phoneInput"
                v-model="form.code"
                placeholder="请输入验证码"
                maxlength="6"
                :placeholder-style="placeholderStyle"
                :custom-style="customStyle"
                @focus="veriCodeFocus"
                @blur="veriCodeBlur"
              />
              <view
                class="yzm ml_20"
                :class="{ yzm_dis: tips.includes('s') }"
                @click="sendCode"
                c-click
              >
                {{ tips }}
              </view>
            </view>
          </u-form-item>
        </u-form>
        <view class="tip fs_30 c_fc flex_row mt_20" v-if="errTip">
          <u-icon
            name="error-circle-fill"
            class="mr_5"
            size="28"
            v-if="errTip"
          ></u-icon
          >{{ errTip }}
        </view>
        <view
          size="default"
          shape="circle"
          :style="{
            width: '100%',
            height: '100rpx',
            'line-height': '100rpx',
            background: !form.phone ? '#F4F4F4' : '#0091FF',
            'border-radius': '24rpx',
            'font-size': '36rpx',
            'font-family': 'PingFangSC-Medium, PingFang SC',
            'font-weight': '500',
            color: !form.phone ? '#878D99' : '#FFFFFF',
            'text-align': 'center',
            border: 'none'
          }"
          :hair-line="false"
          class="mt_80"
          @click="loginHandle" c-click
          :loading="loginLoading"
          hover-class="none"
        >
          确定
        </view>
        <!-- 尾部 -->
        <view class="footer-login flex_row mt_40">
          <u-checkbox-group
            active-color="#00A3FF"
            shape="circle"
            class="checkbox"
          >
            <u-checkbox
              size="30"
              v-model="checkbox"
              @change="changeCheckbox"
            ></u-checkbox>
          </u-checkbox-group>
          <view class="footer-word fs_24"
            >阅读并同意<text class="c_91" @click="goJump(1)" c-click>《用户协议》</text
            >和
            <text class="c_91" @click="goJump(2)" c-click>《隐私政策》</text>
          </view>
        </view>
      </view>
    </uni-popup>


  </div>
</template>

<script type="text/ecmascript-6">
import { debounce, Storage, checkPhone } from "@/utils/index";
import { getCode, newLoginH5 } from "@/api/login.js";
import { loginPageStatics } from "@/utils/pageStatistics.js";
import { getPhoneListByOpenId, getOrgRelationList } from "@/api/common.js";
import store from "@/store";
import setToken from '@/utils/loginTools.js'
import { getQueryString, isTx, getMiniProgram } from '@/utils/index'
import { pointEvent } from '@/utils/point'
// import ha from '@/js_sdk/index';
export default {
  data() {
    return {
      form: {
        phone: "",
        code: "",
      },
      placeholderStyle:
        "font-size: 32rpx;font-family: PingFangSC-Regular, PingFang SC;font-weight: 400;color: #878D99;",
      customStyle: {
        "font-size": "32rpx",
        "font-family": "PingFangSC-Regular, PingFang SC",
        "font-weight": "900",
        color: "#2C2F37",
      },
      tips: "",
      errTip: "",
      loginLoading: false,
      checkbox: false,
      seconds: 60,
      options: [],
      show: false,
      phoneType: "input",
      loginCode: '',
      extendParams: {},
      phoneBorderColor: '#878d99',
      veriBorderColor: '#878d99'
    };
  },
  methods: {
    onShowPhone() {
      this.show = true;
    },
    async userLogin() {
      let params = {
        email: this.formLogin.email,
        password: this.formLogin.password,
      };
      const data = await userLogin(params);
      if (data.code === "00000") {
        this.$message.success("登录成功");
        this.login(data); // 登录成功回调
        this.close(); // 关闭弹窗
      } else {
        this.$message({
          message: data.message,
          type: "error",
        });
      }
    },
    codeChange(text) {
      this.tips = text;
    },
    open(param) {
      this.loginCode = param
      if (param == 3402) {
        const openId = uni.getStorageSync("open_id");
        getPhoneListByOpenId({})
          .then((res) => {
            if (res.length > 0) {
              this.phoneType = "select";
              this.form.phone = res[0];
              this.options = res.map((item) => ({
                value: item,
                label: item,
              }))
            } else {
              // 获取不到手机号
              this.phoneType = "input";
            }
          })
          .catch((error) => {
            // 拿不到手机号的情况下，让用户自己去填
            this.phoneType = "input";
            console.error(error);
          });
      } else {
        this.phoneType = "input";
      }
      if (Object.prototype.toString.call(param) === '[object Object]') {
        this.extendParams = param; 
      }
      // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
      this.$refs.popup.open("bottom");
    },
    codeChange(text) {
      this.tips = text;
    },
    sendCode() {
      if (!this.checkbox) {
        this.errTip = "请阅读并勾选《用户协议》和《隐私协议》";
        return;
      }
      //向后端请求验证码
      if (this.$refs.uCode.canGetCode) {
      if (checkPhone(this.form.phone)) {
        this.errTip = "";
        getCode({
          phone: this.form.phone,
        }).then((res) => {
          this.$refs.uCode.start();
          this.$u.toast("验证码已发送");
        });
      } else {
          this.errTip = "请输入正确的手机号码";
          this.$u.toast("请输入正确的手机号码");
        }
      } else {
        this.$u.toast("倒计时结束后再发送");
      }
    },
    goJump(type) {
      // 跳转页面
      // 1 服务协议；2 隐私协议
      const url = type === 1 ? '/hybrid/html/userAgreement.html' : '/hybrid/html/privacyAgreement.html'
      const title = type === 1 ? '知了云用户协议' : '知了云隐私政策'
      this.$refs.popup.close()
      uni.navigateTo({
        url: `/pages/webview/index?url=${encodeURIComponent(url)}&title=${title}&sign=${this.loginCode}`
      })
    },
    changeCheckbox() {
      if (!this.checkbox && this.errTip == "请阅读并勾选《用户协议》和《隐私协议》") {
        this.errTip = "";
      }
    },
    /**
     * 登录
     */
    loginHandle: debounce(function () {
      if (!this.form.phone) {
        return;
      }
      if (!checkPhone(this.form.phone)) {
        this.errTip = "请输入正确的手机号码";
        return;
      }
      if (!this.form.code) {
        this.errTip = "请输入验证码";
        return;
      }
      if (!this.checkbox) {
        this.errTip = "请阅读并勾选《用户协议》和《隐私协议》";
        return;
      }
      this.errTip = "";
      /** 请求登录 */
      this.loginReq();
    }, 500),
    /**
     * 公众号登录
     */
    async loginReq() {
      const storage = new Storage() // 有过期时间限制
      const distributorId = storage.get('__DISTRIBUTORID__')
      //调后端登录h5
      this.loginLoading = true;
      const userInfoHis = uni.getStorageSync("userInfoHis");
      const url = window.location.href;
      const title = document?.title || ''
      const miniprogram = await getMiniProgram() || false
      try {
        // const { code, txCode } = this.extendParams
        const txHealthCode = uni.getStorageSync('txHealthCode') || ''
        const params = {
          orgId: uni.getStorageSync("indexUrl").indexOf("activePage/home/index") !== -1 ? this.cdcId : this.source,
          phone: this.form.phone,
          verifyCode: this.form.code,
          miniAppType: userInfoHis.hisOrgCode ? 5 : 3,
          header: this.fromPath,
          fromPageUrl: url,
          fromPageTitle: title
        }
        if (txHealthCode && isTx() && miniprogram) {
          params.code = txHealthCode
        }
        if (distributorId) {
          params.distributionPromotionId = distributorId
        }
        const res = await newLoginH5(params);
        // 数据统计
        loginPageStatics({
          userId: res.userId,
          url: url,
        });
        const { token, isNewUser } = res // isNewUser  是否是新用户（0、是 1、否）
        // 给关联的机构设置token
        await setToken(token)
        store.dispatch("common/setUserInfo", res);
        store.dispatch("common/setIsLogin", true);
        this.$u.toast("登录成功");

        let hinaParams = {
          is_register : isNewUser == 1 ?true:false,
          register_status:'成功'
        } 

        this.$trackingHina('sign_in',hinaParams)

        this.$refs.popup.close();
        // 登录成功后埋点
        this.mapPoint(isNewUser)
        // #ifdef  H5
        this.redirectTo();
        // #endif
      } catch (error) {
        console.log("error", error);
        let hinaParams = {
          is_register : false,
          register_status:'失败'
        } 
        this.$trackingHina('sign_in',hinaParams)
        this.loginLoading = false;
      }
    },
    popClose() {
      this.$refs.popup.close();
    },
    confirmPhone(data) {
      const phone = data[0].label
      this.form.phone = phone
    },
    jumpToHomePage() {
      // #ifdef  H5
      const indexUrl = uni.getStorageSync("indexUrl")
      const router =
        indexUrl === 'pages/home/index'
          ? 'switchTab'
          : 'reLaunch'
      uni[router]({
        url: `/${indexUrl}`,
      })
      // #endif
      // #ifdef MP-WEIXIN
      uni.switchTab({
        url: "/pages/home/index",
      })
      // #endif
    },
    redirectTo() {
      // 判断当前页面是就诊人管理、收货人管理、我的订阅时，登录成功后跳转到‘我的’页面 除了健康沛县
      const routePath = [
        'pages/vaccinator/index',
        'pages/vaccinator/order',
        'pages/address/index',
        'pages/address/setup',
        'pages/subscribe/index',
        'pages/subscribe/detail',
      ]
      const hash = window.location.hash
      const hashIndex = routePath.some((item) => hash.indexOf(item)!=-1)
      const peixian = getQueryString('peixian') || false
      if(hashIndex && !peixian) {
        store.dispatch("common/setIsLogin", true)
        uni.switchTab({
            url: '/pages/my/index'
        })
        return
      }
      // 订单列表和订单详情，确认页，校验用户不通过时，跳转到首页
      console.log('orderCode=', store.state.order.orderCode)
      if(store.state.order.orderCode === 25011) {
        this.jumpToHomePage()
        return
      }
      setTimeout(() => {
        window.location.reload()
      }, 50);
    },
    mapPoint(isNewUser) {
      const url = window.location.href
      const ps = getQueryString('ps')
      // 不是专题来跳转过来的商项不进行埋点
      if (ps !== 'map') {
        return
      }
      // isNewUser  是否是新用户（0、是 1、否）
      const type = isNewUser === 1 ? 'login' : 'register'
      const params ={
          eventLink: url,
          type // 登录注册埋点
      }
      pointEvent(params)
    },
    veriCodeFocus() {
      this.veriBorderColor = '#0091FF'
    },
    veriCodeBlur() {
      this.veriBorderColor = '#878d99'
    },
    phoneCodeFocus() {
      this.phoneBorderColor = '#0091FF'
    },
    phoneveriCodeBlur() {
      this.phoneBorderColor = '#878d99'
    }
  },
};
</script>

<style scoped lang="scss">
.page {
  position: relative;
  width: 100%;
  height: 1140rpx;
  padding: 80rpx 60rpx 0 60rpx;
  background-color: #fff;
  border-radius: 60rpx 60rpx 0 0;
  background-image: url('https://static.zhil.cloud/microAdminPc/vaccinePackagingBox/166064036679AlJH.png');
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center bottom;
  z-index: 9999;
  .close {
    position: absolute;
    top: 40rpx;
    right: 40rpx;
    display: inline-block;
    width: 30rpx;
    height: 30rpx;
    color: skyblue;
    background-image: url('https://static.zhil.cloud/microAdminPc/vaccinePackagingBox/166064036398UMzaCB.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #2c2f37;
    line-height: 64rpx;
  }
  .info {
    margin-top: 20rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #878d99;
    line-height: 42rpx;
  }
  .loginForm {
    margin-top: 20rpx;
    .loginItem {
      height: 130rpx;
      border-bottom: 1rpx solid rgb(135, 141, 153);
      padding: 4rpx 0!important;
      .phoneInput {
        margin-top: 50rpx;
      }
    }
  }
  .yzm {
    margin-top: 50rpx;
    height: 70rpx;
    line-height: 70rpx;
    padding: 0 35rpx;
    border-radius: 35rpx;
    text-align: center;
    // border: 2rpx solid #00A3FF;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #0091ff;
    /*  #ifndef  H5  */
    font-size: 20rpx;
    /*  #endif  */
  }

  .yzm_dis {
    color: #ccc;
    border: 1px solid #ccc;
  }
  .footer-login {
    display: flex;
    justify-content: center;
  }
}
.pop-container {
  z-index: 99999999;
}

.u-round-circle::after {
  border-radius: 0 !important;
}
</style>