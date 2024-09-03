<template>
	<u-popup v-model="show" border-radius='30' mode='bottom' safe-area-inset-bottom @close='close'>
		<view class="level-container">
			<view class="top-btn">
				<!-- <text class="cancel" @click="show = false">取消</text> -->
				<!-- <text class="confirm" :class="{'disabled': !enable}" @click="onConfirm">确认</text> -->
				<text>选择居住地</text>
			</view>

			<scroll-view style="width: 100%;" scroll-x>
				<ul class="name-list">
					<li :class="showIndex==0?'select':''" @click="anewSelect(0)" c-click>{{province}}</li>
					<li :class="showIndex==1?'select':''" @click="anewSelect(1)" c-click v-if="showIndex>=1">{{city}}</li>
					<li :class="showIndex==2?'select':''" @click="anewSelect(2)" c-click v-if="showIndex>=2">{{area}}</li>
					<li :class="showIndex==3?'select':''" @click="anewSelect(3)" c-click v-if="showIndex>=3">{{street}}</li>
				</ul>
			</scroll-view>
			<!-- <ul v-if="showIndex==0" class="content" :style="'height:'+ heightCot + 'rpx'"> -->
			<ul v-if="showIndex==0" class="content" style="height:40vh">
				<li @click="selectPro(index,item.label)" c-click v-for="(item,index) in provinceData" :key="index">
					{{item.label}}
				</li>
			</ul>

			<ul v-if="showIndex==1" class="content" style="height:40vh">
				<li @click="selectCity(index,item.label)" c-click v-for="(item,index) in cityData" :key="index">{{item.label}}
				</li>
			</ul>

			<ul v-if="showIndex==2" class="content" style="height:40vh">
				<li @click="selectaArea(index,item.label)" c-click v-for="(item,index) in areaData" :key="index">{{item.label}}
				</li>
			</ul>

			<ul v-if="showIndex==3" class="content" style="height:40vh">
				<li @click="selectStreet(index,item)" c-click v-for="(item,index) in streetsData" :key="index">{{item}}</li>
			</ul>
		</view>
	</u-popup>
</template>

<script>
	import provinceData from './city-data/province.js';
	import getCity from './city-data/city.js';
	import getArea from './city-data/area.js';
	import getStreets from './city-data/streets.js';
	export default {
		props: {
			value: {
				type: Boolean,
				default: false,
			}
		},
		watch: {
			value(newValue, oldVlaue) {
				this.show = newValue
			},
		},
		data() {
			return {
				show: false,
				enable: false,
				province: "请选择",
				city: "请选择",
				area: "请选择",
				street: "请选择",
				cityDataAll: '', // 市的所有數據
				getAreaAll: '', // 区的所有数据
				getStreetsAll: '', // 街道的所有数据
				presentIndex: [],
				proIndex: 0,
				cityIndex: 0,
				areaIndex: 0,
				provinceData: '', // 当前展示的省数据
				cityData: '', // 当前展示的市数据
				areaData: '', //当前展示的区数据
				streetsData: '', //当前展示的区数据
				showIndex: 0,
				heightCot: 0,
				bb: ''
			}
		},
		created() {
			// uni.getSystemInfo({
			// 	success: res => {
			// 		console.log(res.safeArea.height)
			// 		this.heightCot = (res.safeArea.height * 2) / 2
			// 	}
			// })
		},
		mounted() {
			// console.log(provinceData)
			this.provinceData = provinceData;
			this.cityDataAll = getCity;
			this.getAreaAll = getArea;
			this.getStreetsAll = getStreets
		},
		methods: {
			anewSelect(num) {
				switch (num) {
					case 0:
						this.showIndex = 0;
						this.areaData = [];
						this.streetsData = [];
						this.city = '请选择';
						this.area = '请选择';
						this.street = '请选择'
						break;
					case 1:
						this.showIndex = 1;
						this.areaData = [];
						this.streetsData = [];
						this.area = '请选择';
						this.street = '请选择'
						break;
					case 2:
						this.showIndex = 2;
						this.streetsData = [];
						this.street = '请选择'
						break;
					case 3:
						console.log(11111);
						break;
				}
			},
			selectPro(index, label) {
				console.log(index)
				const {
					cityDataAll
				} = this;
				this.proIndex = index; // 当前省的下标
				this.province = label;
				this.cityData = cityDataAll[index];
				this.showIndex = 1;

			},
			selectCity(index, label) {
				const {
					proIndex
				} = this;
				// console.log(this.getAreaAll)
				this.city = label;
				this.cityIndex = index; // 当前市的下标
				this.areaData = this.getAreaAll[proIndex][index];
				this.showIndex = 2;
			},
			selectaArea(index, label) {
				const {
					proIndex,
					cityIndex
				} = this;
				this.area = label;
				this.showIndex = 3;
				console.log(index)
				console.log(this.getStreetsAll[proIndex][cityIndex])
				console.log(this.getStreetsAll[proIndex][cityIndex][index])
				this.streetsData = this.getStreetsAll[proIndex][cityIndex][index]
			},
			selectStreet(index, label) {
				this.street = label;
				const {
					province,
					city,
					area,
					street
				} = this;
				this.$emit('conceal', {
					province,
					city,
					area,
					street
				})
				// this.showIndex = 4;
			},
			close() {
				this.show = false
				console.log("close=",this.value)
				this.$emit('input', false)
			},
		}
	}
</script>

<!-- 
https://ext.dcloud.net.cn/plugin?id=1301 
 -->
<style lang="scss">
	ul,
	li {
		list-style: none;
	}

	.level-container {
		width: 100%;
		background: #fff;

		.top-btn {
			padding: 30rpx 40rpx 10rpx 20rpx;
			display: flex;
			justify-content: space-between;
			font-size: 32rpx;

			.cancel {
				padding: 10rpx;
				color: #909399;
			}

			.confirm {
				padding: 10rpx;
				color: #2979ff;
			}

			.disabled {
				pointer-events: none;
				color: #CCCCCC;
			}
		}

		.select {
			color: #2979ff;
			position: relative;

			&::after {
				content: '';
				width: 40rpx;
				height: 6rpx;
				background: red;
				position: absolute;
				left: 50%;
				bottom: -8rpx;
				margin-left: -20rpx;
			}
		}

		li {
			font-size: 26rpx;
		}

		.content,
		.name-list {
			padding: 0 20rpx;
			margin-top: 10rpx;
		}

		.title {
			font-size: 32rpx;
			margin: 30rpx 20rpx;
		}

		.name-list {
			display: flex;
			width: 100%;
			padding: 0 30rpx;

			li {
				margin-right: 40rpx;
				padding-bottom: 6rpx;
			}
		}

		.content {
			margin-top: 20rpx;
			height: 600rpx;
			overflow-y: auto;

			li {
				border-bottom: 1px solid #f1f1f1;
				padding: 20rpx 0;
			}

			li:last-child {
				border-bototm: none !important;
			}
		}
	}
</style>
