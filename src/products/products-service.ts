import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { Product, AddProductRequest } from './models/product'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'

const getProducts = (params: PaginationParams): Promise<List<Product[]>> => {
  return apiClient
    .addon(queryString)
    .url('/show-all-prodcuts')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const getProduct = (id: number): Promise<Omit<Product , "sub_category_id"> & {category_id: number}> => {
  return apiClient.url(`/products/${id}`).get().json()
}

const postProduct = (body: AddProductRequest): Promise<Product> => {
  return apiClient
    .addon(formData)
    .url('/products')
    .formData(body)
    .post()
    .json((res) => {
      return res
    })
}

const editProduct = (id: number, body: Partial<AddProductRequest>): Promise<Product> => {
  return apiClient
    .addon(formData)
    .url(`/products/${id}`)
    .formData(body)
    .patch()
    .json((res) => {
      return res
    })
}

const deleteProduct = (id: number) => {
  return apiClient.url(`/products/${id}`).delete().json()
}

export { getProducts, getProduct, postProduct, editProduct, deleteProduct }
