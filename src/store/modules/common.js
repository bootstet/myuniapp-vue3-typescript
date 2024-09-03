import {
	platform
} from '@/utils/platform.js'
import {
	getSubsibes
} from '@/api/message.js'
import {
	getOpenInByOry,
	putOpenId,
	getOrgInfoById,
	getIsRequest,
	getIsRequestH5
} from '@/api/common'
import wxAuthorize from '@/utils/wxAuthorize.js'
import newWxAuthorize from '@/utils/newWxAuthorize.js'

import { saveOpenId } from './openId.js'

import {
	getQueryString,
	clearUrlOpenid,
	getMiniProgram
} from '@/utils'
import {
	getHomePageOrgInfoById
} from '@/api/home.js'
import Cookies from 'js-cookie'
import { parser } from '@/utils';

// source变化后需要立即校验授权的页面
const needGetOpenIdPathList = ['pages/goods/index', 'pages/my/index', 'pages/order/index', 'pages/detail/index']

/**
 * 小程序类型
 */
const miniAppTypeMp = {
	'H5': 3,
	'MP-WEIXIN': 2
}

// openId 本地有效期时长，暂定1天，可调考虑3天7天
const saveTime = 24 * 60 * 60 * 1000
const userId = Cookies.get('userId') || uni.getStorageSync("userId")
const getDefaultState = () => {
	return {
		miniAppType: miniAppTypeMp[platform],
		agencyInfo: uni.getStorageSync("agencyInfo") ? parser.parse(uni.getStorageSync("agencyInfo")) : {
			name: '',
			phone: ''
		},
		location: {},
		address: '',
		token: uni.getStorageSync("token") || Cookies.get('token')  || "",
		// 用于小程序中标识，登录的token是否有效，true有效，false无效
		tokenUseful: (uni.getStorageSync("token") ||Cookies.get('token') )  ? true : false,
		source: getQueryString('sourceType') == 1 ? Cookies.get('source') || uni.getStorageSync('source') || getQueryString('source') || "" : getQueryString('source') || Cookies.get('source') || uni.getStorageSync('source') || "", //机构id
		userInfo: uni.getStorageSync("userInfo") ? parser.parse(uni.getStorageSync("userInfo")) : { userId }, //用户信息
		templateId: [], //模板id
		cdcId: uni.getStorageSync("cdcId") || "", //cdc的id
		cdcName: uni.getStorageSync("cdcName") || "", //cdc的名称
		patientInfo: uni.getStorageSync("patientInfo") ? parser.parse(uni.getStorageSync("patientInfo")) :
		{}, //当前选择的就诊人信息
		schedulingInfo: uni.getStorageSync("schedulingInfo") ? parser.parse(uni.getStorageSync("schedulingInfo")) :
			{}, //挂号所需号源参数
		hisOrgInfo: uni.getStorageSync("hisOrgInfo") ? parser.parse(uni.getStorageSync("hisOrgInfo")) : {}, //挂号机构信息
		povId: uni.getStorageSync("povId") || "", // 网格配置需要orgId
		jlInfo: uni.getStorageSync("jlInfo") ? parser.parse(uni.getStorageSync("jlInfo")) : {}, // 江宁妇幼信息
		// 商品详情页中知情协议书签名的图片地址，用于下单使用，判断兼容小程序
		// #ifdef H5
		goodsIndexSignImgUrl: (sessionStorage && sessionStorage.getItem('goodsIndexSignImgUrl')) || '',
		// #endif
		// #ifndef H5
		goodsIndexSignImgUrl: '',
		// #endif
		tokenDataObj: uni.getStorageSync('tokenData') || {},
		orgRelationList: uni.getStorageSync("orgRelationList") || {},
		isLogin: uni.getStorageSync('isLogin') || false ,
		loginCode: 3401,
		helpList: [],
		sourcePlatform: uni.getStorageSync('sourcePlatform') || '',// 机构来源
		isJoinNIP: uni.getStorageSync('isJoinNIP') || false ,
		imgUrl: 'https://static.zhil.cloud/povH5', //静态图片地址
		ntRelative: uni.getStorageSync('ntRelative') || {}, //南通当前家庭成员
		pageTitle: '', // 专题页标题
		hRRelativeId: "" //江宁东软首页悬着就诊人id
	}
}

