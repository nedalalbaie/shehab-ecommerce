import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/core/components/MainLayout.vue'
import LoginPage from '@/auth/pages/LoginPage.vue'
import authStore from '@/core/stores/auth.store'
import categoriesRoutes from '@/categories/categories.routes'
import productsRoutes from '@/products/products.routes'
import couponsRoutes from '@/products/coupons/coupons.routes'
import discountsRoutes from '@/products/discounts/discounts.routes'
import ordersRoutes from '@/orders/orders.routes'
import adsRoutes from '@/ads/ads.routes'
import customersRoutes from '@/customers/customer.routes'
import billsRoutes from '@/bills/bills.routes'
import marketsRoutes from '@/markets/markets.routes'
import productsDetailsRoutes from '@/productsDetails/routes'
import addressesRoutes from '@/addresses/routes'
import installmentsRoutes from '@/installments/routes'
import AppDashboard from '../statistics/AppDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: AppDashboard
        },
        {
          path: 'markets',
          children: marketsRoutes
        },
        {
          path: 'products',
          children: productsRoutes
        },
        {
          path: 'productsDetails',
          children: productsDetailsRoutes
        },
        {
          path: 'categories',
          children: categoriesRoutes
        },
        {
          path: 'orders',
          children: ordersRoutes
        },
        {
          path: 'ads',
          children: adsRoutes
        },
        {
          path: 'customers',
          children: customersRoutes
        },
        {
          path: 'addresses',
          children: addressesRoutes
        },
        {
          path: 'coupons',
          children: couponsRoutes
        },
        {
          path: 'bills',
          children: billsRoutes
        },
        {
          path: 'discounts',
          children: discountsRoutes
        },
        {
          path: 'installments',
          children: installmentsRoutes
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to) => {
  const auth = authStore.auth

  if (to.name !== 'login' && !auth) {
    return { name: 'login' }
  }

  if (to.name === 'login' && auth) {
    return '/'
  }
})

export default router
