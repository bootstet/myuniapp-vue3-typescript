<template>
  <view class="x-m">
    <view class="x-m-title" :style="titleStyle">
      <text v-if="showTitle">请在下面区域手写签名</text>
      <view
        v-if="showClearBtn"
        class="xm-t-clear"
        @click="clear(signatureImage)" c-click
      >
        <text>清除</text>
      </view>
    </view>
    <view
      class="x-m-con p-r"
      @touchend="drawEnd"
      :style="customStyle+(!borderShow?'border: none;':'')"
      v-if="!signatureImage"
    >
      <!-- 画布 -->
      <canvas
        ref="esign"
        disable-scroll="true"
        class="mycanvas"
        :id="canvasId"
        :canvasId="canvasId"
        @touchstart="touchstart"
        @touchmove="touchMove"
        @touchend="touchend"
        :style="!borderShow?'border: none;':''"
      >
      </canvas>
      <view v-if="!signTouch && isShowPrompt" class="hint">
        在此处签名
      </view>
    </view>
    <view v-else class="img-container">
      <image :src="signatureImage"></image>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    const canvasId = `mycanvas${this.id}`
    return {
      ctx: '',
      points: [],
      signature: '',
      lineWidth: 6,
      lineColor: '#000000',
      bgColor: '',
      resultImg: '',
      isCrop: false,
      position: false,
      canvasId,
      signTouch: false,
    }
  },
  props: {
    imgResult: {
      type: Function,
      default: () => {}
    },
    // 是否展示原始的标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否展示边框
    borderShow: {
      type: Boolean,
      default: true
    },
    // 签名框样式
    customStyle: {
      type: String,
      default: ''
    },
    // 同一个页面引用多个签名组件 需要区分id
    id: {
      type: Number,
      default: 0
    },
    // 是否展示清除按钮
    showClearBtn: {
      type: Boolean,
      default: true
    },
    // 标题的样式
    titleStyle: {
      type: String,
      default: ''
    },
    // 是否显示签名提示
    isShowPrompt: {
      type: Boolean,
      default: false
    },
    // 回显已上传的签名图片
    signatureImage: {
      type: String,
      default: '',
    },
  },
  components: {
  },
  created() {
    this.autograph()
  },
  watch: {
    customStyle(value) {
      console.log('value======', value)
    },
  },
  methods: {
    drawEnd() {
      this.confirm()
    },
    //创建并显示签名画布
    autograph() {
      this.showAutograph = true;
      //创建绘图对象
      this.ctx = uni.createCanvasContext(this.canvasId, this);
      //设置画笔样式
      this.ctx.lineWidth = 4;
      this.ctx.lineCap = "round"
      this.ctx.lineJoin = "round"
    },
    //触摸开始，获取到起点
    touchstart(e) {
      this.signTouch = true
	    this.$emit('touchstart')
      try {
        // #ifdef H5
        document.getElementById(this.canvasId).addEventListener('touchmove', function (e) {
          e.preventDefault();
        }, { passive: false });
        e.preventDefault()
        e.stopPropagation()
        // #endif

        let startX = e.changedTouches[0].x;
        let startY = e.changedTouches[0].y;
        let startPoint = {
          X: startX,
          Y: startY
        };
        this.points.push(startPoint);
        //每次触摸开始，开启新的路径
        this.ctx.beginPath();
      } catch (error) {
        console.error(error)
      }
    },
    //触摸移动，获取到路径点
    touchMove(e) {
      e = e || event
      e.preventDefault()
      let moveX = e.changedTouches[0].x;
      let moveY = e.changedTouches[0].y;
      let movePoint = {
        X: moveX,
        Y: moveY
      };
      this.points.push(movePoint); //存点
      let len = this.points.length;
      if (len >= 2) {
        this.draw(); //绘制路径
      }
    },
    // 触摸结束，将未绘制的点清空防止对后续路径产生干扰
    touchend() {
      try {
        this.points = [];
        document.body.removeEventListener('touchmove', function (e) {
          return true
        }, {passive: false});
      } catch (error) {
        console.log(error)
      }
	  // #ifdef MP-WEIXIN
	  this.confirm()
	  // #endif
    },
    /* ***********************************************
    #   绘制笔迹
    #	1.为保证笔迹实时显示，必须在移动的同时绘制笔迹
    #	2.为保证笔迹连续，每次从路径集合中区两个点作为起点（moveTo）和终点(lineTo)
    #	3.将上一次的终点作为下一次绘制的起点（即清除第一个点）
    ************************************************ */
    draw() {
      let point1 = this.points[0]
      let point2 = this.points[1]
      this.points.shift()
      this.ctx.moveTo(point1.X, point1.Y)
      this.ctx.lineTo(point2.X, point2.Y)
      this.ctx.stroke()
      this.ctx.draw(true)
    },
    //清空画布
    clear(signatureImage) {
      // 如果是清理回显的签名图片
      if(signatureImage) {
        this.$emit('clearImgResult', 2)
        return
      }
      let that = this;
      uni.getSystemInfo({
        success: function(res) {
          let canvasw = res.windowWidth;
          let canvash = res.windowHeight;
          that.ctx.clearRect(0, 0, canvasw, canvash);
          that.ctx.draw(true);
          that.$emit('clearImgResult', 1)
        },
      })
    },
    //完成绘画并保存到本地
    confirm() {
      let that = this;
      uni.canvasToTempFilePath({
        canvasId: this.canvasId,
        success: function(res) {
          // that.getBase64(res.tempFilePath)
          //图片格式为base64，如果不是可上传七牛云，之后请求签名接口即可
          that.$emit('imgResult', res.tempFilePath)
        },
        complete: function(res) {
          console.log('complate', res)
        }
      }, this)
    },
  }
}
</script>

<style scoped lang="scss">
.x-m {
  .x-m-title {
		width: 100%;
		height: 90rpx;
    text-align: left;
		// padding: 0 38rpx 0 31rpx;
		box-sizing: border-box;
		font-size: 32rpx;
    font-weight: bold;
		color: #333333;
		justify-content: space-between;
		.xm-t-clear {
      float: right;
			font-size: 32rpx;
      font-weight: normal;
      color: #00A3FF;
			>image {
				width: 28rpx;
				height: 28rpx;
				display: block;
				margin-right: 8rpx;
			}
		}
	}
	.x-m-con {
		width: 100%;
		// padding: 0 31rpx 18rpx;
		margin-top: 5rpx;
		box-sizing: border-box;
    border: 1px solid #EDEDED;
    border-radius: 16rpx;;
    .mycanvas {
      width: 100%;
      border: 1rpx solid #EDEDED;
    }
    .hint {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 42rpx;
      font-weight: bold;
      color: #CCCCCC;
      line-height: 59rpx;
      pointer-events: none;
    }
	}
  .img-container {
    max-width: 100%;
  }
}
</style>
