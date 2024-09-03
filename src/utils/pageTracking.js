import { getQueryString  } from '@/utils/index'
import {sourcePlatformHa} from '@/utils/indexHa'
import store from 'store'
import { saveUserVisit } from '@/api/trackig'
// import ha from '@/js_sdk/hina-uniapp-js-1.2.3/hina-uniapp-js-1.2.3/index';
// import ha from '@/js_sdk/index';
import ha from '@/js_sdk/middle/hina.esm.min';
import { useRouter } from 'vue-router';

function getPageInfo() {
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

/** 根据当前路径获取页面类型 */
function getPageType(url, value) {
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

/** 页面埋点 */
export function pageTracking(route, prev) {
  if(route?.path === '/pages/specialPage/delete') return // 页面不存在 不埋点
  const source = getQueryString('source') || store.getters.source
  const openIdList= uni.getStorageSync('openIdList') || {}
  const { isLogin, userInfo, agencyInfo } = store.getters || {}
  const { longitude, latitude } = agencyInfo || {}
  const { titleText, route: firstPath, options } = getPageInfo() || {}
  const pageId = getQueryString('pageid') || ''
  const appName = getQueryString('appName') || 'zhil'
  const appNameObj = {
    'al': '支付宝',
    'xyb': '湘易办',
    'tx': '腾讯',
    'nj': '健康南京',
    'zhil': '知了云'
  }
  const params = {
    eventType: 1, // 事件类型
    deviceId: uni.getStorageSync('userOnlyId'), // 设备id
    isLogin: isLogin ? 1 : 0, // 是否登录 1-是 0-否
    userId: userInfo?.userId || 0, // userId
    openId: openIdList[source], // openId
    orgId: source ? +source : 0, // 机构id
    source: appName, // 渠道标识 页面访问来源 al=>支付宝 xyb=>湘易办 tx=>腾讯 nj=>健康南京
    channel: appNameObj[appName] || '', // 渠道名称 al=>支付宝 xyb=>湘易办 tx=>腾讯 nj=>健康南京
    pageType: '', // 页面类型
    screenName: '', // 页面名称
    title: '', // 页面标题
    url: window.location.href, // 页面地址
    pageId: pageId ? +pageId : 0, // 页面id
    urlQuery: new URLSearchParams(route?.query).toString() || options, // 页面参数
    urlPath: route?.meta?.pagePath || firstPath, // 页面路径
    referrerType: prev ? getPageType(prev?.path, document.title) : '', // 前向页面类型
    referrerUrl: prev ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}/#${prev?.fullPath}` : '', // 前向地址
    referrerName: prev ? document.title : '', // 前向页面名称
    referrerTitle: prev ? document.title : '', // 前向页面标题
    longitude: longitude, // 经度
    latitude: latitude, // 纬度
  }
  setTimeout(async () => {
    params.pageType = getPageType(`/${(route?.meta?.pagePath || firstPath)}`, (document.title || titleText))
    params.screenName = document.title || titleText
    params.title = document.title || titleText


    // 请求接口
    try {
      await saveUserVisit(params) || {}
    } catch (error) {
      console.error(error)
    }
  }, 500)
}

/** 海纳埋点 */
export function pageTrackingHina(eventName, data ,isSpecial) {
  const source = getQueryString('source') || store.getters.source
  const openIdList= uni.getStorageSync('openIdList') || {}
  const { titleText, route: firstPath, options } = getPageInfo() || {}
  
  // 获取当前页面栈
  const pages = getCurrentPages();
  // 当前页面
  const currentPage = pages[pages.length - 1];
  // 当前页面的路由
  const currentRoute = currentPage.route;
  
  // 上一个页面
  const prevPage = pages[pages.length - 2];
  // 上一个页面的路由
  let prevRoute = '';
  if (prevPage) {
    prevRoute = prevPage.route;
  }
  console.log('当前页面路由:', currentRoute);
  console.log('上一个页面路由:', prevRoute);
  console.log('pageType======>>>',getPageType(`/${(currentRoute)}`, (document.title || titleText)))
  console.log('pageType======>>>',getPageType(`/${(prevRoute)}`, (document.title || titleText)))

  // return
  // getPageType(`/${(route?.meta?.pagePath || firstPath)}`, (document.title || titleText))
  let sourcePlatform = {}
  let params = {
    platform:'知了云h5', //所属平台/页面归属
    zly_user_id:store.getters?.userInfo?.userId || '', //用户id，赋予海纳distinct_id
    open_id: openIdList[source],
    org_id: source ? +source : 0, // 机构id,
    org_name: store.getters?.agencyInfo?.name || '',//机构名称
    org_alias: store.getters?.agencyInfo?.another_name || '',//机构别名
    org_source: sourcePlatformHa[store.getters?.userInfo?.sourcePlatform||0],//机构来源
    region: store.getters?.agencyInfo?.areaName || '',//区域
    page_name: document.title || titleText,//页面名称
    page_type: getPageType(`/${(currentRoute)}`, '其他')||'', // 页面类型
    referrer_page_name: getPageType(`/${(prevRoute)}`, (document.title || titleText)) ||'',//前向页面名称
    wx_remark:'',//公众号备注名称
    app_id:'',//应用唯一标识
    app_name:'',//应用/公众号名称
    agency_address:store.getters?.agencyInfo?.detailAddress || '',//机构地址
  }
  if(currentRoute=='arcPage/themePage/index'){
    //仅专题页有
    params = {
      ...params,
      usage_type:uni.getStorageSync("useTypeHn")||'',//使用类型
      page_tags:uni.getStorageSync("pageLableHn")||'',//页面标签
    }
  }
  // 如果order_id无值或者是空格就不上传

  if(!data?.order_id?.replace(/\s*/g,'')){
    delete data.order_id
  }
  
  data = {
    ...data,
    ...params
  }
  try {
    console.log(eventName,data)
    // return
    ha.track(
        //事件名称
        eventName,
        //需要上传的事件属性
        data,
        ()=>{
          console.log('成功啦')
        }
    );
  } catch (error) {
    console.error('hinamError', error)
  }
}