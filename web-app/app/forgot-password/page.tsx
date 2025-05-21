'use client'

import { FormForgotPassword } from '@/components/form/form-forgot-password'

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <FormForgotPassword />
      </div>
    </div>
  )
}