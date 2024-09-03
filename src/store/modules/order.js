export default {
  namespaced: true,
  state: () => ({
    itemNum: 1,
    userAddressId: '',
    addressList: [],
    orderCode: '',
    isAdGoods: false,
    adGoodsInfo: {}
  }),
  mutations: {
    setItemNum (state, val) {
      state.itemNum = val
    },
    setUserAddressId (state, val) {
      state.userAddressId = val
    },
    setAddressList (state, val = [])  {
      state.addressList =val
    },
    SET_ORDER_CODE: (state, value) => {
      state.orderCode = value
    },
    SET_IS_ADGOODS: (state, value) => {
      state.isAdGoods = value
    },
    SET_AD_GOODS_INFO: (state, value) => {
      state.adGoodsInfo = value
    }
  },
  actions: {
    setOrderCode({
      commit
    }, value) {
      return commit('SET_ORDER_CODE', value);
    },
    setIsAdGoods({
      commit
    }, value) {
      return commit('SET_IS_ADGOODS', value);
    },
    setAdGoodsInfo({
      commit
    }, value) {
      return commit('SET_AD_GOODS_INFO', value);
    }
  }
}