'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function useComingSoon() {
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleLinkClick = (e: React.MouseEvent, url: string | null | undefined) => {
    e.preventDefault()
    e.stopPropagation()

    if (!url) {
      setShowComingSoon(true)
      return
    }

    // List of routes that are not ready yet
    const notReadyRoutes = ['/campaigns', '/contact', '/partners', '/stories', '/about', '#coming-soon', '#']

    // Check if URL is in not ready list
    if (notReadyRoutes.some(route => url === route || url.includes(route))) {
      setShowComingSoon(true)
      return
    }

    // Check if URL contains cherry domains - these are also not ready
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

  return { showComingSoon, setShowComingSoon, handleLinkClick }
}

export function ComingSoonDialog({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[90vw] sm:max-w-md mx-4">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 py-3 sm:py-4">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-cherry-pink to-cherry-red flex items-center justify-center animate-pulse">
              <span className="text-4xl sm:text-5xl">🐾</span>
            </div>
            <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-cherry-red opacity-20 animate-ping"></div>
          </div>

          <AlertDialogHeader className="space-y-3 sm:space-y-4">
            <AlertDialogTitle className="text-2xl sm:text-3xl font-bold text-gray-900">
              열심히 준비하고 있어요
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base sm:text-lg text-gray-600 leading-relaxed">
              더 나은 서비스로 찾아뵙기 위해<br />
              <span className="text-cherry-red font-semibold">조금만 기다려주세요!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="w-full space-y-2 sm:space-y-3">
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-cherry-red to-cherry-deep hover:from-cherry-deep hover:to-cherry-red active:scale-95 text-white font-semibold py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-target"
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
  )
}
