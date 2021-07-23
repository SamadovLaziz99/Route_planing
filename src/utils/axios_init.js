import axios from 'axios'
import store from '../store'
import { t } from '../locales/i18n'
const token = localStorage.getItem('token')

function unauthorized(msg) {
  errorNotification(t('unauthorized'), msg)
  store.dispatch('signOut')
}

function errorNotification (title, msg) {
  store.dispatch('error_alert', {
    title: title,
    message: msg
  })
}

function ErrorHandler(error) {
  if (error.message.startsWith('timeout')) {
    errorNotification(t('timeout'))
  }
  if (error.response) {
    const _error = error.response
    switch (_error.status) {
      case 400:
        errorNotification(t('bad_request'), _error.message)
        break
      case 401:
        unauthorized(_error.message)
        break
      case 403:
        errorNotification(t('forbidden'), _error.message)
        break
      case 404:
        errorNotification(t('not_found'), _error.message)
        break
      case 422:
        errorNotification(t('unprocessable_entity'), _error.message)
        break
      case 500:
        errorNotification(t('internal_server_error'), _error.message)
        break
      default:
        break
    }
  }
}

const init = {
  request(method, url, params, data) {
    const config = {
      baseURL: process.env.VUE_APP_BASE_URL,
      timeout: 10000,
      url: url,
      method: method,
      onUploadProgress: function (e) {
        Math.round((e.loaded * 100) / e.total)
      },
    }
    if (token) {
      config.headers = {
        Authorization: 'Bearer ' + token,
      }
    }
    if (data) config.data = data

    if (params) config.params = params

    const result = axios(config)

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          ErrorHandler(error)
          reject(error)
        })
    })
  },
  get(url, params) {
    return this.request('GET', url, params, undefined)
  },
  post(url, data, params) {
    return this.request('POST', url, params, data)
  },
  put(url, data, params) {
    return this.request('PUT', url, params, data)
  },
  remove(url, data, params) {
    return this.request('DELETE', url, params, undefined)
  },
}

export default init
