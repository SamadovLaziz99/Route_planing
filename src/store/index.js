import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import chat from './modules/chat'
import todo from './modules/todo'
import survey from './modules/survey'
import alert from "./modules/alert";
import auth from "./modules/auth";
import { setCurrentLanguage } from '../utils'
import crud from "./crud/crud";
import modals from "./modules/modals";
import upload from "./modules/upload";
import socket from "./modules/socket";
import location from "./modules/location";
import universal from "./modules/universal";
import yandex from "./modules/yandex";
import statistics from "./modules/statistics";
import order_services from "./modules/order_services";
import voucher from "./modules/voucher";
import reports from "./modules/reports";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    changeLang (state, payload) {
      app.$i18n.locale = payload
      setCurrentLanguage(payload);
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    universal,
    user,
    chat,
    todo,
    survey,
    alert,
    auth,
    modals,
    upload,
    socket,
    location,
    yandex,
    statistics,
    order_services,
    voucher,
    reports,
    categories: crud('categories'),
    foods: crud('food'),
    units: crud('units'),
    collections: crud('collections'),
    vendors: crud('vendors'),
    users: crud('users'),
    system_users: crud('user'),
    videos: crud('videos'),
    couriers: crud('couriers'),
    orders: crud('orders'),
    transactions: crud('transactions'),
    applications: crud('applications'),
    vouchers: crud('vouchers'),
    inventory: crud('inventory'),
    vendorinv: crud('inventory/vendorinv'),
    cards: crud('cards')
  }
})