const state = getDefaultState()

const mutations = {
	SET_PAGE_TITLE: (state, value) => {
		state.pageTitle = value
	},
	SET_LOCATION: (state, value) => {
		state.location = value
	},
	SET_ADDRESS: (state, value) => {
		state.address = value
	},
	SET_TOKEN: (state, value) => {
		state.token = value
		if (value) {
			uni.setStorageSync("token", value)
      Cookies.set('token', value, {
        expires: 60
      })
			state.tokenUseful = true
		} else {
			uni.removeStorageSync('token');
			state.tokenUseful = false
		}
	},
	SET_ORGRELATION: (state, value) => {
		// const key = Object.entries(value)[0][0]
		// const orgList = Object.entries(value)[0][1]
		state.orgRelationList = {...state.orgRelationList, ...value}
		uni.setStorageSync("orgRelationList", state.orgRelationList)
	},
	SET_TOKENUSEFUL: (state, value) => {
		// value 只能是 true 或 false
		state.tokenUseful = value
	},
	SET_TOKENDATA: (state, value) => {
		// const key = Object.entries(value)[0][0]
		// const token = Object.entries(value)[0][1]
		state.tokenDataObj = {...state.tokenDataObj, ...value}
		uni.setStorageSync("tokenData", state.tokenDataObj)
	},
	REMOVE_TOKEN:(state, value) => {
		const tokenDataObj = state.tokenDataObj
		delete tokenDataObj[value]
		state.tokenDataObj = tokenDataObj
		uni.setStorageSync("tokenData", tokenDataObj)
	},
	SET_SOURCE: (state, value) => {
		// let source = decodeURIComponent(value).replace(/\s*/g, "")
		// source = parseInt(source)
		const source = parseInt(value)
		if (source) {
			// const hasChange = state.source && (state.source != source)
			state.source = source
			uni.setStorageSync("source", source)
		} else {
			state.source = ''
			uni.removeStorageSync('source');
		}
	},
	SET_USERINFO: (state, value) => {
		state.userInfo = value
		if (Object.keys(value).length) {
			Cookies.set('userId', value.userId, {
				expires: 60
			})
			uni.setStorageSync("userId", value.userId)
			uni.setStorageSync("userInfo", JSON.stringify(value))
		} else {
			uni.removeStorageSync('userInfo');
		}
	},
	SET_PATIENTINFO: (state, value) => {
		state.patientInfo = value
		if (Object.keys(value).length) {
			uni.setStorageSync("patientInfo", JSON.stringify(value))
		} else {
			uni.removeStorageSync('patientInfo');
		}
	},
	SET_SCHEDULINGINFO: (state, value) => {
		state.schedulingInfo = value
		if (Object.keys(value).length) {
			uni.setStorageSync("schedulingInfo", JSON.stringify(value))
		} else {
			uni.removeStorageSync('schedulingInfo');
		}
	},
	SET_AGENCYINFO: (state, value) => {
		state.agencyInfo = value
		if (Object.keys(value).length) {
			uni.setStorageSync("agencyInfo", JSON.stringify(value))
			uni.$emit('acceptAgencyInfo', value)
		} else {
			uni.removeStorageSync('agencyInfo');
		}
	},
	SET_TEMPLATE: (state, value) => {
		state.templateId = value
		if (value && Object.keys(value).length) {
			uni.setStorageSync("templateId", JSON.stringify(value))
		} else {
			uni.removeStorageSync('templateId');
		}
	},
	SET_CDCID: (state, value) => {
		if (value && value.length) {
			state.cdcId = value
			uni.setStorageSync("cdcId", value)
		} else {
			uni.removeStorageSync('cdcId')
		}
	},
	SET_CDCNAME: (state, value) => {
		if (value && value.length) {
			state.cdcName = value
			uni.setStorageSync("cdcName", value)
		} else {
			uni.removeStorageSync('cdcName')
		}
	},
	SET_HISORGINFO: (state, value) => {
		state.hisOrgInfo = value
		if (Object.keys(value).length) {
			uni.setStorageSync("hisOrgInfo", JSON.stringify(value))
		} else {
			uni.removeStorageSync('hisOrgInfo')
		}
	},
	SET_POVID: (state, value) => {
		if (value && value.length) {
			state.povId = value
			uni.setStorageSync("povId", value)
		} else {
			uni.removeStorageSync('povId')
		}
	},
	SET_JLINFO: (state, value) => {
		state.jlInfo = value
		if (Object.keys(value).length) {
			uni.setStorageSync("jlInfo", JSON.stringify(value))
		} else {
			uni.removeStorageSync('jlInfo');
		}
	},
	SET_GOODSINDEXSIGNIMGURL: (state, value) => {
		state.goodsIndexSignImgUrl = value
		// 存到session，用户刷新页面也能获取到，判断兼容小程序
		// #ifdef H5
		sessionStorage && sessionStorage.setItem('goodsIndexSignImgUrl', value)
		// #endif
	},
	SET_ISLOGIN: (state, value) => {
		uni.setStorageSync('isLogin', value)
		state.isLogin = value
	},
	SET_LOGIN_CODE: (state, value) => {
		state.loginCode = value
	},
	SET_HELPER_LIST: (state, value) => {
		state.helpList = value
	},
	SET_SOURCE_PLATFORM(state, val) {
		state.sourcePlatform = val || false
		uni.setStorageSync('sourcePlatform', val || false)
	},
	SET_SOURCE_PLATFORM(state, val) {
		state.sourcePlatform = val || false
		uni.setStorageSync('sourcePlatform', val || false)
	},
	SET_ISJIONNIP(state, value) {
		uni.setStorageSync('isJoinNIP', value)
		state.isJoinNIP = value
	},
	
	SET_NT_RELATIVE(state, val) {
		state.ntRelative = val || {}
		if (Object.keys(val).length) {
			uni.setStorageSync("ntRelative", val)
		} else {
			uni.removeStorageSync('ntRelative');
		}
	},
	SET_HRRELATIVEID (state, val) {
		state.hRRelativeId = val || ""
		// if (Object.keys(val).length) {
		// 	uni.setStorageSync("ntRelative", val)
		// } else {
		// 	uni.removeStorageSync('ntRelative');
		// }
	}
}

