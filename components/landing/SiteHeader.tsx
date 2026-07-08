'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

interface SiteHeaderProps {
  logoUrl?: string | null
  siteName?: string
}

export function SiteHeader({ logoUrl, siteName = 'CHERRY for PET' }: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: '캠페인', href: '#campaigns' },
    { name: '투명성', href: '#transparency' },
    { name: '파트너', href: '#partners' },
    { name: '소식', href: '#stories' },
    { name: '문의', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logoUrl ? (
              <div className="relative h-8 md:h-10" style={{ width: 'auto', aspectRatio: 'auto' }}>
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={200}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-2xl md:text-3xl font-bold text-cherry-red">
                  CHERRY
                </span>
                <span className="text-2xl md:text-3xl font-bold text-gray-900 ml-1">
                  for PET
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-cherry-red font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-cherry-red hover:bg-cherry-deep text-white font-semibold px-6 py-2 rounded-full"
              asChild
            >
              <a href="https://cherry.pet/donate">지금 기부하기</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-cherry-red font-medium transition-colors px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button
                className="bg-cherry-red hover:bg-cherry-deep text-white font-semibold rounded-full"
                asChild
              >
                <a href="https://cherry.pet/donate">지금 기부하기</a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
