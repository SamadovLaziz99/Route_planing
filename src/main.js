import Vue from 'vue'
import App from './App'
import i18n from "./locales/i18n";
import router from './router'
import store from './store'
// import { firebaseConfig } from './constants/config'
// import firebase from 'firebase/app'
import 'firebase/auth'
import './use'
import './globals'
import './components'
import './maps/yandex'
import './utils/socket'
// firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false


// if (process.env.VUE_APP_NAME === 'coozin_admin_production') {
//   console.log("%cThis project is production mode!!!", "color:green; font-size: 18px");
//   window.console.log = function () {  }
// } else {
//   console.log("%cThis project is development mode!!!", "color:red; font-size: 18px");
// }

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
