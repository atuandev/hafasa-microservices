'use server'

import http from '@/lib/http'
import { LoginSchemaType } from '@/schemas/auth/login'
import { TokenResponse } from '@/types/token'
import { cookies } from 'next/headers'

export const login = async (data: LoginSchemaType): Promise<TokenResponse> => {
  const { payload } = await http.post<TokenResponse>(`/user-service/auth/login`, JSON.stringify(data))

  const cookiesStore = await cookies()

  if (payload.data.accessToken && payload.data.refreshToken) {
    cookiesStore.set({
      name: 'accessToken',
      value: payload.data.accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })

    cookiesStore.set({
      name: 'refreshToken',
      value: payload.data.refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });
  }

  return payload
}
