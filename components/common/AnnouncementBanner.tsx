'use client'

import { useState } from 'react'
import { X, AlertCircle } from 'lucide-react'

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleClose = () => {
    setIsVisible(false)
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new Event('banner-closed'))
  }

  const handleClick = () => {
    const element = document.getElementById('rabies-campaign')
    if (element) {
      const headerOffset = 132 // Banner (52px) + header (80px) height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-lg h-[52px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-4">
          {/* Icon */}
          <div className="hidden sm:flex items-center">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>

          {/* Message */}
          <button
            onClick={handleClick}
            className="flex-1 text-center sm:text-left cursor-pointer hover:underline"
          >
            <span className="font-bold text-sm sm:text-base">
              🚨 긴급 공지
            </span>
            <span className="mx-2 hidden sm:inline">|</span>
            <span className="text-sm sm:text-base block sm:inline mt-1 sm:mt-0">
              아시아 광견병 예방 캠페인 진행 중! 지금 참여하세요
            </span>
          </button>

          {/* CTA + Close Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="hidden sm:block bg-white text-blue-600 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              자세히 보기
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="배너 닫기"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
