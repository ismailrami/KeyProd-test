import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import Tracking from '../components/Tracking.vue'
import ProductDetail from '../components/ProductDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: Tracking
  },
 { 
    path: '/product/:orderId',
    name: 'Product',
    component: ProductDetail
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
