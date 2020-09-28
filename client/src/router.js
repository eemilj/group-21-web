import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Activities from './views/Activities.vue'
import ViewGroup from './views/ViewGroup'
import Groups from './views/Groups'

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
      path: '/groups/:id',
      name: 'group',
      component: ViewGroup
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups
    }
  ]
})
