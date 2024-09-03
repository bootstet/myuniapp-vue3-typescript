<template>
  <Wrapper :selfRefresh="true">
    <view class="wrapper flex_c_center bg_f4">
      <view class="wrapper-top w_100">
        <!-- 我的信息展示 -->
        <view class="info_wrapper flex_row pt_60 pl_50">
          <!--  #ifdef  MP-WEIXIN -->
          <!-- <view class="avatar br_r over_h mr_30">
						<open-data type="chooseAvatar" class="avatar br_r"></open-data>
					</view> -->
          <!-- <open-data type="userNickName" lang="zh_CN" class="c_f fs_32 mb_10"></open-data> -->
          <button
            class="avatar br_r over_h mr_30 mp-avatar"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar"
          >
            <u-image width="100%" height="100%" :src="avatarUrl"></u-image>
          </button>
          <u-input
            type="nickname"
            class="c_f fs_32 mb_10"
            placeholder="获取昵称"
            placeholder-style="color:#FFFFFF;font-size:34rpx;"
            :custom-style="{
              fontSize: '34rpx',
              color: '#FFFFFF',
            }"
          />
          <!--  #endif -->
          <!--  #ifndef  MP-WEIXIN -->
          <u-image
            width="110"
            height="110"
            shape="circle"
            class="avatar mr_30"
            :src="
              !userInfo.userId
                ? 'https://static.zhil.cloud/zhil_web_h5/pov-h5/my/img_my_tx_def@2x.png'
                : userInfo.avatar
                ? userInfo.avatar
                : 'https://static.zhil.cloud/zhil_web_h5/pov-h5/my/2.0/img_logo_2.png'
            "
          >
          </u-image>
          <view class="flex_c">
            <view class="c_f fs_34 fw_bold mb_10" @click="loginHandle" c-click>
              {{ isLogin ? userInfo.name : "注册/登录" }}
            </view>
            <view class="c_f fs_28">
              {{ isLogin ? userInfo.phone : "登录获取更多惊喜" }}
            </view>
          </view>
          <!--  #endif -->
        </view>

        <!-- 功能 -->
        <view class="special fs_30">
          <view
            class="item flex_row flex_x_between"
            v-for="(item, index) in list"
            :key="item.title"
            :class="{
              pane: (index + 1) % 3 === 0,
              'top-radius': index % 3 === 0 && index !== 0,
            }"
            @click="goJump(item)" c-click
          >
            <view class="left flex_row">
              <u-image
                width="50"
                height="50"
                :fade="false"
                :show-loading="false"
                mode="scaleToFill"
                :src="item.imgurl"
              ></u-image>
              <view class="ml_20">{{ item.title }}</view>
            </view>
            <u-icon name="arrow-right" color="#ccc" size="20"> </u-icon>
          </view>
        </view>

        <view v-if="isLogin" class="logout block_center" @click="logout" c-click
          >退出登录</view
        >
      </view>
      <u-toast ref="uToast"></u-toast>
      <!-- navList与otherNavList的长度是同步的 故只判断navList也是可以的 -->
      <nav-bar
        class="w_100"
        :current="navList.length - 1"
        :list="!isDefault ? otherNavList : navList"
      />
    </view>
  </Wrapper>
</template>

<script>
import Wrapper from "@/components/Wrapper";
import NavBar from "@/components/NavBar/NavBar.vue";
import { mapState, mapGetters } from "vuex";
import { hitOrg, peixianOrg } from "@/utils/expand.js";
import { loginOut, loginOutMp } from "@/api/login";
import { getNavList } from "@/utils/common";
import store from "@/store";
import Cookies from "js-cookie";
import { getQueryString } from '@/utils/index'

const source = getQueryString('source') || store.state.common.source || '';

