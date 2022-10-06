import axios from 'axios';
import store from '../store';
import router from "../router";
import i18n from '../locales/i18n';

function unauthorized(msg) {
  errorNotification(i18n.t('unauthorized.title'), '')
  store.dispatch('signOut').then(res => {
    router.push({ name: 'login' })
  })
}

function errorNotification (title, msg) {
  store.dispatch('error_alert', {
    title: title,
    message: msg
  })
}

function ErrorHandler(error) {
  if (error.message.startsWith('timeout')) {
    errorNotification(i18n.t('errors.timeout'))
  }
  if (error.response) {
    const _error = error.response.data
    switch (error.response.status) {
      case 400:
        errorNotification(i18n.t('errors.bad_request'), _error)
        break
      case 401:
        unauthorized(_error)
        break
      case 403:
        errorNotification(i18n.t('errors.forbidden'), _error.message)
        break
      case 404:
        errorNotification(i18n.t('errors.not_found'), _error.message)
        break
      case 422:
        errorNotification(i18n.t('errors.unprocessable_entity'), _error.message)
        break
      case 500:
        errorNotification(i18n.t('errors.internal_server_error'), _error.message)
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
      timeout: 120000,
      url: url,
      method: method,
      onUploadProgress: function (e) {
        let percent = Math.round((e.loaded * 100) / e.total);
        store.dispatch('uploadingAction', {
          show: true,
          percent: percent
        });
      },
    }
    if (localStorage.getItem('token')) {
      config.headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }
    if (data) config.data = data;

    if (params) config.params = params;

    const result = axios(config);

    return new Promise((resolve, reject) => {
      result
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          ErrorHandler(error);
          reject(error);
        })
    })
  },
  get(url, params) {
    return this.request('GET', url, params, undefined);
  },
  post(url, data, params) {
    return this.request('POST', url, params, data);
  },
  patch(url, data, params) {
    return this.request('PATCH', url, params, data);
  },
  put(url, data, params) {
    return this.request('PUT', url, params, data);
  },
  remove(url, params) {
    return this.request('DELETE', url, params, undefined);
  },
}

export default init;
