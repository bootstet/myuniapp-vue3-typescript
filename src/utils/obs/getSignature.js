const Crypto = require('./crypto.js')

function getSignature(policyBase64, SecretKey){
  const bytes = Crypto.HmacSHA1(policyBase64, SecretKey)
  const signature = Crypto.enc.Base64.stringify(bytes)
  return signature
}

module.exports = getSignature
