import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Mail, FileText } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [campaignsResult, partnersResult, inquiriesResult, sectionsResult] = await Promise.all([
    supabase.from('campaigns').select('id, is_visible', { count: 'exact' }),
    supabase.from('partners').select('id', { count: 'exact' }),
    supabase.from('inquiries').select('id, status', { count: 'exact' }).eq('status', 'new'),
    supabase.from('landing_sections').select('id', { count: 'exact' }),
  ])

  const stats = [
    {
      title: "전체 캠페인",
      value: campaignsResult.count || 0,
      description: `공개 ${campaignsResult.data?.filter(c => c.is_visible).length || 0}개`,
      icon: Heart,
      color: "text-cherry-red",
    },
    {
      title: "파트너",
      value: partnersResult.count || 0,
      description: "등록된 파트너",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "새 문의",
      value: inquiriesResult.count || 0,
      description: "확인이 필요한 문의",
      icon: Mail,
      color: "text-yellow-600",
    },
    {
      title: "랜딩 섹션",
      value: sectionsResult.count || 0,
      description: "등록된 섹션",
      icon: FileText,
      color: "text-green-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-2">CHERRY for PET 관리자 페이지에 오신 것을 환영합니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>빠른 시작 가이드</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cherry-red text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">섹션 관리에서 Hero 섹션 편집</p>
              <p className="text-sm text-gray-600">메인 페이지의 제목, 이미지, CTA 버튼을 설정하세요</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cherry-red text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">캠페인 추가</p>
              <p className="text-sm text-gray-600">진행 중인 기부 캠페인을 등록하고 외부 URL을 연결하세요</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cherry-red text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">파트너 로고 업로드</p>
              <p className="text-sm text-gray-600">함께하는 파트너의 로고를 업로드하여 신뢰도를 높이세요</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
