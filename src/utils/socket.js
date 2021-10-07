import store from '../store'
import { bridge } from "./bridge";
const ws = new WebSocket(`${process.env.VUE_APP_SOCKET_URL}/notifications/`)

ws.onopen = function (e) {
  store.dispatch('info_alert', {
    title: 'Socket Connected Successfuly !',
    message: 'Connected'
  })
}

ws.onmessage = function (e) {

  const data = JSON.parse(e.data)
  if (data.type !== 'courier') {
    store.dispatch('info_alert', {
      title: 'New Message Received'
    })
  }
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
  if (data.type === 'courier') {
    const _data = { ...data }
    const _courier = store.getters.courierLocations.filter(e => e.id === data.courier_id)[0]
    const _index = store.getters.courierLocations.indexOf(_courier)
    let a = { ..._courier }
    a.location[0] = {
      courier: _data.courier_id,
      // created_at: _data.created_at,
      id: _data.id,
      latitude: _data.latitude,
      location: _data.location,
      longitude: _data.longitude,
      order: _data.order_id,
      time: _data.time
    }
    console.log(a)
    bridge.$emit('realTimeCourier', a)
    // if (_index > -1) {
    //   store.commit('UPDATE_NEW_LOCATION', {
    //     index: _index,
    //     data: a
    //   })
    //   console.log('Updated')
    //   console.log(store.getters.courierLocations)
    // }
  }
}

ws.onerror = function (e) {
  store.dispatch('error_alert', {
    title: 'Socket connection failed !',
    message: 'socket_error',
    duration: 60 * 60 * 1000
  })
}

