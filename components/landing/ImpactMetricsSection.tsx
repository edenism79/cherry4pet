'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Metric {
  label: string
  value: number
  unit: string
  prefix?: string
}

interface ImpactMetricsSectionProps {
  section?: {
    title: string | null
    subtitle: string | null
    body: string | null
    extra?: {
      metrics?: Metric[]
      title_color?: string
      subtitle_color?: string
      body_color?: string
    }
  }
}

const defaultMetrics: Metric[] = [
  {
    label: '누적 기부금',
    value: 500000000,
    unit: '원',
    prefix: '',
  },
  {
    label: '참여자 수',
    value: 10000,
    unit: '명',
    prefix: '',
  },
  {
    label: '지원 캠페인',
    value: 200,
    unit: '개',
    prefix: '',
  },
  {
    label: '구조/치료 동물',
    value: 1000,
    unit: '마리',
    prefix: '',
  },
  {
    label: '파트너',
    value: 100,
    unit: '곳',
    prefix: '',
  },
]

function AnimatedNumber({
  value,
  unit,
  prefix = '',
  isAnimating,
  animationKey
}: {
  value: number
  unit: string
  prefix?: string
  isAnimating: boolean
  animationKey: number
}) {
  const [displayValue, setDisplayValue] = useState(0)

  // Use useEffect with animationKey to trigger re-animation
  useEffect(() => {
    if (isAnimating && animationKey > 0) {
      // Reset to 1
      setDisplayValue(1)

      const duration = 2500 // 2.5초
      const steps = 60
      const increment = value / steps
      let current = 1

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    } else if (!isAnimating) {
      setDisplayValue(0)
    }
  }, [isAnimating, animationKey, value])

  // Format number with 억/만 units for Korean currency
  const formatNumber = (num: number, unit: string) => {
    // For currency (원), use 억/만 notation
    if (unit === '원') {
      if (num >= 100000000) {
        // 1억 이상
        const eok = Math.floor(num / 100000000)
        const remainder = num % 100000000
        const man = Math.floor(remainder / 10000)

        if (man > 0) {
          return `${eok.toLocaleString()}억 ${man.toLocaleString()}만`
        }
        return `${eok.toLocaleString()}억`
      } else if (num >= 10000) {
        // 1만 이상
        const man = Math.floor(num / 10000)
        const remainder = num % 10000

        if (remainder > 0) {
          return `${man.toLocaleString()}만 ${remainder.toLocaleString()}`
        }
        return `${man.toLocaleString()}만`
      }
    }

    // For other units, use regular number formatting
    return num.toLocaleString()
  }

  const formattedValue = formatNumber(displayValue, unit)

  // Dynamic font size based on content length
  const getNumberFontSize = () => {
    const length = formattedValue.length
    if (length > 15) return 'text-2xl md:text-3xl'
    if (length > 10) return 'text-3xl md:text-4xl'
    return 'text-4xl md:text-5xl'
  }

  const getUnitFontSize = () => {
    const length = formattedValue.length
    if (length > 15) return 'text-lg md:text-xl'
    if (length > 10) return 'text-xl md:text-2xl'
    return 'text-2xl md:text-3xl'
  }

  return (
    <div className={`${getNumberFontSize()} font-bold text-primary-foreground animate-in fade-in duration-500 break-words`}>
      {prefix}
      {formattedValue}
      <span className={`${getUnitFontSize()} ml-1`}>{unit}</span>
    </div>
  )
}

export function ImpactMetricsSection({ section }: ImpactMetricsSectionProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const metrics = section?.extra?.metrics || defaultMetrics
  const title = section?.title || '함께 만들어가는 변화'
  const subtitle = section?.subtitle || ''
  const body = section?.body || '여러분의 참여로 만들어질 목표입니다'

  const titleColor = section?.extra?.title_color || '#FFFFFF'
  const subtitleColor = section?.extra?.subtitle_color || 'rgba(255, 255, 255, 0.9)'
  const bodyColor = section?.extra?.body_color || 'rgba(255, 255, 255, 0.8)'
  const bodyFont = section?.extra?.body_font || 'Pretendard'
  const bodySize = section?.extra?.body_size || '18'

  const handleStartAnimation = () => {
    setIsAnimating(true)
    setAnimationKey(prev => prev + 1)
  }

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 rounded-full">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-semibold">IMPACT</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: titleColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-xl md:text-2xl font-semibold mb-2"
              style={{ color: subtitleColor }}
            >
              {subtitle}
            </p>
          )}
          <p
            className="max-w-2xl mx-auto mb-6"
            style={{
              color: bodyColor,
              fontFamily: bodyFont,
              fontSize: `${bodySize}px`
            }}
          >
            {body}
          </p>

          {!isAnimating && (
            <Button
              onClick={handleStartAnimation}
              size="lg"
              className="bg-white text-primary hover:bg-white/95 font-extrabold shadow-lg hover:shadow-xl transition-all text-lg"
              style={{
                animation: 'blink 2s ease-in-out infinite'
              }}
            >
              <Play className="mr-2 h-6 w-6" />
              목표치 보기
            </Button>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-4 md:p-6 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 overflow-hidden"
              style={{
                animation: isAnimating ? `fadeInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
              }}
            >
              <div className="min-h-[80px] md:min-h-[100px] flex items-center justify-center">
                <AnimatedNumber
                  value={metric.value}
                  unit={metric.unit}
                  prefix={metric.prefix}
                  isAnimating={isAnimating}
                  animationKey={animationKey}
                />
              </div>
              <div className="mt-3 text-sm font-medium text-primary-foreground/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {isAnimating && (
          <div className="mt-16 text-center animate-in fade-in duration-700 delay-1000">
            <p className="text-primary-foreground/90 font-medium mb-2">
              🎯 우리의 목표
            </p>
            <p className="text-primary-foreground/70 text-sm mb-6">
              여러분의 참여로 이 목표를 함께 달성해요
            </p>
            <Button
              onClick={handleStartAnimation}
              size="lg"
              className="mt-4 bg-white text-primary hover:bg-white/95 font-bold shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
            >
              다시 보기
            </Button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 10px 15px -3px rgba(255, 255, 255, 0.4), 0 4px 6px -2px rgba(255, 255, 255, 0.2);
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            box-shadow: 0 20px 25px -5px rgba(255, 255, 255, 0.6), 0 10px 10px -5px rgba(255, 255, 255, 0.3);
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  )
}
