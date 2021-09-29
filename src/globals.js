import Vue from 'vue'
import logo from '@/assets/logos/white.svg'
import { camelize, imageProxy } from "./utils";
import upload from "./utils/upload";

Vue.prototype.$logo = logo
Vue.prototype.$imgProxy = imageProxy
Vue.prototype.$ccase = (str) => camelize(str)
// Vue.prototype.$imgUploader = upload
Vue.prototype.$lang = localStorage.getItem('currentLanguage') || 'ru'
Vue.prototype.$perPage = 15
