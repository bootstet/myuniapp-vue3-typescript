import store from '@/store'
import { getOrgRelationList } from '@/api/common.js'

const whileList = {
  'test': 'o6Njm5x_b',
}
const nodeEnv = process.env.NODE_ENV

const openIdWhile = whileList[nodeEnv]
export default openIdWhile