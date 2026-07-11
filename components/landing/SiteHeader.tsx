'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Link from 'next/link'
import Image from 'next/image'

interface SiteHeaderProps {
  logoUrl?: string | null
  siteName?: string
}

export function SiteHeader({ logoUrl, siteName = 'CHERRY for PET' }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [bannerVisible, setBannerVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Listen to custom banner-closed event
    const handleBannerClose = () => {
      setBannerVisible(false)
    }

    window.addEventListener('banner-closed', handleBannerClose)

    return () => {
      window.removeEventListener('banner-closed', handleBannerClose)
    }
  }, [])

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Reload page and scroll to top
    window.location.href = '/'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor links (starting with #)
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Check if announcement banner is currently visible
        const bannerHeight = bannerVisible ? 52 : 0
        const headerOffset = 80 + bannerHeight // Height of fixed header + banner
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // Close mobile menu after clicking
        setIsMobileMenuOpen(false)
      }
    }
  }

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault()
    e.stopPropagation()

    // List of routes that are not ready yet - show popup for these
    const notReadyRoutes = ['/campaigns', '/contact', '/partners', '/stories', '/about', '#coming-soon', '#']

    // Check if URL is empty or in not ready list
    if (!url || url === '' || notReadyRoutes.some(route => url === route || url.includes(route))) {
      setShowComingSoon(true)
      return
    }

    // Check if URL contains cherry.pet or cherry4pet - these are also not ready
    if (url.includes('cherry.pet') || url.includes('cherry4pet') || url.includes('cherrypet')) {
      setShowComingSoon(true)
      return
    }

    // Only allow fully external URLs (not cherry domains) to navigate
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.location.href = url
      return
    }

    // All other cases show coming soon
    setShowComingSoon(true)
  }

  const navigation = [
    { name: '소개', href: '#about' },
    { name: '광견병 캠페인', href: '#rabies-campaign' },
    { name: '캠페인', href: '#campaigns' },
    { name: '투명성', href: '#transparency' },
    { name: 'CHERRY Photo', href: '#cherry-photo' },
    { name: '목표', href: '#impact' },
    { name: '파트너', href: '#partners' },
    { name: '문의', href: '#contact' },
  ]

  return (
    <>
      <AlertDialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <AlertDialogContent className="max-w-md">
          <div className="flex flex-col items-center text-center space-y-6 py-4">
            {/* Animated Icon */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cherry-pink to-cherry-red flex items-center justify-center animate-pulse">
                <span className="text-5xl">🐾</span>
              </div>
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-cherry-red opacity-20 animate-ping"></div>
            </div>

            <AlertDialogHeader className="space-y-4">
              <AlertDialogTitle className="text-3xl font-bold text-gray-900">
                곧 찾아뵙겠습니다!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-lg text-gray-600 leading-relaxed">
                체리포펫이 열심히 준비 중입니다.<br />
                <span className="text-cherry-red font-semibold">조금만 기다려주세요!</span>
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="w-full space-y-3">
              <Button
                onClick={() => setShowComingSoon(false)}
                className="w-full bg-gradient-to-r from-cherry-red to-cherry-deep hover:from-cherry-deep hover:to-cherry-red text-white font-semibold py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                알겠습니다
              </Button>
              <p className="text-xs text-gray-400">
                완성되면 가장 먼저 알려드릴게요 🎉
              </p>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 safe-top ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
        style={{ top: bannerVisible ? '52px' : '0' }}
      >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center cursor-pointer touch-target"
            onClick={handleLogoClick}
          >
            {logoUrl ? (
              <div className="relative h-7 sm:h-8 md:h-10" style={{ width: 'auto', aspectRatio: 'auto' }}>
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={200}
                  height={40}
                  className="h-7 sm:h-8 md:h-10 w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-cherry-red">
                  CHERRY
                </span>
                <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 ml-1">
                  for PET
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm xl:text-base text-gray-700 hover:text-cherry-red font-medium transition-colors cursor-pointer touch-target"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              className="bg-cherry-red hover:bg-cherry-deep text-white font-semibold px-5 xl:px-6 py-2 rounded-full text-sm xl:text-base touch-target"
              onClick={(e) => handleCtaClick(e, 'https://cherry.pet/donate')}
            >
              지금 기부하기
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-target"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-cherry-red hover:bg-cherry-cream/50 active:bg-cherry-cream font-medium transition-colors px-4 py-3 rounded-lg cursor-pointer touch-target"
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  className="w-full bg-cherry-red hover:bg-cherry-deep text-white font-semibold rounded-full touch-target py-3"
                  onClick={(e) => {
                    handleCtaClick(e, 'https://cherry.pet/donate')
                    setIsMobileMenuOpen(false)
                  }}
                >
                  지금 기부하기
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}
