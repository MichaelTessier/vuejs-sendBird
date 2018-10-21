import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import App from '@/App'
import Login from '@/views/Login'
import Home from '@/views/Home'

Vue.use(Router)

const isLogged = (to, from, next) => {
  !store.getters.isLogged ? next('/login') : next()
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'app',
      component: App,
      beforeEnter: isLogged
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      beforeEnter: isLogged
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
