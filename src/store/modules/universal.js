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
    },
    async getFoodOrders ({ commit }, payload) {
      const _result = await axios_init.get('/foodorder/', {
        order_id: payload
      })
      return _result
    },
    async changeStatusApplicants ({ commit }, payload) {
      const _result = await axios_init.put(`/applications/${ payload.id }/`, payload.data)
      return _result
    },
  }
}
