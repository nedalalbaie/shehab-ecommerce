import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'products',
    component: () => import('./pages/productsList.vue')     
  },
  {
    path: 'add',
    name: 'add-product',
    component: () => import('./pages/CreateProduct.vue')
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        name: 'product-details',
        component: () => import('./pages/ProductDetails.vue')
      },
      {
        path: 'edit',
        name: 'edit-product',
        component: () => import('./pages/EditProducts.vue')
      },
    ]
  }
  
]

export default routes
