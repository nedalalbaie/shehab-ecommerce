import apiClient from '@/core/helpers/api-client'
import type { Address } from './models/address'
import type { List } from '@/core/models/list'
import type { PaginationParams } from '@/core/models/pagination-params'
import queryString from 'wretch/addons/queryString'

const getAddresses = (params: PaginationParams): Promise<List<Address[]>> => {
  return apiClient
    .addon(queryString)
    .url('/addresses')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      total: 0
    }))
    .json()
}

const getUserAddresses = (userId: number): Promise<Address[]> => {
  return apiClient
    .url(`/addresses/${userId}`)
    .get()
    .notFound(() => ({
      data: [],
      total: 0
    }))
    .json()
}

export { getAddresses, getUserAddresses }
