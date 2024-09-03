<template>
	<u-popup v-model="show" border-radius='30' mode='bottom' safe-area-inset-bottom @close='close'>
		<view class='main_padding ptb_30'>
			<scroll-view class='pop over_y' scroll-y>
				<!-- 日期 -->
				<view class='fs_28 c_b pt_6 fw_bold'>所有号源</view>
				<swiper class='swpier fs_28 c_b mt_20' indicator-dots indicator-color='#B2B2B2'
				    indicator-active-color='#00A3FF'>
				    <swiper-item>
				        <view class='swiper_item_wrpaper br_8 bd_e'>
				            <view class='flex bd_b_e'>
				                <view class='header flex_center fs_24 c_b'>排班</view>
				                <view class='flex_box flex_c_center bd_l_e t_h_1' v-for='item in list1' :key='item.date'>
				                    <view class='fs_24 c_b'>{{item.title}}</view>
				                    <view class='fs_20 c_79'>{{item.date}}</view>
				                </view>
				            </view>
				            <view class='flex'>
				                <view class='header flex_center fs_24 c_b bd_b_e'>上午</view>
				                <template v-for='item in list1'>
				                    <view class='flex_box flex_center fs_24 c_f bg_8b bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='item.morningStock === 0&&item.morningStatus' @click='openDay(item, 1)' c-click>
				                        <view class='day_active br_r bg_f flex_center c_8b'
				                            v-if='info.time ==  item.time && info.type == 1'>
				                            <u-icon name="checkmark"></u-icon>
				                        </view>
				                        <template v-else>预约</template>
				                    </view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='item.morningStock == 1&&item.morningStatus'>过期</view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e bd_b_e t_h_1' :key='item.morningId'
				                        v-if='item.morningStock == 2&&item.morningStatus'>约满</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if="item.morningStock===''&&item.morningStatus">{{configTitle}}</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='!item.morningStatus'>{{configTitle}}</view>
				                </template>
				            </view>
				            <view class='flex bd_b_e'>
				                <view class='header flex_center fs_24 c_b'>下午</view>
				                <template v-for='item in list1'>
				                    <view class='flex_box flex_center fs_24 c_f bg_8b bd_l_f t_h_1' :key="item.afternoonId"
				                        v-if='item.afternoonStock === 0&&item.afternoonStatus' @click='openDay(item, 2)' c-click>
				                        <view class='day_active br_r bg_f flex_center c_8b'
				                            v-if='info.time ==  item.time && info.type == 2'>
				                            <u-icon name="checkmark"></u-icon>
				                        </view>
				                        <template v-else>预约</template>
				                    </view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e t_h_1' :key="item.afternoonId"
				                        v-if='item.afternoonStock == 1&&item.afternoonStatus'>过期</view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e t_h_1' :key="item.afternoonId"
				                        v-if='item.afternoonStock == 2&&item.afternoonStatus'>约满</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f t_h_1' :key="item.afternoonId"
				                        v-if="item.afternoonStock===''&&item.afternoonStatus">{{configTitle}}</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f t_h_1'  :key="item.afternoonId"
				                        v-if="!item.afternoonStatus">{{configTitle}}</view>
				                </template>
				            </view>
				            <view class='word2 flex_center fs_24 c_6'>左右滑动日历查看其他排班</view>
				        </view>
				    </swiper-item>
				    <swiper-item>
				        <view class='swiper_item_wrpaper br_8 bd_e'>
				            <view class='flex bd_b_e'>
				                <view class='header flex_center fs_24 c_b'>排班</view>
				                <view class='flex_box flex_c_center bd_l_e t_h_1' v-for='item in list2' :key='item.date'>
				                    <view class='fs_24 c_b'>{{item.title}}</view>
				                    <view class='fs_20 c_79'>{{item.date}}</view>
				                </view>
				            </view>
				            <view class='flex'>
				                <view class='header flex_center fs_24 c_b bd_b_e '>上午</view>
				                <template v-for='item in list2'>
				                    <view class='flex_box flex_center fs_24 c_f bg_8b bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='item.morningStock === 0&&item.morningStatus' @click='openDay(item, 1)' c-click>
				                        <view class='day_active br_r bg_f flex_center c_8b'
				                            v-if='info.time ==  item.time && info.type == 1'>
				                            <u-icon name="checkmark"></u-icon>
				                        </view>
				                        <template v-else>预约</template>
				                    </view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='item.morningStock == 1&&item.morningStatus'>过期</view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e bd_b_e t_h_1' :key='item.morningId'
				                        v-if='item.morningStock == 2&&item.morningStatus'>约满</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if="item.morningStock===''&&item.morningStatus">{{configTitle}}</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f bd_b_f t_h_1' :key='item.morningId'
				                        v-if='!item.morningStatus'>{{configTitle}}</view>
				                </template>
				            </view>
				            <view class='flex bd_b_e'>
				                <view class='header flex_center fs_24 c_b'>下午</view>
				                <template v-for='item in list2'>
				                    <view class='flex_box flex_center fs_24 c_f bg_8b bd_l_f t_h_1' :key='item.afternoonId'
				                        v-if='item.afternoonStock === 0&&item.afternoonStatus' @click='openDay(item, 2)' c-click>
				                        <view class='day_active br_r bg_f flex_center c_8b'
				                            v-if='info.time ==  item.time && info.type == 2'>
				                            <u-icon name="checkmark"></u-icon>
				                        </view>
				                        <template v-else>预约</template>
				                    </view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e t_h_1' :key='item.afternoonId'
				                        v-if='item.afternoonStock == 1&&item.afternoonStatus'>过期</view>
				                    <view class='word flex_box flex_center fs_24 c_79 bd_l_e t_h_1' :key='item.afternoonId'
				                        v-if='item.afternoonStock == 2&&item.afternoonStatus'>约满</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f t_h_1' :key='item.afternoonId'
				                        v-if="item.afternoonStock===''&&item.afternoonStatus">{{configTitle}}</view>
				                    <view class='flex_box flex_center fs_24 c_3 bg_e bd_l_f t_h_1' :key='item.afternoonId'
				                        v-if='!item.afternoonStatus'>{{configTitle}}</view>
				                </template>
				            </view>
				            <view class='word2 flex_center fs_24 c_6'>左右滑动日历查看其他排班</view>
				        </view>
				    </swiper-item>
				</swiper>

				<!-- 时刻 -->
				<view v-if='info.time'>
					<view class='fs_28 c_b mt_20 fw_bold'>{{info.time}}</view>
					<view class='fs_24 c_6 mt_10 flex flex_wrap'>
						<!-- 添加判断，日期正常才展示，过期和已约满的不展示  status :0 正常 1 过期  2  已约满 -->
						<view v-if="item.total && item.status == 0" v-for='item in info.moment' :key='item.date' class='item_wrapper mb_20 flex_row' >
							<view  class='item flex_c_center bd_8b br_8' :class='{"active": date.date == item.date}'
								@click='optionDate(item)' c-click>
								<view class='w_100 t_h_1 fs_26 t_c' :class='{"c_3 fw_bold": date.date != item.date}'>{{item.date}}
								</view>
								<view class="w_100 t_h_1 mt_6 t_c" v-if='date.date != item.date'>剩余号源：{{item.total}}</view>
							</view>
						</view>
					</view>
				</view>

				<!-- 确定 -->
				<view class='btn_confirm fs_32 c_f bg_8b flex_center mt_20 m_auto' @click='confirm(1)' c-click>确定</view>

				<u-toast ref="uToast" />
			</scroll-view>
		</view>
	</u-popup>
