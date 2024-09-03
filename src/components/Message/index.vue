<template>
  <view>
    <!--  #ifdef  MP-WEIXIN -->
    <view @click="handBespeak" c-click>
      <slot></slot>
    </view>
    <!--  #endif -->
    <!-- #ifdef H5 -->
    <view :style="btnStyle" class="h5btn-wrapper">
      <!-- 组件按钮 -->
      <view @click="eventHandle" c-click>
        <slot></slot>
      </view>
      <!-- 有模板id、签名成功、支持微信开放标签 覆盖在普通按钮上响应点击事件 -->
      <view v-if="h5TmpId && !signFail && wxOpenTagSign && supportWxTag && !isErrorDevice" class="wrapper">
        <wx-open-subscribe
          :template="h5TmpId"
          :id="btnId"
          :style="btnClass"
        >
        <script type="text/wxtag-template" slot="style">
          <style>
            .subscribe-btn {
              color: #fff;
              width: 100%;
              height: 100%;
              background-color: #07c160;
              position: absolute;
              left:50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border-radius: 20px;
            }
          </style>
        </script>
        <script type="text/wxtag-template">
          <button class="subscribe-btn">
            {{btnText}}      
          </button>
        </script>
        </wx-open-subscribe>
      </view>
      
    </view>
    <!--  #endif -->
  </view>
</template>

<!-- 
封装微信公众号订阅通知，小程序订阅通知 
 -->
<script type="text/ecmascript-6">
import SubscribeMessage, { mesType } from '@/utils/subScribeMsg/subScribeMsg.js'
import store from '@/store'
import { javaWxConfig } from '@/api/common.js'
import wxAuthorize from '@/utils/wxAuthorize.js'
import newWxAuthorize from '@/utils/newWxAuthorize.js'
import {
  mapGetters
} from 'vuex'
import wx from 'weixin-js-sdk'

