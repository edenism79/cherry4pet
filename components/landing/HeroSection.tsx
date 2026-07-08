import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LandingSection } from "@/types/cms"

interface HeroSectionProps {
  data: LandingSection
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-cherry-cream to-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {data.title}
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-cherry-red">
                {data.subtitle}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {data.body}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {data.cta_label && data.cta_url && (
                <Button
                  size="lg"
                  className="bg-cherry-red hover:bg-cherry-deep text-white font-semibold px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <a href={data.cta_url}>{data.cta_label}</a>
                </Button>
              )}
              {typeof data.extra === 'object' && data.extra && 'cta2_label' in data.extra && 'cta2_url' in data.extra && (
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cherry-red text-cherry-red hover:bg-cherry-red hover:text-white font-semibold px-8 py-6 text-lg rounded-full"
                  asChild
                >
                  <a href={data.extra.cta2_url as string}>{data.extra.cta2_label as string}</a>
                </Button>
              )}
            </div>
          </div>
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {data.image_url ? (
              <Image
                src={data.image_url}
                alt={data.title || "Hero image"}
                fill
                className="object-cover"
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
  )
}
