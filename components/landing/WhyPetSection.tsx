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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {data.title}
          </h2>
          <p className="text-xl text-cherry-red font-semibold">
            {data.subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {data.body}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-cherry-red hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-full bg-cherry-cream flex items-center justify-center group-hover:bg-cherry-red group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-7 h-7 text-cherry-red group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
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
