import axios_init from "../../utils/axios_init";
export default {
  state: {
    token: null,
    loading: false,
    error: null
  },
  getters: {
    token: state => state.token,
    fetchToken: state => state.loading,
    authError: state => state.error
  },
  mutations: {
    SET_TOKEN (state, payload) {
      localStorage.setItem('token', payload)
      state.token = payload
    },
    FETCH_TOKEN (state, payload) {
      state.loading = payload
    },
    ERROR_AUTH (state, payload) {
      state.error = payload
    },
  },
  actions: {
    getToken ({ commit, dispatch }, payload) {
      commit('FETCH_TOKEN', true)
      return new Promise((resolve, reject) => {
        axios_init.post('/token/', payload).then(res => {
          commit('SET_TOKEN', res.access)
          resolve()
          console.log(res)
        }).catch(err => {
          reject()
          console.log(err)
        })
          .finally(() => {
            commit('FETCH_TOKEN', false)
          })
      })
    },
    async signOut ({commit}) {
      await localStorage.removeItem('token')
      return 'Token Deleted'
    }
  }
}
