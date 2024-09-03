<template>
  <view>
    <view class="p-r" @click="handleClick" c-click>
      <u-input
        :value="value"
        :placeholder="placeholder"
        :select-open="show"
        disabled
        :custom-style="inputCustomStyle"
      />
      <view class="input-icon p-a">
        <u-icon
          :size="iconSize"
          :color="iconColor"
          :name="iconName"
        >
        </u-icon>
      </view>
    </view>
    <u-picker
      v-model="show"
      @confirm="onConfirm"
      :params="params"
      mode="time"
      :disabled="disabled"
      :start-year="1903"
    />
  </view>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [Number, String],
    },
    placeholder: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      default: 80
    },
    disabled: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => ({
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true
      })
    },
    // 下拉列图标颜色
    iconColor: {
      type: String,
      default: '#CBCBCB',
    },
    // 下拉列图标类别
    iconName: {
      type: String,
      default: 'arrow-right',
    },
    // 下拉列图标尺寸
    iconSize: {
      type: Number,
      default: 20
    },
    // 输入框的自定义样式
    inputCustomStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data () {
    return {
      show:  false
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) {
        return
      }
      this.show = true
    },
    onConfirm (val) {
      console.log(val);
      const { year, month, day, hour, minute } = val
      this.$emit('change' ,`${year}-${month}-${day} ${hour}:${minute}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.input-icon {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  text-align: right;
}
</style>