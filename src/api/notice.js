import http from '@/utils/request';

// 通知详情
export function findNoticeById(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/message.findNoticeById',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 新增提醒用户
export function addNextRemindUser(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.addNextRemindUser',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 获取客户提醒详情
export function nextRemindUserDetail(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.nextRemindUserDetail',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 编辑客户提醒
export function editNextRemindUser(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/customer.editNextRemindUser',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}

// 获取机构名
export function getOrgInfoById(data) {
  return http.request({
    baseUrl: '',
    url: 'app/req/org.getOrgInfoById',
    method: 'POST',
    data,
    isSource: true,
    isSign: true
  })
}