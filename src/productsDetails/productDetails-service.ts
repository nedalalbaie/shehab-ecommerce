import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { CreateProductDetails, PatchProductDetails, ProductDetails } from './models/productDetails'
import type { PaginationParams } from '@/core/models/pagination-params'
import { alertStore } from '@/core/stores/alert.store'
import type { List } from '@/core/models/list'

const getProductDetails = (params: PaginationParams): Promise<List<ProductDetails[]>> => {
  return apiClient
    .addon(queryString)
    .url('/details')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const getProductDetail = (id: number): Promise<ProductDetails> => {
  return apiClient.url(`/details/${id}`).get().json()
}

const postProductDetails = (body: CreateProductDetails): Promise<ProductDetails> => {
  return apiClient
    .url('/details')
    .post(body)
    .json((res) => {
      alertStore.show({
        message: 'تمت الإضافة  بنجاح',
        type: 'success'
      })
      return res
    })
}

const editProductDetails = (id: number, body: PatchProductDetails): Promise<void> => {
  return apiClient
    .url(`/details/${id}`)
    .post({
      ...body,
      _method: 'patch'
    })
    .json((res) => {
      alertStore.show({
        message: 'تم التعديل بنجاح',
        type: 'success'
      })
      return res
    })
}

// const deleteProduct = (id: number) => {
//   return apiClient.url(`/products/${id}`).delete().json()
// }

export { getProductDetails, getProductDetail, postProductDetails, editProductDetails }
