/**
 * 微信订阅通知，常用方法
 */

/**
 * 用户获取订阅设置
 * @param {Function} callback 回调(是否可全部可订阅，可订阅的模板id数组，不可订阅的模板id和原因的数组)
 * @param {Array} 已知的模板id数组  
 */
export const wxSubscribeState = ({
	callback,
	tmplIds = [],
	errorCallback = function() {}
}) => {
	uni.getSetting({
		withSubscriptions: true,
		success: (res) => {
			// 'accept'表示用户同意订阅该条id对应的模板消息，'reject'表示用户拒绝订阅该条id对应的模板消息，
			// 'ban'表示已被后台封禁，'filter'表示该模板因为模板标题同名被后台过滤
			// 订阅消息总开关 mainSwitch：true | false
			console.log("获取订阅设置=", res)
			if (res && res.subscriptionsSetting) {
				const mainSwitch = res.subscriptionsSetting.mainSwitch || false
				if (mainSwitch) {
					// 如果有保持拒绝的消息类型此处获取
					const itemSettings = res.subscriptionsSetting.itemSettings
					let canAll = true
					if (itemSettings) {
						const acceptList = []
						const otherList = []
						// 如果有传入模板id数组，acceptList只会是该数组的子集，拒绝的数组中会加入相关数据来源
						// 是否可全部可订阅也是根据传入模板id数组来处理
						if (tmplIds && tmplIds.length > 0) {
							for (let key in itemSettings) {
								const tmp = itemSettings[key]
								if (tmp == "accept") {
									if (tmplIds.indexOf(key) == -1) {
										otherList.push({
											tmplId: key,
											reason: itemSettings[tmp],
											fromData: false,
											canSubscribe: true
										})
									} else {
										acceptList.push(key)
									}
								} else {
									if (tmplIds.indexOf(key) == -1) {
										otherList.push({
											tmplId: key,
											reason: itemSettings[tmp],
											fromData: false,
											canSubscribe: false
										})
									} else {
										canAll = false
										otherList.push({
											tmplId: key,
											reason: itemSettings[tmp],
											fromData: true,
											canSubscribe: false
										})
									}
								}
							}
						} else {
							for (let key in itemSettings) {
								const tmp = itemSettings[key]
								if (tmp == "accept") {
									acceptList.push(key)
								} else {
									canAll = false
									otherList.push({
										tmplId: key,
										reason: itemSettings[tmp],
										fromData: false,
										canSubscribe: false
									})
								}
							}
						}

						callback(canAll, acceptList, otherList)
					} else {
						callback(true, tmplIds, [])
					}
				} else {
					callback(false, [], [])
				}
			} else {
				callback(false, [], [])
				errorCallback('获取的数据为空')
				callback(false, [], [])
			}
		},
		fail: (err) => {
			errorCallback(err)
			callback(false, [], [])
		}
	})
}
