import { CheckCircle, Eye, FileText, Users, TrendingUp, Lock } from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: '기부금 흐름 공개',
    description: '모든 기부금의 흐름을 실시간으로 확인할 수 있습니다.',
  },
  {
    icon: FileText,
    title: '캠페인별 사용 내역',
    description: '각 캠페인의 상세한 기부금 사용 내역을 투명하게 공개합니다.',
  },
  {
    icon: Lock,
    title: '블록체인 기반 기록',
    description: 'CHERRY 플랫폼과 연동하여 변조 불가능한 기록을 제공합니다.',
  },
  {
    icon: Users,
    title: '다자간 협력 구조',
    description: '보호단체, 동물병원, 기업이 함께 참여하는 투명한 구조입니다.',
  },
  {
    icon: TrendingUp,
    title: '결과 리포트',
    description: '캠페인 완료 후 상세한 결과 리포트를 기부자에게 제공합니다.',
  },
  {
    icon: CheckCircle,
    title: '검증된 파트너',
    description: '모든 파트너는 엄격한 검증을 거쳐 등록됩니다.',
  },
]

export function TransparencySection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">
                TRANSPARENCY
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            투명성이 우리의 가장 큰 가치입니다
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            CHERRY for PET은 모든 과정을 투명하게 공개하여
            <br />
            기부자와 반려동물 모두를 보호합니다
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">
                  CHERRY 본 플랫폼과 연동 가능
                </h3>
                <p className="text-muted-foreground">
                  향후 CHERRY 본 플랫폼의 블록체인 기반 투명성 시스템과
                  연동하여 더욱 강력한 신뢰를 제공할 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
