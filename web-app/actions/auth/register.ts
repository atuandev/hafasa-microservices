'use server'

import { RegisterSchemaType } from '@/schemas/auth/register'
import http from '@/lib/http'
import { UserResponse } from '@/types/user'
import { login } from '@/actions/auth/login'

export const register = async (data: RegisterSchemaType) => {
  const { payload } = await http.post<UserResponse>(`/user-service/users/add`, JSON.stringify(data))
  if (payload.code === 1000) {
    const loginRequest = {
      username: data.username,
      password: data.password,
    }
    await login(loginRequest)
  }
  return payload
}

