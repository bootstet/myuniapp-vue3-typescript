import { getAkInfo, getCDNAkInfo } from '@/api/upload'

export default async function getUploadToken(urlKey, type) {
    const { code, data } = type==='private' ? await getAkInfo({urlKey}) : await getCDNAkInfo({urlKey})
	// console.log('obsConfig data', data)
    if(code === 200){
        const { accessKey, secretKey, securityToken, tempUrl, url} = data
        const configuration = {
            AccessKeyId: accessKey,
            SecretKey: secretKey,
            SecurityToken: securityToken,
            tempUrl,
            url
        }
        // console.log('obsConfig configuration', configuration)
        return configuration
    }else{
        return ''
    }
}