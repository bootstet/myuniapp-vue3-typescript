import qs from 'qs'
export { default as parser } from './parser';

export { default as isWeiXin } from './isWx'

export { isJknj, isJknjApp } from './isJknj'
export * from './platform/index.js'
// 等价于 export { isBrowser, isTx, isShaanxiJk, isXyb, isZfb } from './platform/index.js'

export { default as Storage} from './Storage'
import store from '@/store'

export const isEmpty = (str) => str === '' || str === null || str === undefined 
export const isEmptyStrict = (str) => str === '' || str === null || str === undefined || str === 'null' || str === 'undefined'

export const isObjNull = (obj) => Object.keys(obj).length === 0
/**
 * 校验手机号
 */
export function checkPhone(val) {
	let reg = /^1[3456789]\d{9}$/;
	if (reg.test(val)) {
		return true;
	} else {
		return false;
	}
}
//校验汉字和.
export function checkChineseText(val) {
	let reg = /^[\u4e00-\u9fa5·]+$/;
	if (reg.test(val)) {
		return true;
	} else {
		return false;
	}
}

/**
 * 获取url参数
 */
export function getQueryString(name, urlString) {
	// 将转义后的字符&amp;替换成&
	const urlParams = urlString || window.location.href
	const url = urlParams.replace(/&amp;|&amp%3B/g, '&');
	const href = decodeURIComponent(url);
	const reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	return "";
}
/**
 * 身份证号加星号
 */
export function toEncryption(str) {
	if (isEmpty(str)) {
		return ''
	}
	return str.replace(/(\d{6})\d{11}(\S{1})/, "$1***********$2");
}
/**
 * 手机号加星号
 */
export function toEncryptionPhone(str) {
	return  str.substr(0,3)+"****"+str.substr(7)
}
/**
 * 校验身份证号
 */
export function checkIdentityNumber(val) {
	let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	if (reg.test(val)) {
		return true;
	}
	return false;
}
/**
 * 根据身份证号获取年龄
 */
export function getAge(identityCard) {
	var len = (identityCard + "").length;
	var strBirthday = "";
	if (len == 18) {
		//处理18位的身份证号码从号码中得到生日和性别代码
		strBirthday =
			identityCard.substr(6, 4) +
			"/" +
			identityCard.substr(10, 2) +
			"/" +
			identityCard.substr(12, 2);
	}
	if (len == 15) {
		var birthdayValue = "";
		birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
		if (parseInt(birthdayValue) < 10) {
			strBirthday =
				"20" +
				identityCard.substr(6, 2) +
				"/" +
				identityCard.substr(8, 2) +
				"/" +
				identityCard.substr(10, 2);
		} else {
			strBirthday =
				"19" +
				identityCard.substr(6, 2) +
				"/" +
				identityCard.substr(8, 2) +
				"/" +
				identityCard.substr(10, 2);
		}
	}
	//时间字符串里，必须是“/”
	var birthDate = new Date(strBirthday);
	var nowDateTime = new Date();
	var age = nowDateTime.getFullYear() - birthDate.getFullYear();
	//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
	if (
		nowDateTime.getMonth() < birthDate.getMonth() ||
		(nowDateTime.getMonth() == birthDate.getMonth() &&
			nowDateTime.getDate() < birthDate.getDate())
	) {
		age--;
	}
	return age;
}

