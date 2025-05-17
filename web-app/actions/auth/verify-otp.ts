'use server'

import http from '@/lib/http'
import { OtpVerificationSchemaType } from '@/schemas/auth/otp-verification'
import { RegisterSchemaType } from '@/schemas/auth/register'
import { UserResponse } from '@/types/user'
import { login } from '@/actions/auth/login'

export const verifyOtpAndRegister = async (data: OtpVerificationSchemaType) => {
  // First verify the OTP
  const verifyRequest = {
    email: data.email,
    otp: data.otp,
    token: data.token
  }

  try {
    const { payload: verifyPayload } = await http.post<{ result: boolean }>('/email-service/email/otp/verify', JSON.stringify(verifyRequest))
    
    if (!verifyPayload || !verifyPayload.result) {
      return {
        success: false,
        message: 'Invalid OTP code'
      }
    }
    
    // OTP is valid, proceed with registration
    const registrationData = data.registrationData as RegisterSchemaType
    
    const { payload: registerPayload } = await http.post<UserResponse>(`/user-service/users/add`, JSON.stringify(registrationData))
    
    if (registerPayload.code === 1000) {
      // Registration successful, log the user in
      const loginRequest = {
        username: registrationData.username,
        password: registrationData.password,
      }
      await login(loginRequest)
      
      return {
        success: true,
        message: 'Registration successful'
      }
    }
    
    return {
      success: false,
      message: registerPayload.message || 'Registration failed'
    }
  } catch (error) {
    console.error('Error during OTP verification or registration:', error)
    return {
      success: false,
      message: 'Error during registration process'
    }
  }
}