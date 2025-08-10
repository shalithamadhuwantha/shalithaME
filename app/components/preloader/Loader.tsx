'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import TerminalPreloader from './TerminalPreloader'// Your loading component

export default function Preloader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Only start loading after hydration
  useEffect(() => {
    if (!isHydrated) return

    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 10000) // simulate loading
    return () => clearTimeout(timer)
  }, [pathname, isHydrated])

  const handleClose = () => setLoading(false)

  // Don't render anything during SSR
  if (!isHydrated) return null
  
  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <TerminalPreloader onClose={handleClose} />
    </div>
  )
}
