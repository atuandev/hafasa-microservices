import { cookies, headers } from 'next/headers'

export const getBaseUrl = async () => {
  if (process.env.NEXT_PUBLIC_LOCAL_URL) {
    return process.env.NEXT_PUBLIC_LOCAL_URL
  }

  return 'http://localhost:3000'
}

export const getPathname = async () => {
  const headerList = await headers()
  return headerList.get('x-current-path')
}

export const getAccessToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('accessToken')
}