import apiClient from '@/core/helpers/api-client'
import formData from 'wretch/addons/formData'
import type { Ad, PostOrPatchAdRequest } from './models/ads'
import type { List } from '@/core/models/list'
import { alertStore } from '@/core/stores/alert.store'

const getAds = (show : 1 | 0): Promise<List<Ad[]>> => {
  // let url = ''
  // if (show !== undefined) {
  //   url = `/search-ad-show/${show}`
  // } else {
  //   url = '/ads'
  // }

  return apiClient
    .url(`/search-ad-show/${show}`)
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
      alertStore.show({
        message: 'تم إضافة الإعلان بنجاح',
        type: 'success'
      })
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
      alertStore.show({
        message: 'تم تحديث الإعلان بنجاح',
        type: 'success'
      })
      return res
    })
}

const deleteAd = (id: number) => {
  return apiClient
    .url(`/ads/${id}`)
    .delete()
    .json(() => {
      alertStore.show({
        message: 'تم حذف الإعلان بنجاح',
        type: 'info'
      })
    })
}

export { getAds, getAd, postAd, patchAd, deleteAd }
