import axios_init from "../../utils/axios_init";
export default {
  state: {
    orderStats: null
  },
  getters: {

  },
  mutations: {
    SET_ORDER_STATS (state, payload) {
      state.orderStats = payload
    }
  },
  actions: {
    async changeStatusOrder ({ commit }, payload) {
      const res = await axios_init.patch(`/orders/${payload.id}/`, payload.data)
      return res
      console.log(res)
    },
    setOrderStats ({ commit }, payload) {
      commit('SET_ORDER_STATS', payload)
    }
  }
}
