import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'orders',
    component: () => import('./pages/OrdersList.vue')
  },
  {
    path: ':id',
    name: 'order-details',
    component: () => import('./pages/OrderDetailsView.vue')
  },
  {
    path: 'add',
    name: 'add-order',
    component: () => import('./pages/CreateOrder.vue')
  },
  {
    path: 'edit/:id',
    name: 'edit-order',
    component: () => import('./pages/EditOrderDetails.vue')
  },
]

export default routes
