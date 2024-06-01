import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'bills',
    component: () => import('./pages/BillList.vue')
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        name: 'view-bill',
        component: () => import('./pages/ViewBill.vue')
      }
    ]
  },
]

export default routes
