import request from '@/utils/request';

// 扫码获取医生状态及关联商品信息
export function getOrgDoctorInfoById(data) {
  return request.request({
    url: 'app/req/org.getOrgDoctorInfoById',
    method: 'POST',
    isSource: false,
    isSign: true,
    data
  })
}