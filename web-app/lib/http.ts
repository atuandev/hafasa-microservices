import envConfig from '@/config/env-config'
import { cookies } from 'next/headers'

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string
  noAuth?: boolean
}

type CustomBody = FormData | string | undefined

const formatUrl = (url: string, baseUrl: string): string => {
  const cleanUrl = url.startsWith('/') ? url : `/${url}`
  return `${baseUrl}${cleanUrl}`
}

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOptions,
) => {
  let body: CustomBody = undefined

  if (options?.body instanceof FormData) {
    body = options.body
  } else if (options?.body && typeof options.body === 'object') {
    body = JSON.stringify(options.body)
  } else if (typeof options?.body === 'string') {
    body = options.body
  }

  const baseHeaders: {
    [key: string]: string
  } =
    body instanceof FormData
      ? {}
      : {
        'Content-Type': 'application/json',
        credentials: 'include',
      }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  if (accessToken) {
    baseHeaders.Authorization = `Bearer ${accessToken}`
  }

  if (options?.noAuth) {
    delete baseHeaders.Authorization
  }

  const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_API_ENDPOINT

  const res = await fetch(formatUrl(url, baseUrl), {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as Headers,
    body,
    method,
  })
  const payload: Response = await res.json()

  return {
    status: res.status,
    payload,
  }
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options)
  },
  post<Response>(url: string, body: CustomBody, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(url: string, body: CustomBody, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(url: string, body?: CustomBody, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('DELETE', url, { ...options, body })
  },
  patch<Response>(url: string, body: CustomBody, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PATCH', url, { ...options, body })
  },
}

export default http
