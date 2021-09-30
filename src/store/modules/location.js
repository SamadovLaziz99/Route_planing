import axios_init from "../../utils/axios_init";
export default {
  state: {
    locations: [],
    copy_locations: []
  },
  getters: {
    courierLocations: state => state.locations,
    copyCourierLocations: state => state.copy_locations,
  },
  mutations: {
    SET_COURIER_LOCATIONS (state, payload) {
      state.locations = payload
    },
    HIDDEN_COURIER_LOCATIONS(state, payload) {
      state.copy_locations = [...state.locations]
      state.locations = []
    },
    SHOW_COURIER_LOCATIONS(state, payload) {
      state.locations = [...state.copy_locations]
      state.copy_locations = []
    },
    UPDATE_NEW_LOCATION(state, payload) {
      let _ll = [ ...state.locations ]
      state.locations = []
      setTimeout(() => {
        _ll[payload.index] = payload.data
        state.locations = _ll
      }, 50)
    }
  },
  actions: {
    async courierLocation ({ commit }, payload) {
      const res = await axios_init.get(`/couriers/locations/`)
      commit('SET_COURIER_LOCATIONS', res.results)
      return res
      console.log(res)
    },
    hiddenCourierLocation ({ commit }) {
      commit('HIDDEN_COURIER_LOCATIONS')
    },
    showCourierLocation ({ commit }) {
      commit('SHOW_COURIER_LOCATIONS')
    }
  }
}
