export const typeImage = {
	1: '链接',
	2: '商品',
	3: '图片',
	4: '文字',
	5: '不跳转',
}

export const typeSaleChanne = {
	1: '公众号',
	2: '第三方商城',
	3: '腾讯健康',
	4: '体检商城',
	5: '知了健康小程序',
	6: '知了客',
	7: '阿里健康',
	8: '美团',
	9: '陕西健康',
	10: '知了健康云',
}

export const typeSettlementType = {
	1: '实时分账',
	2: '月结',
	3: '无需结算',
	4: '微信直连',
	5: '微信服务商',
	6: '微信支付-代收款',
	7: '微信分账收款方',
	8: '微信直连-分账',
}

export const sourcePlatformHa = {
	0: '知了云',
	1: '百克生物',
	2: '计免机构',
	3: '商城机构',
}

export function getPageType(url, value) {
	const obj = {
	  '专题页': [
		'/arcPage/themePage/index',
		'/arcPage/pageManagement/index',
		'/arcPage/themePage/vajraDistrictList',
		'/arcPage/themePage/mapDetail',
		'/arcPage/themePage/orderList',
		'/arcPage/themePage/disEmpty',
	  ],
	  '首页': [
		'/pages/home/index',
		'/arcPage/home/index',
		'/noticePage/vaccine/index',
		'/noticePage/vaccine/searchResult',
		'/noticePage/vaccine/search',
	  ],
	  '自定义表单': [
		'/pages/questionnaire/index',
		'/pages/questionnaire/result',
		'/pages/questionnaire/resultNewCrown',
		'/pages/questionnaire/preview',
		'/pages/questionnaire/customPreview',
		'/pages/questionnaire/coverPage',
		'/pages/questionnaire/fillInList',
		'/activePage/newldb/index',
		'/activePage/newldb/detail',
		'/activePage/ldb/index',
		'/activePage/ldb/detail',
	  ],
	  '收货人列表': [
		'/pages/address/index',
		'/pages/address/setup',
	  ],
	  '登录': [
		'/pages/login/index',
		'/pages/login/miniProgram',
		'/pages/webview/index',
	  ],
	  '我的': [
		'/pages/my/index',
	  ],
	  '服务详情': [
		'/pages/goods/index',
	  ],
	  '成人疫苗': [
		'/pages/vaccine/adult',
	  ],
	  '预约订单': [
		'/pages/order/index',
		'/pages/order/detail',
		'/pages/appointment/confirm',
	  ],
	  '下单预约': [
		'/pages/order/confirm',
		'/pages/order/success',
		'/pages/appointment/hpvVaccine/confirmForm',
		'/pages/appointment/hpvVaccine/powerAttorney',
		'/pages/appointment/hpvVaccine/signature',
		'/subPage/doctor/index',
		'/arcPage/orgList/index',
		'/arcPage/goods/index',
	  ],
	  '就诊人管理': [
		'/pages/vaccinator/index',
		'/pages/vaccinator/order',
	  ],
	  '订阅管理': [
		'/pages/subscribe/index',
		'/pages/subscribe/detail',
	  ],
	  '摇号活动': [
		'/pages/lottery/index',
	  ],
	  '儿童疫苗': [
		'/subPage/vaccine/child',
		'/subPage/vaccine/childTop',
		'/subPage/customChild',
	  ],
	  '活动落地页': [
		'/subPage/news/class-two',
		'/subPage/news/class-five',
	  ],
	  '公告通知': [
		'/subPage/publicity/index',
		'/noticePage/index',
		'/noticePage/customers/index',
		'/noticePage/customers/vaccinePromotionTemp',
	  ],
	  '健康档案': [
		'/arcPage/archives/index',
	  ],
	  '家医签约': [
		'/arcPage/archives/docker',
		'/arcPage/archives/selectPack',
		'/arcPage/archives/selectDoctor',
	  ],
	  '南京建邺': [
		'/activePage/home/index',
		'/activePage/vaccine/vaccineAdult',
		'/activePage/vaccine/vaccineChildren',
		'/activePage/query/index',
		'/activePage/my/index',
	  ],
	  'his': [
		'/hisPage/organization/index',
		'/hisPage/home/index',
		'/hisPage/personAdmin/index',
		'/hisPage/myBill/index',
		'/hisPage/billWatch/index',
		'/hisPage/departmentPay/index',
		'/hisPage/waitPayDetail/index',
		'/hisPage/hasPayDetail/index',
		'/hisPage/successPay/index',
		'/hisPage/chooseNumber/index',
		'/hisPage/departments/index',
		'/hisPage/registeredDetail/index',
		'/hisPage/reportCard/index',
		'/hisPage/reportCardDetail/index',
		'/hisPage/reservedRegistration/index',
		'/hisPage/myRegistration/index',
		'/hisPage/vaccinator/index',
		'/hisPage/gridOrganization/index',
	  ],
	  '艾迪康报告': [
		'/adiconPage/reportQuery/login',
		'/adiconPage/reportQuery/list',
		'/adiconPage/reportQuery/pdf',
	  ],
	  '江宁妇幼': [
		'/healthRecordPage/index',
		'/healthRecordPage/add',
		'/healthRecordPage/edit',
		'/healthRecordPage/online',
		'/healthRecordPage/record',
		'/healthRecordPage/success',
		'/healthRecordPage/file',
		'/healthRecordPage/invoiceInquiry',
		'/healthRecordPage/healthReport',
		'/healthRecordPage/physicalReport',
		'/healthRecordPage/vaccinator',
		'/healthRecordPage/sendInvoiceInquiry',
		'/healthRecordPage/orgList',
		'/arcPage/archivesWomenChildren/list',
		'/arcPage/archivesWomenChildren/form',
		'/arcPage/archivesWomenChildren/agsinInterrogation',
		'/arcPage/archivesWomenChildren/examineResult',
	  ],
	  '贵州计免': [
		'/gzPage/home/index',
		'/gzPage/archives/index',
		'/gzPage/archives/success',
		'/gzPage/vaccinationList/index',
		'/gzPage/entranceExamination/index',
		'/gzPage/message/index',
		'/gzPage/appointment/list',
		'/gzPage/appointment/detail',
	  ],
	  '南通': [
		'/ntPage/home/index',
		'/ntPage/healthRecords/form',
		'/ntPage/healthRecords/results',
		'/ntPage/serviceRecord/list',
		'/ntPage/services/detail',
		'/ntPage/familyDoctorSigning/review',
		'/ntPage/familyDoctorSigning/results',
		'/ntPage/familyDoctorSigning/signing',
		'/ntPage/familyDoctorSigning/list',
		'/ntPage/services/list',
		'/ntPage/historicalSigning/list',
		'/ntPage/onlineConsultation/index',
		'/ntPage/serviceAgreement/index',
	  ],
	  'AI外呼助手': [
		'/pages/aiCall/index',
	  ],
	  '关于我们': [
		'/noticePage/about/index',
	  ],
	  '报告查询': [
		'/activePage/medical/index',
		'/activePage/queryReport/index',
		'/activePage/queryReport/detail',
		'/activePage/queryReport/pdf',
		'/activePage/medical/list',
	  ],
	}
	let name = ''
	for (const key in obj) {
	  if (obj.hasOwnProperty(key)) {
		const array = obj[key];
		if (array.includes(url)) {
		  name = key;
		}
	  }
	}
	return name || value
}

export function getPageInfo() {
	const pages = getCurrentPages();
	if (pages.length > 0) {
	  const currentPage = pages[pages.length - 1];
	  if(!currentPage) return ''
	  const options = new URLSearchParams(currentPage?.options).toString()
	  return {
		titleText: currentPage.$holder.navigationBar.titleText,
		route: currentPage.route,
		options,
	  }
	}
	return ''  
}