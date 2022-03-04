import axios_init from "../../utils/axios_init";
export default {
  state: {
    categories: null,
    foods: [],
    notSoldFoods: [],
    month: null,
    top: null,
    users: null,
    vendors: null,
    week: null,
    couriers: []
  },
  getters: {
    statsCategories: state => state.categories,
    statsFoods: state => state.foods.splice(0, 15),
    statsNotSoldFoods: state => state.notSoldFoods.splice(0, 15),
    statsMonth: state => state.month,
    statsTop: state => state.top,
    statsUsers: state => state.users,
    statsVendors: state => state.vendors,
    statsCouriers: state => state.couriers.filter(e => e.courier !== null),
    statsWeek: state => state.week,
  },
  mutations: {
    ORDER_WEEK_STATS (state, payload) { state.week = payload },
    ORDER_MONTH_STATS (state, payload) { state.month = payload },
    FOODS_STATS (state, payload) { state.foods = payload },
    NOT_SOLD_FOODS_STATS (state, payload) { state.notSoldFoods = payload },
    CATEGORIES_STATS (state, payload) { state.categories = payload },
    VENDORS_STATS (state, payload) { state.vendors = payload },
    COURIERS_STATS (state, payload) { state.couriers = payload },
    TOP_STATS (state, payload) { state.top = payload },
    USERS_STATS (state, payload) { state.users = payload },
  },
  actions: {
    async statsCategories ({ commit }, params) {
      commit('CATEGORIES_STATS', null)
      let _res = await axios_init.get('/statistics/categories/', params)
      commit('CATEGORIES_STATS', _res)
    },
    async statsFoods ({ commit }, params) {
      commit('FOODS_STATS', [])
      let _res = await axios_init.get('/statistics/foods/', params)
      commit('FOODS_STATS', _res)
    },
    // async statsNotSoldFoods ({ commit }, params) {
    //   let _res = await axios_init.get('/analytics/foods/notsold', params)
    //   commit('NOT_SOLD_FOODS_STATS', _res.foods)
    // },
    async statsMonth ({ commit }, params) {
      commit('ORDER_MONTH_STATS', null)
      let _res = await axios_init.get('/statistics/month/', params)
      commit('ORDER_MONTH_STATS', _res)
    },
    async statsTop ({ commit }, params) {
      commit('TOP_STATS', null)
      let _res = await axios_init.get('/statistics/top/', params)
      commit('TOP_STATS', _res)
    },
    async statsUsers ({ commit }, params) {
      commit('USERS_STATS', null)
      let _res = await axios_init.get('/statistics/users/', params)
      commit('USERS_STATS', _res)
    },
    async statsVendors ({ commit }, params) {
      commit('VENDORS_STATS', null)
      let _res = await axios_init.get('/statistics/vendors/', params)
      commit('VENDORS_STATS', _res)
    },
    async statsCouriers ({ commit }, params) {
      commit('COURIERS_STATS', [])
      let _res = await axios_init.get('/statistics/analysis/', params)
      commit('COURIERS_STATS', _res.couriers)
    },
    async statsWeek ({ commit }, params) {
      commit('ORDER_WEEK_STATS', null)
      let _res = await axios_init.get('/statistics/week/', params)
      commit('ORDER_WEEK_STATS', _res)
    },
    async statsOrderByVendor ({ commit }, params) {
      let _res = await axios_init.get('/analytics/vendors/ordercount', params)
      return _res.order_count
      // commit('ORDER_WEEK_STATS', _res)
    },
  }
}
