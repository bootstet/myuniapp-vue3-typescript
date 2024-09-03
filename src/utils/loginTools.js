// 给关联的机构设置token
import store from "@/store";
import { getOrgRelationList } from "@/api/common.js";

const setToken = async (token) => {
  if (!token) return
  const source = store.state.common.source
  const orgRelationList = await getOrgRelationList()
  store.dispatch('common/setOrgRelation', {[source]:orgRelationList})
  store.dispatch("common/setToken", token);
  let tokenData = {}
  orgRelationList.forEach(orgId => {
    tokenData[orgId] = token
  });
  store.dispatch("common/setTokenData", tokenData);
}

export default setToken