export default {
  components: {
    Wrapper,
    NavBar,
  },
  data() {
    return {
      list: [
        {
          title: "我的预约订单",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_order@2x.png",
          url: `/pages/order/index?source=${source}`,
        },
        {
          title: "就诊人管理",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_jzr@2x.png",
          url: `/pages/vaccinator/index?source=${source}`,
        },
        {
          title: "收货人管理",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_dz@2x.png",
          url: `/pages/address/index?source=${source}`,
        },
        {
          title: "我的订阅",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_appointment@2x.png",
          url: `/pages/subscribe/index?source=${source}`,
        },
        {
          title: "关于我们",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_int@2x.png",
          url: `/noticePage/about/index?source=${source}`,
        },
      ],
      isDefault: true,
      navList: [],
      otherNavList: [],
      avatarUrl:
        "https://static.zhil.cloud/zhil_web_h5/pov-h5/my/img_my_tx_def@2x.png",
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.common.userInfo,
      source: (state) => state.common.source,
      hisOrgInfo: (state) => state.common.hisOrgInfo,
      loginCode: state => state.common.loginCode,
      isLogin: (state) => state.common.isLogin,
    }),
    ...mapGetters(['isJoinNIP']),
  },
  onLoad() {
    // 用户登录的机构是否为HIS机构，是的话添加我的挂号
    if (this.hisOrgInfo?.joinHis) {
      const obj = {
        title: "我的挂号",
        imgurl:
          "https://static.zhil.cloud/zhil_web_h5/pov-h5/icon_my_guahao@2x.png",
        url: "/hisPage/myRegistration/index",
      };
      this.list.splice(1, 0, obj);
    }
    // 健康沛县定制化nav
    this.handleNav();
	  this.handleGZ();
  },
  onShow() {
    // #ifdef  H5
    this.updateNavInfo();
    this.handleGZ();
    // #endif
  },
  mounted() {
    uni.hideTabBar();
    // #ifdef H5
    // 重定向获取openId
    //getH5OpenId();
    // #endif
  },
  methods: {
    /**
     * 贵州免规系统nav
     */
    handleGZ() {
      const isJoinNIP = uni.getStorageSync("isJoinNIP");
      if (isJoinNIP) {
        this.navList = getNavList(['首页', '预约订单', '我的'])
        this.navList[1] = {
          pagePath: `/gzPage/message/index?source=${this.source}`,
          iconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/order.png",
          selectedIconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/order-active.png",
          text: '消息',
        }
      }
    },
    /**
     * 如果是健康沛县 不显示预约订单一栏
     */
    handleNav() {
      const peixian = peixianOrg(this.source);
      this.navList = peixian
        ? getNavList(["首页", "", "我的"])
        : getNavList(["首页", "预约订单", "我的"]);
      if (!peixian) return;
      // 更新菜单信息
      const orderIndex = this.list.findIndex(
        (item) => item.title === "我的预约订单"
      );
      const outpatientService = [
        {
          title: "我的门诊挂号",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/icon/1gg9nfhsicon_my_guahao.png",
          url: "",
        },
        {
          title: "我的门诊缴费",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/icon/1gg9nf68icon_my_pay.png",
          url: "",
        },
      ];
      const electronicHealthRecord = [
        {
          title: "电子健康档案",
          imgurl:
            "https://static.zhil.cloud/zhil_web_h5/icon/1gg9nei4icon_my_dangan.png",
          url: `/pages/vaccinator/index?peixian=true&source=${this.source}`,
        },
      ];
      this.list.splice(orderIndex + 1, 0, ...outpatientService);

      const visitorsIndex = this.list.findIndex(
        (item) => item.title === "就诊人管理"
      );
      this.list.splice(visitorsIndex + 1, 0, ...electronicHealthRecord);

      //隐藏收货人管理
      const addressIndex = this.list.findIndex(
        (item) => item.title === "收货人管理"
      );
      this.list.splice(addressIndex, 1);
    },
    /**
     * 微信小程序 获取头像
     */
    onChooseAvatar(e) {
      console.log("e", e);
      const { avatarUrl } = e.detail;
      this.avatarUrl = avatarUrl;
    },
    /**
     * 江宁妇幼定制化需求 更改nav文案
     */
    updateNavInfo() {
      // #ifdef  H5
      hitOrg(this.source).then((res) => {
        const { type } = res;
        if (type === 1) {
          this.isDefault = false;
          // 修改nav ’预约订单‘改为’预约记录‘
          this.otherNavList = getNavList(["首页", "预约记录", "我的"]);
          this.list = [
            {
              title: "我的预约",
              imgurl:
                "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_order@2x.png",
              url: `/pages/order/index?source=${this.source}`,
            },
            {
              title: "就诊人管理",
              imgurl:
                "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_jzr@2x.png",
              url: `/pages/vaccinator/index?source=${this.source}`,
            },
            {
              title: "查看/修改建档信息",
              imgurl:
                "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_jdxx@2x.png",
              url: `/arcPage/archivesWomenChildren/list?source=${this.source}`,
            },
            {
              title: "我的订阅",
              imgurl:
                "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_appointment@2x.png",
              url: `/pages/subscribe/index?source=${this.source}`,
            },
            {
              title: "关于我们",
              imgurl:
                "https://static.zhil.cloud/zhil_web_h5/pov-h5/user/2.0/icon_my_int@2x.png",
              url: `/noticePage/about/index?source=${this.source}`,
            },
          ];
        }
      });
      // #endif
    },
    goJump(item) {
      // 判断是否登录
      

      // 跳转页面
      if (!item.url) {
        this.$refs.uToast.show({
          type: "default",
          title: "功能正在开发中，敬请期待~",
        });
        return;
      }
      if (item.url.includes("/pages/order/index")) {
        // 贵州计免 跳转特定页面
        if(this.isJoinNIP) {
          const relativeId = uni.getStorageSync('relativeId') || ''
          if(relativeId.length > 0) {
            this.$uni.navigateTo({
            url: `/gzPage/appointment/list?source=${this.source}`,
          })
          return
          }else{
            this.$uni.navigateTo({
            url: `/pages/order/index`,
          })
          }
        }
        this.$uni.switchTab({
          url: `${item.url}?source=${this.source}`,
        });
      } else {
        this.$uni.navigateTo({
          url: `${item.url}`,
        });
      }
    },
    logout() {
      const _this = this;
      // #ifdef MP-WEIXIN
      let functionName = loginOutMp();
      // #endif
      // #ifdef  H5
      let functionName = loginOut();
      // #endif
      functionName.then((res) => {
        // #ifdef MP-WEIXIN
        if (res) {
          // #endif
          // #ifdef  H5
          if (res === "success") {
            // #endif
            // 退出登录，仅退出当前机构登录
            // 清除健康档案的本地缓存
            this.$trackingHina('sign_out',{})
            localStorage.removeItem("healthInformationForm");
            localStorage.removeItem("basicInformationForm");
            _this.$refs.uToast.show({
              type: "default",
              title: "退出登录成功",
            });
            this.$store.dispatch("common/setUserInfo", "");
            this.$store.dispatch("common/removeToken", this.source);
            _this.$store.dispatch("common/setIsLogin", false);
            Cookies.remove("userId");
            uni.setStorageSync("userId", "");
            uni.removeStorageSync("uuid");
            // #ifdef  H5
          }
          // #endif
          // #ifdef MP-WEIXIN
        }
        // #endif
      });
    },
    loginHandle() {
      
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-top {
  height: calc(100% - 50px);
  overflow-y: scroll;
  padding-bottom: 20rpx;
}
.info_wrapper {
  // 在小程序中高度偏小
  height: 230rpx;
  background-size: cover;
  padding-bottom: 60rpx;
  background-position: bottom;
  .mp-avatar {
    margin: 0;
    margin-right: 30rpx;
  }
  .avatar {
    width: 110rpx;
    height: 110rpx;
    background: #00a3ff;
    padding: 0;
  }
}

.special {
  margin: 20rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2c2f37;

  .item {
    background: #ffffff;
    box-shadow: 0 5rpx 18rpx 0 rgba(135, 141, 153, 0.13);
    // border-radius: 16rpx;
    padding: 25rpx 20rpx;
  }
  .item:first-child,
  .top-radius {
    border-top-left-radius: 16rpx;
    border-top-right-radius: 16rpx;
  }
  .item:last-child {
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
  }
  .pane {
    margin-bottom: 20rpx;
    border-bottom-left-radius: 16rpx;
    border-bottom-right-radius: 16rpx;
  }
}

.width {
  width: 80%;
}

.logout {
  width: calc(100% - 40rpx);
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: #ffffff;
  border-radius: 16rpx;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #878d99;
}
</style>
