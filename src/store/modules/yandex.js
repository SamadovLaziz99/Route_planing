// import axios_init from "../../utils/axios_init";
import axios from "axios";
// import { routeOptimized } from "../../utils";
export default {
  state: {
    route: null
  },
  getters: {
    oneRoute: state => state.route
  },
  mutations: {
    SET_ONE_ROUTE (state, payload) {
      state.route = payload
    }
    // SET_ALERT_TYPES
  },
  actions: {
    async getOneRoute({ commit }, params) {
      const res = await axios.get('https://api-maps.yandex.ru/services/route/2.0/', {
        params: {
          lang: 'ru_RU',
          rll: '69.289203,41.321352~69.28024,41.313705',
          apikey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
          token: 'b7a8293b48490c22e8a5774393dd0d2e',
          rtm: 'atm',
          results: 1
        }
      })
      let _data = res.data
      let _route = _data.features[0].features[0].properties.PathMetaData
      commit('SET_ONE_ROUTE', {
        distance: _route.Distance,
        duration: _route.Duration,
        durationTraffic: _route.DurationInTraffic
      })
      // console.log(routeOptimized(_data))
    }
  }
}
