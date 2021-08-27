export default {
  state: {
    deleteModal: {
      data: {},
      isShow: false
    }
  },
  getters: {
    deleteModal: state => state.deleteModal
  },
  mutations: {
    DELETE_MODAL (state, payload) {
      state.deleteModal.isShow = payload.isShow
      state.deleteModal.data = payload.data
    }
  },
  actions: {
  }
}
