import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { MainCategory, PostMainCategoryRequest } from './models/mainCategory'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import { alertStore } from '@/core/stores/alert.store'

const getMainCategories = (params: PaginationParams, search_value?: string): Promise<List<MainCategory[]>> => {
  let url = ""
  if (search_value) {
     url = `/search-level-zero/${search_value}`
  } else {
    url = '/categories-level-zero'
  }
  return apiClient.addon(queryString).url(url).query(params).get().json()
}

const getMainCategory = (id: number): Promise<MainCategory> => {
  return apiClient.url(`/categories-level-zero/${id}`).get().json()
}

const addMainCategory = (body: PostMainCategoryRequest): Promise<MainCategory> => {
  return apiClient
    .addon(formData)
    .url('/categories-level-zero')
    .formData(body)
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم إضافة التصنيف بنجاح',
        type: 'success'
      })
      return res
    })
}

const editMainCategory = (id: number, body: PostMainCategoryRequest): Promise<MainCategory> => {
  return apiClient
    .addon(formData)
    .url(`/categories-level-zero/${id}`)
    .formData({
      ...body,
      _method: 'put'
    })
    .post()
    .json((res) => {
      return res
    })
}

const deleteMainCategory = (id: number) => {
  return apiClient
    .url(`/categories-level-zero/${id}`)
    .delete()
    .json(() => {
      alertStore.show({
        message: 'تم حذف التصنيف بنجاح',
        type: 'info'
      })
    })
}

export { getMainCategories, getMainCategory, addMainCategory, editMainCategory, deleteMainCategory }
