'use client'

import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation'

export default function AuthPage() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn 
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'shadow-xl rounded-3xl',
          },
        }}
        redirectUrl="/dashboard"
        initialValues={{
          emailAddress: email || undefined,
        }}
      />
    </div>
  )
}