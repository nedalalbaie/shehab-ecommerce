import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'categories',
    component: () => import('./pages/CategoriesList.vue')
  },
  {
    path: 'add',
    name: 'add-main-category',
    component: () => import('./pages/CreateMainCategory.vue')
  },
  {
    path: ':id/edit',
    name: 'edit-mainCategory',
    component: () => import('./pages/EditMainCategory.vue')
  }
]

export default routes
