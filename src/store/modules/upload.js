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
    async uploadMedia ({ commit, dispatch }, payload) {
      try {
        let res = await axios_init.post(`/${payload.type}/media/`, payload.data)
        dispatch('success_alert', {
          title: 'Media Uploaded Successfully'
        })
        return res
      } catch (e) {
        console.log(e)
      }
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


