import http from '@/utils/request';

// 查询全部城市，根据首字母分组排序
export function getAllSysArea(data) {
    return http.request({
        url: "healthMa/req/org.getAllSysArea",
        method: 'POST',
        data,
        isSource: false,
        isSign: true,
    });
}

// 根据名称查询城市编码
export function getListByLikeName(data) {
    return http.request({
        url: "healthMa/req/org.getListByLikeName",
        method: 'POST',
        data,
        isSource: false,
        isSign: true,
    });
}

//查询城市区域列表
export function getSysArea(data) {
    return http.request({
        url: "healthMa/req/org.getSysArea",
        method: 'POST',
        data,
        isSource: false,
        isSign: true,
    });
}

export function getAiLianCategory(data) {
	return http.request({
	    url: "app/req/product.getAiLianCategory",
	    method: 'POST',
	    data,
	    isSource: false,
	    isSign: true,
	});
}

export function pageAiLianGoods(data) {
	return http.request({
	    url: "app/req/product.pageAiLianGoods",
	    method: 'POST',
	    data,
	    isSource: false,
	    isSign: true,
	});
}

// 获取预约列表
export function getZlHealthOrderList(data) {
  return http.request({
    url: "app/req/order.getZlHealthOrderList",
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
  })
}

// 获取登录信息
export function loginAiLian(data) {
  return http.request({
    url: "aiLian/login",
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
  })
}