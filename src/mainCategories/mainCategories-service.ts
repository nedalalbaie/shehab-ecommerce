import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { MainCategory, PostMainCategoryRequest } from './models/mainCategory'
import type { PaginationParams } from '@/core/models/pagination-params'

const getMainCategories = (params: PaginationParams): Promise<MainCategory[]> => {
  return apiClient.addon(queryString).url('/categories-level-zero').query(params).get().json()
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
  return apiClient.url(`/categories-level-zero/${id}`).delete().json()
}

export { getMainCategories, getMainCategory, addMainCategory, editMainCategory, deleteMainCategory }
