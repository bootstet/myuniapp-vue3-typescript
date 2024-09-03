<template>
	<view>
		<view class='modal_wrapper'>
            <u-modal 
                v-model="modalshow" 
                :show-title="false"
                :show-confirm-button="false"
                :show-cancel-button="false"
				:mask-close-able="false"
            >
					<view>
						<view class="modal-content">
							<!-- <view v-if="showCloseBtn" class="modal_close" @click="closeModal">
								<u-image  
									width=30 
									height=30 
									:show-loading="false"
									:fade="false"
									src="/static/incoRecord/icon_popup_close@2x.png"
								></u-image>
							</view> -->
							<slot></slot>
						</view>
						<view class="modal-button-box" :style="[isButtonReverse ? buttonReverse : '']">
							<view 
								:class="[type ===1 ? 'modal-button-q' : 'modal-button-s', 'pubclass']"
								@click="handelLClick" c-click
								:style="{background: btnLeftBgColor}"
							>{{leftButtonText}}</view>
							<view class="mr_width"></view>
							<view 
								:class="[type ===1 ? 'modal-button-s' : 'modal-button-q', 'pubclass']"
								@click="handelRClick" c-click
								:style="{background: btnRightBgColor}"
							>{{rightButtonText}}</view>
						</view>
					</view>
                
            </u-modal>
		</view>
	</view>
</template>


<script>
	import { debounce } from '@/utils/index'
	export default {
		props: {
            modalshow: {
                type: Boolean,
				default: false
            },
            type: {
                type: Number,
				default: 1
            },
			isButtonReverse: {
				type: Boolean,
				default: false
			},
			showCloseBtn: {
				type: Boolean,
				default: false
			},
			leftButtonText: {
				type: String,
				default: '取消'
			},
			rightButtonText: {
				type: String,
				default: '确认'
			},
			btnLeftBgColor: {
				type: String,
				default: '#F4F4F4'
			},
			btnRightBgColor: {
				type: String,
				default: '#00A3FF'
			},
			names: {
				type: String,
				default: 'modalshow'
			}
		},
		data() {
			return {
				buttonReverse: {
					flexDirection: 'row-reverse'
				}
			}
		},
		mounted() {
			
		},

		methods: {
			handelLClick: debounce(function() {
				this.$emit('handelLeftClick', false)
			}, 0),
			handelRClick: debounce(function() {
				this.$emit('handelRightClick', false)
			}, 0),
			closeModal(){
				this.$emit('handelClose', { names: this.names })
			}
		}
	}
</script>

<style lang="scss" scoped>
    .modal_wrapper{
		.modal_close{
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
        .modal-content{
			padding: 60rpx 40rpx;
			font-size: 28rpx;
			position: relative;
		}
		.modal-button-box{
			display: flex;
			justify-content: center;
			margin-bottom: 40rpx;
			// flex-direction: row-reverse;
			.mr_width{
				width: 20rpx;
			}
			.pubclass{
				width: 240rpx;
				height: 80rpx;
				border-radius: 40px;
				// line-height: 80rpx;
				// text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.modal-button-s{
				background: #F4F4F4;
				color: #878D99;
			}
			.modal-button-q{
				background: #00A3FF;
				color: #fff;
			}
		}
    }
    
</style>
