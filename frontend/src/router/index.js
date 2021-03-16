import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunckName: "Home" */'../views/Home.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunckName: "Signup" */'../views/Signup.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunckName: "User" */'../views/User.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunckName: "Login" */'../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
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