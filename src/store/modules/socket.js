import axios_init from "../../utils/axios_init";
export default {
  state: {
    // orderStats: null
    stats: [
      { name: 'order.pending', count: 0 },
      { name: 'order.hold', count: 0 },
      { name: 'order.accepted', count: 0 },
      { name: 'order.in_process', count: 0 },
      { name: 'order.finish', count: 0 },
      { name: 'order.shipping', count: 0 }
    ],
    history: [
      { name: 'order.finished', count: 0 },
      { name: 'order.cancelled', count: 0 },
    ]
  },
  getters: {
    orderStats: state => state.stats,
    orderStatsHistory: state => state.history
  },
  mutations: {
    SET_ORDER_STATS (state, payload) {
      state.stats = payload
    },
    SET_ORDER_HISTORY_STATS (state, payload) {
      state.history = payload
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
      // accepted: 0
      // finish: 1
      // finished: 2017
      // hold: 0
      // in_process: 1
      // pending: 0
      // shipping: 0
        { name: 'order.pending', count: res.pending },
        { name: 'order.hold', count: res.hold },
        { name: 'order.accepted', count: res.accepted },
        { name: 'order.in_process', count: res.in_process },
        { name: 'order.finish', count: res.finish },
        { name: 'order.shipping', count: res.shipping },
      ])
      commit('SET_ORDER_HISTORY_STATS', [
        { name: 'order.finished', count: res.finished },
        { name: 'order.cancelled', count: res.cancelled },
      ])
      console.log(res)
      return res
    },
    setOrderStats ({ state, commit }, payload) {
      commit('SET_ORDER_STATS', [
        { name: 'order.pending', count: payload.pending },
        { name: 'order.hold', count: state.stats[1].count },
        { name: 'order.accepted', count: payload.accepted },
        { name: 'order.in_process', count: payload.in_process },
        { name: 'order.finish', count: state.stats[4].count },
        { name: 'order.shipping', count: payload.shipping },
      ])
    },
    setOrderStatsHistory ({ commit }, payload) {
      commit('SET_ORDER_HISTORY_STATS', [
        { name: 'order.finished', count: payload.finished },
        { name: 'order.cancelled', count: payload.cancelled },
      ])
    }
  }
}
