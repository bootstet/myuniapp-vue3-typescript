<template>
	<view class="latter-list">
		<view class="latter-list-item" v-for="(v, k) in data" :key="k">
			<view class="latter-list-latter">{{ v[0] }}</view>
			<view class="plist">
				<view class="plist-item"
					v-for="(m, n) of v[1]"
					:key="n"
					:class="{ selected: selected && m ? selected.name === m.name : false }"
					@click="selectHandler(m)" c-click
				>
					<text class="fs_32 c_475266">{{ m.name }}</text>
					<text class="select-icon">✔</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Array,
				required: true
			},
			selected: Object
		},
		watch: {
			data: {
				handler: function(newVal, oldVal) {
					// console.log('newVal===', newVal)
				},
				immediate: true,
			},
		},
		methods: {
			selectHandler(item) {
				this.$emit('select', item)
			}
		}
	}
</script>

<style lang="scss">
	$spacing-base: 30rpx;
	$spacing-large: 40rpx;
	$font-size-caption: 22rpx;
	$text-height: 60rpx;
	
	.latter-list {
		&-item {
			display: flex;
			&:not(:last-child) {
				margin-bottom: $spacing-large;
			}
		}
		
		&-latter {
			$width: 30rpx;
			width: $width;
			font-size: $font-size-caption;
			color: $uni-text-color-grey;
			line-height: $text-height;
		}
	}
	
	.plist {
		flex: 1;
		width: 0;
		
		&-item {
			height: $text-height;
			line-height: $text-height;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&:not(:last-child) {
				margin-bottom: $spacing-base;
			}
			
			&.selected {
				color: $uni-color-primary;
			}
			&:not(.selected) > .select-icon {
				display: none;
			}
		}
	}
</style>
