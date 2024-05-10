import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Order, PostOrderRequest, PatchOrderRequest } from './models/order'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import type { OrderDetails } from './models/order-details'

const getOrders = (params: PaginationParams): Promise<List<Order[]>> => {
  return apiClient
    .addon(queryString)
    .url('/orders')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const getOrder = (id: number): Promise<OrderDetails> => {
  return apiClient.addon(queryString).url(`/get-item-details`).query({ id: id }).get().json()
}

const postOrder = (body: PostOrderRequest): Promise<Order> => {
  return apiClient
    .url('/orders')
    .post(body)
    .json((res) => {
      return res
    })
}

const patchOrder = (id: number, body: Partial<PatchOrderRequest>): Promise<Order> => {
  return apiClient
    .url(`/orders/${id}`)
    .patch(body)
    .json((res) => {
      return res
    })
}

const cancelOrder = (id: number) => {
  return apiClient.url(`/orders/${id}`).delete().json()
}

export { getOrders, getOrder, postOrder, patchOrder, cancelOrder }
