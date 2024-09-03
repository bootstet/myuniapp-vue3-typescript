<template>
  <u-popup
    v-model="visible"
    mode="center"
    border-radius="23"
    width="600"
    :mask-close-able="maskClose"
    id="shutdownAnnouncement"
    :closeable="true"
    :z-index="99999999999"
  >
		<view class="content p-r flex_c_center">
			<view class="c_2c fs_36 fw_bold t_c">公告</view>
			<text class="c_87 fs_28 mt_20 lh_50 word">
        <text>尊敬的用户：</text>
        <view class="text_indent_2">您好！</view>
        <view class="text_indent_2"> 为了提供更好的功能服务及体验，本公众号功能系统将在2023年11月30日00:00:00-04:00:00时间进行升级。在此期间，预约等页面将无法学习和访问。如有预约服务等需求请与11月29日23点前完成预约或升级后进行预约等相关服务。</view>
        <view class="text_indent_2">我们对给您带来的不便表示深感歉意，同时也非常感谢您的理解和支持。</view>
        <view class="text_indent_2">谢谢！</view>
      </text>
		</view>
	</u-popup>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    primaryBtn: {
      type: String,
      default: '',
    },
    cancelBtn: {
      type: String,
      default: '',
    },
    maskClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
      show(newVal){
        this.visible = newVal
      }
  },
  computed: {
    ...mapGetters(['imgUrl'])
  },
  methods: {
    open() {
      this.visible = true;
    }
  },
}
</script>
<style lang="scss" scoped>
.content {
  padding: 40rpx 40rpx 50rpx;
  .bg {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .word {
    letter-spacing: 1px;
  }
}
</style>