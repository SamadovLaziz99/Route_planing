import store from '../store'

const ws = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}/notifications/`)

ws.onopen = function (e) {
  console.log('Open', e)
  store.dispatch('info_alert', {
    title: 'Socket Connected Successfuly !'
  })
}

ws.onmessage = function (e) {
  store.dispatch('info_alert', {
    title: 'New Message Received'
  })
  const data = JSON.parse(e.data)
  console.log(data)
  message(data)
}

ws.onerror = function (e) {
  store.dispatch('error_alert', {
    title: 'Socket connection failed !'
  })
}

function message(data) {
  switch (data.type) {
    case "order": () => {
      const i = store.getters.dataOrders.filter(e => e.id === data.id)[0].id
      if (i) {
        const _data = { ...data }
        delete _data.type
        store.commit('CHANGE_ONE_ORDERS', {
          index: i,
          data: _data
        })
      }
    }
      break;
    case "order_stats": () => {
      const _data = { ...data }
      delete _data.type
      store.dispatch('setOrderStats', data)
    }
      break;
    default:
      break
  }
}

