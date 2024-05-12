import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import type { Market, MarketFormRequest } from './models/market'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import formData from 'wretch/addons/formData'

const getMarkets = (params: PaginationParams): Promise<List<Market[]>> => {
  return apiClient
    .addon(queryString)
    .url('/markets')
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

const postMarket = (body: MarketFormRequest): Promise<Market> => {
  return apiClient
    .addon(formData)
    .url('/markets')
    .formData(body)
    .post()
    .json((res) => {
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
      return res
    })
}

const deleteMarket = (id: number) => {
  return apiClient.url(`/markets/${id}`).delete().json()
}

export { getMarkets, getMarket, postMarket, editMarket, deleteMarket }
