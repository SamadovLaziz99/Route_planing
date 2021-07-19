import VueNotify from './Notify.vue'
// let starter;
export default {
  starter: null,
  install (Vue, options = {}) {
    let Constr = Vue.extend(VueNotify)
    let Notify = new  Constr()
    Notify.options = Object.assign(Notify.options, options)
    let vm = Notify.$mount()
    document.querySelector('body').appendChild(vm.$el)
    Vue.$notify = Vue.prototype.$notify = (type = 'success', title, message, options = {}) => {
      Notify.addItem(type, title, message, options)
      // starter = () => Notify.addItem(type, title, message, options)
    }
    this.starter = (type = 'success', title, message, options = {}) => {
      Notify.addItem(type, title, message, options)
    }
  }
}