export default {
  data() {
    return {
      h5TmpId: '',
      signFail: false,
	    showSubscribe: this.initShow,
      supportWxTag: true,  // 是否支持微信开放标签、兼容低版本ios 安卓 微信版本不支持开放标签问题
      wxOpenTagSign: false, // 微信开放标签是否注册成功
      isErrorDevice: false

    }
  },
  filters: {
    formatId(type) {
      const { templateIdList } = store.getters
      if (Object.prototype.toString.call(type) === '[object Array]') {
        return type.reduce((acc, cur) => {
          acc.push(templateIdList.filter(item => item.templateId === cur)[0]?.wxTemplateId)
          return acc
        }, [])
      } else {
        const result = templateIdList.filter(item => item.templateId === type)[0]?.wxTemplateId
        return [result]
      }
    }
  },
  props: {
    /**
     * 订阅后去执行的回调函数
     */
    handCallback: {
      type: Function,
      default: () => {},
    },
    /**
     * 取消订阅后去执行的回调函数，这里看具体业务场景，根据业务场景定制
     */
    rejectCallBack: {
      type: Function,
      default: () => {},
    },
    /**
     * template Id
     */
    temId: {
      type: Array | Number,
      default: () => {}
    },
    btnStyle: {
      type: Object,
      default: () => {}
    },
    btnText: {
      type: String,
      default: '订阅通知'
    },
    btnClass: {
      type: String,
      default: 'display: inline-block;width: 100%;height: 100%;'
    },
    btnId: {
      type: String,
      default: 'subscribe-btn'
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {              
    '$store.state.common.templateId': {
      handler(val) {
        if (val && val.length > 0) {
          this.h5TmpId = SubscribeMessage.handleMsg(this.temId).join()
        }
      },
  		immediate: true
    },
  },
  async created() {
    this.judgeClientInfor()
    document.addEventListener('WeixinOpenTagsError', function (e) {
      this.supportWxTag = false
      console.error(e.detail.errMsg); // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
    });

    this.h5TmpId = SubscribeMessage.handleMsg(this.temId).join()
    console.log('h5TmpId', SubscribeMessage.handleMsg(this.temId).join())
  },
  async mounted() {
    // #ifdef H5
      this.h5Sign()
    // #endif
  },
  methods: {
    // 公众号签名
    async h5Sign() {
      const that = this
      await newWxAuthorize()
      await javaWxConfig({
          orgId: store.getters.source,
          url: `${location.origin}/`, // 全域名  兼容 ios
      }).then(data=>{
          console.log("wxconfig sign data =>",data)
          wx.config({
              debug: false, 
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature,// 必填，签名
              jsApiList: ['onMenuShareAppMessage'],
              openTagList: ['wx-open-subscribe', 'wx-open-subscribe-dialog']
          })
          wx.ready(function () {
            const btnId = this?.btnId || 'subscribe-btn'
            console.log('chenggong', btnId)
            that.wxOpenTagSign = true
            that.$nextTick(function() {
              let btn = document.getElementById(btnId);
              console.log('temId', that.temId)
              if (btn) {
                console.log('123', this.temId);
                btn.addEventListener('success', function(e) {
                  const detailInfo = JSON.parse(e.detail.subscribeDetails)
                  let status = null
                  // 只有一个订阅弹窗单独处理 4 订阅弹窗的消息类型
                  if (that.temId?.length > 0 && that.temId[0] === 4) {
                    status = JSON.parse(detailInfo[that.h5TmpId])['status']
                    that.subscribe(status)
                  } else {
                    if(that.handCallback) that.handCallback.bind(that.$root)()
                  }
                });
                btn.addEventListener('error', function(e) {
                  console.log('fail', e);
                  // that.signFail = true
                  if(that.handCallback) that.handCallback.bind(that.$root)()
                });
              } else {
                that.wxOpenTagSign = false
              }
            })
          });
          wx.error(function () {
            that.signFail = true
            console.log('wxConfig fail')
          })
      }).catch(e => {
        console.error('get config data fail', e)
        that.signFail = true
      })
    },
    // 用户订阅消息弹窗单独处理
    subscribe(status) {
      const that = this
      // 用户允许订阅
      if (status === 'accept') {
        //用户同意订阅该条 id 对应的模版消息
        console.log('temId', that.temId)
        if(that.handCallback) that.handCallback.bind(that.$root)()
      } else if (status === 'reject') {
        //  用户拒绝订阅 有reject就执行，否则统一执行handCallback方法
        if(that.rejectCallBack) {
          that.rejectCallBack.bind(that.$root)()
        } else {
          if(that.handCallback) that.handCallback.bind(that.$root)()
        }
      } else if (status === 'cancel') {
        //用户取消订阅该条 id 对应的模版消息
        if(that.handCallback) that.handCallback.bind(that.$root)()
      }
    },
    /**
     * 切换是否显示订阅控件
     */
    toggleShowSubscribe(show) {
      this.showSubscribe = show
    },
    handBespeak() {
      const that = this
      // 订阅消息类型，数组表示一次订阅多条数据，num表示一次订阅一条数据
      SubscribeMessage.requestSubscribeMessage(this.temId, () => {
        if (this.handCallback) this.handCallback.bind(that.$root)()
      })
    },
    eventHandle() {
      // h5TmpId && !signFail && wxOpenTagSign && supportWxTag && !isErrorDevice
      if (this.handCallback) this.handCallback.bind(this.$root)()
    },
    getSize() {
      const width = `${Number(this.btnStyle.width.replace(/rpx/, ''))/2}px`
      const height = `${Number(this.btnStyle.height.replace(/rpx/, ''))/2}px`
      this.width = width
      this.height = height
    },
    // 判断机型
    judgeClientInfor() {
      const { userAgent } = window.clientInformation
      console.log('userAgent', userAgent)
      const clientArr = []  
      this.isErrorDevice = clientArr.some(item => userAgent.includes(item))
    }
  },
}
</script>

<style scoped lang="scss">
	.h5btn-wrapper {
		position: relative;
		.wrapper {
			position: absolute;
      left:0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 999999999999;
      opacity: 0;
		}
	}
</style>



