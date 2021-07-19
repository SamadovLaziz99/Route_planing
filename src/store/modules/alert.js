import notify from '../../components/Common/Notification'

export default {
  state: {
    type: null,
    title: null,
    message: null,
    duration: null
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    alert({ commit }) {
      notify.starter(
        'success filled',
        'Salom',
        'Happy year',
        { duration: 30000, permanent: false }
      )
    }
  }
}
