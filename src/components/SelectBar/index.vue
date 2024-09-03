<template>
	<view class="select-city pt_60" :style="{ height }">
		<!-- 标题 -->
		<view class="select-title t_c mb_10">请选择所在地区</view>
		<!-- 选择提示 -->
		<view class="select-display" v-if="currentSelected.length">
			<view class="select-display-item flex_row flex_x_between"
				v-for="(v, k) of currentSelected"
				:key="k"
				:class="{ active: currentLevel === k }"
				@click="skipLevel(k)" c-click
			>
				<text>{{ v.name }}</text>
				<u-icon name="arrow-right" color="#CBCBCB" size="24"></u-icon>
			</view>
			<view class="select-display-item flex_row flex_x_between"
				v-if="placeholder">
				<text>{{ placeholder }}</text>
				<u-icon name="arrow-right" color="#CBCBCB" size="24"></u-icon>
			</view>
		</view>
		<!-- 选择提示END -->
		
		<view class="swiper">
			<view class="swiper-wrapper" :style="{
				transform: `translateX(-${selectBarLevel === 3 ? (100 * currentLevel/3) : 0}%)`
			}">
				<!-- 省级 -->
				<scroll-view
					class="swiper-item"
					scroll-y
					v-if="selectBarLevel === 3 || (currentLevel === 0 && selectBarLevel === 4)"
				>
					<view class="swiper-content">
						<view class="caption">选择省份/地区</view>
						<address-item
							:data="dataByLetter"
							:selected="currentSelected[0]"
							@select="selectPro"
						/>
					</view>
				</scroll-view>
				<!-- 省级END -->
				
				<!-- 市级 -->
				<scroll-view
					class="swiper-item"
					scroll-y
					v-if="selectBarLevel === 3 || (currentLevel === 1 && selectBarLevel === 4)"
				>
					<view class="swiper-content">
						<address-item
							:data="level2Data"
							:selected="currentSelected[1]"
							@select="selectCity"
						/>
					</view>
				</scroll-view>
				<!-- 市级END -->
				
				<!-- 区级 -->
				<scroll-view
					class="swiper-item"
					scroll-y v-if="selectBarLevel === 3 || (currentLevel === 2 && selectBarLevel === 4)"
				>
					<view class="swiper-content">
						<address-item
							:data="level3Data"
							:selected="currentSelected[2]"
							@select="selectQu($event, selectBarLevel)"
						/>
					</view>
				</scroll-view>
				<!-- 区级END -->

				<!-- 街道 -->
				<scroll-view
					class="swiper-item"
					scroll-y
					v-if="selectBarLevel === 4"
				>
					<view class="swiper-content">
						<address-item
							:data="level4Data"
							:selected="currentSelected[3]"
							@select="selectStreet"
						/>
					</view>
				</scroll-view>
				<!-- 街道END -->
			</view>
		</view>
	</view>
</template>

