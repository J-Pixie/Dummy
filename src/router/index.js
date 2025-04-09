// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../components/Register.vue'
import Login from '../components/login.vue' 
import Home from '../components/home.vue'

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home', component: Home},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
