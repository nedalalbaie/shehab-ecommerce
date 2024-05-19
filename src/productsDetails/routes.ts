import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'products-details-list',
    component: () => import('./pages/ProductsDetailsList.vue')
  },
  {
    path: 'add',
    name: 'add-products-details',
    component: () => import('./pages/CreateProductDetails.vue')
  }
]

export default routes
