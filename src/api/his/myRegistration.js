import http from '@/utils/request'

export function getOrderHiaList(data) {
	return http.request({
		url: 'app/req/order.getOrderHiaList',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}