import { Partner } from "@/types/cms"
import Image from "next/image"

interface PartnersSectionProps {
  partners: Partner[]
}

const PARTNER_TYPE_LABELS: Record<string, string> = {
  'veterinary_hospital': '동물병원',
  'veterinary_clinic': '동물클리닉',
  'animal_shelter': '동물보호소',
  'rescue_organization': '구조단체',
  'welfare_organization': '동물복지단체',
  'corporation': '일반기업',
  'pet_company': '반려동물 기업',
  'veterinary_association': '수의사회',
  'animal_association': '동물단체협회',
  'international_ngo': '국제 NGO',
  'international_organization': '국제기구',
  'government': '정부기관',
  'research_institute': '연구기관',
  'brand_sponsor': '브랜드/스폰서',
  'media_partner': '미디어 파트너',
  'education': '교육기관',
  // 기존 호환성 유지
  'hospital': '동물병원',
  'shelter': '보호단체',
  'company': '기업',
  'association': '협회',
  'international': '국제기관',
  'brand': '브랜드',
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const visiblePartners = partners.filter(p => p.is_visible)

  if (visiblePartners.length === 0) return null

  const getPartnerTypeLabel = (type: string | null) => {
    if (!type) return ''
    if (type === 'none') return '' // "없음"일 경우 빈 문자열 반환
    return PARTNER_TYPE_LABELS[type] || type
  }

  const getPartnerDisplayText = (partner: Partner) => {
    // 유형이 "없음"이면 설명을 표시, 아니면 유형을 표시
    if (partner.type === 'none') {
      return partner.description || ''
    }
    return getPartnerTypeLabel(partner.type)
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container-responsive">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-display-sm md:text-display-md lg:text-display-lg font-bold text-gray-900">
            함께하는 파트너
          </h2>
          <p className="text-body-lg md:text-heading-md text-gray-600">
            신뢰할 수 있는 파트너들과 함께합니다
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {visiblePartners.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border-2 border-gray-200 hover:border-cherry-red hover:shadow-lg active:scale-[0.98] transition-all duration-300"
            >
              {partner.logo_url ? (
                <div className="relative w-full h-16 sm:h-20 md:h-24 mb-2 sm:mb-3 grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </div>
              ) : (
                <div className="w-full h-16 sm:h-20 md:h-24 mb-2 sm:mb-3 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                  <span className="text-xs text-gray-400 font-semibold text-center break-words">{partner.name}</span>
                </div>
              )}
              <p className="text-xs sm:text-sm font-semibold text-gray-900 text-center group-hover:text-cherry-red transition-colors break-words w-full">
                {partner.name}
              </p>
              {(partner.type || partner.description) && (
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center">
                  {getPartnerDisplayText(partner)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