export function getBirthdayWithIdCard(identityCard) {
	var len = (identityCard + "").length;
	var strBirthday = "";
	if (len == 18) {
		//处理18位的身份证号码从号码中得到生日和性别代码
		strBirthday =
			identityCard.substr(6, 4) +
			"/" +
			identityCard.substr(10, 2) +
			"/" +
			identityCard.substr(12, 2);
	}
	if (len == 15) {
		var birthdayValue = "";
		birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
		if (parseInt(birthdayValue) < 10) {
			strBirthday =
				"20" +
				identityCard.substr(6, 2) +
				"/" +
				identityCard.substr(8, 2) +
				"/" +
				identityCard.substr(10, 2);
		} else {
			strBirthday =
				"19" +
				identityCard.substr(6, 2) +
				"/" +
				identityCard.substr(8, 2) +
				"/" +
				identityCard.substr(10, 2);
		}
	}
	return strBirthday
}
//根据日期获取两个日期间月龄 默认到当前日期 type 用于计算极端时刻如1月31出生到了2月28号算不算一月龄 (=2 3月1号算一月龄)
export function getBetweenMonth(oldDate, newDate = new Date(), type = 2) {
	let oldDay = getDateDic(oldDate)
	let newDay = getDateDic(newDate)
	if (newDay.year < oldDay.year || (newDay.year == oldDay.year && newDay.month <= oldDay.month)) {
		return 0
	}
	let yearCha = newDay.year - oldDay.year - 1
	let monthCha = newDay.month - oldDay.month
	if (yearCha < 0) {
		yearCha = 0
	}else {
		monthCha = (12 - oldDay.month) + newDay.month
	}
	if (newDay.day < oldDay.day) {
		if (type == 2) {
			monthCha -= 1
		}else {
			let lastDay = getMonthLastDate(newDay)
			if (newDay.day < lastDay.day) {
				monthCha -= 1
			}
		}
	}
	return yearCha * 12 + monthCha
}
//获取月最后一天
export function getMonthLastDate(val) {
	let year = val.month == 12 ? val.year + 1 : val.year
	let month = val.month == 12 ? 1 : val.month + 1
	return getDateDic(new Date(val.year, val.month, 0))
}
//获取日期Dic
export function getDateDic(val) {
	return {
		year: val.getFullYear(),
		month: val.getMonth() + 1,
		day: val.getDate()
	}		
}
// 日期格式化
export function dateFormat(fmt, data) {
	let ret;
	let date = new Date((typeof data == 'string') ? data.replace(/\-/g, '/') : data)
	let week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
	const opt = {
		"Y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"H+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"S+": date.getSeconds().toString(), // 秒
		"W+": week[date.getDay()] // 星期
	};
	for (let k in opt) {
		ret = new RegExp(k).exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[0], (ret[0].length == 1) ? (opt[k]) : (opt[k].padStart(ret[0].length, "0")))
		};
	};
	return fmt;
}

// 时间转时间戳
// type: 1 当前时间时间戳; 2 指定时间时间戳

export function timestamp(type, time) {
	var fmt = null
	if(type === '1') {
		fmt = new Date().getTime()
	}else{
		fmt = new Date(time).getTime()
	}
	return fmt;
}

export function isInteger(obj) {
	return obj % 1 === 0
}

/**
 * rpx转为px
 */
export const rpx2px = (rpx) => {
	const systemInfo = uni.getSystemInfoSync()
	return rpx / (750 / systemInfo.windowWidth)
}

/**
 * px转为rpx
 */
export const px2rpx = (px) => {
	const systemInfo = uni.getSystemInfoSync()
	return px * (750 / systemInfo.windowWidth)
}

export function handleOptions() { //uni处理页面参数
	const pages = getCurrentPages()
	// #ifdef  H5
	const indexUrl = uni.getStorageSync('indexUrl')
	// #endif
	// #ifdef MP-WEIXIN
	const indexUrl = 'pages/home/index'
	// #endif
	let routePath = "/" + pages[pages.length - 1].route
	let whiteRouter = ['/'+indexUrl, '/pages/order/index', '/pages/my/index']
	let options = pages[pages.length - 1].options
	let option = []
	console.log(routePath, "routePath")
	for (let i in options) {
		option.push(i + '=' + options[i])
	}
	console.log(option, "option")
	option = option.join('&')
	if (option.length) routePath = routePath + "?" + option
	return {
		url: routePath,
		type: whiteRouter.includes(routePath) ? 'switchTab' : 'redirectTo'
	}
}

