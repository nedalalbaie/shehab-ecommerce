import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { CreateProductDetails, ProductDetails } from './models/productDetails'
import type { PaginationParams } from '@/core/models/pagination-params'
import { alertStore } from '@/core/stores/alert.store'

const getProductDetails = (params: PaginationParams): Promise<ProductDetails[]> => {
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

// const editProduct = (id: number, body: Partial<AddProductRequest>): Promise<Product> => {
//   return apiClient
//     .addon(formData)
//     .url(`/products/${id}`)
//     .formData(body)
//     .patch()
//     .json((res) => {
//       return res
//     })
// }

// const deleteProduct = (id: number) => {
//   return apiClient.url(`/products/${id}`).delete().json()
// }

export { getProductDetails, postProductDetails }
