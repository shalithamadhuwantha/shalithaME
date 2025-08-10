'use client'

import { useState, useEffect } from 'react'

interface SmoothLoadingBarProps {
  onClose?: () => void;
}

export default function SmoothLoadingBar({ onClose }: SmoothLoadingBarProps) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  // Fix hydration mismatch
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Only start animation after hydration
  useEffect(() => {
    if (!isHydrated) return

    // Small delay to ensure smooth start
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            return 0 // Reset
          }
          return prev + 2 // Increment by 2%
        })
      }, 100)

      return () => clearInterval(interval)
    }, 100)

    return () => clearTimeout(startDelay)
  }, [isHydrated])

  const barLength = 25
  const filledBlocks = isHydrated ? Math.floor((progress / 100) * barLength) : 0
  
  const createBar = () => {
    let bar = ""
    for (let i = 0; i < barLength; i++) {
      bar += i < filledBlocks ? "█" : "▁"
    }
    return bar
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black font-mono flex items-center justify-center" style={{ color: "#bc9f00" }}>
      <button
        className="absolute top-4 right-4 text-xl focus:outline-none hover:opacity-80"
        onClick={() => {
          setVisible(false)
          if (onClose) onClose()
        }}
        style={{ color: "#bc9f00" }}
        aria-label="Close loading screen"
      >
        ×
      </button>

      <div className="text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl mb-4 tracking-wider">
          [{createBar()}]
        </div>
        <div className="text-lg text-gray-400 mb-2">
          Loading...
        </div>
        <div className="text-sm text-gray-500">
          {isHydrated ? progress : 0}%
        </div>
      </div>
    </div>
  )
}
