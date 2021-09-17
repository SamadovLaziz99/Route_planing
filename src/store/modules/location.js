import axios_init from "../../utils/axios_init";
export default {
  state: {
    locations: [],
  },
  getters: {
    courierLocations: state => state.locations,
  },
  mutations: {
    SET_COURIER_LOCATIONS (state, payload) {
      state.locations = payload
    }
  },
  actions: {
    async courierLocation ({ commit }, payload) {
      const res = await axios_init.get(`/couriers/locations/`)
      commit('SET_COURIER_LOCATIONS', res.results)
      return res
      console.log(res)
    }
  }
}
