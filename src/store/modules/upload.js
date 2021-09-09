import axios_init from "../../utils/axios_init";
export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async UploadFile ({ commit }, payload) {
      let res = await axios_init.post(`/${payload.path}/media/`, payload.data)
      console.log(res)
    }
  }
}


