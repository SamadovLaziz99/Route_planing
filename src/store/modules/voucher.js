import axios_init from "../../utils/axios_init";
export default {
  state: {
  },
  getters: {
    // deleteModal: state => state.deleteModal
  },
  mutations: {
    // DELETE_MODAL (state, payload) {
    //   state.deleteModal.isShow = payload.isShow
    //   state.deleteModal.data = payload.data
    // }
  },
  actions: {
    async batchVoucher({commit}, data) {
      let res = await axios_init.post('/vouchers/batch/create/', data.data)
      console.log(res)
      return res
    }
  }
}
