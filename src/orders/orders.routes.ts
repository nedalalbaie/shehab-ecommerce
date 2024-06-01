import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'orders',
    component: () => import('./pages/OrdersList.vue')
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        name: 'order-details',
        component: () => import('./pages/OrderDetailsView.vue')
      },
      {
        path: 'edit',
        name: 'edit-order',
        component: () => import('./pages/EditOrderDetails.vue')
      }
    ]
  },
  {
    path: 'add',
    name: 'add-order',
    component: () => import('./pages/CreateOrder.vue')
  },
]

export default routes
