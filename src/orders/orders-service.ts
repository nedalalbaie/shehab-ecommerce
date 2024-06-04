import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Order, PatchOrderRequest } from './models/order'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import type { OrderDetails } from './models/order-details'
import type { ChangeOrderBody } from './models/status'
import { alertStore } from '@/core/stores/alert.store'

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

const getOrderByCustomerId = (customerId: number): Promise<Order []> => {
  return apiClient.url(`/show-all-orders/${customerId}`).get().json()
}

const patchOrder = (id: number, body: PatchOrderRequest): Promise<Order> => {
  return apiClient
    .url(`/orders/${id}`)
    .post({
      ...body,
      _method: 'put'
    })
    .json((res) => {
      alertStore.show({
        message: 'تم تعديل الطلب بنجاح',
        type: 'success'
      })
      return res
    })
}

const cancelOrder = (id: number) => {
  return apiClient.url(`/orders/${id}`).delete().json(() => {
    alertStore.show({
      message: 'تم حذف الطلب بنجاح',
      type: 'info'
    })
  })
}

const changeOrderStatus = (body: ChangeOrderBody) => {
  return apiClient.url(`/chnage-order-status`).post(body).json(() => {
    alertStore.show({
      message: 'تم تغيير حالة الطلب بنجاح',
      type: 'info'
    })
  })
}

export { getOrders, getOrder, getOrderByCustomerId, patchOrder, cancelOrder, changeOrderStatus }
