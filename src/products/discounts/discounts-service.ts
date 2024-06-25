import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Discount, DiscountFormRequest } from './models/discount'
import type { PaginationParams } from '@/core/models/pagination-params'
import { alertStore } from '@/core/stores/alert.store'

const getDiscounts = (params: PaginationParams): Promise<Discount[]> => {
  return apiClient
    .addon(queryString)
    .url('/discounts')
    .query(params)
    .get()
    .notFound(() => ({
      data: []
    }))
    .json()
}

const getDiscount = (id: number): Promise<Discount> => {
  return apiClient.url(`/discounts/${id}`).get().json()
}

const postDiscount = (body: DiscountFormRequest): Promise<Discount> => {
  return apiClient
    .url('/discounts')
    .post(body)
    .json((res) => {
      alertStore.show({
        message: 'تم إضافة التخفيض بنجاح',
        type: 'success'
      })
      return res
    })
}

const editDiscount = (id: number, body: Partial<DiscountFormRequest>): Promise<Discount> => {
  return apiClient
    .url(`/discounts/${id}`)
    .put(body)
    .json((res) => {
      return res
    })
}

const deleteDiscount = (id: number) => {
  return apiClient.url(`/discounts/${id}`).delete().json(() => {
    alertStore.show({
      message: 'تم حذف التخفيض بنجاح',
      type: 'info'
    })
  })
}

export { getDiscounts, getDiscount, postDiscount, editDiscount, deleteDiscount }
