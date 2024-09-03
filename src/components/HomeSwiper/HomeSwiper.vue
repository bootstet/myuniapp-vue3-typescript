<template>
  <view class='swiper-wrapper' v-if='bannerList.length'>
    <u-image
      v-if='bannerList.length == 1'
      width="100%"
      height='300'
      border-radius='6px'
      mode='aspectFill'
      :fade="false"
      :show-loading="false"
      :src="bannerList[0].img_url"
      @click="goJump(bannerList[0].link, 3)" c-click
	  
    />
    <swiper
      v-else
      class="swiper flex_center"
      :indicator-dots="true"
      :autoplay="true"
      indicator-color='rgba(225, 225, 225, .3)'
      indicator-active-color='#fff'
      :circular="true">
      <swiper-item
        v-for='item in bannerList'
        :key='item.title'
        @click="goJump(item.link, 3)" c-click>
        <u-image
        width="100%"
        height='100%'
        border-radius='10rpx'
        mode='aspectFill' 
        :fade="false"
        :show-loading="false"
        :src="item.img_url" />
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: []
    }
  },
  methods: {
    goJump(link, type) {
      this.$emit('goJump', {
        link,
        type
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .swiper-wrapper {
    .swiper {
      width: 100%;
      height: 300rpx;
    }
  }
</style>