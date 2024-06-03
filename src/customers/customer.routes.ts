import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'customers',
    component: () => import('./pages/CustomersList.vue')
  },
  {
    path: ':customerId',
    children: [
      {
        path: '',
        name: 'view-customer',
        component: () => import('./pages/ViewCustomer.vue')
      },
      {
        path: 'bills',
        name: 'view-customer-bills',
        component: () => import('./pages/ViewCustomerBills.vue')
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            name: 'view-customer-orders',
            component: () => import('./pages/ViewCustomerOrders.vue')
          },
          {
            path: ':orderId',
            children: [
              {
                path: '',
                name: 'view-customer-order',
                component: () => import('./pages/ViewCustomerOrder.vue')
              },
              {
                path: 'edit',
                name: 'edit-customer-order',
                component: () => import('./pages/EditCustomerOrder.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'edit',
        name: 'edit-customer',
        component: () => import('./pages/EditCustomer.vue')
      }
    ]
  }
]

export default routes
