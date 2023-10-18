import { createRouter, createWebHistory } from 'vue-router'
import { Session } from '../AuthController'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Callback from '../views/callback.vue'
import Erro500 from '../views/500.vue'
import Erro404 from '../views/404.vue'

const router = createRouter({
  base: 'https://appemps.000webhostapp.com/',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }, {
      path: '/login',
      name: 'login',
      component: LoginView
    }, {
      path: '/register',
      name: 'register',
      component: RegisterView
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { middleware: { auth: true } }
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { middleware: { auth: true } }
    }, {
      path: '/callback',
      name: 'callback',
      component: Callback
    }, {
      path: '/500',
      name: '500',
      component: Erro500
    }, {
      path: '/404',
      name: '404',
      component: Erro404
    }, {
      path: '/:pathMatch(.*)*',
      component: Erro404
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
