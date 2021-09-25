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
          rll: params,
          apikey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
          token: 'de45c668b77617b375eabda142aa1908',
          rtm: 'atm',
          results: 1
        }
      })
      let _data = res.data
      let _route = _data.features[0].features[0].properties.PathMetaData
      const _result = {
        distance: _route.Distance,
        duration: _route.Duration,
        durationTraffic: _route.DurationInTraffic
      }
      commit('SET_ONE_ROUTE', _result)
      return _result
      // console.log(routeOptimized(_data))
    }
  }
}
