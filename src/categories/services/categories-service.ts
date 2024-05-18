import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { AddCategoryRequest, Category, EditCategoryRequest } from '../models/Category'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import { alertStore } from '@/core/stores/alert.store'

const getCategories = (params: PaginationParams): Promise<List<Category[]>> => {
  return apiClient
    .addon(queryString)
    .url('/categories')
    .query(params)
    .get()
    .json()
}

const getCategory = (id: number): Promise<Category> => {
  return apiClient.url(`/categories/${id}`).get().json()
}

const addCategory = (body: AddCategoryRequest): Promise<Category> => {
  return apiClient
    .addon(formData)
    .url('/categories')
    .formData(body)
    .post()
    .json((res) => {
      alertStore.show({
        message: "تم إضافة التصنيف بنجاح",
        type: 'success'
      })
      return res
    })
}

const editCategory = (id: number, body: EditCategoryRequest): Promise<Category> => {
  return apiClient
    .addon(formData)
    .url(`/categories/${id}`)
    .formData({
      ...body,
      _method: "put"
    })
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم تعديل التصنيف بنجاح',
        type: 'success'
      })
      return res
    })
}

const deleteCategory = (id: number) => {
  return apiClient.url(`/categories/${id}`).delete().json(() => {
    alertStore.show({
      message: 'تم حذف التصنيف بنجاح',
      type: 'info'
    })
  })
}

export { getCategories, getCategory, addCategory, editCategory, deleteCategory }
