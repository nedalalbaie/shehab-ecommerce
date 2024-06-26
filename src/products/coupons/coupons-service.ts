import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Coupon, CouponFormRequest } from './models/coupon'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import formData from 'wretch/addons/formData'
import { alertStore } from '@/core/stores/alert.store'
import { axiosApiClient } from '@/core/helpers/axios-configrations'

const getCoupons = (params: PaginationParams): Promise<List<Coupon[]>> => {
  return apiClient
    .addon(queryString)
    .url('/coupons')
    .query(params)
    .get()
    .notFound(() => ({
      data: []
    }))
    .json()
}

const getCoupon = (id: number): Promise<Coupon> => {
  return apiClient.url(`/coupons/${id}`).get().json()
}

const postCoupon = (body: CouponFormRequest) => {
  return axiosApiClient
    .post<Coupon>('/coupons', body)
    .then((res) => {
      alertStore.show({
        message: 'تم إضافة الكوبون بنجاح',
        type: 'success'
      })
      return res
    })
}

const editCoupon = (id: number, body: Partial<CouponFormRequest>): Promise<Coupon> => {
  return apiClient
    .addon(formData)
    .url(`/coupons/${id}`)
    .formData({
      ...body,
      _method: 'put'
    })
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم تعديل الكوبون بنجاح',
        type: 'info'
      })
      return res
    })
}

const deleteCoupon = (id: number) => {
  return apiClient.url(`/coupons/${id}`).delete().json()
}

export { getCoupons, getCoupon, postCoupon, editCoupon, deleteCoupon }
