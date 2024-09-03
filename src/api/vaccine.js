
import http from '@/utils/request';
import { platform } from '@/utils/platform.js'

let baseUrl = 'app/req/order.'
let baseUrl2 = 'h5/'

// 获取成人疫苗列表
export function getAdultList(data) {
    return http.request({
      url: baseUrl2 + 'adult_vaccine_list',
      data,
      isSource: true,
      isSign: false
    })
}

// 获儿童疫苗列表
export function getChildList(data) {
  return http.request({
    url: baseUrl2 + 'child_vaccine_list',
    method: 'POST',
    data,
    isSource: true,
    isSign: false
  })
}

// 获取疫苗详情信息
export function getVaccineDetail(data) {
  return http.request({
    url: baseUrl2 + 'vaccine_detail',
    data,
    isSource: true,
    isSign: false
  })
}

// 获取预约列表
export function getAppointmentList(data) {
  return http.request({
    url: baseUrl2 + 'appointment_list',
    data,
    isSource: true,
    isSign: false
  })
}

// 获取预约详情
export function getAppointmentDetail(data) {
  return http.request({
    url: baseUrl2 + 'appointment_detail',
    data,
    isSource: true,
    isSign: false
  })
}

// 确认接种
export function checkAppointment(data) {
  return http.request({
    url: baseUrl2 + 'check_inoculate',
    data,
    isSource: true,
    isSign: false
  })
}

// 取消预约
export function cancelAppointment(data) {
  return http.request({
    url: baseUrl2 + 'appointment_cancel',
    data,
    isSource: true,
    isSign: false
  })
}

// 创建预约
export function createAppointment(data) {
  return http.request({
    url:   baseUrl + 'addAppointment',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    closeError: true
  })
}

// 修改预约
export function editAppointment(data) {
  return http.request({
    url: baseUrl + 'updateAppointmentDate',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//获取未放号的日期文案
export function getConfig(data) {
  return http.request({
    url: 'app/req/product.getScheduleText',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取可预约天数
export function getAppointmentDay(data) {
  return http.request({
    url: 'app/req/product.listGoodsSchedule',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取可预约时间段
export function getAppointmentDate(data) {
  return http.request({
    url: 'app/req/product.getSharingScheduleList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 实名认证
export function idCardAuth(data) {
  return http.request({
    url: 'app/req/product.idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 实名认证,不拦截
export function idCardAuthEnable(data) {
  return http.request({
    url: 'app/req/product.idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false
  })
}
// 实名认证新
export function idCardAuthNew(data) {
  return http.request({
    url: 'app/req/customer.idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
// 实名认证,不拦截新
export function idCardAuthEnableNew(data) {
  return http.request({
    url: 'app/req/customer.idCardAuth',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
    enableResIntercept: false
  })
}

// 核销
export function verifica(data) {
  const urlMp = {
    'H5':  'app/req/order.writeOffAppointmentH5',
    'MP-WEIXIN': 'app/req/order.writeOffAppointment',
    'MP': 'app/req/order.writeOffAppointment'
  } 
  return http.request({
    url: urlMp[platform],
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取相同订单
export function getSameAppointment(data) {
  return http.request({
    url: 'app/req/order.getExistAppointment',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
//获取疫苗信息
export function goodsPageQuery(data) {
  const urlMp = {
    'H5':  'app/req/product.goodsPageQueryH5',
    'MP-WEIXIN': 'app/req/product.goodsPageQuery',
    'MP': 'app/req/product.goodsPageQuery'
  } 
  return http.request({
    url: urlMp[platform],
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//cdc下的儿童疫苗
export function listCdcChildVaccine(data) {
  return http.request({
    url: 'app/req/product.listCdcChildVaccine',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//cdc下的成人疫苗
export function listCdcAdultVaccine(data) {
  return http.request({
    url: 'app/req/product.listCdcAdultVaccine',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//根据分类id获取cdc下的POV信息
export function listCdcOrgInfo(data) {
  return http.request({
    url: 'app/req/product.listCdcOrgInfo',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//2.0 获取所有分类及其子分类(通过业务类型获取对应分类及其子分类)
export function getCategoryByType(data) {
  return http.request({
    url: 'app/req/product.getCategoryByType',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//2.0 公众号约苗商品列表查询-带二级分类信息不分页
//商品列表查询-带二级分类信息不分页
export function getVaccineProductsByOrgId(data) {
  return http.request({
    url: 'app/req/product.getVaccineProductsByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//2.0 公众号约苗商品列表查询-分页查询
export function getPageGoodsByOrgId(data) {
  return http.request({
    url: 'app/req/product.getPageGoodsByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//2.0 获取产品信息(通过三级分类ID)
export function getProductByCid(data) {
  return http.request({
    url: 'app/req/product.getProductByCid',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//2.0 公众号约苗换一换查询,获取机构下的疫苗商品,换一换功能
export function getVaccineChangeListByOrgId(data) {
  return http.request({
    url: 'app/req/product.getVaccineChangeListByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//非四、九价的号源接口
export function listGoodsScheduleNLog(data) {
  return http.request({
    url: 'app/req/product.listGoodsScheduleNLog',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//校验用户是否在CDC登录过
export function checkLoginCdc(data) {
  return http.request({
    url: 'app/req/customer.checkLoginCdc',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

//根据userId和orgId更新用户扩展信息
export function updateUserExtInfo(data) {
  return http.request({
    url: 'app/req/customer.updateUserExtInfo',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
