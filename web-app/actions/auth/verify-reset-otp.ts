'use server'

import http from '@/lib/http'
import { VerifyOTPSchemaType } from '@/schemas/auth/verify-otp'

export const verifyResetOTP = async (data: VerifyOTPSchemaType) => {
  try {
    // Using the email-service OTP verification endpoint
    const response = await http.post<{ result: boolean; message?: string }>('/email-service/email/otp/verify', JSON.stringify(data))
    if (response && response.payload && response.payload.result === true) {
      return {
        success: true,
        message: response.payload.message || 'OTP verified successfully'
      }
    }

    return {
      success: false,
      message: response.payload?.message || 'Invalid OTP'
    }
  } catch (error) {
    console.error('Error verifying reset OTP:', error)
    return {
      success: false,
      message: 'Error verifying OTP'
    }
  }
}
