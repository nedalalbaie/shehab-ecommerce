import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'markets',
    component: () => import('./pages/MarketsList.vue')
  },
  {
    path: 'add',
    name: 'add-market',
    component: () => import('./pages/CreateMarket.vue')
  },
  {
    path: 'edit/:id',
    name: 'edit-market',
    component: () => import('./pages/EditMarket.vue')
  }
]

export default routes
