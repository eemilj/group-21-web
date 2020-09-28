import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.prototype.$http = Axios

const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
