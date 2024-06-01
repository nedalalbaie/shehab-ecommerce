import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'customers',
    component: () => import('./pages/CustomersList.vue')
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        name: 'view-customer',
        component: () => import('./pages/ViewCustomer.vue')
      },
      {
        path: 'edit',
        name: 'edit-customer',
        component: () => import('./pages/EditCustomer.vue')
      }
    ]
  }
]

export default routes
