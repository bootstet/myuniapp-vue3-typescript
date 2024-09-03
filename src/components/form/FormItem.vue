<template>
  <view class="form-item"  :id="domId">
    <view class="form-item-label" :class="{'form-item-required': required}" :style="customLabelStyle">
      {{prefix}}{{prefix ? '.' : ''}}{{label}}
    </view>
    <view :class="'form-item-control'+ ' '+paddingBottomClass">
      <ItemJudgeLogin :needLogin="needLogin">
        <slot></slot>
      </ItemJudgeLogin>
      <view v-if="!validStatus" class="error-text">{{validMessage}}</view>
    </view>
  </view>
</template>
<script>
import ItemJudgeLogin  from '@/components/ItemJudgeLogin'
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    needLogin: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: [String, Number],
      default: ''
    },
    controlBackgroundColor: {
      type: String,
      default: '#F4F4F4'
    },
    paddingBottomClass: {
      type: String,
      default: '',
    },
    customLabelStyle: {
      type: String,
      default: '',
    },
    validStatus: {
      type: Boolean,
      default: true
    },
    validMessage: {
      type: String,
      default: ''
    },
    domId: {
      type: Number,
      default: ''
    }
  },
  components: {
    ItemJudgeLogin
  }
}
</script>
<style lang="scss" scoped>
.form-item {
  position: relative;
  &:not(:last-child) {
    margin-bottom: 40rpx;
  }
  &-label {
    color: #878D99;
    font-size: 30rpx;
    margin-bottom: 10rpx;
  }
  &-required {
    &::before {
      content: '*';
      color: #F65551;
    }
  }
  &-control {
    min-height: 42rpx;
    border-bottom: 1px solid #EEEEEE;
  }
}
.form-item:last-child {
  .form-item-control {
    border: none;
  }
}

.error-text {
  color: #F65551;
}
</style> 