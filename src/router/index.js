import Home from '@/components/home.vue'
import Login from '@/components/login.vue'
import { createRouter, createWebHistory } from 'vue-router'


function isAuthenticated() {
  return !!localStorage.getItem('token')  
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
    
    next({ name: 'home' })
  } else if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
