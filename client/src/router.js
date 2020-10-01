import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Activities from './views/Activities.vue'
import Register from './views/Register'
import Admin from './views/Admin.vue'
import Account from './views/Account.vue'
import ViewGroup from './views/ViewGroup'
import Groups from './views/Groups'

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
      path: '/activities',
      name: 'activities',
      component: Activities
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
      path: '/groups/:id',
      name: 'group',
      component: ViewGroup
    },
    {
      path: '/activities/:id/groups',
      name: 'groups',
      component: Groups
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
