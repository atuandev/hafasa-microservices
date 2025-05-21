'use client'

import { useSearchParams } from 'next/navigation'
import { FormOtpVerification } from '@/components/form/form-otp-verification'
import { RegisterSchemaType } from '@/schemas/auth/register'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registrationData, setRegistrationData] = useState<RegisterSchemaType | null>(null)

  // Get parameters from URL
  const email = searchParams.get('email')
  const token = searchParams.get('token')
  const expiryTime = searchParams.get('expiryTime')
  const registrationDataParam = searchParams.get('registrationData')

  useEffect(() => {
    if (!email || !token || !expiryTime || !registrationDataParam) {
      setError('Missing required parameters')
      setIsLoading(false)
      return
    }

    try {
      const parsedData = JSON.parse(decodeURIComponent(registrationDataParam)) as RegisterSchemaType
      setRegistrationData(parsedData)
      setIsLoading(false)
    } catch (e) {
      console.error('Error parsing registration data:', e)
      setError('Invalid registration data')
      setIsLoading(false)
    }
  }, [email, token, expiryTime, registrationDataParam])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !email || !token || !expiryTime || !registrationData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error || 'Missing required parameters'}</p>
          <button
            onClick={() => router.push('/register')}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Return to Registration
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <FormOtpVerification
          email={email}
          token={token}
          expiryTime={parseInt(expiryTime)}
          registrationData={registrationData}
        />
      </div>
    </div>
  )
}
