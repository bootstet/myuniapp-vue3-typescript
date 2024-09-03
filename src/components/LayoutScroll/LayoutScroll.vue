<template>
	<scroll-view id="scroller" class="layout-scroll-view" :scroll-y="scrollY" :refresher-enabled="isRefresh"
		:refresher-threshold="100" :refresher-default-style="refresherStyle" :refresher-background="bgColor"
		lower-threshold="50" :scroll-top="toTop" :style="{'background-color':bgColor}" :enhanced='enhanced'
		:refresher-triggered="refreshTriggered" @refresherrefresh="refresherrefresh" @scrolltolower="onLoadMore" @binddragend='dragend'
		@scroll="onScroll" :scroll-into-view="toView">

		<!-- 主体内容 -->
		<template>
			<slot></slot>
		</template>

		<!-- 尾部loading或提示语 -->
		<template v-if="showBottomHint">
			<view class="bottom-hint-wrap">
				<view v-if="hasMore">
					<slot name="moreLoading">
						<u-loading mode="circle"></u-loading>
					</slot>
				</view>
				<text v-else>{{hint}}</text>
			</view>
		</template>
	</scroll-view>
</template>

/**
* https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html
* 处理
* 1.刷新头
* 2.加载更多loading
* 3.滚到到顶部
* 可继续优化
*
* 目前想到的办法：为了处理微信浏览器中下拉和scroll-view下拉冲突，须在引入页面调用
* onShow() {
* // #ifdef H5
* stopTouch()
* // #endif
* },
* onHide() {
* // #ifdef H5
* openTouch()
* // #endif
* }
*/
<script>
	export default {
		props: {
			hintText: {
				type: String,
				default: "没有更多了"
			},
			showLoading: {
				type: Boolean,
				default: false,
			},
			bgColor: {
				type: String,
				default: 'white',
			},
			toView: {
				type: String,
				default: '',
			},
			//刷新默认样式，支持black | white | none， none 表示不使用默认样式
			refresherStyle: {
				type: String,
				default: 'black',
				validator: function(value) {
					// 这个值必须匹配下列字符串中的一个
					return ["black", "white", "none"].indexOf(value) !== -1
				}
			},
			refresherEnabled: {
				type: Boolean,
				default: true,
			},
			isEnabled: {
				type: Boolean,
				default: false,
			},
			enhanced: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				refreshTriggered: false,
				old: {
					scrollTop: 0
				},
				toTop: 0,
				rootHeight: 0,
				hasMore: true,
				showBottomHint: false,
				scrollY: true,
				hint: this.hintText,
				showHeight: 0,
				isRefresh: this.refresherEnabled,
				timer: null
			}
		},
		watch: {
			old(newValue){
				if(newValue){

				}
			}
		},
		created() {
			//100为大概头部高度值
			this.showHeight = uni.getSystemInfoSync().windowHeight - 100
		},
		watch: {
			//监听父组件传入变化
			hintText() {
				this.hint = this.hintText
			},
			showLoading: {
				handler(newValue, oldValue) {
					this.showBottomHint = newValue
				},
				immediate: true
			}
		},
		methods: {
			setScrollY(enable) {
				this.scrollY = enable
			},
			setHasMore(hasMore) {
				this.hasMore = hasMore
			},
			setShowBottomHint(showBottomHint = false) {
				this.showBottomHint = showBottomHint
			},
			refresherrefresh() {
				// h5中触发两次
				if (this.refreshTriggered)
					return
				this.refreshTriggered = true
				// if (this.timer) {
				// 	clearTimeout(this.timer)
				// 	this.timer = null

				// 	this.timer = setTimeout(() => {
				// 		this.$emit('pullRefresh')
				// 	}, 100)
				// } else {
				// 	this.$emit('pullRefresh')
				// }

				this.$emit('pullRefresh')
			},
			onLoadMore() {
				if (this.hasMore)
					this.$emit('loadMore')
			},
			onScroll(event) {
				if(this.isEnabled) return
				// #ifdef  H5
				this.isRefresh = false
				if(this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.isRefresh = true
				}, 400)
				// #endif
				// this.old.scrollTop = event.detail.scrollTop
				this.$emit('onScroll', event)
			},
			dragend(){
				// this.isRefresh = true
			},
			scrollToUp(positionX = 0) {
				this.toTop = this.old.scrollTop
				this.$nextTick(() => {
					this.toTop = positionX
				})
			},
			stopRefresh() {
				this.refreshTriggered = false
				this.measureHeight()
			},
			/**
			 * 列表包裹布局id为：list-content，自动根据
			 * 测量滚到内容加载高度，不满一屏则隐藏，没有更多的提示语
			 */
			measureHeight() {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.layout-scroll-view {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.bottom-hint-wrap {
			display: flex;
			justify-content: center;
			padding: 30rpx 0 30rpx 0;

			view {
				padding: 40rpx 0 40rpx 0;
			}

			text {
				font-size: 24rpx;
				color: #aaaaaa;
			}
		}
	}
</style>
