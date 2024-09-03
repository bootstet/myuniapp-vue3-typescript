import cloneDeep from 'lodash/cloneDeep'
import store from '@/store'
import { pointSave } from '@/api/publicity.js'

// 埋点事件标签
const eventTitleList = [
  {
    number: 's0001',
    event: '地图首页浏览',
    type: 'mapHome'
  },
  {
    number: 's0002',
    event: '点击banner图',
    type: 'clickBanner'
  },
  {
    number: 's0003',
    event: '点击其中的机构',
    type: 'clickOrg'
  },
  {
    number: 's0004',
    event: '地图首页预约',
    type: 'clickBtnFirstOrder'
  },
  {
    number: 's0004',
    event: '地图首页订阅',
    type: 'clickBtnFirstSubscriber'
  },
  {
    number: 's0004',
    event: '地图首页登记',
    type: 'clickBtnFirstRegister'
  },
  {
    number: 's0005',
    event: '地图第二页预约',
    type: 'clickBtnSecondOrder'
  },
  {
    number: 's0005',
    event: '地图第二页订阅',
    type: 'clickBtnSecondSubscriber'
  },
  {
    number: 's0005',
    event: '地图第二页登记',
    type: 'clickBtnSecondRegister'
  },
  {
    number: 's0006',
    event: '商品详情',
    type: 'clickGoodsDetail'
  },
  {
    number: 's0007',
    event: '登录（去重）',
    type: 'login'
  },
  {
    number: 's0008',
    event: '注册',
    type: 'register'
  },
  {
    number: 's0009',
    event: '下单成交（去重）',
    type: 'successOrder'
  },
]

// 专题页地图埋点事件
export const pointEvent = (data) => {
  const { name } = store.state.common.agencyInfo
  const source = store.getters.source
  const { userId } = store.state.common.userInfo
  const { type, eventLink, pObj= {} } = cloneDeep(data)
  const { orgId, orgName } = pObj
  const params = {
    eventNum: eventTitleList.find(item => item.type === type)?.number || 0,  // 事件编号
    eventTitle: eventTitleList.find(item => item.type === type)?.event || 0, // 事件标签
    eventLink, // 页面路径
    userId: userId || 0,
    orgId,
    orgName
  }
  // 当埋点参数没有指定orgId 和 orgName的时候，且需要传机构信息的时候取浏览器缓存的source
  // type 为mapHome的时候不需要上报source
  if (source && type !== 'mapHome' && !orgId) {
    params.orgId = source
  }
  if (name && type !== 'mapHome' && !orgName) {
    params.orgName = name
  }
  pointSave(params).then(res => {
    if (res.code === 200) {
      console.log(`埋点${res}`) 
    } else {
      console.error(res)
    }
  }).catch(err => console.error(err))
}
