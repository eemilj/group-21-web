import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './components/Login.vue'
import Activities from './views/Activities.vue'
import Register from './components/Register'
import Account from './views/Account'
import store from './store.js'

Vue.use(Router)

const router = new Router({
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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
