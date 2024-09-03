export function getLocation() {
	return new Promise((resolve, reject) => {
		// #ifdef MP
		// getLocation 存在调用频率限制问题
		// https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801
		uni.getLocation({
			type: 'wgs84',
			success: (res) => {
				console.log('当前位置的经度：' + res.longitude)
				console.log('当前位置的纬度：' + res.latitude)
				resolve({
					point: {
						lat:res.latitude,
						lng:res.longitude
					}
				})
			},
			fail: (err) => {
				reject(err)
			}
		})
		// #endif
		// #ifdef H5
		const geolocation = new BMap.Geolocation()
		let _this = this;
		geolocation.getCurrentPosition(function getinfo(position) {
			resolve(position);
		}, e => {
			reject(_);
		})
		// #endif
	})
}
