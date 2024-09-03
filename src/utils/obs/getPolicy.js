const Base64 = require('./Base64.js')

function getPolicyEncode(fileName, SecurityToken, type) {
  let date = new Date()
  //失效时间 两小时后
  date.setHours(date.getHours() + 2)
  const srcT = date.toISOString()
  const fileIndex = fileName.lastIndexOf('.')
  const substrName = fileName.substr(fileIndex).split('.')[1]
  const obj = {
    "png":"image/png",
    "jpg":"image/jpeg",
    "jpeg":"image/jpeg",
  }
  const nodeEnv = process.env.NODE_ENV
  const productionEnv = ['production', 'new-production', 'hw-prod']
  const privateBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-private' : 'zhil-cloud-private-test'
  const publicBucket = productionEnv.includes(nodeEnv) ? 'zhil-cloud-cdn' : 'zhil-cloud-cdn-test'
  console.log('Bucket=', (type === 'private' ? privateBucket : publicBucket))
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间
    "conditions": [
      {"bucket": type==='private' ? privateBucket : publicBucket},
      {"x-obs-security-token": SecurityToken},
      {"key": fileName},
      {"content-type": obj[substrName]}
    ]
  };
  const policyBase64 = Base64.encode(JSON.stringify(policyText))
  return policyBase64
}

module.exports = getPolicyEncode
