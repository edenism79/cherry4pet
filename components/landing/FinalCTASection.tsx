'use client'

import { Heart, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from 'react'

export function FinalCTASection() {
  const [showComingSoon, setShowComingSoon] = useState(false)

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

      <section className="py-20 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              작은 참여가 한 생명을 지킵니다
            </h2>

            <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
              CHERRY for PET과 함께
              <br />
              투명한 반려동물 기부를 시작하세요
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-cherry-red hover:bg-white/90 text-lg px-8 py-6 h-auto font-semibold"
                onClick={(e) => handleCtaClick(e, '/campaigns')}
              >
                <Heart className="mr-2 h-5 w-5" />
                지금 기부하기
              </Button>
              <Button
                size="lg"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-cherry-red text-lg px-8 py-6 h-auto font-semibold transition-all"
                onClick={(e) => handleCtaClick(e, '/contact')}
              >
                <Building className="mr-2 h-5 w-5" />
                파트너로 참여하기
              </Button>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-sm text-primary-foreground/80">
                  투명한 기부금 관리
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">검증된</div>
                <div className="text-sm text-primary-foreground/80">
                  파트너 및 캠페인
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">실시간</div>
                <div className="text-sm text-primary-foreground/80">
                  진행 상황 공개
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
