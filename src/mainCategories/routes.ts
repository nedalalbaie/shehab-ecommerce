import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'main-categories',
    component: () => import('./pages/MainCategoriesList.vue')
  },
  {
    path: 'add',
    name: 'add-main-category',
    component: () => import('./pages/CreateMainCategory.vue')
  }
]

export default routes
