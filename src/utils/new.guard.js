import { isAuthGuardActive } from '../constants/config'
import { whiteList } from "../constants/config";
import store from '../store'

// const token = localStorage.getItem('token') ? localStorage.getItem('token') : store.getters.token
// let token = localStorage.getItem('token') || store.getters.token
export default (to, from, next) => {
  // console.log(token)
  // console.log(store.getters.token)
  if (isAuthGuardActive) {
    if (localStorage.getItem('token') || store.getters.token) {
      if (whiteList.includes(to.name)) {
        next('/app')
      } else next()
      // if (to.path === '/user/login') {
      //   next()
      // }
    } else {
      if (whiteList.includes(to.name)) {
        next()
      } else next({ name: 'login' })
    }
  } else next()
}
