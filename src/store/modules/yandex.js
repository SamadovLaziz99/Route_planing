// import axios_init from "../../utils/axios_init";
import axios from "axios";
import axios_init from "../../utils/axios_init";
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
          token: '6d99bc747031277736796fd393734636',
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
    },
    async getPointData ({}, value) {
      let a = await axios({
        method: 'get',
        url: 'https://geocode-maps.yandex.ru/1.x/',
        params: {
          format: 'json',
          apikey: '1abe9aa1-66ec-4c7f-8b93-a4e0bc25319e',
          geocode: value,
          sco: 'latlong',
          lang: 'ru-RU',
          results: 1,
          ll: '69.241320,41.292906',
          spn: '6.5,6.5',
          rspn: 1
        }
      })
        // .then(res => {
        const members = a.data.response.GeoObjectCollection.featureMember
        if (members.length > 0) {
          const result = members.map(map => {
            return {
              name: map.GeoObject.name,
              latlong: {
                lat: map.GeoObject.Point.pos.split(' ')[1],
                lon: map.GeoObject.Point.pos.split(' ')[0]
              },
              type: map.GeoObject.metaDataProperty.GeocoderMetaData.kind,
              description: map.GeoObject.description
            }
          })
          return result
        }

      //     resolve(result)
      //   } else {
      //     resolve([])
      //   }
      //   console.log(res)
      // })
    },
    async getRouteValhalla ({}, value) {
      const toOne = value.to[0]
      const toTwo = value.to[1]
      const fromOne = value.from[0]
      const fromTwo = value.from[1]
      let a = await axios({
        method: 'get',
        url: `https://valhalla.coozin.uz/optimized_route?json={"locations":[{"lat":${toTwo},"lon":${toOne}},{"lat":${fromTwo},"lon":${fromOne}}],"costing":"auto","units":"kilometers","id":"my_work_route"}`
      })
      // console.log(a)
      return a.data.trip.summary
    },
  }
}
