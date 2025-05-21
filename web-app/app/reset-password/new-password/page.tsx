'use client'

import { FormNewPassword } from '@/components/form/form-new-password'

export default function NewPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <FormNewPassword />
      </div>
    </div>
  )
}
