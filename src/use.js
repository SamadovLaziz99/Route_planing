import Vue from 'vue'
import Notifications from './components/Common/Notification'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VueScrollTo from 'vue-scrollto'
import BootstrapVue from 'bootstrap-vue'
import vueClipboard from 'vue-clipboard2'

Vue.use(BootstrapVue);
Vue.use(vueClipboard)
Vue.use(Notifications);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueScrollTo);
Vue.use(VueLineClamp, {
  importCss: true
});
vueClipboard.config.autoSetContainer = true

