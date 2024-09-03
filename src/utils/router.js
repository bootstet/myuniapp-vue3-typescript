import store from  '@/store'

const navigateTo = (params) => {
	let token = store.getters.token;
	
	// 非his全部改为静默登录
	if(!token && location.hash.includes('hisPage')){
		
		uni.navigateTo({
			url: "/pages/login/index?url="+ encodeURIComponent(params.url)
		})
	}else{
		uni.navigateTo(params)
	}
}

const redirectTo = (params) => {
	let token = store.getters.token;
	console.log(token, 'token')
	//别的操作
	if(!token && location.hash.includes('hisPage')) {
		uni.redirectTo({
			url: "/pages/login/index?url="+ encodeURIComponent(params.url)
		})
	} else {
		uni.redirectTo(params)
	}
}

const reLaunch = (params) => {
	let token = store.getters.token;

	if(!token && location.hash.includes('hisPage')){
		
		uni.reLaunch({
			url: "/pages/login/index?url="+ encodeURIComponent(params.url)
		})
	}else{
		uni.reLaunch(params)
	}
}


const switchTab = (params) => {

	let token = store.getters.token;
	// 非his全部改为静默登录
	if(!token && location.hash.includes('hisPage')){
		uni.navigateTo({
			url: "/pages/login/index?url="+ encodeURIComponent(params.url) + '&type=switchTab'
		})
	}else{
		uni.switchTab(params)
	}


}

const navigateBack = (params) => {
	let token = store.getters.token;
	//别的操作
	if(!token && location.hash.includes('hisPage')) {
		uni.redirectTo({
			url: "/pages/login/index?url="+ encodeURIComponent(params) + '&type=navigateBack'
		})
	}else {
		uni.navigateBack(params)
	}
}


const preloadPage = (params) => {
	let token = store.getters.token;
	//别的操作
	if(!token && location.hash.includes('hisPage')) {
		uni.navigateTo({
			url: "/pages/login/index?url="+ encodeURIComponent(params.url)
		})
	}else {
		uni.preloadPage(params)
	}
}

const openWeb = (url,title) => {
	// #ifdef  H5
	window.location.href = url
	// #endif
	// #ifndef  H5
	uni.navigateTo({
		url: '/pages/webview/index?url=' + encodeURIComponent(url) + "&title=" + title
	})
	// #endif
}

module.exports = {
	navigateTo,
	redirectTo,
    navigateBack,
	reLaunch,
	switchTab,
	preloadPage,
	openWeb
}