<template>
	<u-popup
		v-model="show"
		border-radius="30"
		mode="bottom"
		safe-area-inset-bottom
		@close="close"
		height="90%"
		:closeable="true"
	>
		<view class="pd_30 p-r h_100">
			<text class="title">预约时间</text>
			<scroll-view class="pop over_y" scroll-y>
				<view class="calendar-Time-header flex_center">
					<!-- 上一个月 -->
					<u-icon
						name="arrow-up-fill"
						:color="lastDisabled?'#ccc':'#00A3FF'"
						size="30"
						@tap="subMonth"
						class="calendar-lastMonth mr_30"
					>
					</u-icon>
					<text class="calendar-TimeH">{{title_time}}</text>
					<!-- 下一个月 -->
					<u-icon
						name="arrow-down-fill"
						color="#00A3FF"
						size="30"
						class="calendar-nextMonth ml_30"
						@tap="addMonth"
					>
					</u-icon>
				</view>
				<view class="ClearBoth"></view>
				<view class="calendar-content">
					<view class="calendar-row calendar-header">
						<view class="calendar-col aligncanter">一</view>
						<view class="calendar-col aligncanter">二</view>
						<view class="calendar-col aligncanter">三</view>
						<view class="calendar-col aligncanter">四</view>
						<view class="calendar-col aligncanter">五</view>
						<view class="calendar-col aligncanter">六</view>
						<view class="calendar-col aligncanter">日</view>
					</view>
					<view class="calendar-row calendar-day" v-bind:style="{'transform':transformObj, 'transition-duration':transformTimeObj}">
						<!-- 上月 -->
						<view class="calendar-col aligncanter calendar-col-lastMonth" v-for='item in beforeDateList' v-bind:key='item.key'
						@tap="subMonth" v-bind:class="{'calendar-out-of-Date' : item.outOfDate }">
							<text class='calendar-text t_h_1'></text>
						</view>
						<!-- 本月 -->
						<view
							class="calendar-col aligncanter currentDays"
							:class="{'calendar-active' : item.dateIndex == currentSelectTime && item.dailyStatus===0
							, 'calendar-range' : item.isRanges
							, 'calendar-out-of-Date' : item.outOfDate }"
							v-for='item in dateList' v-bind:key='item.key'
							@tap="selectedDateFun(item)"
						>
							<view class='dayValue'>
								<text
									class='calendar-date'
									:class="{'today': item.isToday }"
									:style="{'color': item.dailyStatus === 2 ? '#fc4242' : item.isBeforeDay || item.dailyStatus?'#ccc':'#475266'}"
								>
									{{item.isToday?'今天':item.dateIndex}}
								</text>
								<text
									class='calendar-point'
									:style="{'color':item.pointTextColor?item.pointTextColor:maskColor}"
								>
									{{item.pointText}}
								</text>
								<!-- 可约 -->
								<text
									class="calendar-text t_h_1"
									:style="{'color': item.dailyStatus === 2 ? '#fc4242' : item.dailyStatus === 0 && !item.orgStatus ? item.markTextColor : maskColor}"
									v-if="!item.isBeforeDay"
								>
									{{(item.dailyStatus>2 || item.dailyStatus==undefined || item.orgStatus) && configTitle?configTitle:dailyStatusText(item.dailyStatus)}}
								</text>
							</view>
						</view>
						<!-- 下月 -->
						<!-- <view class="calendar-col aligncanter calendar-col-nextMonth" v-for='item in afterDateList' v-bind:key='item.key'
						@tap="addMonth" v-bind:class="{'calendar-out-of-Date' : item.outOfDate }">
							<text class='calendar-text'></text>
						</view> -->
					</view>
					<view class="ClearBoth"></view>
				</view>
				<view class="nav-list flex_center mt_60" v-if="timeList && timeList['上午'].length && timeList['下午'].length">
					<view
						v-for="item in navList"
						:key="item"
						class="nav-item"
						:class="{'active': navIndex===item, 'ml_40': item=='下午'}"
						:style="timeList[item]&&timeList[item].length?'':'display:none'"
						@click="getNavIndex(item)" c-click
					>
						<text>{{item}}</text>
					</view>
				</view>
				<view class="time-list flex flex_wrap mt_10 mb_60">
					<view
						class="time-item flex_c_center mt_20 mr_20"
						v-for="(item, index) in timeList[navIndex]"
						:key="index"
						:class="{'active': timeIndex===index, 'disabled': item.disabled}"
						@click="getTimeIndex(index, item.disabled)" c-click
					>
						<text>{{item.startTime}}至{{item.endTime}}</text>
						<text class="stock">（剩余{{subtractHandle(item.scheduleNum, item.appointNum)}}个）</text>
					</view>
				</view>
			</scroll-view>
			<view class="btn-fixed flex_c_center">
				<view class='btn-confirm' @click="confirm" c-click>确定</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'

	
	export default {
		name: 'Calendar',
		props: {
			/**
			 * 商品id
			 */
			goodsId: {
				type: [String, Number],
				default: () => '',
			},
			/**
			 * 已选择的时间
			 */
			dateParent: {
				type: String,
				default: () => '',
			},
			/**
			 * 显示日历控件
			 */
			openShow: {
				type: Boolean,
				default: () => {
					return false
				},
			},
			/**
			 * @description 当前时间 yyyy-MM-dd
			 */
			currentTime: {
				type: String,
				default: function() {
					let timeObj = new Date();
					return timeObj.getFullYear() + "-" + (timeObj.getMonth() + 1) + "-" + timeObj.getDate();
				}
			},
			/**
			 * @description 标记点列表
			 * time	标记时间	yyyy-MM-dd
			 * text	标记内容 
			 * markPoint 是否显示标记点 默认false
			 * markTextColor 标记内容颜色
			 * pointText 左上角标记点内容
			 * pointTextColor 标记点颜色
			 */
			mark: {
				type: Array,
				default: function() {
					return undefined;
				}
			},
			/**
			 * @description 上月文字
			 */
			lastText: {
				type: String,
				default: '〈'
			},
			/**
			 * @description 下月文字
			 */
			nextText: {
				type: String,
				default: '〉'
			},
			/**
			 * @description 全局标记点颜色，包括点和文字
			 */
			maskColor: {
				type: String,
				default: '#ccc'
			},
			/**
			 * @description 是否显示农历，mask优先级高
			 */
			showLunar: {
				type: Boolean,
				default: true
			},
			/**
			 * @description 设置标记范围
			 */
			range: {
				type: Object,
				default: function() {
					return {
						rangeStart: undefined, //设置标记范围开始，yyyy-MM-dd
						rangeEnd: undefined //设置标记范围结束，yyyy-MM-dd
					}
				}
			},
			/**
			 * @description 是否开启范围选择模式
			 */
			rangeMode: {
				type: Boolean,
				default: false
			},
			/**
			 * @description 日历起始时间 yyyy-MM-dd
			 */
			dateStart: {
				type: String,
				default: '1970-01-01'
			},
			/**
			 * @description 日历结束时间 yyyy-MM-dd
			 */
			dateEnd: {
				type: String,
				default: '2100-12-31'
			},
			/**
			 * @description 是否可以滚动
			 */
			canDrag:{
				type: Boolean,
				default: true
			},
			// 当前是否为商品预约开放时间
			disabled: {
				type: Boolean,
				default: true,
			},
			// 号源接口数据
			responseData: {
				type: Object,
				default: {},
			},
			configTitle: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				nextDisabled: true,
				lastDisabled: true,
				currentSelectTime: undefined, //点击时保存的dateIndex
				title_time: '', //顶头文本
				year: undefined, //当前年
				month: undefined, //当前月
				beforeDateList: [], //上个月的日期列表
				dateList: [], //本月的日期列表
				afterDateList: [], //下个月的日期列表
				firstRangeSelected: false, // 范围开始时间是否已经选择
				rangeStart_: undefined, //标记范围开始，yyyyMM-dd
				rangeEnd_: undefined, //标记范围结束，yyyyMM-dd
				transform_x:0,
				transform_time:0,
				show: true,
				//上下午控件选择索引
				navIndex: '上午',
				navList: ['上午', '下午'],
				timeList: '',
				timeIndex: -1,
				//商品id
				goodsIdValue: null,
				selectedItem: '',
				currentDate: '',
				currentAppointDate: '',
				currentAppointTime: '',
				isFirstRequest: false,//是否为第一次回显
				isSecondRequest: false,//是否为第二次回显
				//第一次请求的号源数据
				scheduleList: [],
        // 当前是否为预约开发时间
        isOpenTimeUp: true,
				// 当前是否为商品预约开放时间
				isDisabled: this.disabled,
				// 组件接收到的四、九价号源数据
				resData: {},
			};
		},
		watch: {
			dateParent: {
				immediate: true,
				handler: function(newVal) {
					if(newVal) {
						const result = newVal.replace('至', '~')
						this.currentAppointDate = result.split(' ')[0]
						this.currentAppointTime = result.split(' ')[1]
						this.isFirstRequest = true
					}
				}
			},
			goodsId: {
				immediate: true,
				handler: function(newVal) {
					if(newVal) {
						this.goodsIdValue = newVal
						this.render()
					}
				}
			},
			currentTime: function(val, oldVal) { //时间改变
				let dateNew = this.toDateByStr1(val);
				if (dateNew.getFullYear() == this.year && (dateNew.getMonth() + 1) == this.month) {
					console.log('time is not change')
				} else {
					this.currentSelectTime = dateNew.getDate();
					this.render();
				}
			},
			range: function(val, oldVal) { //范围改变
				if (val.rangeStart != oldVal.rangeStart || val.rangeEnd != oldVal.rangeEnd) {
					this.rangeStart_ = val.rangeStart;
					this.rangeEnd_ = val.rangeEnd;
					this.setRange();
				}
			},
			mark: function(val, oldVal) { //标记改变
				this.render();
			},
			rangeMode: function(val, oldVal) { //范围改变
				if (!val) { //如果是关闭范围模式
					this.rangeStart_ = undefined; //标记范围开始，yyyyMM-dd
					this.rangeEnd_ = undefined; //标记范围结束，yyyyMM-dd
					this.firstRangeSelected = false;
					this.clearRange()
				}
			},
			openShow: {
				handler(newValue, oldValue) {
					this.show = newValue
				},
				immediate: true
			},
			responseData: {
				handler(newValue, oldValue) {
					this.resData = newValue || {}
					this.render()
				},
				immediate: true,
				deep: true
			},
		},
		computed: {
			transformObj:function () { 
				return 'translate3d(' + this.transform_x + 'px, 0px, 0px) translateZ(0px)';
			},
			transformTimeObj:function () {
				return this.transform_time + 'ms';
			},
			...mapGetters(['source']),
		},
		methods: {
			dailyStatusText(value) {
				const statusArr = {
					0: '可约',
					1: '过期',
					2: '约满',
					3: '暂无'
				}
				return statusArr[value] || '暂无'
			},
			/**
			 * 选择时间段 回传
			 */
			confirm() {
				if(this.timeIndex<0) {
					uni.showToast({
						icon: 'none',
						title: '请选择时间段'
					})
					return
				}
				const time = this.timeList[this.navIndex][this.timeIndex]
				this.show = false
				//日期 时间
				const timeParam = {
					date: `${time.startTime}至${time.endTime}`,
					day: this.selectedItem.date,
					id: this.selectedItem.id,
					status: time.status,
					total: time.scheduleNum
				}
				this.$emit("confirm", this.selectedItem.date, timeParam)
			},
			/**
			 * 获取号源数据
			 */
			async getDateList(setTimeStr) {
				// 商品未到预约开放时间 不请求接口
				if(!this.isDisabled) return
				//第一次进入页面才请求
				let res = this.scheduleList
				if(!setTimeStr) {
					// 四、九价号源数据
					let resData = this.resData
          if (Array.isArray(resData)) {
            this.scheduleList = resData
            res = resData
          } else {
            this.scheduleList = resData.list || []
            res = resData.list
            this.isOpenTimeUp = resData.isOpenTimeUp || true
          }
				}
				if(!res || !res || !this.isOpenTimeUp) return
				const dateList = this.dateList
				this.dateList = dateList.map((dateItem, index) => {
					if(dateItem.date == this.currentAppointDate) this.currentSelectTime = dateItem.dateIndex
					if(this.scheduleList.some(item => item.date == dateItem.date)) {
						return {
							...dateItem,
							...res.filter(item => item.date == dateItem.date)[0]
						}
					}else {
						return dateItem
					}
				})
				//判断是否可以查看上一月份的号源
				const now = new Date()
				const selectedItemPrev = this.getPrevDate(this.currentDate.year, this.currentDate.month)
				const currentItemPrev = this.getPrevDate(now.getFullYear(), now.getMonth()+1)
				this.lastDisabled = selectedItemPrev == currentItemPrev
				
				
				//回显日期、时间段
				//计算当前选中年月与当前年月相差几个月
				//如果有回传选中的日期 则默认跳转到指定月份
				//没有回传选中的日期时 则取号源列表中的首月值
				const appointDate = this.currentAppointDate
									?
									this.currentAppointDate.replace(/-/g, '/')
									:
									res.length
									?
									res[0].date.replace(/-/g, '/')
									:
									''
				const diffCount = this.monDiff(`${this.currentDate.year}/${this.currentDate.month}/01`, appointDate)
				//如果有号源的日期不是本月 是其他月份 则再渲染一遍日历
				if(!this.isSecondRequest && diffCount>0) {
					this.isSecondRequest = true
					this.render(appointDate)
				}
				
				
				//第一次回显 才回显已选中的预约时间段
				if(!this.isFirstRequest) return
				const selectItem = res.find(item => item.date == this.currentAppointDate)
				if(selectItem) {
					const startTime = this.currentAppointTime.split('~')[0]
					const endTime = this.currentAppointTime.split('~')[1]
					//判断上午 下午
					const type = parseInt(startTime.split(':')[0]) < 13 && parseInt(endTime.split(':')[0]) < 13?'amScheduleTimeList':'pmScheduleTimeList'
					res.forEach((item, index)=>{
						if(this.currentAppointDate == item.date) {
							this.selectedItem = item
							this.showTimeData(item)
							this.navIndex = type=='amScheduleTimeList'?'上午':'下午'
							this.timeIndex = item[type].findIndex(t=>t.startTime==startTime && t.endTime==endTime)
						}
					})
				}
				this.isFirstRequest = false
			},
			/**
			 * 获取上个月的年月
			 */
			getPrevDate(year, month) {
				var months = month
				var m = '0' +  (months-1)
				var y = year
				if (months == 1 ) {
					y--
					m = '12'
				} 
				return `${y}-${m.substr(m.length - 2, 2)}`
			},
			/**
			 * 获取下个月的年月
			 */
			getNextDate() {
				var months = Number(this.currentDate.month)+1
				var m = '0' +  months
				var y = this.currentDate.year
				if (months == 12 ) {
					y++
					m = '01'
				}
				return `${y}-${m.substr(m.length - 2, 2)}`
			},
			/**
			 * 选择时间范围
			 */
			getTimeIndex(index, disabled) {
				if(disabled) return
				this.timeIndex = index
			},
			/**
			 * 选择上下午
			 */
			getNavIndex(index) {
				this.navIndex = index
				this.timeIndex = -1
			},
			/**
			 * 判断是否为当天前
			 */
			checkTime(date, time){
				const now = new Date()
				const year = now.getFullYear()
				const month = now.getMonth()+1
				const dateValue = now.getDate()
				const nowValue = new Date(`${year}/${month}/${dateValue} 00:00:00`).getTime()
				const computedDate = new Date(`${date} ${time}`).getTime()
				if(nowValue>computedDate)
					return true
				else
					return false
			},
			render(setTimeStr) { //初始化
				let that = this;
				let currentTimeStr = setTimeStr ? setTimeStr : that.currentTime;
				let timeObj = this.toDateByStr(currentTimeStr); //当前选定的时间
				//计算头部显示的年月
				let _tempTileMonth = (timeObj.getMonth() + 1);
				if (_tempTileMonth < 10)
					_tempTileMonth = '0' + _tempTileMonth;
				this.title_time = timeObj.getFullYear() + "年" + _tempTileMonth + "月";
				//获取当前时间月份1号
				let firstDayStr = timeObj.getFullYear() + "/" + (timeObj.getMonth() + 1) + "/01";
				let date = that.toDateByStr(firstDayStr);
				that.year = date.getFullYear();
				that.month = date.getMonth() + 1;
				
				let firstDayWeek = !date.getDay()?6:date.getDay()-1; //第一天是星期几
				let grid_sum = 0; //总格子数 ，用于后面填满格子
				//获取上一个月的天数
				let TempMonth;
				let TempYear;
				if (that.month == 1) { //跨年
					TempMonth = 12;
					TempYear = that.year - 1;
				} else {
					TempYear = that.year;
					TempMonth = that.month - 1;
				}
				let TempLastMonthStr = TempYear + "/" + TempMonth + "/01";
				let lastMonthTotalDay = that.getTotalDay(TempLastMonthStr);
				let lastMonthStartDay = lastMonthTotalDay - firstDayWeek;

				let _dateStart = that.toDateByStr1(that.dateStart);
				let _dateEnd = that.toDateByStr1(that.dateEnd);
				// 创建前面的日期
				that.beforeDateList = [];
				for (let i = 0; i < firstDayWeek; i++) {
					grid_sum++;
					lastMonthStartDay++;
					let tempObj = {
						dateIndex: lastMonthStartDay,
						key: 'before_' + i
					};

					//判断是否超出日期范围
					let _tempBeforeDate = new Date(TempYear + "/" + TempMonth + "/" + lastMonthStartDay);
					if (_dateStart > _tempBeforeDate || _tempBeforeDate > _dateEnd) {
						tempObj.outOfDate = true;
					}

					that.beforeDateList.push(tempObj);
				}

				//获取一个月的天数
				let totalDay = that.getTotalDay(currentTimeStr);
				 
				//生成本月日历
				let today = new Date();
				let today_year = today.getFullYear();
				let today_month = today.getMonth() + 1;
				let today_day = today.getDate();
				that.dateList = [];
				that.currentDate = {
					year: timeObj.getFullYear(),
					month: (timeObj.getMonth()+1)<10?'0'+(timeObj.getMonth()+1):(timeObj.getMonth()+1)
				}
				for (let i = 1; i <= totalDay; i++) { //循环日
					grid_sum++;
	
					let tempObj = {
						dateIndex: i,
						key: 'date_' + i,
						isRanges: false,
						isToday: false,
						date: `${that.currentDate.year}-${that.currentDate.month}-${i<10?'0'+i:i}`,
						isBeforeDay: false
					};
					//当前日期变量
					let tempDay = that.toDateByStr(that.year + "/" + that.month + "/" + i);

					//判断是否为当天
					if (today_year == that.year && today_month == that.month && today_day == i)
						tempObj.isToday = true;

					//判断是否为当天之前的数据
					tempObj.isBeforeDay = this.checkTime(`${that.year}/${that.month}/${i}`, '00:00:00')

					//判断是否超出日期范围
					if (_dateStart > tempDay || tempDay > _dateEnd) {
						tempObj.outOfDate = true;
					}

					//设置了标记点
					if (that.mark) {
						for (let z = 0; z < that.mark.length; z++) { //判断是否为标记点
							let tempDayMark = that.toDateByStr1(that.mark[z].time.trim())
							if (tempDay.getTime() == tempDayMark.getTime()) {
								let tempTextStr = that.mark[z].text
								if (that.mark[z].markPoint != false) { // 是否显示点
									tempObj.pointText = that.mark[z].pointText ? that.mark[z].pointText : '●';
									tempObj.pointTextColor = that.mark[z].pointTextColor ? that.mark[z].pointTextColor : undefined;
								}
								if (tempTextStr != undefined && tempTextStr != "") { // 是否显示文字
									tempObj.markText = tempTextStr;
									tempObj.markTextColor = that.mark[z].markTextColor ? that.mark[z].markTextColor : undefined;
								}
								break;
							}
						}
					}
					that.dateList.push(tempObj);
				}
				that.setRange();

				// 创建后面的空白，补够五行
				that.afterDateList = [];
				if (grid_sum < 42) { // 创建后面的空白，补够五行
					let j = 0;

					//获取下一月
					let TempMonthNext;
					let TempYearNext;
					if (that.month == 12) { //跨年
						TempMonthNext = 1;
						TempYearNext = that.year + 1;
					} else {
						TempYearNext = that.year;
						TempMonthNext = that.month + 1;
					}

					for (let i = grid_sum; i < 42; i++) {
						j++;

						let tempObj = {
							dateIndex: j,
							key: 'after_' + j
						};

						//判断是否超出日期范围
						let _tempAfterDate = new Date(TempYearNext + "/" + TempMonthNext + "/" + j);
						if (_dateStart > _tempAfterDate || _tempAfterDate > _dateEnd) {
							tempObj.outOfDate = true;
						}

						that.afterDateList.push(tempObj);
					}
				}
				//获取号源数据
				this.getDateList(setTimeStr)
			},
			getTotalDay(time) { //获取月 日期总数
				time = time.replace(/-/g, "/");
				let selectedDate = new Date(time);
				if (selectedDate == "Invalid Date") {
					selectedDate = new Date(time + "/01");
				}
				
				let dayMany = new Date(selectedDate.getFullYear(),(selectedDate.getMonth() + 1), 0).getDate()
				return dayMany;
			},
			toDateByStr(timeStr) { //字符串转换时间，转换失败或者不传字符串则返回当前
				let timeObj;
				if (timeStr) {
					timeObj = new Date(timeStr.replace(/-/g, "/"));
				}
				if (!timeStr || timeObj == "Invalid Date")
					timeObj = new Date();
				return timeObj;
			},
			toDateByStr1(timeStr) { //字符串转换时间，转换失败或者不传字符串则null
				try {
					let timeObj;
					if (timeStr) {
						timeObj = new Date(timeStr.replace(/-/g, "/"));
					}
					if (!timeStr || timeObj == "Invalid Date")
						return null;
					return timeObj;
				} catch (e) {
					return null;
				}
			},
			getTimeStrFormat(timeStr) { //获取格式化的时间 yyyy-MM-dd
				let timeObj;
				if (timeStr) {
					timeObj = new Date(timeStr.replace(/-/g, "/"));
				}
				if (!timeStr || timeObj == "Invalid Date")
					timeObj = new Date();
				return timeObj.getFullYear() + "-" + (timeObj.getMonth() + 1) + "-" + timeObj.getDate();
			},
			selectedDateFun(item) { //点击日期
				if(item.dailyStatus || item.orgStatus) return
				const index = item.dateIndex
				let that = this;
				let selectObj = that.dateList[index - 1];
				this.selectedItem = item
				selectObj.year = that.year;
				selectObj.month = that.month;
				selectObj.day = index;
				selectObj.time = that.year + "-" + that.month + "-" + index;
				that.$emit('dayChange', selectObj);

				//判断是否超出日期范围
				if (that.checkOutOfDate(selectObj.time)) {
					return;
				}
				that.currentSelectTime = index;

				//开启了范围选择模式
				if (that.rangeMode) {
					if (!that.firstRangeSelected) { //选择开始时间
						that.firstRangeSelected = !that.firstRangeSelected
						that.rangeStart_ = selectObj.time;
						that.rangeEnd_ = undefined;
						that.clearRange();
					} else { //选择了结束时间
						that.rangeEnd_ = selectObj.time;
						that.firstRangeSelected = !that.firstRangeSelected
						that.$emit('rangeChange', {
							start: that.rangeStart_,
							end: that.rangeEnd_,
						});
						that.setRange();
					}
				}
				//展示时间段
				this.showTimeData(item)
			},
			/**
			 * 展示时间段
			 */
			showTimeData(item) {
				if(!item.amScheduleTimeList || !item.pmScheduleTimeList) {
					this.timeList = ''
					return
				}
				
				item.amScheduleTimeList.map((t, i) => {
					//禁用当天之前的数据
					if(this.checkTime(`${item.year}/${item.month}/${item.day}`, `${t.endTime}:00`) || t.status || !item.amIsWork) {
						t.disabled = true
					}
					//预约日期回显判断
					if(this.currentAppointTime == `${t.startTime}~${t.endTime}`) {
						this.timeIndex = i
					}
				})
				
				item.pmScheduleTimeList.map((t, i) => {
					//禁用当天之前的数据
					if(this.checkTime(`${item.year}/${item.month}/${item.day}`, `${t.endTime}:00`) || t.status || !item.pmIsWork) {
						t.disabled = true
					}
					//预约日期回显判断
					if(this.currentAppointTime == `${t.startTime}~${t.endTime}`) {
						this.timeIndex = i
					}
				})
				this.timeList = {
					'上午': item.amScheduleTimeList,
					'下午': item.pmScheduleTimeList
				}
				//上下午都有号源才会展示上下午的选择组件
				this.navIndex = this.timeList['上午'].length?'上午':'下午'
			},
			addMonth() { //加一个月
				//切换月份时清空可选时间段
				this.timeList = ''
				this.timeIndex = -1
				let that = this;

				let _Month = that.month;
				let _Year = that.year;
				if (that.month == 12) { //跨年
					_Month = 1;
					_Year += 1;
				} else {
					_Month += 1;
				}

				let str = _Year + "/" + _Month + "/01";

				//判断是否超出日期范围
				if (that.checkOutOfDate(str)) {
					that.nextDisabled = true;
					return;
				}

				that.month = _Month;
				that.year = _Year;
				that.lastDisabled = false;

				//检查日期上限值是否在当月内，如果在则不能再切换下个月
				if (that.checkDateRange(that.year, that.month, 1)) {
					that.nextDisabled = true;
				}

				
				that.currentSelectTime = undefined;
				

				that.$emit('monthChange', {
					date: str
				});
				that.render(str);
			},
			subMonth() { //减一个月
				if(this.lastDisabled) return
				//切换月份时清空可选时间段
				this.timeList = ''
				this.timeIndex = -1
				let that = this;

				let _Month = that.month;
				let _Year = that.year;
				if (that.month == 1) { //跨年
					_Month = 12;
					_Year -= 1;
				} else {
					_Month -= 1;
				}

				let str = _Year + "/" + _Month + "/01";

				//判断是否超出日期范围
				let _totalDay = that.getTotalDay(str);
				if (that.checkOutOfDate(_Year + "/" + _Month + "/" + _totalDay)) {
					that.lastDisabled = true;
					return;
				}

				that.month = _Month;
				that.year = _Year;
				that.nextDisabled = false;

				//检查日期下限值是否在当月内，如果在则不能再切换上个月
				if (that.checkDateRange(that.year, that.month)) {
					that.lastDisabled = true;
				}

				
				that.currentSelectTime = undefined;
				

				that.$emit('monthChange', {
					date: str
				});
				that.render(str);
			},
			setRange() { //设置范围
				let that = this;
				let rangeStartDate = that.toDateByStr1(that.rangeStart_);
				let rangeEndDate = that.toDateByStr1(that.rangeEnd_);
				if (!rangeStartDate || !rangeEndDate)
					return;
				if (rangeStartDate > rangeEndDate) { //防止范围出错
					let tempD = rangeEndDate;
					rangeEndDate = rangeStartDate;
					rangeStartDate = tempD;
				}

				//循环判断范围
				for (let i = 0; i < that.dateList.length; i++) {
					let _TempDtStr = that.year + "/" + that.month + "/" + that.dateList[i].dateIndex;
					let _TempDt = that.toDateByStr1(_TempDtStr);
					that.dateList[i].isRanges = false;
					if (rangeStartDate <= _TempDt && _TempDt <= rangeEndDate) //时间在范围内
						that.dateList[i].isRanges = true;
				}
			},
			clearRange() { //关闭范围模式范围
				let that = this;
				//循环判断范围
				for (let i = 0; i < that.dateList.length; i++) {
					that.dateList[i].isRanges = false;
				}
			},
			checkOutOfDate(time) { //判断是否超出日期范围,yyyy-MM-dd
				let that = this;
				let _dateStart = that.toDateByStr1(that.dateStart);
				let _dateEnd = that.toDateByStr1(that.dateEnd);
				let _tempDate = that.toDateByStr1(time);
				if (_dateStart > _tempDate || _tempDate > _dateEnd) {
					return true;
				} else
					return false;
			},
			checkDateRange(year, month, type) { //判断范围界限值是否在当月内,yyyy-MM-dd,type；1 上限值,其他：下限值
				let that = this;

				let totalDay = that.getTotalDay(year + '/' + month + '/01');
				let firstD = that.toDateByStr1(year + '/' + month + '/01');
				let lastD = that.toDateByStr1(year + '/' + month + '/' + totalDay);

				if (type == 1) { //上限值
					let _dateEnd = that.toDateByStr1(that.dateEnd);
					if (firstD <= _dateEnd && _dateEnd <= lastD) {
						return true;
					} else
						return false;
				} else { //下限值
					let _dateStart = that.toDateByStr1(that.dateStart);
					if (firstD <= _dateStart && _dateStart <= lastD) {
						return true;
					} else
						return false;
				}
			},
			calendarTransform(x,time){  //日历滑动动画
				this.transform_x = x;
				this.transform_time = time;
			},
			touchstart(event) {
				if(!this.canDrag)
					return;
				this.startPageX = event.touches[0].pageX;
				this.startPageY = event.touches[0].pageY;
			},
			touchmove(event) {
				if(!this.canDrag)
					return;
				let touchmovePageX = event.touches[0].pageX;
				let result = touchmovePageX - this.startPageX;
				this.calendarTransform(result,0);
			},
			touchend(event) {
				if(!this.canDrag)
					return;
				let that = this;
				let endPageX = event.changedTouches[0].pageX;
				let endPageY = event.changedTouches[0].pageY;
				let x = Math.abs(that.startPageX - endPageX); //横坐标之差
				let y = Math.abs(that.startPageY - endPageY); //纵坐标之差
				
				let screenX = 0;
				try {
				    const res = uni.getSystemInfoSync();
				    screenX = res.windowWidth;
				} catch (e) {
					console.error(e)
					return;
				}
				if (that.startPageX > endPageX) { //左滑
					let a = Math.atan(y / x);
					let Rate = x / screenX;
					if (a < Math.PI / 6 && Rate > 0.3) {
						screenX = -screenX;
						that.calendarTransform(screenX,300);
						setTimeout(function(){
							that.addMonth();
							that.calendarTransform(0,0);
						},300);
					}
					else{
						that.calendarTransform(0,300);
					}
				} else {
					let a = Math.atan(y / x);
					let Rate = x / screenX;
					if (a < Math.PI / 6 && Rate > 0.3) {
						that.calendarTransform(screenX,300);
						setTimeout(function(){
							that.subMonth();
							that.calendarTransform(0,0);
						},300);
					}
					else{
						that.calendarTransform(0,300);
					}
				}
			},
			close() {
				this.$emit('update:openShow',false)
			},
			monDiff(startTime, endTime){
				startTime=new Date(startTime)
				endTime=new Date(endTime)
				let date2Mon
				let startDate=startTime.getDate()+startTime.getHours()/24+startTime.getMinutes()/24/60
				let endDate=endTime.getDate()+endTime.getHours()/24+endTime.getMinutes()/24/60
				if(endDate>=startDate){
					date2Mon=0
				}else{
					date2Mon=-1
				}
				return (endTime.getYear()-startTime.getYear())*12+endTime.getMonth()-startTime.getMonth()+date2Mon
			},
			// 两数相减，0和正数正常显示，如果是负数，显示0
			subtractHandle(a, b) {
				const result = Number(a) - Number(b)
				return result >= 0 ? result : 0;
			}
		},
	}
