import http from "@/utils/request";
let baseUrl = "app/req/hiaBusiness.";

const baseUrl2 = "app/req/customer.";

// 获取就诊人列表（不脱敏）
export function getVaccinatorList(data) {
  return http.request({
    url: baseUrl2 + "getRelativeList",
    method: "POST",
    data,
    isSource: false,
    isSign: true,
  });
}


// 获取就诊人列表（脱敏）
export function getRelativeListUnDesensitized(data) {
  return http.request({
    url: baseUrl2 + "getRelativeListUnDesensitized",
    method: "POST",
    data,
    isSource: false,
    isSign: true,
  });
}

//基本信息查询
export function queryBaseRecord(data) {
  return http.request({
    url: baseUrl + "queryBaseRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//在线建档
export function saveHealthRecord(data) {
  return http.request({
    url: baseUrl + "saveHealthRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//病史查询
export function queryMedicalRecord(data) {
  return http.request({
    url: baseUrl + "queryMedicalRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//体检记录查询
export function queryPhysicalRecord(data) {
  return http.request({
    url: baseUrl + "queryPhysicalRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//审核记录查询
export function queryAuditRecords(data) {
  return http.request({
    url: baseUrl + "queryAuditRecords",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//档案编辑
export function editHealthRecord(data) {
  return http.request({
    url: baseUrl + "editHealthRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

// 基本信息查询
export function queryEditRecord(data) {
  return http.request({
    url: baseUrl + "queryEditRecord",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//街道-机构关联查询
export function queryStreetOrgRelation(data) {
  return http.request({
    url: baseUrl + "queryStreetOrgRelation",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//街道
export function queryStreet(data) {
  return http.request({
    url: baseUrl + "queryStreet",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//发票查询
export function getBillList(data) {
  return http.request({
    url: baseUrl + "getBillList",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//发票发送邮箱
export function billSendMail(data) {
  return http.request({
    url: baseUrl + "billSendMail",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

// 字段列表查询 
export function queryDict(data) {
  return http.request({
    url: baseUrl + "queryDict",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

//报告查询
export function queryReport(data) {
  return http.request({
    url: baseUrl + "queryReport",
    method: "POST",
    data,
    isSign: true,
    isSource: false,
  });
}

