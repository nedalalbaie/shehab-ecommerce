import apiClient from '@/core/helpers/api-client'
import type { Ad, PostOrPatchAdRequest } from './models/ads'
import type { List } from '@/core/models/list'
import { alertStore } from '@/core/stores/alert.store'
import { axiosApiClient } from '@/core/helpers/axios-configrations'
import { objectToFormData } from '@/core/helpers/objectToFormdata'

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

const postAd = (body: PostOrPatchAdRequest) => {
  return axiosApiClient
    .post<Ad>('/ads', objectToFormData(body))
    .then((res) => {
      alertStore.show({
        message: 'تم إضافة الإعلان بنجاح',
        type: 'success'
      })
      return res
    })
}
// const postAd = (body: PostOrPatchAdRequest): Promise<Ad> => {
//   return apiClient
//     .addon(formData)
//     .url('/ads')
//     .formData(body)
//     .post()
//     .json((res) => {
//       alertStore.show({
//         message: 'تم إضافة الإعلان بنجاح',
//         type: 'success'
//       })
//       return res
//     })
// }

const patchAd = (id: number, body: Partial<PostOrPatchAdRequest>) => {
  return axiosApiClient
    .post<Ad>(`/ads/${id}`, objectToFormData({
      ...body,
      _method: 'put'
    }))
    .then((res) => {
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
