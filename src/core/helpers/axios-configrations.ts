import axios, { AxiosError, type AxiosInstance } from 'axios'
import authStore from '../stores/auth.store'

export const axiosApiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

axiosApiClient.interceptors.request.use((config) => {
  if (authStore.auth) {
    config.headers.Authorization = `Bearer ${authStore.auth}`
  }
  return config
})
