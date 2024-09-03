import http from '@/utils/request'

//增加埋点
export function trackig(data) {
    return http.request({
        url: 'trackig',
        method: 'POST',
        data,
        isSource: true,
        isSign: true
    })
}

//增加埋点
export function saveUserBehavior(data) {
    return http.request({
        url: 'app/req/customer.saveUserBehavior',
        method: 'POST',
        data,
        isSource: true,
        isSign: true
    })
}

// 页面全局埋点
export function saveUserVisit(data) {
    return http.request({
        url: 'app/req/customer.saveUserVisit',
        method: 'POST',
        data,
        isSource: false,
        isSign: true,
        closeError: true,
    })
}