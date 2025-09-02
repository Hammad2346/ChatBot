import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import { createRouter, createWebHistory } from 'vue-router'


// example auth check
function isAuthenticated() {
  return !!localStorage.getItem('token')  // or your actual auth logic
}

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login' && isAuthenticated()) {
    // already logged in → redirect away from login
    next({ name: 'home' })
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
    // not logged in but trying to access protected route → go to login
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
