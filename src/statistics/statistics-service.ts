import apiClient from '@/core/helpers/api-client'
import type { Statistics } from './models/statistics'

const getStatistics = (): Promise<Statistics> => {
  return new Promise(resolve => {
   resolve({
    items_stored: 12,
    profits: 22,
    sales_all_month:11,
    sales_all_week: 34,
    sales_today: 35,
    sales_yesterday: 56,
    total_customers: 22,
    total_order_canceled: 4,
    total_order_confirmed: 44,
    total_order_pinding: 33,
    total_order_shipping: 22,
    total_orders: 10,
    total_products: 55,
    total_quantity: 250,
    total_sales: 36,
    total_store_value: 450
   })
  })
  // return apiClient
  //   .url('/show-statistic')
  //   .get()
  //   .notFound(() => ({
  //     data: [],
  //     totalRecords: 0
  //   }))
  //   .json()
}

export { getStatistics }
