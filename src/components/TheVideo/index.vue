<template>
    <view>
			<u-mask :show="show" class="w_100">
				<view class="w_100 video-box">
			<video
				:style="{'width': width, 'height': height}"
				:src="videoUrl"
				:controls="false"
				:show-fullscreen-btn="false"
				:show-play-btn="false"
				:enable-progress-gesture="false"
				object-fit="fill"
				:autoplay="true"
				:loop="false"
				@loadedmetadata="loadedMetaHandle"
				@play="videoPlay"
				@ended="endedHandle"
				id="myVideo"
				ref="myVideo"
				:initial-time="0"
			>
				<cover-view v-if="videoUrl">
					<cover-view class="video-input">
						<cover-view class="box title">视频播放后进入预约，请耐心观看</cover-view>
						<cover-view class="box count-down" v-if="duration">倒计时：{{duration}}s</cover-view>
					</cover-view>
				</cover-view>
				<cover-image class="controls-play img" v-if="playIconShow" @click="play" c-click src="https://static.zhil.cloud/zhil_web_h5/pov-h5/vaccine/l0YORujBYvx426521d3afb2b709b61b99e577a2c532b.png"></cover-image>
			</video>
			<view class="btn" v-if="isEnded" @click="appointmentHandle(url)" c-click>进入预约</view>
					</view>
			</u-mask>
    </view>
</template>
<script>
export default {
    props: {
        videoUrl: {
            type: String,
            default: () => {
                return ''
            }
        },
				url: {
						type: String,
						default: () => {
								return ''
						}
				},
        show: {
            type: Boolean,
            default: () => {
                return false
            }
        },
    },
    data() {
        return{
					width: '100%',
					height: '250px',
					duration: 0,
					isEnded: false,
					playIconShow: false,
					videoCtx: '',
					loop: false,
        }
    },
		onReady() {
			uni.createVideoContext('myVideo', this).play()
		},
    methods: {
			videoPlay(e) {
				console.log('e', e)
				//倒计时
				let interval = setInterval(() => {
					if(this.duration <= 1) {
						this.duration = 0
						clearInterval(interval)
						return
					}
					this.duration --
				}, 1000)
			},
			appointmentHandle(url) {
				this.$emit('incrPlayNum', url)
			},
			/**
			 * 获取视频时长
			 * */
			loadedMetaHandle(e) {
				const _this = this
				console.log('e', e)
				uni.getSystemInfo({
					success: function (res) {
						_this.width = res.windowWidth+'px'
						_this.height = (e.detail.height * (res.windowWidth / e.detail.width))+'px'
						_this.duration = e.detail.duration.toFixed(0)
						}
				});
			},
			/**
			 * 视频播放完
			 * */
			endedHandle(e) {
				console.log('endedHandle',e)
				this.isEnded = true
				this.playIconShow = true
			},
			play(event) {
				this.playIconShow = false
				uni.createVideoContext('myVideo', this).play()
			},
    }
}
</script>
<style lang="scss" scoped>
	.video-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		position: relative;
		.video-input {
			display: flex;
			align-items: center;
			justify-content: space-between;
			.box {
				background: rgba(51, 51, 51, 0.3);
				border-radius: 8rpx;
				padding: 9rpx 15rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 33rpx;
				display: inline-block;
			}
			.title {
				margin: 19rpx 0 0 20rpx;
			}
			.count-down {
				margin: 19rpx 20rpx 0 0;
			}
		}
		.controls-play {
			width: 78rpx;
			height: 78rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		.btn {
			width: 600rpx;
			height: 90rpx;
			background: #00A3FF;
			border-radius: 64rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 90rpx;
			margin-top: 40rpx;
		}
	}
</style>