import { Partner } from "@/types/cms"
import Image from "next/image"

interface PartnersSectionProps {
  partners: Partner[]
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const visiblePartners = partners.filter(p => p.is_visible)

  if (visiblePartners.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            함께하는 파트너
          </h2>
          <p className="text-xl text-gray-600">
            신뢰할 수 있는 파트너들과 함께합니다
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {visiblePartners.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 hover:border-cherry-red hover:shadow-lg transition-all duration-300"
            >
              {partner.logo_url ? (
                <div className="relative w-full h-24 mb-3 grayscale group-hover:grayscale-0 transition-all">
                  <Image
                    src={partner.logo_url}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-24 mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400 font-semibold">{partner.name}</span>
                </div>
              )}
              <p className="text-sm font-semibold text-gray-900 text-center group-hover:text-cherry-red transition-colors">
                {partner.name}
              </p>
              {partner.type && (
                <p className="text-xs text-gray-500 mt-1">{partner.type}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
