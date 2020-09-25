import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Activities from './views/Activities.vue'
import Admin from './views/Admin.vue'
import Account from './views/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})
