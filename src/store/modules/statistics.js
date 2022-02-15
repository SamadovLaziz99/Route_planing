import axios_init from "../../utils/axios_init";
export default {
  state: {
    categories: null,
    foods: null,
    month: null,
    top: null,
    users: null,
    vendors: null,
    week: null
  },
  getters: {
    statsCategories: state => state.categories,
    statsFoods: state => state.foods,
    statsMonth: state => state.month,
    statsTop: state => state.top,
    statsUsers: state => state.users,
    statsVendors: state => state.vendors,
    statsWeek: state => state.week,
  },
  mutations: {
    ORDER_WEEK_STATS (state, payload) { state.week = payload },
    ORDER_MONTH_STATS (state, payload) { state.month = payload },
    FOODS_STATS (state, payload) { state.foods = payload },
    CATEGORIES_STATS (state, payload) { state.categories = payload },
    VENDORS_STATS (state, payload) { state.vendors = payload },
    TOP_STATS (state, payload) { state.top = payload },
    USERS_STATS (state, payload) { state.users = payload },
  },
  actions: {
    async statsCategories ({ commit }, params) {
      let _res = await axios_init.get('/statistics/categories/', params)
      commit('CATEGORIES_STATS', _res)
    },
    async statsFoods ({ commit }, params) {
      let _res = await axios_init.get('/statistics/foods/', params)
      commit('FOODS_STATS', _res)
    },
    async statsMonth ({ commit }, params) {
      let _res = await axios_init.get('/statistics/month/', params)
      commit('ORDER_MONTH_STATS', _res)
    },
    async statsTop ({ commit }, params) {
      let _res = await axios_init.get('/statistics/top/', params)
      commit('TOP_STATS', _res)
    },
    async statsUsers ({ commit }, params) {
      let _res = await axios_init.get('/statistics/users/', params)
      commit('USERS_STATS', _res)
    },
    async statsVendors ({ commit }, params) {
      let _res = await axios_init.get('/analytics/vendors/top', params)
      commit('VENDORS_STATS', _res)
    },
    async statsWeek ({ commit }, params) {
      let _res = await axios_init.get('/statistics/week/', params)
      commit('ORDER_WEEK_STATS', _res)
    },
  }
}
