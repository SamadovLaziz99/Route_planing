import axios_init from "@/utils/axios_init";
import { camelize } from '@/utils'
export default function (param) {
  const toUpper = param.toUpperCase()
  const _mutations = {
    error: `ERROR_${toUpper}`,
    load: `LOAD_${toUpper}`,
    pending: `PENDING_${toUpper}`,
    deleting: `DELETING_${toUpper}`,
    data: `GET_${toUpper}`,
    pagination: `PAGINATION_${toUpper}`,
  }
  return {
    state: {
      loading: false,
      pending: false,
      deleting: false,
      error: null,
      data: [],
      pagination: {
        page: 1,
        total: 0
      }
    },
    getters: {
      [camelize(`load ${param}`)]: function (state) { return state.loading },
      [camelize(`pending ${param}`)]: function (state) { return state.pending },
      [camelize(`deleting ${param}`)]: function (state) { return state.deleting },
      [camelize(`data ${param}`)]: function (state) { return state.data },
      [camelize(`error ${param}`)]: function (state) { return state.error },
      [camelize(`pagination ${param}`)]: function (state) { return state.pagination }
    },
    mutations: {
      [_mutations.error]: function (state, payload) { state.error = payload },
      [_mutations.data]: function (state, payload) { state.data = payload },
      [_mutations.load]: function (state, payload) { state.loading = payload },
      [_mutations.pending]: function (state, payload) { state.pending = payload },
      [_mutations.deleting]: function (state, payload) { state.deleting = payload },
      [_mutations.pagination]: function (state, payload) { state.pagination = payload }
    },
    actions: {
      // get
      [camelize(`get ${param}`)]: function ({ commit }, params) {
        commit(_mutations.load, true)
        return new Promise((resolve, reject) => {
          axios_init.get(`${param}/`, params).then(res => {
            const _res = res.results
            const _total = res.count
            commit(_mutations.data, _res)
            commit(_mutations.pagination, {
              page: params?.page,
              total: _total
            })
            resolve(_res)
          }).catch(error => {
            reject(error)
          }).finally(() => {
            commit(_mutations.load, false)
          })
        })
      },

      // get id
      [camelize(`get by id ${param}`)]: function ({ commit }, payload) {
        // commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          axios_init.get(`${param}/${payload}/`, ).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          }).finally(() => {
            // commit(_mutations.pending, false)
          })
        })
      },

      //post
      [camelize(`post ${param}`)]: function ({ commit }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          axios_init.post(`${param}/`, payload.data).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      //update
      [camelize(`put ${param}`)]: function ({ commit }, payload) {
        commit(_mutations.pending, true)
        return new Promise((resolve, reject) => {
          axios_init.put(`${param}/${ payload.id }/`, payload.data).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          }).finally(() => {
            commit(_mutations.pending, false)
          })
        })
      },

      //delete
      [camelize(`delete ${param}`)]: function ({ commit }, payload) {
        commit(_mutations.deleting, true)
        return new Promise((resolve, reject) => {
          axios_init.remove(`${param}/${ payload }`).then(res => {
            resolve(res)
          }).catch(error => {
            reject(error)
          }).finally(() => {
            commit(_mutations.deleting, false)
          })
        })
      },
    }
  }
}
