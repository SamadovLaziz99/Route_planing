import Vue from 'vue'
import App from './App'
import i18n from "./locales/i18n";
// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
import { firebaseConfig } from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VueScrollTo from 'vue-scrollto'
import firebase from 'firebase/app'
import 'firebase/auth'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import logo from '@/assets/logos/white.svg'
import YmapPlugin from 'vue-yandex-maps'

// import { getCurrentLanguage } from './utils'
const settings = {
  apiKey: '8fb635ed-f033-4166-8286-a5388bb7d9a9',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}
Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true
});
Vue.use(YmapPlugin, settings)
Vue.prototype.$logo = logo;
Vue.component('v-select', vSelect)
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);

firebase.initializeApp(firebaseConfig);
Vue.config.productionTip = false

export default new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