<script>
	import addressItem from './item.vue'
	import {
		getSysArea,
		getSysAreaByName,
	} from "@/api/vaccinator.js";
	import pinyin from './pinyin';
	
	export default {
		components: {
			addressItem
		},
		props: {
			// 容器高度
			height: {
				type: String,
				default: '100%'
			},
			// 重新定位
			getPosition: Function,
			// 默认选择
			defaultSelected: {
				type: Array,
				default: () => []
			},
			// 显示选择数据级别 3 省市区 4街道
			selectBarLevel: {
				type: Number,
				default: 3
			},
			defaultData: {
				type: Array,
				default: () => []
			},
		},
		data() {
			const currentSelected = this.defaultSelected
			const selectLevel = this.selectBarLevel
			const provinceData = this.defaultData
			return {
				currentLevel: 0,
				currentSelected: currentSelected,
				showPlaceholder: true,
				currentPosition: null,
				provinceData,
				cityData: [],
				areaData: [],
				streetData: [],
				addressName: {
					provinceName: '',
					cityName: '',
					areaName: '',
					streetName: '',
					provinceCode: '',
					cityCode: '',
					areaCode: '',
					streetCode: '',
				},
				selectLevel,
			}
		},
		computed: {
			// 获取按Letter分组后的一级列表
			dataByLetter() {
				return this.formatByLatter(this.provinceData)
			},
			
			// 当前二级列表
			level2Data() {
				const lastLevel = this.currentSelected[0]
				if (!lastLevel) return []
				return this.formatByLatter(this.cityData || [])
			},
			
			// 当前三级列表
			level3Data() {
				const lastLevel = this.currentSelected[1]
				if (!lastLevel) return []
				return this.formatByLatter(this.areaData || [])
			},

			// 当前四级列表
			level4Data() {
				const lastLevel = this.currentSelected[2]
				if (!lastLevel) return []
				return this.formatByLatter(this.streetData || [])
			},
			
			placeholder() {
				const ln = this.currentSelected.length
				if (ln === 0) return '请选择地区'
				if (ln === 1) return '请选择城市'
				if (ln === 2) return '请选择区'
				if (ln === 3 && this.selectBarLevel === 4) return '请选择街道'
				return ''
			},
		},
		async created() {
			if(!this.handleFilter()) return
			// this.getAddressData(1, 'provinceData')
			this.processingProvincialData()
		},
		methods: {
			// 处理省份数据
			processingProvincialData() {
				console.log('this.provinceData=', this.provinceData)
				this.provinceData = this.format(this.provinceData)
			},
			// 对已选择的数据进行处理
			async handleFilter() {
				// 获取区/县数据
				if(this.selectLevel === 3 && this.currentSelected && this.currentSelected.length) {
					// 获取区数据
					this.currentLevel = 2
					await this.getAddressData(3, 'areaData', this.currentSelected[1].cityCode)
					return false
				}
				// 获取街道数据
				if(this.selectLevel === 4 && this.currentSelected && this.currentSelected.length) {
					this.currentLevel = 3
					this.addressName.provinceName = this.currentSelected[0].name
					this.addressName.cityName = this.currentSelected[1].name
					this.addressName.areaName = this.currentSelected[2].name
					await this.getOtherData()
					return false
				}
				return true
			},
			// 获取街道数据
			async getOtherData() {
				try {
					const param = {
						provinceName: this.addressName.provinceName,
						cityName: this.addressName.cityName,
						areaName: this.addressName.areaName,
						level: 3,
					}
					const res = await getSysAreaByName(param)
					this.streetData = this.format(res)
				} catch (error) {
					console.error(error)
				}
			},
			// 获取省、市、区、数据
			async getAddressData(level, type, code) {
				try {
					const param = {
						level: level, // 1 省 2 市 3 区
						provinceCode: level === 2 ? code : null, //level 2
						cityCode: level === 3 ? code : null, //level 3
					}
					const res = await getSysArea(param)
					this[type] = this.format(res)
				} catch (error) {
					console.error(error)
				}
			},
			// 处理数组 获取首字母
			format(list) {
				list.map(item => {
					// 处理多音字
					if(item.name === '重庆市')
						item.latter = 'C'
					else
						item.latter = this.toPinyin(item.name).charAt(0).toUpperCase()
				})
				return list
			},
			// 汉字转拼音
			toPinyin(l1) {  
				var l2 = l1.length;  
				var I1 = "";  
				var reg = new RegExp('[a-zA-Z0-9\- ]');  
				for (var i=0;i<l2;i++) {  
					var val = l1.substr(i,1);  
					var name = this.arraySearch(val,pinyin);  
					if(reg.test(val)) {  
						I1 += val;  
					} else if (name!==false) {  
						I1 += name;  
					}  

				}  
				I1 = I1.replace(/ /g,'-');  
				while (I1.indexOf('--')>0) {  
					I1 = I1.replace('--','-');  
				}  
				return I1;  
			},
			// 在对象中搜索
			arraySearch(l1,l2){  
				for (var name in pinyin){  
					if (pinyin[name].indexOf(l1)!=-1) {  
						return this.ucfirst(name); break;  
					}  
				}  
				return false;  
			},
			// 首字母大写
			ucfirst(l1){  
				if (l1.length>0) {  
					var first = l1.substr(0,1).toUpperCase();  
					var spare = l1.substr(1,l1.length);  
					return first + spare;  
				}  
			},
			// 选择省份
			async selectPro(item) {
				this.currentSelected = [item]
				// 获取当前选中的省份名称
				this.addressName.provinceName = item.name
				// 请求该省份下的市数据
				await this.getAddressData(2, 'cityData', item.provinceCode)
				if (this.cityData.length) {
					this.currentLevel = 1
				} else {
					this.submit()
				}
			},
			// 选择城市
			async selectCity(item) {
				this.currentSelected.splice(1)
				this.$set(this.currentSelected, 1, item)
				// 获取当前选中的城市名称
				this.addressName.cityName = item.name
				// 请求该城市下的区数据
				await this.getAddressData(3, 'areaData', item.cityCode)
				if (this.areaData.length) {
					this.currentLevel = 2
				} else {
					this.submit()
				}
			},
			// 选择区/县
			async selectQu(item, selectBarLevel) {
				this.currentSelected.splice(2)
				this.$set(this.currentSelected, 2, item)
				// 获取当前选中的区名称
				this.addressName.areaName = item.name
				// 请求该城市下的街道数据
				await this.getOtherData()
				
				if (selectBarLevel === 4 && this.streetData.length) {
					this.currentLevel = 3
				} else {
					this.submit()
				}
			},
			// 选择街道
			selectStreet(item) {
				this.currentSelected.splice(3)
				this.$set(this.currentSelected, 3, item)
				// 获取当前选中的街道名称
				this.addressName.streetName = item.name
				this.submit()
			},
			// 跳转到指定级数
			async skipLevel(level) {
				// 0 省 1 市 2 区 3 街道
				this.currentLevel = level
				const currentSelectedValue = this.currentSelected
				// 判断是否已选择地址数据
				if(!currentSelectedValue.length) return
				console.log('level==================', level)
				console.log('currentSelectedValue==================', currentSelectedValue)
				// 请求相应级数的数据
				switch (level) {
					case 1:
						// 市
						// 防止接口重复请求
						if(this.cityData.length) return
						// 获取当前选中的省份名称
						this.addressName.provinceName = currentSelectedValue[0].name
						// 请求该省份下的市数据
						await this.getAddressData(2, 'cityData', currentSelectedValue[0].provinceCode)
						break;
					case 2:
						// 区
						// 防止接口重复请求
						if(this.areaData.length) return
						// 获取当前选中的城市名称
						this.addressName.cityName = currentSelectedValue[1].name
						// 请求该城市下的区数据
						await this.getAddressData(3, 'areaData', currentSelectedValue[1].cityCode)
						break;
					case 3:
						// 街道
						// 防止接口重复请求
						if(this.streetData.length) return
						// 获取当前选中的区名称
						this.addressName.areaName = currentSelectedValue[2].name
						// 请求该城市下的街道数据
						await this.getOtherData()
						break;
					default:
						// 省
						// 防止接口重复请求
						if(this.provinceData.length) return
						this.getAddressData(1, 'provinceData')
						break;
				}
			},
			// 提交当前选择
			submit() {
				const selected = this.currentSelected.slice(0)
				const simple = selected.map(v => v.name)
				this.$emit('submit', { simple, selected })
			},
			// 按latter格式化
			formatByLatter(list) {
				return list.reduce((map, item) => {
					if (!item.latter) return map
					let tmp = map.find(v => v[0] === item.latter)
					if (!tmp) {
						tmp = [item.latter, []]
						map.push(tmp)
					}
					tmp[1].push(item)
					tmp[1].sort((a, b) => {
						return a.name - b.name
					})
					return map
				}, []).sort((a, b) => {
					return a[0].charCodeAt(0) - b[0].charCodeAt(0)
				})
			}
		}
	}
