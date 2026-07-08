'use client'

import { useEffect, useState } from 'react'
import { TrendingUp } from 'lucide-react'

interface Metric {
  label: string
  value: number
  unit: string
  prefix?: string
}

const metrics: Metric[] = [
  {
    label: '누적 기부금',
    value: 127500000,
    unit: '원',
    prefix: '',
  },
  {
    label: '참여자 수',
    value: 8234,
    unit: '명',
    prefix: '',
  },
  {
    label: '지원 캠페인',
    value: 156,
    unit: '개',
    prefix: '',
  },
  {
    label: '구조/치료 동물',
    value: 423,
    unit: '마리',
    prefix: '',
  },
  {
    label: '파트너',
    value: 47,
    unit: '곳',
    prefix: '',
  },
]

function AnimatedNumber({ value, unit, prefix = '' }: { value: number; unit: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 2000 // 2초
    const steps = 60
    const increment = value / steps
    let current = 0

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
  }, [value])

  const formattedValue = displayValue.toLocaleString()

  return (
    <div className="text-4xl md:text-5xl font-bold text-primary">
      {prefix}
      {formattedValue}
      <span className="text-2xl md:text-3xl ml-1">{unit}</span>
    </div>
  )
}

export function ImpactMetricsSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 rounded-full">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-semibold">IMPACT</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            함께 만들어가는 변화
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            여러분의 참여로 만들어진 실질적인 성과입니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <AnimatedNumber
                value={metric.value}
                unit={metric.unit}
                prefix={metric.prefix}
              />
              <div className="mt-3 text-sm font-medium text-primary-foreground/80">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-primary-foreground/80">
            * 2024년 기준 누적 데이터입니다
          </p>
        </div>
      </div>
    </section>
  )
}
