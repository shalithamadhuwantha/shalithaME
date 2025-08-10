'use client'
import { Metadata } from 'next'
import { LoginForm } from '../../components/Admin/login/login-form'



export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#bfa300] mb-2 tracking-wider">
            Gmail
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
      
      {/* Hacking-style background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[#bfa300] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-[#bfa300] rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-30"></div>
      </div>
    </div>
  )
}
