'use server'

import http from '@/lib/http'
import { TokenResponse } from '@/types/token'

export const refreshAccessToken = async (refreshToken: string): Promise<TokenResponse> => {
  const { payload } = await http.post<TokenResponse>(`/user-service/auth/refresh`, JSON.stringify({ refreshToken }), {
    noAuth: true,
  })

  return payload
}