</template>

<script>
	import {
		dateFormat
	} from '@/utils'
	import {
		getAppointmentDay,
		getAppointmentDate,
		getConfig
	} from '@/api/vaccine.js'
	import {
		mapGetters
	} from 'vuex'
	let date = new Date().getTime(); //获取当前日期
	export default {
		props: {
			dateList: {
				type: Array,
				default: () => [],
			},
			goodsId: {
				type: [String, Number],
				default: () => '',
			},
			orderSn: {
				type: String,
				default: () => '',
			},
			dateParent: {
				type: String,
				default: () => {
					return '2021-08-09 9:00至9:30'
				},
			},
			status: {
				type: [String, Number],
				default: () => {
					return 1
				},
			},
			openShow: {
				type: Boolean,
				default: () => {
					return false
				},
			}
		},
		data() {
			return {
				show: false,
				list: [],
				info: {},
				date: '',
				list1: [], //上午数据
				list2: [], //下午数据
				goodsIdValue: null,
				configTitle: '',
			}
		},
		computed: {
			...mapGetters(['userInfo', 'source']),
		},
		watch: {
			openShow(newValue, oldVlaue){
				if(newValue) {
					this.show = newValue
					if(!Object.keys(this.info).length){
						this.initData()
					}
				}
			},
			dateParent(newValue, oldVlaue){
				if(newValue) {
					if(!Object.keys(this.info).length){
						this.initData(1)
					}
				}
			},
			// #ifdef H5
			goodsId: {
				immediate: true,
				handler: function(newVal) {
					if(newVal) {
						this.dayHandle(date)
						this.goodsIdValue = newVal
						this.initData(1).then(()=>this.getDay())
					}
				}
			},
			// #endif
			
			// #ifndef H5
			async goodsId(newValue, oldVlaue){
				if(newValue) {
					this.goodsIdValue = newValue
					this.dayHandle(date)
					await this.getDay()
				}
			},
			// #endif
		},
		mounted() {
			this.getConfigHandle()
		},
		methods: {
			getConfigHandle() {
				const _this = this
				getConfig({
					orgId: parseInt(this.source),
					configKey: "no_schedule_text:"+this.source 
				}).then(res => {
					_this.configTitle = res
				})
			},
			async initData(status) {
				// if (this.status == 2 && this.dateParent) {
				// 	let day = this.dateParent.split(' ')
				// 	let data = this.list.find(item => item.time.split(' ')[0] == day[0])
				// 	if (data) {
				// 		let type = day[1].split('~')[0].split(':')[0]
				// 		if (data) await this.openDay(data, parseInt(type) < 13 ? 1 : 2)
				// 		let item = this.info.moment!=undefined?this.info.moment.find(item => item.date == day[1].replace('~', '至')):''
				// 		if (item) {
				// 			this.optionDate(item)
				// 			if(status == 1) this.confirm(0)
				// 		}
				// 	}
				// }
			},
			dayHandle(data) {
				let date = data
				let dateList = [];
				for (let i = 0; i < 14; i++) {
					let info = dateFormat('YYYY-mm-dd W', date).split(' ')
					let title = info[1] == "星期天" ? "周日" : info[1].replace('星期', '周');
					let index = 111 * 10 * i
					
					dateList.push({
						title: title,
						time: info[0] + " " + title,
						date: info[0].substring(5),
						morningId: i + 236,
						afternoonId: i * 10000 + 247,
						morningStatus: false,
						afternoonStatus: false,
						// #ifdef H5
						morningStock: '',
						afternoonStock: '',
						// #endif
						
						// #ifndef H5
						morningStock: 0,
						afternoonStock: 0,
						// #endif
					})
					date += 86400000;
				}
				
				this.list = dateList
				this.list1 = dateList.slice(0, 7)
				this.list2 = dateList.slice(7)
				// console.log('list1111', this.list1)
				// console.log('list222', this.list2)
			},
			async getDay(goodsId) {
				const res = await getAppointmentDay({
					orgId: parseInt(this.source),
					goodsId: this.goodsIdValue
				})
         if (Array.isArray(res)) {
            this.list = res
          } else {
            this.list = res.list || []
            this.isOpenTimeUp = res.isOpenTimeUp || true
          }
        if (!this.isOpenTimeUp ) {
          this.list = []
        }
				this.list.forEach(item => {
					let date = this.list.find(ele => item.time.split(' ')[0].replace(/-/g, '') == ele.date.replace(/-/g, ''))
					if (date) {
						let morning = date.amScheduleTimeList
						let afternoon = date.pmScheduleTimeList
						
						item.appointDate = date.date
						item.amScheduleTimeList = date.amScheduleTimeList
						item.pmScheduleTimeList = date.pmScheduleTimeList
						if (morning) {
							item.morningStatus = date.amIsWork
							// console.log('morning', morning.length)
							// console.log('status', morning[0].status)
							// 预约 过期 约满 自定义文案
							const morningLength = morning.length
							if(morningLength) {
								const  appointmentLength = morning.filter(item=>item.status===0).length
								const overdueLength = morning.filter(item=>item.status===1).length
								const completeLength = morning.filter(item=>item.status===2).length
								let morningStatus = ''
								if(appointmentLength==morningLength) morningStatus=0
								else if(overdueLength==morningLength) morningStatus=1
								else if(completeLength==morningLength) morningStatus=2
								else morningStatus=0
								item.morningStock = morningStatus
							}else {
								item.morningStock = ''
							}
							console.log('morningStock', item.morningStock)
							item.morningId = date.id
						}

						if (afternoon) {
							item.afternoonStatus = date.pmIsWork
							// console.log('afternoon', afternoon.length)
							// console.log('status', afternoon[0].status)
							// 预约 过期 约满 自定义文案
							const afternoonLength = afternoon.length
							if(afternoonLength) {
								const  appointmentLength = afternoon.filter(item=>item.status===0).length
								const overdueLength = afternoon.filter(item=>item.status===1).length
								const completeLength = afternoon.filter(item=>item.status===2).length
								let afternoonStatus = ''
								if(appointmentLength==afternoonLength) afternoonStatus=0
								else if(overdueLength==afternoonLength) afternoonStatus=1
								else if(completeLength==afternoonLength) afternoonStatus=2
								else afternoonStatus=0
								item.afternoonStock = afternoonStatus
							}else {
								item.afternoonStock = ''
							}
							console.log('afternoonStock', item.afternoonStock)
							// console.log('status', item.afternoonStock)
							// console.log('date.date', date.date)
							item.afternoonId = date.id
						}
					}
				});
				
				this.list1 = this.list.slice(0, 7)
				this.list2 = this.list.slice(7)

				if (this.status == 2 && this.dateParent) {
					let day = this.dateParent.split(' ')
					let data = this.list.find(item => item.time.split(' ')[0] == day[0])
					if (data) {
						let type = day[1].split('~')[0].split(':')[0]
						
						if (data) await this.openDay(data, parseInt(type) >= 12 ? 2 : 1)
						let item = this.info.moment!=undefined?this.info.moment.find(item => item.date == day[1].replace('~', '至')):''
						if (item) {
							this.optionDate(item)
							if(status == 1) this.confirm(0)
						}
					}
				}
			},
			async openDay(item, type) { //type 1上午 2下午
				let data = type==1?item.amScheduleTimeList:item.pmScheduleTimeList
				data = data.map(t => {
					return {
						id: item.afternoonId,
						date: t.startTime + "至" + (type == 2 && t.endTime == '00:00' ? '24:00' : t
							.endTime),
						total: t.scheduleNum-t.appointNum,
						day: item.appointDate,
						status: t.status  // 0 正常 1 过期  2  已约满
					}
				})
				this.info = {
					id: item.afternoonId,
					title: item.title,
					time: item.time,
					date: item.date,
					type: type,
					moment: data
				}

				this.date = {}
			},
			optionDate(item) {
				this.date = item
			},
			confirm(isClose) {
				if (!Object.keys(this.info).length) {
					this.$refs.uToast.show({
						title: '请选择日期'
					})
					return false
				} else if (!Object.keys(this.date).length) {
					this.$refs.uToast.show({
						title: '请选择时间段'
					})
					return false
				}
				this.show = false
				this.$emit("confirm", this.info.time.split(' ')[0], this.date, isClose ? 1 : 0)
			},
			close() {
				this.$emit('update:openShow',false)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop {
		width: 100%;
		max-height: 960rpx;

		.swpier {
			height: 412rpx;
		}

		.swiper_item_wrpaper {
			border: 1px solid #EEEEEE;
		}

		.header {
			width: 92rpx;
			height: 94rpx;
		}

		.header2 {
			width: 82rpx;
			height: 94rpx;
		}

		.word {
			background: rgba(0, 0, 0, 0);
		}

		.word2 {
			height: 60rpx;
		}

		.btn_confirm {
			width: 490rpx;
			height: 90rpx;
			border-radius: 90rpx;
		}

		.day_active {
			width: 35rpx;
			height: 35rpx;
		}

		.item_wrapper {
			width: 33.3%;
		}

		.item_wrapper:nth-child(3n + 2) {
			justify-content: center;
		}

		.item_wrapper:nth-child(3n) {
			justify-content: flex-end;
		}

		.item {
			width: 216rpx;
			height: 98rpx;
		}

		.active {
			background: #00A3FF;
			color: #fff;
		}
	}
</style>
