import getUploadToken from './obsConfig'
const getPolicyEncode = require('./getPolicy.js')
const getSignature = require('./getSignature.js')
require('./hmac.js')
require('./sha1.js')

/**
 * 
 * @param {filePath} 文件
 * @param {dir} 目录
 * @param {marking} 文件标识
 * @param {type} 文件类型 private public 私有 公有
 * @returns 
 */
const uploadFile = async function (params) {
    // 校验
    if (!params.filePath || params.filePath.length < 9) {
        uni.showModal({
            title: '图片错误',
            content: '请重试',
            showCancel: false,
        })
        return
    }
    // 获取文件名称
    let fileName = params.filePath
    fileName = fileName.replace('wxfile://', '')
    fileName = fileName.replace('http://tmp/', '')
    const id = (Math.random() + new Date().getTime()).toString(32).slice(0,8)
    const filePath = `${params.dir}${params.marking}_${id}${fileName}`
    // console.log('filePath', filePath)
    // 获取上传文件的密钥
    let info = await getUploadToken(filePath, params.type)
    // console.log('upload info', info)
    if(info) {
        const { AccessKeyId, SecurityToken, SecretKey, tempUrl, url} = info
        const policyBase64 = getPolicyEncode(filePath, SecurityToken, params.type)
        const signature = getSignature(policyBase64, SecretKey)
        const formData = {
            'AccessKeyID': AccessKeyId,
            'policy': policyBase64,
            'signature': signature,
            'key': filePath,
            'x-obs-security-token': SecurityToken,
        }
        const nodeEnv = process.env.NODE_ENV
        const productionEnv = ['production', 'new-production', 'hw-prod']
        const privateBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-private' : 'zhil-cloud-private-test'
        const publicBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-cdn' : 'zhil-cloud-cdn-test'
        console.log('Bucket=', (type === 'private' ? privateBucket : publicBucket))
        const baseUrl = `https://${params.type==='private' ? privateBucket : publicBucket}.obs.cn-south-1.myhuaweicloud.com`
        uni.uploadFile({
            url: baseUrl, 
            filePath: params.filePath,
            name: 'file',
            formData,
            success: function (res) {
                // console.log('uploadFile res', res);
                if(res.statusCode=='204'){
                    params.success({
                        url: params.type==='private' ? tempUrl : url,
                        filePath,
                    })
                } else{
                    params.fail(res)
                }
            },
            fail: function (err) {
                console.error(err)
            },
        })
    }
}
module.exports = uploadFile