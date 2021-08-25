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
    user,
    chat,
    todo,
    survey,
    alert,
    auth
  }
})
