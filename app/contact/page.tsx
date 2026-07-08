import { createClient } from "@/lib/supabase/server"
import SiteFooter from "@/components/landing/SiteFooter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              문의하기
            </h1>
            <p className="text-xl text-gray-600">
              궁금한 점이 있으시면 언제든 문의해주세요
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>문의 폼</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                문의 폼 기능은 향후 업데이트 예정입니다.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                관리자 페이지에서 문의 관리 기능을 사용할 수 있습니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <SiteFooter settings={settings} />
    </main>
  )
}
