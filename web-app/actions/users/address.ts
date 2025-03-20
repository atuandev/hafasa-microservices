'use server'

import http from '@/lib/http'
import { revalidatePath } from 'next/cache'
import { UserAddressSchemaType } from '@/schemas/user-address'
import { PageAddressResponse } from '@/types/address'
import { getUserInfo } from '@/actions/users/info'

export const getUserAddresses = async () => {
  const user = await getUserInfo()
  const { payload } = await http.get<PageAddressResponse>(`/user-service/addresses/user/${user.id}`)
  const addresses = payload.data
  return { addresses, user }
}

export const addAddress = async (data: UserAddressSchemaType) => {
  await http.post(`/user-service/addresses/add`, JSON.stringify(data))
  revalidatePath('/account')
}

export const deleteAddressById = async (addressId: string) => {
  await http.delete(`/user-service/addresses/${addressId}`)
  revalidatePath('/account')
}

export const updateAddressById = async (addressId: string, data: UserAddressSchemaType) => {
  await http.put(`/user-service/addresses/${addressId}`, JSON.stringify(data))
  revalidatePath('/account')
}
