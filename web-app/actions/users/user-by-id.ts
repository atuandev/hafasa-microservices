'use server'

import http from '@/lib/http'
import { UserResponse } from '@/types/user'

// Cache user data to avoid repeated requests for the same user
const userCache = new Map<string, any>()

export const getUserById = async (userId: string) => {
  // Check cache first
  if (userCache.has(userId)) {
    return userCache.get(userId)
  }
  
  try {
    const { payload } = await http.get<UserResponse>(`/user-service/users/${userId}`)
    
    // Cache the user data
    if (payload && payload.data) {
      userCache.set(userId, payload.data)
    }
    
    return payload.data
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error)
    return null
  }
}
