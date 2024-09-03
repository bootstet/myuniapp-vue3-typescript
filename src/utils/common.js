import store from '@/store'
import { getQueryString } from '@/utils/index'

const source = getQueryString('source') || store.state.common.source || ''
export const  getNavList = (barTextArr) => {
  const navList = [
    {
      // #ifdef  H5
      pagePath: '/' + uni.getStorageSync('homeUrlObject')[source],
      // #endif
      // #ifdef MP-WEIXIN
      pagePath: '/pages/home/index',
      // #endif
      iconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/home.png",
      selectedIconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/home-active.png",
      text: barTextArr[0],
    },
    {
      pagePath: `/pages/order/index?source=${source}`,
      iconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/order.png",
      selectedIconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/order-active.png",
      text: barTextArr[1],
    },
    {
      pagePath: `/pages/my/index?source=${source}`,
      iconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/my.png",
      selectedIconPath: "https://static.zhil.cloud/zhil_web_h5/pov-h5/common/2.0/my-active.png",
      text: barTextArr[2],
    },
  ]
  // 未输入对应项的值 默认隐藏该项
  barTextArr.forEach((item, index) => {
    if (!item.trim()) {
      navList.splice(index, 1)
    }
  })
  return navList
} 