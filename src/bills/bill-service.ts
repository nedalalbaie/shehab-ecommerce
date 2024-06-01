import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Bill } from './models/bill'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import type { ChangeOrderBody } from '@/orders/models/status'
import type { Product } from '@/products/models/product'
import { alertStore } from '@/core/stores/alert.store'

const getBills = (params: PaginationParams): Promise<List<Bill[]>> => {
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

const cancelBill = (id: number) => {
  return apiClient.url(`/bills/${id}`).delete().json(() => {
    alertStore.show({
      message: 'تم حذف الفاتورة بنجاح',
      type: 'info'
    })
  })
}

const changeBillStatus = (body: ChangeOrderBody) => {
  return apiClient.url(`/chnage-status-bill`).post(body).json(() => {
    alertStore.show({
      message: 'تم تغيير حالة الفاتورة بنجاح',
      type: 'info'
    })
  })
}


export { getBills, getBill, cancelBill, changeBillStatus }
