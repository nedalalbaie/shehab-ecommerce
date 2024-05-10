import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Customer, CustomerFormRequest } from './models/customer'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'

const getCustomers = (params: PaginationParams): Promise<List<Customer[]>> => {
  return apiClient
    .addon(queryString)
    .url('/customers')
    .query(params)
    .get()
    .notFound(() => ({
      data: []
    }))
    .json()
}

const getCustomer = (id: number): Promise<Customer> => {
  return apiClient.url(`/customers/${id}`).get().json()
}

const editCustomer = (id: number, body: Partial<CustomerFormRequest>): Promise<Customer> => {
  return apiClient
    .url(`/customers/${id}`)
    .put(body)
    .json((res) => {
      return res
    })
}

export { getCustomers, getCustomer, editCustomer }
