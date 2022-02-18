// import notify from '../../components/Common/Notification'

import axios_init from "../../utils/axios_init";

export default {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async getExcelVendors ({}, params) {
      try {
        const _res = await axios_init.get('/vendors/download/')
        return _res
      } catch (e) {
        return 'Error'
      }
    }
  }
}
