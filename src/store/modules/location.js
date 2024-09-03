const getDefaultState = () => {
    return {
        mapLocation: '',
        mapAddress: '',
        userLongAndLati: '',
        userSelectAdress: {
            province: '',
            city: '',
            areaName: ''
        }
    }
}

const state = getDefaultState()

const mutations = {
    SET_MAPLOCATION: (state, value) => {
        state.mapLocation = value
    },
    SET_MAPADDRESS: (state, value) => {
        state.mapAddress = value
    },
    SET_USERPOSITION: (state, value) => {
        state.userLongAndLati = value
    },
    SET_USERSELECTADRESS: (state, value) => {
        state.userSelectAdress = value
    }
}

const actions = {
    setMapLocation({commit}, name) {
        return commit('SET_MAPLOCATION', name);
    },
    setMapAddress({commit}, name) {
        return commit('SET_MAPADDRESS', name);
    },
    setUserLongAndLati({ commit }, name) {
        return commit('SET_USERPOSITION', name)
    },
    setUserSelectAdress({ commit }, name) {
        return commit('SET_USERSELECTADRESS', name)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

