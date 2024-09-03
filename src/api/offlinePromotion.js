import http from '@/utils/request';

export function orderAddInsuranceOfflineOrder(data) {
  return http.request({
    url: 'app/req/order.addInsuranceOfflineOrder',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function orgGetOrgListByCityArea(data) {
  return http.request({
    url: 'app/req/org.getOrgListByCityArea',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function sendInsuranceMsgCode(data) {
  return http.request({
    url: 'app/req/order.sendInsuranceMsgCode',
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}


