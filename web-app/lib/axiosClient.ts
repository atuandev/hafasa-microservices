import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import envConfig from '@/config/env-config'

const axiosInstance = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    return Promise.reject(error)
  },
)

const axiosClient = {
  get: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.get(url, config)
  },
  post: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.post(url, data, config)
  },
  put: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.put(url, data, config)
  },
  delete: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.delete(url, config)
  },
  patch: <T = never, R = AxiosResponse<T>>(
    endPoint: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<R> => {
    const url = endPoint.startsWith('/') ? endPoint : `/${endPoint}`
    return axiosInstance.patch(url, data, config)
  },
}

export default axiosClient
