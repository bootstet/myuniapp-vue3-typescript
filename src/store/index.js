import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import order from './modules/order'
import location from './modules/location'
import gz from './modules/gz'

// Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    order,
    location,
    gz,
  },
  getters,
  plugins: [
  ]
})

export default store
