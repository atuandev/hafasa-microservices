'use server'

import { RegisterSchemaType } from '@/schemas/auth/register'
import http from '@/lib/http'
import { UserResponse } from '@/types/user'
import { login } from '@/actions/auth/login'

import { sendRegistrationOtp } from '@/actions/auth/send-otp'
import { redirect } from 'next/navigation'

export const register = async (data: RegisterSchemaType) => {
  // Send OTP to user's email
  const otpResponse = await sendRegistrationOtp(data)

  if (!otpResponse.success) {
    return {
      code: 1001,
      message: otpResponse.message || 'Failed to send OTP'
    }
  }

  // Encode registration data to pass in URL
  const encodedData = encodeURIComponent(JSON.stringify(data))

  // Redirect to OTP verification page with necessary parameters
  const redirectUrl = `/verify-otp?email=${encodeURIComponent(data.email)}&token=${otpResponse.token}&expiryTime=${otpResponse.expiryTime}&registrationData=${encodedData}`

  redirect(redirectUrl)
}
