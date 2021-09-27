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
    async statsCategories ({ commit }) {
      let _res = await axios_init.get('/statistics/categories/')
      commit('CATEGORIES_STATS', _res)
    },
    async statsFoods ({ commit }) {
      let _res = await axios_init.get('/statistics/foods/')
      commit('FOODS_STATS', _res)
    },
    async statsMonth ({ commit }) {
      let _res = await axios_init.get('/statistics/month/')
      commit('ORDER_MONTH_STATS', _res)
    },
    async statsTop ({ commit }) {
      let _res = await axios_init.get('/statistics/top/')
      commit('TOP_STATS', _res)
    },
    async statsUsers ({ commit }) {
      let _res = await axios_init.get('/statistics/users/')
      commit('USERS_STATS', _res)
    },
    async statsVendors ({ commit }) {
      let _res = await axios_init.get('/statistics/vendors/')
      commit('VENDORS_STATS', _res)
    },
    async statsWeek ({ commit }) {
      let _res = await axios_init.get('/statistics/week/')
      commit('ORDER_WEEK_STATS', _res)
    },
  }
}
