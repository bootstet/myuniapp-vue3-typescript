import http from '@/utils/request'

const baseUrl = 'app/req/order.'


export function queryAppointmentList(data) {
  return http.request({
    url: `${baseUrl}queryFamilyAppointList`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}

export function queryAppointment(data) {
  return http.request({
    url: `${baseUrl}queryAppointmentList`,
    method: 'POST',
    data,
    isSource: false,
    isSign: true
  })
}