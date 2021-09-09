import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Legal from '../views/Legal.vue'
import Login from '../views/Login.vue'
import AppDashboard from '../views/AppDashboard.vue'

const MAIN_TITLE = 'Gabarit de démarrage VueDsfr'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mentions-legales',
    name: 'Legal',
    component: Legal,
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: AppDashboard,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const specificTitle = to.meta.title ? `${to.meta.title} - ` : ''
  document.title = `${specificTitle}${MAIN_TITLE}`
})

export default router
