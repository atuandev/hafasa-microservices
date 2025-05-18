'use server'

import http from '@/lib/http'
import { ResetPasswordSchemaType } from '@/schemas/auth/reset-password'

export const resetPassword = async (data: ResetPasswordSchemaType) => {
  try {
    const response = await http.post<{ code: number, message: string }>('/user-service/users/reset-password', JSON.stringify(data))

    if (response && response.payload && response.payload.code === 1000) {
      return {
        success: true,
        message: response.payload.message || 'Password reset successfully'
      }
    }

    return {
      success: false,
      message: response.payload?.message || 'Failed to reset password'
    }
  } catch (error) {
    console.error('Error resetting password:', error)
    return {
      success: false,
      message: 'Error resetting password'
    }
  }
}
