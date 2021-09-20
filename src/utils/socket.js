import store from '../store'
import router from "../router";
const ws = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}/notifications/`)

ws.onopen = function (e) {
  console.log('Open', e)
  store.dispatch('info_alert', {
    title: 'Socket Connected Successfuly !',
    message: 'Connected'
  })
}

ws.onmessage = function (e) {
  store.dispatch('info_alert', {
    title: 'New Message Received'
  })
  const data = JSON.parse(e.data)

  if (data.type === 'order') {
    const _order = store.getters.dataOrders.filter(e => e.id === data.id)[0]
    const index = store.getters.dataOrders.indexOf(_order)
    if (index > -1) {
      store.commit('REMOVE_ONE_ORDERS', index)
    }
  }
  if (data.type === 'order_stats') {
    const _data = { ...data }
    delete _data.type
    store.dispatch('setOrderStats', data)
    store.dispatch('setOrderStatsHistory', data)
  }
}

ws.onerror = function (e) {
  store.dispatch('error_alert', {
    title: 'Socket connection failed !',
    message: 'socket_error',
    duration: 60 * 60 * 1000
  })
}

