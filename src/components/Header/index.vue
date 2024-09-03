<template>
  <view
    class="c_f main_padding flex_row"
    :style="{
      height: height + 'px',
      paddingTop: padding + 'px',
      background: bgColor,
      color: fontColor,
    }"
  >
    <view class="p-r" v-if="isBack"
      ><view class="back p-a"
        ><u-icon name="arrow-left" size="36" @click="goBack" c-click></u-icon></view
    ></view>
    <view
      class="flex_box fs_32 t_h_1"
      :class="[align == 'center' ? 'plr_30' : '']"
      :style="{ textAlign: align }"
      >{{ title ? title : '' }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    bgColor: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: 'center',
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    fontColor: {
      type: String,
      default: '#fff',
    },
  },
  data() {
    return {
      height: 0,
      padding: 0,
    };
  },
  mounted() {
    const res = uni.getSystemInfoSync();
    const menuRect = uni.getMenuButtonBoundingClientRect();
    this.padding = res.statusBarHeight;
    this.height = menuRect.top + menuRect.height + 6;
  },
  methods: {
    goBack() {
      uni.navigateBack();
    },
    getHeight() {
      return this.height;
    },
  },
};
</script>

<style scoped>
.back {
  left: 0;
  top: -18rpx;
}
</style>
