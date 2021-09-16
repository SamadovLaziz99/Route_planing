import notify from '../../components/Common/Notification'

export default {
  state: {
    // type: 'success filled',
    // title: null,
    // message: null,
    // duration: null
  },
  getters: {

  },
  mutations: {
    // SET_ALERT_TYPES (state, payload) {
    //   state.type = payload?.type
    //   state.title = payload?.title
    //   state.message = payload?.message
    //   state.duration = payload?.duration
    // }
  },
  actions: {
    alert({}, payload) {
      const { type, title, message, duration } = payload
      notify.starter(type, title, message, { duration: duration, permanent: false })
      // dispatch('switchAlert')
    },
    success_alert({}, payload) {
      const { title, message } = payload
      notify.starter('success filled', title, message, { duration: 5000, permanent: false })
    },
    error_alert({}, payload) {
      const { title, message } = payload
      notify.starter('error filled', title, message, { duration: 5000, permanent: false })
    },
    warning_alert({}, payload) {
      const { title, message } = payload
      notify.starter('warning filled', title, message, { duration: 5000, permanent: false })
    },
    info_alert({}, payload) {
      const { title, message } = payload
      notify.starter('info filled', title, message, { duration: 5000, permanent: false })
    },
  }
}
