import Vue from 'vue'
import logo from '@/assets/logos/white.svg'
import { camelize } from "./utils";

Vue.prototype.$logo = logo
Vue.prototype.$ccase = (str) => camelize(str)
Vue.prototype.$lang = localStorage.getItem('currentLanguage')
