
const otherOrgInfo = [
    {
        orgName: '江宁妇幼',
        type: 1,
        orgObj: {
            dev: 1007,
			// dev: 921,
            test: 921,
            pro: 1123
        }
    }
] 

/**
 * 针对有些机构定制化的需求扩展方法
 * @param {Number} source 
 */
export function hitOrg(source) {
    return new Promise((resolve, reject) => {
        const nodeEnv = process.env.NODE_ENV
        let env = ''
        switch(nodeEnv) {
            case 'development':case 'dev':case 'new-development':
                env = 'dev'
                break
            case 'test':case 'new-test':case 'sit':
                env = 'test'
                break
            case 'production':case 'new-production':case 'hw-prod':
                env = 'pro'
                break
        }
        
        let orgInfo = otherOrgInfo.filter(item => {
            return item.orgObj[Object.keys(item.orgObj).filter(item => item == env)[0]] == source
        })
        if (orgInfo.length > 0) {
            resolve(orgInfo[0])
        }
    })
    
}

/**
 * 当前机构是否是健康沛县
 */
export function peixianOrg(source) {
    const orgIdList = {
        'development': 1631,
        'dev': 1631,
        'new-development': 1631,
        'test': 1513,
        'new-test': 1513,
        'sit': 1513,
        'production': 2560,
        'new-production': 2560,
        'hw-prod': 2560,
    }
    if(orgIdList[process.env.NODE_ENV] === +source) {
        return true
    }
    return false
}