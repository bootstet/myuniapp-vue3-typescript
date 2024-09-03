import http from '@/utils/request';
// let baseUrl = 'app/req/customer.'
let baseUrl = 'app/req/hiaBusiness.'
let baseUrlPro = 'app/req/product.'
let baseUrlOrd = 'app/req/order.'
let baseUrl2 = 'h5/'

// 接种单位查询
export function vaccinationUnitByOrgIds(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'vaccinationUnitByOrgIds',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 获取默认绑定家庭成员
export function defaultBindCaseRelative(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'defaultBindCaseRelative',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 根据姓名、生日、性别查询档案
export function queryCaseByRelativeId(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'queryCaseByRelativeId',
      method: 'POST',
      data,
      isSource: false,
      isSign: true,
      enableResIntercept: false,
    })
}

// 根据疫苗编码查询档案
export function queryCaseByCaseCode(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'queryCaseByCaseCode',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 就诊人绑定个案编码
export function relativeBindCase(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'relativeBindCase',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 近期接种计划查询(28天)
export function recentVacPlanQuery(data) {
    return http.request({
      baseUrl: '',
      url: baseUrl + 'recentVacPlanQuery',
      method: 'POST',
      data,
      isSource: false,
      isSign: true
    })
}

// 接种记录转义查询
export function vacRecordsTransQuery(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'vacRecordsTransQuery',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 接种记录查询
export function vacRecordsQuery(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'vacRecordsQuery',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查询已绑定列表
export function bindCaseRelativeList(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'bindCaseRelativeList',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 设置默认
export function setDefaultBindCaseRelative(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'setDefaultBindCaseRelative',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 取消绑定
export function relativeUnBindCase(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'relativeUnBindCase',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 根据计免疫苗编码查询商品信息
export function getGoodsListByVaccineCode(data) {
  return http.request({
    baseUrl: '',
    url: baseUrlPro + 'getGoodsListByVaccineCode',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 已预约数量查询
export function queryAppointmentCount(data) {
  return http.request({
    baseUrl: '',
    url: baseUrlOrd + 'queryAppointmentCount',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 机构通知
export function orgNotice(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'orgNotice',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 未种通知
export function unVaccinationNotice(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'unVaccinationNotice',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 根据机构查询疫苗库存
export function vaccineStockByOrgId(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'vaccineStockByOrgId',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 查验接种记录
export function checkVaccinate(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'checkVaccinate',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

// 近期接种计划查询(全部)
export function vacPlanQuery(data) {
  return http.request({
    baseUrl: '',
    url: baseUrl + 'vacPlanQuery',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}
