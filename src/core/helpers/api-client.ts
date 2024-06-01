import router from '@/router'
import wretch, { type FetchLike, type WretchOptions } from 'wretch'
import authStore from '../stores/auth.store'
import { alertStore } from '../stores/alert.store'

function authInterceptor(next: FetchLike) {
  return (url: string, opts: WretchOptions) => {
    const auth = authStore.auth

    if (auth) {
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${auth}`
      }
    }
    return next(url, opts)
  }
}

const apiClient = wretch(import.meta.env.VITE_API_URL)
  // .headers({ 'Accept': 'application/json', "Content-Type": "application/json",  })
  .middlewares([authInterceptor])
  .options({ mode: 'cors' })
  .resolve((_) =>
    _.unauthorized((err) => {
      authStore.clearAuth()
      router.replace({ name: 'login' })
      throw new Error(err.message)
    }) 
      .internalError((err) => {
        alertStore.show({
          message: 'حصل خطأ, يرجى المحاولة مرة أخرى',
          type: 'error'
        })
        throw new Error(err.message)
      })
      .badRequest((err) => {
        const response = JSON.parse(err.message)
        alertStore.show({
          message: response.message ?? 'قم بتفقد البيانات و المحاولة مرة أخرى',
          type: 'error'
        })
        throw new Error(err.message)
      })
      .notFound((err) => {
        alertStore.show({
          message: 'لا يوجد, يرجى المحاولة مرة أخرى',
          type: 'error'
        })
        throw new Error(err.message)
      })
      .fetchError((err) => {
        alertStore.show({
          message: 'حصل خطأ, يرجى المحاولة مرة أخرى',
          type: 'error'
        })
        throw new Error(err.message)
      })
      .timeout((err) => console.log(err.status))
  )

export default apiClient
