import http from '@/utils/request'

export function getOrgDepartmentInfo(data) {
	return http.request({
		url: 'app/req/hiaBusiness.getOrgDepartmentInfo',
		method: 'POST',
		data,
		isSource: false,
		isSign: true
	})
}