'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ProtectedPageProps {
  children: React.ReactNode
}

export default function ProtectedPage({ children }: ProtectedPageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [access, setAccess] = useState<boolean | null>(null)
  const [checkingAccess, setCheckingAccess] = useState(true)

useEffect(() => {
  if (status === 'loading') return;
  if (pathname === '/Admin/login' || pathname === '/Admin/not-access') return;
  if (!session || !session.user || !session.user.email) {
    router.replace('/Admin/login');
    return;
  }

  const email = session.user.email;  // <-- Extract here

  async function fetchAccess() {
    setCheckingAccess(true);
    try {
      const res = await fetch('/api/backend/check-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const data = await res.json();
        setAccess(data.access);
        if (!data.access) {
          router.replace('/Admin/not-access');
        }
      } else {
        router.replace('/Admin/login');
      }
    } catch {
      router.replace('/Admin/login');
    } finally {
      setCheckingAccess(false);
    }
  }

  fetchAccess();
}, [status, session, router, pathname]);


  if (status === 'loading' || checkingAccess) {
    return <p>Loading...</p>
  }

  // If session is missing (e.g. redirect in progress)
  if (!session) {
    return <p>Redirecting to login...</p>
  }

  if (access === false) {
    // Fallback UI in case redirect fails
    return <p>Access denied. Redirecting...</p>
  }

  // User logged in and access granted
  return <>{children}</>
}
