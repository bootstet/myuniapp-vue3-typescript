import http from '@/utils/request';

// 获取就诊人列表
export function saveAiCallSmsForm(data) {
    return http.request({
        url: 'os/req/message.saveAiCallSmsForm',
        method: 'POST',
        data,
        isSource: false,
        isSign: true,
    });
}
