'use client'

import { FormVerifyOTP } from '@/components/form/form-verify-otp'

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <FormVerifyOTP />
      </div>
    </div>
  )
}