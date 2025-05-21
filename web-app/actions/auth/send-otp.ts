'use server'

import http from '@/lib/http'
import { RegisterSchemaType } from '@/schemas/auth/register'

export type OtpResponse = {
  token: string
  expiryTime: number
  message: string
}

export const sendRegistrationOtp = async (data: RegisterSchemaType) => {
  const otpRequest = {
    email: data.email,
    name: data.name
  }

  try {
    const { payload } = await http.post<{ result: OtpResponse }>('/email-service/email/otp/send', JSON.stringify(otpRequest))
    
    if (payload && payload.result) {
      return {
        success: true,
        token: payload.result.token,
        expiryTime: payload.result.expiryTime,
        message: payload.result.message
      }
    }
    
    return {
      success: false,
      message: 'Failed to send OTP'
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return {
      success: false,
      message: 'Error sending OTP'
    }
  }
}