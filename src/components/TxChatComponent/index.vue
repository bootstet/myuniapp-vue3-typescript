<template>
  <div class="page">
    <movable-area class="movableArea">
      <movable-view class="movableView2" direction="all" x="650rpx" y="800rpx">
        <u-image
          @click="consult" c-click
          width="100rpx"
          height="100rpx"
          src="https://static.zhil.cloud/zhil_web_h5/home/page/img_zixun@3x.png"
        ></u-image>
      </movable-view>
    </movable-area>
  </div>
</template>

<script type="text/ecmascript-6">

import wx from 'weixin-js-sdk'
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    source: {
      type: String | Number,
      default: ''
    }
  },
  methods: {
    consult() {
				const id = this.id || ''
				const source = this.source || ''
				const url = `/pages/consumer-medicine/middle/main?bizId=vaccine&partnerId=100000551&pkgId=${id}&depaId=${source}&reseType=0`

				wx.miniProgram.navigateTo({
					url,
					success: function (val) {
					  console.log(val)
					},
					fail: function (err) {
						console.error('err', err)
					}
				})
			}
  },
}
</script>

<style scoped lang="scss">
.movableArea {
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
  .movableView2 {
    pointer-events: auto;
    height: auto;
  }
}
</style>
