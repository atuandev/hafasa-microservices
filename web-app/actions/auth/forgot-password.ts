'use server'

import http from '@/lib/http'
import { ForgotPasswordSchemaType } from '@/schemas/auth/forgot-password'
import { OtpResponse } from '@/actions/auth/send-otp'

export const forgotPassword = async (data: ForgotPasswordSchemaType) => {
  try {
    const response = await http.post<{ code: number, data: OtpResponse }>('/user-service/users/forgot-password', JSON.stringify(data))

    if (response && response.payload && response.payload.code === 1000 && response.payload.data) {
      return {
        success: true,
        token: response.payload.data.token,
        expiryTime: response.payload.data.expiryTime,
        message: response.payload.data.message || 'OTP sent successfully'
      }
    }

    return {
      success: false,
      message: response.payload?.message || 'Failed to send OTP'
    }
  } catch (error) {
    console.error('Error sending forgot password OTP:', error)
    return {
      success: false,
      message: 'Error sending OTP'
    }
  }
}
