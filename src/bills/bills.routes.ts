import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'bills',
    component: () => import('./pages/BillList.vue')
  }
]

export default routes
