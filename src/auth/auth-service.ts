import apiClient from '@/core/helpers/api-client'
import type { LoginPayload } from './models/login-payload'
import type { AuthResponse } from './models/auth-response'
import authStore from '@/core/stores/auth.store'
import router from '@/router'

const login = (payLoad: LoginPayload): Promise<AuthResponse> => {
  return apiClient
    .url('/auth/login-admin')
    .post(payLoad)
    .json()
    .then((response) => {
      authStore.setAuth(response as AuthResponse)
      return response as AuthResponse
    })
}

const logout = (): Promise<void> => {
  return apiClient
  .url('/auth/logout-admin')
  .post({token: authStore.auth})
  .json()
  .then(() => {
    authStore.clearAuth()
    router.replace('/login')
  })
}

export {
  login,
  logout
}
