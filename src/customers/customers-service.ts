import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Customer, CustomerFormRequest } from './models/customer'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import type { CustomerStatusChangeBody } from './models/customer-status-body'
import { alertStore } from '@/core/stores/alert.store'

const getCustomers = (params: PaginationParams, search_value: string): Promise<List<Customer[]>> => {
  let url = ''
  if (search_value) {
    url = `/search-customer/${search_value}`
  } else {
    url = '/customers'
  }
  return apiClient
    .addon(queryString)
    .url(url)
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

const changeStatus = (body: CustomerStatusChangeBody): Promise<void> => {
  return apiClient
    .url('/customer-active')
    .post(body)
    .json((res) => {
      alertStore.show({
        message: 'تم تغيير حالة الزبون بنجاح',
        type: 'info'
      })
      return res
    })
}

export { getCustomers, getCustomer, editCustomer, changeStatus }
