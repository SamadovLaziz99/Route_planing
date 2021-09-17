import axios_init from "../../utils/axios_init";
export default {
  state: {
    // orderStats: null
    stats: [
      { name: 'order.pending', count: 0 },
      { name: 'order.accepted', count: 0 },
      { name: 'order.in_process', count: 0 },
      { name: 'order.shipping', count: 0 }
    ]
  },
  getters: {
    orderStats: state => state.stats
  },
  mutations: {
    SET_ORDER_STATS (state, payload) {
      state.stats = payload
    }
  },
  actions: {
    async changeStatusOrder ({ commit }, payload) {
      const res = await axios_init.patch(`/orders/${payload.id}/`, payload.data)
      return res
      console.log(res)
    },
    async getOrderStats ({ commit }, payload) {
      const res = await axios_init.get(`/orders/stats/`)
      commit('SET_ORDER_STATS', [
        { name: 'order.pending', count: res.pending },
        { name: 'order.accepted', count: res.accepted },
        { name: 'order.in_process', count: res.in_process },
        { name: 'order.shipping', count: res.shipping },
      ])
      console.log(res)
      return res
    },
    setOrderStats ({ commit }, payload) {
      commit('SET_ORDER_STATS', [
        { name: 'order.pending', count: payload.pending },
        { name: 'order.accepted', count: payload.accepted },
        { name: 'order.in_process', count: payload.in_process },
        { name: 'order.shipping', count: payload.shipping },
      ])
    }
  }
}
