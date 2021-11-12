import axios_init from "../../utils/axios_init";
export default {
  state: {
    foods: null,
    roles: []
  },
  getters: {
    orderFoods: state => state.foods,
    userRoles: state => state.roles.map(e => {
      return {
        label: e.name,
        value: e.id
      }
    })
  },
  mutations: {
    SET_ORDER_FOODS(state, payload) {
      state.foods = payload
    },
    SET_USER_ROLES(state, payload) {
      state.roles = payload
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
    async getRoles ({ commit }) {
      let res = await axios_init.get('/user/role/list/')
      commit('SET_USER_ROLES', res.results)
    },
    async userRoleAssign ({ commit }, data) {
      let res = await axios_init.post('/user/role/create/', data)
      // commit('SET_USER_ROLES', res.results)
      return res
    },
    async getRatings ({ commit }, params) {
      let res = await axios_init.get('/ratings/', params)
      // commit('SET_USER_ROLES', res.results)
      return res.results
    }
  }
}
