<template>
  <view class="tarbar">
    <view :style="{ height: height, background: bg, color: color }">
      <view class="tarbar_list_ul flex_row flex_x_around h_100">
        <view
          class="tarbar_list_li flex_c_center"
          v-for="(item, index) in list"
          :key="index"
          @click="setSelected(index, item.pagePath, item.login)" c-click
          :style="{ width: 'calc(100% / ' + list.length + ')' }"
        >
          <view>
            <u-image
              class="tarbar-img"
              :src="current == index ? item.selectedIconPath : item.iconPath"
              :fade="false"
              :show-loading="false"
            />
          </view>
          <view
            :style="current == index ? 'color:' + activeColor : ''"
            class="mt_6"
            >{{ item.text }}</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getNavList } from "@/utils/common";
export default {
  data() {
    return {
      isGZ: true,
    };
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return getNavList(["首页", "预约订单", "我的"]);
      },
    },
    current: {
      type: [Number, String],
      default: 0,
    },
    height: {
      type: [Number, String],
      default: () => "100rpx",
    },
    bg: {
      type: String,
      default: "#fff",
    },
    color: {
      type: String,
      default: "#CBCBCB",
    },
    activeColor: {
      type: String,
      default: "#00A3FF",
    },
  },
  methods: {
    setSelected(index, url, login) {
      // #ifdef  H5
        if (index == 0) {
          url = "/" + uni.getStorageSync("indexUrl");
        }
        const type = url != "pages/home/index" ? "reLaunch" : "switchTab";
        // #endif
        // #ifdef MP-WEIXIN
        const type = "switchTab";
        // #endif

        if (this.current == index) return;
        // this.$emit('update:current', index)

        // #ifdef MP

        uni[type]({
          url,
        });
        // #endif

        // #ifdef H5
        //设置login参数为false时
        if (login === false) {
          uni[type]({
            url,
          });
          return;
        }
        if (index !== 0) {
          this.$uni[type]({
            url,
          });
        } else {
          uni[type]({
            url,
          });
        }
        // #endif
    },
  },
};
</script>

<style lang="scss">
//为了加载时与原生tabBar看起来无差异 使用px
.tarbar {
  width: 100%;
  box-shadow: 0 -10rpx 10rpx 0 rgba(153, 153, 153, 0.1);
  background-color: #ffffff;
  height: 50px;
  font-size: 11px;
  .tarbar-img {
    width: 24px !important;
    height: 24px !important;
  }
}

.safe_bottom {
  padding-bottom: 0;
}

.tarbar_list_ul {
  /* padding: 0rpx 60rpx; */
}

/* .tarbar_list_li {
		max-width: 100rpx;
	} */
.tarbar_list_li {
  padding-top: 4rpx;
}
</style>