export function toLogin() { //微信跳登录页面
	let option = handleOptions()
	// #ifdef  H5
	const indexUrl = uni.getStorageSync('indexUrl')
	// #endif
	// #ifdef MP-WEIXIN
	const indexUrl = 'pages/home/index'
	// #endif
	if (!option.url.includes('pages/login/index') && !option.url.includes(indexUrl)) {
		uni.redirectTo({
			url: "/pages/login/index?url=" + encodeURIComponent(option.url) + '&type=' + option.type
		})
	}
}

/**
 * 根据身份证号获取性别
 */
export function getSex(identityCard) {
	if(isEmpty(identityCard) || identityCard.length < 18) {
		return ''
	}
	const sex = parseInt(identityCard.substr(16, 1)) % 2 === 1 ? "男" : "女";
  return sex;
}

/**
 * 根据身份证号获取出生日期
 */
export function getBirthDate(identityCard) {
	const birth = `${identityCard.substring(6, 10)}/${identityCard.substring(
		10,
		12
	)}/${identityCard.substring(12, 14)}`;
	return birth;
}

/**
 * 根据年月日计算年龄
 */
export function calculateAge(birthDateStr) {
	const birthDate = new Date(birthDateStr);
	const currentDate = new Date();
	const age = currentDate.getFullYear() - birthDate.getFullYear();
	// 检查是否已过生日
	if (currentDate.getMonth() < birthDate.getMonth() || 
			(currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
			return age - 1;
	} else {
			return age;
	}
}

/**
 * 防抖
 */
export function debounce(func, wait, immediate) {
	let timer
	return function () {
		let context = this
		let args = arguments
		if (timer) clearTimeout(timer)
		if (immediate) {
			var callNow = !timer
			timer = setTimeout(() => {
				timer = null
			}, wait)
			if (callNow) func.apply(context, args)
		} else {
			timer = setTimeout(function(){
				func.apply(context, args)
			}, wait)
		}
	}
}

/**
 * 获取routeQuery onload调用
 * @param {*} option 
 * @returns 
 */
export function getRouteQuery (option )  {
  let routeQuery = {}
  // #ifdef H5
  const queryStr = location.hash.split('?').pop() || ''
  routeQuery = qs.parse(queryStr)
  // #endif
  // #ifdef MP
  if (!option) {
    console.warn(`option is required`);
  }
  routeQuery = option || {}
  // #endif
  return routeQuery
}

/**
 * 返回当前环境域名
 */
 export function returnHost() {
	const nodeEnv = process.env.NODE_ENV
	let httpUrl = ''
	switch(nodeEnv) {
		case 'development':case 'dev':case 'new-development':
			httpUrl = 'https://web-dev.zhil.cloud'
			break
		case 'test':case 'new-test':
			httpUrl = 'https://web-ft1.zhil.cloud'
			break
		case 'production':case 'new-production':case 'hw-prod':
			httpUrl = 'https://web.zhil.cloud'
			break
		case 'sit':
			httpUrl = 'https://web-sit.zhil.cloud'
			break
	}
	return httpUrl
}

// 转换回车换行为br标签
function nl2br(str, is_xhtml) {
  const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'
  return (str + '').replace(/(<p>&nbsp;<\/p>)/gi, breakTag)
}

/**
 * 富文本增加根节点
 * @param {*} nodes 
 * @returns 
 */
export function getRichText (nodes) {
	return `<div class="rich-content">${nl2br(nodes)}</div>`
}

/**
 * 根据机构id获取token
 */
export function getToken(source) {
	const tokenData = uni.getStorageSync('tokenData')
	const orgRelationList = uni.getStorageSync("orgRelationList")[source]
	let result = tokenData[source] || ''
	if (!result) {
		if (Object.prototype.toString.call(orgRelationList) !== '[object Array]') {
		return
		}
		const tokenResult = orgRelationList.reduce((acr, cur) => {
		if (tokenData[Number(cur)]) {
			const num = tokenData[Number(cur)]
			return num
		} else {
			return acr
		}
		}, '')
		result =  tokenResult
	}
	return result
}

function unescapeHTML(str) {
  return str  
    .replace(/&amp;/g, '&')  
    .replace(/&lt;/g, '<')  
    .replace(/&gt;/g, '>')  
    .replace(/&quot;/g, '"')  
    .replace(/&#039;/g, '\'');  
}

/**
 * 去除所有标签
 */
 export function delHtmlTag(str = '') {
	let newStr = unescapeHTML(str) || ''
	try {
		newStr = newStr.replace(/[\n\t\r]/g, ''); // 删除所有换行符、制表符和回车符
		newStr = newStr.replace(/<\/?[^>]*>/g, ''); // 使用正则表达式删除所有其他HTML标签  
		newStr = newStr.replace(/\s*/g, ""); 
		newStr = newStr.replace(/ /ig, " ");
	} finally {
		return newStr;
	} 
}

/**
 * 清除链接里url
 */
export function clearUrlOpenid() {

	const funcUrlDel = () => {
		const name = "open_id";
		const str = "nonce_str";
		const loca = window.location;
		const baseUrl = loca.origin + loca.pathname;
		const query = loca.hash

		if (query.indexOf(name)>-1) {
			const obj = {}
			const arr = query.split("&");
			for (var i = 0; i < arr.length; i++) {
					arr[i] = arr[i].split("=");
					obj[arr[i][0]] = arr[i][1];
			};
			delete obj[name];
			delete obj[str];
			if((obj['sourceType'] == 1 || obj['cAuth']) && store.getters.source) {
				delete obj["source"]
				// delete obj["sourceType"]
			};
			if(obj['cAuth'] && obj['oId']) obj['source'] = obj['oId']
			const url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g,"").replace(/\:/g,"=").replace(/\,/g,"&");
			return url;
		};
	}

	
	const newurl = funcUrlDel();

	if (!isEmpty(newurl)) {
		window.history.pushState({}, 0, newurl);
	}
}

/**
 * 引入外部js
 */
export function addJS (url) {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.src = url
		script.type = 'text/javascript'
		document.body.appendChild(script)
		script.onload = () => {
			resolve()
		}
	})
}
// 判断js是否引用
export function isInclude(name){
    let js= /js$/i.test(name);
    let es=document.getElementsByTagName(js?'script':'link');
    for(let i=0;i<es.length;i++) 
    if(es[i][js?'src':'href'].indexOf(name)!=-1) return true;
    return false;
}

