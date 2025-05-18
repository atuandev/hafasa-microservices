'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/**
 * This component is kept for backward compatibility.
 * It redirects to the new OTP verification page in the two-step reset password flow.
 */
export function FormResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get all URL parameters
    const email = searchParams.get('email')
    const token = searchParams.get('token')
    const expiryTime = searchParams.get('expiryTime')
    
    // Create new search params for redirect
    const params = new URLSearchParams()
    if (email) params.append('email', email)
    if (token) params.append('token', token)
    if (expiryTime) params.append('expiryTime', expiryTime)
    
    // Redirect to the new OTP verification page
    router.replace(`/reset-password?${params.toString()}`)
  }, [router, searchParams])

  return (
    <div className="p-4 rounded-md min-w-[380px] text-center">
      <h2 className="text-lg font-medium">Đang chuyển hướng...</h2>
      <p className="text-gray-500 mt-2">Vui lòng đợi trong giây lát.</p>
    </div>
  )
}
