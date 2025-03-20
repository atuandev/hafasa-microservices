'use server'

import http from '@/lib/http'
import { UpdatePasswordSchemaType, UserSchemaType } from '@/schemas/user-info'
import { MessageResponse } from '@/types/response'
import { User, UserResponse } from '@/types/user'
import { revalidatePath } from 'next/cache'

export const getUserInfo = async (): Promise<User> => {
  const { payload } = await http.get<UserResponse>('/user-service/users/me')
  return payload.data
}

export const updateUserInfo = async (id: string, data: UserSchemaType) => {
  await http.put<UserResponse>(`/user-service/users/${id}`, JSON.stringify(data))
  revalidatePath('/account')
}

export const updatePassword = async (data: UpdatePasswordSchemaType) => {
  const dataReq = {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  }
  const user = await getUserInfo()
  const { payload } = await http.patch<MessageResponse>(`/user-service/users/${user.id}/update-password`, JSON.stringify(dataReq))
  revalidatePath('/account')
  return payload
}
