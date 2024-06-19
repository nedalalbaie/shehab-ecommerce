import apiClient from '@/core/helpers/api-client'
import queryString from 'wretch/addons/queryString'
import formData from 'wretch/addons/formData'
import type { PaginationParams } from '@/core/models/pagination-params'
import type { List } from '@/core/models/list'
import { alertStore } from '@/core/stores/alert.store'
import type { Installment } from './models/installment'

const getInstallments = (params: PaginationParams): Promise<List<Installment[]>> => {
  return apiClient
    .addon(queryString)
    .url('/installments')
    .query(params)
    .get()
    .notFound(() => ({
      data: [],
      totalRecords: 0
    }))
    .json()
}

const postInstallment = (body: Omit<Installment , 'id'>): Promise<Installment> => {
  return apiClient
    .addon(formData)
    .url('/installments')
    .formData(body)
    .post()
    .json((res) => {
      alertStore.show({
        message: 'تم إضافة القسط بنجاح',
        type: 'success'
      })
      return res
    })
}

const deleteInstallment = (id: number) => {
  return apiClient.url(`/installments/${id}`).delete().json( ()=> {
    alertStore.show({
      message: 'تم تغيير الحالة بنجاح',
      type: 'info'
    })
  })
}

export { getInstallments, postInstallment, deleteInstallment }
