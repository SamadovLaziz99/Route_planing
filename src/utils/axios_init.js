import axios from 'axios'
// import store from '../store'
// import router from '../router'
const token = localStorage.getItem('token')

// function alert(title, color) {
//   store.dispatch('setNotification', {
//     open: true,
//     text: title,
//     color: color,
//   })
// }

// function Redirect(msg, hooks) {
//   // alert(msg, '#E53935')
//   setTimeout(() => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('user')
//     router.push('/login')
//     // document.location.reload()
//   }, 500)
// }

// function ErrorHandler(error) {
//   if (error.message.startsWith('timeout')) {
//     alert('Time Out. Please check your internet!', '#E53935')
//   }
//   if (error.response) {
//     // debugger
//     const _error = error.response
//     switch (_error.status) {
//       case 400:
//         // alert('Bad request', '#E53935')
//         break
//       case 401:
//         // Redirect('Unauthorized')
//         break
//       case 403:
//         // alert('Forbidden', '#E53935')
//         break
//       case 404:
//         // alert('Not Found', '#E53935')
//         break
//       case 422:
//         // alert('You sent a bad request', '#E53935')
//         break
//       case 500:
//         // alert('Internal Server Error', '#E53935')
//         break
//       default:
//         break
//     }
//   }
// }

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
          // ErrorHandler(error)
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
