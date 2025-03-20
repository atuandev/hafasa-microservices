'use server'

import http from '@/lib/http'
import { cookies } from 'next/headers'

export async function logout() {
  const cookieStore = await cookies()
  
  const refreshToken = cookieStore.get('refreshToken')?.value
  const { payload } = await http.post('/user-service/auth/logout', JSON.stringify({ refreshToken }))

  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  
  return payload
}
