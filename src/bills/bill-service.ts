import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Bill } from './models/bill'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'

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

const cancelBill = (id: number) => {
  return apiClient.url(`/bills/${id}`).delete().json()
}

export { getBills, cancelBill }
