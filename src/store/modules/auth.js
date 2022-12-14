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
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_USER(state, payload) {
      state.user = payload;
    },
    FETCH_TOKEN(state, payload) {
      state.loading = payload;
    },
    REMOVE_TOKEN(state, payload) {
      state.token = payload;
    },
    ERROR_AUTH(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    getToken({commit, dispatch}, payload) {
      commit('FETCH_TOKEN', true);
      return new Promise((resolve, reject) => {
        axios_init.post('/auth/local/', payload).then(res => {
          localStorage.setItem('token', res.jwt);
          commit('SET_TOKEN', res.jwt);
          setTimeout(() => {
            resolve();
          }, 1)
        }).catch(err => {
          reject();
          console.log(err);
        })
          .finally(() => {
            commit('FETCH_TOKEN', false);
          });
      });
    },
    async getUserDetail({commit}) {
      // let res = await axios_init.get(`/user/detail/`);
      // setTimeout(() => {
      // await localStorage.removeItem('detail')
      // }, 1)
      // setTimeout(() => {
      // await localStorage.setItem('detail', JSON.stringify(res));
      // }, 2)
      // setTimeout(() => {
      // await commit('SET_USER', res);
      // }, 3)
      // setTimeout(() => {
      // return res;
      // }, 4)
    },
    async changeUserDetails({}, payload) {
      let res = await axios_init.put(`/user/${payload.id}/`, payload.data);
      return res;
    },
    async signOut({commit}) {
      localStorage.removeItem('token');
      localStorage.removeItem('detail');
      commit('REMOVE_TOKEN', null);
      commit('SET_USER', null);
      console.log(localStorage.getItem('token'));
      return 'Token Deleted';
    }
  }
}
