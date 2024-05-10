import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'subCategories',
    component: () => import('./pages/SubCategoriesList.vue')
  },
  {
    path: 'add',
    name: 'add-subCategories',
    component: () => import('./pages/CreateSubCategory.vue')
  },
  {
    path: 'edit/:id',
    name: 'edit-subCategories',
    component: () => import('./pages/EditSubCategory.vue')
  }
]

export default routes
