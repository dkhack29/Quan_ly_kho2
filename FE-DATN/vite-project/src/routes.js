import { createRouter, createWebHistory } from 'vue-router'

// Import các trang
import Home from './views/Home.vue'
import Profile from './components/Profile.vue'
import Register from './components/Register.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
