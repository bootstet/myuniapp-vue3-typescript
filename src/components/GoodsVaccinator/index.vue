<template>
	<u-popup v-model="show" round="16rpx" mode="bottom" @close="close" @open="open" closeable>
		<view class="vaccinator-box">
      <text class="vaccinator-title">选择就诊人</text>
      <scroll-view scroll-y="true" style="height: 623rpx;">
        <u-radio-group
          v-model="vaccinator"
          :wrap="true"
          class="vaccinator-ul"
          @change="vaccinatorChange"
          active-color='#00A3FF'>
          <u-radio
            v-for="item in vaccinatorList"
            :key="item.id"
            :name="item.id"
            class='vaccinator-li'>
            <view class='vaccinator-left'>
              <text class="vaccinator-name">
                {{item.name}}
              </text>
              <text class="vaccinator-info">
                {{item.sex}} {{item.birthday}}
              </text>
            </view>
          </u-radio>
        </u-radio-group>
        <view
          v-if="vaccinatorList.length<5"
          class="add mt_10"
          @click="addVaccinator(id, source)" c-click>
          <u-icon name="plus" color="#00A3FF" size="35" class="mr_10"></u-icon>
          <text>添加</text>
        </view>
      </scroll-view>
		</view>
	</u-popup>
</template>
<script>
  export default {
    props: {
      vaccinatorList: {
        type: Array,
        default: []
      },
      id: {
        type: Number | String,
        default: ''
      },
      source: {
        type: Number | String,
        default: ''
      },
    },
    data() {
      return {
        vaccinator: '',
        show: true
      }
    },
    methods: {
      /**
       * 添加就诊人
       */
      addVaccinator(id, source) {
        this.$uni.navigateTo({ //去添加就诊人
          url: `/pages/vaccinator/order?redirect=/pages/goods/index?id=${id}&source=${source}&subscription=1`
        })
      },
      vaccinatorChange(event) {
        this.$emit('getVaccinatorId', event)
      },
      open() {
      },
      close() {
        this.$emit('closeHandle', false)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .vaccinator-box {
    padding: 40rpx;
    padding-bottom: 60rpx;
    padding-bottom: calc(env(safe-area-inset-bottom) + 60rpx);
    border-radius: 16rpx 16rpx 0 0;
    // background-color: #ff0000;
    .vaccinator-title {
      font-size: 32rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #2C2F37;
      display: block;
      text-align: center;
      margin-bottom: 40rpx;
    }
    .vaccinator-ul {
      width: 100%;
      .vaccinator-li {
        border-bottom: 1px solid #EEEEEE;
        padding-bottom: 30rpx;
        margin-bottom: 30rpx;
        overflow: hidden;
        display: block;
        position: relative;
        /deep/.u-radio__icon-wrap {
          float: right;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
        /deep/.u-radio__label {
          float: left;
        }
        .vaccinator-left {
          .vaccinator-name {
            font-size: 28rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            display: block;
          }
          .vaccinator-info {
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            display: block;
            margin-top: 10rpx;
          }
        }
      }
      .vaccinator-li:last-child {
        border: none;
      }
    }
    .add {
      width: 600rpx;
      height: 90rpx;
      margin: 0 auto;
      background: #FFFFFF;
      border-radius: 64rpx;
      border: 2rpx solid #00A3FF;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #00A3FF;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
    }
  }
</style>