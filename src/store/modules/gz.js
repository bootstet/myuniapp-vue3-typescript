export default {
  namespaced: true,
  state: () => ({
    memberInfo: {}
  }),
  mutations: {
    SET_MEMBER_INFO: (state, value) => {
      state.memberInfo = value
    }
  },
  actions: {
    setMemberInfo({
      commit
    }, value) {
      return commit('SET_MEMBER_INFO', value);
    },
  }
}