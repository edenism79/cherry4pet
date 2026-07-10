'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LandingSection } from "@/types/cms"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface HeroSectionProps {
  data: LandingSection
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [showComingSoon, setShowComingSoon] = useState(false)

  // Extract style settings from extra field
  const titleColor = (data.extra as any)?.title_color || '#E9415A'
  const titleFont = (data.extra as any)?.title_font || 'Pretendard'
  const titleSize = (data.extra as any)?.title_size || '48'
  const subtitleColor = (data.extra as any)?.subtitle_color || '#E9415A'
  const subtitleSize = (data.extra as any)?.subtitle_size || '24'
  const bodyColor = (data.extra as any)?.body_color || '#6B7280'

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('CTA clicked with URL:', url)

    // List of routes that are not ready yet - show popup for these
    const notReadyRoutes = ['/campaigns', '/contact', '/partners', '/stories', '/about', '#coming-soon', '#']

    // Check if URL is empty or in not ready list
    if (!url || url === '' || notReadyRoutes.some(route => url === route || url.includes(route))) {
      console.log('Showing coming soon popup - URL in not ready list')
      setShowComingSoon(true)
      return
    }

    // Check if URL contains cherry.pet or cherry4pet - these are also not ready
    if (url.includes('cherry.pet') || url.includes('cherry4pet') || url.includes('cherrypet')) {
      console.log('Showing coming soon popup - cherry domain')
      setShowComingSoon(true)
      return
    }

    // Only allow fully external URLs (not cherry domains) to navigate
    if (url.startsWith('http://') || url.startsWith('https://')) {
      console.log('External URL detected, navigating...')
      window.location.href = url
      return
    }

    // All other cases show coming soon
    console.log('Showing coming soon popup - default case')
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

      <section className="relative bg-gradient-to-b from-cherry-cream to-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1
                  className="font-bold leading-tight"
                  style={{
                    color: titleColor,
                    fontFamily: titleFont,
                    fontSize: `${titleSize}px`
                  }}
                >
                  {data.title}
                </h1>
                <p
                  className="font-semibold"
                  style={{
                    color: subtitleColor,
                    fontSize: `${subtitleSize}px`
                  }}
                >
                  {data.subtitle}
                </p>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: bodyColor }}
                >
                  {data.body}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {data.cta_label && data.cta_url && (
                  <Button
                    size="lg"
                    className="bg-cherry-red hover:bg-cherry-deep text-white font-semibold px-8 py-6 text-lg rounded-full"
                    onClick={(e) => handleCtaClick(e, data.cta_url!)}
                  >
                    {data.cta_label}
                  </Button>
                )}
                {typeof data.extra === 'object' && data.extra && 'cta2_label' in data.extra && 'cta2_url' in data.extra && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cherry-red text-cherry-red hover:bg-cherry-red hover:text-white font-semibold px-8 py-6 text-lg rounded-full"
                    onClick={(e) => handleCtaClick(e, data.extra.cta2_url as string)}
                  >
                    {data.extra.cta2_label as string}
                  </Button>
                )}
              </div>
            </div>
            <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-cherry-cream to-white">
              {data.image_url ? (
                <Image
                  src={data.image_url}
                  alt={data.title || "Hero image"}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cherry-pink to-cherry-red flex items-center justify-center">
                  <p className="text-white text-2xl font-bold">CHERRY for PET</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
