import ObsClient from 'esdk-obs-browserjs'
import { getAkInfo, getCDNAkInfo, fileUploadApi, getTempUrl } from '@/api/upload'

import { getToken, getQueryString } from '@/utils/index'
import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie';


const source = getQueryString('source') || store.getters.source

const token = getToken(source) || Cookies.get('token') || uni.getStorageSync('token') || ''

/**
 * 
 * @param {*} type 文件上传类型 private 私有 public 公有 必填
 * @param {*} file 文件 必填
 * @param {*} typeName 文件上传路径 必填
 * @param {*} marking 标识 必填
 * @param {*} currentFileName 文件名称 非必填
 * @returns 
 */
export default async function getUploadToken(type, file, typeName, marking, currentFileName='') {
    //重命名文件名称
    const id = (Math.random() + new Date().getTime()).toString(32).slice(0,8)
    const currentfileName = file.name || currentFileName
    const fileIndex = currentfileName.lastIndexOf('.')
    const substrName = currentfileName.substr(fileIndex)
    const fileName = `${marking}_${id}${currentfileName}`
    console.log('substrName=', substrName)
    // 验证格式
    const formatImg = /.(jpg|png|jpeg|webp|bmp)$/i
    if(!formatImg.test(substrName)){
        uni.showToast({
            title: '上传格式不正确',
            icon: 'none'
        })
        return
    }
    try{

        
    
        // 直接通过后端上传
        // const urlKey = `${typeName}/${fileName}`
        // const res = type === 'private' ? await getAkInfo({urlKey}) : await getCDNAkInfo({urlKey})
        // console.log('res====', res)
        // if (res) {
        //     const uploadRes = await uploadOBS(Object.assign(res, { file, typeName: urlKey, type}))
        //     console.log('uploadRes====', uploadRes)
        //     return uploadRes
        // } else {
        //     return false
        // }
        const urlKey = `${typeName}`
        console.log('type', type, 'urlkey', urlKey)
        console.log('file', file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('isPublic', type !== 'private')
        formData.append('fileName', fileName)
        formData.append('targetPath', urlKey)

        const baseUrl = getApp().globalData.baseUrl
        console.log('baseUrl', `${baseUrl}/file/upload`)
        // 文件上传，使用axios uni.requset 不支持 formData
        // axios({
        //     method: 'post',
        //     url: `${baseUrl}file/storage/upload`,
        //     data: formData,
        //     headers: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'token': token,
        //     }
        // }).then(async res => {
        //     console.log('res', res)
        //     if (res.data.code === 200) {
        //         const result = await getTempUrl({ fileKey: res.data })
        //         console.log('result', result)
        //         return {
        //             urlTemp: result.data,
        //             typeName: res.data.data
        //         }
        //     }
        // }).catch(err => {
        //     console.error('err-----', err)
        // })

        const { data: res } = await axios({
            method: 'post',
            url: `${baseUrl}file/storage/upload`,
            data: formData,
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': token,
            }
        })

        console.log('res', res)
        
        

        // const res = await fileUploadApi(formData)
        // console.log('res', res)
        if (res.code === 200) {
            if (type === 'private') {
                const result = await getTempUrl({ fileKey: res.data })
                console.log('result', result)
                return {
                    tempUrl: result,
                    typeName: res.data
                }
            }
            return { urlTemp: res.data }
        } else {
            console.error(res.message)
        }
       
    } catch(err){
        console.error('upload err=====', err)
        // 不提示用户没有登录
        if(err === '用户没有登录') return
        uni.showToast({
            title: err,
            icon: 'none',
            duration: 3000,
        })
        return false
    }
}

//上传至obs
async function uploadOBS(data) {
    return new Promise((resolve, reject) => {
        const { accessKey, secretKey, securityToken, file, typeName, tempUrl, url, type } = data
        var obsClient = new ObsClient({
            access_key_id: accessKey,
            secret_access_key: secretKey,
            server: `https://obs.cn-south-1.myhuaweicloud.com`,
            security_token: securityToken
        })
        const nodeEnv = process.env.NODE_ENV
        const productionEnv = ['production', 'new-production', 'hw-prod']
        const privateBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-private' : 'zhil-cloud-private-test'
        const publicBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-cdn' : 'zhil-cloud-cdn-test'
        console.log('Bucket=', (type === 'private' ? privateBucket : publicBucket))
        if(!file) reject('未获取到文件，上传失败。')
        obsClient.putObject({
            Bucket: type === 'private' ? privateBucket : publicBucket,
            Key: typeName,
            SourceFile: file,
        }, function (err, result) {
            if (err) {
                console.error('Error-->' + err)
                reject('[000]网络开小差了，请稍候重试~')
                return
            }
            const { CommonMsg } = result
            const { Status, Message } = CommonMsg
            if (Status === 200) {
                type === 'private' ? resolve({
                    tempUrl, typeName
                }) : resolve({
                    url,
                    typeName
                })
                return
            }
            reject('[001]网络开小差了，请稍候重试~')
        })
    })
}