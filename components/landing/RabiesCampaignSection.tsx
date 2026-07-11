'use client'

import { Users, Globe, Heart, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useComingSoon, ComingSoonDialog } from "@/components/common/ComingSoonDialog"

interface RabiesCampaignSectionProps {
  data?: {
    title: string
    subtitle: string | null
    body: string | null
    cta_label: string | null
    cta_url: string | null
    extra: Record<string, any>
  }
}

export function RabiesCampaignSection({ data }: RabiesCampaignSectionProps) {
  const { showComingSoon, setShowComingSoon, handleLinkClick } = useComingSoon()

  if (!data) return null

  // Extract style settings from extra field
  const titleColor = data.extra?.title_color || '#1F2937'
  const titleFont = data.extra?.title_font || 'Pretendard'
  const titleSize = data.extra?.title_size || '40'
  const subtitleColor = data.extra?.subtitle_color || '#1F2937'
  const subtitleSize = data.extra?.subtitle_size || '20'
  const bodyColor = data.extra?.body_color || '#374151'
  const backgroundImage = data.extra?.background_image
  const backgroundOpacity = data.extra?.background_opacity || 100

  // Debug: Log background settings
  if (typeof window !== 'undefined') {
    console.log('🎨 Rabies Campaign Background Settings:')
    console.log('  - Background Image:', backgroundImage || '(없음)')
    console.log('  - Background Opacity:', backgroundOpacity)
    console.log('  - Has Image?', !!backgroundImage)
    console.log('  - Full Extra:', data.extra)
  }

  const stats = [
    {
      icon: Globe,
      label: data.extra?.stat1_label || '광견병 전체 사망',
      value: data.extra?.stat1_value || '매년 약 6만명',
    },
    {
      icon: Users,
      label: data.extra?.stat2_label || '광견병 아동 사망',
      value: data.extra?.stat2_value || '50% 약 3만명',
    },
    {
      icon: Heart,
      label: data.extra?.stat3_label || '전쟁 아동 사망 및 부상',
      value: data.extra?.stat3_value || '약 1만 5천명',
    },
    {
      icon: Stethoscope,
      label: data.extra?.stat4_label || '광견병 등록 사망',
      value: data.extra?.stat4_value || '약 300만 마리',
    },
  ]

  return (
    <>
      <ComingSoonDialog open={showComingSoon} onOpenChange={setShowComingSoon} />
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden" style={{ minHeight: '600px' }}>
        {/* Background Image with Opacity */}
        {backgroundImage && backgroundImage.trim() !== '' ? (
          <>
            {/* Background color layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
            {/* Background image layer */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: backgroundOpacity / 100,
              }}
              data-testid="background-image"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/30 via-transparent to-white/30" />
          </>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
        )}

        {/* Content */}
        <div className="container-responsive relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-block px-4 sm:px-6 py-2 bg-cherry-red/10 rounded-full mb-4 sm:mb-6">
            <span className="text-cherry-red font-semibold text-xs sm:text-sm tracking-wide uppercase">
              🎉 {data.title}
            </span>
          </div>
          <h2
            className="font-bold mb-4 sm:mb-6 text-display-sm md:text-display-md korean-text px-4"
            style={{
              color: subtitleColor,
              fontFamily: titleFont,
            }}
          >
            {data.subtitle}
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed korean-text px-4"
            style={{ color: bodyColor }}
          >
            {data.body}
          </p>
        </div>

        {/* Quote */}
        {data.extra?.quote && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 mb-12 border-l-4 border-cherry-red">
            <div className="flex items-start gap-2 sm:gap-4">
              <span className="text-4xl sm:text-5xl md:text-6xl text-cherry-red/20 leading-none flex-shrink-0">"</span>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 font-medium leading-relaxed pt-1 sm:pt-2 korean-text">
                {data.extra.quote}
              </p>
              <span className="text-4xl sm:text-5xl md:text-6xl text-cherry-red/20 leading-none self-end flex-shrink-0">"</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-10 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-900 korean-text px-4">
            숫자로 보는 광견병의 현실
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-cherry-red/10 rounded-full mb-3 sm:mb-4 mx-auto">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cherry-red" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 korean-text">{stat.label}</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-bold text-cherry-red korean-text">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Info */}
        {data.extra?.launch_date && (
          <div className="bg-gradient-to-r from-cherry-red to-cherry-deep text-white rounded-2xl p-6 md:p-8 mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              {/* Left: Event Information (3/4 width) */}
              <div className="flex-1 md:w-3/4 flex flex-col justify-center">
                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">MOU 체결식 안내</h3>

                {/* 3 Columns with equal height */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-base md:text-lg font-bold mb-2">일시</p>
                    <p className="font-semibold text-base md:text-lg">{data.extra.launch_date}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base md:text-lg font-bold mb-2">장소</p>
                    <p className="font-semibold text-sm md:text-base">{data.extra.venue}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-base md:text-lg font-bold mb-2">주최</p>
                    <p className="font-semibold text-base md:text-lg">{data.extra.organizer}</p>
                  </div>
                </div>

                {/* Host */}
                <div className="text-center">
                  <p className="text-base md:text-lg font-bold mb-2">주관</p>
                  <p className="font-semibold text-sm md:text-base">{data.extra.hosts}</p>
                </div>
              </div>

              {/* Right: Image Box (1/4 width) */}
              <div className="md:w-1/4 flex items-stretch">
                {data.extra?.mou_image ? (
                  <div className="relative w-full rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-3">
                    <img
                      src={data.extra.mou_image}
                      alt="MOU 체결식"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder/hero-pet.jpg'
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-cherry-red hover:bg-gray-50 border-2 border-cherry-red font-bold px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            onClick={(e) => handleLinkClick(e, data.cta_url)}
          >
            {data.cta_label || '캠페인 참여하기'}
          </Button>
          <p className="mt-4 text-gray-600">
            함께 만드는 광견병 없는 아시아 🌏
          </p>
        </div>
        </div>
      </section>
    </>
  )
}