</script>

<style lang="scss">
	$spacing-small: 10rpx;
	$spacing-base: 30rpx;
	$spacing-large: 40rpx;
	$font-size-caption: 28rpx;
	$text-height: 60rpx;
	
	.select-city {
		display: flex;
		flex-direction: column;
		position: relative;
		background-color: $uni-bg-color;
	}
	
	.swiper {
		flex: 1;
		width: 100%;
		height: 0;
		overflow: hidden;
		position: relative;
		&-wrapper {
			width: 300%;
			height: 100%;
			display: flex;
			position: relative;
		}
		&-item {
			width: calc(100% / 3);
			height: 100%;
			position: relative;
			box-sizing: border-box;
		}
		
		&-content {
			position: relative;
			box-sizing: border-box;
			padding: 32rpx 40rpx;
			
			> .caption {
				font-size: 32rpx;
				font-family: PingFang-SC-Bold, PingFang-SC;
				font-weight: bold;
				color: #2C2F37;
				line-height: 45rpx;
				margin-bottom: 32rpx;
				
				> .action {
					float: right;
				}
			}
		}
	}
	.select-title {
		font-size: 36rpx;
		font-family: PingFang-SC-Bold, PingFang-SC;
		font-weight: bold;
		color: #2C2F37;
		line-height: 40rpx;
	}
	// 已选择显示
	.select-display {
		padding: 32rpx 40rpx;
		box-shadow: 0 2rpx 2rpx rgba(0, 0, 0, .15);
		
		&-item {
			$height: 80rpx;
			height: $height;
			line-height: $height;
			box-sizing: border-box;
			padding: 0 $spacing-base;
			font-size: 32rpx;
			border-left: 1px solid #0091FF;
			position: relative;
			
			&.active {
				color: #0091FF;
			}
			
			&::before {
				content: '';
				top: 0;
				left: -4rpx;
				width: 8rpx;
				height: 50%;
				background-color: $uni-bg-color;
				position: absolute;
				display: none;
			}
			&:first-child::before,
			&:last-child::before {
				display: block;
			}
			&:last-child::before {
				top: 50%;
			}
			
			&::after {
				$size: 16rpx;
				top: 50%;
				left: 0;
				content: '';
				width: $size;
				height: $size;
				border-radius: 50%;
				position: absolute;
				background-color: #00A3FF;
				transform: translate(-50%, -50%);
			}
			&:last-child::after {
				background-color: #fff;
				border: 3rpx solid #00A3FF;
			}
		}
	}
	
	// 热门城市
	.gird {
		$height: 80rpx;
		
		display: flex;
		flex-wrap: wrap;
		position: relative;
		margin-bottom: $spacing-base;
		
		&-item {
			width: 20%;
			height: $height;
			box-sizing: border-box;
			padding: $spacing-small;
			
			> view {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: $font-size-caption;
				background-color: $uni-bg-color-hover;
				border-radius: 8rpx;
			}
		}
	}
	
	// 当前定位
	.current-position {
		$height: 80rpx;
		height: $height;
		line-height: $height;
		text-align: center;
		font-size: $font-size-caption;
		margin-bottom: $spacing-base;
		color: #0091FF;
		background-color: lighten(#0091FF, 40%);
		border-radius: 8rpx;
	}
</style>
