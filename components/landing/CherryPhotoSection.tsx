import { Camera, Heart, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const features = [
  '포토부스에서 반려동물과 사진 촬영',
  '촬영 비용의 일부가 자동 기부',
  '사진과 함께 기부 증서 제공',
  '오프라인 이벤트에서 직접 참여',
]

export function CherryPhotoSection() {
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
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rose-200 to-pink-200 shadow-2xl">
              <div className="flex items-center justify-center h-full">
                <Camera className="h-32 w-32 text-rose-300" />
              </div>
              {/* Placeholder for actual photo booth image */}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 max-w-xs hidden lg:block">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-500">
                    1,234장
                  </div>
                  <div className="text-sm text-muted-foreground">
                    누적 촬영 수
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
