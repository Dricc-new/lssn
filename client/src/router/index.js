import { createRouter, createWebHistory } from 'vue-router'
import { Session } from '../AuthController'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../views/HomeView.vue')
    }, {
      path: '/login',
      name: 'login',
      component: import('../views/LoginView.vue')
    }, {
      path: '/register',
      name: 'register',
      component: import('../views/RegisterView.vue')
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: import('../views/Dashboard.vue'),
      meta: { middleware: { auth: true } }
    }, {
      path: '/profile',
      name: 'profile',
      component: import('../views/Profile.vue'),
      meta: { middleware: { auth: true } }
    }, {
      path: '/callback',
      name: 'callback',
      component: import('../views/callback.vue')
    }, {
      path: '/500',
      name: '500',
      component: import('../views/500.vue')
    }, {
      path: '/404',
      name: '404',
      component: import('../views/404.vue')
    }, {
      path: '/:pathMatch(.*)*',
      component: import('../views/404.vue')
    }
  ]
})

// Middleware
router.beforeEach(async (to, from) => {
  if (!Session.isAuthenticated() && to.meta.middleware?.auth) {
    return { name: 'login' }
  } else if (Session.isAuthenticated() && ((to.name == 'login' || to.name == 'register'))) {
    return { name: 'home' }
  }
})

export default router
