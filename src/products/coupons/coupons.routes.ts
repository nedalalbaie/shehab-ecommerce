import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '',
        name: 'coupons',
        component: () => import('./pages/CouponsList.vue')
    },
    {
        path: 'add',
        name: 'add-coupon',
        component: () => import('./pages/CreateCoupon.vue')
    },
    {
        path: 'edit/:id',
        name: 'edit-coupon',
        component: () => import('./pages/EditCoupon.vue')
    },
]

export default routes
