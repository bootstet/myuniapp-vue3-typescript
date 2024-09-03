<template>
  <view class="radio-component" :class="{'flex_row flex_wrap flex_x_center pl_30 pr_30': shape === 'circle'}">
    <template v-for="(item, index) in list">
      <view
        :key="index"
        class="item mb_40"
        :class="{
          'active': (
            type === 0 ? selectedValue === item.extendValue : selectedValue[item.extendValue])
            || (type === 0 ? activeIndex === index : checkedIndex.includes(index)
          ),
          'circle': shape === 'circle'
        }"
        @click="handleSelect(item, index, type)" c-click
      >
        {{ item.extendValue }}
      </view>
    </template>
  </view>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => { return [] }
    },
    type: {
      type: Number,
      default: 0,// 0 单选 1 多选
    },
    // 已选中的值
    selectedValue: {
      type: String | Array,
      default: ''
    },
  },
  data() {
    return {
      activeIndex: '',// 单选选中的项
      shape: 'square',// 形状 square方形 circle圆形
      checkedIndex: [],// 多选选中的index
      checkedItem: [],// 多选选中的item
    }
  },
  watch: {
    list: {
      handler: function(newVal) {
        const listData = Object.assign([], newVal)
        const count = listData.filter(item => item.extendValue.length < 4)?.length
        // 每个选项值的文字长度小于4并且数组长度大于等于6 样式变为圆形展示
        if(listData && count === listData.length && listData.length >= 6) this.shape = 'circle'
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    handleSelect(item, index, type) {
      if(type === 0) {
        // 单选
        this.activeIndex = index
      }else {
        // 多选
        if(this.checkedIndex.includes(index)) {
          // 取消选择
          this.checkedItem.splice(index, 1)
          this.checkedIndex = this.checkedIndex.filter(c => c !== index)
          this.checkedItem = this.checkedItem.filter(k => k.index !== index)
        }else {
          // 选中
          this.checkedIndex.push(index)
          this.checkedItem.push({
            ...item,
            index
          })
        }
      }
      this.$emit('handleSelect', {
        type,
        value: type === 0 ? item : this.checkedItem
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .radio-component {
    height: 360rpx;
    overflow-y: auto;
    justify-content: start;
    .item {
      width: 600rpx;
      height: 100rpx;
      background: #F4F4F4;
      border-radius: 50rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: #2C2F37;
      line-height: 100rpx;
      text-align: center;
      margin: 0 auto 40rpx auto;
    }
    .active {
      background: #0091FF;
      color: #FFFFFF;
    }
    .circle {
      border-radius: 100%;
      width: 160rpx;
      height: 160rpx;
      line-height: 160rpx;
      margin: 0 60rpx 40rpx 0;
    }
    .circle:nth-child(3n) {
      // margin-right: 0;
      margin: 0 0 40rpx 0;
    }
  }
  .radio-component::-webkit-scrollbar {
    width: 8rpx!important;
    height: 2rpx!important;
    overflow: auto!important;
    background-color: #ccc!important;
    -webkit-appearance: auto!important;
    display: block;
  }
  .radio-component::-webkit-scrollbar-thumb {
    border-radius: 10rpx!important;
    box-shadow: inset 0 0 10rpx rgba(0, 0, 0, 0.2)!important;
    background: #ccc!important;
  }
  .radio-component::-webkit-scrollbar-track {
    background: #eee!important;
  }
</style>