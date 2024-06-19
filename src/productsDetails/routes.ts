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
  },
  {
    path: ':id/edit',
    name: 'edit-product-details',
    component: () => import('./pages/EditProductDetails.vue')
  }
]

export default routes
