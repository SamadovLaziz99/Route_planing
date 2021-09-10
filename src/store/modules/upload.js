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
    },
    async deleteMedia ({ commit, dispatch }, payload) {
      try {
        let res = await axios_init.remove(`/media/${payload}/`)
        console.log(res)
        dispatch('success_alert', {
          title: 'Media Deleted Successfully'
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}


