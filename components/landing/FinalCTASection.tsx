import { Heart, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FinalCTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 to-primary text-primary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            작은 참여가 한 생명을 지킵니다
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90">
            CHERRY for PET과 함께
            <br />
            투명한 반려동물 기부를 시작하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/campaigns">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto"
              >
                <Heart className="mr-2 h-5 w-5" />
                지금 기부하기
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              >
                <Building className="mr-2 h-5 w-5" />
                파트너로 참여하기
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-sm text-primary-foreground/80">
                투명한 기부금 관리
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">검증된</div>
              <div className="text-sm text-primary-foreground/80">
                파트너 및 캠페인
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold mb-2">실시간</div>
              <div className="text-sm text-primary-foreground/80">
                진행 상황 공개
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
