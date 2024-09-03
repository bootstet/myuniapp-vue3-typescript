import http from '@/utils/request';
import qs from 'qs'
/**
 * 获取地址列表
 * @param {*} userId 
 * @returns 
 */
export function getAddressList () {
  return http.request({
    url: 'app/req/customer.getAddressList',
    method: 'POST',
    isSign: true,
    isSource: false
  })
}

/**
 * 获取地址详情
 * @param {*} addrssId 
 * @returns 
 */
export function getAddressDetail({addressId, userId}) {
  return http.request({
    url: 'app/req/customer.getAddressDetail',
    method: 'POST',
    data: {addressId, userId},
    isSign: true
  })
}

/**
 * 新增地址
 * @param {*} form 
 * @returns 
 */
export function addAndUpdateAddress(form) {
  return http.request({
    url: 'app/req/customer.addAndUpdateAddress',
    method: 'POST',
    data: form,
    isSign: true
  })
}

/**
 * 删除地址
 * @param {*} form userId addressId
 * @returns 
 */
export function removeAddress ({addressId, userId}) {
  return http.request({
    url: 'app/req/customer.removeAddress',
    method: 'POST',
    data: {addressId: +addressId},
    isSign: true
  })
}

/**
 * 设置默认地址
 * @param {*} param0 
 * @returns 
 */
export function setAddressDefault ({addressId, userId}) {
  return http.request({
    url: 'app/req/customer.setAddressDefault',
    method: 'POST',
    data: {addressId, userId},
    isSign: true
  })
}