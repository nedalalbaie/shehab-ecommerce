import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'installments',
    component: () => import('./pages/InstallmentsList.vue')     
  },
  {
    path: 'add',
    name: 'add-installment',
    component: () => import('./pages/CreateInstallment.vue')
  },
]

export default routes
