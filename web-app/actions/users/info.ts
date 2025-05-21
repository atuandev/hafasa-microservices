'use server'

import http from '@/lib/http'
import { UpdatePasswordSchemaType, UserSchemaType } from '@/schemas/user-info'
import { MessageResponse } from '@/types/response'
import { User, UserResponse, PageUsersResponse } from '@/types/user'
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
  const { payload } = await http.patch<MessageResponse>(
    `/user-service/users/${user.id}/update-password`,
    JSON.stringify(dataReq)
  )
  revalidatePath('/account')
  return payload
}

export const getPageUsers = async (pageNo: number, pageSize: number, sortBy: string, search: string) => {
  try {
    // Default to page 1 if pageNo is 0
    const page = pageNo < 1 ? 1 : pageNo

    // Create a URLSearchParams object like in the getBooksBySpecification function
    const queryParams = new URLSearchParams({
      pageNo: page.toString(),
      pageSize: pageSize.toString(),
      sortBy: sortBy || 'createdAt:desc',
    })

    if (search) {
      queryParams.append('search', search)
    }

    // Use a similar endpoint structure as the books implementation
    const url = `/user-service/users/specifications?${queryParams.toString()}`
    console.log('Fetching users with URL:', url)

    const { payload } = await http.get<PageUsersResponse>(url)
    return payload
  } catch (error) {
    console.error('Error fetching users:', error)
    // Return a structured error response that matches PageUsersResponse structure
    return {
      code: 500,
      message: `Error fetching users: ${error instanceof Error ? error.message : String(error)}`,
      data: {
        pageNo: 1,
        pageSize: 10,
        totalPages: 0,
        totalElements: 0,
        items: [],
      },
    }
  }
}

export const deleteUserById = async (userId: string) => {
  const { payload } = await http.delete<UserResponse>(`/user-service/users/${userId}`)
  return payload
}
