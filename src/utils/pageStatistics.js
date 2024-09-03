import { productDetailStatistics, registerStatistics } from '@/api/publicity.js'

// 需要统计的页面
const staticUrlList = [
  'subPage/publicity/index', // 疫苗公示页面
  'goods/index', // 商品详情
]
export const pageStatics = (data) => {
  const { userId } = data
  const params = {
    ...data,
    userId: userId ? String(userId) : '', 
  }
  productDetailStatistics(params).then(res => {
    uni.setStorageSync('pageId', res.id)
  })
}
// 注册页面接口
export const loginPageStatics = (data) => {
  const { userId, url}  = data
  // 通过url判断，那些页面需要统计 不在统计页面不去掉接口
  if (!staticUrlList.some(item => url.includes(item))) {
    console.info(`${url},此页面不统计来源`)
    return 
  }
  const params = {
    id: uni.getStorageSync('pageId') || '5761',
    userId: userId ? String(userId) : 0
  }
  console.log('params', params)
  // if (params.id === '') return
  registerStatistics(params).then(res => {
    console.log('res', res)
  })
}