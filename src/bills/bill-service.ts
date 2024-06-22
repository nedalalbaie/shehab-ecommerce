import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Bill } from './models/bill'
import type { List } from '@/core/models/list'
import type { Product } from '@/products/models/product'
import { alertStore } from '@/core/stores/alert.store'
import type { ChangeBillStatusBody } from './models/change-bill-status-body'
import type { BillsPaginationParamas } from './models/bills-pagination-params'

const getBills = (params: BillsPaginationParamas): Promise<List<Bill[]>> => {
  return apiClient
    .addon(queryString)
    .url('/bills')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const getBill = (id: number): Promise<{
  result: Bill,
  prodcts: Product []
}> => {
  return apiClient.url(`/bills/${id}`).get().json()
}

const getBillByCustomerId = (customerId: number): Promise<Bill []> => {
  return apiClient.url(`/show-all--my-bills/${customerId}`).get().json()
}

const postBill = (orderNumber: string) : Promise<void> => {
   return apiClient.url('/bills').post({order_number: orderNumber}).json((res) => {
    alertStore.show({
      message: 'تم إنشاء فاتورة بنجاح',
      type: 'success'
    })
    return res
  })
}

// const cancelBill = (id: number) => {
//   return apiClient.url(`/bills/${id}`).delete().json(() => {
//     alertStore.show({
//       message: 'تم إلغاء الفاتورة بنجاح',
//       type: 'info'
//     })
//   })
// }

const changeBillStatus = (body: ChangeBillStatusBody) => {
  return apiClient.url(`/change-status-bill`).post(body).json(() => {
    alertStore.show({
      message: 'تم إلغاء الفاتورة بنجاح',
      type: 'info'
    })
  })
}

export { getBills, getBill, getBillByCustomerId, changeBillStatus, postBill }
