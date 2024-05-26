import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'addresses-list',
    component: () => import('./pages/AddressesList.vue')
  }
]

export default routes
