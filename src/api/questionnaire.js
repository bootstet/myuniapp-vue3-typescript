import http from '@/utils/request';
let baseUrl = 'app/req/';

// 保存预检流调信息
export function saveInspect(data) {
  return http.request({
    url: baseUrl + 'product.saveInspect',
    method: 'POST',
    data,
    isSource: false,
    isSign: true,
  });
}

/**
 * 获取自定义表单详情
 * @param {*} id 
 * @returns 
 */
export function getCustomFormDetail(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getCustomFormDetail',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 获取自定义表单详情 导出用 不区分表单状态
 * @param {*} id 
 * @returns 
 */
 export function getCustomFormDetailShow(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getCustomFormDetailShow',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 获取在线问诊配置信息
 * @param {*} formId 
 * @returns 
 */
 export function getOnlineFormSet(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getOnlineFormSet',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 新增表单
 * @param {*} form 
 * @returns 
 */
export function addCustomFrom (form) {
  return http.request({
    url: 'app/req/hiaBusiness.addCustomFrom',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 新增表单(新冠接口专用)
 * @param {*} form 
 * @returns 
 */
 export function addOnlineForm (form) {
  return http.request({
    url: 'app/req/hiaBusiness.addOnlineForm',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 获取已登录用户提交的新冠表单id 0没找到
 * @param {*} form 
 * @returns 
 */
 export function getSubmitId (form) {
  return http.request({
    url: 'app/req/hiaBusiness.getIMToken',
    method: 'post',
    data: form,
    isSign: true
  })
}


/**
 * 获取健康档案详情
 * @param {*} form 
 * @returns 
 */
 export function getHealthRecordDetail (form) {
  return http.request({
    url: 'app/req/hiaBusiness.getHealthRecordDetail',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 表单修改
 * @param {*} form 
 * @returns 
 */
 export function updateCustomForm (form) {
  return http.request({
    url: 'app/req/hiaBusiness.updateCustomForm',
    method: 'post',
    data: form,
    isSign: true
  })
}
/**
 * 自定义表单结果页查询接口
 * @param {*} form 
 * @returns 
 */
export function getCustomFormResultPage(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getCustomFormResultPage',
    method: 'post',
    data: form,
    isSign: true
  })
}
/**
 * 表单回填
 */
 export function getCustomFormLastData(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getCustomFormLastData',
    method: 'post',
    data: form,
    isSign: true
  })
}


export function getlistUserSubmit(form) {
  return http.request({
    url: 'app/req/hiaBusiness.listUserSubmit',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 获取提交的表单列表
 */
 export function getUserSubmitDetail(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getUserSubmitDetail',
    method: 'post',
    data: form,
    isSign: true
  })
}


/**
 * 获取提交的表单列表（返回信息带提交人）
 * @param {*} id 
 * @returns 
 */
 export function getUserSubmitDetailShowAll(form) {
  return http.request({
    url: 'app/req/hiaBusiness.getUserSubmitDetailShowAll',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 校验用户是否首次点击
 */
export function checkUserFirstClick(form) {
  return http.request({
    url: 'app/req/org.checkUserFirstClick',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 事件埋点
 */
export function saveEvent(form) {
  return http.request({
    url: 'app/req/org.saveEvent',
    method: 'post',
    data: form,
    isSign: true
  })
}

/**
 * 获取用户首次进入弹窗内容
 */
export function getWindowContent(form) {
  return http.request({
    url: 'app/req/org.getWindowContent',
    method: 'post',
    data: form,
    isSign: true
  })
}