/**
 * 获取url里所有参数
 */
export function getUrlParams(url) {
	const obj = {}
	if (url.includes('?')) {
		const str = url.split('?')[1]
		const strs = str.split('&')
		for(let i = 0; i < strs.length; i ++) {
			obj[strs[i].split('=')[0]] = unescape(strs[i].split("=")[1])
		}
	}
	return obj
}


/**
 * 获取url里路径
 */

export const getUrlRouter = url => {
	if (isEmpty(url)) {
		return ''
	}
	if (!url.includes('#')) {
		return ''
	}
	const urlhash = url.split('#')[1]
	const router = urlhash.split('?')[0]
	return router
}

/**
 * 判断 a 链接是否是 包含b链接
 * @eg: a : web.zhil.cloud/#/home/index?source=8&is_paimiao=1
 *      b : web.zhil.cloud/#/home/index?source=8         => true
 * 			b : web.zhil.cloud/#/home/index?source=8&v2=34   => false
 */

export function isSubUrl(a, b) {
	const excludeOpenKey = 'open_id'
	const excludeNonceKey = 'nonce_str'
	if (isEmpty(a) || isEmpty(b)) return false
	// host不同返回false
	const hostA = a.split('#')[0]
	const hostb = b.split('#')[0]
	// 路由不同返回false
	const hashA = getUrlRouter(a)
	const hashB = getUrlRouter(b)
	if (hostA !== hostb || hashA !== hashB) {
		return false
	}
	// 在判断参数是不是子集关系
	const paramsA = getUrlParams(a)
	const paramsB = getUrlParams(b)
	// 判断时去掉链接里的 open_id和 nonce_str
	delete paramsB[excludeOpenKey]
	delete paramsB[excludeNonceKey]
	let result = true
	for (const [key, value] of Object.entries(paramsB)) {
		if (paramsA.hasOwnProperty(key)) {
			if (value !== paramsA[key]) {
				result = false
			}
		} else {
			result = false
		}
	}
	return result
}
/**
 * 监听webview跳转小程序
 */
