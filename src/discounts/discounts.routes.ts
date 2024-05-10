import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'discounts',
        component: () => import('./pages/DiscountsList.vue')
    },
    {
        path: 'add',
        name: 'add-discount',
        component: () => import('./pages/CreateDiscount.vue')
    },
    {
        path: 'edit/:id',
        name: 'edit-discount',
        component: () => import('./pages/EditDiscount.vue')
    },
]

export default routes
