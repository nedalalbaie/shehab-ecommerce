import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/core/components/MainLayout.vue'
import LoginPage from '@/auth/pages/LoginPage.vue'
import authStore from '@/core/stores/auth.store'
import productsRoutes from '@/products/products.routes'
import categoriesRoutes from '@/categories/categories.routes'
import ordersRoutes from '@/orders/orders.routes'
import adsRoutes from '@/ads/ads.routes'
import customersRoutes from "@/customers/customer.routes"
import couponsRoutes from '@/coupons/coupons.routes'
import discountsRoutes from '@/discounts/discounts.routes'
import subCategoriesRoutes from '@/subCategories/subCategories.routes'
import billsRoutes from '@/bills/bills.routes'
import marketsRoutes from '@/markets/markets.routes'
import mainCategoriesRoutes from '@/mainCategories/routes'

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
      redirect: '/products',
      children: [
        {
          path: 'markets',
          children: marketsRoutes
        },
        {
          path: 'products',
          children: productsRoutes
        },
        {
          path: 'categories',
          children: categoriesRoutes
        },
        {
          path: 'mainCategories',
          children: mainCategoriesRoutes
        },
        {
          path: 'subCategories',
          children: subCategoriesRoutes
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