export function jumpToMiniProgramPage(url) {
	return new Promise((resolve, reject) => {
		const { hash } = window.location
		const href = location.href.split("#")[0]
		// 带给小程序页面的参数
		const defaultQuery = qs.stringify({
			href,
			hash,
		})
		// query参数连接符
		const joiner = url.indexOf("?") < 0 ? "?" : "&"
		const hashchangeFunc = (event) => {
			const { back } = qs.parse(location.hash.split("?")[1]);
			if(back) {
				uni.setStorageSync('miniprogramCallback', back)
				location.replace(event.newURL)
				history.back()
			}
			resolve(true)
			// 移除当前hashchange的监听
			window.removeEventListener("hashchange", hashchangeFunc)
		}
		// 跳转到对应页面, webview->小程序的通讯智能通过跳转小程序页面并且带入参数的方式
	
		// 监听hash变更，由于小程序没有api去实现小程序->webview的通讯，只能通过改变页面的hash传递消息
		window.addEventListener("hashchange", function(event) {
			hashchangeFunc(event)
		})
		setTimeout(()=>{
			resolve(true)
		}, 500)
	})
}
/**
 * 处理json数据
 */
export function handleJsonData(str) {
	if (!str || typeof str !== "string" || typeof str == undefined) return str;
	try {
	  const obj = JSON.parse(str);
	  if (typeof obj === "object" && obj) {
		return JSON.parse(str);
	  } else {
		return str;
	  }
	} catch (e) {
	  return str;
	}
}
/**
 * 判断当前是否在小程序webview环境
 */
export function getMiniProgram() {
	return new Promise(function(resolve, reject) {
		const ua = navigator.userAgent.toLowerCase()
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			
		} else {
			resolve('')
		}
	})
}
/**
 * 获取缓存中的appName
 */
export function getAppName() {
	const appNameCache = uni.getStorageSync('appNameObject') || ''
	return appNameCache
}
/**
 * 实体编码转义
 */
export function htmlDecode(text) {
	if(!text) return
	let temp = document.createElement('div')
	temp.innerHTML = text
	const output = temp.textContent || temp.innerText
	temp = null
	return output
}
/**
 * 获取文本长度
 * @param {*} text 
 * @returns 
 */
export const getTextWidth = (text, fontSize) => {
  const body = document.querySelector('body');
  const span = document.createElement('span');
  span.style.opacity = 0;
  span.style.fontSize = fontSize;
  span.innerText = text;
  span.style.whiteSpace = 'nowrap';
  body.appendChild(span);
  const width = span.offsetWidth;
  span.remove();
  return width;
};

/**
 * now现在表示的是当前日期的下一天的午夜前1毫秒
 * @param {*} text 
 * @returns 
 */
export const getTodayEndTime = () => {
	// 获取当前日期和时间
	const now = new Date();
	// 设置时间为00:00:00.000（即当天的午夜）
	now.setHours(0, 0, 0, 0);
	// 添加24小时减去1毫秒
	now.setMilliseconds(now.getMilliseconds() - 1);
	now.setTime(now.getTime() + 24 * 60 * 60 * 1000);
	// now现在表示的是当前日期的下一天的午夜前1毫秒
	console.log(now);
	return now
}

//返回两个日期相差的天数
export function DaysBetw(date1, date2) {
	//这里的date1,date2都是Date对象
	var d1 = new Date(date1);
	var d2 = new Date(date2);
	var dt1 = d1.getTime();
	var dt2 = d2.getTime();
	return parseInt(Math.abs(dt2 - dt1) / 1000 / 60 / 60 / 24);
}