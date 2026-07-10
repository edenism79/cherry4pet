'use client'

import { useState, useEffect } from 'react'
import { Camera, Heart, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const features = [
  '포토부스에서 반려동물과 사진 촬영',
  '촬영 비용의 일부가 자동 기부',
  '사진과 함께 기부 증서 제공',
  '오프라인 이벤트에서 직접 참여',
]

interface CherryPhotoSectionProps {
  data?: {
    image_url: string | null
  }
}

function AnimatedPhotoCount() {
  const [count, setCount] = useState(1)
  const TARGET = 99999
  const DURATION = 60000 // 60초 동안 99999까지 카운트
  const PAUSE = 1000 // 99999에 도달 후 대기 시간

  useEffect(() => {
    let current = 1
    let isResetting = false

    const animate = () => {
      const increment = TARGET / (DURATION / 50) // 50ms마다 증가할 값

      const timer = setInterval(() => {
        if (isResetting) return

        current += increment

        if (current >= TARGET) {
          setCount(TARGET)
          clearInterval(timer)
          isResetting = true

          // 3000 도달 후 잠시 대기 후 다시 1부터 시작
          setTimeout(() => {
            current = 1
            setCount(1)
            isResetting = false
            animate() // 재귀적으로 다시 시작
          }, PAUSE)
        } else {
          setCount(Math.floor(current))
        }
      }, 50)

      return timer
    }

    const timer = animate()

    return () => {
      if (timer) clearInterval(timer)
    }
  }, []) // 빈 배열로 한 번만 실행

  return (
    <div className="text-2xl font-bold text-rose-500 tabular-nums">
      {count.toLocaleString()}장
    </div>
  )
}

export function CherryPhotoSection({ data }: CherryPhotoSectionProps) {
  const photoImage = data?.image_url || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80'

  console.log('🖼️ Cherry Photo Section Image URL:', photoImage)
  return (
    <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-rose-100 rounded-full">
              <Camera className="h-5 w-5 text-rose-600" />
              <span className="text-sm font-semibold text-rose-600">
                CHERRY PHOTO
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              사진 한 장으로
              <br />
              참여하는 기부
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CHERRY Photo는 반려동물과 함께 추억을 남기며 자연스럽게 기부에
              참여할 수 있는 오프라인 캠페인입니다.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-rose-500 flex-shrink-0 mt-0.5" />
                  <span className="text-base">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
                <Heart className="mr-2 h-5 w-5" />
                이벤트 일정 보기
              </Button>
              <Button size="lg" variant="outline">
                자세히 알아보기
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-rose-200 to-pink-200">
              {photoImage ? (
                <Image
                  src={photoImage}
                  alt="반려동물과 보호자가 포토부스에서 함께 찍은 행복한 사진"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    console.error('Image load error:', photoImage)
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Camera className="h-32 w-32 text-rose-300" />
                </div>
              )}
              {/* Decorative frame overlay */}
              <div className="absolute inset-0 border-8 border-white/20 rounded-2xl pointer-events-none"></div>
            </div>
            {/* Desktop: bottom-right card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs hidden lg:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-rose-500 fill-rose-500 animate-heartbeat" />
                </div>
                <div>
                  <AnimatedPhotoCount />
                  <div className="text-sm text-muted-foreground">
                    목표 누적 촬영 수
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: centered bottom card */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-sm lg:hidden">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-rose-500 fill-rose-500 animate-heartbeat" />
                </div>
                <div className="text-center">
                  <AnimatedPhotoCount />
                  <div className="text-xs text-muted-foreground">
                    목표 누적 촬영 수
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
