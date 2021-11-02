import axios_init from "../../utils/axios_init";
export default {
  state: {
    token: null,
    user: null,
    loading: false,
    error: null
  },
  getters: {
    token: state => state.token,
    user: state => state.user,
    fetchToken: state => state.loading,
    authError: state => state.error
  },
  mutations: {
    SET_TOKEN (state, payload) {
      localStorage.setItem('token', payload)
      state.token = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    FETCH_TOKEN (state, payload) {
      state.loading = payload
    },
    REMOVE_TOKEN (state, payload) {
      state.token = payload
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
    async getUserDetail ({commit}) {
      let res = await axios_init.get(`/user/detail/`)
      commit('SET_USER', res)
      console.log(res)
      return res
    },
    async signOut ({commit}) {
      commit('REMOVE_TOKEN', null)
      commit('SET_USER', null)
      await localStorage.removeItem('token')
      return 'Token Deleted'
    }
  }
}
