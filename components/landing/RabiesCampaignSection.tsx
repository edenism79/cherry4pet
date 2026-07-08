import { Users, Globe, Heart, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  if (!data) return null

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
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-cherry-red/10 rounded-full mb-6">
            <span className="text-cherry-red font-semibold text-sm tracking-wide uppercase">
              🎉 {data.title}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {data.subtitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            {data.body}
          </p>
        </div>

        {/* Quote */}
        {data.extra?.quote && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 border-l-4 border-cherry-red">
            <div className="flex items-start gap-4">
              <span className="text-6xl text-cherry-red/20 leading-none">"</span>
              <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed pt-2">
                {data.extra.quote}
              </p>
              <span className="text-6xl text-cherry-red/20 leading-none self-end">"</span>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            숫자로 보는 광견병의 현실
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-14 h-14 bg-cherry-red/10 rounded-full mb-4 mx-auto">
                    <Icon className="w-7 h-7 text-cherry-red" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-cherry-red">{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Event Info */}
        {data.extra?.launch_date && (
          <div className="bg-gradient-to-r from-cherry-red to-cherry-deep text-white rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">MOU 체결식 안내</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm opacity-90 mb-2">일시</p>
                <p className="font-semibold text-lg">{data.extra.launch_date}</p>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-2">장소</p>
                <p className="font-semibold">{data.extra.venue}</p>
              </div>
              <div>
                <p className="text-sm opacity-90 mb-2">주최</p>
                <p className="font-semibold">{data.extra.organizer}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm opacity-90">주관</p>
              <p className="font-semibold">{data.extra.hosts}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-white text-cherry-red hover:bg-gray-50 border-2 border-cherry-red font-bold px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <a href={data.cta_url || '#'}>
              {data.cta_label || '캠페인 참여하기'}
            </a>
          </Button>
          <p className="mt-4 text-gray-600">
            함께 만드는 광견병 없는 아시아 🌏
          </p>
        </div>
      </div>
    </section>
  )
}
