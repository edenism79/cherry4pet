import { createClient } from "@/lib/supabase/server"
import FeaturedCampaigns from "@/components/landing/FeaturedCampaigns"
import SiteFooter from "@/components/landing/SiteFooter"

export default async function CampaignsPage() {
  const supabase = await createClient()

  const [campaignsResult, settingsResult] = await Promise.all([
    supabase
      .from('campaigns')
      .select('*')
      .eq('is_visible', true)
      .order('sort_order', { ascending: true }),
    supabase
      .from('site_settings')
      .select('*')
      .single()
  ])

  const campaigns = campaignsResult.data || []
  const settings = settingsResult.data

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            모든 캠페인
          </h1>
          <p className="text-xl text-gray-600">
            도움이 필요한 반려동물들을 만나보세요
          </p>
        </div>
        <FeaturedCampaigns campaigns={campaigns} />
      </div>
      <SiteFooter settings={settings} />
    </main>
  )
}
