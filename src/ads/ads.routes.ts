import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'ads',
    component: () => import('./pages/AdsList.vue')
  },
  {
    path: 'add',
    name: 'add-ad',
    component: () => import('./pages/CreateAd.vue')
  },
  {
    path: 'edit/:id',
    name: 'edit-ad',
    component: () => import('./pages/EditAd.vue')
  }
]

export default routes
