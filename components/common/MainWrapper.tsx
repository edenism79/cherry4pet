'use client'

import { useState, useEffect } from 'react'

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const [bannerVisible, setBannerVisible] = useState(true)

  useEffect(() => {
    // Listen to custom event for banner close
    const handleBannerClose = () => {
      setBannerVisible(false)
    }

    window.addEventListener('banner-closed', handleBannerClose)

    return () => {
      window.removeEventListener('banner-closed', handleBannerClose)
    }
  }, [])

  return (
    <main
      className="min-h-screen transition-all duration-300"
      style={{ paddingTop: bannerVisible ? 'calc(4rem + 52px)' : '4rem' }}
    >
      {children}
    </main>
  )
}
