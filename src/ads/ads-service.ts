import apiClient from '@/core/helpers/api-client'
import formData from 'wretch/addons/formData'
import type { Ad, PostOrPatchAdRequest } from './models/ads'
import type { List } from '@/core/models/list'

const getAds = (): Promise<List<Ad[]>> => {
  return apiClient
    .url('/ads')
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const getAd = (id: number): Promise<Ad> => {
  return apiClient.url(`/ads/${id}`).get().json()
}

const postAd = (body: PostOrPatchAdRequest): Promise<Ad> => {
  return apiClient
    .addon(formData)
    .url('/ads')
    .formData(body)
    .post()
    .json((res) => {
      return res
    })
}

const patchAd = (id: number, body: Partial<PostOrPatchAdRequest>): Promise<Ad> => {
  return apiClient
    .addon(formData)
    .url(`/ads/${id}`)
    .formData({
      ...body,
      _method: 'put'
    })
    .post()
    .json((res) => {
      return res
    })
}

const deleteAd = (id: number) => {
  return apiClient.url(`/ads/${id}`).delete().json()
}

export { getAds, getAd, postAd, patchAd, deleteAd }
