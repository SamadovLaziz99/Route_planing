import axios_init from "../../utils/axios_init";
export default {
  state: {
    foods: null
  },
  getters: {
    orderFoods: state => state.foods
  },
  mutations: {
    SET_ORDER_FOODS(state, payload) {
      state.foods = payload
    }
  },
  actions: {
    async getOrderFoods ({ commit }, payload) {
      const _result = await axios_init.get('/food/', {
        order_id: payload
      })
      commit('SET_ORDER_FOODS', _result.results)
      return _result
    }
  }
}