</script>

<style lang="scss" scoped>
	.time-list {
		margin-right: -20rpx;
		.time-item {
			width: calc((100% / 3) - 20rpx);
			height: 100rpx;
			background: #F4F4F4;
			border-radius: 16rpx;
			font-size: 28rpx;
			font-family: PingFang-SC-Bold, PingFang-SC;
			font-weight: bold;
			color: #475266;
			.stock {
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #878D99;
			}
		}
		.active {
			background: rgba(0, 181, 255, 0.08);
			border: 2rpx solid #00B5FF;
			color: #00B5FF;
			.stock {
				color: #00B5FF;
			}
		}
		.disabled {
			background: #fff;
			border: 2rpx solid #ccc;
			color: #ccc;
			.stock {
				color: #ccc;
			}
		}
	}
	.nav-list {
		.nav-item {
			width: 200rpx;
			height: 60rpx;
			background: rgba(0, 163, 255, 0.1);
			border-radius: 35rpx;
			font-size: 30rpx;
			font-family: PingFang-SC-Bold, PingFang-SC;
			font-weight: bold;
			color: #00A3FF;
			line-height: 60rpx;
			text-align: center;
		}
		.active {
			background: #00A3FF;
			color: #FFFFFF;
		}
	}
	.pop {
		height: calc(100% - 225rpx);
	}
	.btn-fixed {
		background-color: #FFFFFF;
		box-shadow: 0 -10rpx 20rpx 0 rgba(71, 82, 102, 0.1);
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 185rpx;
		.btn-confirm {
			width: 600rpx;
			height: 90rpx;
			line-height: 90rpx;
			background: #00A3FF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-family: PingFang-SC-Bold, PingFang-SC;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			margin: 0 auto;
		}
	}
	.title {
		font-size: 34rpx;
		font-family: PingFang-SC-Bold, PingFang-SC;
		font-weight: bold;
		color: #333333;
	}
	.calendar-Time-header{
		text-align: center;
		vertical-align: middle;
		padding: 30rpx 0;
	}
	.calendar-TimeH{
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #2C2F37;
	}
	.calendar-lastMonth{
		transform: rotate(-90deg);
	}
	.calendar-nextMonth{
		transform: rotate(-90deg);
	}

	.calendar-row:before,
	.calendar-row:after {
		display: table;
		content: ' ';
	}

	.calendar-row:after {
		clear: both;
	}

	.calendar-col {
		width: 14.285714%;
		max-width: 14.285714%;
		position: relative;
		float: left;
		min-height: 80rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.aligncanter {
		text-align: center;

	}

	.calendar-header {
		color: gray;
		height: 40rpx;
		line-height: 40rpx;
		vertical-align: middle;
		font-size: 24rpx;
	}

	.calendar-day {
		height: 80rpx;
		transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms; transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
	}


	.calendar-content {
	}

	.calendar-date{
	}
	.today {
		font-size: 28rpx;
		font-family: PingFang-SC-Bold, PingFang-SC;
		font-weight: bold;
		color: #475266;
	}
	.calendar-today {
		background: #00A3FF;
		border-radius: 12rpx;
	}
	.calendar-today .calendar-point{
		color: white !important;
	}

	.calendar-today .calendar-text{
		color: white !important;
	}

	.calendar-col-lastMonth .calendar-text{
		font-size: 22rpx;
		font-family: PingFang-SC-Bold, PingFang-SC;
		font-weight: bold;
		color: #CCCCCC;
	}

	.calendar-date {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #475266;
	}

	.calendar-col-nextMonth .calendar-text{
		color: gray;
	}

	.calendar-today .calendar-date{
		color: white !important;
	}

	.calendar-active {
		background: #00A3FF;
		border-radius: 12rpx;
		.calendar-date, .calendar-text {
			color: #fff!important;
		}
	}
	/* 范围标记 */
	.calendar-range {
		/* color:#01AAED; */
		border-radius: 0px;
		background-color: #D9D9D9;
		-moz-box-shadow: none;
		-webkit-box-shadow: none;
		box-shadow: none;
	}



	.ClearBoth {
		clear: both;
	}
	.calendar-col-nextMonth{
		color:gray;
	}
	.calendar-col-lastMonth{
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #CCCCCC;
	}
	.calendar-btn-disabled{
		color:gainsboro;
	}
	.calendar-point{
		font-size: 16rpx;color: #01AAED;top:2rpx;right: 2rpx;position: absolute;
	}
	.calendar-text{
		padding: 4rpx 0;
		width:100%;
		top:40rpx;
		left: 0px;
		position: absolute;
		overflow:hidden;
		font-size: 22rpx;
		font-family: PingFang-SC-Bold, PingFang-SC;
		font-weight: bold;
		color: #00A3FF;
	}
	.dayValue{
		text-align: center;
	}

	.calendar-day-6-7{
		color: orangered;
	}

	/* 超出日期范围 */
	.calendar-out-of-Date{
		background-color: #EAEAEA;
	}
	.calendar-out-of-Date .calendar-date{
		color: gray;
	}





	/* 以下为实现0.5px底部边界 */
	.under_line{position: relative;}
	.under_line:before,
	.under_line:after{position: absolute;content: " ";height: 1px;width: 100%;left: 0;transform-origin: 0 0;-webkit-transform-origin: 0 0;}
	/* .fineLine:before{顶部top: 0;background: #000;} */
	.under_line:after{bottom: 0;border-bottom: 1px solid gainsboro;}
	@media only screen and (-webkit-min-device-pixel-ratio: 1.5){.under_line:after,.under_line:before{-webkit-transform: scaleY(.667);}}
	@media only screen and (-webkit-min-device-pixel-ratio: 2){.under_line:after,.under_line:before{-webkit-transform: scaleY(.5);}}
	/* 以上为实现0.5px底部边界 */
</style>
