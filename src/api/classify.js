import { platform } from '@/utils/platform.js'
import http from '@/utils/request';
let baseUrl = 'app/req/product.'

// 获取一级分类列表
export function getLevel1List(data) {
	return http.request({
		url: baseUrl + 'getTopLevels',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取二级分类列表
export function getLevel2List(data) {
	return http.request({
		url: baseUrl + 'getAllChildByPid',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取二级分类内容
export function getLevel2Context(data) {
	return http.request({
		url: baseUrl + 'getSecCategoryDetail',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取三级分类内容
export function getLevel3Context(data) {
	return http.request({
		url: baseUrl + 'getThirdCategoryDetail',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取商品详情
export function getProductDetail(data) {
  const urlMp = {
    'H5':  baseUrl + 'getGoodsDetailH5',
    'MP-WEIXIN': baseUrl + 'getGoodsDetail',
    'MP': baseUrl + 'getGoodsDetail'
  } 
	return http.request({
		url: urlMp[platform],
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

//预览商品详情
export function previewProductDetails(data) {
	return http.request({
		url: baseUrl + 'getGoodsDetail',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
  }

// 获取成人列表
export function getAdultList(data) {
  return http.request({
    url: 'app/req/org.getOrgAdultVaccine',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取儿童列表
export function getChildList(data) {
	return http.request({
		url: baseUrl + 'getChildVaccineConfigList',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取附近机构
export function getNearbyOrgGoods(data) {
	return http.request({
		url: baseUrl + 'getNearOrgGoods',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}
//增加看视频次数
export function incrPlayNum(data) {
	return http.request({
		url: baseUrl + 'incrPlayNum',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

//获取机构3级分类下的所有商品
export function getGridProducts(data) {
	return http.request({
		url: baseUrl + 'getGridProducts',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}