import http from '@/utils/request';
let baseUrl = 'app/req/product.'

//获取机构3级分类下的所有商品
export function getShanXiNearGoodsVoList(data) {
	return http.request({
		url: baseUrl + 'getShanXiNearGoodsVoList',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}

// 获取地区
export function getSysAreaByProvinceCode(data) {
	return http.request({
	  url:'app/req/org.getSysAreaByProvinceCode',
	  method: 'POST',
	  data,
	  isSource: false,
	  isSign: true
	})
}

//预约列表
export function getZlHealthOrderList(data) {
	return http.request({
	  url:'app/req/order.getZlHealthOrderList',
	  method: 'POST',
	  data,
	  isSource: false,
	  isSign: true
	})
}

//取消订单
export function cancelOrderForSx(data) {
	return http.request({
	  url:'app/req/order.cancelOrderForSx',
	  method: 'POST',
	  data,
	  isSource: false,
	  isSign: true
	})
}