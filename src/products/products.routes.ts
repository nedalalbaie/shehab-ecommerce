import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'products',
    component: () => import('./pages/ProductsList.vue')     
  },
  {
    path: 'add',
    name: 'add-product',
    component: () => import('./pages/CreateProduct.vue')
  },
  {
    path: 'edit/:id',
    name: 'edit-product',
    component: () => import('./pages/EditProducts.vue')
  },
]

export default routes
