import { Heart, Stethoscope, Home, Users, Globe, Building2 } from "lucide-react"
import { LandingSection } from "@/types/cms"

interface WhyPetSectionProps {
  data: LandingSection
}

const features = [
  {
    icon: Heart,
    title: "유기동물 구조",
    description: "위급한 상황의 반려동물을 신속하게 구조합니다",
  },
  {
    icon: Stethoscope,
    title: "치료비 지원",
    description: "응급 치료와 수술비를 지원하여 생명을 구합니다",
  },
  {
    icon: Home,
    title: "보호소 지원",
    description: "임시 보호소에 사료와 의료품을 제공합니다",
  },
  {
    icon: Users,
    title: "입양 연결",
    description: "새로운 가족을 찾아 행복한 삶을 선물합니다",
  },
  {
    icon: Globe,
    title: "국제 협력",
    description: "광견병 예방 등 글로벌 캠페인에 참여합니다",
  },
  {
    icon: Building2,
    title: "기업 CSR/ESG",
    description: "기업의 사회적 책임 활동을 지원합니다",
  },
]

export default function WhyPetSection({ data }: WhyPetSectionProps) {
  if (!data.is_visible) return null

  // Extract style settings from extra field
  const titleColor = (data.extra as any)?.title_color || '#1F2937'
  const titleFont = (data.extra as any)?.title_font || 'Pretendard'
  const titleSize = (data.extra as any)?.title_size || '40'
  const subtitleColor = (data.extra as any)?.subtitle_color || '#E9415A'
  const subtitleSize = (data.extra as any)?.subtitle_size || '20'
  const bodyColor = (data.extra as any)?.body_color || '#6B7280'

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2
            className="font-bold text-display-sm md:text-display-md lg:text-display-lg"
            style={{
              color: titleColor,
              fontFamily: titleFont,
            }}
          >
            {data.title}
          </h2>
          <p
            className="font-semibold text-heading-md md:text-heading-lg"
            style={{
              color: subtitleColor,
            }}
          >
            {data.subtitle}
          </p>
          <p
            className="text-body-md md:text-body-lg max-w-3xl mx-auto px-4"
            style={{ color: bodyColor }}
          >
            {data.body}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-xl sm:rounded-2xl border-2 border-gray-200 hover:border-cherry-red hover:shadow-lg active:scale-[0.98] transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cherry-cream flex items-center justify-center group-hover:bg-cherry-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cherry-red group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
