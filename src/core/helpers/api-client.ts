import router from '@/router'
import wretch, { type FetchLike, type WretchOptions } from 'wretch'
import authStore from '../stores/auth.store'

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
  .middlewares([authInterceptor])
  .options({ mode: 'cors' })
  .resolve((_) =>
    _.unauthorized((err) => {
      authStore.clearAuth()
      router.replace({ name: 'login' })
      throw new Error(err.message)
    })
      .internalError((err) => {
        throw new Error(err.message)
      })
      .badRequest((err) => {
        throw new Error(err.message)
      })
      .notFound((err) => {
        throw new Error(err.message)
      })
      .fetchError((err) => {
        throw new Error(err.message)
      })
      .timeout((err) => console.log(err.status))
  )

export default apiClient
