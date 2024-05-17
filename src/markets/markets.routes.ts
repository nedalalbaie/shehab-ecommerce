import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'markets-list',
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
  },
  {
    path: ':id',
    name: 'market-details',
    component: () => import('./pages/MarketDetails.vue')
  }
]

export default routes
