import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Market, MarketFormRequest } from './models/market'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import formData from 'wretch/addons/formData'
import { alertStore } from '@/core/stores/alert.store'
import type { MarketStatusChangeBody } from './models/market-status-body'
import type { MarketProducts } from './models/market-product'

const getMarkets = (params: PaginationParams, search_value: string): Promise<List<Market[]>> => {
  let url = ''
  if (search_value) {
    url = `/search-market/${search_value}`
  } else {
    url = '/markets'
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

const getMarket = (id: number): Promise<Market> => {
  return apiClient.url(`/markets/${id}`).get().json()
}

const getMarketProducts = (id: number): Promise<MarketProducts[]> => {
  return apiClient
    .url(`/show-items-details/${id}`)
    .get()
    .notFound(() => ({
      data: []
    }))
    .json()
}

const postMarket = (body: MarketFormRequest): Promise<Market> => {
  return apiClient
    .addon(formData)
    .url('/markets')
    .formData(body)
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم إضافة المحل بنجاح',
        type: 'success'
      })
      return res
    })
}

const editMarket = (id: number, body: Partial<MarketFormRequest>): Promise<Market> => {
  return apiClient
    .addon(formData)
    .url(`/markets/${id}`)
    .formData({
      ...body,
      _method: 'put'
    })
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم تعديل المحل بنجاح',
        type: 'success'
      })
      return res
    })
}

const deleteMarket = (id: number) => {
  return apiClient
    .url(`/markets/${id}`)
    .delete()
    .json(() => {
      alertStore.show({
        message: 'تم حذف المحل بنجاح',
        type: 'info'
      })
    })
}

const changeStatus = (body: MarketStatusChangeBody): Promise<void> => {
  return apiClient
    .url('/market-active')
    .post(body)
    .json((res) => {
      alertStore.show({
        message: 'تم تغيير حالة المحل بنجاح',
        type: 'info'
      })
      return res
    })
}

export { getMarkets, getMarket, postMarket, editMarket, deleteMarket, changeStatus, getMarketProducts }
