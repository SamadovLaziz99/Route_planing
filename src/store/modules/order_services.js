import axios from "axios";
const _url = process.env.VUE_APP_ORDER_SERVICE_URL
const _token = process.env.VUE_APP_ORDER_SERVICE_TOKEN
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async confirmTransaction ({}, payload) {
      let res = await axios.post(`${_url}/dashboard/v1/orders/${payload.id}/confirm-transaction`, payload.data, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async resendCode ({}, id) {
      let res = await axios.post(`${_url}/dashboard/v1/orders/${id}/resend-code`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async acceptOrder ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/accept`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async processOrder ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/process`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async shippingOrder ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/process-delivery`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async requestDelivery ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/request-delivery`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async assignCourier ({}, { order_id, courier_id }) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${order_id}/couriers/${courier_id}`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async cancelOrder ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/cancel`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
    async finishOrder ({}, id) {
      let res = await axios.patch(`${_url}/dashboard/v1/orders/${id}/finish`, {}, {
        headers: {
          Authorization: 'Bearer ' + _token
        }
      })
      console.log(res)
      return res
    },
  }
}
