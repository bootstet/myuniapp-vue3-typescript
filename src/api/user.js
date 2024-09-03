
import http from '@/utils/request';
// 获取小助手配置
export function getOrgHelperConfig(data) {
  return http.request({
    url: 'app/req/activityInfo.getOrgHelperConfig',
    method: 'post',
    data,
    isSource: false,
    isSign: true
  })
}