import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Activities from './views/Activities.vue'
import Register from './views/Register'
import Account from './views/Account'
import Admin from './views/Admin'

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
      component: Account
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities
    }
  ]
})

/*
Currently for some reason causes issues the following block:

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/', '/activities']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})
*/

export default router