const actions = {
	setPageTitle({
		commit
	}, value) {
		return commit('SET_PAGE_TITLE', value)
	},
	setLocation({
		commit
	}, value) {
		return commit('SET_LOCATION', value);
	},
	setAddress({
		commit
	}, value) {
		return commit('SET_ADDRESS', value);
	},
	setToken({
		commit
	}, value) {
		return commit('SET_TOKEN', value);
	},
	setTokenUseful({
		commit
	}, value) {
		return commit('SET_TOKENUSEFUL', value);
	},
	setSource({
		commit
	}, value) {
		return commit('SET_SOURCE', value);
	},
	setUserInfo({
		commit
	}, value) {
		return commit('SET_USERINFO', value);
	},
	setPatientInfo({
		commit
	}, value) {
		return commit('SET_PATIENTINFO', value);
	},
	setSchedulingInfo({
		commit
	}, value) {
		return commit('SET_SCHEDULINGINFO', value);
	},
	setAgencyInfo({
		commit
	}, value) {
		return commit('SET_AGENCYINFO', value);
	},
	setTemplateId({
		commit
	}, value) {
		return commit('SET_TEMPLATE', value);
	},
	setCdcId({
		commit
	}, value) {
		return commit('SET_CDCID', value)
	},
	setCdcName({
		commit
	}, value) {
		return commit('SET_CDCNAME', value)
	},
	setHisOrgInfo({
		commit
	}, value) {
		return commit('SET_HISORGINFO', value)
	},
	setJlInfo({
		commit
	}, value) {
		return commit('SET_JLINFO', value);
	},
	setGoodsIndexSignImgUrl({
		commit
	}, value) {
		return commit('SET_GOODSINDEXSIGNIMGURL', value);
	},
	setTokenData({
		commit
	}, value) {
		return commit('SET_TOKENDATA', value)
	},
	setOrgRelation({
		commit
	}, value) {
		return commit('SET_ORGRELATION', value)
	},
	removeToken({
		commit
	}, value) {
		return commit('REMOVE_TOKEN', value)
	},
	setIsLogin({
		commit
	}, value) {
		return commit('SET_ISLOGIN', value)
	},
	setHelpList({
		commit
	}, value) {
		return commit('SET_HELPER_LIST', value)
	},
	/**
	 * 初始化机构，更新本地缓存agencyInfo、userInfo、indexUrl、templateId、source
	 * 
	 * @param {*} param0 
	 * @param {*} value 
	 */
	async initOrg({
		state,
		commit,
		dispatch
	}, {
		sourceId,
		redirectUrl
	}) {
    return new Promise(async resolve => {    
      if (!sourceId) {
				resolve();
        return console.warn('orgId不存在');
      }
			try {
      // 更新机构
      dispatch('setSource', sourceId)

			if (location.hash.includes('hisPage')) {
				await wxAuthorize(redirectUrl)
			} else {
				await newWxAuthorize(redirectUrl)
			}
			
			// 保存openId  保存后删除openId，必须在授权以后
			await saveOpenId()

			// 更新消息模板id
			const miniprogram = await getMiniProgram() || false
			const params = {
				orgId: +sourceId,
				isWxMp: platform === 'H5' ? true : false
			}
			// 健康六合小程序中 更改获取模板id接口的参数
			if(miniprogram) {
				params.isWxMp = false
				params.orgId = uni.getStorageSync('lhCdcId') || +sourceId
				params.miniAppType = 2
			}
			const templateIdRes = await getSubsibes(params)
			dispatch('setTemplateId', templateIdRes)
			// 储存机构信息
			const res = await getHomePageOrgInfoById({
				orgId: sourceId
			})
		
				//设置his机构信息
				const {
					hisOrgCode,
					anotherName,
					detailAddress,
					hisType,
					orgAttribute,
					sourcePlatform,
					cityName,
					areaName,
				} = await getOrgInfoById({
					orgId: sourceId
				}) || {}
				dispatch('setSourcePlatform', sourcePlatform)// 机构来源
				uni.$emit('setSourcePlatform', sourcePlatform)
				dispatch('setHisOrgInfo', {
					id: sourceId,
					name: anotherName,
					hisOrgCode,
					hisType,
					orgAttribute
				})
				const orgInfo = parser.parse(res.orgInfo) || {}
				// 设置个人信息中orgId和orgName
				dispatch('setAgencyInfo', {
					...orgInfo,
					cityName,
					areaName,
					detailAddress,
					orgAttribute,
					id: sourceId,
				})
				// 设置个人信息中orgId和orgName、hisOrgCode	
				const userInfo = {
					...state.userInfo,
					orgId: sourceId,
					orgName: orgInfo.another_name,
					hisOrgCode
				}
				if (!hisOrgCode) {
					uni.removeStorageSync('userInfoHis')
				} else {
					uni.setStorageSync('userInfoHis', userInfo)
				}
				dispatch('setUserInfo', userInfo)
			} catch (error) {
				console.error(error)
			}


			if (platform === 'H5') {
				redirectUrl && location.assign(redirectUrl)
			}
			resolve()
		})
	},
	
	setPovId({
		commit
	}, value) {
		return commit('SET_POVID', value)
	},
	setLoginCode({
		commit
	}, value) {
		return commit('SET_LOGIN_CODE', value)
	},
	setSourcePlatform({
		commit
	}, value) {
		return commit('SET_SOURCE_PLATFORM', value);
	},
	setIsJionNIP({
		commit
	}, value) {
		return commit('SET_ISJIONNIP', value)
	},
	setNtRelative({ commit},value){
		return commit('SET_NT_RELATIVE', value)
	},
	setHRRelativeId({ commit},value){
		return commit('SET_HRRELATIVEID', value)
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
