import { ArrowRight, Heart, Shield, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Heart,
    title: '참여 또는 기부',
    description: '원하는 캠페인을 선택하고 기부하거나, CHERRY Photo를 통해 참여합니다.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
  },
  {
    icon: Shield,
    title: '캠페인 연결',
    description: '기부금이 검증된 보호단체와 동물병원으로 안전하게 전달됩니다.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: FileText,
    title: '진행 상황 공개',
    description: '구조, 치료, 보호 과정이 투명하게 기록되고 공개됩니다.',
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: CheckCircle,
    title: '결과 리포트',
    description: '캠페인 완료 후 기부금 사용 내역과 결과를 상세히 공유합니다.',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            투명한 기부, 어떻게 진행되나요?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CHERRY for PET의 모든 과정은 투명하게 공개됩니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`${step.bgColor} w-20 h-20 rounded-full flex items-center justify-center mb-6`}
                  >
                    <Icon className={`h-10 w-10 ${step.color}`} />
                  </div>
                  <div className="mb-3 text-sm font-semibold text-primary">
                    STEP {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)]">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/30 mx-auto" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              모든 과정이 블록체인 기반으로 기록 가능합니다
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
