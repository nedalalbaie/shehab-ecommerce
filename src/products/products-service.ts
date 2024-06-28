import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { Product, AddProductRequest } from './models/product'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import type { ProductStatusChangeBody } from './models/product-status-body'
import { alertStore } from '@/core/stores/alert.store'
import { axiosApiClient } from '@/core/helpers/axios-configrations'
import { objectToFormData } from '@/core/helpers/objectToFormdata'


const getProducts = (params: PaginationParams): Promise<List<Product[]>> => {
  return apiClient
    .addon(queryString)
    .url('/products')
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

const postProduct = (body: AddProductRequest) => {
  return axiosApiClient.post<{
    date: Product
  }>('/products', objectToFormData(body) , { headers: {
    'Content-Type': 'multipart/form-data', 
  }})
    .then((res) => {
      alertStore.show({
        message: 'تم إضافة المنتج بنجاح',
        type: 'success'
      })
      return res.data
    })
}

const editProduct = (id: number, body: Partial<AddProductRequest>): Promise<Product> => {
  return apiClient
    .addon(formData)
    .url(`/products/${id}`)
    .formData(body)
    .patch()
    .json((res) => {
      alertStore.show({
        message: 'تم تعديل المنتج بنجاح',
        type: 'success'
      })
      return res
    })
}

const deleteProduct = (id: number) => {
  return apiClient.url(`/products/${id}`).delete().json( ()=> {
    alertStore.show({
      message: 'تم حذف المنتج بنجاح',
      type: 'info'
    })
  })
}

const changeStatus = (body: ProductStatusChangeBody): Promise<void> => {
  return apiClient
    .addon(queryString)
    .url('/active-prodcut')
    .query(body)
    .get()
    .json((res) => {
      alertStore.show({
        message: 'تم تغيير حالة المنتج بنجاح',
        type: 'info'
      })
      return res
    })
}

const addProductDiscount = (body: {
  id: number,
  discount_id: number
}): Promise<void> => {
  return apiClient
    .url('/products/add-discount')
    .post(body)
    .json((res) => {
      alertStore.show({
        message: 'تم إضافة التخفيض بنجاح',
        type: 'success'
      })
      return res
    })
}

export { getProducts, getProduct, postProduct, editProduct, deleteProduct, changeStatus, addProductDiscount }
